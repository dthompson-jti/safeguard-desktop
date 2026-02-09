---
trigger: model_decision
---

# Navigation Patterns

Rules for Wayfinding: Menus, Tabs, Trees, and Routing.

## 1. Menus & Dropdowns
*   **Spacing:** Context Menus (`2px` gap), Select Dropdowns (`4px` gap).
*   **Destructive Items:**
    *   Auto-insert divider before destructive actions.
    *   **Soft Hover:** Use faint red background (`--control-bg-alert-faint-hover`), not solid red inversion.
*   **Context Menu:** Must set target/selection BEFORE opening.
*   **Radii:** Menu Container Radius = Item Radius (8px) + Padding (4px) = 12px.

## 2. Routing & URL State
*   **URL First:** Always derive "Active" state from `useLocation()`, not local state.
*   **Visuals:** Use `data-active="true"` attribute selectors, not `.active` classes.
*   **Deep Linking:** Use `ReferenceHook` to link builder UI to documentation.

## 3. Sidebar Navigation
*   **Standard Components:** Use `ActionListItem` (current standard) or `NavPanelItem`.
*   **Dividing Lines:** Use horizontal separators (`<div className={styles.separator} />`) ONLY between major functional categories.
*   **Border Removal:** Excessive dividers (e.g., `border-bottom` on every list item) MUST be disabled in Sidebar menus to maintain low visual noise.
*   **Action Visibility:** Sidebar actions (Delete, Rename) should appear **on hover**.
*   **Truncation:** Use ellipsis (`...`) for long labels.

## 4. Tabs & Segmented Controls
*   **Selection Toolbar:** Must be the last child in DOM for Z-Index.
*   **Batch Bar:** Uses `primary-solid` background styling (Inverted theme).
*   **Underline Switcher Style:** Feature switchers (e.g., in `ViewModeSwitcher`) MUST use a 24px centered underline bar for the selected state instead of a background fill.

## 5. Project Taxonomy (Site Map)
### Primary Features
*   **Visual Generation:** Generate Photo, Generate Art, Edit Image.
*   **Prompt Architecture:** Structured Prompting, Writing Style.
*   **AI Discovery:** Discovery I, II, III.
*   **Creative Engineering:** Vibe Coding.
*   **Utilities:** Developer Tools, User Settings.

## 6. Semantic Slugs & Invariance
*   **Immutable IDs:** Labs and navigational items MUST use semantic slugs (e.g., `visual-context`, `prompt-engineering`), NEVER ordinal IDs (`lab-1`, `step-2`).
*   **Content Binding:** User progress and content are bound to the **Slug**, not the position.
*   **Reordering**: Changing the order in `NAV_GROUPS` should never require data migration.
*   **Global Presets FAB**: Lab-specific presets MUST be consolidated into a single persistent FAB (`GlobalPresetsFAB`) to maintain a clean header and prevent UI fragmentation.
*   **Unified Presets Architecture**: Preset content MUST be extracted into standalone components (e.g., `LabPresetsContent`) to allow direct triggering by the FAB without "nested button" triggers.

## 7. Verification

### Invariants (Automated)
- [ ] **Semantic Slugs**: `grep "lab-[0-9]\|step-[0-9]" src/` (Must use semantic slugs, not ordinal IDs).
- [ ] **URL-First Active States**: `grep "isActive\|\.active" src/` (Prefer `data-active` attribute selectors).

### Logic (Manual/Reasoning)
- [ ] **Deep Linking**: Can users bookmark and share specific views?
- [ ] **NavPanel Usage**: Are sidebar lists using `NavPanel` components?
- [ ] **Taxonomy Alignment**: Do routes match the documented site map?

---

## See Also
- `foundation-design-tokens.md` — For menu and spacing tokens.
- `tech-react.md` — For routing hook patterns.
