---
trigger: model_decision
---

# Error Handling Patterns

Standards for error states, loading states, and user feedback.

## 1. Error Boundaries
*   **Rule:** Wrap feature areas with React Error Boundaries.
*   **Fallback:** Display a graceful fallback UI, not a blank screen.
*   **Reporting:** Dispatch a global toast notification using `addToastAtom` with `report_problem` icon when a crash is caught to provide immediate user feedback.
*   **Logging:** Log errors to console in development; consider telemetry in production.

## 2. Loading States
*   **Skeleton First:** Use skeleton loaders for content-heavy areas.
*   **Spinner Guidelines:** Spinners only for quick actions (<2s expected).
*   **Progressive Loading:** Show partial content as it becomes available.

## 3. Empty States
*   **Never Blank:** Always show a meaningful empty state with:
    - Icon or illustration
    - Explanatory text
    - Call-to-action (if applicable)
*   **Token Usage:** Use `var(--text-muted)` for empty state text.

## 4. Toast Notifications
*   **Duration:** Success = 3s, Warning = 5s, Error = persistent until dismissed.
*   **Stacking:** Maximum 3 toasts visible; queue additional ones.
*   **Position:** Bottom-right for non-blocking; top-center for critical.
*   **Content:** Active voice, actionable. "Changes saved" not "Your changes have been saved successfully."

## 5. Form Validation
*   **Inline Errors:** Show errors adjacent to the invalid field.
*   **Error Styling:** Use `var(--semantic-error)` for borders and text.
*   **Timing:** Validate on blur for new fields; on change for fields with existing errors.
*   **Summary:** For complex forms, show error summary at top with links to fields.

## 6. Network Errors
*   **Retry Logic:** Offer retry button for transient failures.
*   **Offline Detection:** Show offline indicator when network is unavailable.
*   **Timeout Handling:** Set reasonable timeouts (10s for API calls).

## 7. Accessibility
*   **ARIA Live Regions:** Announce errors to screen readers with `aria-live="polite"`.
*   **Focus Management:** Move focus to first error field on form submission failure.
*   **Color Independence:** Don't rely solely on color; use icons and text.

## 8. Hyper-Defensive Component Wrappers
*   **Tooltip Triggers:** Radix Tooltip triggers (`asChild`) are high-risk. Always wrap triggers in a `<span>` if they are raw strings, fragments, or potentially nullish.
*   **Module Guards:** Add defensive string conversion `String(content)` to dynamic markdown/HTML outputs in `OutputPanel` and similar components to prevent "Functions as React child" crashes.
*   **Registry Gating:** Always use `Array.isArray()` or null-coalescing when mapping over external registry data (e.g. `buildPromptsRegistry`) to prevent boot-time whitescreens.
*   **Rule:** Wrap feature areas with React Error Boundaries.
*   **Fallback:** Display a graceful fallback UI, not a blank screen.
*   **Reporting:** Dispatch a global toast notification using `addToastAtom` with `report_problem` icon when a crash is caught to provide immediate user feedback.
*   **Logging:** Log errors to console in development; consider telemetry in production.

## Verification

### Invariants (Automated)
- [ ] **Error Boundaries:** `grep "ErrorBoundary" src/` (Should exist in feature roots)
- [ ] **Loading States:** `grep "Skeleton\|isLoading" src/` (Content areas should have loading states)

## 5. Build & Deployment Architecture
*   **Unified Vendor Bundle:** For React 19 projects, **NEVER** use Vite's `manualChunks` to split `node_modules`. This prevents race conditions during initialization that lead to the "setting 'Children' of undefined" whitescreen bug in production.
*   **Asset Loading:** Prefer `?raw` imports for static content (Markdown/CSV) to ensure synchronous availability during render cycles.

### Logic (Manual/Reasoning)
- [ ] **Empty States:** Do all list/grid components handle empty data?
- [ ] **Form Validation:** Do forms show inline errors with accessible markup?

---

## See Also
- `domain-content.md` — For error message tone and structure.
- `foundation-accessibility.md` — For ARIA live region standards.
