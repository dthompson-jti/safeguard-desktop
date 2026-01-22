# Plan: Align ComboBox Chevron styling with Select

Align the `ComboBox` component's dropdown chevron (icon) with the existing `Select` component's chevron in terms of size, spacing, and interaction.

## Proposed Changes

### UI Components

#### [MODIFY] [ComboBox.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css)
- Increase `.iconWrapper` `right` distance from `var(--spacing-2)` (8px) to `var(--spacing-3)` (12px) to match `Select`'s internal padding.
- Increase `.dropdownIcon` `font-size` from `var(--icon-size-sm)` (16px) to `var(--icon-size-md)` (20px) to match the global icon default used by `Select`.
- Add `transition: transform 0.2s ease, color 0.15s;` to `.dropdownIcon`.
- Implement rotation when open by targeting `.comboboxTrigger[data-state='open'] + .iconWrapper .dropdownIcon`.

## Verification Plan

### Manual Verification
1. Open the application.
2. Toggle the "Advanced Search" panel in Historical View.
3. Compare the "Officer" ComboBox (if configured as combo) with the "Status" Select.
4. Verify that:
    - Both icons are at the same horizontal distance from the right edge.
    - Both icons have the same size.
    - Both icons rotate 180 degrees smoothly when the dropdown is opened.
