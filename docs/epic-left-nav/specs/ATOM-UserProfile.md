# Component Spec: User Profile (Sidebar Footer)

## 1. Overview
The footer component of the Sidebar, displaying the current user's avatar and name.

## 2. Geometry & Dimensions
*   **Height**: 48px
*   **Padding**: 12px Horizontal
*   **Avatar Size**: 32x32px (Circle)

## 3. Visual Tokens
| Property | Value | Token Reference |
| :--- | :--- | :--- |
| **Name Text** | `#223A58` | `var(--control-fg-secondary)` |
| **Initial Background**| `#D9DFE5` | `var(--surface-border-tertiary)` |
| **Border Top** | `1px solid #D9DFE5` | `var(--surface-border-tertiary)` |

## 4. Sub-Atoms
*   **Avatar**: Initial-based circle.
*   **User Name**: Inter Semibold 14px.

## 5. Interaction
*   **Click**: Opens User Settings or Profile menu.
*   **Hover**: Shows `var(--surface-bg-hover)`.
