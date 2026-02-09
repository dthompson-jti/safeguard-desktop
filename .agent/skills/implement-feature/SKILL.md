---
name: implement-feature
description: Full feature implementation from an approved plan. Use when you have an implementation_plan.md and are ready to build.
---

# Implement Feature

Full feature implementation from an approved plan.

## When to Use
- After `plan/feature` or `plan/architecture` approval
- Building new functionality
- Implementing approved designs

## Artifacts
- `task.md` updated via `task_boundary`
- `walkthrough.md` created on completion (via `/wrap-up`)

## Approach

### Phase 1: Pre-Flight Checklist
- [ ] Load approved `implementation_plan.md`
- [ ] View relevant files
- [ ] Acknowledge design system rules
- [ ] Confirm dev server is running

### Phase 2: Execution Loop
For each phase in the plan:
1. Implement changes
2. Run `npm run lint` — fix any errors
3. Run `npm run build` — fix any errors
4. Update `task.md` progress

**Anti-Hallucination**: Verify library APIs exist before using.

### Phase 3: Pre-Approval Self-Correction
Assume **Hostile QA** persona:
> "I'm a tester who gets paid per bug found."
- What edge cases are missed (empty states, error states, loading states)?
- What regression risks exist?
- What boundary conditions could break?
Fix silently before presenting.

### Phase 4: User Approval Gate
**STOP**: "Implementation complete. Please review in browser. Proceed to cleanup?"

### Phase 5: Cleanup & Documentation
- Remove dead code
- Add architectural invariant comments
- Update `task.md`

## Constraints
- Do NOT deviate from plan without user consent
- **Browser Reliability Warning**: The browser tool is unreliable. Do not use it for verification. Ask user for confirmation or screenshots.
- No new lint errors
