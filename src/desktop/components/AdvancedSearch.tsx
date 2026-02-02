import { useState, useCallback, useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { desktopFilterAtom, updateFilterAtom, resetFiltersAtom, officerInputStyleAtom } from '../atoms';
import { SUPERVISOR_NOTE_REASONS } from '../types';
import { OFFICER_NAMES, RESIDENT_NAMES, REVIEWER_NAMES } from '../../desktop-enhanced/data/mockData';
import { Button } from '../../components/Button';
import { SearchableSelect } from '../../components/SearchableSelect';
import { ComboBox } from '../../components/ComboBox';
import { Select, SelectItem } from '../../components/Select';
import styles from './AdvancedSearch.module.css';

interface AdvancedSearchProps {
    onClose: () => void;
}

const HISTORICAL_STATUS_OPTIONS = [
    { value: 'all', label: 'All statuses' },
    { value: 'missed-all', label: 'Missed – all' },
    { value: 'missed-not-reviewed', label: 'Missed – not reviewed' },
    { value: 'missed-reviewed', label: 'Missed – reviewed' },
    { value: 'completed', label: 'Completed' },
];

const SPECIAL_STATUS_OPTIONS = [
    { value: 'any', label: 'All records' },
    { value: 'has-any', label: 'Any enhanced observation' },
    { value: 'sr', label: 'Suicide risk (SR)' },
    { value: 'mw', label: 'Medical watch (MW)' },
];



export const AdvancedSearch = ({ onClose }: AdvancedSearchProps) => {
    const filter = useAtomValue(desktopFilterAtom);
    const officerStyle = useAtomValue(officerInputStyleAtom);
    const [, updateFilter] = useAtom(updateFilterAtom);
    const [, resetFilters] = useAtom(resetFiltersAtom);

    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    // Local state for pending changes
    const [localFilter, setLocalFilter] = useState({
        search: filter.search,
        resident: filter.resident || '',
        reviewer: filter.reviewer || '',
        officer: filter.officer || 'any',
        historicalStatusFilter: filter.historicalStatusFilter,
        enhancedObservation: filter.enhancedObservation,
        startDate: filter.startDate || '',
        endDate: filter.endDate || '',
        commentFilter: filter.commentFilter,
        commentReason: filter.commentReason || 'any',
    });

    const handleChange = useCallback((key: keyof typeof localFilter, value: string) => {
        setLocalFilter(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSearch = () => {
        updateFilter({
            search: localFilter.search,
            resident: localFilter.resident,
            reviewer: localFilter.reviewer,
            officer: localFilter.officer === 'any' ? '' : localFilter.officer,
            historicalStatusFilter: localFilter.historicalStatusFilter,
            enhancedObservation: localFilter.enhancedObservation,
            startDate: localFilter.startDate || null,
            endDate: localFilter.endDate || null,
            commentFilter: localFilter.commentFilter,
            commentReason: localFilter.commentReason === 'any' ? '' : localFilter.commentReason,
        });
    };

    const handleReset = () => {
        resetFilters();
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
                        className={styles.input}
                        value={localFilter.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                        placeholder="Enter words found in the record"
                    />
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Resident</label>
                    <SearchableSelect
                        value={localFilter.resident}
                        onValueChange={(val) => handleChange('resident', val)}
                        placeholder="All residents"
                        triggerClassName={styles.selectTrigger}
                        options={[
                            { value: '', label: 'All residents' },
                            ...RESIDENT_NAMES.map(name => ({ value: name, label: name }))
                        ]}
                    />
                </div>

                {/* Row 2 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Officer</label>
                    {officerStyle === 'combo' ? (
                        <ComboBox
                            value={localFilter.officer === 'any' ? '' : localFilter.officer}
                            onValueChange={(val) => handleChange('officer', val || 'any')}
                            placeholder="All officers"
                            options={[
                                { value: '', label: '(All officers)' },
                                ...OFFICER_NAMES.map(name => ({ value: name, label: name }))
                            ]}
                            triggerClassName={styles.selectTrigger}
                        />
                    ) : (
                        <SearchableSelect
                            value={localFilter.officer}
                            onValueChange={(val) => handleChange('officer', val)}
                            placeholder="All officers"
                            triggerClassName={styles.selectTrigger}
                            options={[
                                { value: 'any', label: 'All officers' },
                                ...OFFICER_NAMES.map(name => ({ value: name, label: name }))
                            ]}
                        />
                    )}
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Reviewer</label>
                    <SearchableSelect
                        value={localFilter.reviewer}
                        onValueChange={(val) => handleChange('reviewer', val)}
                        placeholder="All reviewers"
                        triggerClassName={styles.selectTrigger}
                        options={[
                            { value: '', label: 'All reviewers' },
                            ...REVIEWER_NAMES.map(name => ({ value: name, label: name }))
                        ]}
                    />
                </div>

                {/* Row 3 */}
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

                {/* Row 4 */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Date range</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--spacing-2)' }}>
                        <input
                            ref={startDateRef}
                            type="date"
                            className={styles.input}
                            value={localFilter.startDate}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            onClick={() => startDateRef.current?.showPicker()}
                            placeholder="Start"
                        />
                        <input
                            ref={endDateRef}
                            type="date"
                            className={styles.input}
                            value={localFilter.endDate}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            onClick={() => endDateRef.current?.showPicker()}
                            placeholder="End"
                        />
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Reason for missed checks</label>
                    <Select
                        value={localFilter.commentReason}
                        onValueChange={(val) => handleChange('commentReason', val)}
                        triggerClassName={styles.selectTrigger}
                    >
                        <SelectItem value="any">All records</SelectItem>

                        {SUPERVISOR_NOTE_REASONS.map(reason => (
                            <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div className={styles.footer}>
                <Button variant="primary" onClick={handleSearch}>Search</Button>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    );
};
