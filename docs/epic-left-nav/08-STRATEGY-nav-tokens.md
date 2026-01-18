# Strategy: Navigation Semantic Tokens (User Hybrid)

## Selected Direction: Hybrid Semantic Theme
A custom mix requesting specific behaviors for groups, items, and top navigation.

### Core Principles
1.  **Main Background**: White/Primary (clean canvas).
2.  **Groups**: Light Themed background (subtle separation) with Dark Themed text.
3.  **Items**: Transparent default, but **Dark Themed** when selected (high contrast).
4.  **Top Nav**: Darkish Theme (visual anchor).
5.  **Interaction**: All hovers are **1-step darker** than their base state.

---

## Token Schema & Mappings (Light Mode)

### 1. Main Container
| Token | Mapping | Notes |
|:---|:---|:---|
| `--nav-bg` | `var(--surface-bg-primary)` | White |

### 2. Top-Level Groups (Sections)
*Light backgrounds, Dark text.*

| Token | Mapping | Value (Approx) |
|:---|:---|:---|
| `--nav-group-bg` | `var(--primitives-theme-50)` | Lightest Blue |
| `--nav-group-bg-hover` | `var(--primitives-theme-100)` | 1-step darker |
| `--nav-group-bg-selected` | `var(--primitives-theme-100)` | (Same as hover base) |
| `--nav-group-bg-selected-hover`| `var(--primitives-theme-200)` | 1-step darker |
| `--nav-group-fg` | `var(--primitives-theme-900)` | Deep Blue/Black |
| `--nav-group-fg-hover` | `var(--primitives-theme-950)` | 1-step darker |
| `--nav-group-fg-selected` | `var(--primitives-theme-950)` | |

### 3. Nav Items (Links)
*Transparent default, Dark Selected.*

| Token | Mapping | Notes |
|:---|:---|:---|
| `--nav-item-bg` | `transparent` | Base |
| `--nav-item-bg-hover` | `var(--primitives-theme-50)` | Light hover trace |
| `--nav-item-bg-selected` | `var(--primitives-theme-700)` | **Dark Blue** |
| `--nav-item-bg-selected-hover` | `var(--primitives-theme-800)` | 1-step darker |
| `--nav-item-fg` | `var(--primitives-theme-900)` | Deep Blue Text |
| `--nav-item-fg-hover` | `var(--primitives-theme-950)` | 1-step darker |
| `--nav-item-fg-selected` | `var(--primitives-base-white)` | White (High Contrast) |

*(Note: Added `fg-selected` as White because specific `bg-selected` is Dark)*

### 4. Top Navigation
| Token | Mapping | Notes |
|:---|:---|:---|
| `--top-nav-bg` | `var(--primitives-theme-800)` | Darkish Blue |
| `--top-nav-fg` | `var(--primitives-base-white)` | White text |

---

## Implementation Actions
1.  **Semantics**: Append these specific tokens to `src/styles/semantics.css`.
2.  **Styles**: Refactor `SideBar`, `LeftNavigationSection`, `LeftNavigationLinkItem`, and `TopNav`.
