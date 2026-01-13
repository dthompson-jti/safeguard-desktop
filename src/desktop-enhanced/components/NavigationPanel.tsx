import React from 'react';
import styles from './NavigationPanel.module.css';
import { ModeToggle } from './ModeToggle';
import { TreeView } from './TreeView';
import { Button } from '../../components/Button';

export const NavigationPanel: React.FC = () => {
    return (
        <div className={styles.navPanel}>
            <div className={styles.header}>
                <h2>Safeguard Checks</h2>
                <div className={styles.headerActions}>
                    <Button
                        variant="quaternary"
                        size="s"
                        iconOnly
                        aria-label="Menu"
                        className={styles.menuBtnOverride}
                    >
                        <span className="material-symbols-rounded">more_horiz</span>
                    </Button>
                </div>
            </div>

            <ModeToggle />

            <div className={styles.treeWrapper}>
                <TreeView />
            </div>
        </div>
    );
};
