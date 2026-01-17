import { useState, useCallback } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { desktopFilterAtom, updateFilterAtom, resetFiltersAtom } from '../atoms';
import { OFFICER_NAMES } from '../../desktop-enhanced/data/mockData';
import { Button } from '../../components/Button';
import { Select, SelectItem } from '../../components/Select';
import styles from './AdvancedSearch.module.css';

interface AdvancedSearchProps {
    onClose: () => void;
}

const HISTORICAL_STATUS_OPTIONS = [
    { value: 'all', label: 'Any status' },
    { value: 'missed-uncommented', label: 'Missed – No Comment' },
    { value: 'missed-commented', label: 'Missed – Commented' },
    { value: 'completed', label: 'Completed' },
];

const SPECIAL_STATUS_OPTIONS = [
    { value: 'any', label: 'Any status' },
    { value: 'sr', label: 'Special Risk (SR)' },
    { value: 'mw', label: 'Medical Watch (MW)' },
];

const COMMENT_OPTIONS = [
    { value: 'any', label: 'Any' },
    { value: 'has', label: 'Has comment' },
    { value: 'none', label: 'No comment' },
];

export const AdvancedSearch = ({ onClose }: AdvancedSearchProps) => {
    const filter = useAtomValue(desktopFilterAtom);
    const [, updateFilter] = useAtom(updateFilterAtom);
    const [, resetFilters] = useAtom(resetFiltersAtom);

    // Local state for pending changes
    const [localFilter, setLocalFilter] = useState({
        search: filter.search,
        officer: filter.officer || 'any',
        historicalStatusFilter: filter.historicalStatusFilter,
        specialStatus: filter.specialStatus,
        afterDate: filter.afterDate || '',
        beforeDate: filter.beforeDate || '',
        commentFilter: filter.commentFilter,
        commentSearch: filter.commentSearch,
    });

    const handleChange = useCallback((key: keyof typeof localFilter, value: string) => {
        setLocalFilter(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSearch = () => {
        updateFilter({
            search: localFilter.search,
            officer: localFilter.officer === 'any' ? '' : localFilter.officer,
            historicalStatusFilter: localFilter.historicalStatusFilter,
            specialStatus: localFilter.specialStatus,
            afterDate: localFilter.afterDate || null,
            beforeDate: localFilter.beforeDate || null,
            commentFilter: localFilter.commentFilter,
            commentSearch: localFilter.commentSearch,
        });
        onClose();
    };

    const handleReset = () => {
        resetFilters();
        onClose();
    };

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <span className={styles.title}>Advanced search</span>
                <Button
                    variant="tertiary"
                    size="s"
                    iconOnly
                    onClick={onClose}
                    aria-label="Close"
                >
                    <span className="material-symbols-rounded">close</span>
                </Button>
            </div>

            <div className={styles.grid}>
                {/* Row 1 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Has the words</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter a term that matches any field in the record"
                        value={localFilter.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Officer</label>
                    <Select
                        value={localFilter.officer}
                        onValueChange={(val) => handleChange('officer', val)}
                        placeholder="Any user"
                        triggerClassName={styles.selectTrigger}
                    >
                        <SelectItem value="any">Any user</SelectItem>
                        {OFFICER_NAMES.map(name => (
                            <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Row 2 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Status</label>
                    <Select
                        value={localFilter.historicalStatusFilter}
                        onValueChange={(val) => handleChange('historicalStatusFilter', val)}
                        triggerClassName={styles.selectTrigger}
                    >
                        {HISTORICAL_STATUS_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Special status</label>
                    <Select
                        value={localFilter.specialStatus}
                        onValueChange={(val) => handleChange('specialStatus', val)}
                        triggerClassName={styles.selectTrigger}
                    >
                        {SPECIAL_STATUS_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Row 3 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>After date</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={localFilter.afterDate}
                        onChange={(e) => handleChange('afterDate', e.target.value)}
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Before date</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={localFilter.beforeDate}
                        onChange={(e) => handleChange('beforeDate', e.target.value)}
                    />
                </div>

                {/* Row 4 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Comments</label>
                    <Select
                        value={localFilter.commentFilter}
                        onValueChange={(val) => handleChange('commentFilter', val)}
                        triggerClassName={styles.selectTrigger}
                    >
                        {COMMENT_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Comment text</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Search within comments..."
                        value={localFilter.commentSearch}
                        onChange={(e) => handleChange('commentSearch', e.target.value)}
                        disabled={localFilter.commentFilter === 'none'}
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <Button variant="primary" onClick={handleSearch}>Search</Button>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    );
};
