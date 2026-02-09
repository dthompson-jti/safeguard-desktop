---
description: Export portable agent configuration for use in other projects
---

# Export Kit Workflow

Export a portable Antigravity "Expansion Pack" for another codebase.

## Goal
A self-contained directory containing specialized rules and skills.

## Inputs required (ask if missing)
- Target directory for export.
- Selection of skills/rules to include.

## Safety + scope
- Do NOT: Include `.env` or secrets.
- Only touch: Target export directory.

## Skill routing (explicit)
- Use skill: `optimize-agent` (for packaging logic if automated).

## Procedure
1. **Filtering**: Identify the most valuable patterns and skills in the current project.
2. **Packaging**: 
   - Copy selected `.agent/rules/` and `.agent/skills/`.
   - sanitize paths for the new environment.
3. **Documentation**: Create a `README-EXPANSION.md` for the target project.

## Notes
- Helps scale Antigravity rigor across the user's entire portfolio.
