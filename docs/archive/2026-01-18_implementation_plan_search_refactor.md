# Implementation Plan - SearchInput Architectural Clean-up

Goal: Rectify design system violations and architectural debt in the SearchInput component.

## Proposed Changes

### 1. Global Styles & Theming
#### [MODIFY] [semantics.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/semantics.css)
- Add new tokens for search inputs to prevent context-based inheritance issues:
  - `--search-input-bg-primary`: `var(--surface-bg-primary)`
  - `--search-input-border-primary`: `var(--surface-border-primary)`
  - `--top-nav-search-focused-bg`: `var(--surface-bg-primary)`
  - `--top-nav-search-focused-fg`: `var(--surface-fg-primary)`
  - `--top-nav-search-focused-placeholder`: `var(--surface-fg-quinary)`

### 2. Search Component
#### [MODIFY] [SearchInput.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/SearchInput.module.css)
- **Remove all `!important` declarations**.
- Replace hardcoded primitives with semantic tokens.
- Use `--control-height-sm` (32px) for the `sm` size.
- Refactor focus state to use `:focus-within` on the wrapper if possible, or keep React state if needed for complex prop-based styling, but use it with cleaner CSS.

#### [MODIFY] [SearchInput.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/SearchInput.tsx)
- Replace raw `<button>` with `<Button variant="primary" size="sm" iconOnly>` for the `trigger` flavor.
- Remove `isFocused` state if purely CSS `:focus-within` can handle all styling.

### 3. Navigation Layer
#### [MODIFY] [TopNav.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNav.module.css)
- Ensure no parent `color` overrides are breaking the SearchInput's internal theme reset.

## Verification Plan

### Manual Verification
- **All Search Boxes**:
    - Verify focus rings are consistent.
    - Verify placeholder colors are legible.
    - Verify background/foreground contrast meets WCAG.
- **TopNav Interaction**:
    - Verify search button click triggers `onSearch`.
    - Verify "Enter" key works.
    - Verify no visual jump during transition.

### 6. Add Clear Button to TopNav Search
- **Component Logic**: Update logic in `SearchInput.tsx` to render the clear button if `value` exists, regardless of `flavor` (or specifically for `instant` and `trigger`).
- **Styling**: 
    - Ensure the clear button in `trigger` flavor uses `color: inherit` or specific TopNav colors to match the "on-solid" rest state.
    - Maintain existing gaps and margins.

### 5. Clear Button Spacing Balance
- **Calculate Margins**:
    - `sm` (32px height): `xs` button (20px) -> 6px v-gap. Set `padding-right: 6px`.
    - `md` (38px height): `xs` button (20px) -> 9px v-gap. Set `padding-right: 9px`.
- **CSS Changes**:
    - Remove `margin-right` from `.clearButton`.
    - Apply specific `padding-right` to `.wrapper[data-flavor="instant"]` based on `data-size`.
