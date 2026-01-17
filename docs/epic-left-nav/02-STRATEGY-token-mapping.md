# Strategy: Token Remapping (The Rosetta Stone)

## Objective
To mathematically and semantically map every visual property from the "Old Design System" (Figma) to the "SafeGuard Design System" (Codebase). This bridging process is critical to ensure the new Left Nav is strictly compliant with our global theming engine.

## The Challenge
The Figma file uses a legacy token set (e.g., `surface/bg-base`, `control/faint-text`) or raw hex values.
The Codebase uses `src/styles/semantics.css` (e.g., `--surface-bg-primary`, `--control-fg-tertiary`).

## Mapping Algorithm

For every extracted value from Phase 2:

## Detailed Mapping Algorithm

For every extracted value from Phase 2, we execute this rigorous matching logic:

### 1. Visual Match (The "Hard" Check)
First, we find the candidate resolved value in `primitives.css`.
*   *Input*: Figma `#F3F4F6` or token `primitive/size/space-050`.
*   *Search*: `grep -r "#F3F4F6" src/styles/primitives.css` -> matches `--primitives-grey-100`.

### 2. Semantic Fit (The "Soft" Check)
We must justify the usage based on *Intent*, not just color.
*   *Context*: "Sidebar Background".
*   *Legacy Name*: `semantic/control/secondary-text` (Real Example found).
*   *Legacy Value*: `#223a58` (Dark Blue).
*   *Candidate*: `--surface-fg-secondary` (Grey-700).
    *   *Conflict*: The legacy design uses "Dark Blue" for secondary text. Our new system uses "Grey".
    *   *Decision*: **Migrate to New System**. We map `secondary-text` -> `--surface-fg-secondary`. We do *not* carry over the "Blue Tint" unless it's a Brand surface. This is a critical Design System Migration rule.

### 3. Interaction State Mapping
We map states as *modifiers*, not independent colors.
*   **Hover**: Must map to `_hover` variant of the base token.
    *   *Ex*: Base `control-bg-secondary` -> Hover `control-bg-secondary-hover`.
    *   *Rigor*: If Figma uses a different color (e.g., Red) for hover on a Grey button, we verify if it's a `Destructive` button type. If not, it's a deviation.
*   **Selected**: Maps to `control-bg-selected` system.
    *   *Rigor*: Check checkmark/icon colors. Do they invert? (e.g., `fg-primary` vs `fg-on-solid`).

### 4. Typography & Spacing Mapping
*   **Font Size**: Map px to `rem` steps (`--font-size-sm`, `--font-size-md`).
    *   *Tolerance*: +/- 1px. If 15px, force to 14px or 16px based on hierarchy.
*   **Spacing**: Map px to `param` steps (`--spacing-2` = 8px, `--spacing-4` = 16px).
    *   *Tolerance*: strict. 13px is rejected; move to 12px or 16px.

## Gap Analysis Strategy
If a Figma style implies a pattern that does *not* exist in `semantics.css`:

1.  **Is it a "One-off"?** -> If yes, use a private `module.css` variable, but document it as a debt.
2.  **Is it a "New Pattern"?** -> (e.g., "Ghost Button with Border").
    *   ACTION: propose a new semantic token in `semantics.css` (e.g., `--control-border-ghost`).
    *   Document in `05-DATA-token-map.md` with tag `[NEW TOKEN REQUIRED]`.

## The Rosetta Stone Table Structure
We will build a master table in `05-DATA-token-map.md` with these specific columns:

| Figma Label / Hex | Context | Primitive Match | Semantic Candidate | Dark Mode Check | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `surface/bg-base` | Sidebar Bg | `grey-100` | `--surface-bg-secondary` | OK | **MAP** |
| `custom-blue-hover` | Item Hover | `blue-400` | `--control-bg-info-hover` | *Fail: Too bright* | **GAP [NEW]** |

## Output
A finalized `05-DATA-token-map.md` that serves as the single source of truth for the Implementation Phase.
