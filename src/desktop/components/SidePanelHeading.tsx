import React from 'react';
import styles from './SidePanelHeading.module.css';

interface SidePanelHeadingProps {
    title: string;
    className?: string;
}

/**
 * A specialized heading component for the Detail Panel.
 * Includes a semibold title and a bottom divider line.
 */
export const SidePanelHeading: React.FC<SidePanelHeadingProps> = ({ title, className = '' }) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.divider} />
        </div>
    );
};
