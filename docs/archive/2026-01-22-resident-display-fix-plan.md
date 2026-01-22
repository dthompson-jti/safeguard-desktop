# Resident Display Settings Fix for Historical View

## Goal Description
Values from the "Resident display" settings (Display mode: Right badge / Left badge / Chip) and "Warning text" settings (Full / Short) are currently ignored in the Historical View.
This change will apply these settings to the Historical View, ensuring consistency with the Live View.

## Proposed Changes

### Desktop Enhanced
#### [MODIFY] [EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx)
- Import `residentDisplayModeAtom` and `residentBadgeTextAtom` from `../../desktop/atoms`.
- Import `ResidentChip` from `../../desktop/components/ResidentChip`.
- Read existing atoms `displayMode` and `badgeTextMode`.
- Update the `resident` column definition to use the same rendering logic as `EnhancedLiveMonitorView.tsx`:
    - Support `chip` mode using `<ResidentChip />`.
    - Support `left-badge` vs `right-badge` layout.
    - Support `full` vs `short` badge text.

## Verification Plan

### Manual Verification
1.  Open the application and switch to **Historical View**.
2.  Open **Settings** (or the menu where these toggles exist) and change "Resident display" to **Left badge**, then **Chip**.
    -   Verify the resident column updates immediately to reflect the choice.
3.  Change "Warning text" to **Short** (e.g. "SR") and **Full** (e.g. "Suicide risk").
    -   Verify high-risk residents show the correct text on their badges.
