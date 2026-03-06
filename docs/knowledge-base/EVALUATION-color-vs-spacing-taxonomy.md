# Evaluation: Color Taxonomy vs. Spacing Taxonomy

Currently, the Journal Design System uses `surface` and `control` concepts for its **Color** tokens (e.g., `--color-bg-surface`, `--color-bg-control`). 

If we adopt **Variant B2-Alt** for spacing (which splits `control` into `action` and `input`), we face an architectural divergence. Is it a problem that our Color nomenclature and Spacing nomenclature do not perfectly mirror each other?

## The Short Answer
**It is not only acceptable for them to diverge, but it is architecturally correct.** 

Color tokens solve a fundamentally different physical problem than Spacing tokens. Forcing them to share the exact same taxonomy leads to the exact "Control" trap we saw in the original B2 variant.

---

## Why Color and Spacing Taxonomies Should Diverge

To understand why synchronization isn't necessary, we have to look at what physical properties each system governs.

### 1. Color = Paint (Contrast & State)
Color tokens are concerned with **foreground vs. background contrast** and **interaction states** (hover, active, disabled).

From a "paint" perspective, a Text Input, a Button, a Select Trigger, and a Checkbox are all identical:
- They sit on top of a `surface`.
- They have a distinct background color to indicate they are interactive (`control`).
- When a user hovers over them, that background darkens (`control-hover`).

Because their *interaction states* and *contrast requirements* are identical, it is absolutely correct for Color tokens to bucket them all into a single, broad `control` family.

### 2. Spacing = Geometry (Rhythm & Touch Targets)
Spacing and Radii tokens are concerned with **geometry**, **content flow**, and **touch targets**.

From a "geometry" perspective, a Text Input and a Button are fundamentally different:
- **Button (Action)**: Requires symmetric padding (e.g., `8px 16px`) to center its label and icon perfectly.
- **Text Input (Input)**: Requires asymmetric padding (e.g., `8px 12px 8px 32px`) to accommodate an optical text cursor, leading search icons, and trailing clear buttons. Trying to center text inside an input is an anti-pattern.

If we force Spacing tokens to use the broad `control` bucket just to match Color tokens, we lose the geometric precision required to style inputs and buttons independently.

---

## Industry Precedent

Looking at industry leaders, decoupling Color and Spacing taxonomies is standard practice:

### 1. GitHub Primer
- **Color**: Uses broad terms like `canvas` (background) and `control` (buttons/inputs).
- **Spacing**: Uses entirely different semantic concepts like `stack` and `control-action` vs `control-input`.

### 2. Atlassian Design System
- **Color**: Highly semantic (`color.background.input`, `color.background.inverse`).
- **Spacing**: Highly primitive (`space.100`, `space.300`). They don't even attempt to map spacing to Color's semantic words.

---

## The Verdict for Journal Design System

You maintain **`surface` and `control`** for colors because they perfectly describe the *paint*. 

You adopt **`action`, `input`, `row`, `container`** for spacing (B2-Alt) because they perfectly describe the *geometry*. 

### How it looks in CSS (The Reality)

When a developer builds a text input, they will naturally combine the two systems:

```css
.textInput {
  /* Color System: Identifies this as an interactive element on a surface */
  background: var(--color-bg-control);
  color: var(--color-text-control);
  border: 1px solid var(--color-border-control);

  /* Spacing System: Identifies the precise geometry needed for typing */
  padding: var(--spacing-inset-input-standard); /* B2-Alt: 8px 12px */
  border-radius: var(--radius-input);
}

.primaryButton {
  /* Color System: It's an interactive element, just like the input! */
  background: var(--color-bg-control-primary);
  color: var(--color-text-inverse);

  /* Spacing System: But its geometry is for clicking, not typing */
  padding: var(--spacing-inset-action-standard); /* B2-Alt: 10px 16px */
  border-radius: var(--radius-action);
  gap: var(--spacing-gap-inline);
}
```

This code snippet proves that the divergence is a strength, not a weakness. It separates the concerns of visual style (Color) from structural layout (Spacing). Trying to force them into a single taxonomy would compromise one or the other.
