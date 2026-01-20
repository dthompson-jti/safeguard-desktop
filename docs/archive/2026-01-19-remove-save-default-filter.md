# [IMPLEMENTED] Remove 'Save Default Filter' Functionality

**Status**: Implemented
**Date**: 2026-01-19

We are removing the ability for users to save their own default filters. This simplifies the application state by ensuring "Reset" always reverts to the hardcoded factory defaults.

## User Review Required
> [!NOTE]
> This is a destructive change. User saved preferences for default filters will be ignored and effectively lost (though the atomWithStorage might still have the data in local storage, the app will no longer read it).

## Proposed Changes

### Desktop Logic (`src/desktop/atoms.ts`)

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Remove `savedFilterDefaultsAtom`.
- Remove `saveFiltersAsDefaultAtom`.
- Update `isFilterCustomizedAtom` to compare `desktopFilterAtom` against `FACTORY_FILTER_DEFAULTS`.
- Update `resetFiltersAtom` to reset `desktopFilterAtom` to `FACTORY_FILTER_DEFAULTS`.
- Update `clearFilterForKeyAtom` to revert specific key to value from `FACTORY_FILTER_DEFAULTS`.

### Desktop UI (`src/desktop-enhanced/DesktopEnhancedApp.tsx`)

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Remove `saveFiltersAsDefaultAtom` import.
- Remove `handleSaveDefaults` function.
- Remove "Save as my defaults" button from the "More Actions" popover.
- Clean up related imports.

## Verification Plan

### Manual Verification
1.  **Check Reset Functionality**:
    - Open Live view.
    - Change a filter (e.g., Status to 'Due').
    - Verify "Reset Filters" button appears.
    - Click "Reset Filters".
    - Verify filter reverts to 'All' (Factory Default).

2.  **Check Removal**:
    - Open "More Actions" menu (three dots).
    - Verify "Save as my defaults" option is **gone**.
