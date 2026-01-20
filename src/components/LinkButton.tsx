// src/components/LinkButton.tsx
import React from 'react';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
    label: string;
    icon?: string;
    external?: boolean;
    variant?: 'primary' | 'ghost';
    onClick?: () => void;
    className?: string;
}

/**
 * A clickable text component matching Figma's "Links" style.
 * Enhanced with fade-in external icon support and ghost variants.
 */
export const LinkButton: React.FC<LinkButtonProps> = ({
    label,
    icon,
    external,
    variant = 'primary',
    onClick,
    className = '',
}) => {
    return (
        <button
            className={`${styles.link} ${styles[variant]} ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            {icon && (
                <span className="material-symbols-rounded">{icon}</span>
            )}
            <span className={styles.label}>{label}</span>
            {external && (
                <span className={`material-symbols-rounded ${styles.externalIcon}`}>
                    open_in_new
                </span>
            )}
        </button>
    );
};
