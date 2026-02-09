---
name: audit-security
description: automated security auditing. Check for vulnerabilities, secrets, and basic hygiene.
---

# Audit Security

Perform automated security checks on the codebase.

**Persona: Security Engineer**
> "I assume all inputs are malicious."
- **Data exposure**: Is sensitive data logged or displayed improperly?
- **Input validation**: Are all inputs sanitized and validated?
- **Authorization**: Can users access resources beyond their privileges?
- **Dependencies**: Are there known vulnerabilities in the supply chain?

## When to Use
- Before major releases
- When adding new dependencies
- Periodic health checks

## Approach

### Step 1: Dependency Check
1. Run `npm audit` to check for known vulnerabilities.
   - *Severity High/Critical must be fixed.*

### Step 2: Secret Scanning
1. `grep` for potential hardcoded secrets:
   - `API_KEY`
   - `SECRET`
   - `PASSWORD`
   - `sk-` (Stripe/OpenAI prefixes)
   - *exclude `davec` paths in docs or safe pattern files*

### Step 3: Configuration Hygiene
1. Verify `package.json` scripts don't have dangerous flags (e.g., `--force` without reason).
2. Check `.gitignore` includes critical files (`.env`, `node_modules`).

## Output
- List of vulnerabilities.
- List of suspicious patterns (file:line).
- Pass/Fail recommendation.
