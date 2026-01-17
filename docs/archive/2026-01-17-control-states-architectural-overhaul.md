# Architectural Overhaul of Controls & Selected States

Establish a robust, first-principles CSS architecture for all button-like controls, specifically addressing the "Selected" state visual specifications (2px rest, 4px interaction) and ensuring consistent theming across variants.

## User Review Required

> [!IMPORTANT]
> This plan aggressively removes platform-specific overrides and manual state styling in favor of a unified CSS variable system. This ensures that `FilterSelect` is "pixel perfect" but relies on the base `Select` component correctly consuming provided variables.

## Proposed Changes

### [Component] Select & FilterSelect
#### [MODIFY] [Select.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/Select.module.css)
- Implement a **complete** CSS variable set for the theme:
  - Background: `--select-trigger-bg`, `--select-trigger-bg-hover`, `--select-trigger-bg-active`
  - Border: `--select-trigger-border`, `--select-trigger-border-hover`, `--select-trigger-border-active`
  - Foreground: `--select-trigger-fg`, `--select-trigger-fg-hover`, `--select-trigger-fg-active`
  - Shadow: `--select-trigger-shadow`, `--select-trigger-shadow-hover`, `--select-trigger-shadow-active`
- Remove standard `:hover` and `:active` hardcoded colors.
- Remove `[data-platform="desktop"]` overrides that hardcode border colors.

#### [MODIFY] [FilterSelect.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/FilterSelect.module.css)
- Convert `.activeSelectTrigger` into a **Variable Provider**.
- Unified the `clearButton` with the trigger's theme variables to ensure they always match.
- Fix the `border-radius` and `box-shadow` join logic.
- Ensure the "2px Visual Border" is applied correctly at rest and "4px Visual Bottom" on interaction.

---

### [StyleSheets] Global Buttons
#### [MODIFY] [buttons.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/buttons.css)
- Synchronize `.btn[data-active="true"]` with the exact same shadow math as FilterSelect:
  - **Selected Rest:** `inset 0 0 0 1px var(--control-border-selected)` (2px visual total).
  - **Selected Interaction:** `inset 0 0 0 1px var(--control-border-selected-hover), inset 0 -2px 0 0 var(--control-border-selected-hover)` (4px bottom).

## Verification Plan

### Automated Tests
- `npm run lint` & `npm run build` to ensure no regressions.

### Manual Verification
- Verify Filter Dropdown at rest (Secondary button look, full radius).
- Verify Filter Dropdown selected (Blue theme, 2px visual border, clear button visible).
- Verify Filter Dropdown selected + hover (Blue theme, 4px visual bottom border).
- Verify Panel Buttons (Selected state matches the exact same 2px/4px logic).
