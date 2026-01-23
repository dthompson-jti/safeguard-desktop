# Design System Audit: FilterSelect & Select

## Scope
- Component: `FilterSelect` (and underlying `Select`)
- Focus: Spacing implementation ("no hacks") and token adherence.

## Findings

### 1. Spacing Token Violations
- **Severity**: Low (Maintenance)
- **Location**: `src/desktop/components/FilterSelect.module.css` : L46
- **Issue**: Hardcoded `gap: 2px` in `.activeContainer`.
- **Recommendation**: Replace with `var(--spacing-0p5)`.

- **Location**: `src/components/Select.module.css` : L82
- **Issue**: Hardcoded `gap: 2px` in `.selectViewport`.
- **Recommendation**: Replace with `var(--spacing-0p5)`.

### 2. Implementation Quality ("Hacks")
- **Status**: **Clean**.
- Unlike `SearchableSelect` (which required `margin` overrides due to `cmdk` internals), `Select` correctly uses `display: flex` and `gap` on the viewport.
- No negative margins or specialized sibling selectors found.
- The use of `gap` is the preferred, standard way to space items.

### 3. Visual Border Model (FilterSelect)
- **Status**: **Compliant**.
- `FilterSelect.module.css` contains detailed comments and implementation of the skeuomorphic border model using `box-shadow` insets.
- Tokens `control-bg-selected`, `control-border-selected` are correctly used.

## Recommendations
1.  **Refactor**: Update both files to use `var(--spacing-0p5)` for consistency with the Design System.
2.  **Verify**: Ensure the visual output remains identical (2px).
