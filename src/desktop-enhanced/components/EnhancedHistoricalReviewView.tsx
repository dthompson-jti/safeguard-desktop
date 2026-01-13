// src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
    selectedHistoryRowsAtom,
    activeDetailRecordAtom,
    desktopFilterAtom,
    PanelData,
} from '../../desktop/atoms';
import { HistoricalCheck } from '../../desktop/types';
import { DataTable } from '../../desktop/components/DataTable';
import { BulkActionFooter } from '../../desktop/components/BulkActionFooter';
import { RowContextMenu } from '../../desktop/components/RowContextMenu';
import { StatusBadge, StatusBadgeType } from '../../desktop/components/StatusBadge';
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

    // Pagination State
    const [loadedData, setLoadedData] = useState<HistoricalCheck[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const filter = useAtomValue(desktopFilterAtom);

    // Initial load
    useEffect(() => {
        setIsLoading(true);
        void loadEnhancedHistoricalPage(0, 50, filter).then(({ data, nextCursor, totalCount }) => {
            setLoadedData(data);
            setCursor(nextCursor ?? 0);
            setHasMore(nextCursor !== null);
            setTotalCount(totalCount);
            setIsLoading(false);
        });
    }, [filter]);

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
        },
        [rowSelection, setSelectedRows]
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
                next.clear();
                next.add(row.id);
            }
            return next;
        });

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
    }, [loadedData, setSelectedRows, setDetailRecord]);

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
                ...COLUMN_WIDTHS.CHECKBOX,
            },
            {
                id: 'resident',
                header: 'Resident',
                ...COLUMN_WIDTHS.RESIDENT,
                accessorFn: (row) => row.residents.map((r) => r.name).join(', '),
                cell: ({ row }) => (
                    <a href="#" className={styles.linkText} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRowClick(row.original, e); }}>
                        {row.original.residents.map((r) => r.name).join(', ')}
                    </a>
                ),
            },
            { id: 'group', header: 'Group', accessorKey: 'group', ...COLUMN_WIDTHS.GROUP },
            { id: 'unit', header: 'Unit', accessorKey: 'unit', ...COLUMN_WIDTHS.UNIT },
            { id: 'location', header: 'Room', ...COLUMN_WIDTHS.LOCATION, accessorKey: 'location' },
            {
                id: 'scheduled',
                header: 'Scheduled',
                ...COLUMN_WIDTHS.TIMESTAMP,
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
                accessorFn: (row) => row.actualTime ? formatTime(row.actualTime) : '—',
            },
            {
                id: 'status',
                header: 'Status',
                ...COLUMN_WIDTHS.STATUS,
                accessorKey: 'status',
                cell: ({ row }) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                        <StatusBadge status={row.original.status as StatusBadgeType} />
                        {row.original.status === 'completed' && (
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
                ...COLUMN_WIDTHS.ACTIONS,
                enableSorting: false,
                cell: ({ row }) => (
                    <RowContextMenu
                        actions={[
                            { label: row.original.reviewStatus === 'verified' ? 'Edit Note' : 'Add Note', icon: 'edit_note', onClick: () => { } },
                            { label: 'Flag for Review', icon: 'flag', onClick: () => { }, destructive: true }
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
                    onAction={() => { }}
                    onClear={() => setSelectedRows(new Set())}
                />
            )}
        </>
    );
};
