# Animation Rules

Rules for performant, accessible animations.

## Compositor-Friendly Properties

Only animate `transform` and `opacity` for 60fps performance.

**Incorrect:**
```css
.card {
  transition: all 0.3s ease;
}
```

**Correct:**
```css
.card {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```

## Reduced Motion

Honor `prefers-reduced-motion` for accessibility.

**Implementation:**
```css
.animated-element {
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```

## SVG Transforms

Apply transforms to `<g>` wrapper, not SVG element directly.

**Correct:**
```css
.svg-icon g {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.2s ease;
}
```

## Interruptibility

Animations must respond to user input mid-animation. Avoid long, uninterruptible sequences.

## Anti-patterns

- `transition: all` — list properties explicitly
- Missing `transform-origin`
- Animating layout properties (`width`, `height`, `margin`)
- No reduced motion fallback
