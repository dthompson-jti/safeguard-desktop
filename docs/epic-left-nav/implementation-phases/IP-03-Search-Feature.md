# Implementation Plan 03: Search Logic & Filtering

## 1. Goal
Implement the fuzzy search logic that filters the `Left Navigation` tree based on the user's query in the `SearchController`.

## 2. Technical Strategy
1.  **Search Input**: Listen to `sidebarSearchQueryAtom`.
2.  **Tree Filtering**: Apply a fuzzy search (e.g., using `match-sorter`) against the `NavigationData` tree.
3.  **Expansion Logic**: Automatically expand all `Left Navigation Sections` and `Sub-sections` that contain matching `Link Items`.
4.  **No Results**: Display a "No matches found" state within the scroll area.

## 3. UI Components
### `SearchController.tsx`
*   Spec: [ATOM-SearchController.md](../specs/ATOM-SearchController.md)
*   Contains the input and the collapse toggle.

## 4. Search Behavior
*   **Expansion**: If a user types "Safeguard", the "Workspace" section must expand automatically.
*   **Highlighting**: (Optional Phase 4) Highlight the matching text within labels.
