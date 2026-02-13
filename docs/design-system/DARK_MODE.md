# Journal Design System: Dark Mode Specification

This document defines the architectural principles and token mappings for the dark mode implementations of the Journal Design System.

## 1. Core Philosophy: Elevation = Lightness

In dark environments, depth is communicated by increasing the lightness of a surface as it moves closer to the user (higher elevation). This mirrors physical light falling on raised objects.

### The Elevation Stack (Dark C Standard)

| Elevation | Role | Primitive | Hex | OKLCH L |
| :--- | :--- | :--- | :--- | :--- |
| **Level 0** | Body Background | `grey-950` | `#0A0C12` | ~6% |
| **Level 1** | Layout Panels (e.g., Sidebar) | `grey-940` | `#0E1017` | ~8% |
| **Level 2** | Elevated Surfaces (e.g., Cards) | `grey-910` | `#161A24` | ~14% |
| **Level 3** | Overlays (e.g., Modals, Popovers) | `grey-860` | `#202531` | ~20% |

## 2. Status Color Transformation Matrix

To maintain accessible contrast (WCAG AA 4.5:1) and visual vibrancy, status colors must shift horizontally across the palette when moving from light to dark modes.

### The "Shift to 400" Rule
While light mode typically uses **700-series** primitives for foreground text, dark mode should adopt the **400-series** or custom high-chromacity OKLCH values.

| Intent | Light Mode FG | Dark Mode FG | Rationale |
| :--- | :--- | :--- | :--- |
| **Alert/Error** | `red-700` | `red-400` | Vividness + Contrast |
| **Warning** | `yellow-700` | `yellow-400` | Pops against deep greys |
| **Success** | `green-700` | `green-400` | Avoids muddy appearance |
| **Info** | `blue-700` | `blue-400` | Maintains brand recognition |

## 3. Interactive State Logic

Dark mode requires tighter control over hover and pressed states to prevent "glowing" or "fading" effects that feel inconsistent with the material model.

### Control Overrides
| State | Strategy | Primitive Pair |
| :--- | :--- | :--- |
| **Rest** | Baseline Surface | `grey-860` |
| **Hover** | Lighten (Move up stack) | `grey-840` |
| **Pressed** | Darken (Move down stack) | `grey-880` |

### On-Solid Pattern
For components using solid brand backgrounds (`theme-800`), use `grey-50` for foreground text instead of pure white to reduce eye strain (visual vibration).

## 4. Shadow & Depth Strategy

Standard black shadows are invisible against `grey-950`.
*   **Strategy**: Use **increased opacity** for standard shadows (e.g., `rgba(0,0,0,0.5)`) and rely on **subtle borders** (`surface-border-tertiary` / `grey-880`) to define edges.
*   **Glow Effects**: High-elevation elements (Toasts, Modals) may use a subtle colored glow (e.g., `shadow-color-brand` at 15% opacity) to reinforce elevation.

## 5. Implementation Strategy

The design system standardizes on a single **Dark Mode** (`dark`) based on high-fidelity elevation principles.

### Migration Logic
For backward compatibility with legacy themes (`dark-a`, `dark-b`, `dark-c`), use the central `useTheme.ts` hook which automatically migrates legacy values to the standard `dark` theme.

## 6. Audit & Compliance

To ensure accessibility standards are maintained during iterative development, the system includes automated auditing infrastructure.

### Automated Contrast Auditing
The `contrast_audit.cjs` script statically analyzes `semantics.css` to verify that semantic pairs (e.g., `fg-primary` on `bg-primary`) meet the **4.5:1** WCAG AA threshold in every theme.

**Execution:**
```bash
node contrast_audit.cjs
```

### Visual Verification
When implementing new components in dark mode, developers must verify:
- **No pure blacks**: Except for specific OLED optimization (`dark-b`).
- **No pure whites**: Use `grey-50` for text to reduce visual vibration.
- **Color Bleed**: Verify that status colors do not "bleed" into neighboring tokens due to high chroma.

---
*Implementation Note: All theme overrides are located in `src/styles/semantics.css` within `[data-theme='...']` selector blocks.*
