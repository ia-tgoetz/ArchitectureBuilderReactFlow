import * as React from 'react';
// @ts-ignore
import { NodeChange, applyNodeChanges } from 'reactflow';
import { getHandlePixelPos, computeAutoWaypoints } from './EdgeUtils';
import { ContextMenuState } from './types';
import { useEdgeHandlers } from './useEdgeHandlers';
import { generateShortId } from './utils';

interface DragStartState {
    nodes: Record<string, { x: number; y: number }>;
    edges: Record<string, { x: number; y: number }[]>;
}

const getNodesInside = (containerId: string, allNodes: any): string[] => {
    const container = allNodes[containerId];
    if (!container) return [];
    const cWidth = container.width || 300;
    const cHeight = container.height || 300;
    const cx1 = container.x, cy1 = container.y;
    const cx2 = cx1 + cWidth, cy2 = cy1 + cHeight;
    const inside: string[] = [];
    Object.keys(allNodes).forEach(id => {
        if (id === containerId) return;
        const node = allNodes[id];
        if (!node) return;
        const nw = node.paletteId === 'container' ? (node.width || 300) : 150;
        const nh = node.paletteId === 'container' ? (node.height || 300) : 150;
        if (nw >= cWidth || nh >= cHeight) return;
        if (node.x >= cx1 && node.y >= cy1 && node.x + nw <= cx2 && node.y + nh <= cy2) inside.push(id);
    });
    return inside;
};

export interface UseArchitectureFlowHandlersParams {
    store: any;
    componentEvents: any;
    rawNodesDict: any;
    rawEdgesDict: any;
    connectionTypes: any;
    nodeTypeConnectionDefaults: any;
    globalHandleCount: number;
    paletteItems: any[];
    snapEnabled: boolean;
    snapPixels: number;
    reactFlowInstance: any;
    reactFlowWrapper: React.RefObject<HTMLDivElement>;
    wrapperBoundsRef: React.MutableRefObject<{ top: number; left: number }>;
    isEnabled: boolean;
    enableOnClickEvents: boolean;
    selectedId: string | null;
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
    /** Every selected node (ref, so handlers read the latest value mid-event). */
    selectedNodeIdsRef: React.MutableRefObject<string[]>;
    /** Select exactly these nodes. */
    setSelectedNodes: (ids: string[]) => void;
    setLocalNodes: React.Dispatch<React.SetStateAction<any[]>>;
    setLocalEdges: React.Dispatch<React.SetStateAction<any[]>>;
    contextMenu: ContextMenuState | null;
    setContextMenu: React.Dispatch<React.SetStateAction<ContextMenuState | null>>;
    setActiveSubMenu: React.Dispatch<React.SetStateAction<any>>;
    setStyleEditorNodeId: React.Dispatch<React.SetStateAction<string | null>>;
    setEditingEdgeId: React.Dispatch<React.SetStateAction<string | null>>;
    clipboardRef: React.MutableRefObject<any>;
    draggedItemRef: React.MutableRefObject<any>;
}

export const useArchitectureFlowHandlers = ({
    store,
    componentEvents,
    rawNodesDict,
    rawEdgesDict,
    connectionTypes,
    nodeTypeConnectionDefaults,
    globalHandleCount,
    paletteItems,
    snapEnabled,
    snapPixels,
    reactFlowInstance,
    reactFlowWrapper,
    wrapperBoundsRef,
    isEnabled,
    enableOnClickEvents,
    selectedId,
    setSelectedId,
    selectedNodeIdsRef,
    setSelectedNodes,
    setLocalNodes,
    setLocalEdges,
    contextMenu,
    setContextMenu,
    setActiveSubMenu,
    setStyleEditorNodeId,
    setEditingEdgeId,
    clipboardRef,
    draggedItemRef,
}: UseArchitectureFlowHandlersParams) => {
    const [isDraggingNode, setIsDraggingNode] = React.useState(false);
    const dragStartPos = React.useRef<DragStartState | null>(null);

    // Stable refs so callbacks that only READ rawNodesDict/rawEdgesDict at call-time
    // don't need them in their dep arrays — prevents cascade rebuilds of flowNodes.
    const rawNodesDictRef = React.useRef(rawNodesDict);
    const rawEdgesDictRef = React.useRef(rawEdgesDict);
    React.useEffect(() => { rawNodesDictRef.current = rawNodesDict; }, [rawNodesDict]);
    React.useEffect(() => { rawEdgesDictRef.current = rawEdgesDict; }, [rawEdgesDict]);

    const closeContextMenu = React.useCallback(() => {
        setContextMenu(null);
        setActiveSubMenu(null);
    }, [setContextMenu, setActiveSubMenu]);

    // ─── Edge handlers (delegated) ────────────────────────────────────────────

    const edgeHandlers = useEdgeHandlers({
        store,
        componentEvents,
        rawNodesDict,
        rawEdgesDict,
        connectionTypes,
        nodeTypeConnectionDefaults,
        selectedId,
        setSelectedId,
        contextMenu,
        setContextMenu,
        setActiveSubMenu,
        setLocalEdges,
        reactFlowWrapper,
        wrapperBoundsRef,
        closeContextMenu,
        enableOnClickEvents,
    });

    // ─── Node handlers ────────────────────────────────────────────────────────

    const handleGearClick = React.useCallback((id: string) => {
        setSelectedId(id);
        const node = rawNodesDictRef.current[id];
        if (componentEvents && node) {
            componentEvents.fireComponentEvent('onGearClick', { id, paletteId: node.paletteId, typeId: node.typeId, type: 'node', action: 'config' });
        }
    }, [componentEvents, setSelectedId]);

    const handleActionIconClick = React.useCallback((id: string, iconName: string) => {
        const node = rawNodesDictRef.current[id];
        if (componentEvents && node) {
            componentEvents.fireComponentEvent('onActionIconClick', { id, paletteId: node.paletteId, typeId: node.typeId, type: 'node', name: iconName });
        }
    }, [componentEvents]);

    const handlePaletteItemClick = React.useCallback((item: any) => {
        if (componentEvents) {
            componentEvents.fireComponentEvent('onPaletteItemClick', { id: item.id, typeId: item.typeId, label: item.label, category: item.category, tooltip: item.tooltip, image: item.image, supportedConnections: item.supportedConnections, swappableWith: item.swappableWith, defaultConfigs: item.defaultConfigs, hideHandles: item.hideHandles, style: item.style, labelStyle: item.labelStyle });
        }
    }, [componentEvents]);

    const handleResizeEnd = React.useCallback((id: string, x: number, y: number, width: number, height: number) => {
        try {
            if (store?.props) {
                const nextNodes = { ...rawNodesDictRef.current };
                if (nextNodes[id]) {
                    nextNodes[id].x = Math.round(x);
                    nextNodes[id].y = Math.round(y);
                    nextNodes[id].width = Math.round(width);
                    nextNodes[id].height = Math.round(height);
                    store.props.write('nodes', nextNodes);
                }
            }
        } catch (error: any) {
            console.error("Error in handleResizeEnd:", error);
        }
    }, [store, componentEvents]);

    const handleTextChange = React.useCallback((id: string, text: string) => {
        try {
            if (store?.props) {
                const nextNodes = { ...rawNodesDictRef.current };
                if (nextNodes[id]) {
                    nextNodes[id] = { ...nextNodes[id], text };
                    store.props.write('nodes', nextNodes);
                }
            }
        } catch (error: any) {
            console.error("Error in handleTextChange:", error);
        }
    }, [store, componentEvents]);

    const onNodesChange = React.useCallback((changes: NodeChange[]) => {
        setLocalNodes((nds) => applyNodeChanges(changes, nds));

        // React Flow reports Ctrl/Shift-click toggles and box selections as 'select' changes.
        // Mirror them into our selection state (which is what drives each node's `selected`).
        const selectChanges = changes.filter((c: any) => c.type === 'select');
        if (selectChanges.length === 0) return;
        const next = new Set(selectedNodeIdsRef.current);
        selectChanges.forEach((c: any) => { if (c.selected) next.add(c.id); else next.delete(c.id); });
        setSelectedNodes(Array.from(next));
    }, [setLocalNodes, setSelectedNodes, selectedNodeIdsRef]);

    // `draggedNodes` is every node React Flow is moving (all selected nodes when dragging a selected one).
    // Besides those, linked containers carry the nodes inside them, and edges with pinned waypoints
    // (inside a moving container, or between two moving nodes) carry those waypoints.
    const onNodeDragStart = React.useCallback((event: any, node: any, draggedNodes?: any[]) => {
        closeContextMenu();
        setIsDraggingNode(true);
        const dragged: any[] = draggedNodes && draggedNodes.length > 0 ? draggedNodes : [node];
        const nodePositions: Record<string, { x: number; y: number }> = {};
        const edgeWaypoints: Record<string, { x: number; y: number }[]> = {};
        const movingIds = new Set<string>(dragged.map(n => n.id));

        dragged.forEach(d => {
            const rawNode = rawNodesDict[d.id];
            if (rawNode?.paletteId !== 'container' || rawNode?.configs?.unlinked) return;
            const cx1 = rawNode.x, cy1 = rawNode.y;
            const cx2 = cx1 + (rawNode.width || 300), cy2 = cy1 + (rawNode.height || 300);

            getNodesInside(d.id, rawNodesDict).forEach(id => {
                movingIds.add(id);
                // Nodes React Flow already moves (selected) keep their own drag; only carry the rest.
                if (!dragged.some(n => n.id === id)) nodePositions[id] = { x: rawNodesDict[id].x, y: rawNodesDict[id].y };
            });

            Object.entries(rawEdgesDict).forEach(([edgeId, edgeVal]: any) => {
                if (!edgeVal || !Array.isArray(edgeVal.waypoints) || edgeVal.waypoints.length === 0) return;
                const anyInside = edgeVal.waypoints.some((wp: any) =>
                    wp.x >= cx1 && wp.y >= cy1 && wp.x <= cx2 && wp.y <= cy2
                );
                if (anyInside) edgeWaypoints[edgeId] = edgeVal.waypoints;
            });
        });

        // Edges between two moving nodes keep their shape: carry their pinned waypoints too.
        if (movingIds.size > 1) {
            Object.entries(rawEdgesDict).forEach(([edgeId, edgeVal]: any) => {
                if (!edgeVal || edgeWaypoints[edgeId] || !Array.isArray(edgeVal.waypoints) || edgeVal.waypoints.length === 0) return;
                if (movingIds.has(edgeVal.source) && movingIds.has(edgeVal.target)) edgeWaypoints[edgeId] = edgeVal.waypoints;
            });
        }

        const hasWork = Object.keys(nodePositions).length > 0 || Object.keys(edgeWaypoints).length > 0;
        dragStartPos.current = hasWork ? { nodes: nodePositions, edges: edgeWaypoints } : null;
    }, [rawNodesDict, rawEdgesDict]);

    const onNodeDrag = React.useCallback((event: any, node: any) => {
        const currentDrag = dragStartPos.current;
        if (currentDrag && currentDrag.nodes && rawNodesDict[node.id]) {
            const dx = node.position.x - rawNodesDict[node.id].x;
            const dy = node.position.y - rawNodesDict[node.id].y;

            setLocalNodes(nds => nds.map(n => {
                if (currentDrag.nodes[n.id]) {
                    return { ...n, position: { x: currentDrag.nodes[n.id].x + dx, y: currentDrag.nodes[n.id].y + dy } };
                }
                return n;
            }));

            const edgeDragData = currentDrag.edges as Record<string, { x: number; y: number }[]>;
            const movingNodeIds = new Set(Object.keys(currentDrag.nodes));
            setLocalEdges(edges => edges.map((edge: any) => {
                const originalWps = edgeDragData[edge.id];
                if (originalWps) {
                    return { ...edge, data: { ...edge.data, waypoints: originalWps.map(wp => ({ x: wp.x + dx, y: wp.y + dy })) } };
                }
                if (movingNodeIds.has(edge.source) || movingNodeIds.has(edge.target)) return { ...edge };
                return edge;
            }));
        }
    }, [rawNodesDict, setLocalNodes, setLocalEdges]);

    const onNodeDragStop = React.useCallback((event: any, node: any, draggedNodes?: any[]) => {
        try {
            if (store?.props) {
                const nextNodes = { ...rawNodesDict };
                if (!nextNodes[node.id]) { setTimeout(() => setIsDraggingNode(false), 250); return; }
                const dx = Math.round(node.position.x) - nextNodes[node.id].x;
                const dy = Math.round(node.position.y) - nextNodes[node.id].y;

                // Persist every node React Flow moved (all selected nodes), not just the one grabbed.
                const dragged: any[] = draggedNodes && draggedNodes.length > 0 ? draggedNodes : [node];
                dragged.forEach(d => {
                    if (!nextNodes[d.id]) return;
                    nextNodes[d.id] = { ...nextNodes[d.id], x: Math.round(d.position.x), y: Math.round(d.position.y) };
                });

                const nextEdges = { ...rawEdgesDict };
                let edgesChanged = false;

                if (dragStartPos.current && (dx !== 0 || dy !== 0)) {
                    Object.keys(dragStartPos.current.nodes).forEach(childId => {
                        if (nextNodes[childId]) {
                            nextNodes[childId] = { ...nextNodes[childId], x: dragStartPos.current!.nodes[childId].x + dx, y: dragStartPos.current!.nodes[childId].y + dy };
                        }
                    });

                    const edgeDragData = dragStartPos.current.edges as Record<string, { x: number; y: number }[]>;
                    Object.entries(edgeDragData).forEach(([edgeId, originalWps]: [string, { x: number; y: number }[]]) => {
                        if (nextEdges[edgeId]) {
                            nextEdges[edgeId] = { ...nextEdges[edgeId], waypoints: originalWps.map(wp => ({ x: wp.x + dx, y: wp.y + dy })) };
                            edgesChanged = true;
                        }
                    });
                }

                store.props.write('nodes', nextNodes);
                if (edgesChanged) store.props.write('edges', nextEdges);

                setLocalNodes(nds => nds.map(n => {
                    const final = nextNodes[n.id];
                    if (final) return { ...n, position: { x: final.x, y: final.y } };
                    return n;
                }));
                if (edgesChanged) {
                    setLocalEdges(edges => edges.map(e => {
                        const final = nextEdges[e.id];
                        if (final) return { ...e, data: { ...e.data, waypoints: final.waypoints } };
                        return e;
                    }));
                }

                dragStartPos.current = null;
                setTimeout(() => setIsDraggingNode(false), 250);
            }
        } catch (error: any) {
            setTimeout(() => setIsDraggingNode(false), 250);
            console.error("Error in onNodeDragStop:", error);
        }
    }, [store, rawNodesDict, rawEdgesDict, componentEvents]);

    const onNodesDelete = React.useCallback((deleted: any[]) => {
        try {
            if (!store?.props) return;
            const nextNodes = { ...rawNodesDict };
            const nextEdges = { ...rawEdgesDict };
            let edgesChanged = false;
            deleted.forEach(n => {
                const connectedNodeUuids: string[] = [];
                Object.keys(nextEdges).forEach(edgeId => {
                    const edge = nextEdges[edgeId];
                    if (edge.source === n.id || edge.target === n.id) {
                        connectedNodeUuids.push(edge.source === n.id ? edge.target : edge.source);
                        delete nextEdges[edgeId];
                        edgesChanged = true;
                    }
                });
                delete nextNodes[n.id];
                if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                    componentEvents.fireComponentEvent('onNodeDeleted', { deletedNodeUuid: n.id, connectedNodeUuids, affectedNodes: connectedNodeUuids });
                }
            });
            store.props.write('nodes', nextNodes);
            if (edgesChanged) store.props.write('edges', nextEdges);
            const deletedIds = new Set(deleted.map(n => n.id));
            setSelectedNodes(selectedNodeIdsRef.current.filter(id => !deletedIds.has(id)));
        } catch (error: any) {
            console.error("Error in onNodesDelete:", error);
        }
    }, [store, rawNodesDict, rawEdgesDict, setSelectedNodes, selectedNodeIdsRef, componentEvents, enableOnClickEvents]);

    const onNodeContextMenu = React.useCallback((event: any, node: any) => {
        event.preventDefault();
        // Right-clicking a node that is part of a multi-selection keeps the selection (so Copy applies to all of it).
        if (!selectedNodeIdsRef.current.includes(node.id)) setSelectedId(node.id);
        const bounds = wrapperBoundsRef.current;
        const isContainer = rawNodesDict[node.id]?.paletteId === 'container';
        setContextMenu({ id: node.id, top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'node', isContainer, clientX: event.clientX, clientY: event.clientY });
        setActiveSubMenu(null);
    }, [rawNodesDict, wrapperBoundsRef, setSelectedId, selectedNodeIdsRef, setContextMenu, setActiveSubMenu]);

    const onNodeClick = React.useCallback((event: any, node: any) => {
        closeContextMenu();
        // Ctrl/Cmd/Shift-click toggles membership; React Flow's select change (see onNodesChange) already applied it.
        const isMultiClick = event?.ctrlKey || event?.metaKey || event?.shiftKey;
        if (!isMultiClick) setSelectedId(node.id);
        const rawNode = rawNodesDict[node.id];
        if (componentEvents) componentEvents.fireComponentEvent('onNodeClick', { id: node.id, paletteId: rawNode?.paletteId, typeId: rawNode?.typeId, type: 'node' });
    }, [componentEvents, rawNodesDict, setSelectedId, closeContextMenu]);

    // ─── Clipboard ────────────────────────────────────────────────────────────

    // Copies every node in `ids`, everything inside any copied container, and the edges between copied nodes.
    const executeCopy = React.useCallback((ids: string[]) => {
        const copiedNodes: any = {};
        ids.forEach(id => {
            const node = rawNodesDict[id];
            if (!node) return;
            copiedNodes[id] = node;
            if (node.paletteId === 'container') {
                getNodesInside(id, rawNodesDict).forEach(childId => { copiedNodes[childId] = rawNodesDict[childId]; });
            }
        });
        if (Object.keys(copiedNodes).length === 0) return;
        const copiedEdges: any = {};
        Object.keys(rawEdgesDict).forEach(edgeId => {
            const edge = rawEdgesDict[edgeId];
            if (edge && copiedNodes[edge.source] && copiedNodes[edge.target]) copiedEdges[edgeId] = edge;
        });
        clipboardRef.current = { type: 'group', nodes: copiedNodes, edges: copiedEdges };
    }, [rawNodesDict, rawEdgesDict, clipboardRef]);

    // Pastes the clipboard centered on (anchorX, anchorY), a flow-space point such as the mouse position.
    // The group keeps its internal layout; its top-left is snapped to the grid when snapping is on.
    const executePaste = React.useCallback((anchorX: number, anchorY: number) => {
        try {
            const clipboard = clipboardRef.current;
            if (!clipboard || !store?.props) return;
            const nextNodes = { ...rawNodesDict };
            const nextEdges = { ...rawEdgesDict };

            const createdNodes: { nodeUuid: string; typeId: string; paletteId: string }[] = [];

            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            Object.values(clipboard.nodes).forEach((n: any) => {
                const isContainer = n.paletteId === 'container';
                minX = Math.min(minX, n.x);
                minY = Math.min(minY, n.y);
                maxX = Math.max(maxX, n.x + (n.width || (isContainer ? 300 : 150)));
                maxY = Math.max(maxY, n.y + (n.height || (isContainer ? 300 : 150)));
            });
            let targetX = anchorX - (maxX - minX) / 2;
            let targetY = anchorY - (maxY - minY) / 2;
            if (snapEnabled) { targetX = Math.round(targetX / snapPixels) * snapPixels; targetY = Math.round(targetY / snapPixels) * snapPixels; }
            const dx = Math.round(targetX - minX), dy = Math.round(targetY - minY);
            const idMap: any = {};

            Object.keys(clipboard.nodes).forEach(oldId => {
                const newId = generateShortId();
                idMap[oldId] = newId;
                const oldNode = clipboard.nodes[oldId];
                nextNodes[newId] = JSON.parse(JSON.stringify({ ...oldNode, x: oldNode.x + dx, y: oldNode.y + dy }));
                createdNodes.push({ nodeUuid: newId, typeId: oldNode.typeId, paletteId: oldNode.paletteId });
            });

            Object.keys(clipboard.edges).forEach(oldEdgeId => {
                const newEdgeId = generateShortId();
                const oldEdge = clipboard.edges[oldEdgeId];
                const waypoints = Array.isArray(oldEdge.waypoints) ? oldEdge.waypoints.map((wp: any) => ({ x: wp.x + dx, y: wp.y + dy })) : oldEdge.waypoints;
                nextEdges[newEdgeId] = JSON.parse(JSON.stringify({ ...oldEdge, source: idMap[oldEdge.source], target: idMap[oldEdge.target], waypoints }));
            });

            store.props.write('nodes', nextNodes);
            store.props.write('edges', nextEdges);
            setSelectedNodes(Object.values(idMap) as string[]);

            if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                createdNodes.forEach(n => componentEvents.fireComponentEvent('onNodeCreated', { ...n, affectedNodes: [n.nodeUuid] }));
            }
        } catch (error: any) {
            console.error("Error in executePaste:", error);
        }
    }, [store, rawNodesDict, rawEdgesDict, snapEnabled, snapPixels, setSelectedNodes, clipboardRef, componentEvents, enableOnClickEvents]);

    // ─── Pane handlers ────────────────────────────────────────────────────────

    const onDragOver = React.useCallback((event: any) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = React.useCallback((event: any) => {
        try {
            event.preventDefault();
            event.stopPropagation();
            const paletteItem = draggedItemRef.current;
            if (!paletteItem || !reactFlowInstance) return;
            const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const nodeW = paletteItem.id === 'container' ? 300 : 150;
            const nodeH = paletteItem.id === 'container' ? 300 : 150;
            let dropX = Math.round(position.x - nodeW / 2);
            let dropY = Math.round(position.y - nodeH / 2);
            if (snapEnabled) { dropX = Math.round(dropX / snapPixels) * snapPixels; dropY = Math.round(dropY / snapPixels) * snapPixels; }
            const initialConfigs = JSON.parse(JSON.stringify(paletteItem.defaultConfigs || {}));
            const initialStyle = JSON.parse(JSON.stringify(paletteItem.style || { classes: '' }));
            const initialLabelStyle = JSON.parse(JSON.stringify(paletteItem.labelStyle || { classes: '' }));
            if (store?.props) {
                const newNodeId = generateShortId();
                const newNodeData: any = {
                    paletteId: paletteItem.id,
                    typeId: paletteItem.typeId,
                    label: paletteItem.label,
                    tooltip: paletteItem.tooltip,
                    x: dropX,
                    y: dropY,
                    hideHandles: paletteItem.hideHandles === true,
                    style: initialStyle,
                    labelStyle: initialLabelStyle,
                    configs: initialConfigs,
                    supportedConnections: paletteItem.supportedConnections || [],
                    useOverrideImage: paletteItem.useOverrideImage || false,
                    inactive: paletteItem.inactive || false,
                    actionIcons: JSON.parse(JSON.stringify(paletteItem.actionIcons || [])),
                };
                if (paletteItem.id === 'container') { newNodeData.width = 300; newNodeData.height = 300; newNodeData.zIndex = -500; }
                const nextNodes = { ...rawNodesDict };
                nextNodes[newNodeId] = newNodeData;
                store.props.write('nodes', nextNodes);
                setSelectedId(newNodeId);

                if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                    componentEvents.fireComponentEvent('onNodeCreated', {
                        nodeUuid: newNodeId,
                        typeId: paletteItem.typeId,
                        paletteId: paletteItem.id,
                        affectedNodes: [newNodeId],
                    });
                }
            }
            draggedItemRef.current = null;
        } catch (error: any) {
            console.error("Error in onDrop:", error);
        }
    }, [store, rawNodesDict, snapEnabled, snapPixels, reactFlowInstance, setSelectedId, draggedItemRef, componentEvents, enableOnClickEvents]);

    const onMoveStart = React.useCallback(() => {
        closeContextMenu();
    }, [closeContextMenu]);

    const onPaneClick = React.useCallback(() => {
        setSelectedId(null);
        closeContextMenu();
        if (componentEvents) {
            componentEvents.fireComponentEvent('onPaneClick', { type: 'pane' });
        }
    }, [setSelectedId, closeContextMenu, componentEvents]);

    const onPaneContextMenu = React.useCallback((event: any) => {
        event.preventDefault();
        const bounds = wrapperBoundsRef.current;
        if (reactFlowInstance) {
            const flowPos = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });

            const containerEntry = Object.entries(rawNodesDict)
                .filter(([id, n]: any) => n && n.paletteId === 'container')
                .sort((a: any, b: any) => (b[1].zIndex ?? -1) - (a[1].zIndex ?? -1))
                .find(([id, n]: any) => {
                    const w = n.width || 300, h = n.height || 300;
                    return flowPos.x >= n.x && flowPos.x <= n.x + w && flowPos.y >= n.y && flowPos.y <= n.y + h;
                });

            if (containerEntry) {
                const [id] = containerEntry;
                setContextMenu({ id, top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'node', isContainer: true, clientX: event.clientX, clientY: event.clientY });
            } else {
                setContextMenu({ id: 'pane', top: event.clientY - bounds.top, left: event.clientX - bounds.left, type: 'pane', clientX: event.clientX, clientY: event.clientY });
            }
            setActiveSubMenu(null);
        }
    }, [wrapperBoundsRef, reactFlowInstance, rawNodesDict, setContextMenu, setActiveSubMenu]);

    // ─── Context menu actions ──────────────────────────────────────────────────

    const handleNodeSwap = React.useCallback((newId: string) => {
        try {
            if (!contextMenu || contextMenu.type !== 'node') return;
            const newItem = paletteItems.find((p: any) => p.id === newId);
            if (!newItem) return;
            if (componentEvents) componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: rawNodesDict[contextMenu.id]?.paletteId, type: contextMenu.type, action: `swapNode:${newId}` });
            if (store?.props) {
                const nextNodes = { ...rawNodesDict };
                const existingNode = nextNodes[contextMenu.id];
                const { image: _img, ...existingNodeWithoutImage } = existingNode;
                nextNodes[contextMenu.id] = { ...existingNodeWithoutImage, paletteId: newItem.id, typeId: newItem.typeId, label: newItem.label, tooltip: newItem.tooltip, supportedConnections: newItem.supportedConnections || [] };
                const nextEdges = { ...rawEdgesDict };
                let edgesChanged = false;
                Object.keys(nextEdges).forEach(edgeId => {
                    const e = nextEdges[edgeId];
                    if (e.source === contextMenu.id || e.target === contextMenu.id) {
                        const otherNodeId = e.source === contextMenu.id ? e.target : e.source;
                        const otherNode = nextNodes[otherNodeId];
                        if (otherNode) {
                            const newSupported = newItem.supportedConnections || [];
                            const otherSupported = otherNode.supportedConnections || [];
                            if (!newSupported.includes(e.connectionType) || !otherSupported.includes(e.connectionType)) { delete nextEdges[edgeId]; edgesChanged = true; }
                        }
                    }
                });
                store.props.write('nodes', nextNodes);
                if (edgesChanged) store.props.write('edges', nextEdges);

                if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                    componentEvents.fireComponentEvent('onNodeSwapped', {
                        nodeUuid: contextMenu.id,
                        typeId: newItem.typeId,
                        paletteId: newItem.id,
                        affectedNodes: [contextMenu.id],
                    });
                }
            }
            closeContextMenu();
        } catch (error: any) {
            console.error("Error in handleNodeSwap:", error);
        }
    }, [contextMenu, paletteItems, componentEvents, rawNodesDict, rawEdgesDict, store, closeContextMenu, enableOnClickEvents]);

    const handleContextMenuAction = React.useCallback((action: string) => {
        try {
            if (!contextMenu) return;
            const isNode = contextMenu.type === 'node';
            const isEdge = contextMenu.type === 'edge';
            let currentPaletteId = 'pane';
            if (isNode) currentPaletteId = rawNodesDict[contextMenu.id]?.paletteId;
            if (isEdge) currentPaletteId = rawEdgesDict[contextMenu.id]?.connectionType;
            if (componentEvents) componentEvents.fireComponentEvent('onContextMenuAction', { id: contextMenu.id, paletteId: currentPaletteId, type: contextMenu.type, action });

            if (action === 'editContent' && isNode) {
                setLocalNodes(prev => prev.map(n => n.id === contextMenu.id ? { ...n, data: { ...n.data, isEditing: true } } : n));
                closeContextMenu(); return;
            }

            if (action === 'toggleUnlocked' && isNode) {
                const nextNodes = { ...rawNodesDict };
                const node = nextNodes[contextMenu.id];
                if (node) {
                    const newUnlocked = !node.configs.unlocked;
                    node.configs = { ...node.configs, unlocked: newUnlocked };
                    delete node.configs.unlockMovement;
                    delete node.configs.enableResize;
                    store.props.write('nodes', nextNodes);
                }
                closeContextMenu(); return;
            }

            if (action === 'selectNode' && isNode) { setSelectedId(contextMenu.id); closeContextMenu(); return; }

            if (action === 'reverseEdge' && isEdge) {
                if (store?.props) {
                    const nextEdges = { ...rawEdgesDict };
                    const currentEdge = nextEdges[contextMenu.id];
                    if (currentEdge) {
                        const reversedWaypoints = Array.isArray(currentEdge.waypoints) ? [...currentEdge.waypoints].reverse() : [];
                        nextEdges[contextMenu.id] = { ...currentEdge, source: currentEdge.target, target: currentEdge.source, sourceHandle: currentEdge.targetHandle, targetHandle: currentEdge.sourceHandle, waypoints: reversedWaypoints };
                        store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu(); return;
            }
            if (action === 'config' && isEdge) {
                const currentEdge = rawEdgesDict[contextMenu.id];
                if (currentEdge && store?.props && currentEdge.showLabel !== true) {
                    store.props.write('edges', { ...rawEdgesDict, [contextMenu.id]: { ...currentEdge, showLabel: true } });
                }
                setEditingEdgeId(contextMenu.id);
                closeContextMenu(); return;
            }

            if (action === 'editStyle' && isNode) { setStyleEditorNodeId(contextMenu.id); closeContextMenu(); return; }

            if (action === 'toggleGrayscale' && isNode) {
                if (store?.props) {
                    const nextNodes = { ...rawNodesDict };
                    const target = nextNodes[contextMenu.id];
                    if (target) {
                        const newInactive = !target.inactive;
                        nextNodes[contextMenu.id] = { ...target, inactive: newInactive };
                        const nextEdges = { ...rawEdgesDict };
                        let edgesChanged = false;
                        Object.keys(nextEdges).forEach(edgeId => {
                            const edge = nextEdges[edgeId];
                            if (edge.source === contextMenu.id || edge.target === contextMenu.id) {
                                if (newInactive) {
                                    nextEdges[edgeId] = { ...edge, dashed: true };
                                } else {
                                    const otherNodeId = edge.source === contextMenu.id ? edge.target : edge.source;
                                    if (!nextNodes[otherNodeId]?.inactive) nextEdges[edgeId] = { ...edge, dashed: false };
                                }
                                edgesChanged = true;
                            }
                        });
                        store.props.write('nodes', nextNodes);
                        if (edgesChanged) store.props.write('edges', nextEdges);
                    }
                }
                closeContextMenu(); return;
            }

            if (action === 'copy' && isNode) {
                const selected = selectedNodeIdsRef.current;
                executeCopy(selected.includes(contextMenu.id) ? selected : [contextMenu.id]);
                closeContextMenu(); return;
            }

            if (action === 'toggleLink' && contextMenu.isContainer) {
                if (store?.props) {
                    const nextNodes = { ...rawNodesDict };
                    const target = nextNodes[contextMenu.id];
                    if (target) { target.configs = { ...target.configs, unlinked: !target.configs?.unlinked }; store.props.write('nodes', nextNodes); }
                }
                closeContextMenu(); return;
            }

            if (action === 'paste' && (contextMenu.type === 'pane' || contextMenu.isContainer)) {
                if (reactFlowInstance && contextMenu.clientX && contextMenu.clientY) {
                    const position = reactFlowInstance.screenToFlowPosition({ x: contextMenu.clientX, y: contextMenu.clientY });
                    executePaste(position.x, position.y);
                }
                closeContextMenu(); return;
            }

            if (action === 'deleteWithContents' && isNode) {
                if (store?.props) {
                    const nextNodes = { ...rawNodesDict };
                    const nextEdges = { ...rawEdgesDict };
                    let edgesChanged = false;
                    const idsToDelete = [contextMenu.id, ...getNodesInside(contextMenu.id, rawNodesDict)];
                    idsToDelete.forEach(idToDel => {
                        const connectedNodeUuids: string[] = [];
                        Object.keys(nextEdges).forEach(edgeId => {
                            const edge = nextEdges[edgeId];
                            if (edge.source === idToDel || edge.target === idToDel) {
                                connectedNodeUuids.push(edge.source === idToDel ? edge.target : edge.source);
                                delete nextEdges[edgeId];
                                edgesChanged = true;
                            }
                        });
                        delete nextNodes[idToDel];
                        if (selectedId === idToDel) setSelectedId(null);
                        if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                            componentEvents.fireComponentEvent('onNodeDeleted', { deletedNodeUuid: idToDel, connectedNodeUuids, affectedNodes: connectedNodeUuids });
                        }
                    });
                    store.props.write('nodes', nextNodes);
                    if (edgesChanged) store.props.write('edges', nextEdges);
                }
                closeContextMenu(); return;
            }

            if (action === 'delete') {
                if (contextMenu.type === 'node') {
                    if (store?.props) {
                        const nextNodes = { ...rawNodesDict };
                        const nextEdges = { ...rawEdgesDict };
                        let edgesChanged = false;
                        const connectedNodeUuids: string[] = [];
                        Object.keys(nextEdges).forEach(edgeId => {
                            const edge = nextEdges[edgeId];
                            if (edge.source === contextMenu.id || edge.target === contextMenu.id) {
                                connectedNodeUuids.push(edge.source === contextMenu.id ? edge.target : edge.source);
                                delete nextEdges[edgeId];
                                edgesChanged = true;
                            }
                        });
                        delete nextNodes[contextMenu.id];
                        store.props.write('nodes', nextNodes);
                        if (edgesChanged) store.props.write('edges', nextEdges);
                        if (selectedId === contextMenu.id) setSelectedId(null);
                        if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                            componentEvents.fireComponentEvent('onNodeDeleted', { deletedNodeUuid: contextMenu.id, connectedNodeUuids, affectedNodes: connectedNodeUuids });
                        }
                    }
                } else if (contextMenu.type === 'edge') {
                    if (store?.props) {
                        const nextEdges = { ...rawEdgesDict };
                        const rawEdge = nextEdges[contextMenu.id];
                        delete nextEdges[contextMenu.id];
                        store.props.write('edges', nextEdges);
                        if (selectedId === contextMenu.id) setSelectedId(null);
                        if (enableOnClickEvents && componentEvents?.fireComponentEvent) {
                            componentEvents.fireComponentEvent('onEdgeDeleted', {
                                deletedEdgeUuid: contextMenu.id,
                                source: rawEdge?.source,
                                target: rawEdge?.target,
                                affectedNodes: [rawEdge?.source, rawEdge?.target],
                            });
                        }
                    }
                }
                closeContextMenu(); return;
            }

            if (['bringToFront', 'bringForward', 'sendBackward', 'sendToBack'].includes(action) && isNode) {
                if (store?.props) {
                    const nextNodes = { ...rawNodesDict };
                    const currentZ = nextNodes[contextMenu.id].zIndex ?? -500;
                    if (action === 'bringForward') {
                        nextNodes[contextMenu.id].zIndex = Math.min(currentZ + 1, -100);
                    } else if (action === 'sendBackward') {
                        nextNodes[contextMenu.id].zIndex = Math.max(currentZ - 1, -1000);
                    } else {
                        const containerZIndices = Object.values(nextNodes).filter((n: any) => n.paletteId === 'container').map((n: any) => n.zIndex ?? -500);
                        if (action === 'bringToFront') nextNodes[contextMenu.id].zIndex = Math.min(Math.max(...containerZIndices, -1000) + 1, -100);
                        else if (action === 'sendToBack') nextNodes[contextMenu.id].zIndex = Math.max(Math.min(...containerZIndices, -100) - 1, -1000);
                    }
                    store.props.write('nodes', nextNodes);
                }
                closeContextMenu(); return;
            }

            if (action === 'toggleArrow' && isEdge) {
                if (store?.props) { const nextEdges = { ...rawEdgesDict }; if (nextEdges[contextMenu.id]) { nextEdges[contextMenu.id].arrow = nextEdges[contextMenu.id].arrow === false ? true : false; store.props.write('edges', nextEdges); } }
                closeContextMenu(); return;
            }
            if (action === 'toggleLabel' && isEdge) {
                if (store?.props) { const nextEdges = { ...rawEdgesDict }; if (nextEdges[contextMenu.id]) { nextEdges[contextMenu.id].showLabel = nextEdges[contextMenu.id].showLabel !== true; store.props.write('edges', nextEdges); } }
                closeContextMenu(); return;
            }
            if (action === 'toggleDashed' && isEdge) {
                if (store?.props) { const nextEdges = { ...rawEdgesDict }; if (nextEdges[contextMenu.id]) { nextEdges[contextMenu.id].dashed = !nextEdges[contextMenu.id].dashed; store.props.write('edges', nextEdges); } }
                closeContextMenu(); return;
            }
            if (action === 'clearWaypoints' && isEdge) {
                if (store?.props) { const nextEdges = { ...rawEdgesDict }; if (nextEdges[contextMenu.id]) { nextEdges[contextMenu.id] = { ...nextEdges[contextMenu.id], waypoints: [] }; store.props.write('edges', nextEdges); } }
                closeContextMenu(); return;
            }

            closeContextMenu();
        } catch (error: any) {
            console.error("Error in handleContextMenuAction:", error);
        }
    }, [contextMenu, rawNodesDict, rawEdgesDict, selectedId, snapEnabled, snapPixels, reactFlowInstance, store, componentEvents, enableOnClickEvents, setStyleEditorNodeId, setEditingEdgeId, executeCopy, executePaste, closeContextMenu, setSelectedId]);

    return {
        // State
        isDraggingNode,
        // Refs
        rawNodesDictRef,
        rawEdgesDictRef,
        // Shared
        closeContextMenu,
        // Edge handlers (delegated)
        ...edgeHandlers,
        // Node handlers
        handleGearClick,
        handleActionIconClick,
        handlePaletteItemClick,
        handleResizeEnd,
        handleTextChange,
        onNodesChange,
        onNodeDragStart,
        onNodeDrag,
        onNodeDragStop,
        onNodesDelete,
        onNodeContextMenu,
        onNodeClick,
        // Clipboard
        executeCopy,
        executePaste,
        // Pane
        onDragOver,
        onDrop,
        onMoveStart,
        onPaneClick,
        onPaneContextMenu,
        // Context menu
        handleNodeSwap,
        handleContextMenuAction,
    };
};
