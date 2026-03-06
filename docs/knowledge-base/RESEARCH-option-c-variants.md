# Option C: Spatial Logic (Relationship-Based)

**Option C** represents a middle ground between the absolute naming of Option A and the component naming of Option B. Instead of naming values after a size (lg/md) or a UI name (button/modal), tokens are named after the **Structural Relationship** or **Visual Hierarchy** they solve for.

**Philosophy**: "Tokens describe the conversation between elements."

---

## Variant C1: The "Atomic Relationship" Model

Tokens are named by the "closeness" of the relationship between two elements.

### The Scale
1. **Bond (Internal)**: Internal padding of a single interactive item.
2. **Lock (Group)**: Space between two siblings that form a logical unit (e.g., Icon + Label).
3. **Boundary (Container)**: Space between content and its immediate container.
4. **Void (Layout)**: The largest gaps between major sections of the app (e.g., Card to Card).

---

## Component Mapping Stress Test (Option C)

| Component Area | Token Recommendation | Goal / Relationship |
|:---|:---|:---|
| **Buttons / Inputs** | `--spacing-inset-interaction` | Internal target breathing room |
| **Search Box Gap** | `--spacing-gap-lock` | Tight pairing of icon and text field |
| **Table Header** | `--spacing-inset-header` | Logical boundary for a data section |
| **Table Row Padding** | `--spacing-inset-row` | Repetitive content rhythm |
| **Tree View Indent** | `--spacing-indent-nesting` | Visual expression of hierarchy |
| **Tooltip / Menu** | `--spacing-inset-transient`| Temporary UI surface breathing room |
| **Modal Container** | `--spacing-inset-boundary` | The final structural container wall |
| **Form Gaps** | `--spacing-gap-flow` | Natural vertical reading order |
| **Button Clusters** | `--spacing-gap-group` | Multiple interactive items together |

---

## Tradeoffs

- **Pros**:
    - **Designer Sync**: Matches "Spatial design" vocabulary.
    - **Flexible but Decoupled**: You can change the "Interaction" inset (Inputs/Buttons) without changing the "Boundary" inset (Modals).
    - **Logic-Driven**: Helps developers decide *why* they are using a token based on the visual hierarchy they are building.
- **Cons**:
    - **Highest Learning Curve**: Terms like "Lock" or "Transient" require training.
    - **Subjectivity**: One developer might feel a Tree Row is a "Row," while another sees it as a "Nesting interaction."

---

## Recommendation

**Option C** is elite for design teams with a high degree of spatial rigor. It effectively "hides" the complexity of Option B's component names behind a smaller set of high-order logical concepts. 

If Option B feels too verbose but Option A feels too "dumb," **Option C (Spatial Logic)** is the sophisticated choice.
