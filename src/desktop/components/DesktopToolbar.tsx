// src/desktop/components/DesktopToolbar.tsx

import { useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { desktopViewAtom, desktopFilterAtom } from '../atoms';
import { SearchInput } from '../../components/SearchInput';
import { Select, SelectItem } from '../../components/Select';
import { Button } from '../../components/Button';
import styles from './DesktopToolbar.module.css';

type StatusFilterValue = 'all' | 'missed' | 'upcoming' | 'due' | 'overdue' | 'completed';

const LIVE_STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'due', label: 'Due' },
    { value: 'overdue', label: 'Overdue' },
];

const HISTORICAL_STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'missed', label: 'Missed' },
];

const COMMENT_OPTIONS = [
    { value: 'any', label: 'Any Comment' },
    { value: 'comment', label: 'Commented' },
    { value: 'no-comment', label: 'No Comment' },
];

const TIME_RANGE_OPTIONS = [
    { value: 'last-8h', label: 'Last 8 Hours' },
    { value: 'last-24h', label: 'Last 24 Hours' },
    { value: 'last-7d', label: 'Last 7 Days' },
    { value: 'custom', label: 'Custom Range...' },
];

export const DesktopToolbar = () => {
    const view = useAtomValue(desktopViewAtom);
    const [filter, setFilter] = useAtom(desktopFilterAtom);

    // Default filters for Historical view when it first loads (conceptually)
    // In a real app, this might be handled by an effect or initial atom state.

    const handleStatusFilterChange = (val: string) => {
        setFilter((prev) => ({
            ...prev,
            statusFilter: val as StatusFilterValue
        }));
    };

    const handleCommentFilterChange = (val: string) => {
        setFilter((prev) => ({
            ...prev,
            commentFilter: val as 'any' | 'comment' | 'no-comment'
        }));
    };

    const handleTimeRangeChange = (val: string) => {
        // Mocking time range logic
        console.log('Time range changed:', val);
    };

    const hasChanges = useMemo(() => {
        const isLive = view === 'live';
        const defaultStatus = isLive ? 'all' : 'missed';
        const defaultComment = isLive ? 'any' : 'no-comment';

        return filter.statusFilter !== defaultStatus ||
            filter.commentFilter !== defaultComment ||
            filter.search !== '';
    }, [view, filter.statusFilter, filter.commentFilter, filter.search]);

    const handleReset = () => {
        if (view === 'live') {
            setFilter((prev) => ({
                ...prev,
                statusFilter: 'all',
                commentFilter: 'any',
                search: '',
                dateStart: null,
                dateEnd: null,
            }));
        } else {
            setFilter((prev) => ({
                ...prev,
                statusFilter: 'missed',
                commentFilter: 'any',
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
                    placeholder="Search residents..."
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

                {/* Status Filter (Both views now, per request) */}
                <div style={{ width: 180 }}>
                    <Select
                        value={filter.statusFilter}
                        onValueChange={handleStatusFilterChange}
                        placeholder="Status"
                    >
                        {(view === 'live' ? LIVE_STATUS_OPTIONS : HISTORICAL_STATUS_OPTIONS).map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Comment Filter (Historical only) */}
                {view === 'historical' && (
                    <div style={{ width: 180 }}>
                        <Select
                            value={filter.commentFilter}
                            onValueChange={handleCommentFilterChange}
                            placeholder="Comments"
                        >
                            {COMMENT_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                )}

                {/* Time Range Filter (Historical only) */}
                {view === 'historical' && (
                    <div style={{ width: 200 }}>
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
            </div>
        </div>
    );
};
