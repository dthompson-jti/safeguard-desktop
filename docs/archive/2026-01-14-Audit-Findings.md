# Design System Audit Report (Desktop)

**Date**: 2026-01-14
**Scope**: `src/desktop`

## 1. Documentation Integrity

### Missing Specifications
- [ ] **Critical**: `docs/knowledge-base/SPEC-SPACING.md` is referenced in the audit skill but is missing from the knowledge base.

### Spec Alignment
- **`SPEC-CSS.md`** defines clear contracts for Z-index, Typography, and Layout. Several violations were found (detailed below).
- **`SPEC-DESIGN-ALIGNMENT.md`** exists as a static audit of the current implementation vs the design prototype. It lists several gaps (e.g., Resize Handle styling, Toolbar consistency) that appear to be partially unaddressed based on the codebase search (e.g., `DetailPanel` still has ad-hoc styling).

## 2. Token Hygiene Violations

### Hardcoded Primitive Tokens
*Direct use of `var(--primitives-*)` breaks theming support.*

- **`DesktopTabGroup.module.css`**:
  - `background-color: var(--primitives-theme-600);` (L84)
- **`SupervisorNoteModal.module.css`**:
  - `background: rgba(var(--primitives-base-black-rgb, 0, 0, 0), 0.4);` (L6) - valid use if overlay token unavailable, but check for `--surface-overlay`.
- **`CountdownWidget.module.css`**:
  - `stroke: var(--primitives-theme-600);` (L131)

### Hardcoded Colors (Hex)
- **`DesktopTabGroup.module.css`**: No hex codes found in typical CSS files, which is good.

## 3. Component Usage & Inline Styles

### Inline Styles (Magic Numbers)
*Inline styles bypass the design system and make maintenance difficult.*

- **`SupervisorNoteModal.tsx`**:
  - `fontSize: 16`
  - `minWidth: 120`, `minWidth: 100`
- **`LiveMonitorView.tsx`** & **`HistoricalReviewView.tsx`**:
  - `display: 'flex'`, `gap: '4px'`
  - `fontSize: '16px'`, `color: 'var(--surface-fg-quaternary)'`
- **`DesktopToolbar.tsx`**:
  - `width: 240`
  - `width: 200`
  - `width: 220` (Layouts should be handled by CSS Grid/Flex or standard spacing classes).
- **`DetailPanel.tsx`**:
  - `style={{ '--panel-width': ... }}` (Acceptable as it's a dynamic CSS variable).

## 4. Z-Index Layering Violations
*`SPEC-CSS.md` defines: Content (1), Chrome (50), Nav (100), Overlays (105), Sheets (110+).*

- **Critical Violations (1000+)**:
  - `RowContextMenu.module.css`: `1100`, `1101`
  - `DesktopHeader.module.css`: `1100`, `1101`
  - `BulkActionFooter.module.css`: `1000`, `1001`
  *(These fight for "topmost" status and destroy the managed stacking context).*

- **Minor Violations**:
  - `DetailPanel.module.css`: `110` (Conflicts with Sheets).
  - `DesktopHeader.module.css`: `50` (Correct per spec).

## 5. Recommendations

1.  **Restore `SPEC-SPACING.md`**: Locate or recreate the spacing specification to ensure consistent margins/paddings.
2.  **Refactor Inline Styles**: Move inline styles in `LiveMonitorView`, `HistoricalReviewView`, and `DesktopToolbar` to their respective CSS modules using `gap` tokens and standard classes.
3.  **Fix Z-Index War**: Normalizing `1000+` values to fit the 1-110 scale defined in `SPEC-CSS.md`.
4.  **Semantic Token Migration**: Replace `var(--primitives-theme-600)` with `var(--surface-bg-brand-solid)` or similar semantic tokens.
