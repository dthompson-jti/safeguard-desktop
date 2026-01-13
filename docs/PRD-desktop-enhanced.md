# PRD: Desktop Experience Enhanced (V2)

## 1. Overview
This feature introduces a "Desktop Enhanced" experience accessible via `/desktop-enhanced`. It represents a fundamental layout shift from a tab-based navigation to a hierarchical, tree-view driven navigation system, tailored for high-density facility data monitoring.

**Key Goals:**
- **Hierarchical Navigation**: Navigate by Facility Group -> Unit -> Room.
- **Unified status visibility**: See roll-up status counts (Missed/Due) at every level of the hierarchy.
- **Contextual Views**: Toggle seamlessly between "Live Loop" and "Historical Review" modes, preserving the selected context.

## 2. User Flow & Layout

### 2.1 URL Structure
- **Route**: `scheme://host/desktop-enhanced`
- **Redirects**: None. It is a standalone sibling to the current desktop `App.tsx`.

### 2.2 Layout & Wireframes

The layout consists of **a full-width Top Navigation** sitting above **three vertical columns**:

1.  **Top Navigation**: Full-width header (Medium Blue).
2.  **Body Container** (Flex Row):
    *   **Extreme Left Nav**: A narrow placeholder strip (Dark Blue).
    *   **Left Panel**: Resizable panel containing the Tree View and Mode Toggle (Medium Blue).
    *   **Main Content**: The primary workspace containing data views.

#### ASCII Wireframe
```text
+------------------------------------------------------------------------------+
| [ TOP NAVIGATION BAR (Spans Full Width)                                    ] |
+---+-----------------------+--------------------------------------------------+
|   | [HEADER: Safeguard]   |  [ Breadcrumbs: Facility > Unit A             ]  |
| E | [ ... Menu ]          |                                                  |
| X |                       |  [ Main Content Area (White)                   ] |
| T | [ MODE TOGGLE       ] |                                                  |
| R | ( Live | Historic )   |  Row 1: Resident Name | Status | Time ...        |
| E |                       |  Row 2: Resident Name | Status | Time ...        |
| M |-----------------------|  Row 3: Resident Name | Status | Time ...        |
| E | v Group A           6 |                                                  |
|   |   > Unit 1      2     |                                                  |
| L |   > Unit 2            |                                                  |
| E |                       |                                                  |
| F | v Group B           1 |                                                  |
| T |   > Unit 3            |                                                  |
+---+-----------------------+--------------------------------------------------+
```

#### Mermaid Diagram
```mermaid
graph TD
    subgraph "Browser Window"
        TopNav[Top Navigation Bar (Full Width)]
        subgraph "Body (Flex Row)"
            subgraph "Extreme Left Nav"
                ELN[Placeholder]
            end
            subgraph "Left Panel"
                LP_Head[Header: 'Safeguard Checks']
                LP_Toggle[Mode Toggle]
                LP_Tree[TreeView]
            end
            subgraph "Main Content"
                Breadcrumbs
                Content[Table View]
            end
        end
    end
    TopNav ~~~ ELN
    ELN ~~~ LP_Toggle
    LP_Tree --> Content
```

### 2.3 Visual Zones
| Zone | Component | Width | Token / Style Ref | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Top Nav** | `TopNavBar` | 100% Width | `surface-brand-light` | Spans entire top. Contains global widgets. |
| **Extreme Left** | `SideNavPlaceholder` | Fixed ~64px | `surface-brand-darkest` | Visual anchor below Top Nav. |
| **Left Panel** | `NavigationPanel` | Resizable | `surface-brand-dark` | Contains Tree View. |
| **Content** | `MainContent` | Flex Grow | `surface-base` | Renders Data Table. |

---

## 3. Detailed Features

### 3.1 Extreme Left Nav (Placeholder)
- **Role**: Visual anchor for future global navigation.
- **Content**: Empty or simple logo/icon placeholder for now.
- **Style**: Darkest blue to optically recede.

### 3.2 Left Navigation Panel (Tree Panel)
**Structure:**
1.  **Header**:
    - Title: "Safeguard Checks"
    - Action: `...` Menu (Context specific actions).
2.  **View Toggle**:
    - **Live View**: Focus on real-time task completion ("Next 30 mins").
    - **Historical View**: Focus on compliance and review ("Past 24 hours").
    - *Behavior*: Switching toggles updates the **Tree View Badges** AND the **Main Table Content**.
3.  **Tree View**:
    - **Hierarchy**: `Group` (Alpha) -> `Unit` (Unit 1) -> `Room` (Optional/Future, currently filtering by Unit is primary).
    - **Interaction**:
        - Single select.
        - Default selection: First "Group" or "All" equivalent.
        - Selection filters the Main Table to that specific node's scope.

### 3.3 Aggregation & Status Badges (Roll-ups)
The Tree View must display status counts "rolled up" from children to parents.

**A. Live View Mode**
- **Data Source**: `mockLiveData.ts`
- **Counters**:
    1.  **Missed** (Red): Count of `status === 'missed'`.
    2.  **Due** (Amber): Count of `status === 'due'`.
- **Logic**: Sum of all children items.

**B. Historical View Mode**
- **Data Source**: `mockHistoricalData.ts`
- **Counters**:
    1.  **Unreviewed Missed** (Red/Gray?): Single count.
- **Logic**: Count of checks where `(status === 'missed' OR status === 'late') AND (supervisorNote IS EMPTY)`.

### 3.4 Main Content Area
- **Wrapper**: New container with specific padding/margins.
- **Top Bar**:
    - **Breadcrumbs**: "Whole facility > West Wing > Unit A" (Matches tree selection).
    - **Widgets**: Placeholder for "System Status" or "Timer".
- **Table View**:
    - Reuses `LiveMonitorView` and `HistoricalReviewView`.
    - **Important**: The *Tab Header* inside these views (Live/Historical tabs) should be **Hidden** or **Removed** when in this mode, as the Left Panel Toggle now controls the view.

---

## 4. Technical Requirements

### 4.1 State Management (Jotai)
- `desktopV2ViewAtom`: 'live' | 'historical'
- `desktopV2SelectionAtom`: `{ type: 'group' | 'unit' | 'root', id: string }`
- `desktopV2ExpandedNodesAtom`: `Set<string>`

### 4.2 Component Architecture
- **New Components**:
    - `DesktopEnhanced/Layout.tsx` (Flex row container)
    - `DesktopEnhanced/SideNavPlaceholder.tsx` (The "Left Nav")
    - `DesktopEnhanced/NavigationPanel.tsx` (The "Left Panel")
    - `DesktopEnhanced/Tree/TreeView.tsx`
    - `DesktopEnhanced/TopBar.tsx`

---

## 5. Open Questions & Exploration
1.  **Mobile Support**: Is this strictly desktop? *Assumption: Yes, strict desktop logic.*
2.  **Table Headers**: The existing `DesktopHeader` contains tabs. We need a prop to hide them or a clean way to mount the table without the header.
3.  **Colors**: Exact hex values for the blue zones. Will need to define `surface-brand-darkest`, `surface-brand-dark`, `surface-brand-light`.
