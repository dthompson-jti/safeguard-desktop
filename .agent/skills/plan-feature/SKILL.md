---
name: plan-feature
description: Creates lightweight implementation plan for medium features (1-5 files). Use when requirements are clear and no UX exploration needed.
---

# Plan Feature

Pattern-driven planning: Understand → Explore Options → Debate → Plan Atomically.

## Approach

### Phase 1: Discovery
1. **Proof of Understanding**: One-sentence feature summary
2. **Impact Analysis**: Related components, shared state, design system implications

### Phase 2: Approach Evaluation
Generate **3-4 strategies** (not variations of one idea).

**Socratic Debate**:
- Proponent: Argues for the solution, highlighting benefits and pattern consistency.
- Adversary: Critiques the solution, finding complexity, maintenance burden, and holes.
- Synthesis: Resolves the debate with a stronger, modified solution and clear rationale.

**Approach Comparison**:
- **Approach A**: Pros — [...], Cons — [...], Effort — Low/Med/High
- **Approach B**: Pros — [...], Cons — [...], Effort — Low/Med/High

### Phase 3: File Changes

**File Changes**:
- [NEW] `path/to/file.tsx` — Description of changes
- [MODIFY] `path/to/existing.tsx` — Description of changes

Break into atomic, testable steps.

## Reflexion
Before finalizing, identify 3 risks:
1. If requirements change, how many files update?
2. Can this be tested in isolation?
3. Will next developer understand why?

## Constraints
- No code generation — plan only
- No one-off patterns
- Steps must be atomic and testable

## Output
`implementation_plan.md` with approach comparison, file changes, phased steps.
