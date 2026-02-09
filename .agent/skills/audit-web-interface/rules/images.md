# Images Rules

Rules for performant, accessible images.

## Dimensions Required

All `<img>` elements need explicit `width` and `height` to prevent Cumulative Layout Shift (CLS).

**Incorrect:**
```tsx
<img src="/hero.jpg" alt="Hero image" />
```

**Correct:**
```tsx
<img src="/hero.jpg" alt="Hero image" width={1200} height={600} />
```

## Lazy Loading

Below-fold images should use lazy loading:

```tsx
<img 
  src="/feature.jpg" 
  alt="Feature" 
  loading="lazy"
  width={400} 
  height={300} 
/>
```

## Priority Loading

Above-fold critical images should be prioritized:

```tsx
// Native HTML
<img 
  src="/hero.jpg" 
  fetchpriority="high"
  width={1200} 
  height={600} 
/>

// Next.js Image
<Image src="/hero.jpg" priority />
```

## Alt Text

- Meaningful images: descriptive alt text
- Decorative images: `alt=""`
- Never omit alt entirely
