# IDEA: Semantic Token Evolution (Spacing & Radii)

**Status**: Draft
**Date**: 2026-02-18
**Context**: Standardizing the design system by evolving raw primitive tokens into component-driven semantic roles. This ensures consistency across diverse UI surfaces and simplifies global adjustments.

## 1. Use Case Coverage (Components)

### Core Components
- **Buttons**: Mapping padding, icon gaps, and radii to the semantic scale.
- **Inputs**: Standardizing horizontal/vertical insets and focus-ring offsets.
- **Modals/Sheets**: Using `lg` insets and `radius-modal` for root structural containers.

### Complex UI Components
- **Left Navigation**:
    - `panel-inset` for the main sidebar container.
    - `nav-group-gap` for vertical rhythm between navigation sections.
    - `nav-item-inset` and `icon-gap` for individual navigation rows.
- **Top Navigation**:
    - `inset-sm` for the high-density toolbar layout.
    - `icon-gap` for search input and action buttons.
- **Cards (Dashboard)**:
    - `inset-lg` for internal content padding.
    - `gap-md` for layout rhythm between card clusters.
    - `radius-card` for consistent panel rounding.

## 2. Token Naming Concepts

Based on research into Material 3 and Apple HIG, we have identified two distinct strategies for the semantic layer. For a detailed side-by-side spec, see [SPEC-SEMANTIC-TOKENS.md](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/docs/design-system/SPEC-SEMANTIC-TOKENS.md).

### Option A: Size-Graduated (T-Shirt Sizing)
Every semantic token uses a size name (lg, md, sm, xs).
- **Core Principle**: Developer thinks in "magnitude" (How big is this space?).
- **Spacing**: `--spacing-inset-lg`, `--spacing-gap-md`.
- **Radii**: `--radius-xl`, `--radius-md`.
- **Pros**: Minimal learning curve, smallest token set, easy to maintain.
- **Cons**: Components sharing a size (e.g., Card and Modal) cannot diverge without a breaking refactor of the semantic layer.

### Option B: Role-Based (Component/Relationship Naming)
Every token describes the architectural intent or structural relationship.
- **Core Principle**: Developer thinks in "identity" (What is this thing I'm building?).
- **Spacing**: `--spacing-inset-modal`, `--spacing-gap-form`.
- **Radii**: `--radius-modal`, `--radius-input`.
- **Pros**: Maximum flexibility, self-documenting code, independent evolution for every component class.
- **Cons**: Larger token set, higher cognitive load, risk of token proliferation if not strictly governed.

> [!NOTE]
> For gaps in Option B, we use *relationship names* (form, stack, row, inline) to maintain reusability across different component types.

## 3. Evaluation Criteria

How do we measure the success of this token evolution?

1.  **Visual Alignment**: Do disparate components (e.g., a Select popover and a Menu popover) align perfectly when using the same `inset-xs` token?
2.  **Ease of Theming**: Can we reduce the entire app's density by changing only four `inset-*` tokens in `semantics.css`?
3.  **Developer Friction**: Does the nomenclature (`inset` vs `gap`) reduce the need to check Figma for specific pixel values during implementation?
4.  **Touch Accessibility**: Do all rows and interactive zones naturally meet the 44px/56px targets?
5.  **Focus Fidelity**: Does the `focus-offset` token eliminate clipped focus rings?
