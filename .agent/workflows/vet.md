---
description: Review for overlooked aspects, edge cases, and unintended consequences.
---

# Vet Workflow

Quick quality review using the vet-simple skill to identify overlooked aspects and unintended consequences.

## Goal
Perform a lightweight adversarial review before implementation to catch edge cases, accessibility issues, and potential problems.

## Inputs required (ask if missing)
- Plan or architecture document to review (path or name)

## Skill routing (explicit)
- Use skill: `vet-simple`

## Procedure
1. **Identify Document**: Ask user for the plan/architecture document to review if not provided.
2. **Execute Review**: Route to the `vet-simple` skill with the document path.
3. **Generate Report**: Skill outputs `docs/working/VET-{name}.md`.
4. **Present Findings**: Summarize key findings and priority breakdown.

## Notes
- Time-boxed to ~15 minutes
- Focuses on practical, actionable findings
- Use `/vet-hard` for critical features requiring deeper analysis
