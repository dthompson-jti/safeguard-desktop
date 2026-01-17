import React from 'react';
import styles from './NavGroup.module.css';

interface NavGroupProps {
    title: string;
    children: React.ReactNode;
}

export function NavGroup({ title, children }: NavGroupProps) {
    return (
        <div className={styles.group}>
            <h3 className={styles.header}>
                {title}
            </h3>
            <div className={styles.list}>
                {children}
            </div>
        </div>
    );
}
