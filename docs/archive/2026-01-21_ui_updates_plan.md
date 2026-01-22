# Implementation Plan: Fix Detail Panel Layout Bug

This plan addresses the layout issue where the Detail Panel does not expand to the full height of the viewport.

## Root Cause Analysis
The `mainContainer` uses `display: grid` with `height: 100%`. However, it lacks an explicit `grid-template-rows` definition. By default, the grid row is sized to `auto` (based on content). If the main content is shorter than the viewport, the grid row collapses, causing the `DetailPanel` (which is a child grid item) to be shorter than the full container height, even if the container itself is full height.

## User Reviews Required

> [!NOTE]
> None. This is a standard CSS Grid fix.

## Proposed Changes

### [Component] Desktop Layout

#### [MODIFY] [DesktopEnhancedApp.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.module.css)
-   **Add Row Sizing**: Add `grid-template-rows: 1fr;` to `.mainContainer` to force the grid row to fill the available vertical space of the container.
-   **Refinement**: Ensure `.detailPanelWrapper` behaves correctly as a grid item.

## Verification Plan

### Manual Verification
1.  **Open Panel**: Open the Detail Panel in a view with little content (short table).
2.  **Verify Height**: Check that the Detail Panel extends all the way to the bottom of the screen (or container), regardless of the content height in the left column.
