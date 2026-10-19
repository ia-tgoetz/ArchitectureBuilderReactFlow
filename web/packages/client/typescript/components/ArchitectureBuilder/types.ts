/** Menu shown when an edge is dragged from a node and dropped on empty canvas. */
export interface QuickAddState {
    sourceId: string;
    sourceHandle: string | null;
    top: number;
    left: number;
    clientX: number;
    clientY: number;
}

export interface ContextMenuState {
    id: string;
    top: number;
    left: number;
    type: 'node' | 'edge' | 'pane';
    clientX?: number;
    clientY?: number;
    isContainer?: boolean;
}
