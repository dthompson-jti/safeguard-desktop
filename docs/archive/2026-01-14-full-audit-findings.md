# Full Audit Progress & Findings

## Audit Dimensions
- [ ] **Project Invariants Review** `[/]`
- [ ] **Code Audit** (Architecture, Types, Patterns) `[ ]`
- [ ] **Layout Audit** (Spacing, Alignment, Grid) `[ ]`
- [ ] **Typography Audit** (Fonts, Weights, Hierarchy) `[ ]`
- [ ] **Design System Audit** (Tokens, Components, Theming) `[ ]`
- [ ] **Synthesis & Prioritization** `[ ]`

## Summary of Findings

### 1. Design System & Token Hygiene
- [ ] **Critical**: `z-index: 1100` found in [menu.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/menu.css) and [popover.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/popover.css). This violates the `SPEC-CSS.md` layering contract (Content: 1, Chrome: 50, Nav: 100, Overlays: 105).
- [ ] **Violation**: Primitive tokens `var(--primitives-grey-900/800)` used in [popover.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/popover.css#L15). Should use semantic equivalents for theme support.
- [ ] **Violation**: Hardcoded font sizes (`fontSize: '16px'`, `fontSize: 20`) in [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx) and [Breadcrumbs.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/Breadcrumbs.tsx).

### 2. Layout & Spacing
- [ ] **Magic Numbers**: The layout resizer in [Layout.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/Layout.module.css) uses literal `px` values for width and position instead of spacing tokens.
- [ ] **Documentation Gap**: `SPEC-SPACING.md` is missing `--spacing-2p5` (10px), which is defined in primitives and used in `TopNav.module.css`.

### 3. Architecture & Code Quality
- [ ] **Redundancy**: State synchronization logic between `SelectionState` and `DesktopFilter` is duplicated across [Layout.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/Layout.tsx) and [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx).
- [ ] **Inline Styles**: Extensive inline styles in [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx#L100-108) bypass CSS Modules and documentation.
- [ ] **Cleanup**: Obsolete NFC types (L53-63) and redundant `SafetyCheck` fields (L41-44) remain in [src/types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/types.ts).

### 4. Accessibility & Interaction
- [ ] **Hover Hygiene**: Missing `@media (hover: hover)` wrappers for hover states in several CSS modules, risking "sticky hover" on touch devices.

## Systemic Issues
1. **Z-Index Inflation**: The use of arbitrary high numbers (1100) suggests a lack of trust in the defined layering system or a reactionary fix to "make it on top."
2. **"React-Managed" Styles**: Frequent use of inline styles for layout (grids/flex) instead of CSS Modules makes it hard to enforce design tokens globally.
3. **Mobile Hangover**: The core `src/types.ts` still holds weight from the mobile app that isn't used by the desktop supervisor dashboard (e.g., walking order, NFC state machines).
