// @ts-ignore
import { useStore } from 'reactflow';

// Nodes only need values derived from the zoom level, not the raw viewport. `useViewport()` subscribes a
// component to x, y and zoom, so every node re-rendered on every pan and zoom frame. These selectors return
// a number or boolean, so a node re-renders only when its derived value actually changes.

/** Connection handle hit area in screen px: about 24px at zoom 1, between 16 and 22. */
export const useHandleHitSize = (): number =>
    useStore((s: any) => Math.min(22, Math.max(16, Math.round(24 / s.transform[2]))));

/** Resizer handle size in screen px: 16px at zoom 1, never below 10. */
export const useResizerSize = (): number =>
    useStore((s: any) => Math.max(10, Math.round(16 / s.transform[2])));

/** True once the canvas is zoomed in to at least `minZoom`. */
export const useZoomAtLeast = (minZoom: number): boolean =>
    useStore((s: any) => s.transform[2] >= minZoom);
