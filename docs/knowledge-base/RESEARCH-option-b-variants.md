# Option B Variants: Balancing Semantics and Re-use

If we adopt **Option B (Role-Based Naming)**, the core challenge is "Token Proliferation." A rigorous 1:1 mapping of Figma components to CSS variables can yield hundreds of highly specific tokens. 

To mitigate this, Option B can be scaled across three different architectural variants. This document maps them exhaustively against real project components.

---

## Variant B1: Strict Component Mapping (1:1)

Every distinct UI component gets its own dedicated token namespace. If it has a different name in Figma or React, it has a different set of tokens.

**Philosophy**: "Name the exact React Component."

### Component Mapping Stress Test (B1)

| Component Area | Inset Padding | Radius | Gap / Internal Rhythm |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-button-primary` | `--radius-button-primary` | `--spacing-gap-button-icon` |
| **Secondary Button**| `--spacing-inset-button-secondary`| `--radius-button-secondary`| `--spacing-gap-button-icon` |
| **Text Input** | `--spacing-inset-text-input` | `--radius-text-input` | `--spacing-gap-input-icon` |
| **ComboBox Input** | `--spacing-inset-combobox` | `--radius-combobox` | `--spacing-gap-combobox` |
| **Select Trigger** | `--spacing-inset-select` | `--radius-select` | `--spacing-gap-select` |
| **Search Box** | `--spacing-inset-search` | `--radius-search` | `--spacing-gap-search` |
| **Tree View Row** | `--spacing-inset-tree-row` | `--radius-tree-row` | `--spacing-gap-tree-icon` |
| **Left Nav Item** | `--spacing-inset-nav-item` | `--radius-nav-item` | `--spacing-gap-nav-icon` |
| **Table Header** | `--spacing-inset-table-header` | N/A | `--spacing-gap-th-icon` |
| **Table Row** | `--spacing-inset-table-row` | N/A | `--spacing-gap-td-icon` |
| **Tooltip** | `--spacing-inset-tooltip` | `--radius-tooltip` | N/A |
| **Context Menu** | `--spacing-inset-context-menu` | `--radius-context-menu` | N/A |
| **Context Item** | `--spacing-inset-context-item` | `--radius-context-item` | `--spacing-gap-context-icon` |
| **Modal Content** | `--spacing-inset-modal-content` | `--radius-modal-container`| `--spacing-gap-modal-flow` |
| **Side Panel Content**| `--spacing-inset-side-panel` | N/A | `--spacing-gap-panel-flow` |
| **Adv. Search Panel** | `--spacing-inset-adv-search` | N/A | `--spacing-gap-adv-search` |

### Tradeoffs
- **Pros**: Ultimate independent evolution. If a ComboBox needs 1px more padding than a Select, it can be updated instantly without affecting anything else. Matches React prop models perfectly.
- **Cons**: Massive token duplication. Text Inputs, Selects, and ComboBoxes are functionally identical in their container dimensions 99% of the time, meaning we maintain 3 duplicate tokens pointing directly to `--spacing-3`. This creates a heavy maintenance burden.

---

## Variant B2: Abstracted Component Families (The "DNA" Model)

Instead of naming tokens after *specific React components*, we name them after the **Architectural Class** or **Interaction Pattern** they belong to. We group components by their structural DNA.

**Philosophy**: "Name the Structural Role, not the Component."

### The Three Core Families
1. **Control**: Interactive targets living *within* surfaces (Inputs, Buttons, Selects, TextAreas).
2. **Surface**: Containers holding other UI logic (Modals, Panels, Menus, Tooltips).
3. **ListRow**: Interactive, full-width block elements used for navigation or selection (TreeRows, NavItems, ContextItems).

### Component Mapping Stress Test (B2)

| Component Area | Inset Padding | Radius | Gap / Internal Rhythm |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-control-md` | `--radius-control-md` | `--spacing-icon-gap-control` |
| **Secondary Button**| `--spacing-inset-control-md` | `--radius-control-md` | `--spacing-icon-gap-control` |
| **Text Input** | `--spacing-inset-control-md` | `--radius-control-md` | `--spacing-icon-gap-control` |
| **ComboBox Input** | `--spacing-inset-control-md` | `--radius-control-md` | `--spacing-icon-gap-control` |
| **Select Trigger** | `--spacing-inset-control-md` | `--radius-control-md` | `--spacing-icon-gap-control` |
| **Search Box** | `--spacing-inset-control-md` | `--radius-control-md` | `--spacing-icon-gap-control` |
| **Tree View Row** | `--spacing-inset-listrow-compact` | `--radius-listrow` | `--spacing-icon-gap-listrow` |
| **Left Nav Item** | `--spacing-inset-listrow-relaxed` | `--radius-listrow` | `--spacing-icon-gap-listrow` |
| **Context Item** | `--spacing-inset-listrow-dense` | `--radius-listrow` | `--spacing-icon-gap-listrow` |
| **Table Row** | `--spacing-inset-listrow-relaxed` | N/A | `--spacing-icon-gap-listrow` |
| **Table Header** | `--spacing-inset-surface-header` | N/A | `--spacing-icon-gap-listrow` |
| **Tooltip** | `--spacing-inset-surface-floating` | `--radius-surface-floating`| N/A |
| **Context Menu** | `--spacing-inset-surface-floating` | `--radius-surface-floating`| N/A |
| **Modal Content** | `--spacing-inset-surface-body` | `--radius-surface-elevated`| `--spacing-gap-flow` |
| **Side Panel** | `--spacing-inset-surface-body` | N/A | `--spacing-gap-flow` |
| **Adv. Search Panel** | `--spacing-inset-surface-flat` | N/A | `--spacing-gap-group` |

### Code Example (Variant B2)

```css
/* Input.module.css */
.textInput {
  padding: var(--spacing-inset-control-md);
  border-radius: var(--radius-control-md);
}

/* Select.module.css */
.selectTrigger {
  /* Shares the exact same tokens as Input because they are both 'Controls' */
  padding: var(--spacing-inset-control-md);
  border-radius: var(--radius-control-md);
}

/* Modals and Menus share "surface" logic but diverge on elevation types */
.popoverMenu { padding: var(--spacing-inset-surface-floating); }
.modalBody   { padding: var(--spacing-inset-surface-body); }
```

### Tradeoffs
- **Pros**: **The Architectural Sweet Spot**. Drastically reduces token count while maintaining high semantic meaning. Form Inputs and Selects evolve *together* as a family. Solves asymmetric padding uniquely per component family (a `control` inset can be `8px 12px`, while a `surface-floating` inset is `6px 12px`).
- **Cons**: Requires strong up-front architectural thinking. Developers must know the taxonomy ("Is a Tree Row a 'Control' or a 'ListRow'?").

---

## Variant B3: Hybrid "Role + Size" (The Extensible Model)

A middle ground where the base tokens use Role-Based families (B2), but we allow explicit size/component modifiers *only* when a component breaks the mold.

**Philosophy**: "Standardize the family, allow overrides for the individual exception."

### Structure
`--[property]-[family]-[size_or_component]`

### Component Mapping Stress Test (B3)

| Component Area | Inset Padding | Radius | Gap / Internal Rhythm |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-control` | `--radius-control` | `--spacing-icon-gap-control` |
| **Search Box** | `--spacing-inset-control-search` | `--radius-control` | `--spacing-icon-gap-control` |
| **Standard Input** | `--spacing-inset-control` | `--radius-control` | `--spacing-icon-gap-control` |
| **Left Nav Item** | `--spacing-inset-listrow-nav` | `--radius-listrow` | `--spacing-icon-gap-listrow` |
| **Tree View Row** | `--spacing-inset-listrow-tree` | `--radius-listrow` | `--spacing-icon-gap-listrow` |
| **Table Row** | `--spacing-inset-listrow-table` | N/A | `--spacing-icon-gap-listrow` |
| **Context Menu** | `--spacing-inset-surface-flyout`| `--radius-surface-flyout`| N/A |
| **Modal Content** | `--spacing-inset-surface-modal`| `--radius-surface-modal`| `--spacing-gap-flow` |
| **Side Panel** | `--spacing-inset-surface-panel`| N/A | `--spacing-gap-flow` |
| **Adv. Search Panel** | `--spacing-inset-surface-inline`| N/A | `--spacing-gap-group` |

### Tradeoffs
In B3, we use family names as the baseline (`--radius-control`), but when Left Navs, Tree Views, or Search Boxes need different horizontal insets, we append the specific component name (`-nav`, `-tree`, `-search`) instead of trying to force them into an abstract density (`-relaxed`, `-compact`).

This is highly pragmatic, allowing specific component styling without duplicating the shared properties (like radius).

---

## Synthesis & Recommendation

**Variant B2 (Abstracted Component Families)** is the industry best-practice for high-craft, at-scale enterprise systems (mirroring structures seen in GitHub Primer or Atlassian Design tokens). 

By grouping `Inputs`, `Dropdowns`, `TextAreas`, and `DatePickers` into a single `--*-control-md` semantic concept, you guarantee that forms look cohesive without having to manually sync 5 different component files every time a designer decides to tweak padding by 2px in Figma. 

**Variant B3** is an acceptable fallback if developers struggle with abstract density names (`listrow-dense` vs `listrow-compact`) and prefer explicitly noting the component exception (`listrow-nav`).
