---
description: Implement a feature from an approved plan.
---

# Build Workflow

Implement a feature from an approved implementation plan.

## Goal
Feature fully implemented, verified (lint/build), and documented in `walkthrough.md`.

## Inputs required (ask if missing)
- Approved `implementation_plan.md`
- Running development server (`npm run dev`)

## Safety + scope
- Do NOT: Deviate from approved plan without user consent.
- Do NOT: Use browser tool for verification.
- Only touch: Files specified in the implementation plan.

## Skill routing (explicit)
- Use skill: `implement-flight-check` for pre-implementation verification.
- Use skill: `implement-feature` for actual building.

## Procedure
1. **Pre-Flight**:
   - run: view_file .agent/skills/implement-flight-check/SKILL.md
   - Execute flight check to ensure env is ready.

2. **Phase-by-Phase Execution**:
   - run: view_file .agent/skills/implement-feature/SKILL.md
   - Implement changes phase by phase.
   - Run `npm run lint` and `npm run build` after each phase.

3. **Self-Correction**: Perform "Hostile QA" review of your own code.

4. **User Review Gate**: **STOP** and ask user to verify in browser.

5. **Wrap-Up**: 
   - run: Call `/wrap-up` to finalize documentation and cleanup.

## Notes
- For small tweaks, use `/quick-fix`.
