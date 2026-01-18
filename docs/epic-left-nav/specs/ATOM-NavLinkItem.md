# Component Spec: Left Navigation Link Item

## 1. Overview
The terminal interactive node in the navigation hierarchy.

## 2. Terminology & HTML
*   **Figma Name**: `Left Navigation Link Item`
*   **Suggested Tag**: `<a>` (with `href`) or `<button>`
*   **ARIA**: `role="menuitem"`.

## 3. Geometry & Dimensions
*   **Height**: 24px (Note: More compact than headers).
*   **Padding**: 
    *   Left: 164px (X-coord in Figma meta? No, context shows deep indentation).
    *   Verification: Matches `Nav Items` instance at `1243:51334`.

## 4. Visual Tokens
| State | Background Token | Foreground Token | Font Weight |
| :--- | :--- | :--- | :--- |
| **Unselected** | `var(--surface-bg-elevated)` | `var(--control-fg-faint)` | Regular |
| **Selected** | `var(--surface-bg-sunken)` | `var(--control-fg-secondary)`| Semibold |
| **Hover** | `var(--surface-bg-hover)` | `var(--control-fg-faint-hover)` | N/A |

## 5. Interaction Note
*   The "Selected" state (Sunken) is used for the currently active view content.
*   APCA Conformance: LC 80-84 (Verified).
