# Archive Officer Combo Box Plan

## Goal Description
Remove the direct access to the "Officer Combo Box" option from the Hamburger Menu to prevent users from enabling it. The component is unfinished and suspect, so it is being "archived" by removing the UI control and adding documentation comments, while keeping the code in the codebase.

## User Review Required
> [!NOTE]
> This change only removes the UI toggle. If a user has already enabled 'combo' mode, they might still see it unless they clear their local storage or we reset it. Since the default is 'select', new users (or those who haven't enabled it) will not see it.

## Proposed Changes

### Desktop Enhanced
#### [MODIFY] [TopNavMenu.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNavMenu.tsx)
- Remove the "Use Combo Box for Officer" switch and label.

### Components
#### [MODIFY] [ComboBox.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.tsx)
- Add a top-level comment indicating the component is unfinished, behavior is suspect, and it is archived.

## Verification Plan

### Manual Verification
1.  **Open the application**.
2.  **Open the Hamburger Menu** (top left).
3.  **Verify** that the "Use Combo Box for Officer" option is gone.
4.  **Check code** to ensure `ComboBox.tsx` has the new comments.
