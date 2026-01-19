# Implementation Plan - Sticky Rows

prevent rows from disappearing immediately after adding a comment in the Historical View. We will achieve this by performing a local "optimistic" update to the table data instead of triggering a full server re-fetch.

## User Review Required

> [!NOTE]
> This change means the table data might temporarily be "stale" with respect to the active filter (e.g. showing a "Commented" item in a "No Comment" filter view) until the user navigates away or refreshes. This is the intended "Sticky" behavior.

## Proposed Changes

### Desktop Atoms
#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Add `historicalRowUpdateAtom` to communicate granular updates.

### Components
#### [MODIFY] [SupervisorNoteModal.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.tsx)
-   Trigger `historicalRowUpdateAtom` with the change details.
-   **Remove** the `historicalRefreshAtom` trigger (or make it conditional if needed for the legacy view, but ideally the legacy view can also benefit from sticky rows or we update both).
    -   *Self-correction*: To be safe, I will keep `historicalRefreshAtom` for the legacy view if it doesn't support the new atom, OR I will update the legacy view too. Let's assume we want to fix it primarily for the Enhanced view. I will make `SupervisorNoteModal` write to the new atom.

#### [MODIFY] [EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx)
-   Subscribe to `historicalRowUpdateAtom`.
-   In a `useEffect`, when an update arrives, map over `loadedData` and merge the changes into the matching row.
-   This ensures the row stays in the list with updated data.

## Verification Plan

### Manual Verification
1.  Open Historical View.
2.  Filter by "Missed" -> "No Comment".
3.  Click "Add Comment" on a row.
4.  Save the comment.
5.  **Verify**: The row *remains* in the list.
6.  **Verify**: The "Comments" column updates to show the new note.
7.  **Verify**: The Status badge updates (if logic depends on note presence).
8.  Refresh the page.
9.  **Verify**: The row disappears (correctly filtered out).
