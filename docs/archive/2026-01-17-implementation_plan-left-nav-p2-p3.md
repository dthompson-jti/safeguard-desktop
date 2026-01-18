# Implementation Plan: Left Navigation Phase 3 (Search & Assembly)

## Goal
Implement the specialized Search Input and assemble the full SideBar.

## Proposed Changes

### Desktop Component Layer
#### [NEW] [SidebarSearch.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SideBar/SidebarSearch.tsx)
- Implements the search input with `jotai` state (`sidebarSearchQueryAtom`).
- Uses `SidebarSearch.module.css` for strict token adherence (focus rings).

#### [NEW] [icons.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SideBar/icons.tsx)
- Exports SVG components for:Search />` at the top of the container.
- Ensure correct layout (search fixed at top, content scrolls).

## Verification Plan
### Manual Verification
- **Visual**: Focus ring (Blue-500) and placeholders.
- **Interaction**: Typing updates the atom (check via console or temporary display).
