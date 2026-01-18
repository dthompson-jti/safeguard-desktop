# Audit Report: Left & Top Navigation

## Scope
Focus on recent implementation in:
- `src/desktop/components/SideBar/*`
- `src/desktop-enhanced/components/TopNav*`

## Findings

### 1. Hardcoded Dimensions vs Tokens
Several dimensions use pixel values that exactly match tokens but aren't using the token variables, creating maintenance risk.

| Component | Selector | Property | Current Value | Recommended Token |
|-----------|----------|----------|---------------|-------------------|
| `TopNav.module.css` | `.iconButton` | `width/height` | `32px` | `var(--control-height-sm)` |
| `TopNav.module.css` | `.searchContainer` | `height` | `32px` | `var(--control-height-sm)` |
| `TopNavMenu.module.css` | `.hamburgerButton` | `width/height` | `32px` | `var(--control-height-sm)` |
| `TopNavAvatar.module.css` | `.avatarLarge` | `width/height` | `48px` | `var(--avatar-size-md)` |

### 2. Irregular Dimensions ("Magic Numbers")
Dimensions that do not map to existing primitive tokens.

*   **Top Nav Height**: `44px` (`TopNav.module.css`). Primitives define `control-height-lg` as `40px` and `control-height-sm` as `32px`. 44px is a custom size.
*   **Sidebar Width**: `236px` (`SideBar.module.css`). Primitives define `--side-menu-min-width` as `220px`. The 236px width appears to be a specific design override.
*   **Search Icon**: `18px` (`SearchController.module.css`). Primitives define icons as 16px (`sm`) or 20px (`md`).
*   **Small Avatar**: `28px` (`TopNavAvatar.module.css`). Primitives define smallest avatar as `40px` (`sm`). This is a significantly smaller variant.

### 3. Inline Styles (Hacks)
Inline styles used for icon sizing and coloring in `TopNav.tsx`.

*   `src/desktop-enhanced/components/TopNav.tsx`:
    *   `<span ... style={{ fontSize: '20px', color: 'var(--top-nav-fg)' }}>`: Should use CSS class with `font-size: var(--icon-size-md)` and color inheritance.
    *   `<span ... style={{ fontSize: '16px' }}>`: Should use CSS class with `font-size: var(--icon-size-sm)`.

### 4. Z-Index Management
*   `TopNavAvatar.module.css` and `TopNavMenu.module.css` use `z-index: 1000`. While common, this should ideally use a variable or portalling context to avoid stacking war issues.

### 5. Semantic Token Usage (Good)
*   The recent refactor successfully migrated colors to `top-nav-*` and `nav-*` semantic tokens.
*   Border radius uses `var(--radius-*)` consistently in the latest updates.
*   Flex gaps in Sidebar have replaced fragile `margin-bottom` stacks.

## Recommendations

1.  **Refactor Inline Styles**: Move `fontSize` and `color` overrides in `TopNav.tsx` to `TopNav.module.css`.
2.  **Tokenize Dimensions**: Replace `32px` and `48px` with their respective `control-height` and `avatar-size` tokens.
3.  **Standardize Icons**: Decide if `18px` search icon can be `20px` (md) or `16px` (sm) to align with grid.
4.  **Accept Custom Heights**: Acknowledge `44px` TopNav height and `28px` Avatar as "Local Component Tokens" if they are intentional design deviations, or add them to the design system if reused.
