---
description: Debug a bug with systematic root cause analysis.
---

# Debug Workflow

Systematic debugging with hypothesis testing and reproduction rigor.

## Goal
Validated fix with a passing reproduction test and zero regressions.

## Inputs required (ask if missing)
- Bug description and steps to reproduce.
- Environment details (if specialized).

## Safety + scope
- Do NOT: Implement a fix without a failing reproduction test.
- Do NOT: Use browser tool for verification.

## Skill routing (explicit)
- Use skill: `debug-standard` for reproducible logic/UI bugs.
- Use skill: `debug-deep` for intermittent, state-heavy, or complex concurrency issues.

## Procedure
1. **Reproduction**:
   - run: view_file .agent/skills/debug-standard/SKILL.md
   - **MANDATORY**: Create a `repro.test.ts` (or similar) that fails.

2. **Hypothesis**: Generate 3-4 hypotheses before looking at code.

3. **Investigation**:
   - run: view_file .agent/skills/debug-standard/SKILL.md (or `debug-deep`)
   - Confirm root cause with evidence (@filename:line).

4. **Fix & Verify**:
   - Apply fix.
   - Verify reproduction test passes.
   - Run `npm run lint` and `npm run build`.

## Notes
- "Standard" bugs involve obvious logic/UI failures.
- "Deep" bugs involve race conditions, HMR issues, or complex React state.
