/**
 * Builds the persisted node dict for a new node created from a palette item (drag-drop, or an edge dropped
 * on empty canvas). The image is not stored; it is resolved from the palette at render time.
 */
export const createPaletteNodeData = (paletteItem: any, x: number, y: number): any => {
    const data: any = {
        paletteId: paletteItem.id,
        typeId: paletteItem.typeId,
        label: paletteItem.label,
        tooltip: paletteItem.tooltip,
        x,
        y,
        hideHandles: paletteItem.hideHandles === true,
        style: JSON.parse(JSON.stringify(paletteItem.style || { classes: '' })),
        labelStyle: JSON.parse(JSON.stringify(paletteItem.labelStyle || { classes: '' })),
        configs: JSON.parse(JSON.stringify(paletteItem.defaultConfigs || {})),
        supportedConnections: paletteItem.supportedConnections || [],
        useOverrideImage: paletteItem.useOverrideImage || false,
        inactive: paletteItem.inactive || false,
        actionIcons: JSON.parse(JSON.stringify(paletteItem.actionIcons || [])),
    };
    if (paletteItem.id === 'container') { data.width = 300; data.height = 300; data.zIndex = -500; }
    return data;
};
