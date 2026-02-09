---
name: sweep-codebase
description: Detection logic for all 4 sweep scopes (code, docs, hygiene, agent).
---

# Sweep Codebase Skill

Logic for analyzing the codebase and generating maintenance tickets.

## Instructions

When performing a sweep, follow the logic for the requested scope(s):

### 1. Code Evolution (`scope: code`)
- **Git Hotspots**: Scan git history (7 days). If a file has >3 commits, flag for refactor review.
- **Pattern Repetition**: Look for similar logic across files (e.g., UI hooks, data mapping).
- **Tech Debt**: Search for `// TODO`, `// FIXME`, or large files (>300 lines).
- **Action**: Create tickets for refactoring or consolidation.

### 2. Documentation Drift (`scope: docs`)
- **Stale PRDs**: Check `docs/working/*.md`. If a doc hasn't been touched in 14 days but references files changed this week, flag as "Stale".
- **Orphaned Docs**: Find PRDs marked "Implemented" in `./CHANGELOG.md` that are still in `docs/working/`.
- **Rule Drift**: Identify new UI patterns in `src/features/` not yet present in `.agent/rules/`.
- **Action**: Create tickets to update or archive documentation.

### 3. Hygiene Sentinel (`scope: hygiene`)
- **Changelog**: If `./CHANGELOG.md` > 500 lines, trigger archival.
- **Working Files**: If `docs/working/` > 6 files, trigger cleanup.
- **Feature Sprawl**: If `src/features/` > 15 directories, flag for domain grouping.
- **Action**: Create tickets for housekeeping tasks.

### 4. Agent Knowledge (`scope: agent`)
- **Rule Conflicts**: Scan `.agent/rules/*.md` for contradictory instructions (e.g., CSS naming).
- **Cross-Refs**: Verify that all `SKILL.md` files correctly link to their relevant rules or workflows.
- **Skill Usage**: Identify if a custom skill (like `audit-typography`) hasn't been used despite relevant changes.
- **Action**: Create tickets to tune the agent's brain.

## Output Structure

### Ticket Template (`docs/backlog/{CATEGORY}-{RANDOM}-{###}.md`)
```markdown
---
id: {CATEGORY}-{RANDOM}-{###}
category: [code|docs|hygiene|agent]
priority: [high|med|low]
status: open
created: [YYYY-MM-DD]
source: sweep-[scope]
---

# {CATEGORY}-{RANDOM}-{###}: [Concise Title]

## Context
[Why this ticket was generated]

## Recommended Action
[Specific steps to resolve]

## Files Affected
- [Paths]
```

### Ticket Naming Convention
- **Format**: `{CATEGORY}-{RANDOM}-{###}.md`
- **CATEGORY**: `CODE`, `DOCS`, `HYGIENE`, `AGENT`
- **RANDOM**: 2-letter random key (e.g., `AB`, `XY`) generated once per sweep session
- **###**: 3-digit sequential number (001-999)

**Examples**:
- `CODE-AB-001.md` — First code ticket in session AB
- `DOCS-AB-002.md` — Second ticket (docs category) in session AB
- `HYGIENE-XY-001.md` — First ticket in a different session XY

## Constraints
- **Idempotency**: Do not create duplicate tickets for the same issue. Search `docs/backlog/` before generating.
- **Random Session Key**: Generate a random 2-letter key at the start of each sweep. Use this key for ALL tickets in this session to prevent merge conflicts.
- **High Signal**: Only create tickets for actionable items. Avoid noise.
- **No Central Index**: Do not update `BACKLOG.md` or any central index file. Each ticket is independent.
