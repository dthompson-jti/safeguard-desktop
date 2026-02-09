---
name: implement-session-wrap-up
description: Encapsulates technical verification, archival, and documentation cleanup at the end of a session.
---

# Session Wrap-Up Skill

Finalize the session by ensuring technical health and documentation hygiene.

## Instructions

1. **Technical Verification**:
   - [ ] Run `npm run lint` — fix any trivial errors, report complex ones.
   - [ ] Run `npm run build` — ensure no regressions.
   - [ ] Check `npm run test` status (if applicable).

3. **Pattern & Rule Codification**:
   - [ ] **Establish Invariants**: If a new pattern or architectural decision was made (e.g., a new inheritance model, a specific way to handle state), identify the relevant `.agent/rules/*.md` file.
   - [ ] **Update Authority**: Codify the new standard in the rules file to ensure future agents (and yourself) follow this pattern and prevent regressions.
   - [ ] **Cross-Reference**: Ensure any new rules are cross-referenced in other relevant rule files.

4. **Archival & Documentation**:
   - [ ] **Changelog**: Append a summary of changes to `./CHANGELOG.md`.
   - [ ] **Walkthrough**: Update or create `walkthrough.md` with proof of work (links to screenshots/diffs).
   - [ ] **Plans**: Move the `implementation_plan.md` (or similar) from the `brain/` directory to `docs/archive/`.

5. **Task Finalization**:
   - [ ] Mark all items in `task.md` as complete.
   - [ ] Call `task_boundary` with a final "complete" summary.

## Constraints
- **Zero Drift**: Documentation must match reality. Do not archive a plan until the code matches it perfectly.

## Output
Final confirmation message with links to the updated `walkthrough.md` and `./CHANGELOG.md`.
