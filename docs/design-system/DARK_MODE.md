# Journal Design System: Dark Mode Specification

Date: 2026-03-04
Source of truth: `src/styles/semantics.css` (`[data-theme='dark']`)

## 1. Core Philosophy

Dark mode uses a "lights-down" model:

1. Base canvases remain deep neutral.
2. Elevated reading surfaces are lighter than the base canvas.
3. Chrome regions (top-nav, nav groups) may use dark brand values when visual hierarchy requires stronger identity.

## 2. Active Surface Stack (Current)

| Semantic Token | Current Primitive | Purpose |
| --- | --- | --- |
| `--surface-bg-secondary` | `grey-930` | Deep layout floor |
| `--surface-bg-primary` | `grey-910` | Main content and panel surfaces |
| `--surface-bg-tertiary` | `grey-880` | Higher elevation surfaces |
| `--surface-bg-quaternary` | `grey-860` | Highest static elevation |

## 3. Navigation Chrome (Current)

### Top Navigation

| Token | Current Value | Intent |
| --- | --- | --- |
| `--top-nav-bg` | `theme-975` | Deep brand chrome |
| `--top-nav-fg` | `surface-fg-primary` | Primary readable text/icons |
| `--top-nav-search-bg` | `grey-900` | Recessed search field |
| `--top-nav-search-bg-hover` | `grey-880` | Hover elevation cue |

### Left Navigation Container

| Token | Current Value | Intent |
| --- | --- | --- |
| `--nav-bg` | `surface-bg-primary` | Match adjacent panel surface |
| `--nav-surface-border` | `surface-border-secondary` | Subtle separator |

### Left Navigation Groups (Quick Access / Workspace)

| Token | Current Value | Intent |
| --- | --- | --- |
| `--nav-group-bg` | `theme-950` | Group row base |
| `--nav-group-bg-hover` | `theme-900` | Group row hover |
| `--nav-group-bg-selected` | `theme-950` | Open/selected parity with base |
| `--nav-group-bg-selected-hover` | `theme-900` | Open + hover |

### Mode Toggle (Historical / Live)

`ModeToggle` is no longer derived from generic surface elevation. It uses dedicated semantics:

- `--nav-toggle-bg`
- `--nav-toggle-border`
- `--nav-toggle-fg`
- `--nav-toggle-pill-bg`
- `--nav-toggle-pill-fg`
- `--nav-toggle-pill-shadow`

This prevents light/dark inversion artifacts.

## 4. Border Intensity Step-Down (Current)

To reduce border harshness on dark surfaces:

- `--control-border-secondary`: `grey-600`
- `--control-border-secondary-hover`: `grey-500`
- `--control-border-secondary-pressed`: `grey-500`
- `--control-border-selected`: `theme-600`
- `--control-border-selected-hover`: `theme-500`
- `--control-border-selected-pressed`: `theme-400`

Applied visibly in checkbox, search, and quick-filter controls.

## 5. Theme Model

Supported runtime themes:

1. `light` (default)
2. `dark` (canonical dark)

Legacy values (`dark-a`, `dark-b`, `dark-c`) are migrated to `dark` by `useTheme.ts`.

## 6. Verification

1. Build: `npm run build`
2. Token sync/drift snapshot: `npm run audit:tokens` -> `docs/token-audit-report.md`
