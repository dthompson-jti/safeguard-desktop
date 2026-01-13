// src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
    selectedHistoryRowsAtom,
    activeDetailRecordAtom,
    desktopFilterAtom,
    supervisorNoteModalAtom,
    historicalRefreshAtom,
    PanelData,
} from '../../desktop/atoms';
import { HistoricalCheck } from '../../desktop/types';
import { DataTable } from '../../desktop/components/DataTable';
import { BulkActionFooter } from '../../desktop/components/BulkActionFooter';
import { RowContextMenu } from '../../desktop/components/RowContextMenu';
import { StatusBadge, StatusBadgeType } from '../../desktop/components/StatusBadge';
import { loadEnhancedHistoricalPage } from '../data/mockData';
import styles from '../../desktop/components/DataTable.module.css';

const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

export const EnhancedHistoricalReviewView = () => {
    const [selectedRows, setSelectedRows] = useAtom(selectedHistoryRowsAtom);
    const setDetailRecord = useSetAtom(activeDetailRecordAtom);

    // Pagination State
    const [loadedData, setLoadedData] = useState<HistoricalCheck[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const filter = useAtomValue(desktopFilterAtom);
    const setModalState = useSetAtom(supervisorNoteModalAtom);
    const refreshCount = useAtomValue(historicalRefreshAtom);

    // Initial load & Re-fetch on refreshCount change
    useEffect(() => {
        setIsLoading(true);
        void loadEnhancedHistoricalPage(0, 50, filter).then(({ data, nextCursor, totalCount }) => {
            setLoadedData(data);
            setCursor(nextCursor ?? 0);
            setHasMore(nextCursor !== null);
            setTotalCount(totalCount);
            setIsLoading(false);
        });
    }, [filter, refreshCount]);

    const handleLoadMore = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        void loadEnhancedHistoricalPage(cursor, 50, filter).then(({ data, nextCursor }) => {
            setLoadedData((prev) => [...prev, ...data]);
            setCursor(nextCursor ?? cursor);
            setHasMore(nextCursor !== null);
            setIsLoading(false);
        });
    }, [cursor, isLoading, hasMore, filter]);

    const rowSelection: RowSelectionState = useMemo(() => {
        const selection: RowSelectionState = {};
        selectedRows.forEach((id) => { selection[id] = true; });
        return selection;
    }, [selectedRows]);

    const handleRowSelectionChange = useCallback(
        (updaterOrValue: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => {
            const newSelection = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
            const newSet = new Set(Object.keys(newSelection).filter((k) => newSelection[k]));
            setSelectedRows(newSet);

            // If selection becomes empty or multiple, clear active single record
            if (newSet.size !== 1) {
                setDetailRecord(null);
            }
        },
        [rowSelection, setSelectedRows, setDetailRecord]
    );

    const handleRowClick = useCallback((row: HistoricalCheck, event: React.MouseEvent) => {
        const isMeta = event.ctrlKey || event.metaKey;
        const isShift = event.shiftKey;

        setSelectedRows((prev: Set<string>) => {
            const next = new Set(prev);
            if (isMeta) {
                if (next.has(row.id)) next.delete(row.id);
                else next.add(row.id);
            } else if (isShift && prev.size > 0) {
                const lastId = Array.from(prev).pop();
                if (lastId) {
                    const allIds = loadedData.map((r: HistoricalCheck) => r.id);
                    const startIdx = allIds.indexOf(lastId);
                    const endIdx = allIds.indexOf(row.id);
                    const range = allIds.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
                    range.forEach((id: string) => next.add(id));
                }
            } else {
                // Toggle behavior: if clicking the only selected row, clear it
                if (next.has(row.id) && next.size === 1) {
                    next.delete(row.id);
                } else {
                    next.clear();
                    next.add(row.id);
                }
            }

            // Sync detail record: only show if exactly one item is selected after click
            if (next.size === 1) {
                const panelData: PanelData = {
                    id: row.id,
                    source: 'historical',
                    residentName: row.residents.map(r => r.name).join(', '),
                    location: row.location,
                    status: row.status,
                    timeScheduled: row.scheduledTime,
                    timeActual: row.actualTime,
                    varianceMinutes: row.varianceMinutes,
                    officerName: row.officerName,
                    officerNote: row.officerNote,
                    supervisorNote: row.supervisorNote,
                    reviewStatus: row.reviewStatus,
                };
                setDetailRecord(panelData);
            } else {
                setDetailRecord(null);
            }

            return next;
        });
    }, [loadedData, setSelectedRows, setDetailRecord]);

    const handleOpenNoteModal = useCallback((checkId: string) => {
        setModalState({
            isOpen: true,
            selectedIds: [checkId],
        });
    }, [setModalState]);

    const columns: ColumnDef<HistoricalCheck>[] = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <div className={styles.checkboxCell}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={table.getIsAllRowsSelected()}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className={styles.checkboxCell}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    </div>
                ),
                size: 44,
                minSize: 44,
                maxSize: 44,
                enableResizing: false,
            },
            {
                id: 'resident',
                header: 'Resident',
                size: 300,
                minSize: 240,
                accessorFn: (row) => row.residents.map((r) => r.name).join(', '),
                cell: ({ row }) => (
                    <div className={styles.residentCell}>
                        <a href="#" className={styles.linkText} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRowClick(row.original, e); }}>
                            {row.original.residents.map((r) => r.name).join(', ')}
                        </a>
                        {/* Assuming special status if variance is high or other condition */}
                        {row.original.status === 'missed' && (
                            <StatusBadge status="special" label="SR" fill />
                        )}
                    </div>
                ),
            },
            { id: 'group', header: 'Group', accessorKey: 'group', size: 100, minSize: 80 },
            { id: 'unit', header: 'Unit', accessorKey: 'unit', size: 80, minSize: 60 },
            { id: 'location', header: 'Room', size: 90, minSize: 70, accessorKey: 'location' },
            {
                id: 'scheduled',
                header: 'Scheduled',
                size: 180,
                minSize: 160,
                accessorFn: (row) => row.scheduledTime,
                cell: ({ row }) => {
                    const dateObj = new Date(row.original.scheduledTime);
                    const dateStr = dateObj.toLocaleDateString();
                    const timeStr = formatTime(row.original.scheduledTime);
                    return (
                        <div className={styles.singleRowCell}>
                            <span className={styles.primaryText}>{dateStr}</span>
                            <span className={styles.secondaryText}>{timeStr}</span>
                        </div>
                    );
                }
            },
            {
                id: 'actual',
                header: 'Actual',
                size: 180,
                minSize: 160,
                accessorFn: (row) => row.actualTime ? formatTime(row.actualTime) : '—',
            },
            {
                id: 'status',
                header: 'Status',
                size: 154,
                minSize: 154,
                accessorKey: 'status',
                cell: ({ row }) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                        {row.original.reviewStatus === 'verified' ? (
                            <StatusBadge status="verified" label="Verified" />
                        ) : (
                            <StatusBadge status={row.original.status as StatusBadgeType} />
                        )}
                        {row.original.status === 'completed' && row.original.reviewStatus !== 'verified' && (
                            <span style={{ color: 'var(--surface-fg-tertiary)', fontWeight: 600, fontSize: '18px', lineHeight: 1 }}>...</span>
                        )}
                    </div>
                ),
            },
            {
                id: 'spacer',
                size: 0,
                minSize: 0,
                enableResizing: false,
                header: () => null,
                cell: () => null,
            },
            {
                id: 'actions',
                header: () => null,
                size: 48,
                minSize: 48,
                maxSize: 48,
                enableResizing: false,
                enableSorting: false,
                cell: ({ row }) => (
                    <RowContextMenu
                        actions={[
                            {
                                label: 'View Resident',
                                icon: 'person',
                                onClick: () => console.log('Navigate to resident:', row.original.residents[0]?.id),
                            },
                            {
                                label: 'Manage Room',
                                icon: 'meeting_room',
                                onClick: () => console.log('Open room management:', row.original.location),
                            },
                            {
                                label: row.original.supervisorNote ? 'Edit Comment' : 'Add Comment',
                                icon: 'add_comment',
                                onClick: () => handleOpenNoteModal(row.original.id),
                            },
                            ...(row.original.supervisorNote ? [{
                                label: 'Delete Comment',
                                icon: 'delete',
                                onClick: () => console.log('Delete note for:', row.original.id),
                                destructive: true,
                            }] : []),
                        ]}
                    />
                ),
            },
        ],
        [handleRowClick]
    );

    return (
        <>
            <DataTable
                data={loadedData}
                columns={columns}
                enableRowSelection
                rowSelection={rowSelection}
                onRowSelectionChange={handleRowSelectionChange}
                getRowId={(row) => row.id}
                totalCount={totalCount}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onRowClick={handleRowClick}
            />
            {selectedRows.size > 0 && (
                <BulkActionFooter
                    selectedCount={selectedRows.size}
                    onAction={() => {
                        setModalState({
                            isOpen: true,
                            selectedIds: Array.from(selectedRows),
                        });
                    }}
                    onClear={() => {
                        setSelectedRows(new Set());
                        setDetailRecord(null);
                    }}
                    actions={[
                        {
                            label: 'Bulk Add Comment',
                            icon: 'add_comment',
                            onClick: () => {
                                setModalState({
                                    isOpen: true,
                                    selectedIds: Array.from(selectedRows),
                                });
                            }
                        },
                        {
                            label: 'Clear Selection',
                            icon: 'close',
                            onClick: () => {
                                setSelectedRows(new Set());
                                setDetailRecord(null);
                            },
                        }
                    ]}
                />
            )}
        </>
    );
};
