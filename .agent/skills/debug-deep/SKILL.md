---
name: debug-deep
description: Tree-of-thoughts debugging for elusive, intermittent bugs. Use when standard debugging fails or bug is hard to reproduce.
---

# Debug Deep

Paranoid debugging with false-premise detection and parallel investigation.

## Approach

### Phase 1: Challenge Premises
List every assumption in bug report. Test each as True/False:

**Assumption Testing Format**:
- **#1**: [Assumption] — Expected: [X] | Actual: [Y] | Verdict: TRUE/FALSE

### Phase 1.5: Copy Reference First
> [!IMPORTANT]
> If a **working reference** exists in the codebase (e.g., a similar component that works correctly), **copy it character-by-character first** before generating hypotheses. This prevents destructive over-engineering.

Steps:
1. Identify the working implementation (user often provides this)
2. Diff the broken vs working code line-by-line
3. Copy exact CSS/JS patterns, token names, and structure
4. Test if the bug is fixed before hypothesizing further

### Phase 2: Tree of Thoughts
> For each hypothesis, explore multiple investigation paths. Abandon dead ends immediately. Backtrack and try alternatives.

**Hypothesis Format**:
- **#1** Race condition (High confidence)
  - Path A: Add timing logs
  - Path B: Throttle test
  - Selected: A
- **#2** Stale cache (Medium confidence)
  - Path A: Clear cache
  - Path B: Inspect cache
  - Selected: B

Pursue multiple paths—don't converge prematurely.

### Phase 3: Fix Plan
- **Primary fix**: Detailed approach
- **Fallback plan**: Required before implementing

### Phase 4: Verify
```bash
npm run lint && npm run build
```

## Reflexion
Before implementing, verify fix won't:
- Fail under edge cases
- Introduce security vulnerabilities
- Degrade performance

## Constraints
- Must have fallback plan
- If fix fails, iterate (max 3 attempts)
- Document all assumption verdicts
