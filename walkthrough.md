# Walkthrough – Semantic Radii Standardization

## Overview
We have standardized the radius system across the application to ensure consistent branding and macro-level design control. The system now uses a structured hierarchy that maps semantic component needs (e.g., "Input", "Action Bar") to a system scale (S/M/L) and finally to raw Figma primitives.

## Changes

### 1. Token Architecture
- **Primitive Layer (`primitives.css`)**: Updated to align with Figma. `radius-xs` is now 4px. Added `radius-3xl` and `radius-4xl`. Renamed `pill` to `full`.
- **Semantic Layer (`semantics.css`)**: Defined a full range of semantic tokens (e.g., `--radius-modal`, `--radius-toolbar`, `--radius-input`) to decouple logic from raw values.

### 2. Standardized Components
- **Toolbar (16px)**: Floating action bars now use the 16px `--radius-toolbar` token.
- **Structural (12px)**: Modals, Popovers, Menus, Cards, and Toasts are standardized to 12px using `--radius-modal`, `--radius-container`, and `--radius-card`.
- **Interactive (8px)**: Inputs and standard buttons now use `--radius-input` and `--radius-button-md`.
- **Dense/Subtle (6px)**: Status badges and small buttons use `--radius-badge` and `--radius-button-sm`.
- **Pills**: Specific status lozenges now use `--radius-pill` (mapped to 9999px).

### 3. Documentation
- Created **`docs/design-system/SEMANTIC_RADII.md`**: A comprehensive guide for developers on which tokens to use and how they map to the design system.

## Verification

### Automated
- `npm run lint`: **Passed**.
- `npm run build`: **Passed**.

### Manual Verification (Grep Audit)
- Verified that **zero** direct primitive radius tokens (e.g., `radius-md`, `radius-xl`) are used in component CSS files. 100% of components the codebase now consume the semantic layer.

### Visual Check List
- [x] **Bulk Action Bar**: Correctly rendering at 16px with 6px buttons inside.
- [x] **Input Fields**: Uniform 8px radius applied to standard inputs and selects.
- [x] **Modals/Toasts**: Standardized 12px edges.
- [x] **Status Badges**: Correctly rendering in either 6px (Regular) or Pill (Lozenge) modes.
