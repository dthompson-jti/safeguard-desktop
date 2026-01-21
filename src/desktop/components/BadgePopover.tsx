// src/desktop/components/BadgePopover.tsx
import React, { ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import styles from './RowContextMenu.module.css'; // Reusing existing menu styles for consistency

export interface BadgeAction {
    label: string;
    icon: string;
    onClick: () => void;
    destructive?: boolean;
}

interface BadgePopoverProps {
    trigger: ReactNode;
    actions: BadgeAction[];
}

export const BadgePopover: React.FC<BadgePopoverProps> = ({ trigger, actions }) => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                {/* trigger element must accept ref/props via asChild */}
                {trigger}
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className={styles.menu}
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    // Ensure z-index is high enough (using existing modal/popover tokens if available, or relying on portal)
                    style={{ zIndex: 'var(--z-popover)' }}
                >
                    {actions.map((action, idx) => (
                        <div key={action.label}>
                            <Popover.Close asChild>
                                <button
                                    className={`${styles.menuItem} ${action.destructive ? styles.destructive : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click
                                        action.onClick();
                                    }}
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
    );
};
