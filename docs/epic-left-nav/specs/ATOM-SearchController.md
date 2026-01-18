# Component Spec: SearchController

## 1. Geometry & Dimensions
*   **Container Height**: 48px
*   **Padding**: `var(--spacing-s)` (12px) Horizontal | `var(--spacing-xs)` (8px) Vertical
*   **Gap (Input to Collapse)**: `var(--spacing-xs)` (8px)
*   **Collapse Button Area**: 32x32px

## 2. Visual Tokens
| Property | Value | Token Reference |
| :--- | :--- | :--- |
| **Background** | `#F9F9F9` | `--surface-bg-secondary` |
| **Border Bottom**| `1px solid #D9DFE5` | `--surface-border-tertiary` |
| **Input Background**| `#FFFFFF` | `--control-bg-primary` |
| **Input Border** | `1px solid #D9DFE5` | `--control-border-secondary` |
| **Placeholder Text**| `#606F80` | `--control-fg-placeholder` |

## 3. Sub-Atoms
### A. SearchField
*   **Icon**: 20px `search` (Material Symbols Rounded)
*   **Font**: Inter Regular 14px / 20px line-height
*   **Caret Color**: `--control-fg-theme` (Blue)

### B. CollapseTrigger
*   **Icon**: 24px `last_page`
*   **Visual**: Custom button variant (No Border, Transparent BG)
*   **Hover**: `--surface-bg-hover`

## 4. Interaction States
*   **Focus**: Input shows a `2px solid var(--control-border-theme)` ring.
*   **Collapsed Sidebar**: Component visibility: `CollapseTrigger` remains (centered), `SearchField` hiddden.
