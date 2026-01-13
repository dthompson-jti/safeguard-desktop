import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../components/Button';
import styles from './BulkActionFooter.module.css';

interface BulkAction {
    label: string;
    icon: string;
    onClick: () => void;
    destructive?: boolean;
}

interface BulkActionFooterProps {
    selectedCount: number;
    onAction: () => void;
    onClear: () => void;
    actionLabel?: string;
    actionIcon?: string;
    actions?: BulkAction[];
}

export const BulkActionFooter = ({
    selectedCount,
    onAction,
    onClear,
    actionLabel = 'Add Comment',
    actionIcon = 'add_comment',
    actions = [],
}: BulkActionFooterProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuTriggerRef = useRef<HTMLButtonElement>(null);

    const handleToggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isMenuOpen && menuTriggerRef.current) {
            const rect = menuTriggerRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.top - (actions.length * 44 + 8), // Menu opens UPWARDS
                left: rect.right - 220,
            });
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAction = (action: () => void) => {
        action();
        setIsMenuOpen(false);
    };

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClose = () => setIsMenuOpen(false);
        window.addEventListener('scroll', handleClose, true);
        window.addEventListener('resize', handleClose);
        return () => {
            window.removeEventListener('scroll', handleClose, true);
            window.removeEventListener('resize', handleClose);
        };
    }, [isMenuOpen]);

    return (
        <div className={styles.footer}>
            {/* Count section with dismiss */}
            <div className={styles.countSection}>
                <Button
                    variant="on-solid"
                    size="s"
                    iconOnly
                    onClick={onClear}
                    aria-label="Clear selection"
                >
                    <span className="material-symbols-rounded">close</span>
                </Button>
                <span className={styles.count}>
                    {selectedCount} Selected
                </span>
            </div>

            <div className={styles.divider} />

            {/* Primary action */}
            <Button
                variant="on-solid"
                size="s"
                onClick={onAction}
            >
                <span className="material-symbols-rounded">{actionIcon}</span>
                {actionLabel}
            </Button>

            <div className={styles.divider} />

            {/* Overflow menu */}
            <Button
                ref={menuTriggerRef}
                variant="on-solid"
                size="s"
                iconOnly
                aria-label="More actions"
                onClick={handleToggleMenu}
            >
                <span className="material-symbols-rounded">more_vert</span>
            </Button>

            {isMenuOpen && actions.length > 0 && createPortal(
                <>
                    <div className={styles.menuBackdrop} onClick={() => setIsMenuOpen(false)} />
                    <div
                        className={styles.menu}
                        style={{
                            position: 'fixed',
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                    >
                        {actions.map((action, idx) => (
                            <div key={action.label}>
                                <button
                                    className={`${styles.menuItem} ${action.destructive ? styles.destructive : ''}`}
                                    onClick={() => handleAction(action.onClick)}
                                >
                                    <span className="material-symbols-rounded">{action.icon}</span>
                                    <span>{action.label}</span>
                                </button>
                                {idx < actions.length - 1 && <div className={styles.menuSeparator} />}
                            </div>
                        ))}
                    </div>
                </>,
                document.body
            )}
        </div>
    );
};
