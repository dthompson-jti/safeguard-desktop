// src/components/UserAvatar.tsx
import { useAtomValue } from 'jotai';
import { sessionAtom, userPreferencesAtom } from '../data/atoms';
import { generateAvatarHue, getAvatarColor } from '../data/users';
import styles from './UserAvatar.module.css';

export const UserAvatar = ({ className }: { className?: string }) => {
    const session = useAtomValue(sessionAtom);
    const userPreferences = useAtomValue(userPreferencesAtom);

    if (!session.user) {
        return null;
    }

    const { initials, username } = session.user;

    // Use OKLCH color based on user hue
    const customHue = userPreferences[username]?.avatarHue;
    const hue = customHue !== undefined ? customHue : generateAvatarHue(username);
    const backgroundColor = getAvatarColor(hue);

    return (
        <div
            className={`${styles.avatar} ${className || ''}`}
            aria-label={`User: ${session.user.displayName}`}
            style={{ backgroundColor }}
            role="presentation"
        >
            {initials}
        </div>
    );
};
