import * as Popover from '@radix-ui/react-popover';
import { useAtom } from 'jotai';
import { desktopEnhancedTreeLayoutAtom } from '../atoms';
import { residentDisplayModeAtom, residentBadgeTextAtom, autoOpenDetailPanelAtom, residentBadgeColorModeAtom } from '../../desktop/atoms';

import { Switch } from '../../components/Switch';
import styles from './TopNavMenu.module.css';

export const TopNavMenu = () => {
    const [treeLayout, setTreeLayout] = useAtom(desktopEnhancedTreeLayoutAtom);
    const [residentDisplayMode, setResidentDisplayMode] = useAtom(residentDisplayModeAtom);
    const [residentBadgeText, setResidentBadgeText] = useAtom(residentBadgeTextAtom);
    const [badgeColorMode, setBadgeColorMode] = useAtom(residentBadgeColorModeAtom);
    const [autoOpenPanel, setAutoOpenPanel] = useAtom(autoOpenDetailPanelAtom);

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={styles.hamburgerButton} aria-label="Main menu">
                    <span className="material-symbols-rounded">menu</span>
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className={styles.popoverContent} align="start" sideOffset={8}>

                    <div className={styles.menuRow}>
                        <div className={styles.menuRowText}>
                            <span>Show indentation lines</span>
                        </div>
                        <Switch
                            checked={treeLayout === 'indented'}
                            onCheckedChange={(checked) => setTreeLayout(checked ? 'indented' : 'full-width')}
                            id="indent-toggle"
                        />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.sectionHeader}>Resident Display</div>

                    <div className={styles.displayOptionsGrid}>
                        <button
                            className={styles.optionButton}
                            data-active={residentDisplayMode === 'left-badge'}
                            onClick={() => setResidentDisplayMode('left-badge')}
                        >
                            <span>Left</span>
                        </button>
                        <button
                            className={styles.optionButton}
                            data-active={residentDisplayMode === 'chip'}
                            onClick={() => setResidentDisplayMode('chip')}
                        >
                            <span>Chip</span>
                        </button>
                        <button
                            className={styles.optionButton}
                            data-active={residentDisplayMode === 'right-badge'}
                            onClick={() => setResidentDisplayMode('right-badge')}
                        >
                            <span>Right</span>
                        </button>
                    </div>

                    <div className={styles.menuRow}>
                        <div className={styles.menuRowText}>
                            <span>Show full warning text</span>
                        </div>
                        <Switch
                            checked={residentBadgeText === 'full'}
                            onCheckedChange={(checked) => setResidentBadgeText(checked ? 'full' : 'short')}
                            id="badge-text-toggle"
                        />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.sectionHeader}>Badge Color Mode</div>
                    <div className={styles.displayOptionsGrid}>
                        <button
                            className={styles.optionButton}
                            data-active={badgeColorMode === 'neutral-strong'}
                            onClick={() => setBadgeColorMode('neutral-strong')}
                            title="Neutral Strong"
                        >
                            <span>B</span>
                        </button>
                        <button
                            className={styles.optionButton}
                            data-active={badgeColorMode === 'warning'}
                            onClick={() => setBadgeColorMode('warning')}
                            title="Warning"
                        >
                            <span>C</span>
                        </button>
                        <button
                            className={styles.optionButton}
                            data-active={badgeColorMode === 'info'}
                            onClick={() => setBadgeColorMode('info')}
                            title="Info"
                        >
                            <span>D</span>
                        </button>
                        <button
                            className={styles.optionButton}
                            data-active={badgeColorMode === 'solid'}
                            onClick={() => setBadgeColorMode('solid')}
                            title="Solid"
                        >
                            <span>E</span>
                        </button>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.menuRow}>
                        <div className={styles.menuRowText}>
                            <span className={styles.label}>Auto-open side panel</span>
                        </div>
                        <Switch
                            checked={autoOpenPanel}
                            onCheckedChange={setAutoOpenPanel}
                            id="auto-open-toggle"
                        />
                    </div>


                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};


