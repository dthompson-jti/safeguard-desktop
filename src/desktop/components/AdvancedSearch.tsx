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



export const AdvancedSearch = ({ onClose }: AdvancedSearchProps) => {
    const filter = useAtomValue(desktopFilterAtom);
    const [, updateFilter] = useAtom(updateFilterAtom);
    const [, resetFilters] = useAtom(resetFiltersAtom);

    // Local state for pending changes
    const [localFilter, setLocalFilter] = useState({
        search: filter.search,
        officer: filter.officer || 'any',
        historicalStatusFilter: filter.historicalStatusFilter,
        enhancedObservation: filter.enhancedObservation,
        startDate: filter.startDate || '',
        endDate: filter.endDate || '',
        commentFilter: filter.commentFilter,
    });

    const handleChange = useCallback((key: keyof typeof localFilter, value: string) => {
        setLocalFilter(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSearch = () => {
        updateFilter({
            search: localFilter.search,
            officer: localFilter.officer === 'any' ? '' : localFilter.officer,
            historicalStatusFilter: localFilter.historicalStatusFilter,
            enhancedObservation: localFilter.enhancedObservation,
            startDate: localFilter.startDate || null,
            endDate: localFilter.endDate || null,
            commentFilter: localFilter.commentFilter,
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
                    <label className={styles.label}>Enhanced observation</label>
                    <Select
                        value={localFilter.enhancedObservation}
                        onValueChange={(val) => handleChange('enhancedObservation', val)}
                        triggerClassName={styles.selectTrigger}
                    >
                        {SPECIAL_STATUS_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Row 3 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Start date</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={localFilter.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>End date</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={localFilter.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                    />
                </div>

                {/* Row 4 (Removed Comments) */}
            </div>

            <div className={styles.footer}>
                <Button variant="primary" onClick={handleSearch}>Search</Button>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    );
};
