# Component Spec: Left Navigation Sub-section

## 1. Overview
A nested group within a Section. It provides an additional layer of hierarchy (e.g., Folder structures).

## 2. Terminology & HTML
*   **Figma Name**: `Left Navigation Sub-section`
*   **Suggested Tag**: `<div>` or `details` (for native toggle) or `button` + `ul`.
*   **ARIA**: `aria-expanded`.

## 3. Geometry & Dimensions
*   **Header Height**: 24px (Matches Link Item height).
*   **Padding**: 
    *   Left: Indented from Section Header text.
*   **Chevron**: Small 12-14px chevron (aligned left of text).

## 4. Visual Tokens
| State | Background Token | Foreground Token |
| :--- | :--- | :--- |
| **Closed** | `surface/bg-base` | `control/faint-text` |
| **Open** | `surface/bg-base` | `control/faint-text` |
| **Hover** | `surface/bg-base-hover` | `control/faint-text-hover` |

## 5. Keyboard Navigation
*   `Enter` / `Space`: Toggle expansion.
*   `Arrow Keys`: Navigate within the expanded sub-section.
