// src/desktop-enhanced/components/TopNavAvatar.tsx
import { useAtom, useAtomValue } from 'jotai';
import * as Popover from '@radix-ui/react-popover';
import { sessionAtom, userPreferencesAtom } from '../../data/atoms';
import { useTheme } from '../../data/useTheme';
import { generateAvatarHue } from '../../data/users';
import { SegmentedControl } from '../../components/SegmentedControl';
import { ColorSlider } from '../../components/ColorSlider';
import styles from './TopNavAvatar.module.css';

export const TopNavAvatar = () => {
    const session = useAtomValue(sessionAtom);
    const [userPreferences, setUserPreferences] = useAtom(userPreferencesAtom);
    const { theme, setTheme } = useTheme();

    if (!session.user) return null;

    const { initials, username } = session.user;
    const customHue = userPreferences[username]?.avatarHue;
    const hue = customHue !== undefined ? customHue : generateAvatarHue(username);

    const handleThemeChange = (value: string) => {
        setTheme(value as 'light' | 'dark-a' | 'dark-b' | 'dark-c');
    };

    const handleHueChange = (newHue: number) => {
        setUserPreferences(cur => ({
            ...cur,
            [username]: { ...cur[username], avatarHue: newHue }
        }));
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className={styles.avatarButton}
                    aria-label={`Settings for ${session.user.displayName}`}
                >
                    {initials}
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className={styles.popoverContent}
                    align="end"
                    sideOffset={8}
                >
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.avatarLarge}>
                            {initials}
                        </div>
                        <div className={styles.displayName}>{session.user.displayName}</div>
                    </div>

                    {/* Theme Toggle */}
                    <div className={styles.section}>
                        <label className={styles.sectionLabel}>Appearance</label>
                        <SegmentedControl
                            id="topnav-appearance"
                            options={[
                                { value: 'light', label: 'Light' },
                                { value: 'dark-c', label: 'Dark' },
                            ]}
                            value={theme === 'light' ? 'light' : 'dark-c'}
                            onValueChange={handleThemeChange}
                            layout="row"
                        />
                    </div>

                    {/* Avatar Color Slider */}
                    <div className={styles.section} onPointerDown={(e) => e.stopPropagation()}>
                        <ColorSlider
                            value={hue}
                            onChange={handleHueChange}
                            label="Avatar Color"
                        />
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
