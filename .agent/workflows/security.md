---
description: Run automated security checks (audit, secrets, hygiene).
---

# Security Workflow

Run automated security checks for vulnerabilities and secrets.

## Goal
Zero high-severity vulnerabilities and zero exposed secrets in the codebase.

## Inputs required (ask if missing)
- None (Global scan)

## Safety + scope
- Do NOT: Output sensitive findings to public logs if avoidable.
- Redact secrets in the final report.

## Skill routing (explicit)
- Use skill: `audit-security`.

## Procedure
1. **Vulnerability Scan**:
   - run: view_file .agent/skills/audit-security/SKILL.md
   - Run `npm audit`.

2. **Secret Scan**:
   - Grep for common secret patterns (API keys, tokens, `.env` exposure).

3. **Hygiene**: Verify `.gitignore` covers sensitive files.

4. **Report**: Summarize findings and required remediation steps.

## Notes
- Mandatory before PR completion or major deployments.
