# Implementation Plan - Secondary Navigation Refinement

Implement a more neutral, "clean" design for secondary links (residents and locations) based on stakeholder feedback to reduce visual noise and signal external navigation.

## 1. Component Updates (`LinkButton`)
- **Default Variant:** Change primary color from theme-blue to `surface-fg-secondary`.
- **Hover Transitions:** 
    - Text color: `surface-fg-secondary` -> `surface-fg-primary`.
    - Underline: None -> Solid (2.8px weight).
    - Icon: Width/Opacity slide-in.
- **Icon Gap:** Set to 2px, size to 16px.

## 2. Live Table Refinement
- Ensure multi-resident rows wrap gracefully when icons slide in.
- Set `variant="ghost"` or a new `variant="secondary"` as the default for all residents and locations.

## 3. Detail Panel Refinement
- Align breadcrumb styling exactly with the new table link behavior.
- Ensure separators (`navigate_next`) remain subtle and non-interactive.

## 4. Verification
- Test with 4 residents in a single Live table row.
- Verify "rock solid" transition feel.
- Check accessibility contrast.
