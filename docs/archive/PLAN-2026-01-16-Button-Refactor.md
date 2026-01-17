# Architecture: Design System Desktop Alignment

This plan addresses the user's request to "align to the Figma standard" and remove "mobile-centric" vestiges. The core change is making Desktop the *primary* platform, eliminating "mobile" defaults.

## Goal Description
1.  **Merge Overrides**: Delete `desktop-overrides.css` and move its values into `primitives.css` as the new defaults.
2.  **Define Desktop Tokens**:
    -   `--control-height-sm`: 32px (Default)
    -   `--control-height-md`: 36px (Large/Default)
    -   `--control-height-lg`: 40px/44px
    -   *Remove* `control-min-touch`.
3.  **Refactor Buttons**: Update `buttons.css` to use these new semantic tokens and add Destructive token support/
4.  **Clean Code**: Remove `touch-action` and mobile-specific sizing hacks from other files (`list.css`, `toast.css`).

## User Review Required
> [!IMPORTANT]
> **Mobile Defaults Removed**: I am overwriting the "mobile" defaults in `primitives.css` with valid Desktop values (e.g., 44px -> 36px). This assumes the application is **Desktop Only**.
>
> **Destructive Tokens**: New tokens `control-bg-destructive` etc. will be added to `semantics.css`.

## Proposed Changes

### 1. Primitives & Semantics (`src/styles`)
#### [MODIFY] [primitives.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/primitives.css)
-   **Heights**:
    -   `xs`: 20px
    -   `sm`: 32px (was 36px)
    -   `md`: 36px (was 44px)
    -   `lg`: 44px (was 48px)
-   **Remove**: `--control-min-touch`.

#### [MODIFY] [semantics.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/semantics.css)
-   Add Destructive Tokens (Red).

### 2. File Removals
#### [DELETE] [desktop-overrides.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/desktop-overrides.css)
-   File is no longer needed as primitives will hold the correct values.

#### [MODIFY] [index.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/index.css)
-   Remove import of `desktop-overrides.css`.

### 3. Styles Cleanup
#### [MODIFY] [list.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/list.css)
-   Replace `var(--control-min-touch)` with explicit height (e.g., 36px or 40px).

#### [MODIFY] [buttons.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/buttons.css)
-   Use `control-height` tokens.
-   Fix Secondary border layout shift.
-   Use Destructive semantic tokens.

#### [MODIFY] [toast.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/toast.css)
-   Remove `touch-action: none`.

## Verification Plan
1.  **Build**: Ensure no missing variable errors.
2.  **Visual**: Check Buttons, Lists, and Toasts.
3.  **Regression**: Check `DataTable` (which often used `control-min-touch` or similar).
