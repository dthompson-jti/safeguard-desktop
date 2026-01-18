# Implementation Phase 02: Core Navigation Atoms

## 1. Goal
Build the individual components defined in the `Journal Design System` with pixel-perfect tokens and keyboard accessibility.

## 2. Components to Build
Separated into discrete files for testing stability.

### A. [NEW] `LeftNavSection`
*   **File**: `src/desktop/components/SideBar/LeftNavSection.tsx`
*   **Spec**: [ATOM-NavSection.md](../specs/ATOM-NavSection.md)
*   **Key Feature**: Framer Motion height transition for open/close states.

### B. [NEW] `LeftNavLinkItem`
*   **File**: `src/desktop/components/SideBar/LeftNavLinkItem.tsx`
*   **Spec**: [ATOM-NavLinkItem.md](../specs/ATOM-NavLinkItem.md)
*   **Key Feature**: Dark-inverted "Selected" state with Action Menu.

### C. [NEW] `LeftNavSubTitle`
*   **File**: `src/desktop/components/SideBar/LeftNavSubTitle.tsx`
*   **Spec**: [ATOM-NavSubTitle.md](../specs/ATOM-NavSubTitle.md)

### D. [NEW] `LeftNavSubSection`
*   **File**: `src/desktop/components/SideBar/LeftNavSubSection.tsx`
*   **Spec**: [ATOM-NavSubSection.md](../specs/ATOM-NavSubSection.md)

## 3. Integration Strategy
1.  **Atomic Verification**: Verify each component in isolation using a local story or debug view.
2.  **Terminology Alignment**: All props must match Figma variable names (e.g., `selected`, `state`, `type`).
3.  **Recursive Rendering**: The `SideBar` will consume a `NavigationData` object to render the hierarchy.

## 4. Verification
*   **Contrast**: Pass WCAG 4.5:1 on all text.
*   **Focus**: Double-border ring visible on all interactive items via `Tab`.
