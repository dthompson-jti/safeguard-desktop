# Add "Any [Thing]" Filter Options

Based on evaluation, we will add "Any <thing>" options to filters where "Has value" is distinct from "All records".

## Evaluation Results

| Filter | "Any ..." Meaning | Utility | Redundancy | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **Officer** | "Has assigned officer" | Low | High (Same as "Status: Completed") | **Skip** |
| **Status** | "Has status" | None | N/A (All have status) | **Skip** |
| **Enh. Obs.** | "SR or MW" | **High** | None | **Add** |
| **Comment Reason** | "Has any reason" | **High** | None (Distinct from specific reasons) | **Add** |

## Proposed Changes

### [MODIFY] [src/desktop/components/AdvancedSearch.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/AdvancedSearch.tsx)
1.  **Enhanced Observation**: Add `{ value: 'has-any', label: 'Any observation' }`.
2.  **Comment Reason**: Add `{ value: 'has-any', label: 'Any reason' }`.

### [MODIFY] [src/desktop-enhanced/data/mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)
1.  **Enhanced Observation Logic**: Handle `filter.enhancedObservation === 'has-any'` -> `return !!r.hasHighRisk || r.location.includes('MW')`.
2.  **Comment Reason Logic**: Handle `filter.commentReason === 'has-any'` -> `return !!r.supervisorNote`.

## Verification Plan

### Manual Verification
1.  **Enhanced Observation**:
    - Select "Any observation".
    - Verify list shows *both* SR and MW records.
    - Verify list *excludes* normal records.
2.  **Comment Reason**:
    - Select "Any reason".
    - Verify list shows *only* records with comments (regardless of the specific reason text).
