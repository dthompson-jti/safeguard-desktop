# Hydration Safety Rules

Rules for avoiding React hydration mismatches.

## Controlled vs Uncontrolled Inputs

Inputs with `value` must have `onChange`. Use `defaultValue` for uncontrolled.

**Incorrect (hydration warning):**
```tsx
<input value={text} />
```

**Correct:**
```tsx
// Controlled
<input value={text} onChange={e => setText(e.target.value)} />

// Uncontrolled
<input defaultValue={initialText} />
```

## Date/Time Rendering

Dates render differently on server vs client. Guard accordingly:

**Incorrect:**
```tsx
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>
  // Server: "1/15/2026, 2:00:00 PM"
  // Client: "01/15/2026, 2:00:00 PM" (format differs by locale)
}
```

**Correct:**
```tsx
function Timestamp() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return <span>--</span>
  return <span>{new Date().toLocaleString()}</span>
}
```

## suppressHydrationWarning

Use sparingly and only where truly needed:

```tsx
// OK: intentional client-only content
<time suppressHydrationWarning>
  {new Date().toLocaleDateString()}
</time>

// NOT OK: hiding real bugs
<div suppressHydrationWarning>
  {someDataThatShouldMatch}
</div>
```
