---
name: implement-component-scaffold
description: Generate boilerplate for new React components following project patterns. Use when creating new UI components.
---

# Implement Component Scaffold

Generate standardized component boilerplate following project conventions.

## When to Use
- Creating a new UI component
- Scaffolding a new feature page
- Adding a new shared component to the design system

## Approach

### Phase 1: Context Gathering
1. Determine component type: Page, Feature, or Shared.
2. Identify the target directory.
3. Check for similar existing components for pattern reference.

### Phase 2: File Structure
**Shared Component (`src/components/`):**
```
src/components/
└── ComponentName/
    ├── component-name.tsx          # Main component
    ├── component-name.module.css   # Styles
    └── index.ts                    # Barrel export
```

**Feature Component (`src/features/`):**
```
src/features/
└── feature-name/
    ├── FeatureNamePage.tsx         # Page component
    ├── feature-name.module.css     # Styles
    ├── components/                 # Feature-specific components
    └── index.ts                    # Barrel export
```

### Phase 3: Component Template
```tsx
// component-name.tsx
import styles from './component-name.module.css';

interface ComponentNameProps {
  /** Description of prop */
  propName?: string;
}

export function ComponentName({ propName }: ComponentNameProps) {
  return (
    <div className={styles.wrapper}>
      {/* Component content */}
    </div>
  );
}
```

### Phase 4: CSS Module Template
```css
/* component-name.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}
```

### Phase 5: Barrel Export
```typescript
// index.ts
export { ComponentName } from './component-name';
export type { ComponentNameProps } from './component-name';
```

## Constraints
- Use kebab-case for file names
- Use PascalCase for component names and exports
- All styling via CSS Modules — no inline styles
- Zero hex values — use design tokens only
- Props interface must be exported for documentation
- Include JSDoc comments for public props

## Output
- Component directory with all required files
- Barrel export configured
- Ready for implementation
