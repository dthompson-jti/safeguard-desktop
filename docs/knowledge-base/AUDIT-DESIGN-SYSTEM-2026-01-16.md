# Design System Audit: Button Sizing & Modal Standards
**Date**: 2026-01-16
**Scope**: Buttons, Modals, Detail Panel

## 1. Executive Summary
An audit was triggered by user feedback indicating that the standard "Medium" buttons appeared too large ("giant") for the desktop context, retaining legacy mobile-optimized dimensions. The audit identified a mismatch between the tokenized "Medium" size (44px) and the desired "Desktop Medium" size (36px).

## 2. Findings

### Button Sizing Discrepancy
- **Legacy State**:
    - `size="m"` was 44px (Touch standard).
    - `size="s"` was 36px (Desktop standard height), but with wrong padding/gap.
- **User Requirement & Final Decision**:
    - **Desktop Medium (`size="m"`)**: Height **36px**, Padding **12px**, Gap **4px**.
    - **Desktop Small (`size="s"`)**: Height **32px**, Padding **10px**, Gap **4px**.
    - **Usage**: Modals must use `size="m"`.

### Component Usage
- **SupervisorNoteModal**: Used `size="s"` (previously modified) but lacked the correct desktop spacing/gap.
- **DetailPanel**: Redundant "Remove Comment" action was present in the panel, contradicting the requirement to keep destructive actions within the modal context.

## 3. Remediation Actions

### Global Style Updates
- **File**: `src/styles/buttons.css`
- **Change**: Redefined both `size="m"` and `size="s"` for desktop density.
    - **Medium (m)**: 36px height, 12px padding, 4px gap. (Primary Action Standard)
    - **Small (s)**: 32px height, 10px padding, 4px gap. (Secondary/Icon Standard)

### Component Refinements
- **SupervisorNoteModal.tsx**: 
    - Updated footer actions to `size="m"`.
    - Renamed "Save Comment" to "Save".
    - Added "Remove Comment" (Delete) action (Size M).
- **DesktopToolbar.tsx**:
    - Updated Custom Range Modal actions to `size="m"`.
- **DetailPanel.tsx**:
    - Removed the "Remove Comment" button to declutter the interface and centralize editing/management in the modal.

## 4. Verification
- [x] Buttons in `SupervisorNoteModal` are 36px tall.
- [x] Button padding is 12px.
- [x] Icon gap is 4px.
- [x] "Remove Comment" action is strictly located in the Modal.

## Next Steps
- Monitor other instances of `size="s"` across the application to ensure the tighter gap (4px) does not negatively impact other layouts, though it is likely an improvement for desktop density.
