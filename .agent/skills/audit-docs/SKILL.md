---
name: audit-docs
description: Documentation drift detection and knowledge-base hygiene. Use after major changes or for periodic maintenance.
---

# Audit Docs Skill

Logic for ensuring documentation integrity and preventing "Documentation Rot".

## Instructions

1. **Verify Spec Isolation**:
   - Check `docs/specs`.
   - **MUST BE EMPTY**. If files exist, they are "stray" and must be moved to `docs/working` (if active) or `docs/archive` (if complete).

2. **Verify Rule Coverage**:
   - Trace recent `./CHANGELOG.md` entries or feature implementation plans.
   - Check if new patterns (UI components, state management, API design) are documented in `.agent/rules/*.md`.
   - Identify "Rule Drift" — where code behavior deviates from documented standards.

3. **Link Integrity**:
   - Scan `.agent/workflows/*.md` and `.agent/skills/**/SKILL.md`.
   - Ensure all links to `docs/rules` or `docs/knowledge-base` are valid.
   - Check for references to legacy `SPEC-*` or `STRATEGY-*` files.

4. **Archival Integrity**:
   - Verify that PRDs marked as "Implemented" in the changelog have been moved to `docs/archive/`.

## Constraints
- Use `ls -R` or `find_by_name` for isolation checks.
- Use `grep_search` for link validation.
- **NEVER** delete files without user confirmation; move to `docs/archive/` instead.

## Output
Findings report highlighting:
- [ ] Stray specs found
- [ ] Missing rule coverage
- [ ] Broken documentation links
- [ ] Orphaned active PRDs
