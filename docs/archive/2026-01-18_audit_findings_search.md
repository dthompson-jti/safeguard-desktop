# Audit Findings: SearchInput Component

## Executive Summary

> [!CAUTION]
> The component has **multiple design system violations** including hardcoded primitive tokens, excessive `!important` usage, and inconsistent styling patterns.

---

## 1. Code Audit

### ✅ Good Patterns
- Clean component API with `flavor` and `size` props
- Proper accessibility: `aria-label`, visually hidden label, `useId()`
- Correct use of `Button` component for clear action

### ❌ Issues

| Issue | Severity | Location |
|:------|:---------|:---------|
| Raw `<button>` instead of `Button` component | High | L84-91 (triggerButton) |
| Focus state managed via React state, not CSS `:focus-within` | Medium | L27, L43 |

---

## 2. Layout Audit

### ✅ Good Patterns
- Flexbox layout with consistent gap
- Proper optical balance: `padding-left` = `gap`

### ❌ Issues

| Issue | Severity | Location |
|:------|:---------|:---------|
| Hardcoded `32px` and `38px` heights | Medium | CSS L19, L28 |
| Should use `--control-height-sm` (32px) and custom token for 38px | Medium | CSS L18-28 |

---

## 3. Typography Audit

### ✅ Good Patterns
- Uses `--font-size-sm` and `--font-size-md` tokens

### ❌ Issues

| Issue | Severity | Location |
|:------|:---------|:---------|
| Confusing comment about font-size-md | Low | CSS L31 |

---

## 4. Design System Audit

### ❌ Critical Issues

| Issue | Severity | Location |
|:------|:---------|:---------|
| **6x `!important`** overrides | Critical | CSS L71-84, L93, L142 |
| **Primitive tokens** (`--primitives-*`) used directly | Critical | CSS L71-84 |
| Missing semantic tokens for focused trigger state | Critical | CSS L70-84 |
| `--search-icon-size` defined inline, not in primitives | Medium | CSS L23, L32, L62 |

### Primitive Token Violations (CSS L70-84)
```css
/* WRONG - Uses primitives directly */
background-color: var(--primitives-base-white) !important;
color: var(--primitives-grey-900) !important;
caret-color: var(--primitives-theme-600) !important;
color: var(--primitives-grey-500) !important;
```

**Root Cause**: The TopNav context sets `color: var(--top-nav-fg)` (white), which cascades into the search component. The fix uses primitives to force override.

**Correct Architecture**: The TopNav should not set `color` on wrapping elements, or the search component should use a scoped wrapper that resets the color context.

---

## 5. Recommended Fixes

### Priority 1: Remove `!important` and Primitive Tokens
1. Add semantic tokens for TopNav search focused state:
   - `--top-nav-search-focused-bg`
   - `--top-nav-search-focused-fg`
   - `--top-nav-search-focused-placeholder`
2. Apply these tokens in CSS without `!important`

### Priority 2: Use Button Component for Trigger
Replace raw `<button className={styles.triggerButton}>` with `<Button variant="primary" size="sm" iconOnly>`.

### Priority 3: Use Control Height Tokens
Replace hardcoded `32px`/`38px` with `var(--control-height-sm)` and introduce `--control-height-search-md` if 38px is a standard.

---

## Summary

| Category | Status |
|:---------|:-------|
| Code Architecture | ⚠️ Needs Improvement |
| Layout | ✅ Good |
| Typography | ✅ Good |
| Design System | ❌ Critical Issues |
