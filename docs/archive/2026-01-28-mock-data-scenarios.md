# Refine Mock Data Scenarios

Refine the mock data generation in `src/desktop-enhanced/data/mockData.ts` to simulate specific "officer behavior" scenarios across different wings.

## Proposed Changes

### [Component] Mock Data Generation

Modify `generateEnhancedData` to handle unit-specific logic and adjust historical data injection.

#### [MODIFY] [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)

1.  **Unit Scenarios in Live View**:
    *   **Maple Transitional**: Force all rooms to be `overdue` with `deltaMinutes > 15` (simulating an officer missing their unit rounds).
    *   **Oak Integrated**: Force 2 specific rooms to have a "volley" of missed checks (e.g., `deltaMinutes = 40`, which results in `missedCheckCount = 3`).
2.  **Historical View Logic Update**:
    *   **Remove Live Injection**: Remove the logic that injects currently live missed checks into `historicalData`. As per instructions: "Only when the most recent check is completed, will we show the missed checks in the history view."
3.  **Unit Scenarios in Historical View**:
    *   **Cedar Assessment**: Inject a few dispersed `missed` checks across various residents in this unit.
    *   **Oak Enhanced**: Inject "volleys" (sequences of 3+ consecutive `missed` checks) for 2 specific residents in this unit.

## Verification Plan

### Manual Verification

1.  **Launch the application** (`npm run dev`).
2.  **Verify Live Monitor View**:
    *   Navigate to **Maple Transitional**. Verify all checks are 🔴 Missed.
    *   Navigate to **Oak Integrated**. Identify 2 residents with "Missed (3)" (or similar count) badges.
3.  **Verify Historical Review View**:
    *   Navigate to **Cedar Assessment**. Filter for "Missed". Verify a sporadic distribution of missed checks across different residents.
    *   Navigate to **Oak Enhanced**. Filter for "Missed". Verify 2 residents have multiple consecutive missed checks in their history.
4.  **Confirm Rule Adherence**:
    *   Verify that the missed checks accruing in **Oak Integrated** (Live) do NOT appear in the Historical view for those residents until they are "completed" (this can be checked by comparing IDs or notes if the mock allows completion, otherwise just verify they aren't there yet).
