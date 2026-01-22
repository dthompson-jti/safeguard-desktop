// src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { ColumnDef, RowSelectionState, Updater } from '@tanstack/react-table';
import { desktopFilterAtom, selectedLiveRowsAtom, activeDetailRecordAtom, residentDisplayModeAtom, residentBadgeTextAtom, isDetailPanelOpenAtom } from '../../desktop/atoms';
import { LiveCheckRow } from '../../desktop/types';
import { DataTable } from '../../desktop/components/DataTable';
import { StatusBadge, StatusBadgeType } from '../../desktop/components/StatusBadge';
import { ResidentChip } from '../../desktop/components/ResidentChip';
import { ResidentStatusGroup } from '../../desktop/components/ResidentStatusGroup';
import { loadEnhancedLivePage } from '../data/mockData';
import { COLUMN_WIDTHS } from '../../desktop/components/tableConstants';
import styles from '../../desktop/components/DataTable.module.css';

export const EnhancedLiveMonitorView = () => {
    const filter = useAtomValue(desktopFilterAtom);
    const displayMode = useAtomValue(residentDisplayModeAtom);
    const badgeTextMode = useAtomValue(residentBadgeTextAtom);
    // Pagination State
    const [loadedData, setLoadedData] = useState<LiveCheckRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

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
                size: 340,
                minSize: 300,
                accessorFn: (row) => row.residents.map((r) => r.name).join(', '),
                cell: ({ row }) => {
                    return (
                        <div className={styles.residentCell}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-0p5)', width: '100%' }}>
                                {row.original.residents.map((r, i) => {
                                    if (displayMode === 'chip') {
                                        return (
                                            <ResidentChip
                                                key={i}
                                                name={r.name}
                                                showHighRisk={r.hasHighRisk}
                                                showMedicalWatch={r.hasMedicalWatch}
                                                textMode={badgeTextMode}
                                            />
                                        );
                                    }

                                    const badges = (
                                        <ResidentStatusGroup residents={[r]} view="table" limit={1} />
                                    );

                                    return (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 'var(--spacing-2)', height: '24px', width: '100%' }}>
                                            {displayMode === 'left-badge' ? (
                                                <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: 500, color: 'var(--surface-fg-primary)' }}>{r.name}</span>
                                                    {badges}
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                    <span style={{ fontWeight: 500, color: 'var(--surface-fg-primary)' }}>{r.name}</span>
                                                    {badges}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                },
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
                cell: ({ row }) => {


                    return (
                        <div className={styles.locationCell}>
                            <span style={{ color: 'var(--surface-fg-primary)' }}>{row.original.group}</span>
                            <span className="material-symbols-rounded" style={{ color: 'var(--surface-fg-quaternary)', fontSize: '16px' }}>navigate_next</span>
                            <span style={{ color: 'var(--surface-fg-primary)' }}>{row.original.unit}</span>
                            <span className="material-symbols-rounded" style={{ color: 'var(--surface-fg-quaternary)', fontSize: '16px' }}>navigate_next</span>
                            <span style={{ color: 'var(--surface-fg-primary)' }}>{row.original.location}</span>
                        </div>
                    );
                },
            },
            {
                id: 'status',
                header: 'Status',
                accessorFn: (row) => row.status,
                size: 200,
                minSize: 100,
                maxSize: 300,
                enableResizing: true,
                enableSorting: true,
                sortingFn: (rowA, rowB) => {
                    const priority: Record<string, number> = { overdue: 0, due: 1, upcoming: 2 };
                    const a = priority[rowA.original.status] ?? 3;
                    const b = priority[rowB.original.status] ?? 3;
                    if (a !== b) return a - b;
                    const timeA = new Date(rowA.original.originalCheck?.dueDate || 0).getTime();
                    const timeB = new Date(rowB.original.originalCheck?.dueDate || 0).getTime();
                    return timeA - timeB;
                },
                cell: ({ row }) => {
                    const count = row.original.missedCheckCount;
                    const label = (count && count > 1) ? `Missed (${count})` : undefined;
                    // Top align with margin for single resident centering effect

                    return (
                        <div style={{
                            marginLeft: 'calc(var(--spacing-0p5) * -1)',
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}>
                            <StatusBadge
                                status={row.original.status as StatusBadgeType}
                                label={label}
                                iconOnly={false}
                            />
                        </div>
                    );
                },
            },
            {
                id: 'scheduled',
                header: 'Scheduled',
                size: 180,
                minSize: 160,
                accessorFn: (row) => row.originalCheck?.dueDate || '',
                cell: ({ row }) => {
                    const dueDate = row.original.originalCheck?.dueDate;
                    if (!dueDate) return <span style={{ color: 'var(--control-fg-placeholder)' }}>—</span>;
                    const date = new Date(dueDate);
                    return (
                        <div className={styles.singleRowCell}>
                            <span className={styles.primaryText}>{date.toLocaleDateString()}</span>
                            <span className={styles.secondaryText}>{date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                        </div>
                    );
                },
            },

        ],
        [displayMode, badgeTextMode]
    );

    const [selectedRows, setSelectedRows] = useAtom(selectedLiveRowsAtom);
    const setDetailRecord = useSetAtom(activeDetailRecordAtom);
    const setPanelOpen = useSetAtom(isDetailPanelOpenAtom);

    const rowSelection = useMemo(() => {
        const selection: Record<string, boolean> = {};
        selectedRows.forEach(id => selection[id] = true);
        return selection;
    }, [selectedRows]);

    const handleRowSelectionChange = useCallback(
        (updaterOrValue: Updater<RowSelectionState>) => {
            const newSelection = (typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue) as Record<string, boolean>;
            const newSet = new Set(Object.keys(newSelection).filter((k) => newSelection[k]));
            setSelectedRows(newSet);

            // If selection becomes empty or multiple, clear active single record
            if (newSet.size !== 1) {
                setDetailRecord(null);
            }
        },
        [rowSelection, setSelectedRows, setDetailRecord]
    );

    // Sync active record with selection and loaded data (matching Historical Review View pattern)
    useEffect(() => {
        if (selectedRows.size === 1) {
            const id = Array.from(selectedRows)[0];
            const row = loadedData.find(r => r.id === id);
            if (row) {
                setDetailRecord({
                    id: row.id,
                    source: 'live',
                    residents: row.residents,
                    residentName: row.residents.map(r => r.name).join(', '),
                    location: row.location,
                    status: row.status,
                    timeScheduled: row.originalCheck?.dueDate || '',
                    timeActual: null,
                    officerName: '',
                    group: row.group,
                    unit: row.unit,
                });
            } else {
                setDetailRecord(null);
                setSelectedRows(new Set());
            }
        } else {
            setDetailRecord(null);
        }
    }, [selectedRows, loadedData, setDetailRecord, setSelectedRows]);

    const handleRowClick = useCallback((row: LiveCheckRow) => {
        setSelectedRows((_prev) => {
            if (_prev.has(row.id) && _prev.size === 1) return new Set();
            return new Set([row.id]);
        });
    }, [setSelectedRows]);


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
            onRowSelectionChange={handleRowSelectionChange}
            onRowClick={handleRowClick}
            onRowDoubleClick={() => setPanelOpen(true)}
            initialSorting={[{ id: 'status', desc: false }]}
        />
    );
};
