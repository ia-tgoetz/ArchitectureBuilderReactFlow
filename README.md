# Ignition Perspective Architecture Builder

The **Architecture Builder** is a specialized, interactive visualization module for Ignition Perspective, built with React Flow, TypeScript, and Styled Components. It enables users to design complex system architectures, infrastructure maps, and network topologies directly within the Perspective Designer and Runtime.

---

## Component Overview

The Architecture Builder renders a pan/zoom infinite canvas. Users drag palette items onto the canvas to place nodes, draw edges between them, group nodes inside container zones, and export the full state as structured JSON through Ignition's prop system.

### Key Functional Features
- **Drag-and-Drop Palette:** Deploy nodes from a categorized sidebar (Gateways, Databases, Devices, Zones, Text).
- **Intelligent Edge Routing:** Edges follow strictly orthogonal (horizontal/vertical) paths. Manual waypoint control via segment drag.
- **Hierarchy & Containers:** Group infrastructure nodes within "Area/Site" containers with nesting support and linked/unlinked move behavior.
- **In-Place Editing:** Double-click labels or notes for inline text editing (`Enter` for newline, `Ctrl+Enter` to submit).
- **Canvas Search:** `Ctrl+F` / `Cmd+F` opens a floating search bar to locate nodes by label, palette type, or ID.
- **State Management:** Visual flagging of inactive nodes (grayscale/blur) without breaking edge connections.
- **Context Menus:** Right-click menus for node configuration, style editing, edge routing, and structural operations.

---

## Designer Props Tree

All properties below are accessible in the Ignition Designer's **Props** panel under the component. They are registered in `getPropsReducer` inside `perspective-client.ts` and defined in `architecturebuilder.props.json`.

### Canvas Behavior

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | Boolean | `true` | When `false`, hides the sidebar palette and disables all editing. Pan and zoom remain active. |
| `enableOnClickEvents` | Boolean | `true` | When `true`, node/edge click events fire even if `enabled` is `false`. Useful for read-only navigation views. |
| `snapEnabled` | Boolean | `true` | Enables grid snapping when moving nodes. |
| `snapPixels` | Number | `15` | Grid snap resolution in pixels. |
| `edgeWidth` | Number | `6` | Global edge stroke thickness in pixels. Selected edges render at `edgeWidth + 2`. |
| `hideHandles` | Boolean | `false` | Hides connection handles on all nodes globally. Can be overridden per palette item. |
| `handleCount` | Number | `3` | Number of connection handles per side of each node. Range: 1–5. Higher values increase per-node memory cost. |
| `refreshHierarchy` | Boolean | `false` | Write-only trigger. Toggle to force a recalculation of the `hierarchy` output prop. |
| `style` | Object | — | Standard Ignition Perspective style object (classes, CSS properties). |

---

### Canvas Data

These properties hold the live canvas state. Read them in scripts to export or analyze the diagram; write them to load a saved diagram.

#### `nodes` (Object)

A dictionary keyed by UUID. Each entry represents a node on the canvas.

| Field | Type | Description |
| :--- | :--- | :--- |
| `paletteId` | String | References a `paletteItems[].id` entry to resolve icon and defaults. |
| `typeId` | String | Logical type identifier (e.g., `"standard-gateway"`, `"sqldb"`). |
| `label` | String | Display label rendered below the node image. |
| `position` | `{x, y}` | Canvas coordinates (pixels). |
| `width` / `height` | Number | Node dimensions; used by containers and resizable text nodes. |
| `style` | Object | Per-node background, border, and padding overrides. |
| `labelStyle` | Object | Font, color, and alignment overrides for the label. |
| `textStyle` | Object | Text style for Note/Label node types. |
| `tooltip` | String | Hover tooltip text. |
| `configs` | Object | Arbitrary configuration bag stored per node (e.g., `{unlocked: true}` for containers). |
| `parentId` | String | UUID of the container node this node lives inside (empty if top-level). |
| `isInactive` | Boolean | When `true`, renders node at `grayscale(100%)` with blur on its image. |

#### `edges` (Object)

A dictionary keyed by UUID. Each entry represents a connection between two nodes.

| Field | Type | Description |
| :--- | :--- | :--- |
| `source` / `target` | String | Node UUIDs for the two endpoints. |
| `sourceHandle` / `targetHandle` | String | Handle IDs identifying which connection point on each node. |
| `connectionType` | String | Key into `connectionTypes` (e.g., `"gateway-network"`, `"mqtt"`). Controls color and label. |
| `lineType` | String | Visual style: `"step"`, `"smoothstep"`, or `"straight"`. |
| `animation` | String | Flow animation: `"none"`, `"forward"`, `"bidirectional"`. Auto-disabled for edges on inactive nodes. |
| `label` | String | Optional text label rendered along the edge midpoint. |
| `waypoints` | Array | Ordered `{x, y}` routing points. Empty array = auto-routed; populated = manual routing persists across node moves. Clear via right-click → **Clear Path**. |

#### `paletteItems` (Array)

Defines the sidebar catalog. Each item controls what is draggable and how it renders on the canvas.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique palette identifier. Referenced by `nodes[].paletteId`. |
| `typeId` | String | Logical type; multiple palette IDs can share a typeId. |
| `label` | String | Display name in the sidebar and default node label. |
| `category` | String | Sidebar group heading (e.g., `"Gateways"`, `"Databases"`, `"Devices/OPC"`). |
| `image` | String | Path to the node icon image. |
| `overrideImage` | String | Optional alternate icon (swapped in via style editor). |
| `tooltip` | String | Sidebar hover tooltip. |
| `supportedConnections` | Array | List of `connectionType` keys this node type can participate in. |
| `swappableWith` | Array | Palette IDs that this node can be swapped to via right-click. |
| `defaultConfigs` | Object | Initial `configs` values written when a node is first dropped. |
| `hideHandles` | Boolean | Overrides global `hideHandles` for this palette item only. |
| `style` / `labelStyle` | Object | Default visual overrides applied when the node is created. |

**Built-in palette categories (40+ items):**
- **Gateways:** Standard, Edge IIOT, Edge Panel, Cloud
- **Databases:** SQLDB, Postgres, MySQL, MSSQL, MariaDB, Oracle, SQLite, Snowflake, Azure SQL, RDS, TigerData, MongoDB, QuestDB
- **Devices/OPC:** OPC-UA server and 30+ device/instrument types
- **Zones:** Area/Site container node
- **Text:** Note (sticky), Label

#### `connectionTypes` (Object)

A dictionary keyed by connection type ID. Controls how edges of that type are rendered.

| Field | Description |
| :--- | :--- |
| `label` | Human-readable name shown in menus. |
| `color` | Edge stroke and arrowhead color (hex). |
| `docsUrl` | Optional URL opened from the edge context menu. |
| `allowMultiple` | Whether multiple edges of this type between the same node pair are permitted. |

**Built-in connection types:** `gateway-network`, `device-driver`, `client`, `db`, `opc-ua`, `mqtt`, and others.

---

### Computed Output Props

These are **read-only** and written back by the component. Do not write to them manually.

| Property | Type | Description |
| :--- | :--- | :--- |
| `hierarchy` | Object | Auto-computed nested tree of areas, child nodes, and enriched connection data. Use in scripts to traverse the diagram topology. Recalculated on every `nodes`/`edges` change, or force-refresh via the `refreshHierarchy` trigger. |

---

## Canvas Search

The built-in search feature lets operators and designers quickly locate nodes on large diagrams.

**Activation:** `Ctrl+F` (Windows/Linux) or `Cmd+F` (Mac). Also accessible via the toolbar.

### Behavior
- **Search scope:** Matches against node `label`, `paletteId`, and `typeId` simultaneously.
- **Case-insensitive** real-time filtering as you type.
- **Result list:** Dropdown shows all matching nodes with a palette-type badge. Scrollable up to 300px height.
- **Fly-to navigation:** Selecting a result pans and zooms the canvas to center that node.
- **Keyboard navigation:** `↑` / `↓` to move through results; `Enter` to select; `Escape` to close.
- **Clear button:** `×` in the input field clears the query instantly.
- The panel is positioned floating at the top-center of the canvas and does not interfere with editing.

**Source:** `components/ArchitectureBuilder/CanvasSearch.tsx`

---

## User Interaction Reference

### Placing & Connecting Nodes
- **Place node:** Drag from sidebar palette onto the canvas.
- **Connect nodes:** Drag from one node's handle to another.
- **Delete:** Select and press `Delete` or `Backspace`.
- **Copy/Paste:** `Ctrl+C` / `Ctrl+V`.

### Editing
- **Label/Note text:** Double-click. `Enter` inserts a newline; `Ctrl+Enter` submits.
- **Style editor:** Right-click node → **Edit Style** to customize background, border, label font/color.
- **Swap type:** Right-click node → **Swap** (only shown when `swappableWith` is configured).

### Containers
- **Group nodes:** Drag nodes into an Area/Site container.
- **Toggle link:** Right-click container → **Toggle Link**.
  - **Locked (default):** Moving the container does not move its contents.
  - **Unlocked:** Moving the container moves all contained nodes together.
- **Resize:** Select container or text node and drag corner handles.

### Edge Routing
- **Manual segment drag:** Click and drag any edge segment to reposition it. Segments are axis-locked (horizontal segments move vertically; vertical segments move horizontally).
- **Snap-aware drag:** Segment drag respects the global snap grid.
- **Persist routing:** Waypoints persist when nodes are moved after manual routing. Only the first and last segments stretch to track endpoint movement.
- **Reset routing:** Right-click edge → **Clear Path** to return to auto-routing.
- **Line type:** Right-click edge → choose `Step`, `Smooth Step`, or `Straight`.
- **Reverse edge:** Right-click edge → **Reverse** to swap source and target.

### Context Menu Summary

| Target | Available Actions |
| :--- | :--- |
| **Node** | Edit Style, Delete, Copy, Swap, Bring Forward, Send Backward, Toggle Inactive, Edit Configs |
| **Edge** | Change Line Type, Change Connection Type, Change Animation, Edit Label, Clear Path, Reverse, Delete |
| **Canvas (empty area)** | Paste, Fit View |

---

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
| :--- | :--- | :--- |
| Canvas Search | `Ctrl+F` | `Cmd+F` |
| Copy | `Ctrl+C` | `Cmd+C` |
| Paste | `Ctrl+V` | `Cmd+V` |
| Delete selected | `Delete` / `Backspace` | `Delete` / `Backspace` |
| Submit text edit | `Ctrl+Enter` | `Cmd+Enter` |
| Close menu / search | `Escape` | `Escape` |
| Navigate search results | `↑` / `↓` + `Enter` | `↑` / `↓` + `Enter` |

---

## Technical Architecture

### Key Source Files

| File | Role |
| :--- | :--- |
| `common/src/main/resources/architecturebuilder.props.json` | Component props schema — defines all Designer-visible properties, types, and defaults. |
| `web/packages/client/typescript/perspective-client.ts` | Registers the component with Ignition Perspective; `getPropsReducer` maps every schema prop via `tree.read()`. |
| `components/ArchitectureBuilder/ArchitectureBuilder.tsx` | Root component; orchestrates canvas, sidebar, and event handling. |
| `components/ArchitectureBuilder/CanvasSearch.tsx` | Floating search dialog implementation. |
| `components/ArchitectureBuilder/ContextMenu.tsx` | Right-click context menu for nodes, edges, and canvas. |
| `components/ArchitectureBuilder/Sidebar.tsx` | Categorized drag-and-drop palette panel. |
| `components/ArchitectureBuilder/CustomEdge.tsx` | Edge rendering with orthogonal routing and waypoint handles. |
| `components/ArchitectureBuilder/EdgeUtils.ts` | Waypoint computation, path building, and segment-drag math. |
| `components/ArchitectureBuilder/useArchitectureFlowHandlers.ts` | React Flow event handlers (connect, drag, delete, etc.). |

### Stack
- **Runtime:** Ignition Perspective 8.3+, Java 17
- **Frontend:** React 18, TypeScript, React Flow v11, MobX, Styled Components
- **Build:** Gradle multi-module (`./gradlew build` / `./gradlew installModule`)
