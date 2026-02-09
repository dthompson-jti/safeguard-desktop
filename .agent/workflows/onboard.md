---
description: Rapidly load project context and rules.
---

# Onboard Workflow

Rapid context loading for new agents or fresh sessions.

## Goal
100% orientation in the project's Protocol, Product, and Tech layers.

## Inputs required (ask if missing)
- None (Automated orientation)

## Skill routing (explicit)
- Use skill: `project-onboard`.

## Procedure
1. **Orientation**:
   - run: view_file .agent/skills/project-onboard/SKILL.md

2. **Protocol**: Read `AGENTS.md` and `.agent/rules/`.

3. **Product**: Read `VISION.md` and `TERMINOLOGY.md`.

4. **Tech**: Scan `package.json` for stack and `docs/knowledge-base/ARCHITECTURE-*` for structure.

## Notes
- Mandatory for new agents or when switching contexts significantly.
