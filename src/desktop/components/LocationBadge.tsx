// src/desktop/components/LocationBadge.tsx
import React, { forwardRef } from 'react';
import styles from './ResidentStatusBadge.module.css'; // Reuse neutral styling

interface LocationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    onClick?: () => void;
}

export const LocationBadge = forwardRef<HTMLDivElement, LocationBadgeProps>(({
    label,
    onClick,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={`${styles.badge} ${onClick ? styles.clickable : ''} ${className || ''}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            {...props}
        >
            <span className={styles.name}>{label}</span>
        </div>
    );
});

LocationBadge.displayName = 'LocationBadge';
