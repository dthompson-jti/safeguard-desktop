# Task: UI Clean-up for Detail Panel

Clean up the Detail Panel UI based on user feedback.

## Changes

- **Side Panel Header**:
    - Changed resident name color to `var(--surface-fg-primary)` to match the navigation panel.
- **Identity Bar / Metrics**:
    - Moved "Room" (formerly location) and "Status" into the metrics stack.
    - Added proper labels for "Room" and "Status".
    - Removed the "door_front" icon from the room display.
- **Officer Notes**:
    - Removed quotations and the description icon.
    - Simplified layout to remove the background wrapper (`quoteBlock`).
    - Styled text as `secondary` with regular weight.
- **Supervisor Comments**:
    - Removed the dashed border wrapper (`supervisorBlock`) when no comment exists.
    - Simplified the layout for adding a new comment.

## Verification Plan

- [x] Check `DetailPanel.tsx` for correct logic.
- [x] Check `DetailPanel.module.css` for updated styles.

- **Add Comment Modal**:
    - Refactored `SupervisorNoteModal` to use the standardized `Modal` component.
    - Updated `semantics.css` to include a new `--surface-bg-backdrop` semantic token.
    - Switched the backdrop/overlay from a solid black "one-off" to the same translucent background used by the custom date range modal.
    - Cleaned up `SupervisorNoteModal.module.css` and removed non-standard container styles.

## Verification Plan

- [x] Check `DetailPanel.tsx` for correct logic.
- [x] Check `DetailPanel.module.css` for updated styles.
- [x] Check `SupervisorNoteModal.tsx` and `.module.css` refactoring.
- [x] Verify semantic tokens in `semantics.css`.
- [x] Run `npm run lint` to ensure no regressions.

- **Detail Panel Sync Logic**:
    - Fixed `SupervisorNoteModal` to *not* clear single-row selections on save, preserving context.
    - Updated `EnhancedHistoricalReviewView.tsx` to actively sync the open Detail Panel with fresh data after a re-fetch.
    - Added logic to auto-close the panel if the selected row disappears (e.g., filtered out) after an update.
    - Verified that adding a comment now correctly updates the panel or closes it appropriately.

- **Detail Panel & Modal Refinements**:
    - **Custom Date & Supervisor Modals**: Standardized Close buttons (tertiary) and Footer buttons (small size).
    - **Detail Panel Comments**:
        - Removed "Verified" status.
        - Text is now "unwrapped" (plain text).
        - Added gap between text and action buttons (`.reviewSection`).
        - Changed "Delete" (red) to "Remove Comment" (secondary gray).
    - **Menu Dropdowns**:
        - Increased horizontal padding to `16px` (spacing-4) to fix cramped "Custom Range..." text.

- **Design System Audit (Button Sizing)**:
    - **Report**: Created `docs/knowledge-base/AUDIT-DESIGN-SYSTEM-2026-01-16.md`.
    - **Outcome**: Redefined `size="s"` buttons globally to match "Desktop Medium" standards:
        - Height: 36px (unchanged)
        - Padding: 12px (was 10px)
        - Gap: 4px (was 8px)
    - This ensures all "small" buttons (now the desktop standard) have the correct density.
    - Verified `SupervisorNoteModal` buttons look correct.

- **Detail Panel & Modal Logic**:
    - **Delete Action**: Moved "Remove Comment" button to `SupervisorNoteModal` footer (left-aligned), only visible when editing an existing comment.
    - **Selection Logic**: Modal now correctly pre-fills when a single row with a comment is selected.

**Completion Status**: All refined.
