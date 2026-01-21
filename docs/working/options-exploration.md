# Side Panel Behavior Options

## Problem Space
The current side panel implementation creates ambiguity between "Transient" (auto-open on selection) and "Pinned" (manually open) states. The "Toggle" button currently only toggles the "Pinned" state, leading to confusing interactions (e.g., clicking the button when transiently open "Pins" it instead of closing it).

## Option 1: Explicit 3-State Segmented Control
**Concept**: A visible control (Segmented Button or Dropdown) in the toolbar explicitly sets the mode.
- **States**:
    1.  **Auto (Default)**: Opens on single selection, closes on deselect/multi-select.
    2.  **Always Open**: Panel stays open. Empty state if no selection.
    3.  **Always Closed**: Panel never auto-opens.
- **Pros**: Zero ambiguity. User sees exactly what mode they are in.
- **Cons**: Takes up toolbar space. "Always Closed" might feel like a broken feature if user selects things and nothing happens.

## Option 2: The "Pin" Interaction (Slack-style)
**Concept**: The panel is Transient by default. A specific "Pin" action locks it open.
- **Behavior**:
    - **Single Select**: Panel opens (Transient). Header shows a "Pin" icon.
    - **Click Pin**: Panel enters "Pinned" state. Stays open even if selection clears.
    - **Click Close (X)**:
        - If Transient: Clears selection AND closes panel.
        - If Pinned: Unpins AND closes panel.
- **Pros**: Familiar pattern (Slack threads). "Close" always means "Close".
- **Cons**: Requires two clicks to go from "Transient" to "Closed without clearing selection" (if that's a desired state).

## Option 3: "Close" Means "Hide" (Override)
**Concept**: The Toggle Button acts as a master override.
- **Behavior**:
    - **Default**: Auto-open on selection.
    - **User Clicks Close**: Panel hides. System remembers "User specifically hid the panel". Selection remains active.
    - **User Clicks Open**: Panel opens. System forgets "User hid panel".
    - **New Selection**: Resets the "Hidden" override? (Debatable).
- **Pros**: Intuitive "Close" action prevents panel from annoying user.
- **Cons**: Complex logic for when to reset the "Hide" override. Does selecting a *new* row re-open it? (Likely yes).

## Option 4: Selection is King (No Manual Toggle)
**Concept**: Remove the manual interaction entirely for opening/closing empty panels.
- **Behavior**:
    - Panel ONLY opens when a record is selected.
    - "Close" button on panel deselects the record.
    - To keep panel open while browsing, user must change selection directly.
- **Pros**: Extremely simple mental model.
- **Cons**: Cannot view panel for "no selection" (e.g. aggregate stats?). Cannot hide panel if I want to see full table width while keeping selection.

## Option 5: The "Dock" Button
**Concept**: Side panel is an overlay by default (or pushes content), but has a "Dock" button to make it permanent.
- **Behavior**:
    - **Selection**: Panel slides in.
    - **Dock Button**: Locks the panel in place.
    - **Un-Dock**: Panel becomes transient again.
- **Pros**: Distinguishes between "glancing" and "working".
- **Cons**: Similar to Pin, but implies layout changes (overlay vs push).

## Option 6: Settings-Based Preference
**Concept**: Move the behavior choice to "View Settings" dropdown, keep the UI simple.
- **Behavior**:
    - Toggle Button strictly shows/hides panel.
    - New Setting: "Auto-open panel on selection" (Checkbox, checked by default).
    - If Checked: Selection triggers "Open" state.
    - If Unchecked: Selection does nothing to panel visibility.
- **Pros**: Cleanest UI. Power users can disable auto-open.
- **Cons**: Functionality is hidden. Changing modes requires clicks.

## Recommendation
**Option 2 (Pin)** is the strongest contender for a rich desktop application. It explicitly models the user's intent ("I want to keep this reference open while I work") vs the system's convenience ("Here is the detail for what you just clicked").
