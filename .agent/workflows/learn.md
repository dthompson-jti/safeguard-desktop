---
description: Systematically improve agent skills, workflows, and rules based on recent learnings.
---

# Learn Workflow

Diagnose friction and apply systemic improvements to the agent's brain.

## Goal
A permanent improvement to a `SKILL`, `WORKFLOW`, or `RULE` based on a "Failure Analysis" or "Retro".

## Inputs required (ask if missing)
- Description of the process smell or failure.

## Safety + scope
- Do NOT: Fix one-off bugs (use `/quick-fix`).
- Only touch: `.agent/` configuration files.

## Skill routing (explicit)
- Use skill: `optimize-agent`.

## Procedure
1. **Diagnosis (The "Retro")**: 
   - run: view_file .agent/skills/optimize-agent/SKILL.md
   - Perform Root Cause Analysis: Is this a Rule gap, a Skill gap, or a Workflow process gap?

2. **Optimization**: Drafting and applying the fix to the target artifact.

3. **Verification**: 
   - Verify file content is valid markdown.
   - Confirm new instruction is clear and actionable.

## Notes
- Aligns with the "Failure Analysis" directive.
