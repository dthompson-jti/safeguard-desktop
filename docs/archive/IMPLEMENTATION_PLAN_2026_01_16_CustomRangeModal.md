# Implementation Plan - Custom Range Modal

Refining the "Custom Date Range" filter by replacing the disappearing Popover with a centered Modal with a dimmed background, as requested. The design will strictly map to the provided Figma tokens.

## Goal Description
- Replace the `Popover` component for "Custom Date Range" with the `Modal` component.
- Ensure the interaction is stable (doesn't disappear unexpectedly).
- Map UI elements to specific Figma tokens (colors, spacing, typography).

## User Review Required
> [!IMPORTANT]
> This change switches the UI pattern from a lightweight Popover to a blocking Modal interaction. This is consistent with the user's request for "centered modal with dimming background" to solve the disappearing issue.

## Audit Findings & Design System Alignment (v2)
Comparing the actual implementation (Image 0) against the Mockup (Image 1):
- **Input Type**: Needs to change from `datetime-local` to `date`.
- **Button Order**: Needs to be "Apply" then "Cancel" (left to right).
- **Button Variant**: "Cancel" should be `tertiary`. "Apply" remains `primary`.
- **Alignment**: Both buttons should be right-aligned in the footer.
- **Styling**:
  - Header background should be primary (white) instead of secondary.
  - Header padding should be tighter.
  - Footer background should be very light/primary.
  - Title font weight and color need refinement.

## Proposed Changes

### Filters & Toolbar
#### [MODIFY] [DesktopToolbar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.tsx)
- Change input type to `date`.
- Swap order of `Button` components in `Modal.Footer` (Apply, then Cancel).
- Change "Cancel" button variant to `tertiary`.
- Wrap footer buttons in a container for alignment.

#### [MODIFY] [DesktopToolbar.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.module.css)
- Add `.modalFooter` to override `modal-footer` behavior (float right).
- Add `.modalHeader` to override `modal-header` background/padding.
- Refine `.modalTitle` and `.dateInput` to match mockup visuals.
- Ensure the dash spacer and inputs are perfectly aligned.

## Verification Plan
### Manual Verification
- Open "Time Range" -> "Custom Range...".
- Compare vs `uploaded_image_1_1768593242541.png`.
- Verify only date is selectable (no time).
- Verify "Apply" is on the left of "Cancel" (tertiary).
- Verify both buttons are on the right side.


