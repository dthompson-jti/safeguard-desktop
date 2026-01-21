# PRD: Side Panel Behavior Refinement

## 1. Problem Statement
The current side panel implementation conflates "Transient" (auto-open on selection) and "Pinned" (manually open) states. This leads to user confusion, specifically:
- Clicking "Close" on a transiently open panel paradoxically "Pins" it open because the toggle logic manages a boolean `isPanelOpen` state separate from the selection-driven visibility.
- Users cannot easily "Close" the panel without also clearing their selection, or understanding if they are clearing selection.

## 2. Goals
- **Eliminate Ambiguity**: Establish clear, distinct states for the side panel (Transient vs. Pinned).
- **Predictable Control**: Ensure the "Close" button always hides the panel.
- **Persistent Context**: Allow users to "Pin" the panel to keep it open while changing selections or navigating.

## 3. Proposed Solution: The "Pin" Interaction Model
We will adopt a "Transient by Default, Pin to Persist" model, similar to patterns found in Slack threads or VS Code sidebars.

### 3.1 Core States

| State | Visibility | Trigger | Description |
| :--- | :--- | :--- | :--- |
| **Closed** | Hidden | Default on load / Explicit Close | Panel is hidden. Logic: `!selected` AND `!pinned`. |
| **Transient** | Visible | Single Row Selection | Panel opens automatically. Logic: `selected` AND `!pinned`. Header shows "Pin" icon. |
| **Pinned** | Visible | User clicks "Pin" / Toggle Button | Panel stays open regardless of selection. Logic: `pinned = true`. Header shows "Unpin" icon. |

### 3.2 Interaction Matrix

| Current State | User Action | Resulting State | Effect on Selection |
| :--- | :--- | :--- | :--- |
| **Closed** | Select Row | **Transient** | Selection updates. Panel opens. |
| **Closed** | Click Toggle | **Pinned** | Panel opens (empty state or last selection). |
| **Transient** | Select Another Row | **Transient** | Selection updates. Panel content updates. |
| **Transient** | Deselect / Click Other | **Closed** | Selection clears. Panel closes. |
| **Transient** | Click "Pin" Icon | **Pinned** | Panel stays open. UI changes to "Unpin". |
| **Transient** | Click "Close" (X) | **Closed** | **Selection Clears.** (Primary Action) |
| **Pinned** | Select Row | **Pinned** | Selection updates. Panel updates. |
| **Pinned** | Deselect | **Pinned** | Selection clears. Panel shows "Empty" state. |
| **Pinned** | Click "Unpin" | **Transient** | If selected: becomes Transient. If not selected: Closes. |
| **Pinned** | Click "Close" (X) | **Closed** | **Pin State set to False.** Selection Clears. |

### 3.3 UI Changes

#### Toolbar / Header
- **Toggle Button**:
    - If Closed: Icon `right_panel_open` (Action: Open & Pin).
    - If Transient: Icon `keep` (Pin) or `right_panel_open` (Pin).
    - If Pinned: Icon `right_panel_close` (Action: Unpin & Close).

#### Panel Header
- **Pin Action**: Explicit "Pin" icon button in the panel header (top right).
- **Close Action**: Explicit "X" icon button.

## 4. Technical Requirements
- **State Migration**: Refactor `isPanelOpen` to `isPanelPinned`.
- **Visibility Logic**:
    ```typescript
    const showPanel = isPanelPinned || (selectedCount === 1);
    ```
- **"Close" Logic**:
    ```typescript
    const handleClose = () => {
        if (isPanelPinned) setIsPanelPinned(false);
        if (selection) clearSelection();
    }
    ```

## 5. Accessibility
- **Focus Management**:
    - Opening panel (Transient) should NOT steal focus (keep it on grid).
    - Opening panel (Manual) should move focus to first interactive element in panel.
- **Announcements**: Screen readers should announce "Detail panel opened" or "pinned".

## 6. Validation Risks
- **Risk**: Users expecting "Close" to just hide the panel (keep selection) might be annoyed if it clears selection.
- **Mitigation**: Ensure row selection is clearly linked to panel presence. (Closing panel = "I am done with this item").

