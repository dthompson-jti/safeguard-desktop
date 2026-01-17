import React from 'react';
import styles from './NavItem.module.css';

interface NavItemProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive?: boolean;
    onClick?: () => void;
}

export function NavItem({ label, icon: Icon, isActive, onClick }: NavItemProps) {
    return (
        <button
            className={styles.link}
            data-active={isActive}
            onClick={onClick}
            // Accessibility
            aria-current={isActive ? 'page' : undefined}
            role="link"
            tabIndex={0}
        >
            <span className={styles.icon}>
                <Icon />
            </span>
            <span className={styles.label}>{label}</span>
        </button>
    );
}
