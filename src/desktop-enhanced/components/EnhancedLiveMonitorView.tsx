// src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { ColumnDef } from '@tanstack/react-table';
import { desktopFilterAtom } from '../../desktop/atoms';
import { LiveCheckRow } from '../../desktop/types';
import { DataTable } from '../../desktop/components/DataTable';
import { RowContextMenu } from '../../desktop/components/RowContextMenu';
import { StatusBadge, StatusBadgeType } from '../../desktop/components/StatusBadge';
import { loadEnhancedLivePage } from '../data/mockData';
import { COLUMN_WIDTHS } from '../../desktop/components/tableConstants';
import styles from '../../desktop/components/DataTable.module.css';

export const EnhancedLiveMonitorView = () => {
    const filter = useAtomValue(desktopFilterAtom);

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
                ...COLUMN_WIDTHS.RESIDENT,
                accessorFn: (row) => row.residents.map((r) => r.name).join(', '),
                cell: ({ row }) => (
                    <div className={styles.residentCell}>
                        <a href="#" className={styles.linkText} onClick={(e) => e.preventDefault()}>
                            {row.original.residents.map((r) => r.name).join(', ')}
                        </a>
                        {row.original.hasHighRisk && (
                            <span className={`material-symbols-rounded ${styles.alertIconInline}`} title="High Risk">
                                warning
                            </span>
                        )}
                    </div>
                ),
            },
            {
                id: 'group',
                header: 'Group',
                accessorKey: 'group',
                ...COLUMN_WIDTHS.GROUP,
            },
            {
                id: 'unit',
                header: 'Unit',
                accessorKey: 'unit',
                ...COLUMN_WIDTHS.UNIT,
            },
            {
                id: 'location',
                header: 'Room',
                ...COLUMN_WIDTHS.LOCATION,
                accessorKey: 'location',
            },
            {
                id: 'scheduled',
                header: 'Scheduled',
                ...COLUMN_WIDTHS.TIMESTAMP,
                cell: () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            },
            {
                id: 'status',
                header: 'Status',
                ...COLUMN_WIDTHS.STATUS,
                accessorKey: 'status',
                cell: ({ row }) => <StatusBadge status={row.original.status as StatusBadgeType} />,
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
                ...COLUMN_WIDTHS.ACTIONS,
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
        />
    );
};
