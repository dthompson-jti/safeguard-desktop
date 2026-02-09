---
description: Create a technical architecture specification after PRD approval.
---

# Architect Workflow

Create a technical architecture specification after PRD approval.

## Goal
A detailed architectural blueprint documented in `docs/working/ARCH-[name].md` or within the `implementation_plan.md`.

## Inputs required (ask if missing)
- Approved PRD link/file
- Existing system architecture docs (`docs/knowledge-base/ARCHITECTURE-*`)

## Safety + scope
- Do NOT: Modify application code.
- Only touch: `docs/working/`, `brain/`, and `task.md`.

## Skill routing (explicit)
- Use skill: `plan-architecture` to design the data flow, component hierarchy, and state management.

## Procedure
1. **Foundation**:
   - run: view_file .agent/skills/plan-architecture/SKILL.md
   - Review `.agent/rules/foundation-design-system.md` and `.agent/rules/tech-react.md`.

2. **Options Evaluation**: Evaluate 3-4 architectural approaches using Tree of Thoughts.

3. **Specification**: 
   - Document data model, component hierarchy, and file manifest.
   - Use mermaid diagrams for complex flows.

4. **Risk Analysis**: Hostile review for failure modes.

5. **Review**: Present to user for approval.

## Notes
- After approval, optionally run `/vet` or `/vet-hard` for adversarial review before `/build`.
- After approval, proceed to `/build`.
