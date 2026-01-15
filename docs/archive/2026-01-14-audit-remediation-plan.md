# Audit Remediation Plan

This plan addresses all issues identified in the design system and full project audits, focusing on token hygiene, Z-index normalization, and architectural cleanup.

## Proposed Changes

### 1. Global Styles & Specs
#### [MODIFY] [SPEC-SPACING.md](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/docs/knowledge-base/SPEC-SPACING.md)
*   Add `--spacing-2p5` (10px) to the scale.

#### [MODIFY] [menu.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/menu.css)
*   Normalize `z-index: 1100` to `106` (Overlays context).

#### [MODIFY] [popover.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/styles/popover.css)
*   Normalize `z-index: 1100` to `106`.
*   Replace `var(--primitives-grey-900/800)` with semantic `var(--surface-bg-primary)` in tooltip variant.

### 2. Desktop Components (Z-Index)
#### [MODIFY] [RowContextMenu.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/RowContextMenu.module.css)
*   Normalize `z-index: 1100` (backdrop) to `105`.
*   Normalize `z-index: 1101` (menu) to `106`.

#### [MODIFY] [DesktopHeader.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopHeader.module.css)
*   Normalize `z-index: 1100` to `50` (Chrome).

#### [MODIFY] [BulkActionFooter.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/BulkActionFooter.module.css)
*   Normalize `z-index: 1000` to `50` (Chrome).

### 3. Component Refactoring (Styles)
#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
*   Move inline grid styles to a new `DesktopEnhancedApp.module.css`.
*   Fix redundant `useEffect` for state sync.

#### [MODIFY] [Layout.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/Layout.tsx)
*   Retain sync logic here and remove it from `DesktopEnhancedApp.tsx`.

#### [MODIFY] [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx)
*   Remove inline `fontSize: 16px` from icons. Use standard classes or tokens.

#### [MODIFY] [Breadcrumbs.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/Breadcrumbs.tsx)
*   Remove inline `fontSize: 16px` from icons.

#### [MODIFY] [Layout.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/Layout.module.css)
*   Replace literal `px` with spacing tokens for resizer width.

### 4. Types Cleanup
#### [MODIFY] [types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/types.ts)
*   Remove `NfcScanState` and NFC-related comments.
*   Remove redundant lifecycle fields not used by desktop.

## Verification Plan

### Automated Tests
*   Run `npm run lint` to ensure no new violations.
*   Run `node contrast_audit.cjs` to verify token changes.

### Manual Verification
*   Check that menus and popovers still appear on top of other elements.
*   Verify resizer functionality.
*   Check dark mode consistency in tooltips.
