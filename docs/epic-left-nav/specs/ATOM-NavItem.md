# Component Spec: NavItem

## 1. Geometry & Dimensions
*   **Height**: 32px
*   **Padding Horizontal**: 16px
*   **Indentation L1**: 24px
*   **Indentation L2**: 32px
*   **Icon Size**: 20px (Material Symbols)

## 2. Visual Tokens
| State | Background | Foreground | Action Menu |
| :--- | :--- | :--- | :--- |
| **Default** | `transparent` | `#223A58` | Hidden |
| **Hover** | `--surface-bg-hover` | `#223A58` | Visible (30% Opacity) |
| **Active-Inverted**| `#223A58` (Brand) | `#FFFFFF` | Visible (100% Opacity) |

## 3. Typography
*   **Family**: Inter
*   **Weight**: Semibold (600)
*   **Size**: 14px
*   **Line-Height**: 16px

## 4. Interactive Properties
*   **Selection**: Triggers `NavLink` route change.
*   **Action Icon**: `more_horiz` (20px). Opens `ContextMenu` on click.
*   **Aria**: `role="menuitem"`, `aria-current="page"` when active.
