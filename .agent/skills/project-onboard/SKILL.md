---
name: project-onboard
description: Rapid context loading for new agents. Reads key documentation to build a mental model.
---

# Project Onboard

Understand the project context, rules, and architecture.

## When to Use
- Start of a new session (if context is lost).
- New agent joining the project.
- When you feel "lost" or misaligned.

## Approach

### Step 1: Protocol Download
1. Read `AGENTS.md` (The Law).
2. Read `.agent/workflows/_map.md` (if exists) or list workflows.

### Step 2: Product Context
1. Read `README.md`.
2. Read `.agent/rules/PRD-*.md` (Recent PRDs).

### Step 3: Technical Constraints
1. Read `architecture.md` (if exists).
2. Read `.agent/rules/*.md`.
   - *Key Focus*: `foundation-design-system.md`, `tech-react.md`.

## Output
- A short "Mental Model" summary:
   - "This project is a [Type] built with [Stack]."
   - "Key rules are [Rule A, Rule B]."
   - "Current focus appears to be [Focus]."
- Ready to accept tasks.

## Constraints
- Read-only exploration — no code generation
- Do not modify any files during onboarding
- If uncertain about priorities, ask the user before proceeding
