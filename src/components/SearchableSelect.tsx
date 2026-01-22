import { useState, useMemo } from 'react';
import * as Popover from '@radix-ui/react-popover';
import styles from './SearchableSelect.module.css';
import selectStyles from './Select.module.css'; // Reuse trigger styles 
// Wait, menu.css is likely global based on previous view_file. Let's check imports.
// The previous view_file showed menu.css defines global classes .menuPopover, .menuItem.
// So we don't need to import it as a module, just assume the classes are available.

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
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        const lowerTerm = searchTerm.toLowerCase();
        return options.filter(opt => opt.label.toLowerCase().includes(lowerTerm));
    }, [options, searchTerm]);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (val: string) => {
        onValueChange(val);
        setOpen(false);
        setSearchTerm('');
    };

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    className={`${selectStyles.selectTrigger} ${triggerClassName || ''}`}
                    disabled={disabled}
                    aria-label={placeholder}
                    data-state={open ? 'open' : 'closed'}
                // Reusing styles from Select.module.css for the trigger
                >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <span className={selectStyles.selectIcon}>
                        <span className="material-symbols-rounded">keyboard_arrow_down</span>
                    </span>
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className="menuPopover" // Global class from menu.css
                    align="start"
                    sideOffset={5}
                    style={{
                        width: 'var(--radix-popover-trigger-width)',
                        minWidth: '220px',
                        padding: 0 // Reset padding because we have the search bar
                    }}
                >
                    <div className={styles.searchInputContainer}>
                        <div className={styles.searchInputWrapper}>
                            <span className={`material-symbols-rounded ${styles.searchIcon}`}>search</span>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Find..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()} // Prevent closing
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className={styles.listContainer}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    className="menuItem" // Global class from menu.css
                                    data-state={opt.value === value ? 'checked' : 'unchecked'}
                                    onClick={() => handleSelect(opt.value)}
                                >
                                    <div className="menuCheckmark">
                                        {opt.value === value && (
                                            <span className="material-symbols-rounded">check</span>
                                        )}
                                    </div>
                                    <span>{opt.label}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>No results found</div>
                        )}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
