# Update Toast Notification Design

This plan outlines the steps to update the toast notification system to match the new Figma design, utilizing solid semantic backgrounds and high-contrast text/icons.

## User Review Required

> [!IMPORTANT]
> **New Property**: I am adding an optional `title` field to the `Toast` object. This allows for the prominent "Notification Title" header seen in the Figma design.
> **Action Link Layout**: The "Action" button is being refactored from a boxy button to an underlined link style to match the "Action Link" design in Figma.
> **Bottom-Right Positioning**: As requested, the toasts will now appear in the bottom-right corner of the screen, floating above any footer elements.

## Prototype Toast Details

Currently, the prototype uses toasts for the following scenarios in `SupervisorNoteModal.tsx`:
1. **Scenario**: Supervisor saves a review for one or more checks.
   - **Variant**: `success`
   - **Current Message**: `Review saved for X check(s)`
   - **New Plan**: Title: `Review saved`, Message: `Successfully applied to X check(s)`.
2. **Scenario**: Supervisor removes an existing review.
   - **Variant**: `neutral`
   - **Current Message**: `Review removed.`
   - **New Plan**: Title: `Review removed`, Message: `The supervisor note has been deleted.`.
3. **Scenario**: Error occurs during save/delete.
   - **Variant**: `alert`
   - **Current Message**: `Failed to save review.` / `Failed to remove review.`
   - **New Plan**: Title: `Error`, Message: `Failed to [save/remove] review. Please try again.`.

## Proposed Changes

### Data & State

#### [MODIFY] [toastAtoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/data/toastAtoms.ts)
- Add `title?: string` to the `Toast` interface.
- Update `addToastAtom` to accept `title`.

### Components

#### [MODIFY] [Toast.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/Toast.tsx)
- Update markup to include a `.toast-content` wrapper containing a `.toast-title` (if provided) and the existing description.
- Ensure the `variant` is correctly applied for styling.

### Styling

#### [MODIFY] [toast.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/toast.css)
- **Viewport Positioning**: Update `.toast-viewport` to position at `right: var(--spacing-4)` and `left: auto`, with `align-items: flex-end`.
- **Base Style**: Set `.toast-root` to a more compact layout if needed, but primarily focus on the color switch.
- **Variants**:
    - Update `info`, `success`, `warning`, and `alert` to use `--surface-bg-*-solid`.
    - Set all text/icons within these variants to use `--surface-fg-on-solid`.
- **Title & Description**:
    - Style `.toast-title` with bold weight and slightly larger font size if appropriate.
    - Style `.toast-description` to be slightly smaller or lighter if a title is present.
- **Action & Close Buttons**:
    - Refactor `.toast-action` to remove background/border, using `text-decoration: underline` and `on-solid` colors.
    - Update `.toast-close-button` to use `on-solid` colors with appropriate hover transparency.

### Implementation Details - Token Mapping
- **Info**: `--surface-bg-info-solid`
- **Success**: `--surface-bg-success-solid`
- **Warning**: `--surface-bg-warning-solid`
- **Alert**: `--surface-bg-error-solid`
- **Foreground**: `--surface-fg-on-solid`

---

## Verification Plan

### Manual Verification
- Trigger various toast types (Success, Info, Alert, Warning) via the app's actions (e.g., saving a supervisor note).
- Verify that the colors match the Figma mockup exactly.
- Verify that the "Action Link" is correctly styled and functional.
- Verify that long messages wrap correctly within the new layout.
- Verify that toasts without a title still look balanced and readable.
