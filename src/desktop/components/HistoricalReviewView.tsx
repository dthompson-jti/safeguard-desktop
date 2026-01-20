import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
    selectedHistoryRowsAtom,
    supervisorNoteModalAtom,
    activeDetailRecordAtom,
    isDetailPanelOpenAtom,
    desktopFilterAtom,
    PanelData,
} from '../atoms';
import { HistoricalCheck } from '../types';
import { DataTable } from './DataTable';
import { BulkActionFooter } from './BulkActionFooter';
import { RowContextMenu } from './RowContextMenu';
import { StatusBadge, StatusBadgeType } from './StatusBadge';
import {
    TOTAL_HISTORICAL_RECORDS,
    loadEnhancedHistoricalPage as loadHistoricalChecksPage
} from '../../desktop-enhanced/data/mockData';
import { COLUMN_WIDTHS } from './tableConstants';
import styles from './DataTable.module.css';

const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

export const HistoricalReviewView = () => {
    const [selectedRows, setSelectedRows] = useAtom(selectedHistoryRowsAtom);
    const setModalState = useSetAtom(supervisorNoteModalAtom);
    const setIsPanelOpen = useSetAtom(isDetailPanelOpenAtom);

    // Pagination State
    const [loadedData, setLoadedData] = useState<HistoricalCheck[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(0);

    const filter = useAtomValue(desktopFilterAtom);

    // Initial load
    useEffect(() => {
        setIsLoading(true);
        void loadHistoricalChecksPage(0, 50, filter).then(({ data, nextCursor }) => {
            setLoadedData(data);
            setCursor(nextCursor ?? 0);
            setHasMore(nextCursor !== null);
            setIsLoading(false);
        });
    }, [filter]);

    const handleLoadMore = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        void loadHistoricalChecksPage(cursor, 50, filter).then(({ data, nextCursor }) => {
            setLoadedData((prev) => [...prev, ...data]);
            setCursor(nextCursor ?? cursor);
            setHasMore(nextCursor !== null);
            setIsLoading(false);
        });
    }, [cursor, isLoading, hasMore, filter]);

    // Convert Set to TanStack's RowSelectionState
    const rowSelection: RowSelectionState = useMemo(() => {
        const selection: RowSelectionState = {};
        selectedRows.forEach((id) => {
            selection[id] = true;
        });
        return selection;
    }, [selectedRows]);

    const handleRowSelectionChange = useCallback(
        (updaterOrValue: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => {
            const newSelection = typeof updaterOrValue === 'function'
                ? updaterOrValue(rowSelection)
                : updaterOrValue;

            const newSet = new Set(Object.keys(newSelection).filter((k) => newSelection[k]));
            setSelectedRows(newSet);
        },
        [rowSelection, setSelectedRows]
    );

    const handleBulkAction = () => {
        setModalState({
            isOpen: true,
            selectedIds: Array.from(selectedRows),
        });
    };

    const handleClearSelection = () => {
        setSelectedRows(new Set<string>());
    };

    const setDetailRecord = useSetAtom(activeDetailRecordAtom);

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
                    const range = allIds.slice(
                        Math.min(startIdx, endIdx),
                        Math.max(startIdx, endIdx) + 1
                    );
                    range.forEach((id: string) => next.add(id));
                }
            } else {
                next.clear();
                next.add(row.id);
            }
            return next;
        });

        const panelData: PanelData = {
            id: row.id,
            source: 'historical',
            residents: row.residents,
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
        setIsPanelOpen(true);
        setDetailRecord(panelData);
    }, [loadedData, setSelectedRows, setDetailRecord, setIsPanelOpen]);

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
                            aria-label="Select all rows"
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
                            aria-label={`Select row ${row.id}`}
                        />
                    </div>
                ),
                ...COLUMN_WIDTHS.CHECKBOX,
            },
            // 1. Resident (Link)
            {
                id: 'resident',
                header: 'Resident',
                ...COLUMN_WIDTHS.RESIDENT,
                accessorFn: (row) => row.residents.map((r) => r.name).join(', '),
                cell: ({ row }) => (
                    <a
                        href="#"
                        className={styles.linkText}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRowClick(row.original, e);
                        }}
                    >
                        {row.original.residents.map((r) => r.name).join(', ')}
                    </a>
                ),
            },
            // 2. Merged Location column (Group > Unit > Room)
            {
                id: 'location',
                header: 'Location',
                ...COLUMN_WIDTHS.MERGED_LOCATION,
                accessorFn: (row) => `${row.group} ${row.unit} ${row.location}`,
                cell: ({ row }) => (
                    <div className={styles.locationCell}>
                        <span>{row.original.group}</span>
                        <span className={`material-symbols-rounded ${styles.nextIcon}`}>navigate_next</span>
                        <span>{row.original.unit}</span>
                        <span className={`material-symbols-rounded ${styles.nextIcon}`}>navigate_next</span>
                        <span>{row.original.location}</span>
                    </div>
                ),
            },
            // 5. Scheduled (Date + Time Merged)
            {
                id: 'scheduled',
                header: 'Scheduled',
                ...COLUMN_WIDTHS.TIMESTAMP,
                accessorFn: (row) => row.scheduledTime,
                cell: ({ row }) => {
                    const dateObj = new Date(row.original.scheduledTime);
                    const dateStr = dateObj.toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    });
                    const timeStr = formatTime(row.original.scheduledTime);

                    return (
                        <div className={styles.singleRowCell}>
                            <span className={styles.primaryText}>{dateStr}</span>
                            <span className={styles.secondaryText}>{timeStr}</span>
                        </div>
                    );
                }
            },
            // 7. Actual (Date + Time Merged)
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
            // 8. Officer
            {
                id: 'officer',
                header: 'Officer',
                ...COLUMN_WIDTHS.OFFICER,
                accessorKey: 'officerName',
            },
            // 8. Status
            {
                id: 'status',
                header: 'Status',
                ...COLUMN_WIDTHS.STATUS,
                accessorKey: 'status',
                cell: ({ row }) => (
                    <StatusBadge status={row.original.status as StatusBadgeType} />
                ),
            },
            // Spacer column to push actions to the right
            {
                id: 'spacer',
                size: 0,
                minSize: 0,
                enableResizing: false,
                header: () => null,
                cell: () => null,
            },
            // Action Menu
            {
                id: 'actions',
                header: () => null,
                ...COLUMN_WIDTHS.ACTIONS,
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
                                label: row.original.supervisorNote ? 'Edit Note' : 'Add Note',
                                icon: row.original.supervisorNote ? 'edit' : 'add_comment',
                                onClick: () => handleOpenNoteModal(row.original.id),
                            },
                            ...(row.original.supervisorNote ? [{
                                label: 'Delete Note',
                                icon: 'delete',
                                onClick: () => { /* Delete note */ },
                                destructive: true,
                            }] : []),
                        ]}
                    />
                ),
            },
        ],
        [handleOpenNoteModal, handleRowClick]
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
                totalCount={TOTAL_HISTORICAL_RECORDS}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onRowClick={handleRowClick}
            />

            {selectedRows.size > 0 && (
                <BulkActionFooter
                    selectedCount={selectedRows.size}
                    onAction={handleBulkAction}
                    onClear={handleClearSelection}
                />
            )}
        </>
    );
};
