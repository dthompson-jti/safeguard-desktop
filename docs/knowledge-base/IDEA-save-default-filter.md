# Idea-Teckit: Save Default Filter Functionality

**Status**: Removed
**Date**: 2026-01-19
**Context**: This functionality allowed users to save their current filter configuration as their personal default, which would persist across sessions and be used as the baseline for "Reset" actions.

## Implementation Details

The functionality was primarily implemented using Jotai atoms with local storage persistence.

### Atoms (`src/desktop/atoms.ts`)

1.  **`savedFilterDefaultsAtom`**
    *   **Type**: `atomWithStorage<DesktopFilter>`
    *   **Key**: `safeguard_desktop_filter_defaults`
    *   **Purpose**: Stored the user's preferred default filters. Initialized with `FACTORY_FILTER_DEFAULTS`.

2.  **`saveFiltersAsDefaultAtom`**
    *   **Type**: Write-only atom
    *   **Logic**:
        ```typescript
        export const saveFiltersAsDefaultAtom = atom(null, (get, set) => {
            const current = get(desktopFilterAtom);
            set(savedFilterDefaultsAtom, current);
            set(modifiedFiltersAtom, []); // Reset modification state
        });
        ```

3.  **`isFilterCustomizedAtom`**
    *   **Logic**: Compared `desktopFilterAtom` (current) against `savedFilterDefaultsAtom` (saved) to determine if the "Reset" button should appear or be active.

4.  **`resetFiltersAtom`**
    *   **Logic**: Reverted `desktopFilterAtom` to `savedFilterDefaultsAtom`.

### UI Integration (`src/desktop-enhanced/DesktopEnhancedApp.tsx`)

*   **"Save as my defaults" Button**: Located in the "More Actions" (three dots) menu.
*   **Action**: Triggered `saveFiltersAsDefaultAtom` and displayed a success toast ("Current filters saved as default").

### Why it was removed
Simplicity. The concept of "Factory Defaults" vs "User Defaults" vs "Current Session" added complexity to the "Reset" logic and wasn't strictly necessary for the core workflow. We are reverting to a simpler model where "Reset" always reverts to the factory defaults.
