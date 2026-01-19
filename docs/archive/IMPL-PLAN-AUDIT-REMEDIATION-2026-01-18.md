# Gap Analysis & Update Plan

## Goal Description
Remediate systemic issues identified in the Deep Project Audit. The goal is to bring the codebase into full compliance with the Design System, improve accessibility (replace `div onClick`), and stabilize layout logic.

## User Review Required
> [!IMPORTANT]
> **Breaking Changes**: CSS refactors may slightly shift layout if existing "magic numbers" were compensating for issues.
> **Accessibility**: Replacing `div` with `button` will change focus behavior (improvements).

## Proposed Changes

### Phase 1: Design System Hardening (Estimated: 2 Days)
**Goal:** Eliminate hardcoded values in CSS modules to enforce consistency.

#### CSS Token Standardization
- **Component**: All `.module.css` files
- **Action**: Replace `px` and `rem` values with semantic tokens.
- **Targets**:
    - `margin` / `padding`: `var(--spacing-*)`
    - `font-size`: `var(--font-size-*)`
    - `border-radius`: `var(--radius-*)`
    - `z-index`: Use `var(--z-*)` or strictly defined layers.

### Phase 2: Component Hygiene & Accessibility (Estimated: 1 Day)
**Goal:** Ensure all interactive elements are accessible and semantically correct.

#### Replace `div onClick` with `<button>`
- **Files**:
    - `src/desktop/components/SideBar/SearchController.tsx` (Collapsed icon)
    - `src/desktop-enhanced/components/TopNavMenu.tsx` (Menu items)
- **Change**: Wrap in `<button className={styles.ghostButton}>` or similar to ensure keyboard focus and screen reader support.

#### Standardization
- **Files**: `RowContextMenu.tsx`
- **Change**: Refactor manual positioning logic to use `@radix-ui/react-popover` or `react-popper` anchor positioning to prevent menu clipping and remove "magic number" calculations.

### Phase 3: Layout Stability (Estimated: 1 Day)
**Goal:** Fix layout fragility and z-index wars.

#### DataTable Auto-Fit Extraction
- **File**: `src/desktop/components/DataTable.tsx`
- **Change**: Extract the 50-line canvas measurement logic into `useTableAutoFit` hook.
- **Change**: Remove magic number `padding = 60` in favor of a calculated token-based buffer.

#### Z-Index Layering
- **File**: `src/styles/semantics.css` (Create new if needed)
- **Change**: Define a strict Z-index scale variable set (`--z-chrome`, `--z-overlay`, `--z-modal`, `--z-toast`) and apply to all components.

## Verification Plan

### Automated Verification
- **CSS Scan**: Run `grep` script to ensure no forbidden `px` values remain in targeted properties.
- **Lint**: Run `npm run lint` to catch accessible interaction violations.

### Manual Verification
- **Visual Regression**: Compare "Before" and "After" of modified components (Sidebar, TopNav, Table) to ensure no layout regressions.
- **Keyboard Navigation**: Tab through `SearchController` and `TopNavMenu` to verify focus states work (previously impossible on `div`).
