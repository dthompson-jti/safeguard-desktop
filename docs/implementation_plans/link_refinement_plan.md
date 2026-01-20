# Implementation Plan - Link Interaction & Location Style Refinement

Standardize link interactions across the application (Residents and Locations) with a "fade-in" external link icon and unify the styling of Location columns/breadcrumbs between the table and the Detail Panel.

## User Requirements
- **Hover State for Links:** "Open in new window" icon (`open_in_new`) fades in on hover.
- **Transition:** Fast (e.g., 150ms), "rock solid", non-springy (no bounce).
- **Location Column "Ghost Links":** 
    - Normal state: Looks like plain text (secondary color, regular weight).
    - Hover state: Underline specific node (Group, Unit, or Room) and fade in the icon.
- **Detail Panel Breadcrumbs:** Same hover behavior as table locations.
- **Style Alignment:** Use Material Symbol icons (`navigate_next`) as separators (from the table) but combine them with the Detail Panel's text styling (regular weight, secondary color).

## Proposed Changes

### 1. Component Enhancements

#### `LinkButton.tsx` / `LinkButton.module.css`
- Add an `external` prop to show the `open_in_new` icon.
- Update CSS to hide the icon by default (`opacity: 0`) and fade it in on hover.
- Use a non-springy transition (`ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`).
- Add support for a `ghost` variant where the color is inherited/secondary until hover.

### 2. Table Column Refinement

#### `DataTable.module.css`
- Update `.locationCell` to use the panel-style separators (`›`) instead of `navigate_next`.
- Adjust font weight and colors to match the Detail Panel's cleaner look.
- Ensure the "Ghost Link" effect works per-node (Group, Unit, Location).

#### `EnhancedLiveMonitorView.tsx` & `EnhancedHistoricalReviewView.tsx`
- Replace raw `<a>` tags and `<span>` tags in Resident and Location columns with `LinkButton` (or a dedicated `GhostLink` variant).

### 3. Detail Panel Refinement

#### `DetailPanel.tsx` / `DetailPanel.module.css`
- Replace standard `<a>` tags in `breadcrumbLink` with the updated link component to get the fade-in icon behavior.

## Implementation Steps

### Phase 1: Foundation
1.  **Update `LinkButton.tsx`**: Add `external` and `variant="ghost" | "primary"` props.
2.  **Update `LinkButton.module.css`**: Implement the transition and icon fade-in logic.

### Phase 2: Table Integration
1.  **Refactor `EnhancedLiveMonitorView.tsx`**: Update `resident` and `location` column `cell` renderers.
2.  **Refactor `EnhancedHistoricalReviewView.tsx`**: Update `resident` and `location` column `cell` renderers.
3.  **Update `DataTable.module.css`**: Refine `.locationCell` styling to match the "panel" look.

### Phase 3: Detail Panel Integration
1.  **Update `DetailPanel.tsx`**: Refactor breadcrumb links to use the new interactive link component.

### Phase 4: Polish
1.  Verify transitions are "rock solid" and non-springy.
2.  Ensure consistency in colors and font weights across both views.

## Verification Plan
1.  **Manual Hover Test**: Hover over a resident name in the table; verify the `open_in_new` icon fades in smoothly without bouncing.
2.  **Location Interaction**: Hover over "Alpha" in the Location column; verify only "Alpha" underlines and shows the icon.
3.  **Side-by-Side Comparison**: Open the Detail Panel and compare the Location breadcrumb style with the Table Location column. They should look virtually identical in terms of font-weight, color, and separators.
4.  **Transition Check**: Verify the transition timing and easing via browser dev tools.
