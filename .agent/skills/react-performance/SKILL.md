---
name: react-performance
description: Performance optimization patterns for React SPAs. Loads verification rules from foundations.
---

# React Performance Skill (Active Router)

**Purpose**: Verify performance best practices using the Single Source of Truth (`docs/rules`).

## 1. Context Loading (Truth)
- [ ] **Load System Rules**: `view_file .agent/rules/foundation-design-system.md` (Check Bundle/network sections).
- [ ] **Load React Rules**: `view_file .agent/rules/tech-react.md` (Check Verification > Logic > Performance).

## 2. Active Verification (Grep Strategy)
Run these commands to find common performance killers:

### Bundle Size
- `grep -r "import .* from '.*'" src | grep -v "type"` (Check for barrel imports)
- `grep -r "lazy(" src` (Verify lazy loading is used for routes)

### Render Cycles
- `grep -r "useMemo" src` (Check if expensive calculations are memoized)
- `grep -r "useCallback" src` (Check if props to children are stable)

### Network / Async
- `grep -r "await" src` (Check for serial waterfalls inside loops)

## 3. Analysis
- **Compare findings against the "Verification" sections** in the loaded rule files.
- **Report**: List Critical (Blocking) vs High (Fix soon) issues.
