---
description: Ensure documentation hygiene (Specs vs Rules vs Knowledge Base).
---

# Audit Docs Workflow

Ensure documentation hygiene and prevent architectural rot.

## Goal
Zero stray specs in `docs/specs`, 100% link integrity, and up-to-date rules.

## Inputs required (ask if missing)
- None (Global scan)

## Safety + scope
- Do NOT: Delete files.
- Move stray files to `docs/archive/`.

## Skill routing (explicit)
- Use skill: `audit-docs`.

## Procedure
1. **Load Skill**:
   - run: view_file .agent/skills/audit-docs/SKILL.md

2. **Scan**: Perform comprehensive isolation check of `docs/specs`.

3. **Verify**: Check for "Rule Drift" by comparing recent commits to `.agent/rules/`.

4. **Report**: Document orphaned documents and broken links.

## Notes
- This workflow is critical for maintaining long-term agent context.
