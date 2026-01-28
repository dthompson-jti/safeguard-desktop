# SPEC: Toast Styling

This document provides a detailed technical specification for the Toast component styling, adhering to the project's design system and token architecture.

## 1. Common Internal Layout (Shared Across All Variants)

The internal layout of the Toast is consistent regardless of the semantic variant. It is designed to be high-contrast, readable, and perfectly aligned.

### Container (Viewport & Root)
| Property | Semantic Token Path | Primitive Token Path | Primitive Value |
| :--- | :--- | :--- | :--- |
| **Positioning** | N/A (Fixed) | N/A | Bottom Right |
| **Min Width** | N/A | N/A | 320px |
| **Max Width** | N/A | N/A | 440px |
| **Padding** | `var(--spacing-3)` | `N/A` | `0.75rem` (12px) |
| **Border Radius** | `var(--radius-lg)` | `N/A` | `0.625rem` (10px) |
| **Gap** | `var(--spacing-3)` | `N/A` | `0.75rem` (12px) |
| **Depth/Shadow** | `var(--surface-shadow-xl)` | `N/A` | `0 8px 10px -4px #0A0C1214, 0 16px 24px -8px #0A0C1207, 0 0 1px 0 #0A0C120A` |
| **Z-Index** | `var(--z-toast)` | `N/A` | `9999` |

### Internal Content Alignment
*   **Vertical Alignment**: Centered (`align-items: center`)
*   **Breadth Alignment**: Flex-end (in viewport) to align to the right edge.
*   **Content Gap**: `var(--spacing-1)` (4px) between Title and Description.

## 2. Common Foreground & Border Styling

Foreground elements (text and icons) use a high-contrast pattern for maximum visibility on solid semantic backgrounds.

### Typography & Iconography
| Element | Property | Semantic Token Path | Primitive Token Path | Primitive Value |
| :--- | :--- | :--- | :--- | :--- |
| **Icon** | **Color** | `--surface-fg-on-solid` | `--primitives-base-white` | `#FFFFFF` |
| | **Size** | `--icon-size-lg` | `N/A` | `1.5rem` (24px) |
| **Title** | **Color** | `--surface-fg-on-solid` | `--primitives-base-white` | `#FFFFFF` |
| | **Font Size** | `--font-size-sm` | `N/A` | `0.875rem` (14px) |
| | **Font Weight** | `--font-weight-semibold` (implied) | `N/A` | `600` |
| **Description**| **Color** | `--surface-fg-on-solid` | `--primitives-base-white` | `#FFFFFF` |
| | **Font Size** | `--font-size-sm` | `N/A` | `0.875rem` (14px) |
| | **Font Weight** | `--font-weight-regular` (implied) | `N/A` | `400` |
| **Action Link**| **Color** | `--surface-fg-on-solid` | `--primitives-base-white` | `#FFFFFF` |
| | **Decoration** | N/A | N/A | Underline (Offset 4px) |
| **Close Button**| **Color** | `--surface-fg-on-solid` | `--primitives-base-white` | `#FFFFFF` |

## 3. Semantic Variations (BG / Border Tokens)

The semantic variants differ only in their background and border colors, using "Solid" tokens for maximum visual impact.

| Variant | Property | Semantic Token Path | Primitive Token Path | Primitive Value |
| :--- | :--- | :--- | :--- | :--- |
| Success | **Background** | `--surface-bg-success-solid` | `--primitives-green-600` | `#0D935A` |
| | **Border** | N/A | N/A | `rgba(0, 0, 0, 0.1)` |
| **Alert** | **Background** | `--surface-bg-error-solid` | `--primitives-red-600` | `#D63230` |
| | **Border** | N/A | N/A | `rgba(0, 0, 0, 0.1)` |
| **Warning** | **Background** | `--surface-bg-warning-solid` | `--primitives-yellow-600` | `#C45500` |
| | **Border** | N/A | N/A | `rgba(0, 0, 0, 0.1)` |
| **Info** | **Background** | `--surface-bg-info-solid` | `--primitives-blue-600` | `#0085C9` |
| | **Border** | N/A | N/A | `rgba(0, 0, 0, 0.1)` |

---
> [!NOTE]
> All measurements in `rem` are based on a 16px base font size.
> Animation logic is handled via Framer Motion with the `spring` preset (400 stiffness, 30 damping).
