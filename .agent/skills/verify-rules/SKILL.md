---
name: verify-rules
description: Automated invariant verification using grep checks from rules. Use to validate Zero Hex, margins, z-index, and casing compliance.
---

# Verify Rules

Automated verification of project invariants defined in `.agent/rules/`.

## When to Use
- Before major releases or merges
- After large refactoring efforts
- As part of `/audit full` workflow
- When onboarding to verify codebase health

## Approach

### Phase 1: Zero Hex Tolerance Check
```bash
grep -rn "#[0-9a-fA-F]\{3,6\}" src/ --include="*.css" --include="*.tsx" --include="*.ts"
```
**Verdict**: Any matches are **Critical** failures. Use tokens from `SPEC-CSS.md`.

### Phase 2: Direct Margin Check
```bash
grep -rn "margin:" src/ --include="*.css" --include="*.module.css"
```
**Verdict**: Review matches. Prefer `gap` in parent or `padding` in child.

### Phase 3: Direct Z-Index Check
```bash
grep -rn "z-index: [0-9]" src/ --include="*.css"
```
**Verdict**: Should use `var(--z-*)` tokens instead of hardcoded values.

### Phase 4: Lowercase Feature Directories
```bash
ls src/features/
```
**Verdict**: All directories must be strictly lowercase. Mixed case causes import errors.

### Phase 5: Inline Style Check
```bash
grep -rn "style={{" src/ --include="*.tsx"
```
**Verdict**: Components should use CSS Modules, not inline styles.

## Output Format
```markdown
## Verification Results

### Critical (Must Fix)
- [ ] Hex codes found: [count] occurrences
  - @file:line — `#hex` should be `var(--token)`

### High (Should Fix)
- [ ] Direct margins: [count] occurrences
- [ ] Hardcoded z-index: [count] occurrences

### Medium (Review)
- [ ] Inline styles: [count] occurrences

### Pass
- [x] Feature directories: All lowercase
```

## Constraints
- **Report only** — do not auto-fix violations
- Exclude `node_modules/`, `dist/`, `.git/`
- Group findings by severity, not by check type
