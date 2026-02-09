# Async Maintenance Jobs

Safe, conflict-free maintenance jobs that can run on a schedule or on-demand.

## Core Pattern: Timestamped Artifacts

All async jobs follow this pattern to prevent merge conflicts:
```
docs/reports/{JOB_NAME}-{YYYY-MM-DD}.md
```

**Benefits**:
- ✅ Zero merge conflicts (unique filename per run)
- ✅ Historical tracking
- ✅ Easy to diff over time
- ✅ Auto-cleanup (archive files > 90 days)

---

## Job Catalog

### 1. Dependency Audit
**Frequency**: Weekly
**Command**: `npm outdated --json`
**Output**: `docs/reports/deps-YYYY-MM-DD.md`

**Purpose**: Track outdated dependencies and security vulnerabilities.

**Report Format**:
```markdown
# Dependency Audit: {YYYY-MM-DD}

## Outdated Packages ({count})

| Package | Current | Latest | Type | Security |
| :--- | :--- | :--- | :--- | :--- |
| react | 18.2.0 | 18.3.0 | dependencies | ✅ |
| typescript | 5.0.0 | 5.3.0 | devDependencies | ⚠️ CVE-2024-XXX |

## Recommendations
- **Critical**: Update typescript (security vulnerability)
- **Optional**: Update react (minor version)
```

---

### 2. Performance Baseline
**Frequency**: Daily (if changes detected)
**Command**: Lighthouse CI or custom perf script
**Output**: `docs/reports/perf-YYYY-MM-DD.json`

**Purpose**: Track performance metrics over time.

**Metrics**:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Bundle size

---

### 3. Accessibility Scan
**Frequency**: On-demand
**Skill**: `audit-accessibility`
**Output**: `docs/reports/a11y-YYYY-MM-DD.md`

**Purpose**: Automated WCAG 2.1 AA compliance check.

---

### 4. Bundle Size Tracking
**Frequency**: After each build
**Command**: `webpack-bundle-analyzer` or `vite-bundle-visualizer`
**Output**: `docs/reports/bundle-YYYY-MM-DD.json`

**Purpose**: Track bundle size growth and identify bloat.

**Report Format**:
```json
{
  "date": "2026-02-02",
  "totalSize": "245KB",
  "chunks": [
    {"name": "main", "size": "180KB"},
    {"name": "vendor", "size": "65KB"}
  ],
  "delta": "+5KB from previous"
}
```

---

### 5. Dead Code Detection
**Frequency**: Weekly
**Command**: `ts-prune` or `knip`
**Output**: `docs/reports/deadcode-YYYY-MM-DD.md`

**Purpose**: Identify unused exports and imports.

**Report Format**:
```markdown
# Dead Code Report: {YYYY-MM-DD}

## Unused Exports ({count})

| File | Export | Type |
| :--- | :--- | :--- |
| src/utils/old.ts | formatDate | function |
| src/components/Legacy.tsx | LegacyButton | component |

## Recommendations
- Remove unused exports
- Consider deprecation warnings before deletion
```

---

### 6. Git History Analysis
**Frequency**: Monthly
**Command**: `git log --since="30 days ago" --numstat`
**Output**: `docs/reports/git-analysis-YYYY-MM.md`

**Purpose**: Identify hotspots, churn rate, and contributor patterns.

**Metrics**:
- Files with most commits (hotspots)
- Lines changed per file (churn)
- Contributor activity

---

### 7. Documentation Coverage
**Frequency**: Weekly
**Command**: Custom script scanning for JSDoc/comments
**Output**: `docs/reports/doc-coverage-YYYY-MM-DD.md`

**Purpose**: Track which components/functions lack documentation.

**Report Format**:
```markdown
# Documentation Coverage: {YYYY-MM-DD}

## Coverage: 65%

## Missing Documentation ({count})

| File | Item | Type |
| :--- | :--- | :--- |
| src/components/Button.tsx | Button | component |
| src/utils/format.ts | formatCurrency | function |

## Recommendations
- Prioritize documenting public APIs
- Add JSDoc to exported functions
```

---

### 8. Type Coverage Report
**Frequency**: Weekly
**Command**: `type-coverage` or custom TS analysis
**Output**: `docs/reports/type-coverage-YYYY-MM-DD.md`

**Purpose**: Track `any` types and missing type annotations.

**Report Format**:
```markdown
# Type Coverage: {YYYY-MM-DD}

## Coverage: 92%

## `any` Types ({count})

| File | Line | Context |
| :--- | :--- | :--- |
| src/hooks/useData.ts | 45 | Function parameter |
| src/components/Form.tsx | 120 | Event handler |

## Missing Interfaces ({count})

| File | Line | Context |
| :--- | :--- | :--- |
| src/api/client.ts | 30 | API response |
```

---

## Cleanup Job

### `/cleanup-reports`
**Frequency**: Monthly
**Purpose**: Archive old reports to prevent clutter.

**Procedure**:
1. Scan `docs/reports/`
2. Find files older than 90 days
3. Move to `docs/archive/reports/YYYY-MM/`
4. Generate cleanup summary

---

## Scheduling Recommendations

### GitHub Actions (Example)
```yaml
name: Async Maintenance

on:
  schedule:
    - cron: '0 2 * * 1' # Weekly on Monday 2am
  workflow_dispatch: # Manual trigger

jobs:
  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm outdated --json > deps.json
      - run: # Generate markdown report
      - uses: actions/upload-artifact@v3
        with:
          name: deps-report
          path: docs/reports/deps-*.md
```

### Local Cron (Example)
```bash
# Run dependency audit every Monday at 9am
0 9 * * 1 cd /path/to/project && npm run audit:deps

# Run performance baseline daily at midnight
0 0 * * * cd /path/to/project && npm run audit:perf
```

---

## Best Practices

1. **Timestamped Outputs**: Always use `YYYY-MM-DD` in filenames
2. **No Overwrites**: Never overwrite existing reports
3. **Artifact Only**: Only generate new files, never modify existing code
4. **Idempotent**: Safe to run multiple times
5. **Self-Contained**: Each report should be readable standalone
6. **Actionable**: Include recommendations, not just data
7. **Cleanup**: Archive old reports regularly

---

## Integration with Agent

These jobs can be triggered via:
- Manual workflows (e.g., `/audit-deps`)
- Scheduled GitHub Actions
- Pre-commit hooks (for fast jobs)
- CI/CD pipelines

The agent can read these reports and:
- Generate backlog tickets for issues found
- Track trends over time
- Alert on regressions (e.g., bundle size +20%)
