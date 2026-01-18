## Executive Summary
This epic outlines the methodical implementation of the new Left Navigation sidebar (`SideBar`) for Safeguard Desktop. This is not just a visual implementation but a fundamental design system migration, moving from legacy Figma tokens (e.g., `surface/bg-base`) to our modern Semantic Token System (`semantics.css`).

**Primary Phases:**
1.  **Phase 1: Planning & Strategy (Current)** - Defining the rigorous protocols for extraction and mapping.
2.  **Phase 2: Deep Spec Extraction** - Systematically auditing 100% of Figma properties, states, and interactions. We generate `04-DATA-figma-audit.md`.
3.  **Phase 3: Token Remapping (The Rosetta Stone)** - Creating a verified translation layer. We generate `05-DATA-token-map.md`.
4.  **Phase 4: Component Architecture** - Defing the React component hierarchy (`SideBar`, `NavGroup`, `NavItem`), Atom-based state management (`sidebarExpandedAtom`), and A11y roles.
5.  **Phase 5: Implementation (The Build)** - Coding the components using the verified specs.
6.  **Phase 6: Verification (The Audit)** - Visual Regression Testing, Accessibility Audit (Keyboard/Screen Reader), and Dark Mode Verification.

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
