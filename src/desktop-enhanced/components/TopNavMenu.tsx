import * as Popover from '@radix-ui/react-popover';
import styles from './TopNavMenu.module.css';

export const TopNavMenu = () => {
    const isEnhanced = window.location.pathname.includes('/desktop-enhanced');

    const handleSwitch = (path: string) => {
        const base = import.meta.env.BASE_URL; // e.g. '/safeguard-desktop/'
        // Clean base and path to avoid double slashes, but ensure root works
        const target = `${base.replace(/\/$/, '')}${path}`;
        window.location.href = target;
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={styles.hamburgerButton} aria-label="Main menu">
                    <span className="material-symbols-rounded">menu</span>
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className={styles.popoverContent} align="start" sideOffset={8}>
                    <div className={styles.menuItem} onClick={() => handleSwitch('/')} data-active={!isEnhanced}>
                        <span className="material-symbols-rounded">dashboard</span>
                        <span>Standard View</span>
                    </div>
                    <div className={styles.menuItem} onClick={() => handleSwitch('/desktop-enhanced')} data-active={isEnhanced}>
                        <span className="material-symbols-rounded">analytics</span>
                        <span>Enhanced View</span>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
