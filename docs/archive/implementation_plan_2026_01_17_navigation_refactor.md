# Implementation Plan - Restructure Enhanced Navigation

The objective is to split the current single-line breadcrumb/action row into two distinct rows for better visual hierarchy and spacing control, specifically in the Enhanced UI.

## User Review Required

> [!NOTE]
> The "Search Panel" (Toolbar) is currently positioned below the breadcrumbs. I will maintain this order but ensure the new navigation rows and the toolbar all share the same layout principles requested.

## Proposed Changes

### [Component] [More Actions Popover & Layout Refinement]

I will implement a popover menu for the More Actions button and refine the spacing of the view toggle.

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Import `Popover` from `../components/Popover`.
- Add state `isMoreActionsOpen`.
- Wrap the `more_horiz` Button in a `Popover`.
- Implement menu items:
    - Generate QR Codes
    - Facility Management
    - (Divider)
    - Save Filters as Defaults
    - Safeguard settings.

#### [MODIFY] [ModeToggle.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/ModeToggle.module.css)
- Update `.toggleContainer` margin-top to `var(--spacing-3)` (12px) to match the requested header spacing.

#### [MODIFY] [DesktopEnhancedApp.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.module.css)
- Ensure Row 2 height is consistent across views.

## Verification Plan

### Manual Verification
- **Live View**: Verify Row 1 (Breadcrumbs) is visible, Row 2 (Controls) is hidden.
- **Historical View**: Verify Row 1 (Breadcrumbs) and Row 2 (Controls) are both visible.
- **Spacing**: Use browser dev tools to confirm 12px margin on the container, 12px gap between rows, and 0 padding inside rows.
- **Controls**: Inspect the right-aligned buttons in Row 2, confirming the order: Export -> More (...) -> Toggle.
