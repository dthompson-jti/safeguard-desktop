---
description: Wrap-up session with verification, cleanup, and documentation.
---

# Wrap-Up Workflow

Finalize the work session with rigorous technical and documentation checks.

## Goal
Session finalized with artifacts archived, changelog updated, and 100% technical verification.

## Inputs required (ask if missing)
- None (Global finalization)

## Skill routing (explicit)
- Use skill: `implement-session-wrap-up`.

## Procedure
1. **Load Skill**:
   - run: view_file .agent/skills/implement-session-wrap-up/SKILL.md

2. **Technical Gate**: 
   - IF `npm run lint` OR `npm run build` fails: **STOP** and notify user.

3. **Pattern & Rule Codification**:
   - IF a new pattern or architectural decision was made:
     - IDENTIFY the relevant `.agent/rules/*.md` file (or create one).
     - UPDATE the rule to codify the new standard to prevent future regressions.
   - ELSE: Verify that existing project rules in `.agent/rules/` are still accurate.

4. **Cleanup & Archival**: 
   - Move completed plans to `docs/archive/`.
   - Update `./CHANGELOG.md` with the session summary.

5. **Summarize**: Create final `walkthrough.md` entry.

## Notes
- This is the mandatory "Exit Protocol" for all major feature work.
