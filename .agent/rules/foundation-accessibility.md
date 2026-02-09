---
trigger: glob
globs: "**/*.tsx"
---

# Accessibility (A11y) Foundations

Global standards for inclusive design.

## 1. Semantic Structure
*   **Landmarks:** Use `<aside>` for Sidebars, `<main>` for Workspace, `<nav>` for Navigation.
*   **Lists:** `<ul>` and `<ol>` must ONLY contain `<li>` children.
*   **Headings:** Strict hierarchy. `SectionHeader` (H2) -> `FieldLabel` (H3). Do not use manual `<h4>` tags.
*   **Decorative Icons:**
    *   MUST use `aria-hidden="true"`.
    *   If using semantic tags (like `span` or `i`), add `role="presentation"` to prevent role mismatch warnings.

## 2. Interactive Controls
*   **Review Roles:** Use `aria-checked` for radios, `aria-pressed` for toggle buttons.
*   **Hidden Labels:** Use `FieldLabel` with `hideLabel` prop (sr-only) for icon-only inputs.
*   **Focus Rings:** ALWAYS use `--control-focus-ring-standard` (Grey-300). Never generic blue.
*   **Neutral Visuals:** Foundational controls (Checkboxes) must use high-contrast monochromatic themes.

## 3. Mobile Accessibility
*   **Touch Targets**: All primary interactive elements (buttons, inputs, triggers) MUST have a minimum height/width of **44px**. 
*   **Hit Area Expansion**: For small icons, use pseudo-elements (e.g., `::after`) to expand the hit area to 44px without increasing visual size.
*   **iOS Auto-Zoom**: Input font-size MUST be a minimum of **16px** to prevent browsers (e.g., iOS Safari) from automatically zooming in on focus.

## 4. Motion & Hydration
*   **Reduced Motion:** Respect `prefers-reduced-motion`. Use `useReducedMotion()` hook to strict duration to 0.
*   **Hydration:** Guard client-side state with `hasHydrated` checks to prevent layout shifts.
*   **Skip Links:** Implement "Skip to main content" at the top of the App. Target `#main-content`.

## 5. Composition & Primitives
*   **Ref Forwarding:** All interactive utility components (like `Tooltip`) MUST use `forwardRef`. This allows parent composition libraries (like Radix `Popover`) to inject correct ARIA attributes (e.g., `aria-haspopup`) onto the trigger.
*   **Prop Spreading:** Always spread `...props` to the underlying interactive element to ensure event handlers and ARIA attributes are preserved.

## 5. Implementation Details
*   **App Structure:**
    ```tsx
    <div className="appContainer">
      <Sidebar /> {/* <aside> */}
      <main id="main-content">...</main>
    </div>
    ```
*   **List Validity:** `<ul>` must ONLY contain `<li>`. Wrapper `divs` around items are forbidden. Move logic outside the list.

## 6. Verification

### Invariants (Automated)
- [ ] **Icon Buttons**: `grep "<button.*>.*<svg"` (Must have `aria-label` or `sr-only` text).
- [ ] **List Structure**: `grep "<ul.*>.*<div"` (Lists must only contain `li`).
- [ ] **Focus Rings**: `grep "outline-"` (Ensure custom focus rings differ from browser default if standard is overridden).

### Logic (Manual/Reasoning)
- [ ] **Landmarks**: Are you using `<main>`, `<nav>`, `<aside>` correctly?
- [ ] **Keyboard Nav**: Can you tab through the new feature? Is the focus order logical?
- [ ] **Reduced Motion**: If an element moves, does it check `prefers-reduced-motion`?

---

## See Also
- `foundation-design-system.md` — For Focus Ring tokens and motion physics.
- `domain-content.md` — For inclusive copy and label standards.
