import * as React from 'react';
// @ts-ignore
import { BaseEdge, getBezierPath, getStraightPath, EdgeLabelRenderer, useReactFlow } from 'reactflow';
import { buildPolylinePath, computeAutoWaypoints } from './EdgeUtils';

type Waypoint = { x: number; y: number };

interface DragState {
    startClientX: number;
    startClientY: number;
    startCoord: number;
    wp0Idx: number;
    wp1Idx: number;
    isH: boolean;
    baseWaypoints: Waypoint[];
    snapEnabled: boolean;
    snapPixels: number;
    onWaypointsChange: ((wps: Waypoint[]) => void) | undefined;
    // Segment index the user grabbed vs. where it sits after stub waypoints were
    // inserted (terminal segments); used to keep the handle element stable.
    origSeg: number;
    curSeg: number;
}

const STUB = 25;
const dirOf = (pos: string) =>
    pos === 'right' ? { x: 1, y: 0 } : pos === 'left' ? { x: -1, y: 0 } : pos === 'top' ? { x: 0, y: -1 } : { x: 0, y: 1 };

export const CustomEdge = React.memo(({
    sourceX, sourceY, targetX, targetY,
    sourcePosition, targetPosition,
    data, markerEnd, style, label, interactionWidth, zIndex,
}: any) => {
    const storedWaypoints: Waypoint[] = data?.waypoints ?? [];
    const showLabel = data?.showLabel === true;
    const { getZoom } = useReactFlow();
    const zoom = getZoom();

    // Calculate dynamic interaction width (selection/drag zone)
    const dynamicInteractionWidth = Math.max(20, Math.round(24 / zoom));

    // Calculate dynamic segment handle dimensions (colored pills)
    const hWidth = Math.max(24, Math.round(36 / zoom));
    const hHeight = Math.max(10, Math.round(14 / zoom));

    // terminal points (native reactflow coordinates)
    const sx = sourceX;
    const sy = sourceY;
    const tx = targetX;
    const ty = targetY;

    // null = at rest (derive from props); non-null = user is actively dragging.
    const [liveWaypoints, setLiveWaypoints] = React.useState<Waypoint[] | null>(null);
    const dragState = React.useRef<DragState | null>(null);

    const isStepType = data?.lineType === 'step' || data?.lineType === 'smoothstep' || !data?.lineType;
    const isHorizSrc = sourcePosition === 'right' || sourcePosition === 'left';
    const isHorizTgt = targetPosition === 'right' || targetPosition === 'left';

    // Priority: active drag > stored custom waypoints > auto-routed (only if NO waypoints exist).
    const baseWaypoints = React.useMemo<Waypoint[]>(
        () =>
            liveWaypoints ??
            (storedWaypoints.length > 0
                ? storedWaypoints
                : computeAutoWaypoints(sx, sy, sourcePosition, tx, ty, targetPosition)),
        [liveWaypoints, storedWaypoints, sx, sy, sourcePosition, tx, ty, targetPosition]
    );

    // Pin logic uses shifted terminal coordinates to enforce orthogonality on manual paths.
    const pinnedWaypoints = React.useMemo<Waypoint[]>(
        () =>
            isStepType && baseWaypoints.length > 0
                ? baseWaypoints.map((wp, i) => {
                    const result = { ...wp }; // Shallow copy to avoid mutation
                    // Pin FIRST waypoint to the handle's exit axis.
                    // If it's a side handle (horiz), force WP0.y to handle's Y.
                    // If it's a top/bottom handle (vert), force WP0.x to handle's X.
                    if (i === 0) {
                        if (isHorizSrc) result.y = sy;
                        else result.x = sx;
                    }
                    // Pin LAST waypoint to the handle's entry axis.
                    if (i === baseWaypoints.length - 1) {
                        if (isHorizTgt) result.y = ty;
                        else result.x = tx;
                    }
                    return result;
                })
                : baseWaypoints,
        [isStepType, baseWaypoints, isHorizSrc, isHorizTgt, sx, sy, tx, ty]
    );

    // Filter out redundant waypoints (points that coincide with handles) to prevent
    // zero-length segments that cause rendering artifacts or 'weird' line jumps.
    const filteredWaypoints = React.useMemo(
        () =>
            pinnedWaypoints.filter((wp, i) => {
                if (i === 0) return Math.hypot(wp.x - sx, wp.y - sy) > 1;
                if (i === pinnedWaypoints.length - 1) return Math.hypot(wp.x - tx, wp.y - ty) > 1;
                return true;
            }),
        [pinnedWaypoints, sx, sy, tx, ty]
    );

    const allPts = React.useMemo<Waypoint[]>(
        () => [{ x: sx, y: sy }, ...filteredWaypoints, { x: tx, y: ty }],
        [filteredWaypoints, sx, sy, tx, ty]
    );

    // ─── Path computation ────────────────────────────────────────────────

    const { edgePath, labelX, labelY } = React.useMemo(() => {
        let path = '', lx = (sx + tx) / 2, ly = (sy + ty) / 2;
        if (isStepType) {
            path = buildPolylinePath(allPts, data?.lineType === 'step' ? 0 : 12);
            if (allPts.length >= 2) {
                const mid = Math.floor(allPts.length / 2);
                lx = (allPts[mid - 1].x + allPts[mid].x) / 2;
                ly = (allPts[mid - 1].y + allPts[mid].y) / 2;
            }
        } else if (data?.lineType === 'straight') {
            [path, lx, ly] = getStraightPath({ sourceX: sx, sourceY: sy, targetX: tx, targetY: ty });
        } else {
            [path, lx, ly] = getBezierPath({ sourceX: sx, sourceY: sy, targetX: tx, targetY: ty, sourcePosition, targetPosition });
        }
        return { edgePath: path, labelX: lx, labelY: ly };
    }, [isStepType, allPts, sx, sy, tx, ty, sourcePosition, targetPosition, data?.lineType]);

    // ─── Pointer-capture drag engine ──────────────────────────────────────

    const canEdit = data?.isSelected && isStepType && data?.isEditable !== false;

    const applyDelta = (ref: DragState, clientX: number, clientY: number): Waypoint[] => {
        const zoom = getZoom();
        const rawDelta = ref.isH
            ? (clientY - ref.startClientY) / zoom
            : (clientX - ref.startClientX) / zoom;
        let newCoord = ref.startCoord + rawDelta;
        if (ref.snapEnabled && ref.snapPixels) newCoord = Math.round(newCoord / ref.snapPixels) * ref.snapPixels;
        return ref.baseWaypoints.map((wp, i) =>
            i === ref.wp0Idx || i === ref.wp1Idx
                ? ref.isH ? { ...wp, y: newCoord } : { ...wp, x: newCoord }
                : wp
        );
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, segIdx: number, isH: boolean) => {
        e.stopPropagation();
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);

        // Terminal segments touch a node handle and are pinned to its axis, so they
        // cannot slide on their own. Insert a short stub leaving the handle (two
        // coincident waypoints) so the segment beyond the stub can move instead.
        let startWps = pinnedWaypoints;
        let wp0Idx = segIdx - 1;
        let wp1Idx = segIdx;
        let curSeg = segIdx;
        const lastSeg = pinnedWaypoints.length;
        if (segIdx === 0) {
            const first = pinnedWaypoints[0];
            const len = Math.abs(first.x - sx) + Math.abs(first.y - sy);
            const d = dirOf(sourcePosition), s = Math.min(STUB, len / 2);
            const stub = { x: sx + d.x * s, y: sy + d.y * s };
            startWps = [stub, { ...stub }, ...pinnedWaypoints];
            wp0Idx = 1; wp1Idx = 2; curSeg = 2;
        } else if (segIdx === lastSeg) {
            const last = pinnedWaypoints[lastSeg - 1];
            const len = Math.abs(last.x - tx) + Math.abs(last.y - ty);
            const d = dirOf(targetPosition), s = Math.min(STUB, len / 2);
            const stub = { x: tx + d.x * s, y: ty + d.y * s };
            startWps = [...pinnedWaypoints, { ...stub }, stub];
            wp0Idx = lastSeg - 1; wp1Idx = lastSeg;
        }
        dragState.current = {
            startClientX: e.clientX,
            startClientY: e.clientY,
            startCoord: isH ? startWps[wp0Idx].y : startWps[wp0Idx].x,
            wp0Idx,
            wp1Idx,
            isH,
            baseWaypoints: startWps,
            snapEnabled: data?.snapEnabled ?? true,
            snapPixels: data?.snapPixels ?? 15,
            onWaypointsChange: data?.onWaypointsChange,
            origSeg: segIdx,
            curSeg,
        };
        setLiveWaypoints(startWps);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragState.current) return;
        setLiveWaypoints(applyDelta(dragState.current, e.clientX, e.clientY));
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        const ref = dragState.current;
        if (!ref) return;
        e.currentTarget.releasePointerCapture(e.pointerId);
        const result = applyDelta(ref, e.clientX, e.clientY);
        // A click without movement must not commit (it would persist the stub waypoints).
        const moved = ref.isH ? result[ref.wp0Idx].y !== ref.startCoord : result[ref.wp0Idx].x !== ref.startCoord;
        if (moved) ref.onWaypointsChange?.(result);
        dragState.current = null;
        setLiveWaypoints(null);
    };

    const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragState.current) return;
        e.currentTarget.releasePointerCapture(e.pointerId);
        dragState.current = null;
        setLiveWaypoints(null);
    };

    // ─── Label editing ───────────────────────────────────────────────────

    // The edit dialog is owned by ArchitectureBuilder (see EdgeLabelDialog) so it
    // is not lost if this edge remounts; the edge only asks for it to open.
    const handleLabelDoubleClick = () => {
        data?.onRequestEdit?.();
    };

    // ─── Render ───────────────────────────────────────────────────────────

    const drag = dragState.current;
    const segHandlePts = React.useMemo<Waypoint[]>(
        () => [{ x: sx, y: sy }, ...pinnedWaypoints, { x: tx, y: ty }],
        [pinnedWaypoints, sx, sy, tx, ty]
    );
    const isDashed = data?.dashed === true;
    const animation = isDashed ? 'none' : (data?.animation ?? 'none');
    
    const overlayBaseStyle = React.useMemo<React.CSSProperties>(() => ({
        ...style,
        fill: 'none',
        stroke: 'rgba(255, 255, 255, 0.95)',
        strokeWidth: Math.max(3, (style?.strokeWidth || 6) * 0.5),
        pointerEvents: 'none',
        strokeLinecap: 'round'
    }), [style]);

    return (
        <>
            {/* 1. Base solid edge (always rendered, keeps the arrow) */}
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{ 
                    ...style, 
                    fill: 'none', 
                    strokeLinecap: 'round',
                    filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))'
                }}
                interactionWidth={dynamicInteractionWidth}
            />

            {/* 2. Animation Layers (Overlays) */}
            {animation === 'forward' && (
                <BaseEdge
                    path={edgePath}
                    style={{
                        ...overlayBaseStyle,
                        strokeDasharray: '10 90',
                        animation: 'arch-flow-forward 0.75s linear infinite',
                            filter: `
                            drop-shadow(1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(-1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px 1px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px -1px 0px rgba(0, 0, 0, 1))
                            `
                    }}
                />
            )}
            {animation === 'bidirectional' && (
                <>
                    <BaseEdge
                        path={edgePath}
                        style={{
                            ...overlayBaseStyle,
                            strokeDasharray: '10 90',
                            animation: 'arch-flow-forward 0.75s linear infinite',
                            filter: `
                            drop-shadow(1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(-1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px 1px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px -1px 0px rgba(0, 0, 0, 1))
                            `
                        }}
                    />
                    <BaseEdge
                        path={edgePath}
                        style={{
                            ...overlayBaseStyle,
                            strokeDasharray: '10 90',
                            strokeDashoffset: 50,
                            animation: 'arch-flow-reverse 0.75s linear infinite',
                            filter: `
                            drop-shadow(1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(-1px 0px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px 1px 0px rgba(0, 0, 0, 1)) 
                            drop-shadow(0px -1px 0px rgba(0, 0, 0, 1))
                            `
                        }}
                    />
                </>
            )}

            {label && showLabel && (
                <EdgeLabelRenderer>
                    <div
                        onDoubleClick={handleLabelDoubleClick}
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            backgroundColor: 'var(--neutral-10)', padding: '2px 8px', borderRadius: '4px',
                            border: `1px solid var(--neutral-40)`, fontSize: '12px', fontWeight: 'bold',
                            color: style?.stroke || 'var(--neutral-90)', pointerEvents: 'auto',
                            zIndex: (zIndex ?? 5000) + 50, cursor: 'pointer', whiteSpace: 'pre-wrap', textAlign: 'center',
                        }}
                        className="nodrag nopan"
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
            {canEdit && segHandlePts.length >= 3 && (
                <EdgeLabelRenderer>
                    {segHandlePts.slice(0, -1).map((pt, i) => {
                        const next = segHandlePts[i + 1];
                        const dx = Math.abs(next.x - pt.x);
                        const dy = Math.abs(next.y - pt.y);
                        if (dx + dy < 10) return null;
                        const isH = dx > dy;
                        const mx = (pt.x + next.x) / 2;
                        const my = (pt.y + next.y) / 2;
                        return (
                            <div
                                key={`seg-${i === drag?.curSeg ? drag.origSeg : i === drag?.origSeg ? drag.curSeg : i}`}
                                className="nodrag nopan"
                                onPointerDown={(e) => handlePointerDown(e, i, isH)}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerCancel}
                                title={isH ? 'Drag up/down' : 'Drag left/right'}
                                style={{
                                    position: 'absolute',
                                    transform: `translate(-50%, -50%) translate(${mx}px, ${my}px)`,
                                    width: isH ? `${hWidth}px` : `${hHeight}px`,
                                    height: isH ? `${hHeight}px` : `${hWidth}px`,
                                    borderRadius: `${hHeight / 2}px`,
                                    backgroundColor: 'var(--callToAction)',
                                    opacity: 0.85,
                                    cursor: isH ? 'ns-resize' : 'ew-resize',
                                    zIndex: (zIndex ?? 5000) + 100,
                                    pointerEvents: 'all',
                                    touchAction: 'none',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                }}
                            />
                        );
                    })}
                </EdgeLabelRenderer>
            )}
        </>
    );
});

export const edgeTypes = { custom: CustomEdge };
