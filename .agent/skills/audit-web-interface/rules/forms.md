# Forms Rules

Rules for accessible, user-friendly form controls.

## Input Attributes

| Attribute | Usage |
|:----------|:------|
| `autocomplete` | Required on all inputs |
| `name` | Meaningful identifier |
| `type` | Correct type (`email`, `tel`, `url`, `number`) |
| `inputmode` | Mobile keyboard optimization |

## Labels

Every input must have an associated label:

**Incorrect:**
```tsx
<input placeholder="Email" />
```

**Correct:**
```tsx
<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" />
```

Or with wrapping:
```tsx
<label>
  Email
  <input name="email" type="email" />
</label>
```

## Never Block Paste

**Anti-pattern:**
```tsx
<input onPaste={(e) => e.preventDefault()} />
```

This breaks password managers and accessibility tools.

## Placeholder Guidelines

- End with `…` to indicate continuation
- Show example pattern: `Email…` or `name@example.com`

## Error Handling

- Errors inline next to fields
- Focus first error on submit
- Error messages include fix, not just problem

**Incorrect:** "Invalid input"
**Correct:** "Email must include @ symbol"

## Submit Button States

- Stays enabled until request starts
- Show spinner during request
- Disable only after submission begins

## Spellcheck

Disable on non-prose fields:
```tsx
<input type="email" spellCheck={false} />
<input name="username" spellCheck={false} />
```

## Unsaved Changes

Warn before navigation with unsaved changes using `beforeunload` or router guard.
