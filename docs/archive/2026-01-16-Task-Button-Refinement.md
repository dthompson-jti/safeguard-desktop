# Task - Button & UI Refinements

Refine button styles and component usage to ensure consistency across the application.

## Requirements
- Standardize the "Open" state of the side panel toggle using "Selected" design tokens.
- Add 3D inset shadows to "On-Solid" buttons.
- Correct the button variant hierarchy in the Navigation Panel.

## Files to Modify
- `src/components/Button.tsx`: Add `active` prop.
- `src/styles/buttons.css`: Implement `.btn[data-active="true"]` styles and `on-solid` shadows.
- `src/desktop/components/DesktopHeader.tsx`: Use `Button` component with `active` prop.
- `src/desktop-enhanced/components/NavigationPanel.tsx`: Change variant to `tertiary`.

## Verification Steps
- Hover over the panel toggle when active: ensure it shows a thick bottom border.
- Hover over selection toolbar buttons: ensure they show a 3D inset shadow.
- Verify "..." button in left panel looks like other tertiary buttons.
