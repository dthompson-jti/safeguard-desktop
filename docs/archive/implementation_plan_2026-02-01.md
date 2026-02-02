# Implementation Plan - UI Updates & Search Refinements

## Goal Description
Implement several UI and functional updates:
1.  **Export Menu**: "Export" button in panel header opens a popover menu with options: Excel, XML, CSV, PDF, RTF.
2.  Change the default sorting in Live View to "Schedule" (Completed).
3.  Refine Advanced Search (Completed).

## User Review Required
> [!NOTE]
> **Export Popover**: Implementing standard popover menu with items: Excel, XML, CSV, PDF, RTF.

## Proposed Changes

### Export Menu
### Export Menu
#### [MODIFY] [src/desktop-enhanced/DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
-   Locate `row2Actions` div within `navRow2`.
-   Insert `Popover` with Export options (Excel, XML, CSV, PDF, RTF) to the left of the panel toggle button.
-   Use `isExportOpen` state.
-   Ensure styling matches via `DesktopEnhancedApp.module.css` if necessary.

## Verification Plan
### Manual Verification
-   **Export Menu**:
    -   Click "Export".
    -   Verify popover opens.
    -   Verify all 5 options are present with correct labels.
    -   Clicking an option closes the menu (and logs placeholder action).
