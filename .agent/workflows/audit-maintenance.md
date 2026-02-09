---
description: Universal maintenance and hygiene audit command.
---

# Audit Maintenance Workflow

Periodic project housekeeping and hygiene enforcement.

## Goal
Maintain codebase health, changelog integrity, and structural consistency.

## Inputs required (ask if missing)
- Scope (optional): `changelog`, `docs`, `hygiene`, `all`.

## Safety + scope
- Do NOT: Archive entries less than 14 days old.

## Skill routing (explicit)
- Use skill: `audit-hygiene-enforcement`.

## Procedure
1. **Discovery**:
   - run: view_file .agent/skills/audit-hygiene-enforcement/SKILL.md
   - Scan for orphaned MD files and verify PRD archival.

2. **Execution**:
   - **Changelog**: Trigger archival if `./CHANGELOG.md` > 500 lines.
   - **Cleanup**: Move completed PRDs from `docs/working` to `docs/archive`.

3. **Structural Lint**: Fix naming issues in components or skills.

4. **Verification**: Run `npm run lint` and `npm run build`.

## Notes
- Deduplicates logic with the `audit-hygiene-enforcement` skill.
