---
description: Run automated invariant verification against project rules.
---

# Verify Workflow

Run automated invariant checks defined in project rules.

## Goal
A verification report showing compliance with Zero Hex Tolerance, margin rules, z-index tokens, and other automated invariants.

## Inputs required (ask if missing)
- Target scope: `all`, `css`, `tsx`, or specific directory

## Safety + scope
- Do NOT: Auto-fix violations (report only).
- Only touch: `brain/` artifacts for the report.

## Skill routing (explicit)
- Use skill: `verify-rules`.

## Procedure
1. **Load Skill**:
   - run: view_file .agent/skills/verify-rules/SKILL.md
   - Follow the skill's verification phases.

2. **Execution**:
   - Run grep checks for each invariant.
   - Collect and categorize findings.

3. **Report**:
   - Generate a prioritized findings report.
   - Categorize by severity (Critical/High/Medium/Pass).

## Notes
- Use `/audit rules` as an alias for this workflow.
- For fixing violations, use `/quick-fix` or `/refactor`.
