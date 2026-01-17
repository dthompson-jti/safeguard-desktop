# Audit: Button Component

**Date:** 2026-01-16
**Status:** Draft
**Scope:** `src/components/Button.tsx`, `src/styles/buttons.css`

---

## 1. Button Types
The following variants are defined in `ButtonProps` and `buttons.css`:
-   `primary` (Default)
-   `secondary`
-   `tertiary`
-   `quaternary`
-   `on-solid`
-   `destructive`

## 2. Size & Layout
Analysis of `src/styles/buttons.css` reveals a mix of semantic tokens and hardcoded values.

| Size | Height | Padding | Radius | Gap | Icon Size | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **XS** | `var(--control-height-xs)` | `0 var(--spacing-2)` | `var(--radius-sm)` | `var(--spacing-1)` | `var(--icon-size-sm)` | `opsz` 16 |
| **S** | `32px` (Hardcoded) | `0 var(--spacing-2p5)` (10px) | `var(--radius-md)` | `var(--spacing-1)` | `var(--icon-size-md)` | `opsz` 20 |
| **M*** | `36px` (Hardcoded) | `0 var(--spacing-3)` (12px) | `var(--radius-md)` | `var(--spacing-1)` | `var(--icon-size-md)` | Default. `opsz` 20 |
| **LG** | `var(--control-height-lg)` | `var(--spacing-3) var(--spacing-5)` | `var(--spacing-3)` ⚠️ | `var(--spacing-2)` | `var(--icon-size-lg)` | Radius uses spacing token |

**Observations:**
-   **Inconsistency**: XS and LG use `var(--control-height-*)` tokens, while S and M use hardcoded pixel values.
-   **Radius**: Large button uses `var(--spacing-3)` for border-radius, which is semantically incorrect (should be a radius token).
-   **Padding**: Small button uses `var(--spacing-2p5)` which implies a 2.5 spacing step exists, but might be ad-hoc.

## 3. State & Token Map

### Primary
| Property | Default | Hover | Pressed |
| :--- | :--- | :--- | :--- |
| **Background** | `var(--control-bg-theme)` | `var(--control-bg-theme-hover)` | `var(--control-bg-theme-pressed)` |
| **Border** | `var(--control-border-primary)` | `var(--control-border-primary-hover)` | `var(--control-border-primary-pressed)` |
| **Foreground** | `var(--control-fg-on-solid)` | - | - |
| **Shadow** | `inset 0 -2px 0 0` (Border Color) | `inset 0 -2px 0 0` (Hover Color) | `inset 0 -2px 0 0` (Pressed Color) |

### Secondary
| Property | Default | Hover | Pressed |
| :--- | :--- | :--- | :--- |
| **Background** | `var(--control-bg-secondary)` | `var(--control-bg-secondary-hover)` | `var(--control-bg-secondary-pressed)` |
| **Border** | `var(--control-border-secondary)` | `var(--control-border-secondary-hover)` | `var(--control-border-primary)` (⚠️ Color Change) |
| **Foreground** | `var(--surface-fg-primary)` | - | - |
| **Shadow** | - | `inset 0 -3px 0 0` | None |
| **Notes** | - | - | Border becomes `2px solid` |

### Tertiary
| Property | Default | Hover | Pressed |
| :--- | :--- | :--- | :--- |
| **Background** | `none` | `var(--control-bg-tertiary-hover)` | `var(--control-bg-tertiary-pressed)` |
| **Border** | `transparent` | `var(--control-border-tertiary-hover)` | `var(--control-border-tertiary-pressed)` |
| **Foreground** | `var(--control-fg-tertiary)` | `var(--control-fg-tertiary-hover)` | `var(--control-fg-tertiary-hover)` |
| **Shadow** | - | `inset 0 -2px 0 0` | - |

### Quaternary
| Property | Default | Hover | Pressed |
| :--- | :--- | :--- | :--- |
| **Background** | `none` | `var(--control-bg-quaternary-hover)` | `var(--control-bg-quaternary-pressed)` |
| **Border** | `transparent` | `var(--control-border-quaternary-hover)` | `var(--control-border-quaternary-pressed)` |
| **Foreground** | `var(--control-fg-quaternary)` | `var(--control-fg-quaternary-hover)` | `var(--control-fg-quaternary-hover)` |

### Destructive
| Property | Default | Hover | Pressed |
| :--- | :--- | :--- | :--- |
| **Background** | `var(--surface-bg-error-solid)` ⚠️ | `var(--primitives-red-700)` ⚠️ | `var(--primitives-red-800)` ⚠️ |
| **Border** | `var(--primitives-red-700)` ⚠️ | `var(--primitives-red-800)` ⚠️ | `var(--primitives-red-900)` ⚠️ |
| **Foreground** | `var(--control-fg-on-solid)` | - | - |
| **Shadow** | `inset 0 -2px` (Red 700) | `inset 0 -2px` (Red 800) | `inset 0 -2px` (Red 900) |

## 4. Gaps & Recommendations

### Critical
1.  **Destructive Variant using Primitives**: The destructive variant relies almost entirely on `var(--primitives-red-*)` or `var(--surface-bg-error-solid)` instead of appropriate `control-bg-alert` or `control-border-alert` tokens.
    *   *Recommendation*: Map destructive states to semantic control tokens (e.g., `control-bg-alert-solid` if it exists, or create it).

2.  **Hardcoded Heights**: S (32px) and M (36px) are hardcoded.
    *   *Recommendation*: Define `var(--control-height-sm)` and `var(--control-height-md)` in `appearance.css` or `forms.css` and use them.

3.  **Large Button Radius**: Uses `var(--spacing-3)` (12px?) instead of a radius token.
    *   *Recommendation*: Switch to `var(--radius-lg)` or `var(--radius-md)` depending on design intent.

### Minor
1.  **Secondary Pressed State**: The border width jumps to `2px` and changes color to `primary`. This logic is seemingly unique to this variant.
    *   *Recommendation*: Verify with design if this behavior is intended (it causes layout shifts unless `box-sizing` handles it well, currently relies on box-shadow simulation in other states).
2.  **On-Solid Border Magic**: Uses `border-width: 1px 1px 2px 1px`.
    *   *Recommendation*: Tokenize or document why the bottom border is thicker (likely for the "tactile" feel).

### Missing Tokens
-   `--control-height-md`
-   `--control-height-sm`
-   `--control-bg-destructive` (and hover/pressed states) - currently borrowing from surface or primitives.
