---
trigger: model_decision
---

# Input Patterns

Rules for interactive controls: Buttons, Sliders, Forms, and Toggles.

## 1. Buttons
*   **Typography:** All button text must be `var(--font-weight-semibold)` (600).
*   **State Purity:** Ghost/Tertiary buttons **MUST NOT** acquire borders on hover. Only darken background.
*   **Scale Physics:**
    *   **Press:** Use `transform: scale(0.98)` and `filter: brightness(0.92)`.
    *   **Hover:** Use `transform: scale(1.02)` on the `::before` pseudo-element (background only), not the text.
    *   **Global active scale:** `scale(0.99)`.
*   **Neutral Primaries:** Primary buttons MUST use black/deep grey background (`--control-bg-theme`) for both rest and hover.
*   **Touch Targets:** Standard interactive targets MUST be **44px** (Standard) or **40px** (Compact).
*   **Icon-Only Circularity:** icon-only buttons (especially size `m`) MUST use `border-radius: var(--radius-full)` for perfect circularity.
*   **Surface Variant:** Use `data-variant="surface"` for controls needing a solid component-level background (e.g., Header actions) instead of transparent tertiary.

## 2. Sliders
*   **DOM Layering:** 3-layer architecture required.
    *   Parent (Layout) -> Child `.sliderThumbVisual` (Visual) -> `::before` (44px Hit Target z:-1) -> `::after` (32px Glow z:-2).
*   **Extreme Labels:** In dense contexts, show labels for `1` and `Max` only.
*   **Thumb Radius:** Must use `--radius-full`.

## 3. Forms & Inputs
*   **Global Styles**: Modal inputs must use `forms.css` globals, not inline styles.
*   **Selects**: Prefer native `<select>` for standard settings/forms. For specialized Canvas widgets (e.g., Output Format), use `@radix-ui/react-select` to ensure consistent styling and keyboard accessibility.
*   **Auto-Growing**: Use `PromptInputField` for multi-line text, not raw `textarea`.
*   **Mobile Scaling**: Set `font-size: 16px` on all text inputs and textareas to prevent iOS auto-zoom regressions.
*   **Grid Alignment**: For complex panels, use the "50% Width Grid Pattern" where the field takes exactly 50%.
*   **Complex Widgets**: For multi-field widgets (e.g., Advanced Role), use a 2-column grid with `gap: var(--spacing-2)` and micro-labels (10px) to maintain density.
*   **Checkboxes**: Use `align-items: center` on parent flex container for optical alignment.

## 4. Toggles & Chips
*   **SegmentedToggle:** Must use `layoutId` logic and `inset: 0` z-index for Framer Motion sliding background.
*   **ToggleChip Width:** Chips must maintain identical width in selected/unselected states (use transparent border to reserve space).
*   **Integrated Labels:** Use `RadioChipGroup` with integrated labels (`gap: var(--spacing-2)`) over manual wrapping.

## 5. Specifications

### Button Sizes
- **Size `m`** — Height: 36px (Standard), Radius: 10px, Icon-Only Radius: **Full (Circle)**
- **Size `s`** — Height: 30px (Small), Radius: 10px, Icon-Only Radius: 10px

### Chip Specs
- **Bg Selected** — `grey-200` (Light) / `grey-700` (Dark)
- **Transition** — 0.15s `--ease-smooth`
- **Dot Size** — 6px

## 6. Verification

### Invariants (Automated)
- [ ] **Button Weight**: `grep "font-weight" src/**/*Button*` (Must be `var(--font-weight-semibold)`).
- [ ] **Touch Targets**: Small buttons must be 20px+ hit area.

### Logic (Manual/Reasoning)
- [ ] **State Purity**: Do ghost buttons avoid acquiring borders on hover?
- [ ] **Scale Physics**: Is press feedback using `scale(0.98)` not smaller?

---

## See Also
- `foundation-design-tokens.md` — For button and chip styling tokens.
- `foundation-accessibility.md` — For interactive control accessibility criteria.
