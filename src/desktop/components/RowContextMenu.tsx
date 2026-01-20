// src/desktop/components/RowContextMenu.tsx

import * as Popover from '@radix-ui/react-popover';
import { Button } from '../../components/Button';
import styles from './RowContextMenu.module.css';

interface RowAction {
    label: string;
    icon: string;
    onClick: () => void;
    destructive?: boolean;
}

interface RowContextMenuProps {
    actions: RowAction[];
}

export const RowContextMenu = ({ actions }: RowContextMenuProps) => {
    return (
        <div className={styles.container}>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button variant="tertiary" size="s" iconOnly aria-label="Row actions">
                        <span className="material-symbols-rounded">more_vert</span>
                    </Button>
                </Popover.Trigger>

                <Popover.Portal>
                    <Popover.Content className={styles.menu} align="end" sideOffset={4}>
                        {actions.map((action, idx) => (
                            <div key={action.label}>
                                <Popover.Close asChild>
                                    <button
                                        className={`${styles.menuItem} ${action.destructive ? styles.destructive : ''}`}
                                        onClick={action.onClick}
                                    >
                                        <span className="material-symbols-rounded">{action.icon}</span>
                                        <span>{action.label}</span>
                                    </button>
                                </Popover.Close>
                                {idx < actions.length - 1 && <div className={styles.separator} />}
                            </div>
                        ))}
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
};
