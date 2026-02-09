---
name: debug-standard
description: Systematic root cause analysis for reproducible bugs. Use when user reports a bug that can be reproduced.
---

# Debug Standard

Forensic analysis: Observe → Hypothesize → Investigate → Fix → Verify.

## Scope Escalation
If fix touches >5 files or shared API, escalate to `debugging-deep`.

## Approach

### Phase 1: Reproduce
Document precisely:
- Steps to reproduce (numbered)
- Expected vs actual behavior
- Environment (browser, OS)

### Phase 2: Hypothesize
Generate **3-4 hypotheses** tracing from data source downstream:

**Hypothesis Format**:
- **#1** [Hypothesis] — Confidence: High/Medium/Low — Evidence Needed: [What to check]
- **#2** [Hypothesis] — Confidence: High/Medium/Low — Evidence Needed: [What to check]

### Phase 3: Root Cause
Confirm with evidence (file:line reference). Plan holistic fix.

### Phase 4: Implement & Verify
```bash
npm run lint && npm run build
```
User verifies in browser.

## Reflexion
Before implementing:
- What regression risks?
- What edge cases might fail?
- What if data is malformed?

## Constraints
- Fix pattern, not just instance
- If fix fails, iterate (max 3 attempts)
- No code until root cause confirmed
