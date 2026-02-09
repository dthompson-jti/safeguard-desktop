---
description: Universal exploration command. Routes to specific domains (UI, Libraries, Architecture).
---

# Explore Workflow

Universal router for deep exploration of UI, UX, Technology, or Architecture.

## Goal
Identify the best specialized exploration path based on user intent.

## Inputs required (ask if missing)
- Domain of interest: `ui`, `ux`, `tech`, `architecture`, `ai-workflow`.

## Skill routing (explicit)
## Branching logic (choose exactly one)
- IF domain is `ui` -> Call `/explore-ui`.
- IF domain is `ux` -> Call `/explore-user-workflow`.
- IF domain is `tech` -> Call `/explore-libraries`.
- IF domain is `architecture` -> Call `/architect`.
- IF domain is `ai-workflow` -> Call `/explore-ai-workflow`.
- IF domain is `concept` -> Use skill: `explore-concept`.
- ELSE: Ask: "Which domain would you like to explore (UI, UX, Tech, Architecture, AI-Workflow, or Concept)?"

## Procedure
1) Detect user intent from sub-arguments.
2) Route to the specialized sub-workflow.
3) If no sub-argument provided, present the menu of options.

## Notes
- Exploration workflows prioritize ideation and evaluation before drafting plans.
