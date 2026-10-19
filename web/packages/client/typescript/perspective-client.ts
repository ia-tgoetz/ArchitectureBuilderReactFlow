import { ComponentMeta, ComponentRegistry } from '@inductiveautomation/perspective-client';
import { ArchitectureBuilder } from './components/ArchitectureBuilder/ArchitectureBuilder';

export { ArchitectureBuilder };

export class ArchitectureBuilderMeta implements ComponentMeta {
    getComponentType(): string {
        return 'com.wargoetz.reactflow.architecturebuilder';
    }
    getViewComponent(): any {
        return ArchitectureBuilder as any;
    }
    getDefaultSize(): any {
        return { width: 800, height: 600 };
    }
    getPropsReducer(tree: any): any {
        const rawHandleCount = tree.read('handleCount', 3);
        const clampedHandleCount = Math.max(1, Math.min(5, Number(rawHandleCount) || 3));

        return {
            nodes: tree.read('nodes'),
            edges: tree.read('edges'),
            paletteItems: tree.read('paletteItems'),
            connectionTypes: tree.read('connectionTypes'),
            nodeTypeConnectionDefaults: tree.read('nodeTypeConnectionDefaults'),

            enabled: tree.read('enabled', true),
            enableOnClickEvents: tree.read('enableOnClickEvents', true),
            snapEnabled: tree.read('snapEnabled', true),
            showGrid: tree.read('showGrid', true),
            snapPixels: tree.read('snapPixels', 15),
            edgeWidth: tree.read('edgeWidth', 6),
            hideHandles: tree.read('hideHandles', false),
            handleCount: clampedHandleCount,
            refreshHierarchy: tree.read('refreshHierarchy', false),
            style: tree.read('style')
        };
    }
}

// --- REGISTRATION ---
const registry = ComponentRegistry as any;
if (registry.registerComponent) {
    registry.registerComponent(new ArchitectureBuilderMeta());
} else {
    registry.register(new ArchitectureBuilderMeta());
}
