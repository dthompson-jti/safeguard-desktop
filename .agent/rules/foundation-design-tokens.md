---
trigger: glob
globs: "**/*.css"
---

# Design Tokens

The "Physics" (Primitives) and "Intent" (Semantics) of the Design System.

## 1. The Golden Rule: Semantic-First
**Hierarchy of Truth:**
1.  **Intent (Component)**: "I need a card background."
2.  **Semantics (semantics.css)**: "Cards use `--surface-bg-primary`."
3.  **Physics (primitives.css)**: "`--surface-bg-primary` happens to be white."

**Mandate:**
-   You **MUST** use Semantic Tokens (Section 1).
-   You **MUST NOT** use Primitive Tokens (Section 5) directly in components.
-   You **MUST NOT** edit `primitives.css` manually. (See Section 6).

## 1. Semantic Tokens (The Public API)
Refer to `src/styles/semantics.css` for the complete list. Common patterns:

### Surfaces (The Hierarchy)
-   **Frame (`--surface-bg-tertiary`)**: The App Shell, Sidebar, Navigation.
-   **Workspace (`--surface-bg-secondary`)**: The Canvas, Gallery, Infinite Space.
-   **Content (`--surface-bg-primary`)**: The Result, Lab Panel, Inputs.

### Controls
-   **interactive**: `--control-bg-primary` (Rest) -> `--control-bg-secondary` (Hover).
-   **Accent**: `--accent-primary` (Brand) -> `--accent-hover` (Interaction).

### Spacing Tokens
- **`--spacing-0p5`** (2px) — Focus ring safe zone
- **`--spacing-1`** (4px) — Toolbar/menu padding, button gap
- **`--spacing-1p5`** (6px) — Small button padding
- **`--spacing-2`** (8px) — Standard button padding
- **`--spacing-2p5`** (10px) — Optical balance for tight containers
- **`--spacing-3`** (12px) — Component gap, standard padding
- **`--spacing-3p5`** (14px) — Optical balance for medium containers
- **`--spacing-4`** (16px) — Section padding
- **`--spacing-5`** (20px) — Large component gap
- **`--spacing-5p5`** (22px) — Optical balance for large cards
- **`--spacing-6`** (24px) — Outer rhythm

## 2. Radius Tokens (`radius-*`)
- **`--radius-xs`** (4px) — Micro elements, accordion triggers
- **`--radius-sm`** (6px) — Scrollbar thumbs, search inputs, badges
- **`--radius-md`** (8px) — Standard buttons (m/s)
- **`--radius-lg`** (10px) — Icon-only buttons (s), menu items, switch tracks
- **`--radius-xl`** (12px) — Icon-only buttons (m), toolbar/menu containers
- **`--radius-2xl`** (16px) — Larger containers
- **`--radius-full`** (9999px) — Sliders, Avatars, Pills

## 3. Z-Index Tokens (`z-*`)
- **`--z-raised`** (5) — Above sibling content, scroll-fade gradients
- **`--z-sticky`** (10) — Sticky headers, panel headers
- **`--z-floating`** (20) — Floating toolbars, controls pills
- **`--z-elevated`** (100) — Resizable handles, elevated UI
- **`--z-modal-backdrop`** (1000) — Modal/overlay backdrops
- **`--z-modal`** (1001) — Modal content above backdrop
- **`--z-popover`** (1100) — Popovers, dropdowns, menus
- **`--z-toast`** (2000) — Toast notifications (above all)
- **`--z-tooltip`** (2100) — Tooltips (topmost layer)

## 4. Typography Tokens
### Weights
- **`--font-weight-normal`** (400) — Body text, secondary content
- **`--font-weight-medium`** (500) — Subtle emphasis, labels, hotkeys
- **`--font-weight-semibold`** (600) — Buttons, headers, menu items

### Line Heights
- **`--leading-none`** (1) — Icons, badges, single-line headers
- **`--leading-tight`** (1.25) — Large headings, condensed blocks
- **`--leading-normal`** (1.5) — Standard body text, descriptive labels
- **`--leading-relaxed`** (1.75) — Large reading blocks, prompt previews

## 5. Primitives & Generation (The "Closed" API)
**Immutable Mandate:** `primitives.css` is READ-ONLY.

### Adding a New Primitive
If a design requires a new value (e.g. `grey-150`):
1.  Edit `src/scripts/generate-tokens.js`.
2.  Run `node src/scripts/generate-tokens.js`.
3.  Copy output to `src/styles/primitives.css`.

## 6. Color Primitives (Reference Only)
All primitive colors are generated via `src/scripts/generate-tokens.js`.
*   **Base:** Absolute Black/White.
*   **Theme:** Brand Identity (Pink/Red).
*   **Neutral:** Hue 265, Chroma ~0.012 (Cool/ Slate).
*   **Extended:** Purple (Snippets), Amber (Templates), Cyan (Roles), Teal (Layouts).

## 7. Component Type Colors (Icons & Sliders)
The system uses a **Synchronized Coordination** pattern where React configuration dictates CSS variable values via data-attributes.

### The Source of Truth
*   **Definition**: `src/config/type-colors.ts` contains the mapping from `ComponentType` to primitive tokens for `{ light, dark }` modes.
*   **Normalizer**: All icons/sliders **MUST** use the normalized `500` (Light) / `400` (Dark) primitive steps to ensure consistent visual weight.

### The CSS Bridge (`--type-icon-color`)
*   **Binding**: `src/styles/component-colors.css` maps `[data-component-type]` to the local variable `--type-icon-color`.
*   **Inheritance**: Children like `DiscreteSlider` or `Icon` use `var(--type-icon-color)` to automatically inherit the parent's type coloring.

### Architectural Invariants
> [!IMPORTANT]
> - Do **NOT** modify `semantics.css` accent values to change icon colors.
> - Do **NOT** use `[data-accent]` for component-specific icon coloring; use `[data-component-type]`.
> - Changes to the palette **MUST** be made in `type-colors.ts`.

## 8. Motion Tokens (`duration-*`, `ease-*`)
- **`--duration-fast`** (0.15s) — Interaction feedback
- **`--duration-standard`** (0.2s) — Default transitions
- **`--duration-slow`** (0.3s) — Large layout shifts
- **`--ease-smooth`** — `cubic-bezier(0.4, 0, 0.2, 1)` — Standard fades
- **`--ease-spring`** — `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — Buttons
- **`--ease-popover`** — `cubic-bezier(0.16, 1, 0.3, 1)` — Menus

## 8. Breakpoint Tokens (`bp-*`)
- **`--bp-tablet`** (800px) — Landscape Tablet
- **`--bp-desktop`** (1024px) — Laptops
- **`--bp-ultra`** (1440px) — Ultrawide

## 9. Verification

### Invariants (Automated)
- [ ] **Valid Token Syntax**: `grep "var\(--[a-z]+-[a-z0-9-]+\)"` (Ensure no typos in variable names).
- [ ] **No Hardcoded Values**: `grep ": [0-9]+px"` (Should be `var(--spacing-*)` or `var(--radius-*)`).
- [x] **Logo Exception**: Brand logos (e.g., `AnimatedLogo`, `PartnerLogo`) may use hardcoded hex values for brand fidelity or GSAP animation compatibility.

## 10. Workflow: Adding Tokens
Before creating a new token, verify it doesn't exist in the tables above.

#### Step 1: Update Generation Script
Edit `src/scripts/generate-tokens.js` to add the new primitive:

```javascript
// Add to appropriate scale (Neutral, Theme, Extended)
grey: [
  { L: 98, C: 0.012, H: 265 }, // grey-50
  // ... existing values ...
  { L: 15, C: 0.012, H: 265 },  // grey-950
],
```

#### Step 2: Run Generator
```bash
node src/scripts/generate-tokens.js
```

#### Step 3: Update This Document
Add the new token to the relevant table in **Section 5 (Color Primitives)** or the appropriate section above.

