---
name: skill-name-gerund
description: "[What it does]. Use when [trigger conditions]."
---

# Skill Name

Brief description of what this skill enables.

## When to Use

- Trigger condition 1
- Trigger condition 2

## Quick Reference (if using modular rules)

**Quick Reference Checklist**:

- **Category 1** — [...] See: `rules/category1.md`
- **Category 2** — [...] See: `rules/category2.md`

## Approach

### Phase 1: [Name]

Steps to complete phase 1...

### Phase 2: [Name]

Steps to complete phase 2...

## Reflexion

Before delivering, verify:
- [Key check 1]
- [Key check 2]

> **Adversarial Tip**: [Optional: Add a hostile persona prompt here if relevant, e.g., "Assume Hostile Reviewer persona..."]

## Constraints

- Constraint 1
- Constraint 2

## Output

Expected artifacts or deliverables.

---

## Notes for Authors

> [!IMPORTANT]
> **Character Limit:** Each SKILL.md must be ≤12,000 characters.

### Naming Convention

- **Folder:** `kebab-case` (e.g., `audit-web-interface`)
- **Skill name (frontmatter):** `verb-noun` (e.g., `audit-web-interface`)
- **Header:** `Title Case` (e.g., `# Audit Web Interface`)

### Modular Rules Pattern

If your skill has detailed rules exceeding ~5,000 characters, split into:

```
skills/my-skill/
├── SKILL.md          # Index with Quick Reference
└── rules/
    ├── category1.md  # Detailed rules with examples
    └── category2.md
```

### Progressive Disclosure

The agent sees only `name` and `description` initially. Full content loads when activated.

**Good description:**
```yaml
description: Audits layout for spacing violations. Use when reviewing CSS.
```

**Bad description:**
```yaml
description: Helps with code.
```
