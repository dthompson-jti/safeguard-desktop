# Limit Resident Badges to Max 3

This plan implements a hard limit of 3 badges for residents in the table view and removes the "+N" count indicator for hidden badges, as requested.

## Proposed Changes

### [Component] UI Integration
#### [MODIFY] [TopNavMenu.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNavMenu.tsx)
- Reorder font buttons to: **Inter**, **Hyperlegible**, **Atkinson**.

#### [NEW] [useAppFont.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/hooks/useAppFont.ts)
- Implement a new hook for managing and applying the application font.

### [Component] Badge Rendering
#### [MODIFY] [ResidentStatusGroup.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/ResidentStatusGroup.tsx)
- Update the `limit` constant (or logic) to `3`.
- Remove the conditional rendering block that displays the `+N` badge when `shouldTruncate` is true.
- Ensure only the first 3 badges are rendered when truncation is active.

## Verification Plan

### Manual Verification
1. **Table View**:
   - Find a resident with more than 3 badges (e.g., suicide risk, medical watch, and multiple other risks).
   - Ensure only the first 3 badges are visible.
   - Ensure there is NO "+N" badge.
2. **Toggle Functionality (Live)**:
   - Verify font button order: Inter, Hyperlegible, Atkinson.
   - Switch between fonts and verify instant application.
3. **Badge Truncation**:
   - Verify residents with >3 badges are capped at 3.
   - Verify NO "+N" indicator is shown.
4. **Persistence**:
   - Change the font, close and reopen the app. Verify the selected font persists.
5. **Detail View**:
   - Verify that all badges are still visible in the detail panel (since the limit usually applies to the table view for density).
