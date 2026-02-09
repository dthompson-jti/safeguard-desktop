---
trigger: glob
globs: "**/*.css"
---

# System Foundations

Core physics and non-negotiables of the Design System.

## Token Categories
- **Colors**: `var(--color-*)` — never use hex/rgb directly
- **Spacing**: `var(--spacing-*)` — never use px values directly
- **Typography**: `var(--font-size-*)`, `var(--font-weight-*)`
- **Borders**: `var(--border-radius-*)`, `var(--border-width-*)`

## Violations
If you cannot map a value to an existing token:
1. Flag it as a potential "Hallucination"
2. Ask if a new token should be created
3. Never proceed with a hardcoded value

## 1. Zero Hex Tolerance (CRITICAL)
*   **Rule:** Modern UI styling **MUST** use existing tokens from `SPEC-CSS.md`.
*   **Constraint:** Hardcoded hex codes (e.g. `#fff`) are a **CRITICAL** failure.
*   **Action:** If a theme variable is missing, fix the theme, do not fallback to hex.

## 2. File & Directory Casing
*   **Strict Kebab-Case Mandate:** All files and directories within `src/` MUST follow **strictly kebab-case** (e.g., `user-profile.tsx`, `prompt-input-field.module.css`).
*   **Hooks Exception:** React hooks MUST use `camelCase` (e.g., `use-is-mac.ts` is forbidden; use `useIsMac.ts`).
*   **Why:** Prevents "Failed to fetch dynamically imported module" errors on case-insensitive file systems (Windows/macOS) and ensures consistency across environments.
*   **Enforcement:** Managed by `eslint-plugin-check-file` and verified via `npm run lint`.

## 3. CSS Modules & Styling
*   **Selectors Match DOM:** When refactoring JSX, update the corresponding CSS Module.
*   **Child Targeting:** Solve nested hovers with child targeting (`.wrapper:hover > .child`).
*   **No Inline Styles:** Component styles must be in CSS Module files.
*   **Composes:** Extract shared styles to a base module and use `composes`.
*   **Gaps:** Use `gap` for spacing in flex/grid containers, avoid extensive margin hacks.

## 4. Layout & Spacing
*   **Gap-First Layouts:** For primary containers, use `display: flex; flex-direction: column; gap: var(--spacing-*)`.
    *   Outer Rhythm: `var(--spacing-6)` (24px).
    *   Inner Rhythm: `var(--spacing-3)` (12px).
    *   Atomic Rhythm: `var(--spacing-1)` (4px).
*   **Panel Header Height:** Lab and Output panels MUST use **40px** (`--panel-header-height`) for the header height to maintain consistency across features.

### Background Hierarchy (The Unwrapped Strategy)
1.  **App Wrapper:** `--surface-bg-tertiary` (Dark frame).
2.  **Workspace/Canvas:** `--surface-bg-secondary` (Flat).
3.  **Content/Output:** `--surface-bg-primary` (High contrast, "Raised").
    *   *Goal:* Visual progression from Frame -> Workspace -> Result.

*   **Concentric Radii**: `outer_radius = inner_radius + padding`.
    *   *Standard Pill:* Container (`radius-xl` / 12px) = Inner Element (`radius-lg - 2px` / 8px) + Padding (4px).
    *   *Strict Invariant:* This formula ensures visual concentricity in segmented controls and toggles.

## 5. Motion Physics
*   **Goal:** "Snappy but Fluid."
*   **Reduced Motion:** Always respect `prefers-reduced-motion`. Set durations to `0s`.
*   **No Drift:** Animations must start/end on pixel-perfect grid lines.
*   **Scannability:** Never animate hover states on "Scanning Surfaces" (Sidebar items, Menus).

## 6. Spacing Invariants
*   **Zero-Margin:** All components **MUST** have 0px external margins. Spacing is managed by parent `gap` or `padding`.
*   **No Magic Numbers:** Hardcoded pixel values (e.g., `margin-top: 15px`) are forbidden. Use tokens.

## 7. Icons & Typography
*   **Explicit Icon Architecture:** `font-variation-settings` is atomic. Use `data-fill="true"` for state changes.
*   **Optical Sizing:** Small icons (<20px) MUST use a font range starting at 15px (not 20px).
*   **Button Icons:** Explicitly set to **20px** by default.
*   **Typography:**
    *   Labels: `text-xs`, `font-weight-semibold`.
    *   Content: `text-sm`, `font-weight-normal`.

## 8. Theming & SVG
*   **SVG Colors:** Must be CSS-Driven via `fill: var(...)`. No inline fills.
*   **GSAP Override:** If animating SVG, cleanup inline styles in `onComplete`.
*   **MutationObserver:** Components caching colors must watch `data-theme` changes on `<html>`.
*   **Brand Identity:** Brand colors must be defined in localized CSS modules.

## 9. Miscellaneous System Invariants
*   **Vertical Stretch:** `position: fixed` needs `bottom: auto` if height stretches unexpectedly.
*   **Z-Index:** Stack floating panels with `z-index: 10` + `position: sticky`.
*   **Selection Toolbar:** Must be the **LAST** child in JSX to ensure z-index visibility.

## 10. Translucent Header Architecture (SPEC-TRANSLUCENT)
*   **Visual Height:** The header core content (Avatar, Switcher, Menu) MUST be contained within a **64px** height block.
*   **Gradient Composition (3-Tier):**
    1.  **Status Bar / Safe Area:** Flat block with **90% opacity** (`0` to `var(--safe-top)`).
    2.  **Transition Alpha A (Top):** 32px height, linear ramp from **90% to 80% opacity**.
    3.  **Transition Alpha B (Bottom):** 32px height, linear ramp from **80% to 0% opacity**.
*   **Total Backdrop Height:** `calc(var(--safe-top) + 64px)`.
*   **Implementation:** Use `color-mix(in srgb, var(--surface-bg-secondary), transparent X%)` for consistent color blending.

## 11. Verification

### Invariants (Automated)
- [ ] **No Hex Codes**: `grep "#[0-9a-fA-F]{3,6}"` (Critical. Use tokens.)
- [ ] **No Direct Margins**: `grep "margin:"` (Use `gap` in parent or `padding` in child.)
- [ ] **No Direct Z-Index**: `grep "z-index: [0-9]"` (Use `var(--z-*)` tokens.)
- [ ] **Lowercase Features**: All `src/features/*` directories must be lowercase.

### Logic (Manual/Reasoning)
- [ ] **Reduced Motion**: Does any animation logic check `prefers-reduced-motion`?
- [ ] **Scannability**: Are listing items static on hover (no layout shifts)?

---

## See Also
- `foundation-design-tokens.md` — For semantic and primitive token definitions.
- `foundation-accessibility.md` — For keyboard and screen reader foundations.
