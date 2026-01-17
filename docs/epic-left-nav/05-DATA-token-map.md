# Data: Token Remapping (The Rosetta Stone)
*Living document. Populated during Phase 3 of the Left Navigation Epic.*

## 1. Surfaces & Containers
| Figma Label / Hex | Context | Primitive Match (Legacy) | Semantic Candidate | Dark Mode Verification | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `#EAEAEA` | Sidebar Background | `grey-70` / `grey-80` | `--surface-bg-secondary` (`grey-20`) | **OK**: Maps to `grey-950` in Dark A, `grey-900` in Dark B. | **MAP (Visual Change)**: Modernizes to a lighter, cleaner grey (#F9F9F9). |
| `bg-sunken` | Nav Item Active Bg | `grey-50` / `grey-100` | `--surface-bg-active` (`grey-50`) | **OK**: Maps to `grey-800`. Creates correct contrast vs Sidebar. | **MAP** |
| `bg-elevated` | Search Input Bg | `white` | `--control-bg-primary` (`white`) | **OK**: Maps to `grey-800` (Dark A). | **MAP** |

## 2. Controls & Interactive Elements
| Figma Label / Hex | Context | Primitive Match (Legacy) | Semantic Candidate | Dark Mode Verification | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `#223a58` | Nav Item Text (Default) | `~grey-800` (Blue tint) | `--surface-fg-secondary` (`grey-700`) | **OK**: Maps to `grey-300`. | **MAP (Migrate to Grey)**: Removing legacy blue tint for standard text. |
| `#606f80` | Search Placeholder | `grey-500` | `--control-fg-placeholder` (`grey-500`) | **OK**: Maps to `grey-500`. | **MAP** |
| `#1c2f46` | Search Input Text | `grey-900` (Blue tint) | `--control-fg-primary` (`grey-900`) | **OK**: Maps to `grey-50`. | **MAP** |
| `blue-500` | Nav Item Active Border | `blue-500` | `--surface-border-theme` (`theme-500`) | **OK**: Maps to `theme-500` (Brand). | **MAP**: Semantic "Brand" selection. |
| `Focus Blink` | Focus Cursor | N/A | `--control-fg-theme` (Caret) | **OK**: Standard system behavior. | **MAP** |

## 3. Typography & Icons
| Figma Label / Font | Context | Codebase Match | Decision |
| :--- | :--- | :--- | :--- |
| `Segoe UI Semibold` | Section Header | `Inter Semibold` (600) | **MAP**: Standardize font family. |
| `Segoe UI Semibold` | Nav Item Label | `Inter Semibold` (600) | **MAP**: Standardize font family. |
| `Segoe UI Semilight` | Search Placeholder | `Inter Regular` (400) | **MAP**: Boost weight for readability/a11y (350 -> 400). |
| `20px` | Standard Nav Icon | `--icon-size-md` (20px) | **MAP** |
| `24px` | Search Icon | `--icon-size-lg` (24px) | **MAP** |
| `4px` | Icon-Text Gap | `--spacing-1` (4px) | **MAP** |

## 4. Gap Analysis
| Discrepancy detected | Proposed Solution | Status |
| :--- | :--- | :--- |
| **Legacy Text Color**: `#223a58` (Blue-Grey) vs System `grey-700` | **Adopt System**: The new Design System deprecates blue-tinted greys for standard UI text. | **CLOSED** (Migrating) |
| **Section Header Font**: 20px vs 16px | **Adopt 16px**: Validated against node `274:3934`. | **CLOSED** (Resolved in Audit) |
| **Focus Ring**: Double Border (Offset) | **Custom CSS**: Use `box-shadow` or pseudo-element to look like Double Ring. | **OPEN** (Handle in Implementation) |
