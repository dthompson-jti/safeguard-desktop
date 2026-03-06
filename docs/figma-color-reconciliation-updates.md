# Figma Color Reconciliation Updates (Desktop)

Date: 2026-03-04
Project: safeguard-desktop
Decision lock source: `design-tokens-canonical/reports/figma-update-list.md`

## Objective

Align desktop with canonical outputs immediately after Figma updates, with no local color-token drift.

## Approved Figma-Level Changes (Desktop-Relevant)

1. Add missing control success default token: `--control-fg-success`.
2. Add explicit alert interaction states:
   - `--control-fg-alert-hover`
   - `--control-fg-alert-pressed`
   - Target state: no `default-hover` naming dependency.
3. Add/keep destructive control token family from Figma, mapped directly to primitives.
4. Add selected-pressed interaction tokens:
   - `--control-bg-selected-pressed`
   - `--control-border-selected-pressed`
5. Add translucent surface set:
   - `--surface-bg-header-translucent`
   - `--surface-bg-tertiary-translucent`
   - `--surface-bg-quaternary-translucent`
6. Add one global pulse set:
   - `--surface-bg-pulse-min`
   - `--surface-bg-pulse-max`
   - `--surface-bg-pulse-static`
7. Promote left-nav and top-nav as first-class semantic families with explicit light/dark values.
8. Add global skeleton token: `--surface-bg-skeleton` (not nav-specific).
9. Add `--brand-logo-text`.
10. Enforce neutral-only shared shadows.
11. Enforce utility alpha mapping to primitives alpha ladder.
12. No design-system magma tokens.
13. Do not add splash tokens to Figma; replace splash usage with canonical surface/fg tokens.

## Desktop Implementation Actions After Canonical Regen

1. Replace local nav/top-nav semantic definitions with canonical-generated definitions.
2. Remove duplicate local selected-pressed and alert-hover/pressed definitions if canonical now provides them.
3. Ensure nav skeleton usage points to global `--surface-bg-skeleton`.
4. Keep `--surface-bg-backdrop` as alias to `--surface-bg-overlay` only if compatibility is required; otherwise migrate usages directly.
5. Remove any local brand-shadow semantics and keep neutral shadow sources only.
6. Ensure `src/styles/utility.css` remains mapped to primitives alpha tokens.
7. Replace any bootstrap splash token references with canonical surface/fg token usage.
8. Re-run token audits and parity checks.

## Current Out-of-Line Risks To Verify Post-Sync

1. Desktop destructive aliases must resolve to canonical destructive tokens (no local divergence).
2. Nav family currently local in desktop semantics; must converge to canonical nav family from generated outputs.
3. Any lingering local translucent values must be removed after canonical translucent set is present.

## Acceptance Criteria

1. Desktop has zero unresolved non-canonical color token usages in `src/**` except approved local exceptions.
2. Desktop consumes canonical nav/top-nav/skeleton/translucent/pulse semantics.
3. Desktop shadow semantics are neutral-only.
4. `npm run audit:tokens` and `npm run audit:tokens:strict` both pass with expected exception list only.

## Implementation Status (As Of 2026-03-04)

### Completed

1. `top-nav/*` and `nav/*` semantic families are fully wired and actively consumed by desktop UI modules.
2. Panel headers are tokenized (`--panel-header-bg`) and consistently used in nav/detail panels.
3. Search inputs and top-nav search contexts use semantic search tokens across light/dark.
4. Dark-mode border intensity for secondary/selected controls has been stepped down to reduce visual harshness.
5. Mode toggle now has dedicated semantic tokens (`--nav-toggle-*`) and no longer relies on ambiguous surface elevation assumptions.

### Intentional Product Overrides (Temporary Local Drift)

These values are intentional UX-tuning overrides in `src/styles/semantics.css` and should be upstreamed to canonical/Figma if adopted permanently:

1. Dark top-nav background: `--top-nav-bg: var(--primitives-theme-975)` (deeper brand chrome).
2. Dark nav group rows:
   - `--nav-group-bg: var(--primitives-theme-950)`
   - `--nav-group-bg-hover: var(--primitives-theme-900)`
   - `--nav-group-bg-selected: var(--primitives-theme-950)`
   - `--nav-group-bg-selected-hover: var(--primitives-theme-900)`
3. Dark nav container alignment:
   - `--nav-bg: var(--surface-bg-primary)` to match adjacent panel surface.

### Follow-Up Required

1. Decide whether the dark nav/top-nav tuning becomes canonical (recommended if stakeholder-approved).
2. If approved, push these values to Figma/canonical output and remove local override status.
3. Re-run strict token audit after canonical uplift and close local drift notes.
