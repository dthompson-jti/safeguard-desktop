import { useAtomValue } from 'jotai';
import { sidebarExpandedAtom } from '../../atoms';
import styles from './SideBar.module.css';

export function SideBar() {
    const isExpanded = useAtomValue(sidebarExpandedAtom);

    return (
        <nav
            className={styles.container}
            data-collapsed={!isExpanded}
            aria-label="Main Navigation"
        >
            {/* Placeholder for Content - Will populate in IP-02 */}
            <div style={{ padding: '16px', color: 'var(--surface-fg-tertiary)' }}>
                [Sidebar Content]
            </div>
        </nav>
    );
}
