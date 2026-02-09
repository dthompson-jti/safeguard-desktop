---
description: Code restructuring without behavior change.
---

# Refactor Workflow

Code restructuring without behavior change.

## Goal
Improved code quality, maintainability, or readability while preserving 100% functional parity.

## Inputs required (ask if missing)
- Target file/directory
- Refactor objective (e.g., "Extract component", "Flatten structure")

## Safety + scope
- Do NOT: Change feature behavior.
- Do NOT: Add new dependencies.
- Only touch: Target area and its immediate dependants.

## Skill routing (explicit)
- Use skill: `implement-refactor`.

## Procedure
1. **Reconnaissance**:
   - run: view_file .agent/skills/implement-refactor/SKILL.md
   - Map all references to the target code.

2. **Execution**: Apply changes in small, logical steps.

3. **Invariant Check**: Verify that "Zero Hex Tolerance" is maintained.

4. **Technical Verification**: 
   - Run `npm run lint` and `npm run build`.
   - Run relevant unit tests.

5. **Summarize**: Document the "Before" vs "After" structure in `walkthrough.md`.

## Notes
- If behavior change is required, use `/plan` instead.
