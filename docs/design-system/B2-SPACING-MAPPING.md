# FINAL MAPPING: B2 Role-Based Spacing & Radii (Control & Surface)

This document formalizes the **Option B2** strategy for the Journal Design System, synchronized with existing color token nomenclature (`control`, `surface`). 

---

## 1. Mapping by Component
*How to style specific UI elements.*

### Interactive Controls (The `control` Family)
| Component | Inset Padding Token | Radius Token | Internal Gap Token |
| :--- | :--- | :--- | :--- |
| **Primary Button** | `--spacing-inset-control-standard` | `--radius-control-action` | `--spacing-gap-control-icon` |
| **Secondary Button** | `--spacing-inset-control-standard` | `--radius-control-action` | `--spacing-gap-control-icon` |
| **Text Input** | `--spacing-inset-control-input` | `--radius-control-input` | `--spacing-gap-control-icon` |
| **Search Box** | `--spacing-inset-control-input` | `--radius-control-input` | `--spacing-gap-control-icon` |
| **Select Trigger** | `--spacing-inset-control-input` | `--radius-control-input` | `--spacing-gap-control-icon` |
| **ComboBox** | `--spacing-inset-control-input` | `--radius-control-input` | `--spacing-gap-control-icon` |

### Block Rows (The `listrow` Family)
| Component | Inset Padding Token | Radius Token | Internal Gap Token |
| :--- | :--- | :--- | :--- |
| **Left Nav Item** | `--spacing-inset-listrow-relaxed` | `--radius-listrow` | `--spacing-gap-listrow-icon` |
| **Tree View Row** | `--spacing-inset-listrow-compact` | `--radius-listrow` | `--spacing-gap-listrow-icon` |
| **Context Menu Item** | `--spacing-inset-listrow-dense` | `--radius-listrow` | `--spacing-gap-listrow-icon` |
| **Table Header Cell**| `--spacing-inset-listrow-header` | N/A | `--spacing-gap-listrow-icon` |
| **Table Body Cell** | `--spacing-inset-listrow-relaxed` | N/A | `--spacing-gap-listrow-icon` |

### Structural Surfaces (The `surface` Family)
| Component | Inset Padding Token | Radius Token | Visual Rhythm Gap |
| :--- | :--- | :--- | :--- |
| **Modal Content** | `--spacing-inset-surface-body` | `--radius-surface-elevated` | `--spacing-gap-surface-flow` |
| **Side Panel** | `--spacing-inset-surface-body` | N/A | `--spacing-gap-surface-flow` |
| **Detail Card** | `--spacing-inset-surface-card` | `--radius-surface-flat` | `--spacing-gap-surface-card` |
| **Adv. Search Panel** | `--spacing-inset-surface-body` | N/A | `--spacing-gap-surface-group` |
| **Tooltip / Popover**| `--spacing-inset-surface-floating` | `--radius-surface-floating` | N/A |
| **Context Menu** | `--spacing-inset-surface-floating` | `--radius-surface-floating` | N/A |

---

## 2. Mapping by Token Type
*Typical targets for each token.*

### Inset Padding Tokens (`--spacing-inset-*`)
| Token Type | Target Components | Sizing Context |
| :--- | :--- | :--- |
| **`control-standard`** | Buttons (Primary, Secondary, Ghost) | Symmetric, tap-friendly |
| **`control-input`** | Text Input, Search Bar, Select Trigger | Asymmetric, cursor-optimized |
| **`listrow-relaxed`** | Table Rows, Left Nav Items | Comfortable vertical stacking |
| **`listrow-compact`** | Tree View Rows, Sparse Lists | Tighter vertical stacking |
| **`listrow-dense`** | Context Menu Items, Sub-navigation | Maximal density |
| **`surface-body`** | Modals, Side Panels, App Shell | Edge-to-edge container wall |
| **`surface-card`** | Dashboard Cards, Content Blocks | In-set surface container |
| **`surface-floating`** | Tooltips, Popovers, Flyout Menus | Transient overlay breathing room |

### Radius Tokens (`--radius-*`)
| Token Type | Target Components | Visual Effect |
| :--- | :--- | :--- |
| **`control-action`** | Buttons | High interactivity (Rounded) |
| **`control-input`** | Inputs, Selects | Form structure (Squared-Rounded) |
| **`listrow`** | Nav/List items (hover/active state) | Selection intent |
| **`surface-elevated`**| Modals, Sheets | Dimensional depth |
| **`surface-floating`**| Tooltips, Popovers | Minimal overlay depth |
| **`surface-flat`** | Cards, Content blocks | Flat surface boundary |

### Gap & Rhythm Tokens (`--spacing-gap-*`)
| Token Type | Usage Context | Layout Logic |
| :--- | :--- | :--- |
| **`control-icon`** | Inside a Button or Input | Icon + Text pairing |
| **`listrow-icon`** | Inside a Table/Tree row | Icon + Lead Text pairing |
| **`surface-flow`** | Inside a Modal or Panel | Vertical reading rhythm |
| **`surface-group`** | Between form fields or related groups | Sibling proximity |
| **`surface-card`** | Inside a Content Card | Item cluster rhythm |
