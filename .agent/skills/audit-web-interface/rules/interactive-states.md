# Interactive States Rules

Rules for hover, active, and focus states on interactive elements.

## Visual Feedback Required

All interactive elements need visual feedback on interaction states.

**Incorrect:**
```css
.button {
  background: var(--bg-secondary);
}
/* No hover/active states defined */
```

**Correct:**
```css
.button {
  background: var(--bg-secondary);
}

.button:hover {
  background: var(--bg-secondary-hover);
}

.button:active {
  background: var(--bg-secondary-active);
}
```

## Contrast Progression

Interactive states should typically increase contrast relative to the previous state. This applies to each visual dimension independently:

| Dimension | Rest → Hover → Active |
|:----------|:----------------------|
| Background | Typically increases contrast |
| Foreground | Typically increases contrast |
| Border | Typically increases contrast |

> **Note:** This is a guideline, not an absolute rule. Context matters—some designs intentionally reduce an element's prominence on interaction.

## Focus States

Focus must always be visible. See [accessibility.md](accessibility.md#focus-states) for focus rules.

## Safe Areas & Layout

- Full-bleed layouts need `env(safe-area-inset-*)` for notches
- Use flex/grid over JS measurement for layout
- Set `overflow-x-hidden` on containers to avoid unwanted scrollbars

## Touch Interaction Details

- Set `-webkit-tap-highlight-color` intentionally (transparent or themed)
- During drag operations: disable text selection, use `inert` on dragged elements
