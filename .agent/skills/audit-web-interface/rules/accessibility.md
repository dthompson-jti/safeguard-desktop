# Accessibility Rules

Rules for ensuring UI components are accessible to all users.

## Semantic HTML

**Incorrect:**
```tsx
<div onClick={handleClick}>Click me</div>
```

**Correct:**
```tsx
<button onClick={handleClick}>Click me</button>
```

## Required Attributes

| Element | Requirement |
|:--------|:------------|
| Icon-only buttons | `aria-label` |
| Form controls | `<label>` or `aria-label` |
| Images | `alt` (or `alt=""` if decorative) |
| Decorative icons | `aria-hidden="true"` |
| Async updates | `aria-live="polite"` |

## Interactive Elements

- Use `<button>` for actions, `<a>`/`<Link>` for navigation
- Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`)
- Headings hierarchical `<h1>`–`<h6>`; include skip link for main content
- `scroll-margin-top` on heading anchors

## Focus States

- Interactive elements need visible focus: `focus-visible:ring-*` or equivalent
- Never `outline-none` without focus replacement
- Use `:focus-visible` over `:focus` (avoid focus ring on click)
- Group focus with `:focus-within` for compound controls

**Anti-pattern:**
```css
/* BAD: removes focus without replacement */
button:focus { outline: none; }
```

**Correct:**
```css
/* GOOD: replaces with visible focus ring */
button:focus-visible { 
  outline: none;
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}
```
