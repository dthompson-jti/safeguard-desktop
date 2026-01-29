# Plan: Update "Overdue" labels to "Missed"

The objective is to replace all user-facing instances of the word "Overdue" with "Missed" in the live view, specifically in tooltips, badges, and countdown timers.

## Proposed Changes

### UI Components

#### [MODIFY] [TreeView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TreeView.tsx)
- Update tooltip content for live view missed checks.
```diff
- <Tooltip content={view === 'live' ? 'Overdue' : 'Missed – no comment'}>
+ <Tooltip content={view === 'live' ? 'Missed' : 'Missed – no comment'}>
```

#### [MODIFY] [GlobalStatusWidget.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/GlobalStatusWidget.tsx)
- Update tooltip for the overdue count.
```diff
- <Tooltip content="Overdue">
+ <Tooltip content="Missed">
```

#### [MODIFY] [useCountdown.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/data/useCountdown.ts)
- Update the countdown string returned for overdue checks.
```diff
- if (totalMinutes < 1) return 'Overdue';
+ if (totalMinutes < 1) return 'Missed';
- return `Overdue ${parts.join(' ')}`;
+ return `Missed ${parts.join(' ')}`;
```

### Mock Data

#### [MODIFY] [mockLiveData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/mockLiveData.ts)
- Update mock labels for consistency.
```diff
- createLiveCheck('live-1', 'Jeff Siemens', '102', 'overdue', 'Overdue 5m', {
+ createLiveCheck('live-1', 'Jeff Siemens', '102', 'overdue', 'Missed 5m', {
```

## Verification Plan

### Manual Verification
- Launch the application (`npm run dev`).
- Navigate to the Live View.
- Hover over the red badges in the Tree View to verify the "Missed" tooltip.
- Check the Global Status Widget tooltip to verify it says "Missed".
- Look at the Status column in the table to verify countdowns say "Missed Xm" instead of "Overdue Xm".
- Verify the Status Badge itself (if visible) says "Missed".
