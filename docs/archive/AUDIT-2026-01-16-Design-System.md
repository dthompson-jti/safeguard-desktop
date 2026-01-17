# Audit: Mobile Vestiges & Design System Gaps

**Date:** 2026-01-16
**Scope:** Global Styling & Component Library

## 1. Mobile-Centric Vestiges
The following patterns were identified as legacy "mobile-first" constraints that conflict with a high-density desktop experience.

### Touch Targets
-   **`--control-min-touch`**: Defined as `3.5rem` (56px) in `primitives.css`. Overridden to `2.25rem` in `desktop-overrides.css`.
    -   *Recommendation*: Delete. Desktop apps don't need a minimum touch target global variable.
-   **List Items**: `src/styles/list.css` enforces `min-height: var(--control-min-touch)`.
    -   *Recommendation*: Change to explicit density tokens (e.g., `--list-item-height-md`).
-   **44px Hardcoded Heights**: Found in `TopNav`, `DetailPanel`, `DesktopHeader`, `Breadcrumbs`.
    -   *Recommendation*: Tokenize. 44px is arguably too tall for some desktop toolbars (often 36px or 40px).

### Touch Actions
-   **`touch-action: none`**: Found in `toast.css` and `ColorSlider`.
    -   *Recommendation*: Review. While some touch support is nice for hybrid laptops, blocking gestures globally is aggressive.

### Architecture
-   **`src/desktop/desktop-overrides.css`**: A literal patch file patching the "mobile" defaults to be desktop-like.
    -   *Recommendation*: **Eliminate**. The "overrides" should become the *default* in `primitives.css` and `index.css`.

## 2. Design System Gaps (Tokens)
-   **Destructive Buttons**: No semantic tokens. Uses raw `red-600`.
-   **Control Heights**:
    -   `primitives.css` defines SM=36px, MD=44px.
    -   `buttons.css` (Desktop) manually forces S=32px, M=36px.
    -   *Recommendation*: Update `primitives.css` to S=32px, M=36px as the global truth.

## 3. Recommended Action Plan
1.  **Merge** `desktop-overrides.css` into `primitives.css` (making desktop the default).
2.  **Redefine** Control Heights to Desktop constraints (32/36px).
3.  **Refactor** Buttons to use these truthful tokens.
4.  **Delete** `--control-min-touch` and remove references.
