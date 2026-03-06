# Variant B2-Alt: Refined Abstracted Families (The "Taxonomy Fixed" Model)

This is an evolution of **Variant B2**. The original B2 document proposed naming tokens after the "Structural Role" rather than the component (creating families like `Control`, `Surface`, and `ListRow`).

However, B2's initial terminology was flawed. It mixed unrelated anatomies into `Control` (buttons vs. inputs), used subjective density terms (`dense` vs `compact`), and mixed elevations into structural containers.

**Variant B2-Alt** fixes these taxonomy flaws, providing a mathematically strict grammar for design tokens.

---

## The strict B2-Alt Grammar
`--[property]-[family]-[state/type]`

### The Four Core Families (No Overlap)
1. **`Action`**: Things you click. (Buttons, Links, Select Triggers). They prioritize centered content and symmetric X/Y padding based on text height.
2. **`Input`**: Things you type into. (Search, Textarea, Text Input). They prioritize asymmetric padding to accommodate text cursors and leading icons.
3. **`Row`**: Full-width repeating blocks. (Tables, Trees, Nav Items). They prioritize dense vertical stacking.
4. **`Container`**: Structural boundaries that hold other things. (Cards, Modals, Panels).

### The Four Core Gaps (No Subjectivity)
Tokens that describe exact relationships between elements within the DOM hierarchy.
1. `--spacing-gap-inline`: Pixel spacing *inside* a single interactive element (e.g., inside an `Action` button between the icon and text).
2. `--spacing-gap-sibling`: Spacing between related local elements (e.g., two checkboxes next to each other).
3. `--spacing-gap-flow`: Standard vertical reading rhythm between major blocks (e.g., between form sections or paragraphs).
4. `--spacing-gap-section`: Major exterior layout boundaries separating domains of the screen.

---

## Component Mapping Stress Test (B2-Alt)

| Component Area | Inset Padding Token | Radius Token | Internal/Gap Token |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-action-standard`| `--radius-action` | `--spacing-gap-inline` |
| **Small Button** | `--spacing-inset-action-compact` | `--radius-action` | `--spacing-gap-inline` |
| **Text Input** | `--spacing-inset-input-standard` | `--radius-input` | `--spacing-gap-inline` |
| **Search Box** | `--spacing-inset-input-standard` | `--radius-input` | `--spacing-gap-inline` |
| **Select Trigger** | `--spacing-inset-input-standard` | `--radius-input` | `--spacing-gap-inline` |
| **Tree View Row** | `--spacing-inset-row-compact` | `--radius-row` | `--spacing-gap-inline` |
| **Left Nav Item** | `--spacing-inset-row-standard` | `--radius-row` | `--spacing-gap-inline` |
| **Context Item** | `--spacing-inset-row-compact` | `--radius-row` | `--spacing-gap-inline` |
| **Table Header** | `--spacing-inset-row-relaxed` | N/A | `--spacing-gap-inline` |
| **Table Row** | `--spacing-inset-row-standard` | N/A | `--spacing-gap-inline` |
| **Tooltip** | `--spacing-inset-container-floating`| `--radius-container-floating`| N/A |
| **Context Menu** | `--spacing-inset-container-floating`| `--radius-container-floating`| N/A |
| **Modal Content** | `--spacing-inset-container-spacious`| `--radius-container-elevated`| `--spacing-gap-flow` |
| **Side Panel** | `--spacing-inset-container-spacious`| N/A | `--spacing-gap-flow` |
| **Adv. Search Panel** | `--spacing-inset-container-flat` | N/A | `--spacing-gap-sibling` |

---

## Code Example (Variant B2-Alt)

```css
/* Input.module.css */
.textInput {
  /* Using the specific Input family token allows text cursors 
     to have different padding logic than Buttons */
  padding: var(--spacing-inset-input-standard);
  border-radius: var(--radius-input);
}

/* Button.module.css */
.submitButton {
  /* Actions have symmetric padding for centered text */
  padding: var(--spacing-inset-action-standard);
  border-radius: var(--radius-action);
  /* The gap between the button's icon and label */
  gap: var(--spacing-gap-inline); 
}

/* Modal.module.css */
.modalBody {
  /* Spacious containers have large exterior padding */
  padding: var(--spacing-inset-container-spacious);
  border-radius: var(--radius-container-elevated);
  /* Children inside the modal flow rhythmically */
  gap: var(--spacing-gap-flow); 
}
```

---

## Tradeoffs

### Pros
- **Architectural Purity**: Fixes the subjective and confusing vocabulary of the original B2 variant.
- **Asymmetric Freedom**: By decoupling `Action` (Buttons) from `Input` (Text Fields), we can give inputs the unique X/Y padding they need without breaking button layouts.
- **Unambiguous Gaps**: Developers don't have to guess what "flow" vs "group" means. The gap tokens directly mimic standard DOM structures (inline, sibling, section).

### Cons
- **Cognitive Load vs Option A**: Still requires more thought than writing `--spacing-md`. A developer must actively categorize the UI they are building before typing a padding variable.

---

## Summary Verdict

If the project chooses the "Role-Based" path, **this B2-Alt revision is mandatory**. 

The original B2 proposal (`--spacing-inset-control-md`) would fail at scale because it forces too many varied interaction paradigms into a single token bucket. **B2-Alt** correctly identifies that the universe of UI components is cleanly divided into Actions, Inputs, Rows, and Containers. 
