---
name: audit-web-interface
description: Review UI code for Vercel Web Interface Guidelines compliance. Use when reviewing CSS, components, or checking accessibility, forms, animation, typography, or performance patterns.
argument-hint: <file-or-pattern>
---

# Web Interface Guidelines Audit

Review files for compliance with Web Interface Guidelines.

**Files to review:** $ARGUMENTS

## Quick Reference

**Quick Reference Checklist**:

- **Accessibility** — aria-labels, semantic HTML, focus states. See: `.agent/rules/foundation-accessibility.md`
- **Animation** — `prefers-reduced-motion`, compositor property targeting. See: `.agent/rules/foundation-accessibility.md`
- **Composition** — Radix-style primitives, state decoupling. See: `.agent/rules/tech-react.md`
- **Forms** — labels, autocomplete, error handling patterns. See: `.agent/rules/pattern-inputs.md`
- **Images** — dimensions, lazy loading, priority markers. See: `.agent/rules/foundation-design-system.md`
- **Hydration** — controlled inputs, date guards. See: `.agent/rules/tech-react.md`
- **Interactive States** — hover, active, focus feedback. See: `.agent/rules/pattern-inputs.md`
- **Performance** — virtualization, layout thrashing prevention. See: `.agent/rules/tech-react.md`
- **Typography** — ellipsis, quotes, text-wrap. See: `.agent/rules/foundation-design-system.md`

## Additional Categories (inline)

### Navigation & State
- URL reflects state—filters, tabs, pagination in query params
- Links use `<a>`/`<Link>` (Cmd/Ctrl+click support)
- Destructive actions need confirmation or undo

### Touch & Interaction
- `touch-action: manipulation` (prevents double-tap zoom)
- `overscroll-behavior: contain` in modals
- `autoFocus` sparingly—desktop only

### Dark Mode
- `color-scheme: dark` on `<html>`
- `<meta name="theme-color">` matches background

### Locale
- Use `Intl.DateTimeFormat` for dates
- Use `Intl.NumberFormat` for numbers

### Content & Copy
- Active voice: "Install the CLI" not "The CLI will be installed"
- Title Case for headings/buttons
- Error messages include fix, not just problem


## 2. Context Loading (Active Router)
This skill is a router. You must load the relevant Verification checklists before auditing.

1.  **System Rules**: Read [.agent/rules/foundation-design-system.md](../../../.agent/rules/foundation-design-system.md) (Section `## Verification`).
2.  **React Rules**: Read [.agent/rules/tech-react.md](../../../.agent/rules/tech-react.md) (Section `## Verification`).
3.  **A11y Rules**: Read [.agent/rules/foundation-accessibility.md](../../../.agent/rules/foundation-accessibility.md) (Section `## Verification`).
4.  **Token Rules**: Read [.agent/rules/foundation-design-tokens.md](../../../.agent/rules/foundation-design-tokens.md) (Section `## Verification`).

## 3. Execution (The Verification)
For each file in `Files to review`:
1.  Run the **Invariant (Automated)** checks from the loaded rule sections (e.g. `grep "margin:"`).
2.  Evaluate the **Logic (Reasoning)** checks from the loaded rule sections.
3.  Log any violations in the Output Format below.
4.  If multiple rules conflict, `patterns/*` trump `foundations/*`.

## Output Format

Group by file. Use `file:line` format. Terse findings.

```text
## src/Button.tsx

src/Button.tsx:42 - icon button missing aria-label
src/Button.tsx:55 - animation missing prefers-reduced-motion

## src/Card.tsx

✓ pass
```
