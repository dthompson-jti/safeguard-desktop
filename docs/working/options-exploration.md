# Side Panel Behavior Options

## Problem Space
The current side panel implementation creates ambiguity between "Transient" and "Pinned". Users feel a lack of control, specifically asking: **"Can I keep it closed even when I select something?"** (Answer currently: No).
The previous "Split Control" attempt (Toolbar + Pin) added complexity without solving this core desire for a "Quiet Mode".

## Analysis: First Principles
We need to decouple **Selection** (Data State) from **Visibility** (Layout State).
- **Selection**: "I am focusing on this item (for operations, highlighting, or details)."
- **Visibility**: "I want to see the Detailed View right now."

## The "Preview Pane" Paradigm (Finder / Explorer Style)
**Concept**: Treat the Side Panel like the "Preview Pane" in Mac Finder or Windows Explorer. It is a **Layout Preference**, not a reaction to clicking.

### Core Rules
1.  **Strict Mode Control**: The user explicitly toggles the Panel ON or OFF via the Toolbar.
2.  **Decoupled Selection**:
    - **If Panel is OFF**: Selecting rows **does nothing** to the layout. The panel stays closed. (Solves the "Quiet Mode" request).
    - **If Panel is ON**: Selecting rows **updates** the panel content immediately.
3.  **Explicit Intent (The "Open" Action)**:
    - If the Panel is OFF, and the user Double-Clicks a row (or hits "Space"), the Panel turns **ON**.

### Interaction Matrix

| Panel State | User Action | Result | Why? |
| :--- | :--- | :--- | :--- |
| **OFF** | Select Row | **Row Highlighted. Panel stays OFF.** | User is in "Scan/Manage" mode. No distractions. |
| **OFF** | Click Toolbar Toggle | **Panel turns ON.** (Show Empty or Selection) | User switches to "Review" mode. |
| **OFF** | Double-Click Row | **Panel turns ON.** | Explicit intent to see details. |
| **ON** | Select Row | **Panel Updates** to show record. | Standard functionality. |
| **ON** | Deselect Row | **Panel clears** (Empty State). Stays ON. | View preference remains "I want to see details". |
| **ON** | Click Toolbar Toggle | **Panel turns OFF.** | User switches back to "Scan/Manage" mode. |
| **ON** | Click "X" in Panel | **Panel turns OFF.** | Equivalent to untoggling. |

### Pros
- **Solves the Core Complaint**: "Can I keep it closed?" **YES.** Just turn it off.
- **Simplicity**: ONE button. ONE concept (On/Off).
- **Predictability**: The panel never "pops up" unless you asked for it (by being in "ON" mode or double-clicking).
- **Familiarity**: Matches OS file explorers.

### Cons
- **Discovery**: Users used to "Click to open" might wonder why nothing happens initially (if default is OFF).
    - *Mitigation*: Default to ON for new users? Or use an "Empty State" hint?

## Recommendation: Adopt "Preview Pane" Model
This removes the "Pin" concept entirely. The panel doesn't need to be "Pinned" because "Open" *is* "Pinned". It stays open until you close it. Selection just feeds it.
