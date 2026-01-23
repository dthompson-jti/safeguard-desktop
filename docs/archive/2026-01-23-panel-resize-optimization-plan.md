# Plan: Fix Side Panel Resize Sluggishness

Restore the high-performance resize behavior by applying aggressive transition suppression and using CSS variables for live width updates.

## Proposed Changes

### [Performance Optimizations]

#### [MODIFY] [DesktopEnhancedApp.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.module.css)
- Make the transition suppression more aggressive by adding the `*` selector and `!important`.
- This ensures any nested components (like badges or buttons) don't try to animate during a resize.

```css
.detailPanelWrapper[data-resizing="true"],
.detailPanelWrapper[data-resizing="true"] * {
    transition: none !important;
}
```

#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Update the `motion.div` to bypass `framer-motion` transitions during active resizing.
- Use the `--panel-width` CSS variable for "live" width updates during drag.
- Set `transition.duration` to `0` when `isResizing` is true.

#### [MODIFY] [DetailPanel.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DetailPanel.module.css)
- Add `will-change: width` to the `.panel` class to promote it to a compositor layer.

## Verification Plan

### Manual Verification
1. Open the Historical view.
2. Drag the Detail Panel resizer and verify it follows the mouse instantly without lag.
3. Verify that the "close" animation still works smoothly when clicking the "X" button.
