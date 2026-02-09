---
name: audit-layout
description: Review layout consistency (spacing, alignment, grid usage). Use to ensure visual consistency across components.
---

# Audit Layout

Review layout consistency across the codebase.

## When to Use
- After adding new components
- Periodic visual consistency check
- Before releases

## Approach

### Step 1: Project Invariants (Context Loading)
**Before auditing**, load the layout rules:
- Read `.agent/rules/foundation-design-system.md` (Section `## Verification`).
- Flag any violation of documented invariants as **Critical** priority.

### Step 2: Focus Areas
- **Spacing**: Consistent use of `var(--spacing-*)` tokens
- **Alignment**: Items properly aligned within containers
- **Grid**: Correct use of grid/flex layouts
- **Margins**: No rogue external margins (use parent `gap`)

### Checklist
- [ ] All spacing uses tokens, no magic numbers
- [ ] Parent containers use `gap` for child spacing
- [ ] No external margins on child components
- [ ] Alignment consistent within sections
- [ ] Responsive behavior appropriate

### Output
Findings report with specific file:line citations.
