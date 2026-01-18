# Implementation Plan - Search Box Remediation

Goal: Align the refactored search component with `AGENTS.md` standards while respecting user height requirements.

## Proposed Changes

### Component Layer
#### [MODIFY] [SearchInput.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/SearchInput.tsx)
-   Apply explicit icon size tokens:
    -   `flavor="trigger"` (TopNav) -> `--icon-size-lg` (24px)
    -   `flavor="instant"` + `size="sm"` -> `--icon-size-sm` (16px) per user feedback
    -   `flavor="instant"` + `size="md"` -> `--icon-size-md` (20px)
-   Standardize `size="sm"` font size to 14px (`--font-size-sm`) minimum.

#### [MODIFY] [SearchInput.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/SearchInput.module.css)
-   Add icon size variables and application logic.
-   Ensure vertical centering of icons and text is perfect.
-   Standardize `size="sm"` font size to 14px (0.875rem).

## Verification Plan
### Manual Verification
-   **Top Nav**: Verify search button icon is 24px and button is vertically centered.
-   **Left Nav**: Verify search icon is 20px and text is 14px.
-   **Toolbar**: Verify search icon is 20px.
