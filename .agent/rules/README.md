# Agent Rules Index

This directory contains the non-negotiable standards and patterns for the AI agent. These rules are triggered automatically based on file type or model decision.

## Foundation (Core Physics)
These rules are essential for maintaining the project's visual and structural integrity.
- `foundation-design-system.md` — Zero Hex Tolerance, layout principles, motion physics.
- `foundation-design-tokens.md` — Semantic tokens, primitives, and token generation workflow.
- `foundation-accessibility.md` — WCAG standards, semantic structure, and keyboard navigation.

## Technology (Stack Standards)
Standards for the core languages and frameworks used in the project.
- `tech-react.md` — Hooks (Top-Level Absolute), component composition, and Jotai integration.
- `tech-typescript.md` — Type safety (No `any`), constants, and barrel exports.

## Patterns (Logic & UX)
Consistent interaction patterns and structural building blocks.
- `pattern-inputs.md` — Buttons (Scale physics), sliders (3-layer), and form alignment.
- `pattern-navigation.md` — Menus, tabs (URL-First), and project site map.
- `pattern-structure.md` — Panel headers (Fixed height), cards, and adaptive layouts.
- `pattern-error-handling.md` — Error boundaries, loading skeletons, and toast orchestration.
- `pattern-state.md` — Jotai atom naming, derived state, and persistence patterns.

## Domain (Specialized)
Rules for specific feature areas or content types.
- `domain-content.md` — Tone of voice (Warm & Capable), canonical terminology, and copy patterns.
- `domain-react-flow.md` — Node-based diagram standards and registry requirements.

---

## Rule Triggers
- **Glob Triggers**: Rules loaded based on file extension (e.g., `tech-react.md` for `.tsx`).
- **Model Decision**: Rules loaded when the agent determines they are relevant to the task (e.g., `pattern-inputs.md` when building a form).
