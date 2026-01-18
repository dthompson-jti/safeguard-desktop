# Component Spec: NavGroup (Accordion)

## 1. Geometry & Dimensions
*   **Header Height**: 40px
*   **Padding Horizontal**: 12px
*   **Padding Vertical**: 8px (Spacing-M)
*   **Chevron Size**: 16px

## 2. Visual Tokens
| Property | Value | Token Reference |
| :--- | :--- | :--- |
| **Header Background** | `transparent` | N/A |
| **Selected BG** | `#F1F3F5` | `--surface-bg-sunken` |
| **Text Color** | `#436289` | `--control-fg-faint` (Semibold) |
| **Divider (Internal)**| `none` | N/A |

## 3. Hierarchy & Relationships
*   **Parent**: `SideBar` ScrollArea.
*   **Children**: `NavItem[]` or `NavSection[]`.
*   **Indentation**: Children are indented by 12px from the start of the header text.

## 4. State Matrix
| Event | Action | Visual Change |
| :--- | :--- | :--- |
| **Click Header** | Toggle `isExpanded` | Rotate Chevron 90deg, Render/Unmount `children`. |
| **Hover Header** | Show `bg-hover` | `--surface-bg-secondary-hover`. |
| **Collapsed Sidebar**| Hide Text/Chevron | Center Icon (if defined). |
