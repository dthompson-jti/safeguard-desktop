// src/components/SearchInput.tsx
import React, { useRef, useEffect } from 'react';
import { Button } from './Button';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value?: string; // Optional for uncontrolled scenarios if needed, but let's stick to controlled for now
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void; // For trigger flavor
  placeholder: string;
  flavor?: 'instant' | 'trigger';
  size?: 'sm' | 'md';
  autoFocus?: boolean;
  className?: string;
}

export const SearchInput = ({
  value = '',
  onChange,
  onSearch,
  placeholder,
  flavor = 'instant',
  size = 'md',
  autoFocus = false,
  className = '',
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = React.useId();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const wrapperClasses = `${styles.wrapper} ${className}`;

  return (
    <div className={wrapperClasses} data-flavor={flavor} data-size={size}>
      <label htmlFor={inputId} className={styles.visuallyHidden}>
        {placeholder}
      </label>

      {/* Instant Flavor: Icon on Left */}
      {flavor === 'instant' && (
        <span className={`material-symbols-rounded ${styles.searchIcon}`}>search</span>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Instant Flavor: Clear Button */}
      {value && onChange && (
        <Button
          variant="quaternary"
          size="xs"
          iconOnly
          onClick={() => onChange('')}
          aria-label="Clear search"
          className={styles.clearButton}
        >
          <span className="material-symbols-rounded">close</span>
        </Button>
      )}

      {/* Trigger Flavor: Search Button on Right */}
      {flavor === 'trigger' && (
        <div className={styles.triggerButtonWrapper}>
          <Button
            variant="primary"
            size="s"
            iconOnly
            onClick={() => onSearch?.(value)}
            className={styles.triggerButton}
            aria-label="Search"
            title="Search"
          >
            <span className="material-symbols-rounded">search</span>
          </Button>
        </div>
      )}
    </div>
  );
};
