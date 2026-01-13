import React from 'react';
import styles from './TopNav.module.css';
import { GlobalStatusWidget } from './GlobalStatusWidget';

export const TopNav = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className={styles.topNav} ref={ref}>
            <div className={styles.title}>
                eSupervision
            </div>
            <GlobalStatusWidget />
        </div>
    );
});
