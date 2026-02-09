---
trigger: model_decision
---

# Content Design Rules

Rules for copywriting, labels, tooltips, error messages, and microcopy.

## 1. Tone & Voice ("Warm & Capable")
*   **Warm:** Professional yet human, approachable without being casual.
*   **Capable:** Polished, precise, confident (conveys expertise).
*   **Avoid:** Corporate jargon, gaming language, overly playful, robotic.

## 2. Terminology
*   **Canonical:** Always check `docs/knowledge-base/TERMINOLOGY.md`.
*   **Specifics:**
    *   "Lab" (not Section/Chapter)
    *   "Editor Canvas" (not Workspace/Area)
    *   "Component Browser" (not Sidebar/Palette)

## 3. Heading Levels & Hierarchy
To maintain a clear and consistent prompt structure, heading levels MUST follow this strict hierarchy:
*   **Level 2 (`##`)**: Core structural elements including all **CRAFT** and **TCRTE** components (TASK, CONTEXT, ROLE, etc.).
*   **Level 3 (`###`)**: Specialized **Thinking Patterns** (ToT, CoT, Socratic, etc.) to ensure they sit logically under the core ACTION or ROLE.

## 4. UI Copywriting
### Labels & Names
*   **CRAFT & TCRTE Items**: Core prompt elements MUST use concise, all-caps labels for high-scannability:
    *   `CONTEXT`, `ACTION`, `FORMAT`, `TARGET AUDIENCE`, `INSTRUCTION`.
    *   `TASK`, `ROLE`, `RESOURCES`, `CONSTRAINTS`, `CRITERIA`, `ENHANCE`.
    *   These all-caps labels must be used in the Component Browser, Canvas Headers, and Drag Previews.
### Buttons & Menus
*   **Pattern:** Verb + Noun (e.g., "Save Prompt", "Clear Canvas").
*   **Menu Items:** Start with verb, keep under 3 words (e.g., "Duplicate", "View Settings").
*   **Destructive:** Be explicit (e.g., "Delete Prompt", "Remove All").

### Tooltips
*   **Scanning Zones (Sidebars):** Wrap entire card.
*   **Interactive Zones (Canvas):** Wrap only icon/label to avoid blocking interaction.
*   **Feature Headers:** Use the `infoContent` prop in `SectionHeader` for inline definitions. Prefer concise, value-additive descriptions over generic "Help" links.
*   **Punctuation:** No trailing period for single sentences. Periods for multi-sentences.

### Error Messages (What/Why/Action)
*   **Structure:** [What happened] + [Why] + [Action].
*   **Example:** "Save failed. Network timeout. Check connection and retry."
*   **Tone:** Empathetic, not robotic. Never blame the user.

## 4. Empty States
*   **Primary (Canvas):** Large Icon + Strong CTA ("Drag components to start").
*   **Secondary (Panels):** Small Icon + Subdued Text ("No prompts yet").

## 5. Confirmation Dialogs
*   **Structure:** Header (Question) -> Body (Context/Impact) -> Actions.
*   **Actions:** Cancel (Secondary) + Confirm/Delete (Primary/Destructive).

## 6. Accessibility
*   **Icon Buttons:** MUST have `aria-label`.
*   **Inclusive:** Use "they/them", avoid "guys", "sanity check", "dummy data".
*   **Decorative Icons:** Icons that do not convey unique information (Material Symbols next to labels) MUST have `aria-hidden="true"`.

## 7. Static Assets & Prompt Files
*   **Extension**: Static prompt templates MUST use the `.txt` extension (not `.md`).
*   **Rationale**: This bypasses the MDX compiler in Vite, ensuring that `?raw` imports return the exact string content rather than a React component or metadata object.
*   **Import Pattern**: Use `import name from 'path/to/file.txt?raw';`.

## 8. Verification

### Invariants (Automated)
- [ ] **Icon Labels**: `grep "<button.*><svg" src/` (Must have `aria-label` or sr-only text).
- [ ] **Terminology**: `grep -i "workspace\|palette\|section" src/` (Verify canonical terms are used).

### Logic (Manual/Reasoning)
- [ ] **Tone**: Does the copy feel "Warm & Capable" — not corporate or playful?
- [ ] **Error Messages**: Do they follow What/Why/Action structure?
- [ ] **Empty States**: Do they have appropriate CTAs?

---

## See Also
- `foundation-accessibility.md` — For inclusive language and label standards.
- `pattern-error-handling.md` — For UI error state patterns.