// src/components/LinkButton.tsx
import React from 'react';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
    label: string;
    icon?: string;
    onClick?: () => void;
    className?: string;
}

/**
 * A bold, clickable text component matching Figma's "Links/Link sm" style.
 * Used for Resident and Location names in the Info Panel.
 */
export const LinkButton: React.FC<LinkButtonProps> = ({
    label,
    icon,
    onClick,
    className = '',
}) => {
    return (
        <button
            className={`${styles.link} ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            {icon && (
                <span className="material-symbols-rounded">{icon}</span>
            )}
            {label}
        </button>
    );
};
