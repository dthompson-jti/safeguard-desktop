---
description: Codebase sweep generating backlog tickets for maintenance.
---

# Sweep Workflow

Universal maintenance sweep to identify code evolution, documentation drift, hygiene issues, and agent knowledge gaps.

## Goal
Proactively identify maintenance tasks and capture them as actionable backlog tickets in `docs/backlog/`.

## Inputs required (optional)
- Scope: `code`, `docs`, `hygiene`, `agent`, `all` (default: `all`).

## Skill routing (explicit)
- Use skill: `sweep-codebase`.

## Procedure
1. **Discovery**: Route to the `sweep-codebase` skill based on the provided scope.
2. **Analysis**: Perform targeted checks (git diffs, file counts, link verification).
3. **Ticketing**: 
   - Generate a random 2-letter session key (e.g., 'AB').
   - For each finding, create a new ticket in `docs/backlog/{CATEGORY}-{SESSION}-{###}.md`.
   - Use sequential numbering within the session.
4. **Report**: Provide a concise summary of the tickets created with their IDs.

## Notes
- Does NOT auto-fix issues; only generates tickets.
- Does NOT update any central index file (no merge conflicts).
- Use `/backlog-status` workflow to view all open tickets.
- Prioritize high-impact refactors and critical documentation rot.
