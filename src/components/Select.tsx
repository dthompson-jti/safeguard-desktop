// src/components/Select.tsx
import React, { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import styles from './Select.module.css';

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  triggerClassName?: string;
  valueLabel?: React.ReactNode;
  /** Variant style of the select: 'default' (flat) or 'filter' (skeuomorphic) */
  variant?: 'default' | 'filter';
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  icon?: string;
  disabled?: boolean;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, icon, disabled, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className="menuItem"
        {...props}
        ref={forwardedRef}
        disabled={disabled}
      >
        <div className="menuCheckmark">
          <RadixSelect.ItemIndicator>
            <span className="material-symbols-rounded">check</span>
          </RadixSelect.ItemIndicator>
          {icon && (
            <span className={`material-symbols-rounded ${styles.selectItemIcon}`}>{icon}</span>
          )}
        </div>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export const Select = ({ children, value, onValueChange, placeholder, disabled, triggerClassName, valueLabel, variant = 'default' }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);


  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onValueChange}
      open={isOpen}
      onOpenChange={setIsOpen}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        ref={triggerRef}
        className={`${styles.selectTrigger} ${triggerClassName || ''}`}
        aria-label={placeholder}
        data-variant={variant}
      >
        <RadixSelect.Value placeholder={placeholder}>
          {valueLabel}
        </RadixSelect.Value>
        <RadixSelect.Icon className={styles.selectIcon}>
          <span className="material-symbols-rounded">keyboard_arrow_down</span>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className={`menuPopover ${styles.selectContent}`}
          position="popper"
          sideOffset={5}
          align="end"
        >
          <RadixSelect.Viewport className={styles.selectViewport}>
            {children}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};