package com.wargoetz.reactflow.designer;

import com.inductiveautomation.ignition.common.licensing.LicenseState;
import com.inductiveautomation.ignition.designer.model.AbstractDesignerModuleHook;
import com.inductiveautomation.ignition.designer.model.DesignerContext;
import com.inductiveautomation.perspective.designer.DesignerComponentRegistry;
import com.inductiveautomation.perspective.designer.api.PerspectiveDesignerInterface;
import com.wargoetz.reactflow.common.ArchitectureBuilderMeta;

public class DesignerHook extends AbstractDesignerModuleHook {

    private DesignerContext context;

    @Override
    public void startup(DesignerContext context, LicenseState activationState) throws Exception {
        this.context = context;
        PerspectiveDesignerInterface perspective = PerspectiveDesignerInterface.get(context);
        DesignerComponentRegistry registry = perspective.getDesignerComponentRegistry();
        registry.registerComponent(ArchitectureBuilderMeta.DESCRIPTOR);
    }

    @Override
    public void shutdown() {
        PerspectiveDesignerInterface perspective = PerspectiveDesignerInterface.get(context);
        perspective.getDesignerComponentRegistry().removeComponent(ArchitectureBuilderMeta.COMPONENT_ID);
    }
}
