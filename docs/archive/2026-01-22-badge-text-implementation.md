# Badge Text Mode Implementation Plan (Revised)

**Goal**: The "Badge Text" toggle (Full vs Acronym) should only affect the **Table Views** (Live and Historical). The **Detail Panel** must always show full text.

## User Feedback
- The toggle currently affects the Detail Panel (wrong).
- It should affect the Table.
- Table data is currently inconsistent (some raw data is already acronyms like "SR", others are "Flight Risk").
- Needs to apply to both Live and Historical views.

## User Review Required
- **Mock Data**: I will need to normalize the mock data if possible, or handle the inconsistency in the mapping logic.

## Proposed Changes

### Revert
#### [MODIFY] [DetailPanel.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DetailPanel.tsx)
- Remove subscription to `residentBadgeTextAtom`.
- Remove acronym mapping logic.
- Ensure badges always render full text.

### Live View
#### [MODIFY] [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/views/EnhancedLiveMonitorView.tsx)
- Identify the Risk/Badge column renderer.
- Subscribe to `residentBadgeTextAtom`.
- Apply acronym mapping logic (SR, MW, AR, ER, FR, SH).

### Historical View
#### [MODIFY] [EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/views/EnhancedHistoricalReviewView.tsx)
- Identify the Risk/Badge column renderer.
- Subscribe to `residentBadgeTextAtom`.
- Apply acronym mapping logic.

### Shared Logic
#### [NEW] [badgeUtils.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/utils/badgeUtils.ts)
- Create a reusable helper helper `getBadgeLabel(originalLabel, mode)` to centralize the mapping logic so it's consistent across views.

## Verification Plan
### Manual Verification
1. Open Live View.
2. Toggle Badge Text setting.
3. Verify table badges switch between "Suicide Risk" and "SR".
4. Open Historical View.
5. Verify table badges switch.
6. Open Detail Panel.
7. Verify badges remain as Full Text regardless of toggle setting.
