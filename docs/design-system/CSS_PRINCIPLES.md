# Journal Design System: CSS Principles

These principles establish the technical standards for CSS implementation to ensure a scalable, theme-agnostic, and maintainable codebase.

## 1. Semantic Implementation

You must use semantic tokens for all styles. Primitive tokens are reserved for the definition layer in `semantics.css`.

*   **Requirement**: `color: var(--surface-fg-primary);`
*   **Non-compliant**: `color: var(--primitives-grey-900);`

## 2. No Static Colors

You should not use hardcoded hexadecimal, RGB, or OKLCH values within component CSS.

*   **Indicator**: Reaching for a static value usually means a semantic token is missing. You should find the appropriate token or propose a new one.

## 3. Surface vs. Control Context

Token selection must align with the element's role:
*   **Surfaces**: Use `--surface-*` for backgrounds, borders, and containers.
*   **Controls**: Use `--control-*` for interactive elements and their states.

## 4. Text Sizing & Accessibility

Text sizing should follow the system scale to ensure readiblity and hierarchy.

*   **Scale**: Use `--font-size-*` tokens (e.g., `sm`, `md`, `lg`, `xl`).
*   **WCAG Compliance**:
    *   **Contrast**: Ensure text passes WCAG AA standards (4.5:1) against its background. The system is designed to pass this by default when correct semantic pairs are used (e.g., `fg-primary` on `bg-primary`).
    *   **Resize**: Using `rem` units ensures text scales up to 200% without breaking layout.

## 5. Scalable Spacing

All layout dimensions (margins, padding, gaps) must utilize the `--spacing-*` tokens.

> [!NOTE]
> We anticipate expanding the spacing system to include semantic experience tokens in the future (e.g., `--spacing-form-gap`, `--spacing-header-height`). For now, use the primitive scale (`spacing-4`).

## 6. Migration Compliance

When migrating legacy code:

1.  **Prioritize Modern**: Use the current semantic values.
2.  **Avoid Legacy**: Do not bring over old blue-grey tints.
3.  **Tag Debt**: Use `/* REMAP: description */` if you must use a non-standard value temporarily.
