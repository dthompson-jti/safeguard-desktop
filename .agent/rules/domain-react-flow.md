---
trigger: model_decision
---

# React Flow Domain

Rules for Node-based Diagrams and Visualizations.

## 1. Architecture & Stability
*   **HMR Stability:** Define `nodeTypes` and `edgeTypes` in a separate `ReactFlowStaticRegistry.ts` file.
    *   *Why:* Prevents infinite re-renders and reference equality checks failing in Strict Mode.
*   **Registry:** All custom nodes must be registered.

## 2. Visual Standards
*   **Static Invariant:** Presentation diagrams (Reference docs) must be **Non-Interactive** by default.
    *   **Lockout Mechanism**: Use `pointer-events: none` and `cursor: default` on the pane and nodes to prevent all hover effects, transforms, and interaction.
    *   **Controls**: Do not render `<Controls />`.
    *   **Full-Screen Exception**: Interactivity should only be enabled in dedicated full-screen/modal views.
*   **1px Border:** Every container must have a visible 1px border.
*   **Colors:** NO HEX. Use `var(--diagram-edge-stroke)`.
*   **Agentic Styling:**
    *   Forward Flow: Dashed & Animated.
    *   Feedback Loop: Solid.

## 3. The Scannability Pact (Diagrams)
*   **Headline:** Single, high-level identifier (e.g., `User`).
*   **Subtext:** Concrete action description (e.g., `Provides Goal`).
*   **Jargon:** Strip internal jargon. `Observation` -> `Tool Output`.

## 4. Handle ID Invariant
*   **Truth Table:**
    *   Right: `right-source` -> `right`
    *   Left: `left-source` -> `left`
    *   Top: `top-source` -> `top`
    *   Bottom: `bottom-source` -> `bottom`
*   **Never Guess:** Mismatched IDs cause invisible edges.

## 5. Verification

### Invariants (Automated)
- [ ] **No Hex Colors**: `grep "#[0-9a-fA-F]" src/**/ReactFlow*` (Must use `var(--diagram-*)` tokens).
- [ ] **Static Registry**: `grep "nodeTypes\|edgeTypes" src/` (Should be in `ReactFlowStaticRegistry.ts`).

### Logic (Manual/Reasoning)
- [ ] **HMR Stability**: Are `nodeTypes` and `edgeTypes` defined outside components?
- [ ] **Handle IDs**: Do all edges use correct source/target handle IDs?
- [ ] **Non-Interactive**: Are reference diagrams properly locked (no drag/zoom)?

---

## See Also
- `tech-react.md` — For HMR and registry patterns.
- `foundation-design-system.md` — For diagram border and stroke tokens.
