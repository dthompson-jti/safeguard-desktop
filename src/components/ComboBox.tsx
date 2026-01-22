import { useState, useMemo, useEffect, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
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

    // Track interaction source to prevent race conditions
    const isInteractingRef = useRef(false);
    const flashProtectionRef = useRef(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    // Derived state: verify if current value maps to a known label
    const selectedOption = options.find(opt => opt.value === value);

    // Input value state
    const [inputValue, setInputValue] = useState('');

    // Sync input with selection when *not* editing (closed)
    useEffect(() => {
        if (!open) {
            setInputValue(selectedOption ? selectedOption.label : '');
        }
    }, [open, selectedOption]);

    const filteredOptions = useMemo(() => {
        if (!inputValue) return options;
        if (selectedOption && inputValue === selectedOption.label) return options;

        const lowerTerm = inputValue.toLowerCase();
        return options.filter(opt => opt.label.toLowerCase().includes(lowerTerm));
    }, [options, inputValue, selectedOption]);

    const handleSelect = (newValue: string) => {
        onValueChange(newValue);
        setOpen(false);
        isInteractingRef.current = false;
    };

    const handleBlur = () => {
        // Delay blur handling slightly to allow item clicks to register
        // if they weren't caught by onMouseDown
        setTimeout(() => {
            if (isInteractingRef.current) return;

            if (inputValue.trim() === '') {
                onValueChange('');
            } else {
                const match = options.find(opt => opt.label.toLowerCase() === inputValue.toLowerCase());
                if (match) {
                    onValueChange(match.value);
                }
            }
        }, 150);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (filteredOptions.length > 0) {
                handleSelect(filteredOptions[0].value);
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            setOpen(true);
        }
    };

    const openMenu = () => {
        // Prevent double-firing or rapid toggles
        if (!open) {
            setOpen(true);
            isInteractingRef.current = true;

            // "Flash Protection": Block immediate close events (like onFocusOutside)
            // that fire incorrectly during the opening phase (e.g. ~20ms after open).
            flashProtectionRef.current = true;
            setTimeout(() => {
                flashProtectionRef.current = false;
            }, 200);
        }
    };

    return (
        <Popover.Root
            open={open}
            onOpenChange={(newOpen) => {
                if (!newOpen && flashProtectionRef.current) {
                    return;
                }

                setOpen(newOpen);
                if (!newOpen) isInteractingRef.current = false;
            }}
        >
            <div
                className={styles.wrapper}
                ref={wrapperRef}
            >
                {/*
                   STRATEGY: Detached Anchor
                   The input is NOT wrapped in Popover.Anchor to prevent Radix from
                   inferring trigger behavior. We use a hidden anchor div.
                */}
                <Popover.Anchor asChild>
                    <div
                        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', visibility: 'hidden' }}
                    />
                </Popover.Anchor>

                <input
                    className={`${styles.comboboxTrigger} ${triggerClassName || ''}`}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        openMenu();
                    }}
                    onFocus={() => {
                        openMenu();
                    }}
                    onClick={() => {
                        openMenu();
                    }}
                    onBlur={() => {
                        handleBlur();
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    data-state={open ? 'open' : 'closed'}
                    spellCheck={false}
                    autoComplete="off"
                />
                <div className={styles.iconWrapper}>
                    <span className={`material-symbols-rounded ${styles.dropdownIcon}`}>
                        keyboard_arrow_down
                    </span>
                </div>
            </div>

            <Popover.Portal>
                <Popover.Content
                    className="menuPopover"
                    align="start"
                    sideOffset={5}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => {
                        if (inputValue) e.preventDefault();
                    }}
                    style={{
                        width: 'var(--radix-popover-trigger-width)',
                        minWidth: '220px',
                        padding: 0,
                        zIndex: 'var(--z-dropdown)'
                    }}
                    onPointerDownOutside={(e) => {
                        const target = e.target as HTMLElement;
                        // Robust check against wrapper
                        if (wrapperRef.current && wrapperRef.current.contains(target)) {
                            e.preventDefault();
                        }
                    }}
                    onFocusOutside={(e) => {
                        // Also block focus outside if it's the wrapper (unlikely but safe)
                        const target = e.target as HTMLElement;
                        if (wrapperRef.current && wrapperRef.current.contains(target)) {
                            e.preventDefault();
                        }
                    }}
                >
                    <div className={styles.listContainer}>
                        <div
                            className="menuItem"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect('');
                            }}
                        >
                            <div className="menuCheckmark">
                                {value === '' && <span className="material-symbols-rounded">check</span>}
                            </div>
                            <span>(All officers)</span>
                        </div>

                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    className="menuItem"
                                    data-state={opt.value === value ? 'checked' : 'unchecked'}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSelect(opt.value);
                                    }}
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
