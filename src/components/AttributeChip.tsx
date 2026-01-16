// src/components/AttributeChip.tsx
import React from 'react';
import styles from './AttributeChip.module.css';

export type AttributeVariant = 'brand' | 'error' | 'warning' | 'success' | 'info';

interface AttributeChipProps {
    label: string;
    icon?: string;
    variant?: AttributeVariant;
    className?: string;
}

/**
 * A small, high-density chip for displaying metadata attributes.
 * Matches Figma styling for "Performance issues", "API enabled", etc.
 */
export const AttributeChip: React.FC<AttributeChipProps> = ({
    label,
    icon,
    variant = 'brand',
    className = '',
}) => {
    return (
        <div className={`${styles.chip} ${styles[variant]} ${className}`}>
            {icon && (
                <span className={`material-symbols-rounded ${styles.icon}`}>
                    {icon}
                </span>
            )}
            <span className={styles.label}>{label}</span>
        </div>
    );
};
