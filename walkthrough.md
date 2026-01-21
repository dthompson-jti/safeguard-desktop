# Walkthrough – Side Panel Interaction Model

## Overview
We have implemented a **Split Control Model** for the side panel to resolve ambiguity between "Transient" (auto-open) and "Pinned" states. Visibility and Persistence are now controlled by separate UI elements.

## Changes

### 1. Interaction Logic
*   **Toolbar Button ("Open Panel")**: Strictly controls **Visibility**.
    *   Clicking this ALWAYS toggles the panel on/off.
    *   **Closing**: If you close the panel, it will **Unpin** it. If it was only open due to a single selection, it will also **Clear Selection**.
*   **Panel Header Button ("Pin/Unpin")**: Strictly controls **Persistence**.
    *   **Pin**: Keeps the panel open even if you change selection or deselect rows.
    *   **Unpin**: Reverts to "Transient" mode (closes if you deselect).

### 2. UI Updates
*   **Toolbar**: The button icon is always `right_panel_open` / `right_panel_close` to indicate simple visibility toggling.
*   **Panel Header**: Added a new **Pin** (`keep` / `keep_off`) button next to the Close button.
*   **Atoms**: Refactored `isDetailPanelOpenAtom` to `isDetailPanelPinnedAtom` to reflect accurate state semantics.

## Verification

### Automated
*   `npm run lint` – **Passed** (Legacy usage updated).
*   `npm run build` – **Passed**.

### Manual User Flows

#### Flow A: Transient (Default)
1.  **Select a row**: Panel opens automatically.
2.  **Select another row**: Panel updates to new resident.
3.  **Click "X" (Close)** OR **Click Toolbar Close**: Panel closes AND selection is cleared.

#### Flow B: Pinning
1.  **Select a row**: Panel opens.
2.  **Click "Pin" (Panel Header)**: Icon changes to filled/active.
3.  **Deselect row (Ctrl+Click)**: Panel **STAYS OPEN** (shows empty state).
4.  **Click "Unpin"**: Panel closes (since no selection).

#### Flow C: Toolbar Override
1.  **Pin the panel**.
2.  **Click Toolbar "Close"**:
    *   Panel disappears.
    *   Pin state is reset to `false`.
    *   Selection is preserved (if >1 item) or cleared (if 1 item) – *intelligent closing*.
