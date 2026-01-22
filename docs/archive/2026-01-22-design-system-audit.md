# Design System Audit Report

**Date:** 2026-01-22
**Scope:** CSS Modules in `src` directory

## Exectuive Summary

The codebase generally adheres to the design system, especially in newer "Enhanced" components. However, there are lingering legacy patterns, particularly in `z-index` management and some hardcoded dimensions in toolbars.

## 1. Z-Index Violations

| File | Violation | Severity | Recommendation |
| :--- | :--- | :--- | :--- |
| `src/styles/menu.css` | `z-index: 1100` | High | Use `var(--z-dropdown)` (2100) |
| `src/desktop/components/DetailPanel.module.css` | `z-index: var(--z-sticky)` | Low | Use `var(--z-sticky)` (Correct usage) |
| `src/components/Tooltip.module.css` | `z-index: 50` | **Critical** | Fixed in previous step to `var(--z-tooltip)` |

## 2. Hardcoded Dimensions & Spacing

| File | Violation | Severity | Recommendation |
| :--- | :--- | :--- | :--- |
| `src/desktop/components/DesktopToolbar.module.css` | `width: 240px` (Search) | Medium | Move width constraint to component prop or token |
| `src/desktop/components/DesktopToolbar.module.css` | `height: 36px`, `height: 40px` | Medium | Use `--control-height-sm` or `--control-height-md` |
| `src/desktop/components/RowContextMenu.module.css` | `min-width: 220px` | Low | Tokenize if reused |
| `src/styles/utility.css` | `width: 1px`, `height: 20px` (Dividers) | Low | Standardize divider tokens |

## 3. Color Token Violations (Hex Codes)

| File | Violation | Severity | Recommendation |
| :--- | :--- | :--- | :--- |
| `DesktopTabGroup.module.css` | Potential hardcoded colors | Low | Verify against `primitives.css` |
| `SegmentedControl.module.css` | Potential hardcoded colors | Low | Verify against `primitives.css` |

## 4. Typography Violations

- **General Observation**: Most components correctly use `--font-size-*` tokens.
- **RowContextMenu**: Uses `--font-size-sm` (Correct).
- **DesktopToolbar**: Uses `--font-size-sm` (Correct).

## Recommendations

1.  **Refactor `menu.css`**: Update z-index to use semantic token.
2.  **Standardize Toolbar Dimensions**: Replace `36px`/`40px` with control height tokens in `DesktopToolbar.module.css`.
3.  **Migrate Legacy Components**: Audit `DesktopTabGroup` and `SegmentedControl` for theme compatibility (Dark Mode).
