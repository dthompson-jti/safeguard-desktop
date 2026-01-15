# SPEC-SPACING: Spacing System

This document defines the spacing system used throughout the application to ensure consistent margins, padding, and layout alignment.

## Core Principles

1.  **Token-Based Spacing**: Never use hardcoded pixel or rem values for margins, padding, or gaps. Always use the `--spacing-*` tokens.
2.  **Parent-Managed Spacing**: Prefer using `gap` on flex or grid containers to manage spacing between children, rather than individual margins on children.
3.  **Symmetric Scaling**: Use tokens that scale predictably (base 4px) to maintain a consistent rhythm.

## Spacing Token Scale

| Token | Pixels | Rem | Use Case |
| :--- | :--- | :--- | :--- |
| `--spacing-0` | 0px | 0 | No spacing |
| `--spacing-0p25` | 1px | - | Hairline borders, fine adjustments |
| `--spacing-0p5` | 2px | 0.125rem | Micro-spacing, focus-ring offsets |
| `--spacing-1` | 4px | 0.25rem | Tight spacing, item internal gaps |
| `--spacing-1p5` | 6px | 0.375rem | Small buttons, chip gaps |
| `--spacing-2` | 8px | 0.5rem | Standard internal padding (Compact) |
| `--spacing-3` | 12px | 0.75rem | Desktop internal padding, list gaps |
| `--spacing-4` | 16px | 1rem | Standard page padding (Comfortable) |
| `--spacing-5` | 20px | 1.25rem | Section spacing |
| `--spacing-6` | 24px | 1.5rem | Large section spacing |
| `--spacing-8` | 32px | 2rem | Hero internal padding |
| `--spacing-10` | 40px | 2.5rem | External margin between cards |

## Usage Guidelines

### 1. Chrome vs. Content
- **Chrome (Headers, Side Navs)**: Typically uses `var(--spacing-2)` or `var(--spacing-3)` for high density.
- **Content (Main Scroll Area)**: Typically uses `var(--spacing-4)` to give elements breathing room.

### 2. Form Layouts
Standard vertical gap between form fields is `var(--spacing-4)`.
```css
.formGrid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
```

### 3. List Item Internal Spacing
Standard list items use `var(--spacing-4)` horizontal padding and `var(--spacing-2)` or `var(--spacing-3)` vertical padding.

## Reference
Tokens are defined in `src/styles/primitives.css`.
