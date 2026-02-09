---
name: implement-flight-check
description: Pre-flight checklist to ensure the environment and plan are ready before implementation.
---

# Flight Check Skill (Pre-Implementation)

**Purpose**: Verify readiness before writing code. Prevents "blind coding" and ensures the plan is loaded.

## 1. Context Loading
- [ ] **Load Plan**: `view_file implementation_plan.md` (or the specific plan for this task).
- [ ] **Load Task**: `view_file task.md`.
- [ ] **Check Server**: Is the dev server running? (Don't restart if yes).

## 2. File Reconnaissance
- [ ] **View Targets**: Run `view_file` on the files you are about to edit (as listed in the plan).
- [ ] **verify Path**: Confirm file paths in the plan actually exist (unless creating new ones).

## 3. Safety Check
- [ ] **Git Status**: Are we on a clean branch? (Optional, but good practice).
- [ ] **Lint Check**: Run `npm run lint` to ensure we aren't starting on broken code.
