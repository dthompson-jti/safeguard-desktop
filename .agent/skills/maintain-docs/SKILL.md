---
name: maintain-docs
description: Clean up working documents, archive completed tickets, and consolidate notes. Use when docs/working/ > 8 files or after major milestones.
---

# Maintain Docs

Systematic documentation cleanup, archival, and consolidation to prevent documentation rot.

## When to Use

- `docs/working/` has > 8 files
- After completing a major feature
- Monthly maintenance routine
- Before starting a new project phase

## Artifacts

- `docs/archive/YYYY-MM/` — Archived completed documents
- `docs/working/NOTES-{topic}.md` — Consolidated notes
- `brain/maintenance-report.md` — Summary of actions taken

## Approach

### Phase 1: Discovery

Scan the following locations:

1. **Working Docs**: `docs/working/*.md`
   - Check last modified date
   - Check if referenced in `CHANGELOG.md` as completed
   - Check if files reference each other

2. **Backlog Tickets**: `docs/backlog/*.md`
   - Check `status:` frontmatter
   - Identify tickets marked `done` or `closed`

3. **Changelog**: `CHANGELOG.md`
   - Check if > 500 lines (trigger archival)
   - Extract completed items from last 30 days

### Phase 2: Categorization

For each file in `docs/working/`, categorize as:

#### Archive Candidates
**Criteria**:
- Status is "Implemented" or "Completed"
- Referenced in CHANGELOG as done
- Last modified > 14 days ago AND no active work

**Examples**:
- `PLAN-feature-x.md` (implemented last week)
- `ARCH-old-system.md` (replaced by new arch)
- `VET-feature-y.md` (feature shipped)

#### Consolidation Candidates
**Criteria**:
- Multiple files on same topic
- Overlapping content
- Can be merged into single NOTES file

**Examples**:
- `PLAN-auth-v1.md`, `PLAN-auth-v2.md`, `ARCH-auth.md` → `NOTES-auth.md`

#### Keep Active
**Criteria**:
- Modified in last 7 days
- Referenced in open backlog tickets
- Marked as "In Progress"

**Examples**:
- `PLAN-current-feature.md`
- `ARCH-active-work.md`

#### Stale (Needs Review)
**Criteria**:
- Last modified > 30 days ago
- Not referenced anywhere
- Unclear status

**Examples**:
- `PLAN-abandoned-idea.md`
- `NOTES-random.md`

### Phase 3: Archival

For each **Archive Candidate**:

1. **Create Archive Directory**:
   ```
   docs/archive/YYYY-MM/
   ```
   Use the month the file was last modified.

2. **Move File**:
   ```
   docs/working/PLAN-feature-x.md
   → docs/archive/2026-02/PLAN-feature-x.md
   ```

3. **Update Cross-References**:
   - Search codebase for links to archived file
   - Update links to point to archive location
   - Add note: `<!-- Archived: 2026-02-02 -->`

4. **Add Archive Index** (if doesn't exist):
   ```markdown
   # Archive Index: 2026-02

   ## Plans
   - [PLAN-feature-x.md](./PLAN-feature-x.md) — Implemented 2026-02-15

   ## Architectures
   - [ARCH-old-system.md](./ARCH-old-system.md) — Replaced by new design
   ```

### Phase 4: Consolidation

For each **Consolidation Candidate** group:

1. **Create NOTES File**:
   ```
   docs/working/NOTES-{topic}.md
   ```

2. **Structure**:
   ```markdown
   # Notes: {Topic}

   **Last Updated**: {YYYY-MM-DD}
   **Status**: Active | Reference | Historical

   ## Summary
   [High-level overview of the topic]

   ## Evolution
   ### Version 1 (2026-01-15)
   [Summary from PLAN-v1.md]

   ### Version 2 (2026-02-01)
   [Summary from PLAN-v2.md]

   ## Current State
   [What's implemented now]

   ## Open Questions
   - [ ] Question 1
   - [ ] Question 2

   ## References
   - [PLAN-v1.md](../archive/2026-01/PLAN-v1.md)
   - [ARCH-v2.md](./ARCH-v2.md)
   ```

3. **Archive Source Files**:
   Move original files to `docs/archive/YYYY-MM/`

### Phase 5: Backlog Cleanup

For each ticket in `docs/backlog/`:

1. **Check Status**:
   - If `status: done` or `status: closed` → Archive

2. **Archive Completed Tickets**:
   ```
   docs/backlog/CODE-AB-001.md
   → docs/backlog/archive/CODE-AB-001.md
   ```

3. **Verify No Orphans**:
   - Ensure all archived tickets are no longer referenced in active docs

### Phase 6: Changelog Archival

If `CHANGELOG.md` > 500 lines:

1. **Extract Old Entries**:
   - Keep last 30 days in `CHANGELOG.md`
   - Move older entries to `docs/archive/CHANGELOG-YYYY-MM.md`

2. **Add Archive Link**:
   ```markdown
   # Changelog

   See [Archive](./archive/) for older entries.

   ## 2026-02
   ...
   ```

### Phase 7: Report Generation

Create `brain/maintenance-report.md`:

```markdown
# Maintenance Report: {YYYY-MM-DD}

## Summary
- **Archived**: {count} files
- **Consolidated**: {count} groups → {count} NOTES files
- **Kept Active**: {count} files
- **Stale (Needs Review)**: {count} files

## Actions Taken

### Archived to docs/archive/2026-02/
- `PLAN-feature-x.md` (Implemented)
- `ARCH-old-system.md` (Replaced)
- `VET-feature-y.md` (Shipped)

### Consolidated
- `NOTES-auth.md` ← PLAN-auth-v1, PLAN-auth-v2, ARCH-auth

### Backlog Cleanup
- Archived {count} completed tickets

### Changelog
- Archived entries older than 2026-01-01

## Stale Files (Needs Manual Review)
- `PLAN-abandoned-idea.md` (Last modified: 2025-12-15)
  - **Recommendation**: Archive or delete

## Next Maintenance
Recommended: {30 days from now}
```

## Constraints

- **Never Delete**: Only move to archive, never delete files
- **Preserve Frontmatter**: Keep all metadata intact
- **Update Links**: Fix broken cross-references
- **Ask First**: For files < 7 days old, ask user before archiving
- **Idempotent**: Can run multiple times safely

## Safety Checks

Before archiving, verify:
1. File is not referenced in any open backlog ticket
2. File is not referenced in active `docs/working/` files
3. File is marked as completed in CHANGELOG or has `status: done`

## Reflexion

After maintenance, verify:
1. All archived files are in `docs/archive/YYYY-MM/`
2. All cross-references are updated
3. `docs/working/` has < 8 files
4. No broken links in active docs
5. Maintenance report is generated
