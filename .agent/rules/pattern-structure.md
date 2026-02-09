---
trigger: model_decision
---

# Structure Patterns

Rules for layout containers: Panels, Cards, Modals, and Accordions.

## 1. Layout & Panels
*   **Dual-Pane Library:** Full-page views (History, Snippets) MUST use a dual-pane architecture.
    *   Left Panel: Fixed width (e.g., `320px`).
    *   Divider: Continuous vertical line.
*   **Panel Headers:**
    *   **Floating:** Use `position: sticky; top: 0; backdrop-filter: blur(...)`.
    *   **Height:** Fixed at `48px` (`--panel-header-height`).
    *   **Typography:** `text-lg`, `semibold`.
*   **Unified Workspace:** Main content MUST be wrapped in `WorkspaceView` for consistent crossfade and accent propagation.
*   **Code Splitting**: All major features (Image Gen, Deep Research, etc.) MUST be lazy-loaded using `React.lazy` and wrapped in a `Suspense` component with `LoadingScreen` as fallback to minimize initial bundle size.
*   **Edge-Filling Grids**: Multi-column radio/toggle chip groups MUST use `width: 100%` on chips to ensure they fill the available panel width and align with interface edges.
*   **Text Alignment**: Chip labels MUST use `text-align: center` to maintain visual balance when stretched to full width.

## 2. Accordions
*   **Selection:** Clicking an Accordion Header MUST select the component AND toggle expansion.
*   **Content:** Inner wrappers must use `width: 100%`.
*   **Pre-Processing:** Complex Markdown content inside Accordions must use `preprocessMarkdown.ts` to survive collapse states.
*   **Scannability:** In Reference docs, Accordion headers must have `0ms` transition for instant scanning.
*   **Typographic Standard**: Accordion headers containing labels (like CRAFT) MUST use all-caps and correspond to **L2 (`##`)** or **L3 (`###`)** Markdown levels depending on species.

## 3. Cards & Lists
*   **Hover:** Interactive cards/lists (Sidebars) must have **instant (0ms)** hover feedback.
*   **Tooltips:**
    *   Sidebar Items: Wrap the *entire card*.
    *   Canvas Items: Wrap only the *icon*.
*   **Empty States:**
    *   Primary Canvas: Large Icon (48px).
    *   Side Panel: Small Icon (24px).

## 4. Modals
*   **Close Buttons:** Use `Modal.Header` standard button. If manual, use `Button variant="tertiary" size="s" iconOnly`.
*   **Overscroll:** Use `overscroll-behavior: contain` to prevent body scroll chaining.

## 5. Specifications

### Panel Headers
- **Height** — 48px (`--panel-header-height`)
- **Z-Index** — 10 (`--z-sticky`)
- **Blur** — 16px (`--blur-glass`)
- **Border** — Bottom 1px solid secondary

### Accordions
- **Chevron** — `expand_more`, 18px, rotates 180deg
- **Animation** — `grid-template-rows` (0fr -> 1fr) 0.3s ease
- **Radius** — 10px (0 bottom when expanded)

## 6. Adaptive Layouts
*   **Container Queries:** Components **MUST** use `@container` for internal layout switches, never media queries.
    *   *Why:* Panels are resizable; viewport width is irrelevant to the component.
*   **Fluid Sizing:** Use `clamp()` for scalable headers (e.g., `clamp(1.25rem, 1rem + 1.5vw, 2rem)`).
*   **Min-Width:** App shell hard limit: `800px` (Landscape Tablet).

## 7. Safe Area Handling
*   **Viewport Fit**: `index.html` MUST include `viewport-fit=cover` in the viewport meta tag.
*   **Global Variables**: Shell components MUST use `--safe-top` and `--safe-bottom` (defined in `base.css`) to handle notches and home indicators.
    *   `AppHeader`: Add `padding-top: var(--safe-top)`.
    *   `AppFooter`: Add `padding-bottom: var(--safe-bottom)`.

## 8. Surface Clearance (Invariants)
*   **Frame Clearance**: Primary view panels MUST clear the fixed `AppHeader` and `AppFooter` to ensure content legibility.
    *   **Header Buffer**: `padding-top: calc(var(--header-height) + var(--spacing-6))`.
    *   **Footer Buffer**: `padding-bottom: calc(var(--footer-height) + var(--spacing-10))`.
*   **FAB Clearance**: Floating action buttons (FAB) MUST be positioned relative to the footer using `bottom: calc(var(--footer-height, 0px) + var(--spacing-4))` to avoid overlap with navigation buttons.
*   **Internal Padding**: Panels MUST NOT carry redundant internal top padding; clearance is managed at the parent/container level.

## 9. Scrolling & Delegation
*   **Scrolling Parent**: `AppShell` and primary layout wrappers MUST be `overflow: hidden`.
*   **Delegation**: Scrolling MUST be delegated to the innermost scrollable content container (e.g., `.scrollableContent`).
*   **Gesture Integrity**: Delegation prevents vertical scrolling from intercepting horizontal swipe gestures on filmstrip tracks.

## 10. Filmstrip & Horizontal Navigation
*   **Zero-Margin Panels**: Panels within a horizontal filmstrip (e.g., `Prompt`, `Output`) MUST NOT have external margins.
*   **Full Width Persistence**: Standard view panels MUST maintain `width: 100%` and `height: 100%` to ensure seamless full-width transitions.
*   **Optical Centering**: Do not use "card" margins for full-width views; use internal padding for content clearance instead.

## 8. Verification

### Invariants (Automated)
- [ ] **Container Queries**: `grep "@media" src/**/*.module.css` (Should use `@container` for internal layout).
- [ ] **Panel Height**: `grep "panel-header" src/` (Should use `--panel-header-height` token).

### Logic (Manual/Reasoning)
- [ ] **Dual-Pane**: Do full-page library views use dual-pane architecture?
- [ ] **Empty States**: Do lists/grids have appropriate empty state handling?
- [ ] **Modal Overscroll**: Is `overscroll-behavior: contain` set on modals?

---

## See Also
- `foundation-design-tokens.md` — For panel and header tokens.
- `foundation-accessibility.md` — For semantic landmark requirements.
