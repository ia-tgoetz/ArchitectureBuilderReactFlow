import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface EdgeLabelDialogProps {
    initialText: string;
    onSave: (text: string) => void;
    onCancel: () => void;
}

// Rendered by ArchitectureBuilder (not by CustomEdge) so it survives edge remounts,
// e.g. when React Flow re-creates an edge after a hover/z-index change.
export const EdgeLabelDialog = ({ initialText, onSave, onCancel }: EdgeLabelDialogProps) => {
    const [text, setText] = React.useState(initialText);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            onSave(text);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onCancel();
        }
    };

    return ReactDOM.createPortal(
        (
            <div
                className="nodrag nopan"
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto',
                }}
            >
                <div style={{
                    backgroundColor: 'var(--neutral-10)',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid var(--neutral-40)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    minWidth: '220px',
                }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--neutral-70)' }}>
                        Edit Label
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        rows={3}
                        style={{
                            backgroundColor: 'var(--neutral-20)',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            border: '1px solid var(--neutral-40)',
                            fontSize: '12px',
                            color: 'var(--neutral-90)',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            pointerEvents: 'auto',
                        }}
                    />
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={onCancel}
                            style={{
                                padding: '4px 14px', borderRadius: '4px',
                                border: '1px solid var(--neutral-40)',
                                backgroundColor: 'var(--neutral-20)',
                                color: 'var(--neutral-90)',
                                fontSize: '12px', cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(text)}
                            style={{
                                padding: '4px 14px', borderRadius: '4px',
                                border: 'none',
                                backgroundColor: 'var(--callToAction)',
                                color: 'white',
                                fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        ),
        document.body
    );
};
