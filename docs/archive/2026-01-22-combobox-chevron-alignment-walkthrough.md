# Walkthrough: ComboBox Chevron Alignment

I have updated the `ComboBox` component to ensure its dropdown chevron perfectly matches the styling and behavior of the standard `Select` component.

## Changes Made

### UI Components

#### [ComboBox.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css)
- **Positioning**: Adjusted `.iconWrapper` `right` value to `var(--spacing-3)` (12px).
- **Sizing**: Increased `.dropdownIcon` `font-size` to `var(--icon-size-md)` (20px).
- **Animation**: Added `transition: transform 0.2s ease` and implemented the 180-degree rotation logic tied to the `[data-state='open']` attribute on the trigger.

```css
.iconWrapper {
    position: absolute;
    right: var(--spacing-3);
    /* ... */
}

.dropdownIcon {
    font-size: var(--icon-size-md);
    transition: transform 0.2s ease, color 0.15s;
}

.comboboxTrigger[data-state='open'] + .iconWrapper .dropdownIcon {
    transform: rotate(180deg);
}
```

## Verification Results

### Automated Tests
- **Lint**: Passed.
- **Build**: Passed.

### Manual Verification
- **User Feedback**: "it looks good."
