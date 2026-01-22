# Plan: Terminology Polish & Panel Animation Sync

Update codebase terminology to use "Reviewed" instead of "Commented" for missed checks and synchronize the Detail Panel close animation.

## User Review Required

> [!IMPORTANT]
> This change updates technical keys used in filtering logic (`missed-commented` -> `missed-reviewed`). I will update all mock data generators and filters to ensure backward compatibility is maintained within the session.

## Proposed Changes

### [Terminology Refactor]
Systematically replace "commented/uncommented" with "reviewed/not reviewed" and enforce the use of en dashes (`–`) with spaces in UI labels.

#### [MODIFY] [types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/types.ts)
- Rename `HistoricalStatusFilter` values:
    - `'missed-uncommented'` -> `'missed-not-reviewed'`
    - `'missed-commented'` -> `'missed-reviewed'`

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Update `desktopFilterAtom` initial values.
- Update `filteredHistoricalData` logic to use new status keys.

#### [MODIFY] [StatusBadge.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/StatusBadge.tsx)
- Update `StatusBadgeType`.
- Update `getStatusConfig` with new labels:
    - `Missed – Not Reviewed`
    - `Missed – Reviewed`
- Use the en dash (`–`) consistently.

#### [MODIFY] [AdvancedSearch.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/AdvancedSearch.tsx) & [DesktopToolbar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.tsx)
- Update `HISTORICAL_STATUS_OPTIONS` labels and values.

#### [MODIFY] [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts) & [mockHistoricalData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/mockHistoricalData.ts)
- Update mock data generation and filtering logic to support new keys.

#### [MODIFY] [StatusBadge.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/StatusBadge.module.css)
- Update selectors:
    - `[data-status='missed-uncommented']` -> `[data-status='missed-not-reviewed']`
    - `[data-status='missed-commented']` -> `[data-status='missed-reviewed']`

---

### [Detail Panel Animation]
Synchronize the wrapper's layout shift with the internal panel exit transition.

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Wrap `detailPanelWrapper` in a `motion.div`.
- Animate `width: 0` to `width: panelWidth` on mount/unmount using `AnimatePresence`.
- Set `overflow: hidden` on the wrapper during transition to prevent content overflow.
- Match the `tween` ease and `0.3s` duration of the internal `DetailPanel`.

## Verification Plan

### Automated Tests
- `npm run lint` to ensure no stale references or type errors.

### Manual Verification
1. Open Historical View and check the "Status" filter labels.
2. Verify badges in the table show "Missed – Not Reviewed" (red) and "Missed – Reviewed" (grey).
3. Toggle the Detail Panel and verify the "X" button close animation: the main content should expand smoothly as the panel slides out.
4. Verify resizing still works and transitions are disabled correctly during drag.
