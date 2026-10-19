import React from 'react';
import { View, ClientStoreProviderContext } from '@inductiveautomation/perspective-client';

// A viewPath is a project-relative Perspective view resource path (e.g. "Exchange/Widgets/PumpCard").
// It is never rendered as markup; reject anything that looks like a URL scheme or HTML.
export const isViewPath = (value: unknown): value is string =>
    typeof value === 'string' && value.trim().length > 0 && !/[<>:\\]/.test(value);

let mountCounter = 0;

/**
 * Renders a live Perspective view inside a node. The view is a child of the page, so it gets its own
 * property tree, bindings and params like any embedded view.
 */
export const NodeView = React.memo(({ nodeId, viewPath, params }: { nodeId: string; viewPath: string; params?: any }) => {
    const client = React.useContext(ClientStoreProviderContext);
    const mountPath = React.useMemo(() => `ab-node-${nodeId}-${++mountCounter}`, [nodeId]);
    if (!client) return null;
    return (
        <div className="nodrag nopan" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
            <View
                store={client as any}
                resourcePath={viewPath.trim()}
                mountPath={mountPath}
                params={params}
            />
        </div>
    );
});
