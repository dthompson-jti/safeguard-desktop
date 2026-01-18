# Implementation Plan - TopNav Search Fixes

Goal: Resolve visual bugs in TopNav search focus state, specifically legibility and redundant outlines.

## Proposed Changes

### Component Layer
#### [MODIFY] [SearchInput.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/SearchInput.module.css)
-   **Legibility**: 
    -   For `flavor="trigger"`, explicitly set `color: var(--surface-fg-primary)` on focused wrapper AND input.
    -   Explicitly set `input::placeholder` color to `var(--surface-fg-quinary)` when focused to ensure visibility.
    -   Set `caret-color: var(--surface-fg-theme-primary)` to ensure the cursor is visible.
-   **Dual Outlines**: 
    -   Remove `outline: none` from input and button (handled).
    -   Verify if the wrapper itself needs `outline: none` when focused.
    -   Ensure `SearchInput` handles the focus ring entirely via `box-shadow`.

#### [MODIFY] [TopNav.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNav.module.css)
-   Remove any remaining `focus-within` or outline styles that might be conflicting.

## Verification Plan
### Manual Verification
-   **Focus TopNav Search**: Click into the search bar. Verify:
    -   Background turns white.
    -   Input text and placeholder are dark and legible.
    -   There is a single, clean focus ring around the entire 32px bar.
    -   The search button remains integrated correctly.
-   **Check Tab Navigation**: Tab to the search bar and verify focus indicator.
