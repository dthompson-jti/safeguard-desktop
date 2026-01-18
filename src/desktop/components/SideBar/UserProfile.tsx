import React from 'react';
import styles from './UserProfile.module.css';

interface UserProfileProps {
    name: string;
    avatarUrl?: string;
    isCollapsed?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, avatarUrl, isCollapsed }) => {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className={styles.container} data-collapsed={isCollapsed}>
            <div className={styles.avatar}>
                {avatarUrl ? <img src={avatarUrl} alt={name} /> : <span>{initials}</span>}
            </div>
            {!isCollapsed && (
                <div className={styles.info}>
                    <span className={styles.name}>{name}</span>
                </div>
            )}
        </div>
    );
};
