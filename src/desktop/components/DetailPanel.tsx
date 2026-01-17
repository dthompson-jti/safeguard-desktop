import { useState, useRef, useCallback, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { motion } from 'framer-motion';
import { supervisorNoteModalAtom, isDetailPanelOpenAtom, PanelData, panelWidthAtom, selectedHistoryRowsAtom, selectedLiveRowsAtom } from '../atoms';
import { StatusBadge, StatusBadgeType } from './StatusBadge';
import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';
import { LabelValueRow } from '../../components/LabelValueRow';
import { LinkButton } from '../../components/LinkButton';
import { SidePanelHeading } from './SidePanelHeading';
import styles from './DetailPanel.module.css';

interface DetailPanelProps {
    record: PanelData | null;
    selectedCount?: number;
}

export const DetailPanel = ({ record, selectedCount = 0 }: DetailPanelProps) => {
    // Selection state to trigger "select single" or "empty" messages
    // State management
    const [panelWidth, setPanelWidth] = useAtom(panelWidthAtom);
    const setPanelOpen = useSetAtom(isDetailPanelOpenAtom);
    const setModalState = useSetAtom(supervisorNoteModalAtom);

    // Performance refs: track width during drag without re-rendering DetailPanel
    const [isResizing, setIsResizing] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const widthRef = useRef(panelWidth);

    const setSelectedLive = useSetAtom(selectedLiveRowsAtom);
    const setSelectedHistory = useSetAtom(selectedHistoryRowsAtom);

    const handleClose = () => {
        setPanelOpen(false);
        setSelectedLive(new Set());
        setSelectedHistory(new Set());
    };

    const handleOpenNoteModal = () => {
        if (!record) return;
        setModalState({
            isOpen: true,
            selectedIds: [record.id],
        });
    };

    const formatTime = (iso: string | null) => {
        if (!iso) return '—';
        const date = new Date(iso);
        if (isNaN(date.getTime())) return iso; // Fallback for pre-formatted strings
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Resize handlers
    const handleResizeStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        if (panelRef.current) {
            panelRef.current.style.transition = 'none';
        }
    }, []);

    const handleResizeMove = useCallback((e: MouseEvent) => {
        if (!isResizing) return;
        const newWidth = window.innerWidth - e.clientX;
        const clampedWidth = Math.max(320, Math.min(600, newWidth));

        // Direct DOM update on root for real-time grid scaling
        widthRef.current = clampedWidth;
        document.documentElement.style.setProperty('--panel-width', `${clampedWidth}px`);
    }, [isResizing]);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
        if (panelRef.current) {
            panelRef.current.style.transition = '';
            // Sync Jotai state once dragging stops
            setPanelWidth(widthRef.current);
        }
    }, [setPanelWidth]);

    // Add/remove global listeners for resize
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResizeMove);
            document.addEventListener('mouseup', handleResizeEnd);
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
        }
        return () => {
            document.removeEventListener('mousemove', handleResizeMove);
            document.removeEventListener('mouseup', handleResizeEnd);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing, handleResizeMove, handleResizeEnd]);

    const panelVariants = {
        closed: { x: '100%' },
        open: { x: 0 },
    };

    const transition = {
        type: 'tween' as const,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        duration: 0.3,
    };

    return (
        <motion.div
            ref={panelRef}
            className={styles.panel}
            style={{ '--panel-width': `${panelWidth}px` } as React.CSSProperties}
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants}
            transition={transition}
        >
            {/* Resize Handle */}
            <div
                className={`${styles.resizeHandle} ${isResizing ? styles.active : ''}`}
                onMouseDown={handleResizeStart}
            >
                <div className={styles.resizeIndicator} />
            </div>
            {/* Header: Identity Only */}
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    {record ? (
                        <LinkButton
                            label={record.residentName}
                            onClick={() => { /* Navigate to resident */ }}
                            className={styles.residentLink}
                        />
                    ) : (
                        <h3 className={styles.residentName}>
                            {selectedCount > 1 ? `${selectedCount} Selected` : 'No selection'}
                        </h3>
                    )}
                </div>
                <div className={styles.headerActions}>
                    <Tooltip content="Close Panel">
                        <Button
                            variant="tertiary"
                            size="s"
                            iconOnly
                            aria-label="Close Panel"
                            onClick={handleClose}
                        >
                            <span className="material-symbols-rounded">close</span>
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <div className={styles.content}>
                {/* Content removed: Room and Status moved to metaStack */}

                {!record ? (
                    <div className={styles.emptyState}>
                        <span className={`material-symbols-rounded ${styles.placeholderIcon}`}>
                            {selectedCount > 1 ? 'select_all' : 'touch_app'}
                        </span>
                        <h4 className={styles.emptyTitle}>
                            {selectedCount > 1 ? 'Multiple items selected' : 'Select an item to see the details'}
                        </h4>
                    </div>
                ) : (
                    <>
                        {/* SECTION 1: PROPERTIES */}
                        <div className={styles.section}>
                            <SidePanelHeading title="Properties" />
                            <div className={styles.metaStack}>
                                <LabelValueRow
                                    label="Room"
                                    value={record.location}
                                />
                                <LabelValueRow
                                    label="Status"
                                    value={<StatusBadge status={record.status as StatusBadgeType} />}
                                />
                                <LabelValueRow
                                    label="Scheduled"
                                    value={formatTime(record.timeScheduled)}
                                />
                                <LabelValueRow
                                    label="Actual"
                                    value={record.timeActual ? formatTime(record.timeActual) : 'Pending'}
                                />
                                <LabelValueRow
                                    label="Variance"
                                    value={record.varianceMinutes !== undefined ? (
                                        isFinite(record.varianceMinutes) ? `${record.varianceMinutes > 0 ? '+' : ''}${record.varianceMinutes}m` : 'Missed'
                                    ) : 'N/A'}
                                    variant={record.varianceMinutes && record.varianceMinutes > 2 ? 'late' : (record.varianceMinutes !== undefined ? 'onTime' : 'primary')}
                                />
                                <LabelValueRow
                                    label="Group"
                                    value={record.group || '—'}
                                />
                                <LabelValueRow
                                    label="Unit"
                                    value={record.unit || '—'}
                                />
                                <LabelValueRow
                                    label="Officer"
                                    value={record.officerName}
                                />
                            </div>
                        </div>

                        {/* SECTION 2: OFFICER LOG */}
                        <div className={styles.section}>
                            <SidePanelHeading title="Officer Log" />
                            <div className={styles.quoteBlock}>
                                {record.officerNote ? (
                                    <>
                                        <p className={styles.quoteContent}>{record.officerNote}</p>
                                        <div className={styles.quoteSignature}>
                                            {record.officerName}
                                        </div>
                                    </>
                                ) : (
                                    <span className={styles.emptyNote}>No officer notes recorded.</span>
                                )}
                            </div>
                        </div>

                        {/* SECTION 3: SUPERVISOR REVIEW */}
                        <div className={styles.section}>
                            <SidePanelHeading title="Supervisor Review" />
                            <div className={styles.reviewSection}>
                                {record.supervisorNote && (
                                    <div className={styles.reviewContent}>
                                        <p className={styles.quoteContent}>{record.supervisorNote}</p>
                                    </div>
                                )}

                                <div className={styles.actionGroup}>
                                    <Button
                                        variant="secondary"
                                        size="s"
                                        onClick={handleOpenNoteModal}
                                    >
                                        <span className="material-symbols-rounded">add_comment</span>
                                        {record.supervisorNote ? 'Edit' : 'Add Comment'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};
