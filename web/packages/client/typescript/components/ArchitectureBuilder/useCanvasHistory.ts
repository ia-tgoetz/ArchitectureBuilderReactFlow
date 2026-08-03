import * as React from 'react';

/**
 * Undo/redo history for the ArchitectureBuilder canvas.
 *
 * Design notes:
 *  - The Ignition prop tree is the source of truth, so a history entry is a
 *    snapshot of the SERIALIZED `nodes` + `edges` dicts. Strings, not objects:
 *    several handlers mutate the dict in place without cloning per entry
 *    (z-order, arrow/dashed/showLabel toggles, StyleEditorModal), so an object
 *    snapshot would be retroactively corrupted by a later mutation.
 *  - All ~37 handler write sites are captured by substituting `historyStore`
 *    for `props.store` at the single place the handler hooks are constructed.
 *    Both hooks use `store` only as `store?.props` and `store.props.write(...)`.
 *  - Writes issued in the same synchronous tick coalesce into one undo step via
 *    a microtask flush, so a container drag (nodes + edges) or a paste undoes
 *    as a single action rather than leaving an intermediate half-state.
 *  - Snapshots are applied VERBATIM. Nothing re-derives waypoints or injects
 *    `waypoints: []`, which is what makes undoing "Clear Path" or a segment
 *    drag restore the exact prior routing (edge routing rule 4). Snapshots are
 *    Ignition dicts, never React Flow edge objects, so `selected` can never
 *    reappear at an edge's top level (rule 6).
 */

const HISTORY_KEYS = ['nodes', 'edges'] as const;
type HistoryKey = typeof HISTORY_KEYS[number];

interface Snapshot {
    nodes: string;
    edges: string;
}

export interface UseCanvasHistoryParams {
    /** The real Perspective store (`props.store`). */
    store: any;
    /** Live serialized `nodes` prop, from the existing memo in ArchitectureBuilder. */
    rawNodesJson: string;
    /** Live serialized `edges` prop, from the existing memo in ArchitectureBuilder. */
    rawEdgesJson: string;
    /** Maximum number of undo steps retained. */
    maxDepth?: number;
}

export interface CanvasHistoryApi {
    /** Referentially stable store facade — pass as `store` into the handler hooks. */
    historyStore: any;
    /** Pass-through write for derived/internal state; creates no undo step. */
    writeWithoutHistory: (name: string, value: any) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    /** Bumps on every applied undo/redo; used to invalidate stale local mirrors. */
    historyEpoch: number;
    resetHistory: () => void;
}

/**
 * JSON with object keys recursively sorted. Used only to compare a value we
 * wrote against the value the prop tree echoes back — Perspective does not
 * guarantee key-insertion order round-trips, and a bare string compare would
 * misread every one of our own writes as an external edit. Array order is
 * preserved, so waypoint sequences are unaffected.
 */
const canonicalHash = (json: string): string => {
    try {
        return JSON.stringify(canonicalize(JSON.parse(json)));
    } catch {
        return json;
    }
};

const canonicalize = (value: any): any => {
    if (Array.isArray(value)) return value.map(canonicalize);
    if (value && typeof value === 'object') {
        const out: Record<string, any> = {};
        Object.keys(value).sort().forEach(k => { out[k] = canonicalize(value[k]); });
        return out;
    }
    return value;
};

/** Bounded FIFO set of hashes for writes we expect to see echoed back. */
const EXPECTED_LIMIT = 16;

class ExpectedHashes {
    private order: string[] = [];
    private set = new Set<string>();

    add(hash: string) {
        if (this.set.has(hash)) return;
        this.set.add(hash);
        this.order.push(hash);
        while (this.order.length > EXPECTED_LIMIT) {
            const evicted = this.order.shift()!;
            this.set.delete(evicted);
        }
    }

    take(hash: string): boolean {
        if (!this.set.has(hash)) return false;
        this.set.delete(hash);
        this.order = this.order.filter(h => h !== hash);
        return true;
    }

    clear() {
        this.order = [];
        this.set.clear();
    }
}

export const useCanvasHistory = ({
    store,
    rawNodesJson,
    rawEdgesJson,
    maxDepth = 50,
}: UseCanvasHistoryParams): CanvasHistoryApi => {
    const storeRef = React.useRef(store);
    storeRef.current = store;

    // Current serialized state. Updated from props by effect AND optimistically
    // inside the write path — `rawNodesJson` only refreshes on the next render,
    // so two writes in one tick would otherwise both read the pre-tick value.
    const liveRef = React.useRef<Snapshot>({ nodes: rawNodesJson, edges: rawEdgesJson });

    const undoStackRef = React.useRef<Snapshot[]>([]);
    const redoStackRef = React.useRef<Snapshot[]>([]);
    const pendingBeforeRef = React.useRef<Snapshot | null>(null);
    const isApplyingRef = React.useRef(false);
    const expectedRef = React.useRef<Record<HistoryKey, ExpectedHashes>>({
        nodes: new ExpectedHashes(),
        edges: new ExpectedHashes(),
    });

    const [canUndo, setCanUndo] = React.useState(false);
    const [canRedo, setCanRedo] = React.useState(false);
    const [historyEpoch, setHistoryEpoch] = React.useState(0);

    const syncFlags = React.useCallback(() => {
        setCanUndo(undoStackRef.current.length > 0);
        setCanRedo(redoStackRef.current.length > 0);
    }, []);

    const resetHistory = React.useCallback(() => {
        undoStackRef.current = [];
        redoStackRef.current = [];
        pendingBeforeRef.current = null;
        expectedRef.current.nodes.clear();
        expectedRef.current.edges.clear();
        syncFlags();
    }, [syncFlags]);

    /** Raw write: registers the value as expected, updates the live mirror, forwards to Perspective. */
    const passthrough = React.useCallback((name: string, value: any) => {
        const target = storeRef.current;
        if (!target?.props) return;
        if (name === 'nodes' || name === 'edges') {
            const json = JSON.stringify(value);
            liveRef.current = { ...liveRef.current, [name]: json };
            expectedRef.current[name as HistoryKey].add(canonicalHash(json));
        }
        target.props.write(name, value);
    }, []);

    const flushBatch = React.useCallback(() => {
        const before = pendingBeforeRef.current;
        pendingBeforeRef.current = null;
        if (!before) return;

        const after = liveRef.current;
        // Several context-menu toggles write an unchanged dict; don't record a no-op step.
        if (before.nodes === after.nodes && before.edges === after.edges) return;

        undoStackRef.current.push(before);
        if (undoStackRef.current.length > maxDepth) undoStackRef.current.shift();
        redoStackRef.current = [];
        syncFlags();
    }, [maxDepth, syncFlags]);

    const recordingWrite = React.useCallback((name: string, value: any) => {
        const tracked = name === 'nodes' || name === 'edges';
        // Untracked props (nodeTypeConnectionDefaults, hierarchy, refreshHierarchy)
        // and undo/redo's own writes never create a step.
        if (tracked && !isApplyingRef.current) {
            if (pendingBeforeRef.current === null) {
                pendingBeforeRef.current = { ...liveRef.current };
                queueMicrotask(flushBatch);
            }
        }
        passthrough(name, value);
    }, [flushBatch, passthrough]);

    // Stable facade. `store` sits in ~20 useCallback dep arrays inside the
    // handler hooks; an unstable identity would rebuild every handler each
    // render and cascade into flowNodes/displayEdges recomputation.
    const historyStore = React.useMemo(() => {
        const facadeProps = { write: recordingWrite };
        return {
            get props() {
                return storeRef.current?.props ? facadeProps : undefined;
            },
        };
    }, [recordingWrite]);

    const apply = React.useCallback((snap: Snapshot) => {
        if (!storeRef.current?.props) return;
        isApplyingRef.current = true;
        try {
            // Verbatim — no post-processing of waypoints or any other field.
            passthrough('nodes', JSON.parse(snap.nodes));
            passthrough('edges', JSON.parse(snap.edges));
        } finally {
            isApplyingRef.current = false;
            queueMicrotask(() => { isApplyingRef.current = false; });
        }
        setHistoryEpoch(e => e + 1);
    }, [passthrough]);

    const undo = React.useCallback(() => {
        if (isApplyingRef.current) return;
        const snap = undoStackRef.current.pop();
        if (!snap) return;
        redoStackRef.current.push({ ...liveRef.current });
        if (redoStackRef.current.length > maxDepth) redoStackRef.current.shift();
        apply(snap);
        syncFlags();
    }, [apply, maxDepth, syncFlags]);

    const redo = React.useCallback(() => {
        if (isApplyingRef.current) return;
        const snap = redoStackRef.current.pop();
        if (!snap) return;
        undoStackRef.current.push({ ...liveRef.current });
        if (undoStackRef.current.length > maxDepth) undoStackRef.current.shift();
        apply(snap);
        syncFlags();
    }, [apply, maxDepth, syncFlags]);

    // ─── External-change detection ─────────────────────────────────────────
    // An incoming prop value we did not write ourselves means the Designer, a
    // script, or a view reload changed the canvas out from under us; the stack
    // no longer describes reachable states, so it is discarded.

    const firstRunRef = React.useRef<Record<HistoryKey, boolean>>({ nodes: true, edges: true });

    const observeIncoming = React.useCallback((key: HistoryKey, incoming: string) => {
        const wasExpected = expectedRef.current[key].take(canonicalHash(incoming));
        liveRef.current = { ...liveRef.current, [key]: incoming };
        if (firstRunRef.current[key]) {
            firstRunRef.current[key] = false;
            return;
        }
        if (!wasExpected) resetHistory();
    }, [resetHistory]);

    React.useEffect(() => { observeIncoming('nodes', rawNodesJson); }, [rawNodesJson, observeIncoming]);
    React.useEffect(() => { observeIncoming('edges', rawEdgesJson); }, [rawEdgesJson, observeIncoming]);

    return {
        historyStore,
        writeWithoutHistory: passthrough,
        undo,
        redo,
        canUndo,
        canRedo,
        historyEpoch,
        resetHistory,
    };
};
