# Link Refinement and Location Styling Walkthrough

I have updated the application to standardize link interactions and unify the "Location" column/breadcrumb styling.

## Changes

### 1. `LinkButton` Component Enhancements
- Added `external` prop to support the `open_in_new` icon.
- **Unified Zero-Shift (28px):** Reserved exactly `28px` of space at the end of every `LinkButton`. This measurement was chosen to provide 'breathing room' for path segments without feeling disconnected in high-resolution views.
- **Perfect Alignment:** Both the `navigate_next` chevrons and the `open_in_new` icons are centered within this 28px space (6px on each side of the 16px icon).
- **Layout Consistency:** Increased the `MERGED_LOCATION` table column width to `220px` to accommodate the unified gaps without excessive truncation.
- Set primary links to use `fg-theme-strong` for both normal and hover states.
- Implemented precise `text-decoration` styling:
    - Default: `underline solid` (hidden for ghost, visible for primary).
    - Hover: Underline thickness increases to `2.8px` (20% weight).
    - Targeted label underlining so the `open_in_new` icon remains clean.

### 2. Side Panel Refinement
- **Header Identity:** Reverted the resident name in the panel header to a non-interactive `surface-fg-primary` heading, as requested.

## Verification
- Hover over any Resident name in the table or panel to see the icon fade in smoothly.
- Hover over specific parts of a Location path (Group, Unit, or Room) to see them interact individually.
- Verify the "View resident" action is gone from the Historical View menu.
