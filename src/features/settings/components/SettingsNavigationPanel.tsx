import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { settingsExpandedNodesAtom } from '../settingsAtoms';
import { SETTINGS_TREE, SettingsNode } from '../settingsData';
import { SettingsTree } from './SettingsTree';
import { Button } from '../../../components/Button';
import { Popover } from '../../../components/Popover';
import styles from './SettingsNavigationPanel.module.css';

export const SettingsNavigationPanel: React.FC = () => {
    const [isActionsOpen, setIsActionsOpen] = useState(false);
    const [, setExpanded] = useAtom(settingsExpandedNodesAtom);

    const handleExpandAll = () => {
        const allIds = new Set<string>();
        const traverse = (nodes: SettingsNode[]) => {
            nodes.forEach(node => {
                allIds.add(node.id);
                if (node.children) {
                    traverse(node.children);
                }
            });
        };
        traverse(SETTINGS_TREE);
        setExpanded(allIds);
        setIsActionsOpen(false);
    };

    const handleCollapseAll = () => {
        setExpanded(new Set());
        setIsActionsOpen(false);
    };

    return (
        <div className={styles.navPanel}>
            <div className={styles.header}>
                <h2>System Properties</h2>
                <div className={styles.headerActions}>
                    <Popover
                        open={isActionsOpen}
                        onOpenChange={setIsActionsOpen}
                        trigger={
                            <Button
                                variant="tertiary"
                                size="xs"
                                iconOnly
                                aria-label="Menu"
                                className={styles.menuBtnOverride}
                            >
                                <span className="material-symbols-rounded">more_vert</span>
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
                        </div>
                    </Popover>
                </div>
            </div>

            <div className={styles.treeWrapper}>
                <SettingsTree />
            </div>
        </div>
    );
};
