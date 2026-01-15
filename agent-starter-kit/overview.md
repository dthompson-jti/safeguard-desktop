# Agent Starter Kit

A portable, reusable package for AI agent configuration across projects and machines.

---

## What This Is

This package provides a complete agent configuration system with:
- **22 Skills**: AI capabilities for exploration, planning, implementation, debugging, auditing, and research
- **13 Workflows**: Structured sequences like `/prd`, `/build`, `/audit-layout`, `/wrap-up`
- **6 Rules**: Guardrails for browser usage, design systems, testing, security, artifacts, and project invariants
- **Project Templates**: Starter files for knowledge base, changelog, and agent configuration

---

## Quick Start

### 1. Copy `.agent/` to Your Project

Copy the entire `.agent/` folder to your project root:

```
your-project/
├── .agent/
│   ├── skills/      # 22 skills
│   ├── workflows/   # 13 workflows
│   └── rules/       # 6 rules
├── src/
├── docs/
└── ...
```

**That's it!** Antigravity automatically discovers skills, workflows, and rules in `.agent/`.

### 2. Set Up Project Documentation

Copy the template files from `project-templates/` to your project:

```bash
# Copy template files
cp project-templates/GEMINI.md your-project/
cp project-templates/CLAUDE.md your-project/
cp project-templates/CHANGELOG.md your-project/
cp -r project-templates/docs/ your-project/docs/
```

### 3. Customize for Your Project

Edit `docs/knowledge-base/AGENTS.md` to include:
- Project overview
- Code patterns
- Design system references
- Testing approach
- Project-specific rules

See `project-templates/docs/knowledge-base/SPEC-EXAMPLES.md` for examples.

---

## Package Contents

### Skills (`.agent/skills/`)

| Category | Skills | Description |
|:---------|:-------|:------------|
| **Explore** | `tech`, `ux`, `ui-design`, `concept` | Discovery and ideation |
| **Plan** | `prd`, `architecture`, `feature` | Planning and design |
| **Implement** | `quick-fix`, `feature`, `refactor` | Code implementation |
| **Debug** | `standard`, `deep` | Debugging and diagnosis |
| **Audit** | `code`, `docs`, `layout`, `typography`, `design-system`, `refactor-opportunities`, `accessibility`, `performance` | Quality reviews |
| **Research** | `synthesize`, `deep` | Research and learning |

### Workflows (`.agent/workflows/`)

| Workflow | Description |
|:---------|:------------|
| `/prd` | Create Product Requirements Document |
| `/plan` | Create implementation plan |
| `/architect` | Create technical architecture |
| `/build` | Implement from approved plan |
| `/quick-fix` | Atomic fixes (≤30 lines, ≤5 files) |
| `/refactor` | Code restructuring |
| `/debug` | Systematic debugging |
| `/audit-layout` | Audit spacing and alignment |
| `/audit-typography` | Audit fonts and hierarchy |
| `/audit-design-system` | Audit token usage |
| `/audit-refactor` | Identify refactoring opportunities |
| `/full-audit` | Comprehensive audit |
| `/wrap-up` | Finalize session |

### Rules (`.agent/rules/`)

| Rule | Purpose |
|:-----|:--------|
| `browser-usage.md` | No browser testing unless requested |
| `design-system.md` | Always use design tokens |
| `testing.md` | Run lint/build before completion |
| `security.md` | Prevent secrets, unauthorized deps, network calls |
| `artifacts.md` | Use task.md, implementation_plan.md, walkthrough.md |
| `project-invariants.md` | Check knowledge-base before auditing |

---

## Setting Up a New Project

### Step 1: Copy Agent Configuration

```bash
cp -r agent-starter-kit/.agent your-project/
```

### Step 2: Create Documentation Structure

```bash
# Create directories
mkdir -p your-project/docs/knowledge-base
mkdir -p your-project/docs/archive

# Copy templates
cp agent-starter-kit/project-templates/docs/knowledge-base/AGENTS.md your-project/docs/knowledge-base/
cp agent-starter-kit/project-templates/GEMINI.md your-project/
cp agent-starter-kit/project-templates/CLAUDE.md your-project/
cp agent-starter-kit/project-templates/CHANGELOG.md your-project/
```

### Step 3: Customize AGENTS.md

Edit `your-project/docs/knowledge-base/AGENTS.md` and fill in:

```markdown
## Project Overview
[Describe your project in 2-3 sentences]

## Code Patterns
[List preferred patterns and what to avoid]

## Design System
[Reference your SPEC-*.md files]

## Testing
[Describe testing approach]

## Project-Specific Rules
[Add constraints specific to your project]
```

### Step 4: Create SPEC Files

Create SPEC files for your project. See `project-templates/docs/knowledge-base/SPEC-EXAMPLES.md` for templates:

- `SPEC-CSS.md` — Design tokens
- `SPEC-SPACING.md` — Spacing system
- `SPEC-COMPONENTS.md` — Component library
- `SPEC-ARCHITECTURE.md` — System architecture
- `SPEC-TYPOGRAPHY.md` — Typography hierarchy

### Step 5: Verify Setup

In your Antigravity agent, type `/` to see workflows. You should see all 13 workflows available.

Ask the agent: "What skills do you have?" to confirm skills are loaded.

---

## Customization Guide

### Adapting Rules

Edit `.agent/rules/*.md` files to match your project:

**Example: `testing.md`**
```markdown
## Required Commands
```bash
npm run lint
npm run build
npm run test
```
```

**Example: `design-system.md`**
```markdown
## References
- `docs/knowledge-base/SPEC-CSS.md`
- `docs/knowledge-base/SPEC-SPACING.md`
- `docs/my-custom-design-guide.md`
```

### Adding Custom Workflows

Create a new `.md` file in `.agent/workflows/`:

```markdown
---
description: Your workflow description
---

# My Custom Workflow

## Steps
1. First step
2. Second step
3. Third step
```

### Adding Custom Skills

Create a new folder in `.agent/skills/` with a `SKILL.md` file:

```markdown
---
name: my-custom-skill
description: What this skill does. Use when...
---

# My Custom Skill

## When to Use
- Use case 1
- Use case 2

## Approach
Step-by-step instructions
```

---

## Workflow Reference

### Planning Workflows
- `/prd` → Create PRD → `/architect` → Create architecture → `/build`
- `/plan` → Create plan → `/build`

### Implementation Workflows
- `/quick-fix` → Atomic changes → `/wrap-up`
- `/build` → Implement plan → `/wrap-up`
- `/refactor` → Code restructuring → `/wrap-up`

### Audit Workflows
- `/audit-layout` → Review findings → `/quick-fix` or `/plan`
- `/audit-typography` → Review findings → `/quick-fix` or `/plan`
- `/audit-design-system` → Review findings → `/quick-fix` or `/plan`
- `/full-audit` → Comprehensive review → `/quick-fix` or `/plan`

### Debugging Workflows
- `/debug` → Diagnose → Fix → `/wrap-up`

### Finalization
- `/wrap-up` → Verify, cleanup, document, archive

---

## FAQ

### Q: Do I need all the skills?
**A:** Yes, keep them all. They're auto-discovered by the agent based on context. Unused skills won't interfere.

### Q: Can I modify skills and workflows?
**A:** Yes! They're just markdown files. Customize to your needs.

### Q: How do I update rules for my project?
**A:** Edit the `.agent/rules/*.md` files. Change paths, commands, and constraints to match your project.

### Q: What if I use a different package manager (yarn, pnpm)?
**A:** Edit `.agent/rules/testing.md` to use your commands (`yarn lint`, `pnpm build`, etc.).

### Q: Can I use this across multiple projects?
**A:** Absolutely! That's the point. Copy `.agent/` to each project, customize `AGENTS.md` for each.

### Q: How do I share this with my team?
**A:** Commit `.agent/` and `docs/` to your repo. Everyone using Antigravity will automatically get the workflows.

### Q: Do I need GEMINI.md AND CLAUDE.md?
**A:** They're just pointers to `AGENTS.md`. Keep both so it works with any agent.

---

## What's Next?

1. **Verify setup**: Type `/` in Antigravity to see workflows
2. **Try a workflow**: Run `/audit-layout` to test the system
3. **Customize docs**: Fill in your `AGENTS.md` and create SPEC files
4. **Share**: Commit to your repo for your team

---

**Package Version:** 1.0.0  
**Last Updated:** 2026-01-14
