# VET: MultiSelect Checkbox Evolution

**Reviewer**: vet-simple
**Date**: 2026-02-17
**Plan Reviewed**: [implementation_plan.md](file:///C:/Users/dthompson/.gemini/antigravity/brain/fba32dc6-b256-4d69-bda5-da8418161603/implementation_plan.md)

---

## Executive Summary
The plan to replace the simple checkmark with a themed checkbox is sound and aligns with the design system. The risk is low, but care should be taken to ensure visual parity with standard checkboxes and avoid ripple effects on other menu-based components.

**Overall Risk**: Low
**Recommendation**: Proceed with Changes

---

## Overlooked Aspects

### Accessibility
- ⚠️ **Screen Reader Support** (Med Impact)
  - **Finding**: The "illusion" of a checkbox inside a menu item button might not be explicitly announced as a checkbox to screen readers unless the `menuItem` uses `role="menuitemcheckbox"`.
  - **Recommendation**: Ensure the `menuItem` button in `MultiSelect.tsx` has `role="menuitemcheckbox"` and `aria-checked` attribute mapping to its state.

### Edge Cases
- ✅ **Disabled Items** (Covered)
  - Existing `menuItem` styles in `menu.css` already handle opacity and cursor for disabled states.

### Visual Consistency
- ⚠️ **Indeterminate State** (Low Impact)
  - **Finding**: Standard checkboxes sometimes have an indeterminate state. Multi-select items don't usually need this, but it's worth noting if "Select All" is ever added.
  - **Recommendation**: Not required for this phase, but keep in mind for future "Select All" items.

---

## Unintended Consequences

### 1. Ripple Effect: Shared Menu Styles
- **Likelihood**: Med
- **Severity**: Low
- **Issue**: `menuCheckmark` is a shared class in `menu.css`. Changing it globally might affect single-select dropdowns if they also use this class for their checkmark.
- **Mitigation**: Scoped styles in `MultiSelect.module.css` are planned, but we should ensure we don't accidentally break global `menuItem` look if we move styles to `menu.css`.

---

## Quick Wins

1. **Add `role="menuitemcheckbox"`** (2 min)
   - File: `MultiSelect.tsx`
   - Add the ARIA role to the `menuItem` button to improve accessibility.

2. **SVG Data URI reuse** (1 min)
   - Reuse the exact SVG from `forms.css` to ensure the checkmark path is identical to standard checkboxes.

---

## Priority Breakdown

| Priority | Count | Items |
| :--- | :--- | :--- |
| Critical | 0 | — |
| High | 1 | ARIA roles for accessibility |
| Medium | 1 | Scoping shared menu styles |
| Low | 1 | Indeterminate state consideration |

---

## Recommendation

**Proceed with Changes**

Address the following before/during implementation:
1. Add `role="menuitemcheckbox"` and `aria-checked` to the `menuItem` buttons.
2. Ensure the checkbox styling is strictly scoped or intentionally global if all menus should follow this pattern.
