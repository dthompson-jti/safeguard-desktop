import React from 'react';
import { useGlobalSummary } from '../hooks/useTreeData';
import styles from './GlobalStatusWidget.module.css';
import { Tooltip } from '../../components/Tooltip';

export const GlobalStatusWidget: React.FC = () => {
    const counts = useGlobalSummary();

    return (
        <div className={styles.container}>
            <Tooltip content="Missed">
                <div className={styles.item}>
                    <span className="material-symbols-rounded" style={{
                        fontSize: 20,
                        color: counts.overdue > 0 ? 'var(--status-danger-fg)' : 'var(--surface-fg-tertiary)'
                    }}>
                        error
                    </span>
                    <span className={styles.value} style={{ color: counts.overdue > 0 ? 'var(--status-danger-fg)' : 'inherit' }}>
                        {counts.overdue}
                    </span>
                </div>
            </Tooltip>

            <div className={styles.divider} />

            <Tooltip content="Due">
                <div className={styles.item}>
                    <span className="material-symbols-rounded" style={{
                        fontSize: 20,
                        color: counts.due > 0 ? 'var(--status-warning-fg)' : 'var(--surface-fg-tertiary)'
                    }}>
                        schedule
                    </span>
                    <span className={styles.value} style={{ color: counts.due > 0 ? 'var(--status-warning-fg)' : 'inherit' }}>
                        {counts.due}
                    </span>
                </div>
            </Tooltip>

            <div className={styles.divider} />

            <Tooltip content="Need comment">
                <div className={styles.item}>
                    <span className="material-symbols-rounded" style={{
                        fontSize: 20,
                        color: counts.needComment > 0 ? 'var(--status-danger-fg)' : 'var(--surface-fg-tertiary)'
                    }}>
                        chat_bubble
                    </span>
                    <span className={styles.value} style={{ color: counts.needComment > 0 ? 'var(--status-danger-fg)' : 'inherit' }}>
                        {counts.needComment}
                    </span>
                </div>
            </Tooltip>
        </div>
    );
};
