# Component Spec: Left Navigation Section

## 1. Overview
The top-level navigational container (e.g., "Quick Access", "Workspace"). It handles the primary toggle for its children.

## 2. Terminology & HTML
*   **Figma Name**: `Left Navigation Section`
*   **Suggested Tag**: `<section>` or `<div>` with `role="region"`
*   **ARIA**: `aria-expanded` (on header), `aria-labelledby`.

## 3. Geometry & Dimensions
*   **Header Height**: 32px
*   **Padding**: 
    *   Top: 8px (`var(--spacing-m)`)
    *   Horizontal: 16px (matches Sidebar edges)
*   **Chevron**: 16px (aligned right).

## 4. Visual Tokens (Standard)
| State | Background Token | Foreground Token | Chevron Rotation |
| :--- | :--- | :--- | :--- |
| **Closed** | `var(--surface-bg-base)` | `var(--control-fg-faint)` | 0deg (Right) |
| **Open** | `var(--surface-bg-base)` | `var(--control-fg-faint)` | 90deg (Down) |
| **Hover** | `var(--surface-bg-base-hover)` | `var(--control-fg-faint-hover)` | N/A |

## 5. Keyboard Navigation
*   `Enter` / `Space`: Toggle expansion.
*   `Tab`: Moves focus to next section if closed; enters content if open.
*   `Arrow Keys`: Navigate between items or groups.
