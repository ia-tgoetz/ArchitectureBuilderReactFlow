# Architecture Builder module: changes for review

Covers the work done in Claude Code sessions on 2026-10-15 through 2026-10-21.
Items 1 to 4 predate the git repo. From item 5 on the work is committed, so `git diff 7d4bcc5` shows everything after item 4
(`7d4bcc5` = baseline with items 1 to 4; `154ea07`, `ce341c1`, `32fc67f` = item 5; `237e66f` = item 6).
Paths are relative to `web/packages/client/typescript/components/ArchitectureBuilder/` unless noted.

Status: all six items were built with `gradlew clean build` (JDK 17). Items 2 to 6 were verified in a browser against
the test gateway (port 8089); you have confirmed item 2 on your gateway. Item 1 was confirmed by you on 2026-10-15; the later rework of
its dialog is in item 3. Items 4, 5 and 6 have not been tried on your gateway yet. Item 7 (load test) found the current build is
roughly 30 to 50% slower than the baseline on pan, zoom and drag with 100+ plain nodes; the cause is not yet identified.

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

## 7. Load test: did items 4 to 6 degrade performance? (2026-10-21)

**Method:** an A/B on the test gateway (port 8089), same machine and same session, so results do not depend on last week's numbers.
Both builds were produced from git: baseline = `7d4bcc5` (before viewPath, quick-add, nodeFactory), current = `237e66f`.
For each node count (0/100/200/300/500, plain palette nodes inserted with the test view's "Add 100 Nodes" button) a Playwright script
pans, zooms and drags a node, and records: worst event delay (Event Timing, an INP-like figure), `requestAnimationFrame` frame time
(p50/p95/max) during each gesture, long tasks, DOM element count and `usedJSHeapSize`. The script is `.playwright-mcp/measure.js`.
This is a lighter substitute for `/performance-scaling-monitor` (no heap snapshots, no traces), so it is not comparable to StressTest_16.

**Baseline (`7d4bcc5`) results:**

| Nodes | Worst event delay | Pan frame p95 | Zoom frame p95 | Node-drag worst frame | DOM elements | JS heap |
|---|---|---|---|---|---|---|
| 0 | 16 ms | 16.6 ms | 9 ms | n/a | 296 | 32 MB |
| 100 | 64 ms | 26.6 ms | 35 ms | 59 ms | 3,107 | 48 MB |
| 200 | 152 ms | 52.6 ms | 77 ms | 143 ms | 5,871 | 64 MB |
| 300 | 200 ms | 70 ms | 116 ms | 185 ms | 8,656 | 218 MB |
| 500 | 280 ms | 128 ms | 204 ms | 274 ms | 14,231 | 193 MB |

**Current build (`237e66f`) results** (change vs baseline in parentheses):

| Nodes | Worst event delay | Pan frame p95 | Zoom frame p95 | Node-drag worst frame | DOM elements | JS heap |
|---|---|---|---|---|---|---|
| 0 | 16 ms (same) | 16.8 ms (same) | 16.4 ms (+7) | n/a | 296 (same) | 35 MB |
| 100 | 112 ms (+75%) | 41 ms (+54%) | 62 ms (+76%) | 100 ms (+69%) | 3,123 (+16) | 49 MB |
| 200 | 200 ms (+32%) | 78 ms (+48%) | 111 ms (+44%) | 184 ms (+29%) | 5,903 (+32) | 127 MB |
| 300 | 192 ms (-4%) | 107 ms (+53%) | 165 ms (+42%) | 185 ms (same) | 8,696 (+40) | 155 MB |
| 500 | 416 ms (+49%) | 177 ms (+38%) | 266 ms (+30%) | 400 ms (+46%) | 14,303 (+72) | 193 MB |
| 500 (repeat) | 432 ms | 173 ms | 301 ms | 422 ms | 14,303 | 112 MB |

**Reading the results:** with plain nodes, the current build is slower than the baseline at every count from 100 up, typically by 30 to 50%
on pan, zoom, and drag frame times (the 300-node event delay and drag are the exceptions). The 500-node repeat matched the first run, so
the slowdown is repeatable. Only the current build was repeated; the baseline was a single run, so its own run-to-run spread is unknown.
Memory and DOM size are essentially unchanged (DOM grows by about 0.14 elements per node), so the cost is in render/update work, not
in what is on the page. The cause has not been identified. Untested suspects: the multi-select state added in item 4 (`selectedNodeIds`,
selection diffing in `ArchitectureFlowInner`, `onNodesChange` mirroring), the new `ViewParentContext` provider, and the per-node data fields
added in item 5 changing memo behavior. A profile of one pan or drag at 300+ nodes would pin it down.

**Caveats:** heap was read without forcing GC, so it is noisy (218 MB at 300 nodes vs 193 MB at 500). Long-task totals were very large
(for example 91 s at 500 nodes) and look inflated, so they are not used for conclusions. Single run per milestone. These tests use ordinary
palette nodes; they do not exercise live-view nodes, which cost more per node (see item 5).

**Housekeeping:** `build/*.modl` and `build/buildResult.json` are tracked in git, so they show as modified after every build and block
`git checkout` unless forced. The `build/` copy currently matches the `237e66f` build.

---

## Things to know when reviewing

- **Stale bundle:** web changes only appear after a clean build, a module reinstall, and a hard browser refresh.
- **Not run:** the `edge-validator` agent was not run after the `CustomEdge.tsx` edits in item 3. It checks the edge rules from `CLAUDE.md`, but only rules 3, 6 and 8 still exist, in `.claude/edge-rules.json`.
- **README gap:** the README still describes Config as node-only; edge Config is undocumented.
- **Edge drag handle:** the segment drag handle covers the center of an edge label, so double-clicking the exact center of a label hits the handle instead. Double-click toward either end of the label. This was not changed.
- **Build:** `./gradlew` fails on the default JDK 25. Use JDK 17 at `C:\Users\emoorman\.jdks\ms-17.0.20.1`.
