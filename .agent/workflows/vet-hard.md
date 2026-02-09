---
description: Full adversarial red team review with multiple hostile personas.
---

# Vet Hard Workflow

Comprehensive adversarial review using the vet-hard skill for critical features and high-risk changes.

## Goal
Perform exhaustive red team analysis with multiple hostile personas to identify vulnerabilities, failure modes, and attack vectors.

## Inputs required (ask if missing)
- Plan or architecture document to review (path or name)

## Skill routing (explicit)
- Use skill: `vet-hard`

## Procedure
1. **Identify Document**: Ask user for the plan/architecture document to review if not provided.
2. **Execute Review**: Route to the `vet-hard` skill with the document path.
3. **Generate Report**: Skill outputs `docs/working/VET-REDTEAM-{name}.md`.
4. **Present Findings**: 
   - Overall risk assessment
   - Critical blockers (must fix before merge)
   - High-priority items (should fix before merge)
   - Estimated remediation effort

## Notes
- Comprehensive review (~30-60 minutes)
- Use for critical features (auth, payments, data integrity)
- Use for high-risk architectural changes
- Use before production deployment
- Use `/vet` for lighter, faster reviews
