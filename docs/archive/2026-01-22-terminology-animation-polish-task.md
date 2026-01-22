# Task: Terminology & Panel Animation Polish

## Terminology Refactor
- [ ] Discovery: Map all "commented" and "uncommented" terminology across the project.
- [ ] Implementation Plan: Create `implementation_plan.md` with approaches.
- [ ] Execution:
    - [ ] Update `types.ts` (Enums/Types).
    - [ ] Update `atoms.ts` (Logic/Defaults).
    - [ ] Update `StatusBadge.tsx` (Labels/Icons).
    - [ ] Update `DesktopToolbar.tsx` (Filter labels).
    - [ ] Update `AdvancedSearch.tsx` (Filter labels).
    - [ ] Update Mock Data files (`mockData.ts`, `mockHistoricalData.ts`).
    - [ ] Update CSS selectors in `StatusBadge.module.css`.
    - [ ] Audit all strings for "Missed – not reviewed" with en dash.

## Detail Panel Animation Fix
- [ ] Discovery: Analyze the `DetailPanel` close animation in `Layout.tsx` vs `DetailPanel.tsx`.
- [ ] Execution: Synchronize the wrapper width transition with the internal content exit animation.

## Verification
- [ ] Manual check of all badges and filters in the UI.
- [ ] Verify en dash usage (`–`).
- [ ] Verify panel close feel.
- [ ] Run `npm run lint`.
