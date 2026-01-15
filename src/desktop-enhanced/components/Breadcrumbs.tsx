import { useAtom, useAtomValue } from 'jotai';
import { desktopEnhancedSelectionAtom, SelectionType, desktopEnhancedViewAtom } from '../atoms';
import { isDetailPanelOpenAtom } from '../../desktop/atoms';
import { TreeGroup, TreeUnit, useTreeData } from '../hooks/useTreeData';
import { Button } from '../../components/Button';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
    const [selection, setSelection] = useAtom(desktopEnhancedSelectionAtom);
    const [isPanelOpen, setIsPanelOpen] = useAtom(isDetailPanelOpenAtom);
    const view = useAtomValue(desktopEnhancedViewAtom);
    const groups = useTreeData();

    // Helper to find names and build navigation paths
    const getParts = () => {
        const root = groups[0];
        if (!root) return [];

        const parts = [{ name: root.name, id: root.id, type: root.type as SelectionType }];

        if (selection.type === 'root') {
            return parts;
        }

        if (selection.type === 'group') {
            const group = root.children.find(g => g.id === selection.id);
            if (group) parts.push({ name: group.name, id: group.id, type: group.type as SelectionType });
            return parts;
        }


        if (selection.type === 'unit') {
            const group = root.children.find(g => 'children' in g && g.children.some(u => u.id === selection.id)) as TreeGroup | undefined;
            const unit = group?.children.find((u) => u.id === selection.id) as TreeUnit | undefined;
            if (group) parts.push({ name: group.name, id: group.id, type: group.type as SelectionType });
            if (unit) parts.push({ name: unit.name, id: unit.id, type: unit.type as SelectionType });
            return parts;
        }
        return parts;
    };

    const parts = getParts();

    return (
        <div className={styles.breadcrumbs}>
            <div className={styles.parts}>
                {parts.map((part, index) => (
                    <div key={index} className={styles.part}>
                        <button
                            className={styles.text}
                            onClick={() => setSelection({ type: part.type, id: part.id })}
                        >
                            {part.name}
                        </button>
                        {index < parts.length - 1 && (
                            <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--surface-fg-quaternary)' }}>
                                chevron_right
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.actions}>
                {view === 'historical' && (
                    <Button
                        variant="secondary"
                        size="m"
                        iconOnly
                        onClick={() => setIsPanelOpen(!isPanelOpen)}
                        aria-label="Toggle side panel"
                        className={isPanelOpen ? styles.activeAction : ''}
                    >
                        <span className="material-symbols-rounded">
                            {isPanelOpen ? 'right_panel_close' : 'right_panel_open'}
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
};
