# Implementation Plan - Advanced Search

The goal is to implement an "Advanced Search" mode for the desktop toolbar, triggered by the "tune" icon. This will provide more granular filtering options, specifically exposing an "Officer" filter in addition to existing filters, with different configurations for Live vs Historical views.

## User Review Required

> [!NOTE]
> I am interpreting "Category", "Entity", "Type" from the reference image as placeholders and mapping them to the actual available data fields requested: Officer, Status, Time.
> The "Officer" filter will be a text search or dropdown (I will match it to the mock data officer list if possible, or leave as free text).

## Proposed Changes

### Data & State

#### [MODIFY] [types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/types.ts)
- Add `officer?: string` to `DesktopFilter`.

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Update `FACTORY_FILTER_DEFAULTS` to include `officer: ''`.
- Update `isFilterCustomizedAtom` to check for `officer` changes.
- Update `filteredHistoricalChecksAtom` to filter by `officer` (name substring match).

#### [MODIFY] [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)
- Export `OFFICER_NAMES` to be used in UI suggestions if needed.
- Update `loadEnhancedLivePage` to filter by `officer`.
- Update `loadEnhancedHistoricalPage` to filter by `officer`.

### Components

#### [NEW] [AdvancedSearch.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/AdvancedSearch.tsx)
- Create a new component that renders the advanced search panel.
- Inputs for **Live View**:
    - Search (Text) - "Has the words"
    - Status (Dropdown) - "Type"
    - Officer (Select/Text) - "Officer"
- Inputs for **Historical View**:
    - Search (Text) - "Has the words"
    - Status (Dropdown) - "Type"
    - Officer (Select/Text) - "Officer"
    - Time Range - "Last modified" (or similar label)
- Layout: Grid-based layout similar to the Figma screenshot.
- Actions: "Search" (apply filters), "Reset".

#### [NEW] [AdvancedSearch.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/AdvancedSearch.module.css)
- Styles for the panel (white background, border, padding, grid layout).

#### [MODIFY] [DesktopToolbar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.tsx)
- Add state `isAdvancedInputOpen`.
- When "tune" button is clicked, toggle this state.
- If open, hide the standard toolbar inputs and show `AdvancedSearch` component (or overlay it).
- Ensure "Search" input in `AdvancedSearch` syncs with the standard one.

## Verification Plan

### Automated Tests
- None planned for this UI feature.

### Manual Verification
1.  **Live View**:
    - Click "tune" icon. Confirm Advanced Search panel opens.
    - Enter text in "Has the words".
    - Select a Status.
    - Enter/Select an Officer.
    - Click Search. Verify table filters correctly.
    - Click Reset. Verify filters clear.
2.  **Historical View**:
    - Switch to Historical View.
    - Open Advanced Search.
    - Verify "Time Range" input is available.
    - Test filtering by Officer and Time Range.
