---
description: Atomic fix for small bugs or tweaks (≤30 lines, ≤5 files).
---

# Quick Fix Workflow

Atomic fix for small bugs or tweaks.

## Goal
Rapid resolution of small issues with 100% technical verification.

## Inputs required (ask if missing)
- Brief description of the issue
- Location (if known)

## Safety + scope
- Do NOT: Exceed 30 lines or 5 files. (Use `/plan` if larger).
- Do NOT: Use browser tool for verification.

## Skill routing (explicit)
- Use skill: `implement-quick-fix`.

## Procedure
1. **Diagnosis**: Perform a quick `grep` or `view_file` to locate the issue.
2. **Execution**: 
   - run: view_file .agent/skills/implement-quick-fix/SKILL.md
   - Apply the fix.
3. **Verification**: 
   - Run `npm run lint` and `npm run build`.
4. **Summarize**: Brief explanation of what was fixed.

## Notes
- "Standard bugs" should use `/debug`. `/quick-fix` is for "I know exactly what to change".
