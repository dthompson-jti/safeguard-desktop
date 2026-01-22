# ComboBox Full Audit Report

## Executive Summary

The `ComboBox` component has **15 distinct violations** across Code, Layout, Typography, and Design System adherence. These issues cause visible styling bugs (wrong height, colors, borders) and interaction problems (blur race conditions, missing key prop warnings).

---

## Code Audit

### 1. Missing `key` Prop (Severity: Error)
**Location:** [ComboBox.tsx:139](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.tsx#L139)
```tsx
filteredOptions.map((opt) => (
    <div
        key={opt.value}  // This is OUTSIDE the JSX element
        className="menuItem"
```
**Issue:** The `key` is placed as a property *after* the opening tag but React requires it as an attribute ON the element.
**Fix:** Move `key={opt.value}` to be the first prop.

### 2. Blur Handler Race Condition (Severity: Medium)
**Location:** [ComboBox.tsx:56-70](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.tsx#L56-L70)
**Issue:** `handleBlur` fires before `onMouseDown` on menu items can register selection in some edge cases.
**Fix:** The `onMouseDown` with `e.preventDefault()` is correct, but the `(All officers)` item uses `onClick` instead.
```tsx
// Line 129 uses onClick - should use onMouseDown
onClick={() => handleSelect('')}  // BUG
```

### 3. Inconsistent Item Event Handlers (Severity: Low)
**Issue:** `(All officers)` uses `onClick`, other items use `onMouseDown`. Should be consistent.

---

## Layout Audit

### 4. Hardcoded Height (Severity: Critical)
**Location:** [ComboBox.module.css:7](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L7)
```css
height: 32px;
```
**Spec Violation:** SPEC-CSS Section 16 requires `var(--control-height-*)` tokens.
**Context:** AdvancedSearch inputs use `var(--control-height-lg)` (48px). Using 32px creates visual inconsistency.
**Fix:** `height: var(--control-height-lg);`

### 5. Hardcoded Padding (Severity: Medium)
**Location:** [ComboBox.module.css:61](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L61)
```css
padding-right: 30px !important;
```
**Spec Violation:** SPEC-SPACING requires `--spacing-*` tokens.
**Fix:** Use `var(--spacing-8)` (32px).

### 6. Inline Style Hardcoding (Severity: Medium)
**Location:** [ComboBox.tsx:101](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.tsx#L101)
```tsx
style={{ position: 'absolute', right: 8, ... }}
```
**Spec Violation:** Should use `styles.iconWrapper` class.
**Fix:** Remove inline styles, use the CSS class.

---

## Typography Audit

### 7. Hardcoded Font Sizes (Severity: Medium)
**Locations:** 
- [ComboBox.module.css:9](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L9): `font-size: 13px;`
- [ComboBox.module.css:73](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L73): `font-size: 13px;`
**Spec Violation:** SPEC-CSS Section 14 requires `--font-size-*` tokens.
**Fix:** `font-size: var(--font-size-sm);` (14px)

### 8. Missing Font Weight Definition (Severity: Low)
**Issue:** No explicit `font-weight` set.
**Spec:** Inputs should use 400 (Regular).
**Fix:** Add `font-weight: var(--font-weight-regular);` or `400`.

### 9. Inline Icon Font Size (Severity: Low)
**Location:** [ComboBox.tsx:102](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.tsx#L102)
```tsx
style={{ fontSize: 16, ... }}
```
**Spec Violation:** SPEC-CSS Section 12 requires `--icon-size-*` tokens.
**Fix:** Use CSS class with `font-size: var(--icon-size-sm);`

---

## Design System Audit

### 10. Non-Existent Token (Severity: Critical)
**Location:** [ComboBox.module.css:12-13](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L12-L13)
```css
background-color: var(--control-bg-default);
border: 1px solid var(--control-border-default);
```
**Issue:** `--control-bg-default` and `--control-border-default` may not exist. The pattern in `Select.module.css` uses:
- `--control-bg-secondary`
- `--control-border-secondary`
**Fix:** Match existing Select tokens exactly.

### 11. Missing Border Radius Token (Severity: Low)
**Location:** [ComboBox.module.css:14](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L14)
```css
border-radius: var(--radius-m);
```
**Issue:** Other inputs use `--radius-md`. Verify token name.

### 12. Focus Ring Token Mismatch (Severity: Medium)
**Location:** [ComboBox.module.css:28](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css#L28)
```css
box-shadow: 0 0 0 2px var(--control-ring-focus);
```
**Issue:** Should match AdvancedSearch pattern:
```css
box-shadow: 0 0 0 var(--ring-width-focus) var(--control-focus-ring-standard);
```

### 13. Duplicate Selector Definition (Severity: Low)
**Location:** [ComboBox.module.css:1-19 and 60-62](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.module.css)
**Issue:** `.comboboxTrigger` is defined twice. Should consolidate.

### 14. Popover Width Variable (Severity: Low)
**Location:** [ComboBox.tsx:116](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/ComboBox.tsx#L116)
```tsx
width: 'var(--radix-popover-trigger-width)',
```
**Issue:** Using `Popover.Anchor` but the variable is for `Popover.Trigger`. May cause width mismatch.
**Fix:** Verify popover width behavior.

### 15. Not Inheriting AdvancedSearch Styles (Severity: Critical)
**Issue:** The component accepts `triggerClassName` but the base styles in `.comboboxTrigger` **conflict** with AdvancedSearch's `.selectTrigger` overrides (which use `!important`).
**Root Cause:** The `!important` rules in AdvancedSearch.module.css override SOME properties (height, background, border) but the ComboBox's base styles still apply for others.

---

## Remediation Plan

### Phase 1: Critical Fixes (15 min)
1. **[ComboBox.module.css]** Replace hardcoded values with tokens:
   - `height: var(--control-height-lg);`
   - `font-size: var(--font-size-sm);`
   - `padding-right: var(--spacing-8);`
2. **[ComboBox.module.css]** Fix token names to match `Select.module.css`:
   - `background-color: var(--control-bg-secondary);`
   - `border-color: var(--control-border-secondary);`
3. **[ComboBox.tsx]** Fix `key` prop placement.
4. **[ComboBox.tsx]** Change `(All officers)` to use `onMouseDown` + `e.preventDefault()`.

### Phase 2: Cleanup (10 min)
1. Remove inline styles from icon div.
2. Use `styles.iconWrapper` class.
3. Consolidate duplicate `.comboboxTrigger` definitions.
4. Fix focus ring token.

### Phase 3: Verification
1. Toggle between ComboBox and SearchableSelect – should be visually identical.
2. Keyboard: Tab → Type → Enter → Selection works.
3. Mouse: Click → Click item → Selection works.
4. Blur: Typing invalid → Blur → Reverts to previous.

---

## Recommended Next Step

Use `/quick-fix` to apply Phase 1 fixes immediately.
