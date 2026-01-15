# AGENTS.md Template

This file contains instructions for AI agents working on your project.

---

## Project Overview

**[TODO: Describe your project in 2-3 sentences]**

Example:
> This is a React-based web application for [purpose]. Built with TypeScript, Vite, and Jotai for state management.

---

## Code Patterns

### Preferred Patterns
**[TODO: List your preferred coding patterns]**

Examples:
- Use functional components with hooks
- Prefer composition over inheritance
- Use Jotai atoms for global state

### Prohibited Patterns
**[TODO: List what NOT to do]**

Examples:
- No `as any` type casts without justification
- No inline styles (use CSS modules)
- No mutations of state

---

## Design System

**[TODO: Reference your design system docs]**

See:
- `docs/knowledge-base/SPEC-CSS.md` for design tokens
- `docs/knowledge-base/SPEC-SPACING.md` for spacing system

---

## Testing

**[TODO: Describe your testing approach]**

Examples:
- Unit tests: Vitest
- Component tests: React Testing Library
- E2E tests: Playwright

---

## Project-Specific Rules

**[TODO: Add any project-specific constraints]**

Examples:
- Always run `npm run lint` before committing
- Typography: No font weights above 500
- Spacing: Use `gap`, never external margins on child components

---

## File Structure

**[TODO: Describe your project's file organization]**

Example:
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific modules
├── styles/         # Global styles and tokens
└── utils/          # Shared utilities
```
