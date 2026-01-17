# Implementation Plan - Button & UI Refinements

This plan addresses consistency issues in button styling, specifically for active states, on-solid variants, and incorrect hierarchy assignments.

## Discovery
1.  **Panel Toggle (DesktopHeader)**: Currently uses a manually styled `secondary` variant. Needs to be standardized with "Selected" tokens when the panel is active.
2.  **On-Solid Buttons (BulkActionFooter)**: Missing the "3D" inset shadow consistent with other button types.
3.  **[...] Menu Button (NavigationPanel)**: Using `quaternary` variant; needs to be `tertiary`.

## Proposed Changes

### 1. Style System (src/styles/buttons.css)
- **Add "Active/Selected" State Style**:
    - Create a global `.btn[data-active="true"]` rule.
    - Base: `background-color: var(--control-bg-selected); color: var(--control-fg-selected); border-color: var(--control-border-selected);`
    - Hover: `background-color: var(--control-bg-selected-hover);`
    - Hover Shadow: `box-shadow: inset 0 -3px 0 0 var(--control-border-selected-hover);`
- **Refine "On-Solid" Variant**:
    - Add `box-shadow: inset 0 -3px 0 0 var(--control-border-tertiary-hover);` to hover and active states of `.btn[data-variant="on-solid"]`.

### 2. Component Logic (src/components/Button.tsx)
- Add `active?: boolean` prop.
- Forward as `data-active={active}` to the DOM element.

### 3. Desktop Header (src/desktop/components/DesktopHeader.tsx)
- Convert the manual toggle button to use the `Button` component.
- Pass `active={isPanelOpen}` instead of manual class/inline styles.

### 4. Navigation Panel (src/desktop-enhanced/components/NavigationPanel.tsx)
- Change the menu button variant from `quaternary` to `tertiary`.

## Task List
- [ ] Add `active` prop to `Button.tsx`
- [ ] Update `buttons.css` with active state and on-solid shadow
- [ ] Refactor `DesktopHeader.tsx` toggle
- [ ] Update `NavigationPanel.tsx` variant
