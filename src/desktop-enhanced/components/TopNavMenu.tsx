import * as Popover from '@radix-ui/react-popover';
import styles from './TopNavMenu.module.css';

export const TopNavMenu = () => {
    const isAlternate = window.location.pathname.includes('/alternate');
    const isPrimary = !isAlternate;

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
                    <button className={styles.menuItem} onClick={() => handleSwitch('/')} data-active={isPrimary} type="button">
                        <span className="material-symbols-rounded">analytics</span>
                        <span>Enhanced view</span>
                    </button>
                    <button className={styles.menuItem} onClick={() => handleSwitch('/alternate')} data-active={isAlternate} type="button">
                        <span className="material-symbols-rounded">dashboard</span>
                        <span>Alternate option</span>
                    </button>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
