---
name: vet-simple
description: Review for overlooked aspects, edge cases, and unintended consequences. Use for quick quality check before implementation.
---

# Vet Simple

Lightweight quality review focused on finding what was missed in planning.

## When to Use

- After plan approval, before implementation
- Quick sanity check on architecture
- When you want a "second pair of eyes"
- Before handing off to junior developers

## Artifacts

- `docs/working/VET-{name}.md` — Review findings and recommendations

## Approach

### Phase 1: Context Loading

1. Read the plan/architecture document
2. Identify the core change and affected areas
3. List stated assumptions

### Phase 2: Overlooked Aspects

**Checklist**:
- [ ] **Edge Cases**: Empty states, loading states, error states
- [ ] **Accessibility**: Keyboard navigation, screen reader support, focus management
- [ ] **Mobile**: Touch targets, responsive layout, gesture conflicts
- [ ] **Performance**: Re-renders, memory leaks, bundle size impact
- [ ] **Error Handling**: Network failures, malformed data, race conditions
- [ ] **State Management**: Cleanup on unmount, stale closures, atom dependencies
- [ ] **Browser Compat**: Safari quirks, older browsers, polyfills needed
- [ ] **Security**: XSS vectors, data validation, sensitive data exposure

**For Each Item**:
- **Status**: ✅ Covered | ⚠️ Partially Covered | ❌ Not Covered
- **Impact**: Low | Med | High
- **Recommendation**: Specific action to address

### Phase 3: Unintended Consequences

**Questions to Ask**:
1. **Ripple Effects**: What other features might break?
2. **User Confusion**: Could this change confuse existing users?
3. **Performance**: Will this slow down other parts of the app?
4. **State Pollution**: Could this introduce global state issues?
5. **Migration**: Do existing users need data migration?
6. **Rollback**: Can we easily revert this change if needed?

**For Each Consequence**:
- **Likelihood**: Low | Med | High
- **Severity**: Low | Med | High
- **Mitigation**: How to prevent or handle it

### Phase 4: Quick Wins

Identify **low-effort, high-value** improvements:
- Missing guard clauses
- Obvious accessibility fixes
- Simple performance optimizations
- Better error messages

### Phase 5: Priority Scoring

**Scoring System**:
- **Critical (9-10)**: Blocks implementation, must fix
- **High (7-8)**: Significant risk, should fix before merge
- **Medium (4-6)**: Worth addressing, can be follow-up ticket
- **Low (1-3)**: Nice-to-have, optional

## Output Structure

```markdown
# VET: {Feature Name}

**Reviewer**: vet-simple
**Date**: {YYYY-MM-DD}
**Plan Reviewed**: {Link to plan/arch doc}

---

## Executive Summary
[2-3 sentence overview of findings]

**Overall Risk**: Low | Medium | High
**Recommendation**: Proceed | Proceed with Changes | Revise Plan

---

## Overlooked Aspects

### Edge Cases
- ⚠️ **Loading State** (Med Impact)
  - **Finding**: No loading indicator during image upload
  - **Recommendation**: Add spinner in upload button

### Accessibility
- ✅ **Keyboard Navigation** (Covered)
- ❌ **Screen Reader** (High Impact)
  - **Finding**: Clear button has no aria-label
  - **Recommendation**: Add `aria-label="Remove image"`

[Continue for all checklist items]

---

## Unintended Consequences

### 1. Ripple Effect: Film Strip Navigation
- **Likelihood**: Med
- **Severity**: High
- **Issue**: Clearing image resets to panel 0, but user might be on panel 2
- **Mitigation**: Store previous panel index before clearing

### 2. User Confusion: Auto-Advance Removal
- **Likelihood**: Low
- **Severity**: Low
- **Issue**: Users might expect auto-advance after upload
- **Mitigation**: Add visual cue (arrow or "Next" button)

---

## Quick Wins

1. **Add Guard Clause** (2 min)
   - File: `ImageReferenceThumbnail.tsx`
   - Add: `if (!sourceImage) return null;` at top

2. **Improve Error Message** (5 min)
   - File: `ImageUploadPanel.tsx`
   - Change: "Upload failed" → "Upload failed. Please try a smaller image."

---

## Priority Breakdown

| Priority | Count | Items |
| :--- | :--- | :--- |
| Critical | 0 | — |
| High | 2 | Screen reader support, Ripple effect mitigation |
| Medium | 3 | Loading state, Mobile touch targets, Error handling |
| Low | 2 | Better error messages, Rollback plan |

---

## Recommendation

**Proceed with Changes**

Address the 2 High-priority items before implementation:
1. Add aria-labels to interactive elements
2. Store previous panel index before clearing image

Medium-priority items can be follow-up tickets.
```

## Constraints

- **Time-Boxed**: Spend max 15 minutes on review
- **Actionable**: Every finding must have a specific recommendation
- **Prioritized**: Use the scoring system consistently
- **Constructive**: Focus on "what to add" not "what's wrong"

## Reflexion

Before finalizing, ask:
1. Did I check all 8 overlooked aspects?
2. Did I think through ripple effects?
3. Are my recommendations specific enough for a junior dev?
4. Did I identify at least 2 quick wins?
