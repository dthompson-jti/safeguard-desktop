# Implementation Plan - Standardize Semantic Radii

Standardize the radii system across the Safeguard Desktop application using a component-based semantic mapping, aligned with the latest Figma design tokens.

## Final Semantic Mapping Structure

The system maps through three layers:
**Semantic Token** (Intent) -> **System Scale** (S/M/L) -> **Primitive** (Figma Variable).

| Category | Semantic Token | Scale | Primitive | Value |
| :--- | :--- | :--- | :--- | :--- |
| **Toolbar** | `--radius-toolbar` | XXL | `radius-2xl` | 16px |
| **Structural** | `--radius-modal` | XL | `radius-xl` | 12px |
| | `--radius-container` | XL | `radius-xl` | 12px |
| | `--radius-card` | XL | `radius-xl` | 12px |
| **Input** | `--radius-input` | MD | `radius-md` | 8px |
| **Button** | `--radius-button-lg` | LG | `radius-lg` | 10px |
| | `--radius-button-md` | MD | `radius-md` | 8px |
| | `--radius-button-sm` | SM | `radius-sm` | 6px |
| | `--radius-button-xs` | SM | `radius-sm` | 6px |
| **Status** | `--radius-badge` | SM | `radius-sm` | 6px |
| | `--radius-pill` | MAX | `radius-full` | 9999px |
| **Utility** | `--radius-tooltip` | MD | `radius-md` | 8px |

## Completed Task Status

- [x] Defined semantic tokens in `src/styles/semantics.css`.
- [x] Aligned primitive values in `src/styles/primitives.css` with Figma (radius-xs: 4px).
- [x] Created developer documentation in `docs/design-system/SEMANTIC_RADII.md`.
- [x] Standardized `Modal`, `Popover`, and `Menu` containers.
- [x] Standardized `Input`, `Select`, and `ComboBox` fields.
- [x] Standardized all `Button` size variants.
- [x] Standardized `Badge`, `Chip`, and `Lozenge` components.
- [x] Updated floating action bar to use `radius-toolbar` (16px).
- [x] Updated action bar buttons to use standard semantic tokens.

## Verification
- Inspect the UI to ensure toolbars (16px), modals (12px), and inputs (8px) follow the new hierarchy.
