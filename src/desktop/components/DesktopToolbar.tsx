// src/desktop/components/DesktopToolbar.tsx

import { useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { desktopViewAtom, desktopFilterAtom } from '../atoms';
import { LiveStatusFilter, HistoricalStatusFilter } from '../types';
import { SearchInput } from '../../components/SearchInput';
import { Select, SelectItem } from '../../components/Select';
import { Button } from '../../components/Button';
import styles from './DesktopToolbar.module.css';

const LIVE_STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'due', label: 'Due' },
    { value: 'overdue', label: 'Missed' },
];

const HISTORICAL_STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'missed-uncommented', label: 'Missed – No Comment' },
    { value: 'missed-commented', label: 'Missed – Commented' },
    { value: 'completed', label: 'Completed' },
];

const TIME_RANGE_OPTIONS = [
    { value: 'last-8h', label: 'Last 8 Hours' },
    { value: 'last-24h', label: 'Last 24 Hours' },
    { value: 'last-7d', label: 'Last 7 Days' },
    { value: 'custom', label: 'Custom Range...' },
];

const AREA_OPTIONS = [
    { value: 'all', label: 'All Facility Areas' },
    { value: 'area-a', label: 'Facility Area Alpha' },
    { value: 'area-b', label: 'Facility Area Bravo' },
    { value: 'area-c', label: 'Facility Area Charlie' },
    { value: 'area-d', label: 'Facility Area Delta' },
];

interface DesktopToolbarProps {
    isEnhanced?: boolean;
}

export const DesktopToolbar = ({ isEnhanced = false }: DesktopToolbarProps) => {
    const view = useAtomValue(desktopViewAtom);
    const [filter, setFilter] = useAtom(desktopFilterAtom);

    const handleLiveStatusFilterChange = (val: string) => {
        setFilter((prev) => ({
            ...prev,
            statusFilter: val as LiveStatusFilter
        }));
    };

    const handleHistoricalStatusFilterChange = (val: string) => {
        setFilter((prev) => ({
            ...prev,
            historicalStatusFilter: val as HistoricalStatusFilter
        }));
    };

    const handleTimeRangeChange = () => {
        // Mocking time range logic
    };

    const handleAreaFilterChange = (val: string) => {
        setFilter((prev) => ({
            ...prev,
            facility: val
        }));
    };

    const hasChanges = useMemo(() => {
        const isLive = view === 'live';

        if (isLive) {
            return filter.statusFilter !== 'all' || filter.search !== '';
        } else {
            return filter.historicalStatusFilter !== 'missed-uncommented' || filter.search !== '';
        }
    }, [view, filter.statusFilter, filter.historicalStatusFilter, filter.search]);

    const handleReset = () => {
        if (view === 'live') {
            setFilter((prev) => ({
                ...prev,
                statusFilter: 'all',
                search: '',
                dateStart: null,
                dateEnd: null,
            }));
        } else {
            setFilter((prev) => ({
                ...prev,
                historicalStatusFilter: 'missed-uncommented',
                search: '',
                dateStart: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                dateEnd: new Date().toISOString().split('T')[0],
            }));
        }
    };

    return (
        <div className={styles.toolbar}>
            {/* Left Side: Search + Advanced */}
            <div className={styles.leftSection}>
                <SearchInput
                    value={filter.search}
                    onChange={(val) => setFilter((prev) => ({ ...prev, search: val }))}
                    placeholder="Find..."
                    variant="standalone"
                />

                {/* Advanced search (placeholder) */}
                <button
                    className="btn"
                    data-variant="secondary"
                    data-size="s"
                    data-icon-only="true"
                    aria-label="Advanced search"
                >
                    <span className="material-symbols-rounded">tune</span>
                </button>
            </div>

            {/* Right Side: Quick Filters */}
            <div className={styles.filterChips}>
                {hasChanges && (
                    <Button
                        variant="tertiary"
                        size="s"
                        onClick={handleReset}
                    >
                        Reset Filters
                    </Button>
                )}

                {/* Status Filter - Different options for Live vs Historical */}
                <div className={styles.statusSelectWrapper}>
                    {view === 'live' ? (
                        <Select
                            value={filter.statusFilter}
                            onValueChange={handleLiveStatusFilterChange}
                            placeholder="Status"
                        >
                            {LIVE_STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </Select>
                    ) : (
                        <Select
                            value={filter.historicalStatusFilter}
                            onValueChange={handleHistoricalStatusFilterChange}
                            placeholder="Status"
                        >
                            {HISTORICAL_STATUS_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                </div>

                {/* Time Range Filter (Historical only) */}
                {view === 'historical' && (
                    <div className={styles.timeRangeSelectWrapper}>
                        <Select
                            value="last-24h" // Default for now
                            onValueChange={handleTimeRangeChange}
                            placeholder="Time Range"
                        >
                            {TIME_RANGE_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                )}

                {/* Facility Area Filter (Not in enhanced mode) */}
                {!isEnhanced && (
                    <div className={styles.facilitySelectWrapper}>
                        <Select
                            value={filter.facility}
                            onValueChange={handleAreaFilterChange}
                            placeholder="Facility Area"
                        >
                            {AREA_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                )}
            </div>
        </div>
    );
};
