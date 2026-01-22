// src/desktop/components/StatusBadge.tsx
import React from 'react';
import styles from './StatusBadge.module.css';
import { Tooltip } from '../../components/Tooltip';

export type StatusBadgeType = 'missed' | 'missed-not-reviewed' | 'missed-reviewed' | 'due' | 'complete' | 'verified' | 'upcoming' | 'overdue' | 'completed' | 'special';

interface StatusBadgeProps {
    status: StatusBadgeType;
    label?: string;
    fill?: boolean;
    iconOnly?: boolean;
    tooltip?: string;
    showIcon?: boolean;
    colorMode?: 'neutral' | 'warning' | 'info' | 'solid' | 'neutral-strong';
}

const getStatusConfig = (status: StatusBadgeType): { label: string; icon: string | null } => {
    switch (status) {
        case 'missed':
        case 'missed-not-reviewed':
            return { label: 'Missed – not reviewed', icon: 'error' };
        case 'missed-reviewed':
            return { label: 'Missed – reviewed', icon: 'comment' };
        case 'due':
            return { label: 'Due', icon: 'schedule' };
        case 'upcoming':
            return { label: 'Upcoming', icon: 'event' };
        case 'overdue':
            return { label: 'Missed', icon: 'notifications_active' };
        case 'complete':
        case 'verified':
        case 'completed':
            return { label: 'Completed', icon: 'check_circle' };
        case 'special':
            return { label: 'Special', icon: 'warning' };
        default:
            return { label: status, icon: null };
    }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label: customLabel, fill = false, iconOnly = false, tooltip, showIcon = true, colorMode }) => {
    const config = getStatusConfig(status);
    const label = customLabel || config.label;
    const tooltipContent = tooltip || (iconOnly ? label : undefined);

    const badge = (
        <div
            className={`${styles.badge} ${iconOnly ? styles.iconOnly : ''}`}
            data-status={status}
            data-color-mode={colorMode}
        >
            {config.icon && showIcon && (
                <span
                    className={`material-symbols-rounded ${styles.icon} ${fill ? styles.iconFilled : ''}`}
                >
                    {config.icon}
                </span>
            )}
            {!iconOnly && <span className={styles.label}>{label}</span>}
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
};
