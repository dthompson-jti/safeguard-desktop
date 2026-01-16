// src/desktop/components/StatusBadge.tsx
import React from 'react';
import styles from './StatusBadge.module.css';

export type StatusBadgeType = 'missed' | 'missed-uncommented' | 'missed-commented' | 'due' | 'complete' | 'verified' | 'upcoming' | 'overdue' | 'completed' | 'special';

interface StatusBadgeProps {
    status: StatusBadgeType;
    label?: string;
    fill?: boolean;
    iconOnly?: boolean;
}

const getStatusConfig = (status: StatusBadgeType): { label: string; icon: string | null } => {
    switch (status) {
        case 'missed':
        case 'missed-uncommented':
            return { label: 'Missed – No Comment', icon: 'error' };
        case 'missed-commented':
            return { label: 'Missed – Commented', icon: 'comment' };
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

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label: customLabel, fill = false, iconOnly = false }) => {
    const config = getStatusConfig(status);
    const label = customLabel || config.label;

    return (
        <div
            className={`${styles.badge} ${iconOnly ? styles.iconOnly : ''}`}
            data-status={status}
            title={iconOnly ? label : undefined}
        >
            {config.icon && (
                <span
                    className={`material-symbols-rounded ${styles.icon} ${fill ? styles.iconFilled : ''}`}
                >
                    {config.icon}
                </span>
            )}
            {!iconOnly && <span className={styles.label}>{label}</span>}
        </div>
    );
};
