# Add "Unspecified" Supervisor Review Type

Add a new supervisor review reason "Unspecified" and set it as the default for new reviews.

## Options

### Option 1: Hardcoded Default (Recommended)
Add "Unspecified" to the `SUPERVISOR_NOTE_REASONS` array and update the default state in `SupervisorNoteModal.tsx`.
- **Pros**: Simplest integration, least amount of code changes.
- **Cons**: Requires manual updates if the default changes again.

### Option 2: Configurable Default
Introduce a `DEFAULT_SUPERVISOR_REASON` constant in `types.ts`.
- **Pros**: Cleaner separation of concerns.
- **Cons**: Slightly more boilerplate.

### Option 3: First-Item-Default
Automatically select the first item of `SUPERVISOR_NOTE_REASONS` as the default.
- **Pros**: More dynamic.
- **Cons**: Implicit behavior might be confusing if the array order changes unexpectedly.

## Proposed Changes
Using **Option 1** as it fits the current lightweight architecture best.

### Desktop Components

#### [MODIFY] [types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/types.ts)
- Add `'Unspecified'` to the `SUPERVISOR_NOTE_REASONS` array.
- Position it at the beginning so it appears first in dropdowns.

#### [MODIFY] [SupervisorNoteModal.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.tsx)
- Update initial state for `reason` from `'Unit Lockdown'` to `'Unspecified'`.
- Update reset logic in `handleClose` and `useMemo` (for new reviews) to use `'Unspecified'`.

## Verification Plan

### Manual Verification
1. **Open Application**: Navigate to the historical view.
2. **Open Modal**: Click on a missed check that doesn't have a review to open the "Add supervisor review" modal.
3. **Verify Default**: Confirm that the "Reason for missed check(s)" dropdown defaults to "Unspecified".
4. **Save Review**: Select "Unspecified", add a note, and save.
5. **Verify Persistence**: Confirm the review is saved with the "Unspecified" reason in the Detail Panel.
6. **Edit Review**: Re-open the modal for the same check and confirm "Unspecified" is still selected.
