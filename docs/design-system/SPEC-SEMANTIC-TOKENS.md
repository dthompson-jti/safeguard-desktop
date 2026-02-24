# SPEC: Semantic Spacing & Radii System (Evolution Draft)

**Version**: 2.0.0-draft  
**Status**: Comparative Review  
**Last Updated**: 2026-02-18

---

## Executive Summary

This document presents two comprehensive architectural paths for the Journal Design System's semantic layer. We are deciding between **Size-Graduated Naming (Option A)** and **Role-Based Naming (Option B)**.

> [!IMPORTANT]
> A final decision is required between these two options before proceeding to Phase 1 (Foundation) of the implementation.

---

## Shared Foundation (Both Options)

Regardless of the naming strategy, the system operates on these invariant pillars:

1. **Three-Tier Architecture**: Primitives → Semantics → Components.
2. **Theme-Agnostic Spacing**: Spacing and radii values are constant across light/dark themes.
3. **Broad Applicability**: Semantic tokens must serve multiple use cases. If a value is unique to one component, it remains a local component variable.
4. **Layout/Spacing Separation**: Fixed dimensions (heights/widths) live in the `--layout-*` namespace; flexible rhythm lives in `--spacing-*`.

---

## Option A: Size-Graduated (The "Utility" Path)

Inspired by Material Design 3 and Tailwind's abstractions. Tokens are named by their position on a size scale.

### Philosophy
- **"Pick a Size"**: The developer thinks about magnitude, not role.
- **Low Maintenance**: Fewer tokens to govern. Minimal risk of name collision.
- **Speed**: Fastest for rapid prototyping and new component creation.

### Spacing Mappings (Option A)

| Token | Primitive | Value | Typical Usage |
|:---|:---|:---|:---|
| `--spacing-inset-lg` | `--spacing-4` | 16px | Large containers (Pages, Modals, Cards) |
| `--spacing-inset-md` | `--spacing-3` | 12px | Medium containers (Panels, Sections) |
| `--spacing-inset-sm` | `--spacing-2` | 8px | Dense containers (Toolbars, Action bars) |
| `--spacing-inset-xs` | `--spacing-1p5` | 6px | Floating UI (Popovers, Menus) |
| **`--spacing-gap-lg`** | `--spacing-4` | 16px | Vertical section rhythm, form gaps |
| **`--spacing-gap-md`** | `--spacing-3` | 12px | Moderate groups, card clusters |
| **`--spacing-gap-sm`** | `--spacing-2` | 8px | Nav items, sibling controls, button groups |
| **`--spacing-gap-xs`** | `--spacing-1` | 4px | Icon+text, label+helper pairings |

### Radii Mappings (Option A)

| Token | Primitive | Value | Typical Usage |
|:---|:---|:---|:---|
| `--radius-2xl` | `radius-2xl` | 16px | Elevated toolbars, FABs |
| `--radius-xl` | `radius-xl` | 12px | Modals, Cards, Popovers |
| `--radius-lg` | `radius-lg` | 10px | Large buttons |
| `--radius-md` | `radius-md` | 8px | Inputs, Medium buttons, Tooltips |
| `--radius-sm` | `radius-sm` | 6px | Small buttons, Badges, Chips |
| `--radius-full` | `radius-full` | 9999px | Pills, status lozenges |

### Code Example (Option A)
```css
/* Dev thinks: "This is a large container with dense internal items" */
.my-custom-panel {
  padding: var(--spacing-inset-lg);
  gap: var(--spacing-gap-sm);
  border-radius: var(--radius-xl);
}
```

---

## Option B: Role-Based (The "Expressive" Path)

Inspired by Apple HIG and high-governance design systems. Tokens are named by the architectural role they fulfill.

### Philosophy
- **"Name the Intent"**: The developer identifies the component's role first.
- **Independent Evolution**: Card padding can change at 16px while Modal padding moves to 20px without a refactor.
- **Self-Documenting**: Code reads like a technical specification.

### Spacing Mappings (Option B)

| Token | Primitive | Value | Typical Usage |
|:---|:---|:---|:---|
| `--spacing-inset-page` | `--spacing-4` | 16px | Root level page templates |
| `--spacing-inset-modal` | `--spacing-4` | 16px | Primary dialog containers |
| `--spacing-inset-card` | `--spacing-3` | 12px | Dashboard and list cards |
| `--spacing-inset-toolbar` | `--spacing-2` | 8px | System headers and toolbars |
| `--spacing-inset-popover` | `--spacing-1p5` | 6px | Menus and contextual floating UI |
| **`--spacing-gap-form`** | `--spacing-4` | 16px | Spacing between form fields/sections |
| **`--spacing-gap-stack`** | `--spacing-3` | 12px | Vertical rhythm between related groups |
| **`--spacing-gap-row`** | `--spacing-2` | 8px | Standard horizontal/vertical control gaps |
| **`--spacing-gap-inline`** | `--spacing-1` | 4px | Micro-pairings (Label → Helper) |

### Radii Mappings (Option B)

| Token | Primitive | Value | Typical Usage |
|:---|:---|:---|:---|
| `--radius-toolbar` | `radius-2xl` | 16px | High-elevation floating bars |
| `--radius-modal` | `radius-xl` | 12px | Central dialog surfaces |
| `--radius-card` | `radius-xl` | 12px | Persistent content surfaces |
| `--radius-container` | `radius-xl` | 12px | Contextual popovers and selects |
| `--radius-input` | `radius-md` | 8px | Interactive form controls |
| `--radius-button-md` | `radius-md` | 8px | Standard action triggers |
| `--radius-badge` | `radius-sm` | 6px | Status indicators and chips |
| `--radius-pill` | `radius-full` | 9999px | Rounded status lozenges |

### Code Example (Option B)
```css
/* Dev thinks: "This is a card, I will use card-specific tokens" */
.my-custom-card {
  padding: var(--spacing-inset-card);
  gap: var(--spacing-gap-row);
  border-radius: var(--radius-card);
}
```

---

## Component Pattern Stress Test

How each option handles real-world component complexity.

### 1. Buttons (Sizes & Density)

| Component Part | Option A (Size-Graduated) | Option B (Role-Based) |
|:---|:---|:---|
| **Large Button Inset** | `var(--spacing-inset-md)` | `var(--spacing-inset-button-lg)` |
| **Medium Button Inset** | `var(--spacing-inset-sm)` | `var(--spacing-inset-button-md)` |
| **Button Icon Gap** | `var(--spacing-gap-xs)` | `var(--spacing-icon-gap)` |
| **Medium Radius** | `var(--radius-md)` | `var(--radius-button-md)` |

### 2. Dropdowns & Selects (The "Control" Tier)

| Component Part | Option A (Size-Graduated) | Option B (Role-Based) |
|:---|:---|:---|
| **Trigger Padding** | `var(--spacing-inset-md)` | `var(--spacing-inset-input)` |
| **Trigger Radius** | `var(--radius-md)` | `var(--radius-input)` |
| **Popover Inset** | `var(--spacing-inset-xs)` | `var(--spacing-inset-popover)` |
| **Menu Item Inset** | `var(--spacing-inset-xs)` | `var(--spacing-inset-menu-item)` |
| **Popover Radius** | `var(--radius-xl)` | `var(--radius-container)` |

### 3. Left Navigation & Tree Views (The "Structural" Tier)

| Component Part | Option A (Size-Graduated) | Option B (Role-Based) |
|:---|:---|:---|
| **Nav Item Inset (X)**| `var(--spacing-inset-lg)` | `var(--spacing-nav-indent)` |
| **Tree Row Inset (Y)** | `var(--spacing-inset-xs)` | `var(--spacing-tree-row-y)` |
| **Tree Row Radius** | `var(--radius-sm)` | `var(--radius-tree-row)` |
| **Section Gap** | `var(--spacing-gap-md)` | `var(--spacing-gap-nav-section)` |

### 4. Tooltips & Context Menus (The "Transient" Tier)

| Component Part | Option A (Size-Graduated) | Option B (Role-Based) |
|:---|:---|:---|
| **Tooltip Inset (Y/X)** | `var(--spacing-inset-xs) var(--spacing-inset-md)` | `var(--spacing-inset-tooltip)` (Shorthand) |
| **Menu Container Inset**| `var(--spacing-inset-xs)` | `var(--spacing-inset-menu)` |
| **Menu Item Inset** | `var(--spacing-inset-xs)` | `var(--spacing-inset-menu-item)` |
| **Tooltip Radius** | `var(--radius-sm)` | `var(--radius-tooltip)` |

### 5. Modals & Complex Forms (The "Surface" Tier)

| Component Part | Option A (Size-Graduated) | Option B (Role-Based) |
|:---|:---|:---|
| **Modal Content Inset** | `var(--spacing-inset-lg)` | `var(--spacing-inset-modal)` |
| **Modal Header Inset** | `var(--spacing-inset-md) var(--spacing-inset-lg)` | `var(--spacing-inset-modal-header)` (Shorthand) |
| **ComboBox Input** | `var(--spacing-inset-md)` | `var(--spacing-inset-input)` |
| **Modal Radius** | `var(--radius-xl)` | `var(--radius-modal)` |

---

## Detailed Comparison Matrix

| Feature | Option A (Size-Graduated) | Option B (Role-Based) |
|:---|:---|:---|
| **Naming Logic** | Linear scale (lg → xs) | Structural role (page → inline) |
| **Total Tokens** | ~14 tokens | ~27+ tokens |
| **Refactor Cost** | **High**: Changing modal padding requires splitting `inset-lg` into new roles. | **Low**: Logic is pre-split; just update the token value. |
| **Dev Learning Curve** | **Low**: Familiar t-shirt sizes. | **Medium**: Must learn the "names" of layout roles. |
| **Consistency Risk** | **Moderate**: Devs might use `lg` where `md` was intended because they "look similar." | **Low**: `inset-card` is semantically tied to the card. |
| **Figma Parity** | Simple mapping of variables. | Higher fidelity; matches Figma's component-level variables. |

## Architectural Evaluation & Synthesis

Testing both options against real codebase files (`modal.css`, `tooltip.css`, `TreeView.tsx`) reveals several friction points that must inform our final decision.

### The Asymmetry Problem
Many components require asymmetric padding (different X and Y values). For example:
- Tooltips: `padding: var(--spacing-1p5) var(--spacing-3);` (6px Y, 12px X)
- Modal Headers: `padding: var(--spacing-3) var(--spacing-4);` (12px Y, 16px X)

**How the options handle this:**
- **Option A** forces developers to stitch together multiple size tokens: `padding: var(--spacing-inset-xs) var(--spacing-inset-md);`. This requires memorizing which combination yields the correct visual result.
- **Option B** allows for a dedicated shorthand token: `padding: var(--spacing-inset-tooltip);` (where the token itself is defined as `var(--spacing-1p5) var(--spacing-3)`). This is vastly superior for developer experience but requires stricter governance to prevent an explosion of highly specific tokens.

### The "Same Value, Different Intent" Problem
A Context Menu container and a Context Menu item both currently use ~6px padding (`var(--spacing-1p5)`). 
- **Option A** makes both `.menu` and `.menuItem` use `var(--spacing-inset-xs)`. If design decides menu items need more breathing room but the outer container should stay tight, Option A requires a massive search-and-replace to disconnect the two.
- **Option B** defines `--spacing-inset-menu` and `--spacing-inset-menu-item`. They share the same primitive value today, but can diverge instantly tomorrow.

### Improvements for the Final Plan
To make either plan viable, we must adjust the documentation:
1. **If Option A is chosen:** We must explicitly document how to handle asymmetric padding (e.g., standardizing on "Y-axis first" or creating a few specific micro-patterns).
2. **If Option B is chosen:** We must define strict token taxonomy boundaries. We cannot allow `--spacing-inset-modal-header-text`. We need a governance rule stating: "Tokens map to Structural Regions, not nested sub-elements."
3. **Compound Tokens:** We should consider allowing "Shorthand Tokens" for padding structures that are inherently asymmetric (like Tooltips), regardless of which core naming strategy we pick.

---

## Conclusion & Recommendation

### Choose Option A if:
- You prioritize **speed and simplicity** above all else.
- You expect the design system to remain **stable and unified** (e.g., cards and modals will always share the same density).
- You want the **smallest possible CSS footprint**.

### Choose Option B if:
- You prioritize **long-term flexibility and independent evolution**.
- You want the code to be **fully self-documenting**.
- You plan on having **multiple themes/densities** where different components might scale differently.

> [!TIP]
> **Architect's Lean**: Option B is superior for a large-scale enterprise application because it handles "the exception" more gracefully. Option A is superior for small-to-medium apps where developer friction is more important than theoretical architectural purity.
