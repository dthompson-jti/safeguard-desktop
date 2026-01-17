# Button & Control States Specification

This document defines the architectural invariants for all button and control component states.

## Visual Border Model

### Selected State (data-active="true")

The "Selected" state applies to toggles, active filters, and panel open/close buttons.

| State    | Visual Border                                    | Tokens                                    |
|----------|--------------------------------------------------|-------------------------------------------|
| Rest     | 2px ALL sides (1px physical + 1px inset shadow)  | `--control-*-selected`                    |
| Hover    | 2px sides, 4px bottom (+2px extra emphasis)      | `--control-*-selected-hover`              |
| Pressed  | 2px sides, 4px bottom (same geometry as hover)   | `--control-*-selected-pressed`            |

### Box-Shadow Math

```css
/* REST: 2px visual all sides */
border: 1px solid var(--control-border-selected);
box-shadow: inset 0 0 0 1px var(--control-border-selected);

/* HOVER/PRESSED: 4px visual bottom */
box-shadow: 
  inset 0 0 0 1px var(--control-border-selected-hover),
  inset 0 -2px 0 0 var(--control-border-selected-hover);
```

## Required Tokens

The following tokens MUST exist in `semantics.css` for ALL themes (light, dark-a, dark-b, dark-c):

### Background
- `--control-bg-selected`
- `--control-bg-selected-hover`
- `--control-bg-selected-pressed`

### Border
- `--control-border-selected`
- `--control-border-selected-hover`
- `--control-border-selected-pressed` ⚠️ **Critical - often forgotten**

### Foreground
- `--control-fg-selected`
- `--control-fg-selected-hover`

**If ANY of these tokens are missing, the visual border model WILL BREAK silently (empty shadows).**

## FilterSelect Split Button

Filter dropdowns have special styling when in "customized" state:

### Geometry
- **Left piece (trigger)**: `border-radius: var(--radius-md) 0 0 var(--radius-md)`
- **Right piece (clear)**: `border-radius: 0 var(--radius-md) var(--radius-md) 0`
- **Gap between pieces**: `2px`

### Transitions
- State changes are **INSTANT** (`transition: none`)
- Hover/pressed feedback uses CSS pseudo-classes only

### Chevron Color
- In selected state, the chevron icon inherits `var(--control-fg-selected)`

## Files Modified

- `src/styles/buttons.css` - Global button states
- `src/styles/semantics.css` - Token definitions
- `src/desktop/components/FilterSelect.module.css` - Filter split button
- `src/components/Select.module.css` - Base dropdown trigger

## Debugging Tips

1. **Silent shadow failure**: Check if `--control-border-selected-pressed` exists in semantics.css
2. **Wrong colors on hover**: Check CSS specificity - variant styles may have `!important`
3. **Wrong radius**: Check split button geometry rules above
