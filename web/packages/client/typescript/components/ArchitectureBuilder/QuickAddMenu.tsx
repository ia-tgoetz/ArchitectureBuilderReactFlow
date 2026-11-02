import * as React from 'react';
import { SwapIcon } from './ContextMenu';
import { QuickAddState } from './types';

const CONTAINER_STYLE: React.CSSProperties = {
    position: 'absolute', zIndex: 10, backgroundColor: 'var(--neutral-20)', border: '1px solid var(--neutral-50)',
    borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', padding: '4px', width: '220px', fontSize: '12px',
};

export interface QuickAddMenuProps {
    quickAdd: QuickAddState;
    /** Palette items that can connect to the dragged-from node. */
    items: any[];
    wrapperRef: React.RefObject<HTMLDivElement>;
    onSelect: (item: any) => void;
    onClose: () => void;
}

/**
 * Menu shown when an edge is dragged out of a node and dropped on empty canvas. Behaves like the
 * right-click menu: opens at the pointer, clamps inside the canvas, closes on Escape or an outside click.
 */
export const QuickAddMenu = ({ quickAdd, items, wrapperRef, onSelect, onClose }: QuickAddMenuProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [filter, setFilter] = React.useState('');
    const [adjustment, setAdjustment] = React.useState({ dx: 0, dy: 0 });

    // Keep the menu inside the canvas (wrapper-local coordinates, same as the context menu).
    React.useLayoutEffect(() => {
        if (!containerRef.current || !wrapperRef.current) return;
        const menuW = containerRef.current.offsetWidth;
        const menuH = containerRef.current.offsetHeight;
        const wrapW = wrapperRef.current.clientWidth;
        const wrapH = wrapperRef.current.clientHeight;
        let dx = 0, dy = 0;
        if (quickAdd.left + menuW > wrapW - 8) dx = wrapW - 8 - (quickAdd.left + menuW);
        if (quickAdd.top + menuH > wrapH - 8) dy = wrapH - 8 - (quickAdd.top + menuH);
        if (quickAdd.left + dx < 8) dx = 8 - quickAdd.left;
        if (quickAdd.top + dy < 8) dy = 8 - quickAdd.top;
        setAdjustment({ dx, dy });
    }, [quickAdd.top, quickAdd.left, items.length]);

    // Close on an outside press.
    React.useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) onClose();
        };
        document.addEventListener('pointerdown', onPointerDown, true);
        return () => document.removeEventListener('pointerdown', onPointerDown, true);
    }, [onClose]);

    const groups = React.useMemo(() => {
        const needle = filter.trim().toLowerCase();
        const byCategory = new Map<string, any[]>();
        items.forEach(item => {
            if (needle && !String(item.label || '').toLowerCase().includes(needle)) return;
            const category = item.category || 'Other';
            if (!byCategory.has(category)) byCategory.set(category, []);
            byCategory.get(category)!.push(item);
        });
        return Array.from(byCategory.entries());
    }, [items, filter]);

    return (
        <div
            ref={containerRef}
            role="menu"
            aria-label="Add node"
            style={{ ...CONTAINER_STYLE, top: quickAdd.top + adjustment.dy, left: quickAdd.left + adjustment.dx }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <input
                autoFocus
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
                    else if (e.key === 'Enter' && groups.length > 0) { onSelect(groups[0][1][0]); }
                }}
                placeholder="Add node..."
                style={{ width: '100%', boxSizing: 'border-box', marginBottom: '4px', padding: '4px 6px', fontSize: '12px', backgroundColor: 'var(--neutral-10)', color: 'var(--neutral-90)', border: '1px solid var(--neutral-50)', borderRadius: '3px' }}
            />
            <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {groups.length === 0 && <div style={{ padding: '5px 8px', color: 'var(--neutral-60)' }}>No matching nodes</div>}
                {groups.map(([category, categoryItems]) => (
                    <div key={category}>
                        <div style={{ padding: '4px 8px 2px', color: 'var(--neutral-60)', fontSize: '11px', fontWeight: 'bold' }}>{category}</div>
                        {categoryItems.map(item => (
                            <div
                                key={item.id}
                                role="menuitem"
                                className="arch-quickadd-item"
                                style={{ padding: '4px 8px', cursor: 'pointer', color: 'var(--neutral-90)', display: 'flex', alignItems: 'center', gap: '8px' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--neutral-30)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                                onClick={() => onSelect(item)}
                            >
                                <div style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                                    {item.image ? <SwapIcon image={item.image} label={item.label} /> : null}
                                </div>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
