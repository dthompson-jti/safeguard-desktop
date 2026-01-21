# Idea: Side Panel 3-State Behavior

## Problem Space
The current side panel implementation relies on a binary state (Open/Closed) and a separate "Transient" behavior (opens when 1 row is selected). This leads to ambiguity and potential conflicts in user intent.

Currently:
1.  **Always Closed**: Panel is hidden.
2.  **Transient/Auto**: Panel opens when a row is selected.
3.  **Always Open**: Panel stays open even if nothing is selected (or multiple). (This state is partially conflated with "Transient" in current logic).

We need to clarify these behaviors into distinct, user-selectable modes.

## Solution Space
Explore a 3-state control that explicitly defines the behavior of the side panel.

### Proposed States

1.  **Always Closed**
    - Panel is strictly hidden.
    - Selecting rows does not open it.
    - UI: "Close" icon or similar.

2.  **Auto (Default)**
    - Panel is hidden by default.
    - Panel **automatically opens** when exactly **one** record is selected.
    - Panel **automatically closes** when:
        - Selection is cleared.
        - Multiple records are selected.
    - UI: "Split/Auto" icon.

3.  **Always Open**
    - Panel is strictly visible.
    - If no record is selected, it shows a placeholder/empty state.
    - If multiple records are selected, it shows a multi-select summary or empty state.
    - UI: "Open" icon or "Pin" icon.

## Considerations for Exploration
- **UI Control**: Where does this control live? (Header? Toggle button replacement?)
- **Icons**: What icons best represent these 3 states?
    - `right_panel_close` / `splitscreen` / `right_panel_open`?
- **Persistence**: Should this preference be saved per session or permanently?
