# Architecture Builder module: changes for review

Covers the work done in Claude Code sessions on 2026-10-15 through 2026-10-19.
The folder is not a git repository, so there is no diff to point at. This document is written from the edits made.
Paths are relative to `web/packages/client/typescript/components/ArchitectureBuilder/` unless noted.

Status: all four items below were built with `gradlew clean build` (JDK 17). Items 2, 3 and 4 were verified in a browser against
the test gateway (port 8089); you have confirmed item 2 on your gateway. Item 1 was confirmed by you on 2026-10-15; the later rework of
its dialog is in item 3. Item 4 has not been tried on your gateway yet.

---

## 1. Edge right-click "Config" shows the label and opens the rename popup (2026-10-15)

**Problem:** The Config branch in the edge context menu called `currentEdge.handleLabelDoubleClick()`, which does not exist.
A try/catch swallowed the error, so Config did nothing.

**Change:**
- `useArchitectureFlowHandlers.ts` (Config branch, around line 589): for an edge, writes `showLabel: true` if it is not already set,
  then calls `setEditingEdgeId(contextMenu.id)` and closes the menu.
- `ArchitectureBuilder.tsx`: new `editingEdgeId` state; `setEditingEdgeId` is passed into `useArchitectureFlowHandlers`.
- `useEdgeHandlers.ts`: `handleLabelChange` now also sets `showLabel: true` when a label is saved, so a renamed edge is never saved invisible.

**Behavior:** Right-click edge, Config: the label becomes visible and the "Edit Label" popup opens.

---

## 2. Palette images can be paths/URLs instead of base64 (2026-10-19)

**Problem:** `paletteItems[].image` and `overrideImage` were base64 data URIs embedded in the Main view (about 970 KB of the 1.1 MB view file).
That is not how Ignition components normally reference images. Every node also carried the full string in `data.image`, and the node
memo compared those strings.

**Module change:**
- `svgSanitize.ts`: new `isImageUrl(value)`. `toSafeDataUri()` now returns image paths and http(s) URLs unchanged.
  Other URL schemes (`javascript:`, `file:`, ...) are rejected.
  The palette thumbnail (`Sidebar.tsx`), node image (`ArchitectureNode.tsx`), swap menu icon (`ContextMenu.tsx`) and drag ghost already
  fell through to `toSafeDataUri`, so they needed no edits.
- URLs render through `<img>`, which does not execute script even for SVG, so they skip DOMPurify.
- Existing formats (base64 data URIs, raw SVG markup) work exactly as before.
- Docs updated: `common/src/main/resources/architecturebuilder.props.json` (`image` description), `README.md` (palette `image` row),
  `web/.../ArchitectureBuilder/README.md` ("Custom SVG Images" section).

**Project change (not module code):**
- `...\projects\master\com.inductiveautomation.perspective\views\Exchange\ArchitectureBuilder\LayoutPane\Main\view.json`:
  all 61 palette items now use `/system/images/ArchitectureBuilder/<id>.<ext>`. 62 distinct images (57 SVG, 5 PNG).
  File size 1,100,312 bytes down to 131,687 bytes. Replaced by exact string match; nothing else in the file was touched.
- The image files were extracted to `C:\Users\emoorman\Documents\Docker\ArchitectureBuilder\palette-images\` and you imported them into
  Image Management as a folder named `ArchitectureBuilder`.
- Backup of the original view: `%TEMP%\view.json.pre-image-migration.bak` (a temp location, so copy it somewhere permanent if you want to keep it).

**Not changed:** the optional follow-up of no longer copying the image string into every node's `data.image`. It is much less
important now that images are short paths.

---

## 3. Edge rename popup closed immediately after opening (2026-10-19)

**Problem:** After item 1, the popup appeared and closed about 25 ms later. React Flow replaces the edge's DOM element shortly after the
Config click, which reset the `isEditing` state that lived inside `CustomEdge`. This was observed on every test attempt. What triggers
the replacement was not pinned down; it was not fixed at the source.

**Change:** the popup's state moved to a parent that does not remount.
- **New** `EdgeLabelDialog.tsx`: the popup, rendered through a portal. Same styling as before. Ctrl+Enter saves, Escape cancels.
- `CustomEdge.tsx`: removed `isEditing`, `editingText`, the open-on-`startEditing` effect, `handleSave`, the key and change handlers, the
  popup markup, and the `ReactDOM` import. Label double-click now calls `data.onRequestEdit?.()`.
- `EdgeUtils.ts` (`mapIgnitionToReactFlowEdges`): the last two parameters (`editingEdgeId`, `onEditStarted`) are replaced by one
  `onRequestEdit?: (id) => void`. Each edge gets `data.onRequestEdit`. `startEditing` and `onEditStarted` are gone.
- `ArchitectureBuilder.tsx`: imports `EdgeLabelDialog` and renders it next to `StyleEditorModal` when `editingEdgeId` is set.
  Save calls `handleLabelChange` only if the text changed, then clears `editingEdgeId`. The old `clearEditingEdge` callback was removed.

**Behavior:** Config opens the popup and it stays until Confirm, Cancel or Escape.

---

## 4. Multi-select, box select, multi copy/paste, paste at the mouse (2026-10-19)

**Before:** one selected node at a time (`selectedId`). Copy took one node (or one container with its contents) and only from the
right-click menu or `Ctrl+C` on that single node. `Ctrl+V` pasted next to the original, not where the mouse was.

**Selection** (`ArchitectureBuilder.tsx`, `useArchitectureFlowHandlers.ts`):
- New `selectedNodeIds` state next to `selectedId`. `selectedId` still means "the one selected node or edge" and is `null` while 2+
  nodes are selected. `setSelectedId` is now a wrapper that also updates `selectedNodeIds`, so existing call sites are unchanged;
  `setSelectedNodes(ids)` sets a multi-selection.
- React Flow props: `multiSelectionKeyCode={['Control','Meta','Shift']}` (click toggles a node), `selectionKeyCode={['Shift','Control','Meta']}`
  (hold the key and drag on empty canvas for a selection box; nodes must be fully inside).
- `onNodesChange` mirrors React Flow's `select` changes into `selectedNodeIds`. `onNodeClick` skips its "select only this node" reset when a
  modifier key is held. Plain click, pane click, and edge click still reset to a single (or no) selection.
- `ArchitectureFlowInner` now diffs selected-id sets. The `localNodes` effect derives `selected` from the set.
- CSS: `.react-flow__nodesselection-rect { pointer-events: none }` so the group outline does not block clicks on nodes under it.
- Right-clicking a node that is already in the selection keeps the selection.

**Dragging a selection:** `onNodeDragStart`/`onNodeDragStop` now use every dragged node (React Flow's third argument), so all selected nodes
are saved, not just the one grabbed. Linked containers carry their contents for every container in the drag. Pinned waypoints on edges
between two moving nodes move with them.

**Copy/paste:**
- `executeCopy(ids)` takes a list. It copies each node, everything inside any copied container, and edges between copied nodes. The
  clipboard is always `{ type: 'group', nodes, edges }` (the old `'single'` shape is gone).
- `executePaste(anchorX, anchorY)` now centers the group on the anchor (flow coordinates) and snaps its top-left to the grid.
  Pinned edge waypoints are shifted with the group (previously they were copied unshifted). The pasted nodes become the selection.
- `Ctrl+V` anchors on the last mouse position over the canvas (tracked with `onMouseMove` on the canvas wrapper), or the canvas center
  if the mouse is elsewhere. Right-click Paste anchors on the click position (it no longer snaps the click point itself).
- `Ctrl+C` copies all selected nodes and does nothing if no node is selected, so it no longer overwrites the clipboard.

**Tested** on the test gateway (port 8089): Ctrl-click add/toggle/reset, Shift+drag and Ctrl+drag box select, multi-drag with save and reload,
`Ctrl+C`/`Ctrl+V` (3 nodes + edge, pasted group centered within snap distance of the mouse, selection moves to the pasted nodes), right-click
Copy/Paste, `Delete` on a multi-selection, single-node copy/paste, `Ctrl+Z` after paste, edge click, container drag carrying its contents.

**Bug fixed after first release (2026-10-19): box select randomly selected every node.**
- Cause: the `localNodes` effect in `ArchitectureBuilder.tsx` depended on the selection, so every selection change during a box drag
  rebuilt all nodes from `flowNodes`. Rebuilt nodes have no measured width/height, and React Flow treats a zero-size node as fully
  inside any selection box, so for a moment everything counted as selected. The spikes (all nodes selected) appeared every run in a
  slow sweep test.
- Fix: that effect now reads the selection from `selectedNodeIdsRef` and no longer depends on it. Selection changes are applied to the
  existing nodes by `onNodesChange` and `ArchitectureFlowInner`, which keep their measured size.
- Re-test: 8 slow Shift/Ctrl box sweeps showed 0 spikes; a fixed box still selected exactly the 2 nodes inside it; Ctrl-click still works.

**Known limits:**
- Right-click **Delete** / **Delete with Contents** still act on the one right-clicked node. The `Delete` key deletes the whole selection.
- Snap-to-grid snaps each node separately while dragging, so a group of off-grid nodes can shift a few pixels relative to each other.
- `Ctrl`/`Cmd`+drag on empty canvas now box-selects instead of panning (plain drag still pans).
- Not tested: macOS (`Cmd`), touch devices, a container copy/paste, a multi-selection that includes a container together with its children.

---

## 5. Palette items can show a live Perspective view (`viewPath`) (2026-10-19)

Work is in git: `7d4bcc5` is the baseline before this item; roll back with `git reset --hard 7d4bcc5`. Commits after it are the spike and the resize/cycle/zoom follow-up.

**Change:**
- `architecturebuilder.props.json`: palette items get `viewPath` (string) and `viewParams` (object).
- New `NodeView.tsx`: renders Perspective's `View` (from `@inductiveautomation/perspective-client`) using `ClientStoreProviderContext`, a unique `mountPath` per node, `params` from `viewParams`, and `parent` from a new `ViewParentContext` (provided in `ArchitectureBuilder.tsx` with `props.store`). `isViewPath()` rejects values containing `<`, `>`, `:` or `\`. Below zoom 0.35 (or with no client store) it renders the node image instead.
- `ArchitectureNode.tsx`: shows `NodeView` in place of the image when the palette item has `viewPath`; new `viewPath`, `viewParams`, `enableResize` fields in the memo comparison; renders `NodeResizer` when `data.enableResize`.
- `ArchitectureBuilder.tsx`: `viewPath`/`viewParams` copied into node data; view nodes get `enableResize` and `onResizeEnd` (existing `handleResizeEnd` saves x, y, width, height).
- Size fallbacks: `node.width || 150` / `node.height || 150` for non-containers in `isInsideContainer`, `EdgeUtils.ts` (edge anchors) and `useArchitectureFlowHandlers.ts` (container contents). Previously these were fixed at 150 for non-containers, so a resized node would have had wrong edge anchors.
- Docs: both READMEs.

**Tested** on the test gateway (port 8089), palette item pointing at the existing `templateApproval` view: renders; `viewParams` reach the view; drag, Ctrl+C/Ctrl+V, Delete work; resize saves and survives a reload and the view fills the new size; an edge to a resized node anchors on the new size; zoom below 0.35 unmounts views and zooming in remounts them; no console errors.
**Scale** (200 view nodes of a trivial text-field-plus-icon view): about 35 DOM elements and 0.56 MB JS heap per node (image-only nodes were 0.21 to 0.43 MB); panning median 8 ms, p95 33 ms. Real views will cost more.

**Limits and not tested:**
- Display-only inside the node (pointer events off), so you cannot type into an embedded input.
- Not tested: the Designer, a view that actually embeds the builder (the real cycle case), Perspective views with their own bindings/scripts or heavy content, PNG export with view nodes, undo/redo and swap on view nodes, and the real gateway.
- Only palette-level `viewPath`; no per-node override. The test palette item `view-test` lives in the test project only.
- Resizing is only for palette items with `viewPath`; other architecture nodes stay 150x150.

---

## 6. Drop an edge on empty canvas to add and connect a node (2026-10-19)

**Behavior:** drag an edge from a node handle and release on empty canvas (or inside an unlocked container). A context-menu-style "Add node" popup opens at the pointer. Picking an item creates the node centered on the drop point (snapped if snap is on), connects it, and selects it. Nothing opens if the edge connected to a node, was dropped on a node or edge, was an existing edge being moved, or the source node has no `supportedConnections`.

**Change:**
- New `QuickAddMenu.tsx`: filter box (autofocus, `Enter` picks the first match), items grouped by category with icons (reuses the now-exported `SwapIcon` from `ContextMenu.tsx`), clamped inside the canvas, closes on Escape or an outside press. Items are palette items sharing at least one connection type with the source node, excluding containers and Note/Label.
- `types.ts`: `QuickAddState`.
- `useEdgeHandlers.ts`: `onConnectStart` records the source node and handle; `onConnectEnd` opens the menu when no connection was made and the pointer is on the pane or an unlocked container. The edge writing in `onConnect` moved into a shared `writeNewEdge`; new `createEdgeToNewNode` connects the source handle to the middle handle on the facing side of the new node, using the same connection-type choice (saved pair default, else first valid type).
- `useArchitectureFlowHandlers.ts`: new `addNodeFromEdgeDrop`; `closeContextMenu` also closes this menu; `onPaneClick` ignores the click the browser fires right after the drop (the pane is an ancestor of the handle, so that click otherwise closed the menu instantly).
- New `nodeFactory.ts` (`createPaletteNodeData`): node creation from a palette item, now shared with `onDrop`.
- `ArchitectureBuilder.tsx`: `quickAdd` state, the item filter, and rendering.

**Tested** on the test gateway (port 8089): menu opens at the drop point with compatible items; filter narrows the list; picking an item adds the node and edge; one `Ctrl+Z` removes both, `Ctrl+Y` restores both; Escape and an outside click close it without adding anything; dropping on another node and moving an existing edge's end to empty canvas open no menu; the menu stays inside the canvas near the bottom-right corner.
**Not tested:** touch devices, an unlocked container as the drop area, view nodes as the source, the real gateway.

---

## Things to know when reviewing

- **Stale bundle:** web changes only appear after a clean build, a module reinstall, and a hard browser refresh.
- **Not run:** the `edge-validator` agent was not run after the `CustomEdge.tsx` edits in item 3. It checks the edge rules from `CLAUDE.md`, but only rules 3, 6 and 8 still exist, in `.claude/edge-rules.json`.
- **README gap:** the README still describes Config as node-only; edge Config is undocumented.
- **Edge drag handle:** the segment drag handle covers the center of an edge label, so double-clicking the exact center of a label hits the handle instead. Double-click toward either end of the label. This was not changed.
- **Build:** `./gradlew` fails on the default JDK 25. Use JDK 17 at `C:\Users\emoorman\.jdks\ms-17.0.20.1`.
