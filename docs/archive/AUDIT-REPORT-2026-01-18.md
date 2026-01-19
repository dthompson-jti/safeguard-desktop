# Project Audit Report

## 1. Executive Summary
**Date:** 2026-01-18
**Scope:** `src` directory, focusing on Code Quality, Layout, Typography, and Design System Adherence.
**Status:** **Excellent** overall, with targeted opportunities for Design System hardening.

This audit confirms the codebase is robust, type-safe, and generally aligned with architectural patterns. The primary gap is "Design System Drift" in older CSS modules where explicit `px` values persist instead of semantic tokens. Correcting this will future-proof the application for theming and density adjustments.

## 2. Findings by Category

### A. Code Quality & Architecture
*   **Status:** ✅ **Pass**
*   **Observations:**
    *   No usage of `as any` or loose typing found in key files.
    *   `DataTable.tsx` is large (400+ lines) but logically sound. It handles sorting, filtering, and selection via TanStack Table robustly.
    *   **Action Item:** `DataTable.tsx` layout calculation logic (lines 48-103) is complex and imperative (canvas measurement). This is a prime candidate for extraction to a `useTableAutoFit` hook to simplify the component.

### B. Design System Adherence (Tokens)
*   **Status:** ⚠️ **Needs Remediation**
*   **Observations:**
    *   Widespread use of hardcoded spacing and sizing values in CSS modules, bypassing the `primitives.css` / `semantics.css` contract.
    *   **Violations:**
        *   `TreeView.module.css`: `padding-bottom: 24px` (Should be `--spacing-6`).
        *   `toast.css`: `gap: 10px`, `padding: 16px`.
        *   `BulkActionFooter.module.css`: `bottom: 48px`, `gap: 12px`.
    *   **Risk:** Inconsistent visual rhythm and difficulty in implementing density modes later.

### C. Typography
*   **Status:** ⚠️ **Needs Remediation**
*   **Observations:**
    *   Found hardcoded font sizes in CSS modules instead of tokens.
    *   **Violations:**
        *   `TreeView.module.css`: `font-size: 20px`, `14px`, `11px`.
            *   *Note:* `11px` is a violation of the `12px` minimum (`--font-size-2xs`) defined in `SPEC-CSS.md`.
        *   `toast.css`: `font-size: 0.9rem`.
    *   **Inline Style Violation:** `TreeView.tsx` contains `<span style={{ fontSize: 18 }}>`. This should be moved to CSS or use a token class.

### D. Layout & Positioning
*   **Status:** ⚠️ **Needs Remediation**
*   **Observations:**
    *   **Z-Index Fragility:**
        *   `toast.css` uses `z-index: 2147483647` (Max Int).
        *   `Layout.module.css` uses `101`.
        *   *Recommendation:* Implement a unified Z-Index scale in `semantics.css` (`--z-toast`, `--z-overlay`, etc.).
    *   **Magic Numbers:**
        *   `DataTable.tsx`: Uses `padding = 60` in auto-fit calculation.
        *   `RowContextMenu.tsx`: Manually calculates position (`rect.right - 220`). This is brittle and should use a positioning library like Radix Popover or Popper.js.

### E. Component Hygiene
*   **Status:** ⚠️ **Needs Remediation**
*   **Observations:**
    *   **Accessibility Anti-Pattern:** Usage of `div` with `onClick` for interactive elements.
        *   `SearchController.tsx`: Collapsed search icon is a `div`.
        *   `TopNavMenu.tsx`: Menu items are `div`s.
        *   *Risk:* Not accessible via keyboard (Tab) and screen readers. Must be `<button>`.

## 3. Detailed File Audit

### `TreeView.module.css`
*   `padding-bottom: 24px` -> Use `--spacing-6`.
*   `font-size: 20px` -> Use `--icon-size-md` (or `--font-size-xl` if text).
*   `font-size: 11px` -> Bump to `--font-size-2xs` (12px) for legibility.

### `toast.css`
*   Revert plain px values to `var(--spacing-*)`.
*   Define `--z-toast` token.

### `DataTable.tsx`
*   Extract `handleAutoFit` logic.
*   The `canvas` context font string `'500 0.875rem Inter...'` is hardcoded. It should ideally reference the theme, but as a JS string, it might need to remain hardcoded or constructed from computed styles.

## 4. Recommendations
1.  **Phase 1: Token Hardening:** Run a sweep of all `.module.css` files to replace `px` values with `var(--spacing-*)` and `var(--radius-*)`.
2.  **Phase 2: Accessibility Fixes:** convert all `div onClick` instances to `<button>` with appropriate styling resets (`background: none; border: none;`).
3.  **Phase 3: Layout Stability:**
    *   Extract `useTableAutoFit`.
    *   Implement unified Z-Index scale.
    *   Refactor `RowContextMenu` to use Radix/Popper.
