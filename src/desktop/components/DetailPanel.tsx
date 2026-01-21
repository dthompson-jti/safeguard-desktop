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
        if (!iso) return <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>;
        const date = new Date(iso);
        if (isNaN(date.getTime())) return iso;
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit',
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

    const isLive = record?.source === 'live';
    const headerTitle = isLive
        ? record?.location
        : (record?.residents.length && record.residents.length > 1 ? `${record.residents.length} residents` : record?.residentName);

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

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    {record ? (
                        <h3 className={styles.residentName}>
                            {headerTitle}
                        </h3>
                    ) : (
                        <h3 className={styles.residentName}>
                            {selectedCount > 1 ? `${selectedCount} selected` : 'No selection'}
                        </h3>
                    )}
                </div>
                <div className={styles.headerActions}>
                    <Tooltip content="Close panel">
                        <Button
                            variant="tertiary"
                            size="s"
                            iconOnly
                            aria-label="Close panel"
                            onClick={handleClose}
                        >
                            <span className="material-symbols-rounded">close</span>
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <div className={styles.content}>
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
                        {/* SECTION 1: DETAILS */}
                        <div className={styles.section}>
                            <SidePanelHeading title="Details" />
                            <div className={styles.metaStack}>
                                <LabelValueRow
                                    label={isLive || record.residents.length > 1 ? 'Residents' : 'Resident'}
                                    value={
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1.5)', width: '100%' }}>
                                            {record.residents.map((r, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: !isLive ? 'flex-start' : 'space-between', gap: 'var(--spacing-2)', width: '100%' }}>
                                                    <LinkButton
                                                        label={r.name}
                                                        variant="primary"
                                                        external
                                                        onClick={() => { }}
                                                    />
                                                    <div style={{ display: 'flex', gap: 'var(--spacing-1)' }}>
                                                        {r.hasHighRisk && (
                                                            <StatusBadge status="special" label="Suicide risk" fill tooltip="Suicide risk" />
                                                        )}
                                                        {r.hasMedicalWatch && (
                                                            <StatusBadge status="special" label="Medical watch" fill tooltip="Medical watch" />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                />
                                <LabelValueRow
                                    label="Location"
                                    value={
                                        <div className={styles.locationTree}>
                                            {/* Root: Group */}
                                            <div className={styles.treeNode} data-depth="0">
                                                <div className={styles.treeIcon}>
                                                    <span className="material-symbols-rounded">corporate_fare</span>
                                                </div>
                                                <LinkButton variant="primary" label={record.group || '—'} external onClick={() => { }} />
                                            </div>

                                            {/* Level 1: Unit */}
                                            <div className={styles.treeNode} data-depth="1">
                                                <div className={styles.treeBend} />
                                                <div className={styles.treeIcon}>
                                                    <span className="material-symbols-rounded">view_cozy</span>
                                                </div>
                                                <LinkButton variant="primary" label={record.unit || '—'} external onClick={() => { }} />
                                            </div>

                                            {/* Level 2: Room */}
                                            <div className={styles.treeNode} data-depth="2">
                                                <div className={styles.treeBend} />
                                                <div className={styles.treeIcon}>
                                                    <span className="material-symbols-rounded">door_front</span>
                                                </div>
                                                <LinkButton variant="primary" label={record.location} external onClick={() => { }} />
                                            </div>
                                        </div>
                                    }
                                />
                                <LabelValueRow
                                    label="Status"
                                    value={<StatusBadge status={record.status as StatusBadgeType} />}
                                />
                                <LabelValueRow
                                    label="Scheduled"
                                    value={formatTime(record.timeScheduled)}
                                />
                                {!isLive && (
                                    <LabelValueRow
                                        label="Actual"
                                        value={record.timeActual ? formatTime(record.timeActual) : <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>}
                                    />
                                )}
                                {!isLive && (
                                    <LabelValueRow
                                        label="Officer"
                                        value={record.officerName || <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>}
                                    />
                                )}
                                {!isLive && (
                                    <LabelValueRow
                                        label="Officer comments"
                                        value={record.officerNote || <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>}
                                    />
                                )}
                            </div>
                        </div>

                        {/* SECTION 3: SUPERVISOR COMMENT - HIDDEN IN LIVE VIEW */}
                        {!isLive && (
                            <div className={styles.section}>
                                <SidePanelHeading title="Supervisor comment" />
                                <div className={styles.metaStack}>
                                    <LabelValueRow
                                        label="Date"
                                        value={formatTime(record.reviewDate || null)}
                                    />
                                    <LabelValueRow
                                        label="Supervisor"
                                        value={record.supervisorName || <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>}
                                    />
                                    <LabelValueRow
                                        label="Comment"
                                        value={record.supervisorNote || <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>}
                                    />
                                </div>
                                <div className={styles.actionGroup}>
                                    <Button
                                        variant="secondary"
                                        size="s"
                                        onClick={handleOpenNoteModal}
                                    >
                                        <span className="material-symbols-rounded">add_comment</span>
                                        {record.supervisorNote ? 'Edit' : 'Add comment'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
};
