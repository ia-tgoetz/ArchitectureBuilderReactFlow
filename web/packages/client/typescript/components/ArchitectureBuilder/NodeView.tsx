import React from 'react';
import { View, ClientStoreProviderContext } from '@inductiveautomation/perspective-client';
import { useZoomAtLeast } from './zoomSelectors';

// A viewPath is a project-relative Perspective view resource path (e.g. "Exchange/Widgets/PumpCard").
// It is never rendered as markup; reject anything that looks like a URL scheme or HTML.
export const isViewPath = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0 && !/[<>:\\]/.test(value);

/**
 * The Architecture Builder's own ComponentStore. Passed to embedded views as `parent` so Perspective can
 * detect a view that (directly or indirectly) embeds itself.
 */
export const ViewParentContext = React.createContext<any>(undefined);

// Below this zoom level a view is not worth its DOM cost and is too small to read, so the node shows its
// image (or an empty box) instead. The view mounts again as soon as the user zooms back in.
export const VIEW_MIN_ZOOM = 0.35;

let mountCounter = 0;

/**
 * Renders a live Perspective view inside a node. The view is a child of the page, so it gets its own
 * property tree, bindings and params like any embedded view.
 */
export const NodeView = React.memo(({ nodeId, viewPath, params, fallback }: { nodeId: string; viewPath: string; params?: any; fallback?: React.ReactNode }) => {
    const client = React.useContext(ClientStoreProviderContext);
    const parent = React.useContext(ViewParentContext);
    const zoomedIn = useZoomAtLeast(VIEW_MIN_ZOOM);
    const mountPath = React.useMemo(() => `ab-node-${nodeId}-${++mountCounter}`, [nodeId]);
    // No client store (for example in a host that does not provide one): show the image instead of nothing.
    if (!client || !zoomedIn) return <>{fallback ?? null}</>;
    return (
        <div className="nodrag nopan" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
            <View
                store={client as any}
                resourcePath={viewPath.trim()}
                mountPath={mountPath}
                parent={parent}
                params={params}
            />
        </div>
    );
});
