# Refine Live View Filters and Unify View State

The user reported seeing irrelevant filters ('Missed – No Comment') in the Live View. Research revealed that the application is using two different atoms for the view state (`desktopViewAtom` and `desktopEnhancedViewAtom`) which are not synced, causing the `DesktopToolbar` to stay in 'historical' mode even when the app is in 'live' mode.

Additionally, the user requested to remove the time dropdown in Live View and standardize the Status options to "All, Due, Missed, Upcoming".

Finally, a `ReferenceError` was discovered in `mockData.ts` due to `seededRandom` being used before its initialization. This will be fixed by reordering the definitions in that file.

## User Review Required

> [!IMPORTANT]
> This plan involves unifying the view state into a single atom (`desktopViewAtom`). All components currently using `desktopEnhancedViewAtom` will be updated to use `desktopViewAtom`.

## Proposed Changes

### Core State

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)

- Ensure `desktopViewAtom` is the canonical source of truth for the view state. (Already exists).

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/atoms.ts)

- Remove `desktopEnhancedViewAtom`.

#### [MODIFY] [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)

- Move `seededRandom` definition above the `ROOMS` constant initialization to fix the `ReferenceError: Cannot access 'seededRandom' before initialization`.

### Components

#### [MODIFY] [DesktopToolbar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.tsx)

- Update `LIVE_STATUS_OPTIONS` to "All", "Due", "Missed", "Upcoming" in that specific order.
- Ensure the "Time Range" filter remains hidden in Live View (which will be corrected once the atom is synced).

```diff
 const LIVE_STATUS_OPTIONS = [
-    { value: 'all', label: 'All Status' },
-    { value: 'upcoming', label: 'Upcoming' },
-    { value: 'due', label: 'Due' },
-    { value: 'overdue', label: 'Missed' },
+    { value: 'all', label: 'All' },
+    { value: 'due', label: 'Due' },
+    { value: 'overdue', label: 'Missed' },
+    { value: 'upcoming', label: 'Upcoming' },
 ];
```

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
#### [MODIFY] [ModeToggle.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/ModeToggle.tsx)
#### [MODIFY] [useTreeData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/hooks/useTreeData.ts)
#### [MODIFY] [TreeView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TreeView.tsx)

- Switch from `desktopEnhancedViewAtom` to `desktopViewAtom`.

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure no stale imports remain.

### Manual Verification
1.  **Run the application**: `npm run dev`
2.  **Verify Live View**:
    - Search is visible.
    - Status dropdown has exactly: "All", "Due", "Missed", "Upcoming".
    - Time Range dropdown is HIDDEN.
    - "Missed – No Comment" is NOT in the status options.
3.  **Verify Historical View**:
    - Status dropdown has: "All Status", "Missed – No Comment", etc.
    - Time Range dropdown IS visible.
4.  **Verify Synchronization**: Toggle between Live and Historical using the mode toggle and ensure the toolbar updates correctly and immediately.
