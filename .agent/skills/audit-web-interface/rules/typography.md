# Typography Rules

Rules for consistent, accessible typography.

## Punctuation

| Use | Instead of | Example |
|:----|:-----------|:--------|
| `…` | `...` | "Loading…" |
| `"` `"` | `"` | "Hello" → "Hello" |
| `&nbsp;` | space | `10&nbsp;MB`, `⌘&nbsp;K` |

## Loading States

Always end with ellipsis: `"Loading…"`, `"Saving…"`, `"Processing…"`

## Numeric Typography

Use tabular figures for number columns:

```css
.data-table td {
  font-variant-numeric: tabular-nums;
}
```

## Text Wrapping

Prevent widows on headings:

```css
h1, h2, h3 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}
```

## Content Overflow

Handle long content gracefully:

```css
/* Single line truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Word break for URLs/long words */
.break-words {
  word-break: break-word;
}
```

## Flex Children

Flex children need `min-w-0` to allow text truncation:

```css
.flex-child {
  min-width: 0; /* Allows truncation */
}
```

## Empty States

Never render broken UI for empty strings/arrays. Always provide empty state UI.
