---
description: Universal Audit command. Run comprehensive or scoped audits (accessibility, code, design, performance).
---

# Audit Workflow

Universal Audit command to verify system health across multiple dimensions.

## Goal
A prioritized findings report citing specific rule/invariant violations.

## Inputs required (ask if missing)
- Target scope: `accessibility`, `code`, `design`, `performance`, `layout`, `typography`, or `full`.
- Target files/directories (optional).

## Safety + scope
- Do NOT: Auto-fix issues.
- Only touch: `brain/` artifacts and `task.md`.

## Skill routing (explicit)
## Branching logic (choose exactly one)
- IF scope is `accessibility`: Use skill: `audit-accessibility`.
- ELSE IF scope is `code`: Use skill: `audit-code`.
- ELSE IF scope is `design`: Use skill: `audit-design-system`.
- ELSE IF scope is `docs`: Use skill: `audit-docs`.
- ELSE IF scope is `rules`: Use skill: `verify-rules`.
- ELSE IF scope is `performance`: Use skill: `audit-performance` or `react-performance`.
- ELSE IF scope is `layout`: Use skill: `audit-layout`.
- ELSE IF scope is `typography`: Use skill: `audit-typography`.
- ELSE IF scope is `all` or `full`: Use skills sequentially: `audit-code` -> `audit-design-system` -> `audit-web-interface`.
- ELSE: Use skill: `audit-web-interface` (Default).

## Procedure
1. **Reconnaissance**: Identify project type and load relevant rules from `.agent/rules/`.
2. **Execute**: 
   - run: view_file .agent/skills/<selected-skill>/SKILL.md
   - Follow the selected skill's procedure exactly.
3. **Synthesis**: If multiple skills were used, consolidate findings into a single report.
4. **Prioritize**: Categorize findings by severity (Critical/High/Medium/Low).

## Notes
- Use `npm run lint` and `npm run build` as baseline health checks.
