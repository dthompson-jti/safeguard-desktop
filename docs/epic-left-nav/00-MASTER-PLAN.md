## Executive Summary
This epic outlines the methodical implementation of the new Left Navigation sidebar (`SideBar`) for Safeguard Desktop. This is not just a visual implementation but a fundamental design system migration, moving from legacy Figma tokens (e.g., `surface/bg-base`) to our modern Semantic Token System (`semantics.css`).

**Primary Phases:**
- [x] **Phase 1: Foundation & Layout** (Done)
  - [x] Atoms & State (`sidebarExpandedAtom`)
  - [x] Base Component (`SideBar.tsx`)
  - [x] Grid Integration (Enhanced View)
- [ ] **Phase 2: Core Components** (Next)

## Documentation Deliverables
The following planning documents will be created to govern this epic:

*   **`01-STRATEGY-spec-extraction.md`**: Protocol for using Figma Dev Mode tools to extract precise values (box model, typography, transitions) without guessing.
*   **`02-STRATEGY-token-mapping.md`**: The algorithm for translating legacy hex/names to our `semantics.css` tokens. Includes a "Rosetta Stone" table.
*   **`03-ARCHITECTURE-components.md`**: The technical detailed design, including Atom definitions, component composition, and accessibility logic.
*   **`04-DATA-figma-audit.md`** (Living): The raw data extracted from Phase 2.
*   **`05-DATA-token-map.md`** (Living): The finalized token translation table.

## Principals of Execution & Rigor
1.  **No Magic Numbers**: Every pixel value must be traced to a Figma node or a Design System Variable.
2.  **Semantic First**: We never hardcode hex values. We find the matching Semantic Token.
3.  **State Completeness**: Every component must document: `Default`, `Hover`, `Active` (Pressed), `Selected`, `Focus`, and `Disabled` states.
4.  **Accessibility First**: Keyboard navigation (Arrow keys, Enter/Space) and ARIA roles are defined *before* code is written.
5.  **Dark Mode First**: All mapping decisions *must* account for `dark-a`, `dark-b`, and `dark-c` themes.

## Risk Assessment & Mitigation
*   **Risk**: Figma uses "local" or ad-hoc colors not in `semantics.css`.
    *   *Mitigation*: Phase 3 includes a specific "Gap Analysis" step to propose new tokens if needed, rather than hardcoding.
*   **Risk**: Navigation hierarchy depth is deeper than current component supports.
    *   *Mitigation*: Phase 4 (Architecture) will stress-test the recursive `NavGroup` design.
*   **Risk**: Transitions cause layout thrashing.
    *   *Mitigation*: Use `framer-motion` `layout` prop carefully and perform perf audits in Phase 6.

## Next Steps
1.  Review and Approve `01-STRATEGY-spec-extraction.md`.
2.  Review and Approve `02-STRATEGY-token-mapping.md`.
3.  Execute Phase 2 (Extraction) to populate `04-DATA-figma-audit.md`.
