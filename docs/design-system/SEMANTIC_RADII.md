# Semantic Radii Tokens

This document outlines the standardized radii system for the Safeguard Desktop application. It maps semantic component needs to a system scale, which is then mapped to raw design primitives from Figma.

## Design Philosophy

The application uses rounded corners to create a friendly, approachable, and modern interface. Radii are categorized by component type and "elevation" logic.

- **Toolbars (16px)**: High-elevation "objects" (Action Bars) that sit above the UI.
- **Structural (12px)**: Root-level boundaries (Modals, Cards, Panels).
- **Interactive (8px)**: Standard touch-points (Inputs, Buttons, Tooltips).
- **Dense/Subtle (6px)**: Nested or high-density elements (Badges, Small Buttons).

---

## Radius Mapping Hierarchy

The following table shows the full hierarchy from semantic intent to raw pixel values, aligned with the latest Figma design tokens.

| Semantic Token | System Scale | Primitive Step | Pixel Value |
| :--- | :--- | :--- | :--- |
| **`--radius-toolbar`** | XXL | `radius-2xl` | 16px |
| **`--radius-container`** | XL | `radius-xl` | 12px |
| **`--radius-modal`** | XL | `radius-xl` | 12px |
| **`--radius-card`** | XL | `radius-xl` | 12px |
| **`--radius-button-lg`** | LG | `radius-lg` | 10px |
| **`--radius-input`** | MD | `radius-md` | 8px |
| **`--radius-button-md`** | MD | `radius-md` | 8px |
| **`--radius-tooltip`** | MD | `radius-md` | 8px |
| **`--radius-button-sm`** | SM | `radius-sm` | 6px |
| **`--radius-button-xs`** | SM | `radius-sm` | 6px |
| **`--radius-badge`** | SM | `radius-sm` | 6px |
| **`--radius-pill`** | MAX | `radius-full` | 9999px |

---

## Component Definitions

### Overlays & Containers
- **`--radius-toolbar`**: High-priority floating action bars and toolbars.
- **`--radius-modal`**: Large system dialogs and focus-traps.
- **`--radius-container`**: Transient floating UI like Popovers and Menus.
- **`--radius-card`**: Persistent structural panels, dashboard cards, and sidebars.

### Form & Interaction
- **`--radius-input`**: All standard data entry (Text inputs, Selects, ComboBoxes).
- **`--radius-button-[xs/sm/md/lg]`**: Buttons of varying sizes, ensuring visual weight matches scale.

### Feedback & Status
- **`--radius-badge`**: Standard regular mode for chips and resident status labels.
- **`--radius-pill`**: Used for high-contrast "pill" status indicators.
- **`--radius-tooltip`**: Small read-only contextual overlays.

---

## Implementation Rules

1. **Never use Primitives directly**: Always use the semantic tokens in component CSS.
2. **Size Pairing**: Components scaled to `sm` height should generally use `--radius-button-sm`.
3. **Pill Mode**: Use `--radius-pill` only when the design explicitly calls for a fully rounded shape (e.g. status lozenges).
