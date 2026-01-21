// src/desktop/components/ResidentStatusBadge.tsx
import React, { forwardRef } from 'react';
import styles from './ResidentStatusBadge.module.css';
import { Tooltip } from '../../components/Tooltip';

interface ResidentStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    highRisk?: boolean; // SR
    medicalWatch?: boolean; // MW
    onClick?: () => void;
}

export const ResidentStatusBadge = forwardRef<HTMLDivElement, ResidentStatusBadgeProps>(({
    name,
    highRisk,
    medicalWatch,
    onClick,
    className,
    ...props
}, ref) => {

    // Determine content for tooltip based on status
    const getTooltip = () => {
        const parts = [];
        if (highRisk) parts.push('Suicide Risk');
        if (medicalWatch) parts.push('Medical Watch');
        if (parts.length === 0) return undefined;
        return parts.join(', ');
    };

    const tooltipContent = getTooltip();

    // Base badge element
    const badge = (
        <div
            ref={ref}
            className={`${styles.badge} ${onClick ? styles.clickable : ''} ${className || ''}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            {...props}
        >
            <span className={styles.name}>{name}</span>

            {(highRisk || medicalWatch) && (
                <div className={styles.statusGroup}>
                    <div className={styles.separator} />
                    <div className={styles.icons}>
                        {highRisk && (
                            <span className={`material-symbols-rounded ${styles.icon}`}>warning</span>
                        )}
                        {medicalWatch && (
                            <span className={`material-symbols-rounded ${styles.icon}`}>warning</span>
                        )}
                        {highRisk && <span className={styles.statusLabel}>SR</span>}
                        {medicalWatch && <span className={styles.statusLabel}>MW</span>}
                    </div>
                </div>
            )}
        </div>
    );

    if (tooltipContent) {
        return (
            <Tooltip content={tooltipContent}>
                {badge}
            </Tooltip>
        );
    }

    return badge;
});

ResidentStatusBadge.displayName = 'ResidentStatusBadge';
