import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command, CommandInput, CommandEmpty, CommandItem, CommandList } from './ui/Command';
import styles from './SearchableSelect.module.css';
import selectStyles from './Select.module.css';

interface SearchableSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
    triggerClassName?: string;
}

export const SearchableSelect = ({
    value,
    onValueChange,
    options,
    placeholder,
    disabled,
    triggerClassName
}: SearchableSelectProps) => {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    className={`${selectStyles.selectTrigger} ${triggerClassName || ''}`}
                    disabled={disabled}
                    aria-label={placeholder}
                    data-state={open ? 'open' : 'closed'}
                >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <span className={selectStyles.selectIcon}>
                        <span className="material-symbols-rounded">keyboard_arrow_down</span>
                    </span>
                </button>
            </Popover.Trigger>

            <Popover.Content
                className="menuPopover"
                align="start"
                sideOffset={5}
                onOpenAutoFocus={(e) => e.preventDefault()}
                style={{
                    width: 'var(--radix-popover-trigger-width)',
                    minWidth: '220px'
                }}
            >
                <Command className={styles.commandRoot}>
                    <div className={styles.searchHeader}>
                        <div className={styles.searchField}>
                            <span className={`material-symbols-rounded ${styles.searchHeaderIcon}`}>search</span>
                            <CommandInput
                                /**
                                 * INVARIANT: The inner input is "neutralized" (no borders/background).
                                 * Visual state is managed by the .searchField wrapper.
                                 */
                                className={styles.searchInput}
                                placeholder="Find..."
                            />
                        </div>
                    </div>
                    <CommandList className={styles.commandList}>
                        <CommandEmpty className={styles.commandEmpty}>No results found</CommandEmpty>
                        {options.map((opt) => (
                            <CommandItem
                                key={opt.value}
                                value={opt.label}
                                onSelect={() => {
                                    onValueChange(opt.value);
                                    setOpen(false);
                                }}
                                className="menuItem"
                                data-state={opt.value === value ? 'checked' : undefined}
                            >
                                <div className="menuCheckmark">
                                    {opt.value === value && (
                                        <span className="material-symbols-rounded">check</span>
                                    )}
                                </div>
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </Popover.Content>
        </Popover.Root>
    );
};
