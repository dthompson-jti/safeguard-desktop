---
description: Conduct deep research and synthesize findings for the project.
---

# Research Workflow

Conduct deep research using external and internal knowledge.

## Goal
A synthesized research report with actionable recommendations for the codebase.

## Inputs required (ask if missing)
- Research topic or question.

## Skill routing (explicit)
- Use skill: `research-deep` for external/web investigation.
- Use skill: `research-synthesize` for mapping findings to project-specific rules.

## Procedure
1. **Deep Research**:
   - run: view_file .agent/skills/research-deep/SKILL.md
   - Conduct web searches and documentation analysis.

2. **Synthesis**:
   - run: view_file .agent/skills/research-synthesize/SKILL.md
   - Align findings with `docs/rules/` and `AGENTS.md`.

3. **Reporting**: Create a `research_report_[topic].md` in `docs/working/`.

## Notes
- Bridging the gap between general AI knowledge and project-specific constraints.
