import React from 'react';
import styles from './TopNav.module.css';
import { TopNavAvatar } from './TopNavAvatar';
import { TopNavMenu } from './TopNavMenu';

export const TopNav = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className={styles.topNav} ref={ref}>
            <div className={styles.leftSection}>
                <TopNavMenu />
                <div className={styles.title}>
                    eSupervision
                </div>
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonIcon}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonSearch}`} />
                <div className={`${styles.skeletonBlock} ${styles.skeletonText}`} />
            </div>

            <div className={styles.rightSection}>
                <TopNavAvatar />
            </div>
        </div>
    );
});
