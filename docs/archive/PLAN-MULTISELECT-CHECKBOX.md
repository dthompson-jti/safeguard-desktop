# evolved MultiSelect Checkbox Styles

This plan outlines the steps to replace the simple checkmark in the `MultiSelect` component with a visual checkbox that matches the project's standard checkbox styling.

## Proposed Changes

### [Component] MultiSelect

#### [MODIFY] [MultiSelect.tsx](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/MultiSelect.tsx)
- No changes to logic, but the structure within the `menuItem` will be refined to ensure the `menuCheckmark` can be styled as a checkbox.
- Update the item layout to ensure the checkbox is properly aligned.

#### [MODIFY] [MultiSelect.module.css](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/MultiSelect.module.css)
- Implement checkbox styles for `.menuCheckmark` that mirror those in `forms.css`.
- Use the following tokens:
    - Background: `var(--surface-bg-primary)` (unchanged)
    - Border: `1px solid var(--surface-border-primary)`
    - Checked Background: `var(--control-bg-theme)`
    - Checked Border: `1.5px solid transparent`
    - Check icon: Use the same SVG data URI from `forms.css` or a Material Symbol check if preferred, but styled to match the "illusion" of a checkbox.
- Add hover/pressed states for the checkbox itself if it adds to the feel, though the entire `menuItem` handles hover already.

> [!NOTE]
> Since the `menuItem` uses `data-state="checked"`, we can use this attribute to style the internal checkbox div.

## Verification Plan

### Automated Verification
- Run `npm run lint` to ensure no regressions.
- Verify that the `MultiSelect` still functions correctly (adding/removing items).

### Manual Verification
- Open the application and navigate to a view using a `MultiSelect` (e.g., filters in the toolbar).
- Click the dropdown and verify:
    - Checkboxes are visible on the left side of each item.
    - Selected items have a filled checkbox with a white checkmark.
    - Unselected items have an empty checkbox outline.
    - The styling is consistent with the standard `input[type="checkbox"]` found in forms.
