---
trigger: model_decision
---

# Panel Dimension Standards

Standardized widths and interactive constraints for secondary layout panels (Tree Panel, Detail Panel).

## 1. Dimensional Standards
*   **Default Width:** 320px
*   **Minimum Width:** 260px
*   **Maximum Width:** 450px

## 2. Implementation Invariants
*   **State Management:** Default widths MUST be defined in Jotai atoms (e.g., `panelWidthAtom`).
*   **Interactive Logic:** Constraints (min/max) MUST be enforced in resize handlers (e.g., `Math.max(260, Math.min(450, newWidth))`).
*   **CSS Synchronisation:** Minimum and maximum widths MUST also be mirrored in CSS/Module CSS for `.panel` or wrapper classes to prevent layout flickering during load or CSS-only transitions.
*   **Visual Symmetry:** When both Left (Tree) and Right (Detail) panels are active, they should ideally adhere to identical width configurations to maintain visual balance.
