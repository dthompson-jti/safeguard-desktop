# Dropdown Styling Refinement

Align dropdown styling with design system requirements: normal dropdowns match text input hover states, while filter dropdowns use secondary button styling.

## Proposed Changes

### Components

#### [MODIFY] [Select.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/Select.module.css)
- Update `.selectTrigger` to use `var(--surface-bg-primary)` and `var(--surface-border-primary)` (matching text inputs).
- Update `.selectTrigger:hover` to use `var(--control-border-tertiary-hover)` and remove the secondary-button box-shadow.

#### [MODIFY] [FilterSelect.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/FilterSelect.module.css)
- Explicitly apply secondary button styling to `.defaultSelectTrigger`:
    - `background-color: var(--control-bg-secondary)`
    - `border-color: var(--control-border-secondary)`
    - `:hover` state with `box-shadow: inset 0 -3px 0 0 var(--control-border-secondary-hover)` and appropriate background/border colors.
- Add 1px thicker bottom border to `.activeSelectTrigger` and `.clearButton` (when active) via `box-shadow: inset 0 0 0 1px var(--control-border-selected), inset 0 -1px 0 0 var(--control-border-selected)`.

#### [MODIFY] [buttons.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/buttons.css)
- **Unified interaction Model**: All buttons (except Quaternary/Ghost) transition from "Flat at Rest" to "Structural Pop on Hover" to "Darker Pop on Pressed".
- **Primary / Secondary / On-Solid**:
    - Hover: 3px visual bottom (1px border + 2px shadow).
    - Pressed: 3px visual bottom using `-pressed` tokens (1-step darker).
- **Selected State (Panel/Filter)**:
    - Rest: 2px all-around visual border (1px border + 1px all-around inset shadow).
    - Hover: 4px visual bottom (2px all-around + 2px extra bottom emphasis).
    - Pressed: 4px visual bottom using `-pressed` tokens.
- **Tertiary**:
    - Hover: 2px visual bottom (1px border + 1px shadow).
    - Pressed: 2px visual bottom using `-pressed` tokens.
- **Quaternary**:
    - Hover: Background only.
    - Pressed: Darker background only.

## Verification Plan

### Manual Verification
1. Open the application.
2. Observe standard dropdowns (e.g., in a settings menu or "More" menu if applicable). Verify they match text input hover states (subtle border change, no bottom-heavy shadow).
3. Observe filter dropdowns in the toolbar (e.g., Live Monitor or Historical Review). Verify they use the secondary button style (resting gray background, bottom-heavy shadow on hover).
4. Verify that customized filters (active state) still maintain their distinctive "selected" look as before.
