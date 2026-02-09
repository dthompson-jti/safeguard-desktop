# Component Composition Rules

## 1. Abandon "Monolithic" Components

### The Problem
Do not build single, giant components (e.g., `<Composer />`) that handle multiple distinct use cases (create, update, thread, forward) via boolean props.

### The Anti-Pattern
Avoid props like:
*   `isUpdate`, `isThread`, `isForwarding`
*   `hideWelcomeMessage`, `showHeader`
*   `variant="compact" | "expansive" | "modal"` (when these change structure significantly)

This leads to "prop drilling," massive conditional trees, and fragile code.

## 2. Adopt the "Radix-style" Composition Pattern

### The Fix
Break UI into distinct, composable parts. Use a Root Provider to manage state and render only the pieces needed for a specific instance.

### Example
```tsx
// DO THIS:
<Composer.Root>
  <Composer.Header />
  <Composer.Input />
  <Composer.Footer>
     <Composer.SubmitButton />
  </Composer.Footer>
</Composer.Root>
```

## 3. Decouple State Logic from UI

Use Context Providers to expose standard APIs (e.g., `value`, `setValue`, `submit`), but allow implementation to change based on context (local vs global state).

## 4. Optimization for AI

Explicit JSX composition (instead of hidden boolean logic) makes it easier for AI tools to understand the intent and generate bug-free updates.
