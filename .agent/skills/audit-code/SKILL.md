---
name: audit-code
description: Technical code review for architecture, type safety, and patterns. Use for pre-merge review or code quality audit.
---

# Audit Code

Multi-perspective review: Architect + QA perspectives with Red Team mindset.

## Step 1: Project Invariants
**Before auditing**, check `.agent/rules/`:
- `AGENTS.md` — code patterns and prohibitions
- `*.md` — behavioral rules
- Flag invariant violations as **Critical**.

## Step 2: Technical Review (Architect)
- [ ] Architectural soundness
- [ ] Dependency hygiene
- [ ] Type safety (`as any`, missing guards)
- [ ] Pattern adherence

## Step 3: QA Review
- [ ] Edge cases: loading, empty, error states
- [ ] Error handling coverage
- [ ] Accessibility: keyboard, screen reader
- [ ] Testability

## Step 4: Prioritize

**Priority Levels**:
- **Critical (9-10)** — Crashes, data loss, security vulnerabilities.
- **High (7-8)** — Breaks primary functionality or violates core invariants.
- **Medium (4-6)** — Inconsistent UI, minor tech debt, or non-blocking bugs.
- **Low (1-3)** — Stylistic issues, typos, or cosmetic improvements.

## Step 5: Meta-Analysis
If multiple low-priority findings cluster → identify systemic issue.

## Constraints
- Cite evidence: "@filename:line"
- Reference rules: "Violates AGENTS.md line X"
- Do not auto-fix — report and await decision

## Output
```markdown
## Critical
- [Finding] @file:line — Violates [Rule]
## Systemic Issues
- [Pattern across findings]
```
