import React, { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { desktopEnhancedExpandedNodesAtom } from '../atoms';
import { saveFiltersAsDefaultAtom } from '../../desktop/atoms';
import { addToastAtom } from '../../data/toastAtoms';
import { useTreeData, TreeGroup, TreeUnit } from '../hooks/useTreeData';
import styles from './NavigationPanel.module.css';
import { ModeToggle } from './ModeToggle';
import { TreeView } from './TreeView';
import { Button } from '../../components/Button';
import { Popover } from '../../components/Popover';

type TreeNode = TreeGroup | TreeUnit;

export const NavigationPanel: React.FC = () => {
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    const facilityNodes = useTreeData();
    const [, setExpanded] = useAtom(desktopEnhancedExpandedNodesAtom);
    const saveDefaults = useSetAtom(saveFiltersAsDefaultAtom);
    const addToast = useSetAtom(addToastAtom);

    const handleExpandAll = () => {
        const allIds = new Set<string>();
        const traverse = (nodes: TreeNode[]) => {
            nodes.forEach(node => {
                allIds.add(node.id);
                if ('children' in node && node.children) {
                    traverse(node.children as TreeNode[]);
                }
            });
        };
        traverse(facilityNodes);
        setExpanded(allIds);
        setIsActionsOpen(false);
    };

    const handleCollapseAll = () => {
        // Clearing will let TreeView effect re-expand root, effectively "resetting" the tree
        setExpanded(new Set());
        setIsActionsOpen(false);
    };

    const handleSaveDefaults = () => {
        saveDefaults();
        addToast({
            message: 'Current filters saved as default',
            icon: 'bookmark',
            variant: 'success'
        });
        setIsActionsOpen(false);
    };

    return (
        <div className={styles.navPanel}>
            <div className={styles.header}>
                <h2>Safeguard Checks</h2>
                <div className={styles.headerActions}>
                    <Popover
                        open={isActionsOpen}
                        onOpenChange={setIsActionsOpen}
                        trigger={
                            <Button
                                variant="tertiary"
                                size="s"
                                iconOnly
                                aria-label="Menu"
                                className={styles.menuBtnOverride}
                            >
                                <span className="material-symbols-rounded">more_horiz</span>
                            </Button>
                        }
                    >
                        <div className="menuPopover">
                            <button className="menuItem" onClick={handleExpandAll}>
                                <span className="material-symbols-rounded">unfold_more</span>
                                Expand all
                            </button>
                            <button className="menuItem" onClick={handleCollapseAll}>
                                <span className="material-symbols-rounded">unfold_less</span>
                                Collapse all
                            </button>
                            <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--control-border-secondary)' }} />
                            <button className="menuItem" onClick={handleSaveDefaults}>
                                <span className="material-symbols-rounded">bookmark</span>
                                Set as my defaults
                            </button>
                        </div>
                    </Popover>
                </div>
            </div>

            <ModeToggle />

            <div className={styles.treeWrapper}>
                <TreeView />
            </div>
        </div>
    );
};
