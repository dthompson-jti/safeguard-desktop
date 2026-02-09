---
description: Create a Product Requirements Document (PRD) for a large feature or epic.
---

# PRD Workflow

Create a Product Requirements Document (PRD) for a large feature or epic.

## Goal
A comprehensive, approved PRD in `docs/working/PRD-[feature-name].md` defining user stories, state matrix, and success criteria.

## Inputs required (ask if missing)
- Feature description or user request
- Target audience / persona
- Relevant existing documentation references

## Safety + scope
- Do NOT: Implement code or draft technical architectures.
- Only touch: `docs/working/` and `task.md`.
- Output: `docs/working/PRD-[name].md`.

## Skill routing (explicit)
- Use skill: `plan-prd` for market research, user stories, and requirements mapping.
- Load `plan-prd` and follow its `SKILL.md` exactly.

## Procedure
1. **Context Loading**: 
   - run: view_file .agent/skills/plan-prd/SKILL.md
   - Identify existing product context in `docs/knowledge-base/VISION.md`.

2. **Reconnaissance**: Scan for similar existing features to ensure pattern consistency.

3. **Drafting**: Use `plan-prd` to generate the PRD in `docs/working/`.

4. **Review**: Notify user and request approval.
   - **MUST**: Present the "Reasoning" behind key requirement decisions.

## Notes
- After approval, proceed to `/architect`.
