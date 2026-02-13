import React from 'react';
import { MultiSelect } from '../../components/MultiSelect';
import styles from './FilterSelect.module.css'; // Reusing FilterSelect styles for the container/split button

interface MultiFilterSelectProps {
    value: string[];
    onValueChange: (value: string[]) => void;
    onClear: () => void; // Clears everything
    isCustomized: boolean;
    placeholder?: string;
    options: { value: string; label: string }[];
    disabled?: boolean;
}

export const MultiFilterSelect: React.FC<MultiFilterSelectProps> = ({
    value,
    onValueChange,
    onClear,
    isCustomized,
    placeholder,
    options,
    disabled
}) => {
    // Label logic: "3 Selected" or Placeholder
    // The MultiSelect inner component handles the label display ("X selected").
    // We just need to ensure standard styling flows down.

    // We use the same 'activeSelectTrigger' class from FilterSelect styles
    // But we need to pass it to MultiSelect's triggerClassName.
    const triggerClass = isCustomized ? styles.activeSelectTrigger : styles.defaultSelectTrigger;

    return (
        <div
            className={`${styles.container} ${isCustomized ? styles.activeContainer : ''}`}
            style={{ height: 36 }}
        >
            <div className={styles.selectWrapper}>
                <MultiSelect
                    value={value}
                    onValueChange={onValueChange}
                    placeholder={placeholder}
                    options={options}
                    triggerClassName={triggerClass}
                    variant="filter"
                    isActive={isCustomized}
                />
            </div>

            <button
                className={styles.clearButton}
                onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                }}
                disabled={disabled || !isCustomized}
                aria-label="Clear filter"
                title="Reset to default"
            >
                <span className={`material-symbols-rounded ${styles.clearIcon}`}>
                    close
                </span>
            </button>
        </div>
    );
};
