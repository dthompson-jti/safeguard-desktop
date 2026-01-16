# Sticky Filter Customization State

Introduce a mechanism to track explicit user modifications to filters, ensuring the "customized" (blue) UI state persists until the "Clear" button is clicked, even if the filter value is manually changed back to its default.

## User Review Required

> [!IMPORTANT]
> This change introduces a `modifiedFiltersAtom` in `localStorage` to persist the "customized" (blue) state across refreshes. If you save filters as defaults, all currently "modified" states will be cleared as they become the new baseline.

## Proposed Changes

### State Layer

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Define `modifiedFiltersAtom` (`atomWithStorage`) to track explicitly changed filter keys.
- Implement `updateFilterAtom` to apply filter changes and mark them as modified.
- Implement `clearFilterAtom` to reset a specific filter to its default and remove its "modified" status.
- Update `saveFiltersAsDefaultAtom` and `resetFiltersAtom` to clear the entire `modifiedFiltersAtom` set.

### Components

#### [MODIFY] [FilterSelect.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/FilterSelect.tsx)
- Remove internal comparison of `value` vs `defaultValue`.
- Accept `isCustomized` as an explicit prop from the parent.
- Ensure the `onValueChange` and `onClear` callbacks interact with the correct atoms (mediated by the parent or direct usage).

#### [MODIFY] [DesktopToolbar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.tsx)
- Use `useAtomValue(modifiedFiltersAtom)` to determine the customization status for each filter.
- Update `handleStatusChange`, `handleTimeRangeChange`, `handleFacilityChange`, and `handleUnitChange` to use the new `updateFilterAtom` logic (or equivalent state updates that mark them as modified).
- Implement individual `onClear` callbacks for each filter using `clearFilterAtom`.

## Verification Plan

### Manual Verification
1. **Initial State**: Verify all filters are gray (unless defaults were previously saved differently).
2. **Modify Filter**: Change "Time Range" from "Last 24 Hours" (default) to "Last 8 Hours".
    - Verify filter turns blue with 'x'.
3. **Revert Manually**: Change "Time Range" back to "Last 24 Hours".
    - Verify filter **remains blue** with 'x' (this is the key fix).
4. **Clear Filter**: Click the 'x' on the "Time Range" filter.
    - Verify filter turns gray and the 'x' disappears.
5. **Global Reset**: Modify multiple filters (blue states). Click "Reset Filters".
    - Verify all filters return to gray.
6. **Save as Default**: Modify a filter. "Save Filters as Default".
    - Verify filter turns gray (as it's now the default baseline).
