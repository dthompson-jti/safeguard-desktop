---
description: Create a lightweight implementation plan for a medium-scope feature.
---

# Plan Workflow

Create a high-rigor implementation plan for features requiring architecture or design decisions.

## Goal
An approved `implementation_plan.md` in the current session's `brain/` directory, adhering to Zero Hex Tolerance and Semantic-First principles.

## Inputs required (ask if missing)
- Feature request or Product Requirements Document (PRD).
- Affected files/components list (identify during recon).

## Safety + scope
- **Scale Evaluator**: If task is clearly ≤30 lines/5 files, **STOP** and suggest `/quick-fix`.
- Do NOT: Start implementing changes before plan approval.
- Only touch: `brain/` artifacts and `task.md`.

## Skill routing (explicit)
- Use skill: `plan-feature` for drafting the implementation steps.
- Use skill: `plan-architecture` if the feature requires new data models or complex state.

## Procedure

1. **Active Reconnaissance**:
   - run: view_file .agent/skills/plan-feature/SKILL.md
   - Identify affected files using `grep_search` and `find_by_name`.
   - Identify which **Surfaces** (Frame/Workspace/Content) are being modified.

2. **Semantic Mapping (CRITICAL)**:
   - Identify the **Semantic Tokens** required for the UI.
   - **Gate**: If a Primitive token (e.g., `grey-50`) is listed, you **MUST** find the Semantic equivalent in `.agent/rules/foundation-design-tokens.md`.

3. **Options Evaluation**:
   - Evaluate 2-3 approaches with brief trade-off analysis.

4. **Drafting**:
   - Create `implementation_plan.md` with phased implementation and a detailed verification plan.

5. **Review**:
   - Notify user and request approval via `notify_user`.

## Notes
- After approval, optionally run `/vet` for quick quality check before `/build`.
- After approval, proceed to `/build`.
