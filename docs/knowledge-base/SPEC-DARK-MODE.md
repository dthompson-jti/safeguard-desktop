# Dark Mode Strategy and Specification

Date: 2026-03-04
Primary implementation file: `src/styles/semantics.css`

## 1. Runtime Contract

Only two runtime themes are supported:

1. `light`
2. `dark`

`useTheme.ts` migrates legacy `dark-*` persisted values into canonical `dark`.

## 2. Elevation Contract (Dark)

Dark mode uses lighter values for elevated surfaces:

- Deep layout floor: `--surface-bg-secondary` (`grey-930`)
- Main panel/content surface: `--surface-bg-primary` (`grey-910`)
- Elevated layers: `--surface-bg-tertiary` (`grey-880`) and `--surface-bg-quaternary` (`grey-860`)

## 3. Navigation Contract (Current)

### Top Nav

- `--top-nav-bg: var(--primitives-theme-975)`
- `--top-nav-fg: var(--surface-fg-primary)`
- `--top-nav-search-bg: var(--primitives-grey-900)`
- `--top-nav-search-bg-hover: var(--primitives-grey-880)`

### Left Nav Container

- `--nav-bg: var(--surface-bg-primary)` (intentionally aligned with adjacent panel)

### Left Nav Group Rows

- `--nav-group-bg: var(--primitives-theme-950)`
- `--nav-group-bg-hover: var(--primitives-theme-900)`
- `--nav-group-bg-selected: var(--primitives-theme-950)`
- `--nav-group-bg-selected-hover: var(--primitives-theme-900)`

### Mode Toggle

`Historical / Live` toggle uses dedicated `--nav-toggle-*` tokens to ensure identical hierarchy behavior in light and dark themes.

## 4. Control Contrast and Border Softening

Dark mode border tokens were intentionally stepped down to reduce edge harshness:

- `--control-border-secondary: grey-600`
- `--control-border-secondary-hover: grey-500`
- `--control-border-secondary-pressed: grey-500`
- `--control-border-selected: theme-600`
- `--control-border-selected-hover: theme-500`
- `--control-border-selected-pressed: theme-400`

Additional UI changes matching this contract:

1. Checkboxes use 1px borders in table/forms.
2. Quick filter and multi-select lower inset lip reduced (`-1px`).

## 5. Verification Checklist

1. Toggle `light` / `dark` in app menu and verify:
   - Top-nav remains darkest chrome.
   - Left-nav container matches panel surface.
   - Group rows are brand-tinted but even across open/closed state.
2. Run:
   - `npm run build`
   - `npm run audit:tokens`
