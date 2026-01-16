import React from 'react';
import { motion } from 'framer-motion';
import { Select, SelectItem } from '../../components/Select';
import styles from './FilterSelect.module.css';

interface FilterSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    onClear: () => void;
    isCustomized: boolean; // Explicitly controlled by parent (atoms)
    placeholder?: string;
    options: { value: string; label: string }[];
    /** Optional display override for custom ranges */
    displayLabel?: string;
    disabled?: boolean;
}

const transition = {
    type: 'tween' as const,
    duration: 0.1,
    ease: 'linear' as const
};

export const FilterSelect: React.FC<FilterSelectProps> = ({
    value,
    onValueChange,
    onClear,
    isCustomized,
    placeholder,
    options,
    displayLabel,
    disabled
}) => {
    // Determine the label to show in the trigger
    const currentOption = options.find(opt => opt.value === value);
    const triggerLabel = displayLabel || (currentOption ? currentOption.label : placeholder);

    return (
        <motion.div
            layout
            className={`${styles.container} ${isCustomized ? styles.activeContainer : ''}`}
            transition={transition}
            style={{ height: 36, originX: 0 }} /* Lock height and pin grow to left */
        >
            <div className={styles.selectWrapper}>
                <Select
                    value={value}
                    onValueChange={onValueChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    triggerClassName={isCustomized ? styles.activeSelectTrigger : styles.defaultSelectTrigger}
                    valueLabel={triggerLabel}
                >
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            {/* Always rendered but hidden via CSS unless customized. 
                Removing inner 'layout' ensures the X button and trigger internals 
                don't wobble or interpolate during state toggles. The outer container 
                still uses 'layout' to grow or shrink when labels change. */}
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
        </motion.div>
    );
};




