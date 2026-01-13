// src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { desktopFilterAtom, selectedLiveRowsAtom, activeDetailRecordAtom, isDetailPanelOpenAtom, PanelData } from '../../desktop/atoms';
import { LiveCheckRow } from '../../desktop/types';
import { DataTable } from '../../desktop/components/DataTable';
import { RowContextMenu } from '../../desktop/components/RowContextMenu';
import { StatusBadge, StatusBadgeType } from '../../desktop/components/StatusBadge';
import { loadEnhancedLivePage } from '../data/mockData';
import styles from '../../desktop/components/DataTable.module.css';

export const EnhancedLiveMonitorView = () => {
    const filter = useAtomValue(desktopFilterAtom);
    const [selectedRows, setSelectedRows] = useAtom(selectedLiveRowsAtom);
    const setActiveRecord = useSetAtom(activeDetailRecordAtom);
    const setPanelOpen = useSetAtom(isDetailPanelOpenAtom);

    // Convert Set<string> to TanStack RowSelectionState
    const rowSelection: RowSelectionState = useMemo(() => {
        const selection: RowSelectionState = {};
        selectedRows.forEach(id => {
            selection[id] = true;
        });
        return selection;
    }, [selectedRows]);

    const handleSelectionChange = useCallback((updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => {
        const nextSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
        const nextSet = new Set<string>();
        Object.keys(nextSelection).forEach(id => {
            if (nextSelection[id]) nextSet.add(id);
        });
        setSelectedRows(nextSet);

        // If selection becomes empty or multiple, clear active single record
        if (nextSet.size !== 1) {
            setActiveRecord(null);
        }
    }, [rowSelection, setSelectedRows, setActiveRecord]);


    // Pagination State
    const [loadedData, setLoadedData] = useState<LiveCheckRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const handleRowClick = useCallback((row: LiveCheckRow, event: React.MouseEvent) => {
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
                    const allIds = loadedData.map((r) => r.id);
                    const startIdx = allIds.indexOf(lastId);
                    const endIdx = allIds.indexOf(row.id);
                    const range = allIds.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
                    range.forEach((id) => next.add(id));
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

    // Sync active record and panel state with selection
    useEffect(() => {
        if (selectedRows.size === 1) {
            const id = Array.from(selectedRows)[0];
            const row = loadedData.find(r => r.id === id);
            if (row) {
                const panelData: PanelData = {
                    id: row.id,
                    source: 'live',
                    residentName: row.residents.map(r => r.name).join(', '),
                    location: row.location,
                    status: row.status,
                    timeScheduled: row.originalCheck?.dueDate || new Date().toISOString(),
                    timeActual: row.lastCheckTime,
                    officerName: row.lastCheckOfficer || 'Pending',
                    hasHighRisk: row.hasHighRisk,
                    riskType: row.riskType,
                };
                setActiveRecord(panelData);
                setPanelOpen(true);
            }
        } else {
            setActiveRecord(null);
            // Don't auto-close panel if multi-selecting, as we want to see the multi-select empty state
            if (selectedRows.size === 0) {
                setPanelOpen(false);
            }
        }
    }, [selectedRows, loadedData, setActiveRecord, setPanelOpen]);

    // Initial load and filter reset
    useEffect(() => {
        setIsLoading(true);
        void loadEnhancedLivePage(0, 50, filter).then(({ data, nextCursor, totalCount }) => {
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
        void loadEnhancedLivePage(cursor, 50, filter).then(({ data, nextCursor }) => {
            setLoadedData((prev) => [...prev, ...data]);
            setCursor(nextCursor ?? cursor);
            setHasMore(nextCursor !== null);
            setIsLoading(false);
        });
    }, [cursor, isLoading, hasMore, filter]);

    const columns: ColumnDef<LiveCheckRow>[] = useMemo(
        () => [
            {
                id: 'resident',
                header: 'Resident',
                size: 300,
                minSize: 240,
                accessorFn: (row) => row.residents.map((r) => r.name).join(', '),
                cell: ({ row }) => (
                    <div className={styles.residentCell}>
                        <a href="#" className={styles.linkText} onClick={(e) => e.preventDefault()}>
                            {row.original.residents.map((r) => r.name).join(', ')}
                        </a>
                        {row.original.hasHighRisk && (
                            <StatusBadge status="special" label="SR" fill />
                        )}
                    </div>
                ),
            },
            {
                id: 'group',
                header: 'Group',
                size: 100,
                minSize: 80,
                accessorKey: 'group',
            },
            {
                id: 'unit',
                header: 'Unit',
                size: 80,
                minSize: 60,
                accessorKey: 'unit',
            },
            {
                id: 'location',
                header: 'Room',
                size: 90,
                minSize: 70,
                accessorKey: 'location',
            },
            {
                id: 'scheduled',
                header: 'Scheduled',
                size: 180,
                minSize: 160,
                cell: () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            },
            {
                id: 'status',
                header: 'Status',
                size: 154,
                minSize: 154,
                accessorKey: 'status',
                cell: ({ row }) => {
                    const status = row.original.status;
                    return <StatusBadge status={status as StatusBadgeType} />;
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
                header: () => (
                    <div className={styles.checkboxCell}>
                        <span className="material-symbols-rounded" style={{ fontSize: '20px', color: 'var(--surface-fg-tertiary)' }}>
                            more_vert
                        </span>
                    </div>
                ),
                size: 48,
                minSize: 48,
                maxSize: 48,
                enableResizing: false,
                enableSorting: false,
                cell: () => (
                    <RowContextMenu
                        actions={[
                            { label: 'View resident', icon: 'person', onClick: () => { } },
                            { label: 'Manage room', icon: 'door_front', onClick: () => { } }
                        ]}
                    />
                ),
            },
        ],
        []
    );

    return (
        <DataTable
            data={loadedData}
            columns={columns}
            getRowId={(row) => row.id}
            totalCount={totalCount}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            enableRowSelection={true}
            rowSelection={rowSelection}
            onRowSelectionChange={handleSelectionChange}
            onRowClick={handleRowClick}
        />
    );
};
