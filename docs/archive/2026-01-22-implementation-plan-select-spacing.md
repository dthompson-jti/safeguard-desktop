# Decrease Select Item Spacing

## Goal Description
Reduce the gap between the checkmark (leading icon) and the text in all select/menu items to tighten the visual layout, as requested by the user.

## User Review Required
- **Visual Check**: Inspect the new spacing (6px or 8px) to ensure it feels "tighter" without being cramped.

## Proposed Changes
### [box model]
#### [MODIFY] [menu.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/menu.css)
- Change `.menuItem` gap from `var(--spacing-3)` (12px) to `var(--spacing-2)` (8px).

#### [MODIFY] [SearchableSelect.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/SearchableSelect.module.css)
- Verify if any override logic needs adjustment (unlikely, as this controls item gap *between items*, not *within items*).

## Verification Plan
### Manual Verification
1.  Open the application.
2.  Open any dropdown (e.g., Status filter, Facility filter).
3.  Observe the specific spacing between the checkmark area and the text label.
4.  Confirm it matches the requested "tighter" look (8px).
