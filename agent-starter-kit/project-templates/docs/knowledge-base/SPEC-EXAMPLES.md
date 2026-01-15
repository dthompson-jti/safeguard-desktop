# SPEC File Examples

This guide provides examples of common SPEC files you should create for your project.

---

## SPEC-CSS.md (Design Tokens)

Document your design tokens and CSS custom properties.

### Example Content:
```markdown
# CSS Design System

## Color Tokens

### Semantic Colors
- `--color-primary`: Main brand color
- `--color-secondary`: Secondary brand color
- `--color-background`: Page background
- `--color-surface`: Card/panel backgrounds
- `--color-text-primary`: Main text color
- `--color-text-secondary`: Muted text color

### State Colors
- `--color-success`: Success state
- `--color-error`: Error state
- `--color-warning`: Warning state

## Typography Tokens

- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-base`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 24px

- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-bold`: 700
```

---

## SPEC-SPACING.md (Spacing System)

Document your spacing scale and layout rules.

### Example Content:
```markdown
# Spacing System

## Spacing Scale
- `--spacing-0`: 0
- `--spacing-0.5`: 4px
- `--spacing-1`: 8px
- `--spacing-2`: 16px
- `--spacing-3`: 24px
- `--spacing-4`: 32px
- `--spacing-6`: 48px

## Layout Rules
1. Use `gap` for spacing between items, never external margins
2. All spacing must use tokens, no magic numbers
3. Parent containers control child spacing via `gap`
```

---

## SPEC-COMPONENTS.md (Component Library)

Document your reusable components.

### Example Content:
```markdown
# Component Library

## Button

### Variants
- `primary`: Main CTA buttons
- `secondary`: Less prominent actions
- `tertiary`: Minimal styling

### Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
```

### Usage
```tsx
<Button variant="primary" size="md">
  Save Changes
</Button>
```
```

---

## SPEC-ARCHITECTURE.md (System Architecture)

Document your system architecture and data flow.

### Example Content:
```markdown
# System Architecture

## State Management
- Global state: Jotai atoms
- Server state: React Query
- Form state: React Hook Form

## Data Flow
1. User action → Event handler
2. Event handler → Atom update
3. Atom update → Component re-render

## API Communication
- Base URL: `/api/`
- Authentication: JWT in headers
- Error handling: Global error boundary
```

---

## SPEC-TYPOGRAPHY.md (Typography System)

Document your typography hierarchy and rules.

### Example Content:
```markdown
# Typography System

## Hierarchy
- H1: `--font-size-xl` + `--font-weight-bold`
- H2: `--font-size-lg` + `--font-weight-medium`
- H3: `--font-size-base` + `--font-weight-medium`
- Body: `--font-size-base` + `--font-weight-normal`

## Rules
1. No font weights above 700
2. Line height: 1.5 for body text, 1.2 for headings
3. Use lining figures for UI, oldstyle for body (if applicable)
```
