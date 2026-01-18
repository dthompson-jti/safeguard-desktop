# Implementation Plan - Nav Item Selected Hover State

Add a hover state for selected navigation items in the left nav, which should be 1-token darker than the selected state. Standardize the token name to `--nav-item-selected-hover`.

## Proposed Changes

### [Styles]

#### [MODIFY] [semantics.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/semantics.css)
- Add `--nav-item-selected-hover` token, mapped to `var(--primitives-theme-900)` (which is 1-token darker than the base selected bg `var(--primitives-theme-800)`).
- Add specific mappings for dark themes if necessary (currently focusing on light theme as it's the default).

#### [MODIFY] [LeftNavigationLinkItem.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SideBar/LeftNavigationLinkItem.module.css)
- Add `.selected:hover` state using `var(--nav-item-selected-hover)`.

### [Components]

#### [MODIFY] [SideBar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SideBar/SideBar.tsx)
- Rename the "Safeguard" nav item to "Safeguard checks" to match the user's request.
- Update the selection logic `node.label === 'Safeguard'` to `node.label === 'Safeguard checks'`.

## Verification Plan

### Manual Verification
1.  Run the application (`npm run dev`).
2.  Expand the left navigation.
3.  Locate the "Safeguard checks" item (should be selected by default based on `SideBar.tsx` logic).
4.  Hover over the "Safeguard checks" item.
5.  Verify that the background color becomes slightly darker than its normal selected state.
