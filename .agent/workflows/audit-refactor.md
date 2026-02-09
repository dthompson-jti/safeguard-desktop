---
description: Identify refactoring opportunities without fixing.
---

# Audit Refactor Workflow

Identify code smells and refactoring opportunities.

## Goal
A prioritized list of refactoring targets with effort/impact estimates.

## Inputs required (ask if missing)
- Target directory or component

## Safety + scope
- Do NOT: Apply fixes.
- Only touch: `brain/` finding reports.

## Skill routing (explicit)
- Use skill: `audit-refactor-opportunities`.

## Procedure
1. **Reconnaissance**:
   - run: view_file .agent/skills/audit-refactor-opportunities/SKILL.md
   - Scan target area for duplication, complexity, and pattern violations.

2. **Analysis**: Identify "Monolithic Components" and "Prop-Drilling" clusters.

3. **Prioritization**: Categorize opportunities by "Refactor ROI" (Effort vs. Impact).

4. **Reporting**: Present to user with suggested next steps (`/quick-fix` or `/refactor`).

## Notes
- Good for "Tech Debt" assessment tasks.
