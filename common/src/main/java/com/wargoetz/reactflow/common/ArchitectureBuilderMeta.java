package com.wargoetz.reactflow.common;

import com.inductiveautomation.ignition.common.jsonschema.JsonSchema;
import com.inductiveautomation.perspective.common.api.BrowserResource;
import com.inductiveautomation.perspective.common.api.ComponentDescriptor;
import com.inductiveautomation.perspective.common.api.ComponentDescriptorImpl;
import com.inductiveautomation.perspective.common.api.ComponentEventDescriptor;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ArchitectureBuilderMeta {

    private static final Logger LOGGER = Logger.getLogger(ArchitectureBuilderMeta.class.getName());

    public static final String COMPONENT_ID = "com.wargoetz.reactflow.architecturebuilder";
    public static final String MODULE_ID = "com.wargoetz.archbuilder";

    private static final BufferedImage ICON = loadIcon();

    private static BufferedImage loadIcon() {
        try {
            return ImageIO.read(ArchitectureBuilderMeta.class.getResourceAsStream("/images/architecture-builder-icon.png"));
        } catch (IOException | IllegalArgumentException e) {
            LOGGER.log(Level.WARNING, "Failed to load Architecture Builder palette icon", e);
            return null;
        }
    }

    public static final BrowserResource JS_RESOURCE = new BrowserResource(
        "architecturebuilder-0-shared-js",
        "/res/" + MODULE_ID + "/WARGoetzComponents.js",
        BrowserResource.ResourceType.JS
    );

    public static final BrowserResource DESIGNER_JS_RESOURCE = new BrowserResource(
        "architecturebuilder-1-designer-js",
        "/res/" + MODULE_ID + "/WARGoetzDesigner.js",
        BrowserResource.ResourceType.JS
    );

    public static final BrowserResource CSS_RESOURCE = new BrowserResource(
        "architecturebuilder-2-shared-css",
        "/res/" + MODULE_ID + "/WARGoetzComponents.css",
        BrowserResource.ResourceType.CSS
    );

    public static final JsonSchema NODE_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"string\" }, \"paletteId\": { \"type\": \"string\" }, \"typeId\": { \"type\": \"string\" }, \"type\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema EDGE_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"string\" }, \"paletteId\": { \"type\": \"string\" }, \"type\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema GEAR_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"string\" }, \"paletteId\": { \"type\": \"string\" }, \"typeId\": { \"type\": \"string\" }, \"type\": { \"type\": \"string\" }, \"action\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema CONTEXT_MENU_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"string\" }, \"paletteId\": { \"type\": \"string\" }, \"type\": { \"type\": \"string\" }, \"action\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema PANE_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"type\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema PALETTE_ITEM_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"string\" }, \"typeId\": { \"type\": \"string\" }, \"label\": { \"type\": \"string\" }, \"category\": { \"type\": \"string\" }, \"tooltip\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema ACTION_ICON_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"id\": { \"type\": \"string\" }, \"paletteId\": { \"type\": \"string\" }, \"typeId\": { \"type\": \"string\" }, \"type\": { \"type\": \"string\" }, \"name\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema EDGE_DELETED_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"deletedEdgeUuid\": { \"type\": \"string\" }, \"source\": { \"type\": \"string\" }, \"target\": { \"type\": \"string\" } } }".getBytes(StandardCharsets.UTF_8)));
    public static final JsonSchema NODE_DELETED_EVENT_SCHEMA = JsonSchema.parse(new ByteArrayInputStream("{ \"type\": \"object\", \"properties\": { \"deletedNodeUuid\": { \"type\": \"string\" }, \"connectedNodeUuids\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } } } }".getBytes(StandardCharsets.UTF_8)));

    public static final ComponentDescriptor DESCRIPTOR = ComponentDescriptorImpl.ComponentBuilder.newBuilder()
        .setId(COMPONENT_ID)
        .setModuleId(MODULE_ID)
        .setPaletteCategory("WARGoetz")
        .setName("Architecture Builder")
        .addPaletteEntry("", "Architecture Builder", "Drag and drop architecture builder.", ICON, null)
        .setIcon(ICON != null ? new ImageIcon(ICON) : null)
        .setDefaultMetaName("ArchitectureBuilder")
        .setResources(Set.of(JS_RESOURCE, DESIGNER_JS_RESOURCE, CSS_RESOURCE))
        .setEvents(Set.of(
                new ComponentEventDescriptor("onNodeClick", "Fired when a node is clicked.", NODE_EVENT_SCHEMA),
                new ComponentEventDescriptor("onEdgeClick", "Fired when an edge is clicked.", EDGE_EVENT_SCHEMA),
                new ComponentEventDescriptor("onGearClick", "Fired when the gear icon is clicked.", GEAR_EVENT_SCHEMA),
                new ComponentEventDescriptor("onActionIconClick", "Fired when a node action icon is clicked.", ACTION_ICON_EVENT_SCHEMA),
                new ComponentEventDescriptor("onContextMenuAction", "Fired when a context menu option is selected.", CONTEXT_MENU_EVENT_SCHEMA),
                new ComponentEventDescriptor("onPaletteItemClick", "Fired when a palette item is clicked in the sidebar.", PALETTE_ITEM_EVENT_SCHEMA),
                new ComponentEventDescriptor("onPaneClick", "Fired when the canvas background is clicked.", PANE_EVENT_SCHEMA),
                new ComponentEventDescriptor("edgeDeleted", "Fired when an edge is deleted.", EDGE_DELETED_EVENT_SCHEMA),
                new ComponentEventDescriptor("nodeDeleted", "Fired when a node is deleted.", NODE_DELETED_EVENT_SCHEMA)
            ))
        .setSchema(JsonSchema.parse(ArchitectureBuilderMeta.class.getResourceAsStream("/architecturebuilder.props.json")))
        .build();
}
