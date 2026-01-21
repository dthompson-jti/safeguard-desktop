# Side Panel "Preview Pane" Implementation Plan

## Goal Description
Implement the "Preview Pane" model (like Finder/Explorer) where the side panel is a layout preference (ON/OFF) completely decoupled from row selection. Row selection only updates the content *if* the panel is already open.

## User Review Required
> [!NOTE]
> This simplifies the interaction model significantly. "Pin" button will be removed. Selection will no longer auto-open the panel.

## Proposed Changes

### Desktop Feature
#### [MODIFY] [atoms.ts](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Rename `isDetailPanelPinnedAtom` back to `isDetailPanelOpenAtom` (or keep as `isPanelVisibleAtom` for clarity).
- **CRITICAL**: Default value should probably be `true` (Preview Pane ON by default) or persistent.

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Update `showPanel` derivation: `const showPanel = isPanelVisible;`
    - **Remove** `|| totalSelected === 1` check.
- **Toolbar Button**:
    - Strictly toggles `isPanelVisibleAtom`.
    - No side effects on selection.

#### [MODIFY] [DetailPanel.tsx](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DetailPanel.tsx)
- **Remove "Pin" Button**: The header only needs a "Close" button.
- **Close Button**:
    - Sets `isPanelVisibleAtom = false`.
    - **DOES NOT** clear selection. (User might want to keep selection but hide panel to see more columns).

#### [MODIFY] [HistoricalReviewView.tsx] & [LiveMonitorView.tsx]
- **Row Double Click**:
    - Add handler: `onRowDoubleClick` -> `setIsPanelVisible(true)`.
    - This provides the "Explicit Open" trigger.

### Auto-Open Configuration (New)
#### [MODIFY] [atoms.ts](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Add `autoOpenDetailPanelAtom` (boolean, default false).

#### [MODIFY] [TopNavMenu.tsx](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNavMenu.tsx)
- Add Switch for "Auto-show panel on select".

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///C:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Update `showPanel` logic: `const showPanel = isPanelOpen || (autoOpen && totalSelected === 1);`
- Ensure Header Button tracks only `isPanelOpen` (Manual Mode).

## Verification Plan

### Manual Verification
**Test Case 1: Quiet Mode (Panel Closed)**
1. Ensure Panel is CLOSED.
2. Select a row (Click). -> Row highlights. Panel STAYS CLOSED.
3. Select multiple rows. -> Rows highlight. Panel STAYS CLOSED.

**Test Case 2: Preview Mode (Panel Open)**
1. Click Toolbar Toggle -> Panel OPENS (showing current selection or empty).
2. Select a row. -> Panel updates immediately.
3. Select nothing (Ctrl+Click). -> Panel clears (Empty State). Panel STAYS OPEN.

**Test Case 3: Explicit Open**
1. Ensure Panel is CLOSED.
2. Double-click a row. -> Panel OPENS and shows that row.
