# Journal Design System: Tokens

The token architecture maps primitives to semantic roles. This document details the specific categories available in the system.

## 1. Primitives
*   **Definition**: Raw values (e.g., `grey-100`, `spacing-4`).
*   **Usage**: Reserved for defining semantics. Do not use generally.

## 2. Semantic Categories

### Surface
Structural elements that establish context.

| Category | Token Pattern | Examples |
| :--- | :--- | :--- |
| **Background** | `--surface-bg-*` | `primary` (Base), `secondary` (Panel), `tertiary` (Card) |
| **Border** | `--surface-border-*` | `primary` (Standard), `secondary` (Subtle) |
| **Foreground** | `--surface-fg-*` | `primary` (Headings), `secondary` (Body) |

### Control
Interactive elements that signal action.

| Category | Token Pattern | Examples |
| :--- | :--- | :--- |
| **Background** | `--control-bg-*` | `theme` (Primary Action), `secondary` (Ghost) |
| **Foreground** | `--control-fg-*` | `on-solid` (White text), `primary` (Dark text) |

## 3. Unit Strategy

*   **Rem Units**: Used for spacing and typography (16px baseline).
    *   `1rem` = `16px`
    *   `0.25rem` = `4px`
*   **Pixel Units**: Allowed for specific border rendering constraints.

> [!TIP]
> Always convert design pixels to rems for layout properties to support accessibility settings.
