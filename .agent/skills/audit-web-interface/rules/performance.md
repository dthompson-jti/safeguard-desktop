# UI Performance Rules

Rules for performant UI rendering.

## List Virtualization

Large lists (>50 items) must be virtualized.

**Anti-pattern:**
```tsx
{items.map(item => <Row key={item.id} {...item} />)}
// Renders 1000+ DOM nodes
```

**Correct:**
```tsx
import { VList } from 'virtua';

<VList data={items}>
  {(item) => <Row key={item.id} {...item} />}
</VList>
```

Alternative CSS approach:
```css
.list-container {
  content-visibility: auto;
  contain-intrinsic-size: 0 50px;
}
```

## No Layout Reads in Render

Never call these during render:
- `getBoundingClientRect()`
- `offsetHeight`, `offsetWidth`
- `scrollTop`, `scrollLeft`

These force synchronous layout recalculation.

## Batch DOM Operations

**Incorrect (layout thrashing):**
```ts
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height + 10 + 'px'; // Write
});
```

**Correct:**
```ts
const heights = elements.map(el => el.offsetHeight); // All reads
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'; // All writes
});
```

## Input Performance

- Prefer uncontrolled inputs for better performance
- Controlled inputs must be cheap per keystroke
- Debounce expensive operations triggered by input

## Preloading

```html
<!-- Preconnect to CDN -->
<link rel="preconnect" href="https://cdn.example.com" />

<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin />
```

## Images

- `<img>` needs explicit `width` and `height` (prevents CLS)
- Below-fold: `loading="lazy"`
- Above-fold: `fetchpriority="high"`
