// src/components/LabelValueRow.tsx
import React from 'react';
import styles from './LabelValueRow.module.css';

interface LabelValueRowProps {
    label: string;
    value: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'late' | 'onTime';
    className?: string;
}

/**
 * A standardized 2-line layout for displaying metadata:
 * Label (Top) + Value (Bottom)
 * Matches Figma design pattern for Detail Panels.
 */
export const LabelValueRow: React.FC<LabelValueRowProps> = ({
    label,
    value,
    variant = 'primary',
    className = '',
}) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.labelGroup}>
                <span className={styles.label}>{label}</span>
            </div>
            <div className={`${styles.value} ${styles[variant]}`}>
                {value}
            </div>
        </div>
    );
};
