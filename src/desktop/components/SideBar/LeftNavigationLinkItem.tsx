import React from 'react';
import styles from './LeftNavigationLinkItem.module.css';

interface LeftNavigationLinkItemProps {
    label: string;
    icon?: React.ReactNode;
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
    description?: string; // For tooltips or expanded info
    level?: number;
}

export const LeftNavigationLinkItem: React.FC<LeftNavigationLinkItemProps> = ({
    label,
    icon,
    selected,
    onClick,
    href,
    level = 0
}) => {
    const Component = href ? 'a' : 'button';

    return (
        <Component
            className={`${styles.item} ${selected ? styles.selected : ''}`}
            onClick={onClick}
            href={href}
            data-selected={selected}
            data-level={level}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
            {selected && <div className={styles.activeIndicator} />}
        </Component>
    );
};
