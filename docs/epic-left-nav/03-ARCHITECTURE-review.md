# Architecture Review: Left Navigation Options Analysis
**Status**: DRAFT Evaluation
**Date**: 2026-01-17

## 1. Macro Architecture: Component Composition
How do we structure the Sidebar content?

### Option A: Component Composition (Recursive/Explicit)
*   **Concept**: Building the menu using explicit JSX components.
    ```tsx
    <NavGroup title="Main">
        <NavItem label="Dashboard" />
        <NavGroup title="Nested">...</NavGroup>
    </NavGroup>
    ```
*   **Pros**:
    *   Extremely flexible. Easy to inject custom components (e.g., a "New Project" button inside a list).
    *   readable for Junior Devs (WYSIWYG structure).
*   **Cons**:
    *   Boilerplate relative to a config array.
    *   Harder to "serialize" if we ever wanted a backend-driven menu (not currently required).
*   **Verdict**: **PREFERRED**. Matches the bespoke nature of the design (different icons, specific grouping logic).

### Option B: Data-Driven (Config Object)
*   **Concept**: A JSON array defines the tree.
    ```tsx
    const config = [{ label: 'Dashboard', children: [...] }];
    return <SideBarRenderer config={config} />;
    ```
*   **Pros**:
    *   Clean separation of data and view.
    *   Type-safe configuration.
*   **Cons**:
    *   "Prop Hell" when special cases arise (e.g., "This specific item needs a red badge").
    *   Debugging layouts requires traversing the renderer logic.
*   **Verdict**: Rejected. Too rigid for a primary navigation application shell that may have specific visual widgets.

## 2. Micro Architecture: State Management (Search & Expansion)
How do we share the "Search Query" and "Expansion State"?

### Option A: Jotai Atoms (Current Plan)
*   **Concept**: Atomic signals (`sidebarSearchQueryAtom`).
*   **Pros**:
    *   Zero prop drilling.
    *   Performance: Typing in Search doesn't re-render the Layout, only the subscribers.
    *   Existing pattern in project (`data/atoms.ts`).
*   **Cons**:
    *   Global namespace pollution if not careful.
*   **Verdict**: **PREFERRED**. Fits existing architecture perfectly.

### Option B: React Context (`SidebarContext`)
*   **Concept**: Wrap Sidebar in a Provider.
*   **Pros**:
    *   Encapsulated to the component tree.
*   **Cons**:
    *   Performance risks: Typing in search usually triggers re-render of the whole context tree unless memoized aggressively.
*   **Verdict**: Rejected. Unnecessary complexity vs Atoms.

## 3. Micro Architecture: CSS Strategy
How do we handle the "Legacy Blue" to "System Grey" migration?

### Option A: Strict Token Mapping (CSS Modules)
*   **Concept**: Use `var(--surface-fg-secondary)` directly in CSS.
*   **Pros**:
    *   Single Source of Truth.
    *   Dark Mode works "for free".
*   **Cons**:
    *   Devs might miss the legacy hex code.
*   **Verdict**: **PREFERRED**. Use comments to reference legacy hex for clarity: `color: var(--surface-fg-secondary); /* Maps #223a58 */`.

### Option B: Utility Classes (Tailwind-like)
*   **Concept**: `className={styles.textGrey700}`.
*   **Pros**: Fast.
*   **Cons**: The project uses CSS Modules. Introducing utility patterns here breaks consistency.
*   **Verdict**: Rejected.

## 4. Risk Analysis (Hostile Review)
**Failure Mode**: *Recursive Imports*?
*   **Check**: Does `NavGroup` import `NavItem` and vice versa?
*   **Mitigation**: `NavGroup` accepts `children` (ReactNode). It does *not* need to know about `NavItem`. Decoupled. **PASS**.

**Failure Mode**: *Layout Shift on Collapse*?
*   **Check**: Does the main content "jump"?
*   **Mitigation**: We are using CSS Grid transition on the container. The main content (column 2) will smoothly resize.
*   **Risk**: High frame cost?
*   **Mitigation**: It's a width transition. Browser optimization is decent, but `will-change: width` might be needed. **NOTE**: Add `will-change` to CSS plan.

**Failure Mode**: *Focus Traps in Search*?
*   **Check**: When filtering, does focus get lost?
*   **Mitigation**: Search input remains mounted. The *list* filters. Focus stays in input. **PASS**.

## 5. Final Recommendation
Proceed with **Option A (Component Composition)** + **Jotai Atoms**.
Add **`will-change`** optimization to CSS.
Explicitly define **aria-labels** for the recursive groups.
