---
description: Scaffold a new React component following project patterns.
---

# Scaffold Workflow

Generate standardized component boilerplate following project conventions.

## Goal
A new component directory with all required files (component, CSS module, barrel export).

## Inputs required (ask if missing)
- Component name
- Component type: `shared` (src/components/) or `feature` (src/features/)
- Target directory (if feature)

## Safety + scope
- Do NOT: Create components without following naming conventions.
- Only touch: Target directory specified.

## Skill routing (explicit)
- Use skill: `implement-component-scaffold`.

## Procedure
1. **Context**:
   - run: view_file .agent/skills/implement-component-scaffold/SKILL.md
   - Determine component type and target directory.

2. **Execution**:
   - Create directory structure
   - Generate component file with proper typing
   - Generate CSS module with design tokens
   - Create barrel export

3. **Verification**:
   - Run `npm run lint` to validate syntax.

## Notes
- After scaffolding, implement component logic manually or with `/build`.
