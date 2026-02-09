---
name: audit-hygiene-enforcement
description: Project maintenance and documentation hygiene automation. Use for changelog management and doc archival.
---

# Hygiene Enforcement Skill

Logic for automating project maintenance and documentation hygiene.

## Instructions

When performing a maintenance audit:

1. **Changelog Management**:
   - Check the total line count of `./CHANGELOG.md`.
   - If > 500 lines, identify the most recent milestone header.
   - Extract everything older than 2 weeks to a new archive file in `docs/archive/`.
   - Append a link to the archive at the bottom of the main `./CHANGELOG.md`.

2. **Documentation Hygiene**:
   - Scan `docs/working` for `.md` files that have been marked as "Implemented" in the `./CHANGELOG.md`.
   - Move these files to `docs/archive/`.
   - Ensure `docs/specs` remains empty (specs should live in `docs/rules` or be archived if temporary).

3. **Structural Rigor**:
   - Enforce kebab-case for all directories in `src/features` and `.agent/skills`.
   - Check for "Rule Drift": Verify that any new patterns documented in recent `CHANGELOG.md` entries have corresponding updates in `.agent/rules/`.

## Scripts (Conceptual)
- `check_changelog_length.ps1`
- `archive_completed_prds.ps1`
- `validate_taxonomy.ps1`
