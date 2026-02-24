# Plan: Update Panel Dimensions

Update the width constraints for the tree panel (left navigation) and side panel (right detail panel) to match new design specifications.

## Proposed Changes

### [Tree Panel (Left Navigation)]

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/atoms.ts)
- Update code `desktopEnhancedPanelWidthAtom` default value to `320`.

#### [MODIFY] [Layout.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/Layout.tsx)
- Update `resize` constraints: min `260`, max `450`.

---

### [Side Panel (Right Detail Panel)]

#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Update `panelWidthAtom` default value to `320`.

#### [MODIFY] [DetailPanel.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DetailPanel.tsx)
- Update `handleResizeMove` constraints: min `260`, max `450`.

#### [MODIFY] [DetailPanel.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DetailPanel.module.css)
- Update `.panel` CSS: `min-width: 260px`, `max-width: 450px`.

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure no regressions in logic or types.

### Manual Verification
1.  **Default State**: Clear local storage and reload the app. Verify both panels load with 320px width.
2.  **Tree Panel Resizing**:
    *   Drag the left resizer. Verify it stops at 260px (min) and 450px (max).
3.  **Side Panel Resizing**:
    *   Open the detail panel by clicking a record.
    *   Drag the right resizer. Verify it stops at 260px (min) and 450px (max).
4.  **Consistency**: Verify that both panels feel symmetrical and adhere to the same limits.
