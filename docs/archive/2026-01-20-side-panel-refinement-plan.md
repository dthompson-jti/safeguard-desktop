# Implementation Plan - Side Panel Open/Close Refinement

Refine the side panel (Details Panel) behavior to support both a "Pinned" mode (explicitly opened by the user) and a "Transient" mode (automatically shows/hides based on row selection).

## User Requirements
- If the user explicitly opens the side panel, keep it open (regardless of selection).
- If the user does not explicitly open the side panel, have it show when 1 record is selected and hide otherwise.

## Proposed Changes

### 1. State Management (Jotai Atoms)
- **File**: `src/desktop/atoms.ts`
- **Logic**: Repurpose `isDetailPanelOpenAtom` as the "Pinned" state. It indicates the user's explicit preference to have the panel visible at all times.

### 2. View logic (Selection Sync)
- **Files**: 
    - `src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx`
    - `src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx`
- **Changes**: 
    - Remove the automatic `setPanelOpen(true)` calls in the selection `useEffect`.
    - These views will now only be responsible for updating the `activeDetailRecordAtom` and selection sets.

### 3. Application Layout & Visibility
- **File**: `src/desktop-enhanced/DesktopEnhancedApp.tsx`
- **Changes**:
    - Update `showPanel` derived visibility logic:
      `const showPanel = isPanelOpen || totalSelected === 1;`
      *(Note: If the panel is pinned, it stays open. If not pinned, it shows only when exactly 1 item is selected.)*
    - Move/Enable the Panel Toggle button for both **Live** and **Historical** views.
    - Update the Toggle button icon/active state to strictly reflect the "Pinned" (`isPanelOpen`) state.
    - Ensure the button shows "Open" icon when the panel is visible via selection but not yet pinned.

### 4. Detail Panel Interaction
- **File**: `src/desktop/components/DetailPanel.tsx`
- **Current Behavior**: `handleClose` clears selection and sets `isPanelOpen(false)`.
- **Outcome**: This correctly handles "closing" the panel from within the panel itself, effectively unpinning and deselecting.

## Verification Plan

### Automated Tests
- N/A (Manual UI verification required for layout/interaction).

### Manual Verification
1.  **Initial State**: Start with no selection and panel closed.
2.  **Auto-Show**: Select one row in Live or Historical view. Verify the side panel opens automatically.
3.  **Auto-Hide**: Deselect the row or select a second row. Verify the side panel closes automatically.
4.  **Pinning**: Select one row (panel auto-opens). Click the "Open panel" button in the header. Verify the icon changes to "Close panel".
5.  **Persistence**: Deselect all rows. Verify the panel stays open (showing the "No selection" state).
6.  **Unpinning**: With no rows selected, click the "Close panel" button in the header. Verify the panel closes.
7.  **Transition**: Select one row (panel auto-opens). Click the "Close" button ("X") inside the Detail Panel. Verify the selection is cleared and the panel closes.
8.  **View Switching**: Pin the panel in Historical view. Switch to Live view. Verify the panel remains open.
