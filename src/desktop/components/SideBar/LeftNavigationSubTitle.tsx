import React from 'react';
import styles from './LeftNavigationSubTitle.module.css';

interface LeftNavigationSubTitleProps {
    label: string;
    level?: number;
}

export const LeftNavigationSubTitle: React.FC<LeftNavigationSubTitleProps> = ({ label, level = 0 }) => {
    return (
        <h4 className={styles.subtitle} data-level={level}>
            {label}
        </h4>
    );
};
