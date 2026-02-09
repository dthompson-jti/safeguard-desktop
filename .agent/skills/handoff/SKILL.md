---
name: handoff
description: Generate detailed junior-dev-safe documentation (PLAN.md + ARCH.md) for unreliable developers. Use when handing off implementation to external teams.
---

# Handoff Skill

Generate comprehensive, junior-developer-safe planning documents that assume the implementer is unreliable and needs maximum guidance.

## When to Use

- Handing off to junior developers
- External contractor implementation
- Documentation for future maintainers
- When implementation will happen without agent supervision

## Artifacts

- `docs/working/PLAN-{name}.md` — High-level plan with context
- `docs/working/ARCH-{name}.md` — Detailed technical architecture

## Approach

### Phase 1: Requirement Mapping

1. **Proof of Understanding**: One-sentence feature summary
2. **User Impact**: What changes for the end user?
3. **Technical Scope**: Files affected, dependencies touched
4. **Assumptions**: List every assumption explicitly

### Phase 2: Options Evaluation

Generate **3-4 implementation approaches** (not variations).

**Comparison Table**:
| Approach | Pros | Cons | Effort | Risk |
| :--- | :--- | :--- | :--- | :--- |
| A | ... | ... | Low/Med/High | Low/Med/High |
| B | ... | ... | Low/Med/High | Low/Med/High |

**Selection Rationale**: Explain why the chosen approach is best for a junior developer.

### Phase 3: PLAN.md Generation

**Structure**:
```markdown
# PLAN: {Feature Name}

## Objective
[What we're building and why]

## User Impact
[What changes for the user]

## Approach Comparison
[Table from Phase 2]

## Selected Approach
[Detailed explanation]

## Implementation Phases
### Phase 1: {Name}
- Step 1: [Specific action]
- Step 2: [Specific action]

### Phase 2: {Name}
...

## Verification Checklist
- [ ] Build passes
- [ ] Linting passes
- [ ] Feature works in dev
- [ ] No console errors
```

### Phase 4: ARCH.md Generation

**Structure**:
```markdown
# ARCH: {Feature Name}

## Data Flow
[Mermaid diagram showing data movement]

## Component Hierarchy
[Tree structure of components]

## State Management
[Atoms, derived state, effects]

## File Manifest
- [NEW] `path/to/file.tsx` — Description
- [MODIFY] `path/to/existing.tsx` — What changes

## Step-by-Step Implementation Guide

### Step 1: Create Styles
[Exact CSS to add, with file paths]

### Step 2: Create Component
[Exact component structure with inline examples]

### Step 3: Integration
[Exact import statements and placement]

## Risk Analysis

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| Memory leak if URL not revoked | High | Add cleanup in useEffect |
| Null reference crash | Med | Add guard clause at top |

## Common Mistakes to Avoid
1. **Mistake**: Forgetting to revoke object URLs
   **Fix**: Always call `URL.revokeObjectURL()` in cleanup
2. **Mistake**: Placing component inside AnimatePresence
   **Fix**: Place outside to prevent unmounting
```

### Phase 5: Inline Code Examples

Include **complete, copy-paste-ready code snippets** for:
- CSS classes (with exact token names)
- Component boilerplate (with all imports)
- Integration points (with exact line numbers if possible)

**Example**:
```tsx
// src/components/MyComponent.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { myAtom } from '../atoms';

export const MyComponent: React.FC = () => {
  const [value, setValue] = useAtom(myAtom);
  
  if (!value) return null; // Guard clause
  
  return (
    <div className={styles.container}>
      {/* Implementation */}
    </div>
  );
};
```

### Phase 6: Reflexion (Chaotic Junior Dev)

Assume the persona of a **Chaotic Junior Developer**:
> "I will skip reading documentation, copy-paste without understanding, and test only the happy path."

**Attack Vectors**:
1. What breaks if I call functions in the wrong order?
2. What breaks if I forget to handle null/undefined?
3. What breaks if I copy this component to a different context?

Document each attack vector in the Risk Analysis table.

## Constraints

- **No Assumptions**: Spell out every step, even "obvious" ones
- **No Jargon**: Explain technical terms inline
- **Copy-Paste Ready**: All code examples must be complete and runnable
- **Visual Aids**: Use mermaid diagrams for complex flows
- **Defensive**: Assume the implementer will make mistakes

## Output

Two files in `docs/working/`:
- `PLAN-{name}.md` — High-level plan
- `ARCH-{name}.md` — Technical architecture with step-by-step guide
