import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import styles from './MultiSelect.module.css';

interface MultiSelectProps {
    value: string[]; // Array of selected values
    onValueChange: (value: string[]) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    triggerClassName?: string;
    variant?: 'default' | 'filter';
    isActive?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    value,
    onValueChange,
    options,
    placeholder = 'Select...',
    triggerClassName,
    variant = 'default',
    isActive = false,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (itemValue: string) => {
        let newValue: string[];
        if (value.includes(itemValue)) {
            newValue = value.filter(v => v !== itemValue);
        } else {
            newValue = [...value, itemValue];
        }
        onValueChange(newValue);
    };


    const displayLabel = React.useMemo(() => {
        if (value.length === 0) {
            return placeholder;
        }
        const selectedOptions = options.filter(option => value.includes(option.value));
        if (selectedOptions.length === 0) {
            return placeholder; // Should not happen if `value` contains valid options
        }
        if (selectedOptions.length === 1) {
            return selectedOptions[0].label;
        }
        return `${selectedOptions[0].label}, +${selectedOptions.length - 1}`;
    }, [value, options, placeholder]);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    className={`${styles.trigger} ${triggerClassName || ''}`}
                    data-variant={variant}
                    data-active={isActive}
                    data-placeholder={value.length === 0}
                    data-state={open ? 'open' : 'closed'}
                >
                    <span className={styles.label}>{displayLabel}</span>
                    <span className={styles.icon}>
                        <span className="material-symbols-rounded">keyboard_arrow_down</span>
                    </span>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className={`menuPopover ${styles.content}`}
                    align="start"
                    sideOffset={5}
                >
                    <div className={styles.list}>
                        {options.map(option => (
                            <button
                                key={option.value}
                                className={`menuItem ${styles.item}`}
                                onClick={() => handleSelect(option.value)}
                                data-state={value.includes(option.value) ? 'checked' : 'unchecked'}
                                type="button"
                            >
                                <div className="menuCheckmark">
                                    {value.includes(option.value) && (
                                        <span className="material-symbols-rounded">check</span>
                                    )}
                                </div>
                                <span className={styles.itemLabel}>{option.label}</span>
                            </button>
                        ))}
                    </div>

                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
