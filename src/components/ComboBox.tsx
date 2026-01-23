import { useState, useRef, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command, CommandItem, CommandList, CommandInput } from './ui/Command';
import styles from './ComboBox.module.css';

interface ComboBoxProps {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
    triggerClassName?: string;
}

export const ComboBox = ({
    value,
    onValueChange,
    options,
    placeholder = 'Select...',
    disabled,
    triggerClassName
}: ComboBoxProps) => {
    const [open, setOpen] = useState(false);

    // Track selected option to display its label
    const selectedOption = options.find(opt => opt.value === value);

    // Search value is controlled state for the autocomplete input
    const [searchValue, setSearchValue] = useState('');

    // When value changes from outside, or on mount, sync search value
    useEffect(() => {
        if (!open) {
            setSearchValue(selectedOption?.label || '');
        }
    }, [value, selectedOption, open]);

    const handleSelect = (itemValue: string) => {
        onValueChange(itemValue);
        setOpen(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Command
            className={styles.commandRoot}
            loop
        // If search is empty, show all. If typing, filter!
        // cmdk ignores state if searchValue is managed externally, 
        // so we use searchValue state and let cmdk filter or filter ourselves.
        >
            <Popover.Root open={open} onOpenChange={setOpen}>
                <Popover.Anchor asChild>
                    <div
                        className={`${styles.inputContainer} ${triggerClassName || ''}`}
                        data-disabled={disabled ? 'true' : 'false'}
                    >
                        <CommandInput
                            ref={inputRef}
                            /**
                             * INVARIANT: The inner input is "neutralized" (no borders/background).
                             * All visual styling (borders, focus rings, backgrounds) MUST be applied 
                             * to the parent .inputContainer to prevent "double borders" and 
                             * layout shifts when the popover opens.
                             */
                            className={styles.comboboxInput}
                            value={searchValue}
                            onValueChange={setSearchValue}
                            onFocus={(e) => {
                                setOpen(true);
                                // SPEC: Select search text on focus instead of clearing
                                // to avoid "flashing" between bracketed label and empty input.
                                e.currentTarget.select();
                            }}
                            onBlur={() => {
                                // Delay reset to allow item selection to win
                                setTimeout(() => {
                                    if (!open) {
                                        setSearchValue(selectedOption?.label || '');
                                    }
                                }, 150);
                            }}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                        <span className={styles.iconWrapper}>
                            <span className={`material-symbols-rounded ${styles.dropdownIcon}`}>
                                keyboard_arrow_down
                            </span>
                        </span>
                    </div>
                </Popover.Anchor>

                <Popover.Content
                    className="menuPopover"
                    align="start"
                    sideOffset={5}
                    // Avoid focusing something else, keep focus on input
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onInteractOutside={(e) => {
                        // If they click the input, don't close (Radix default handles toggle)
                        if (e.target === inputRef.current) e.preventDefault();
                    }}
                    style={{
                        width: 'var(--radix-popover-trigger-width)',
                        zIndex: 'var(--z-dropdown)'
                    }}
                >
                    <CommandList className={styles.commandList}>
                        {/* 
              cmdk will automatically filter the items based on the CommandInput value!
              We just need to render all options here.
            */}
                        <CommandItem
                            key="empty-state-placeholder"
                            value=""
                            className={styles.hiddenEmpty}
                            disabled
                        />
                        {options.map((opt) => (
                            <CommandItem
                                key={opt.value}
                                value={opt.label}
                                onSelect={() => handleSelect(opt.value)}
                                className="menuItem"
                                data-state={value === opt.value ? 'checked' : undefined}
                            >
                                <div className="menuCheckmark">
                                    {value === opt.value && (
                                        <span className="material-symbols-rounded">check</span>
                                    )}
                                </div>
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Popover.Content>
            </Popover.Root>
        </Command>
    );
};
