// src/desktop/components/StatusBadge.tsx
import React from 'react';
import styles from './StatusBadge.module.css';

export type StatusBadgeType = 'missed' | 'due' | 'complete' | 'verified' | 'upcoming' | 'overdue' | 'completed';

interface StatusBadgeProps {
    status: StatusBadgeType;
    label?: string;
}

const getStatusConfig = (status: StatusBadgeType): { label: string; icon: string | null } => {
    switch (status) {
        case 'missed':
            return { label: 'Missed', icon: 'error' };
        case 'due':
            return { label: 'Due', icon: 'schedule' };
        case 'upcoming':
            return { label: 'Upcoming', icon: 'event' };
        case 'overdue':
            return { label: 'Overdue', icon: 'notifications_active' };
        case 'complete':
        case 'verified':
        case 'completed':
            return { label: 'Completed', icon: 'check_circle' };
        default:
            return { label: status, icon: null };
    }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label: customLabel }) => {
    const config = getStatusConfig(status);
    const label = customLabel || config.label;

    return (
        <div className={styles.badge} data-status={status}>
            {config.icon && (
                <span className={`material-symbols-rounded ${styles.icon}`}>
                    {config.icon}
                </span>
            )}
            <span className={styles.label}>{label}</span>
        </div>
    );
};
