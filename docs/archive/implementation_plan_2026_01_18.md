# Top Navigation Implementation Plan

## Goal
Overhaul the `TopNav` component to match the "Darkish" theme and specific content requirements provided by the user. The layout will be divided into three distinct groups: Left (System), Center (Search), and Right (Session).

## Proposed Changes

### 1. Component Structure (`src/desktop-enhanced/components/TopNav.tsx`)
Refactor the existing layout into three flex sections.

#### Left Group (System & Quick Tools)
- **Container**: `div.leftSection` (Flex Row, gap-4)
- **Items**:
  - `TopNavMenu` (Existing hamburger)
  - `Logo`: Text "eSupervision" (Inter, 600, `top-nav-fg`)
  - `Divider`: Vertical separator
  - `IconButton`: Star (`star-circle-outline`)
  - `IconButton`: People (`user-group`)
  - `IconButton`: Calendar (`calendar`)

#### Center Group (Global Search)
- **Container**: `div.centerSection` (Flex 1, Max Width 600px)
- **Component**: `TopNavSearch` (New sub-component or inline)
  - **Input**: "Search Cases and People"
  - **Icon**: `search-magnifying-glass` (Left aligned)
  - **Styles**:
    - Bg: `top-nav-search-bg`
    - Hover: `top-nav-search-bg-hover`
    - Text: `top-nav-fg`
    - Placeholder: `top-nav-fg-secondary`

#### Right Group (Settings & Session)
- **Container**: `div.rightSection` (Flex Row, gap-3)
- **Items**:
  - `LanguageDropdown`: "En (AU)" + `chevron-down`
  - `ActionLinkButton`: `point-of-sale-icon` + "Open Till"
  - `Divider`: Vertical separator
  - `TopNavAvatar`: Existing component (ensure token fix)
  - `IconButton`: Help (`question-mark-circle`)
  - `IconButton`: Logout (`logout-box-arrow-right`)

### 2. CSS Modules (`TopNav.module.css`)
Refactor styles to strictly use `top-nav-*` semantic tokens.

```css
.topNav {
  background-color: var(--top-nav-bg);
  color: var(--top-nav-fg);
  /* height: 44px (Standardized) */
}

.iconButton {
  color: var(--top-nav-fg);
  /* Hover: top-nav-search-bg-hover or specific button hover token if needed */
}

.searchContainer {
  background-color: var(--top-nav-search-bg);
  color: var(--top-nav-fg);
}

.verticalDivider {
  width: 1px;
  background-color: var(--top-nav-fg-secondary); /* Low opacity white */
  height: 20px;
}
```

### 3. Icons
Use `material-symbols-rounded` for consistency with `TopNavMenu`.

## Verification Plan
- **Visual**: Verify all three sections render correctly with the dark blue background.
- **Interactions**: Verify hover states on buttons and search input.
- **Tokens**: Ensure no hardcoded colors remain in `TopNav` related files.
