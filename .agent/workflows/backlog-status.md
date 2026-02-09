---
description: Generate ephemeral backlog overview from distributed ticket files.
---

# Backlog Status Workflow

Generate an on-demand overview of all backlog tickets without maintaining a central index file.

## Goal
Provide a scannable view of open and recently completed backlog tickets by reading individual ticket files.

## Inputs required (optional)
- Filter: `open`, `done`, `all` (default: `open`)
- Category: `code`, `docs`, `hygiene`, `agent`, `all` (default: `all`)

## Procedure

1. **Scan Backlog Directory**:
   - List all files in `docs/backlog/` (excluding `archive/` subdirectory)
   - Pattern: `{CATEGORY}-{RANDOM}-{###}.md`

2. **Read Ticket Metadata**:
   For each ticket file:
   - Read YAML frontmatter
   - Extract: `id`, `category`, `priority`, `status`, `created`
   - Read first heading for title

3. **Filter Tickets**:
   - Apply status filter (open/done/all)
   - Apply category filter if specified
   - Sort by priority (high → med → low), then by created date (newest first)

4. **Generate Overview**:
   Create `brain/backlog-view.md` with:
   ```markdown
   # Backlog Status
   
   **Generated**: {YYYY-MM-DD HH:MM}
   **Filter**: {status} | {category}
   **Total Tickets**: {count}
   
   ## Open Tickets ({count})
   
   | ID | Title | Priority | Category | Created |
   | :--- | :--- | :--- | :--- | :--- |
   | [CODE-AB-001](file:///.../docs/backlog/CODE-AB-001.md) | Refactor Large Files | Med | Code | 2026-02-02 |
   | [DOCS-XY-042](file:///.../docs/backlog/DOCS-XY-042.md) | Update Stale PRD | Low | Docs | 2026-02-01 |
   
   ## Recently Completed ({count})
   
   | ID | Title | Completed |
   | :--- | :--- | :--- |
   | [CODE-AB-005](file:///.../docs/backlog/archive/CODE-AB-005.md) | Fix Linting | 2026-01-30 |
   ```

5. **Display Summary**:
   Show the user:
   - Total open tickets
   - Breakdown by category
   - Breakdown by priority
   - Link to `brain/backlog-view.md`

## Notes
- This workflow does NOT modify any files in `docs/backlog/`
- The generated view is ephemeral (in `brain/`)
- Can be run as often as needed with zero merge conflict risk
- Use this instead of maintaining a central BACKLOG.md

## Example Usage
- `/backlog-status` — View all open tickets
- `/backlog-status open code` — View open code tickets only
- `/backlog-status all` — View all tickets (open + done)
