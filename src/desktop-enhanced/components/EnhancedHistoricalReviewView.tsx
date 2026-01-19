// src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
    selectedHistoryRowsAtom,
    activeDetailRecordAtom,
    isDetailPanelOpenAtom,
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
import { Tooltip } from '../../components/Tooltip';
import { Button } from '../../components/Button';
import { loadEnhancedHistoricalPage } from '../data/mockData';
import { COLUMN_WIDTHS } from '../../desktop/components/tableConstants';
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
    const setPanelOpen = useSetAtom(isDetailPanelOpenAtom);

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

    // Sync active record with selection and loaded data
    useEffect(() => {
        if (selectedRows.size === 1) {
            const id = Array.from(selectedRows)[0];
            const row = loadedData.find(r => r.id === id);
            if (row) {
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
                    group: row.group,
                    unit: row.unit,
                    officerNote: row.officerNote,
                    supervisorNote: row.supervisorNote,
                    reviewStatus: row.reviewStatus,
                };
                setDetailRecord(panelData);
                setPanelOpen(true);
            } else {
                // Row not found in loaded data (e.g. filtered out after update)
                // If we have a single selection that isn't in the data, clear it to avoid stale view
                setDetailRecord(null);
                setPanelOpen(false);
                // Also clear selection since it's no longer visible/valid
                setSelectedRows(new Set());
            }
        } else {
            setDetailRecord(null);
            if (selectedRows.size === 0) {
                setPanelOpen(false);
            }
        }
    }, [selectedRows, loadedData, setDetailRecord, setPanelOpen, setSelectedRows]);

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

            return next;
        });
    }, [loadedData, setSelectedRows]);

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
                id: 'statusIcon',
                header: 'Status',
                accessorFn: (row) => row.status,
                size: 100,
                minSize: 100,
                maxSize: 100,
                enableResizing: false,
                enableSorting: true,
                sortingFn: (rowA, rowB) => {
                    const getPriority = (row: typeof rowA) => {
                        const status = row.original.status;
                        const note = row.original.supervisorNote;
                        if (status === 'missed') {
                            return note ? 2 : 1; // 1: Missed (Uncommented) - Highest Priority
                        }
                        if (status === 'completed') return 3;
                        return 4; // Other statuses
                    };
                    return getPriority(rowA) - getPriority(rowB);
                },
                cell: ({ row }) => {
                    let displayStatus: StatusBadgeType;
                    if (row.original.status === 'completed') {
                        displayStatus = 'completed';
                    } else if (row.original.status === 'missed') {
                        displayStatus = row.original.supervisorNote ? 'missed-commented' : 'missed-uncommented';
                    } else {
                        displayStatus = row.original.status as StatusBadgeType;
                    }
                    return (
                        <div style={{ marginLeft: 'calc(var(--spacing-0p5) * -1)' }}>
                            <StatusBadge status={displayStatus} iconOnly />
                        </div>
                    );
                },
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
                        {row.original.hasHighRisk && (
                            <StatusBadge status="special" label="SR" fill tooltip="Special Risk (High Risk Resident)" />
                        )}
                    </div>
                ),
            },
            {
                id: 'location',
                header: 'Location',
                ...COLUMN_WIDTHS.MERGED_LOCATION,
                accessorFn: (row) => `${row.group} ${row.unit} ${row.location}`,
                sortingFn: (rowA, rowB) => {
                    const a = `${rowA.original.group} ${rowA.original.unit} ${rowA.original.location}`;
                    const b = `${rowB.original.group} ${rowB.original.unit} ${rowB.original.location}`;
                    return a.localeCompare(b);
                },
                cell: ({ row }) => (
                    <div className={styles.locationCell}>
                        <span className={styles.locationSecondary}>{row.original.group}</span>
                        <span className={`material-symbols-rounded ${styles.nextIcon}`}>navigate_next</span>
                        <span className={styles.locationSecondary}>{row.original.unit}</span>
                        <span className={`material-symbols-rounded ${styles.nextIcon}`}>navigate_next</span>
                        <span>{row.original.location}</span>
                    </div>
                ),
            },
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
                ...COLUMN_WIDTHS.TIMESTAMP,
                accessorFn: (row) => row.actualTime || '—',
                cell: ({ row }) => {
                    if (!row.original.actualTime) return <span className={styles.secondaryText}>—</span>;
                    const dateObj = new Date(row.original.actualTime);
                    const dateStr = dateObj.toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    });
                    const timeStr = formatTime(row.original.actualTime);

                    return (
                        <div className={styles.singleRowCell}>
                            <span className={styles.primaryText}>{dateStr}</span>
                            <span className={styles.secondaryText}>{timeStr}</span>
                        </div>
                    );
                }
            },
            {
                id: 'supervisorNote',
                header: 'Comments',
                size: 200,
                minSize: 150,
                accessorKey: 'supervisorNote',
                cell: ({ row }) => {
                    const note = row.original.supervisorNote;
                    return (
                        <div className={styles.commentCell}>
                            {note ? (
                                <Tooltip content={note} align="start">
                                    <span className={styles.truncatedNote}>{note}</span>
                                </Tooltip>
                            ) : (
                                <Button
                                    variant="tertiary"
                                    size="s"
                                    iconOnly
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        handleOpenNoteModal(row.original.id);
                                    }}
                                >
                                    <span className="material-symbols-rounded">add_comment</span>
                                </Button>
                            )}
                        </div>
                    );
                },
            },
            {
                id: 'officer',
                header: 'Officer',
                ...COLUMN_WIDTHS.OFFICER,
                accessorKey: 'officerName',
            },
            {
                id: 'status',
                header: 'Check Status',
                size: 140,
                minSize: 120,
                accessorKey: 'status',
                cell: ({ row }) => {
                    return <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{row.original.status}</span>;
                },
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
                                onClick: () => { /* Navigate to resident */ },
                            },
                            {
                                label: 'Facility management',
                                icon: 'door_front',
                                onClick: () => { /* Open room management */ },
                            },
                            {
                                label: row.original.supervisorNote ? 'Edit Comment' : 'Add Comment',
                                icon: 'add_comment',
                                onClick: () => handleOpenNoteModal(row.original.id),
                            },
                            ...(row.original.supervisorNote ? [{
                                label: 'Delete Comment',
                                icon: 'delete',
                                onClick: () => { /* Delete note */ },
                                destructive: true,
                            }] : []),
                        ]}
                    />
                ),
            },
        ],
        [handleRowClick, handleOpenNoteModal]
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
                initialSorting={[{ id: 'scheduled', desc: true }]}
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
                />
            )}
        </>
    );
};
