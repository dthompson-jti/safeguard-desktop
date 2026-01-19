# implementation_plan_2026_01_18_multi_resident_and_fixes.md

## 1. Multi-Resident Display

### Goal
Update mock data logic to display rooms with multiple residents as multiple lines (one per resident).

### Changes
#### [MODIFY] [mockData.ts]
- Flatten logic to generate `LiveCheckRow` and `HistoricalCheck` items per resident loop, not per room loop.

## 2. Fix Double Sort Indicator

### Goal
Remove double sort arrow in Live View.

### Changes
#### [MODIFY] [EnhancedLiveMonitorView.tsx]
- Merge scheduled time sort into `status` column `sortingFn`.
- Remove secondary initial sort key.

## 3. Default to Historical View

### Goal
Make "Historical" the default landing view.

### Changes
#### [MODIFY] [atoms.ts]
- Update `desktopViewAtom` default to `'historical'`.
