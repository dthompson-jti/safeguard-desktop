# Deep Vet: Variant B2 Nomenclature & Taxonomy

If **Variant B2 (Abstracted Component Families)** is our architectural "sweet spot," its execution lives or dies by its taxonomy. Developers must intuitively guess the correct family and modifier without constantly referencing documentation.

Upon rigorous review of the proposed B2 token names in our stress tests, several critical semantic flaws, taxonomy violations, and subjective ambiguities emerge.

---

## 1. Mixing Multi-Axis Dimensions (The Sub-Modifier Problem)

Let's examine the proposed "Surface" family tokens:
- `--spacing-inset-surface-[modifier]`

In the initial proposal, we mapped:
- Tooltip -> `--spacing-inset-surface-floating`
- Modal -> `--spacing-inset-surface-body`
- Adv. Search Panel -> `--spacing-inset-surface-flat`
- Table Header -> `--spacing-inset-surface-header`

**The Taxonomy Violation**: 
We are mixing **Elevation** (`floating`, `flat`) with **Anatomy** (`body`, `header`) in the exact same modifier tier. 

If a developer needs padding for a "floating header" (like a sticky header inside a dropdown menu), they are forced to choose between two conflicting modifiers. 

**Diagnosis**: The `Surface` family needs strict modifier tiering. Either all surface insets describe their structural location (Page, Panel, Dialog) or their anatomy (Header, Body, Footer), but never a mix of states and locations.

---

## 2. The Synonym Trap (`compact` vs. `dense`)

Let's examine the "ListRow" family:
- Tree View Row -> `--spacing-inset-listrow-compact`
- Context Item -> `--spacing-inset-listrow-dense`
- Table Row -> `--spacing-inset-listrow-relaxed`

**The Cognitive Friction**:
"Compact" and "Dense" are English synonyms. If a developer is building a new side-nav item, which do they pick? There is no inherent hierarchy between the words "compact" and "dense". Even "relaxed" is subjective (vs "spacious" or "loose").

**Diagnosis**: If sub-modifiers represent a linear scale within a family, we must use a strictly hierarchical string of words (e.g., `prominent` -> `standard` -> `compact` -> `dense`). Alternatively, we revert back to t-shirt sizes just for the sub-modifier (e.g., `--listrow-md`, `--listrow-sm`), though this dilutes the semantic purity.

---

## 3. Ambiguity in Gap Terminology (`flow` vs `group`)

We proposed layout gaps like:
- Modal Content -> `--spacing-gap-flow`
- Adv. Search Panel -> `--spacing-gap-group`

**The Flaw**:
What distinguishes a "flow" from a "group"? In CSS/React, neither term maps to a canonical layout primitive (unlike `flex` or `grid`). A developer building a form inside a Modal will hesitate: "Are these inputs a group, or part of the modal's flow?"

**Recommendation**: Gaps must map explicitly to structural hierarchy or visual proximity, mirroring concepts developers already know from Flexbox or standard design. 
- `--spacing-gap-section` (major vertical spacing between distinct UI blocks)
- `--spacing-gap-sibling` (spacing between related items, like two inputs)
- `--spacing-gap-inline` (spacing within the same item, like Icon + Text)

---

## 4. "Control" Scaling Friction

We mapped inputs and buttons to:
- `--spacing-inset-control-md`

**The Trap**: 
If an app has "small" text inputs (`control-sm`) and "large" buttons (`control-lg`), B2 requires us to pre-define the asymmetric padding values for every size in the central CSS. 
What happens when a Search Box needs an asymmetrical padding of `8px 24px` to accommodate the search icon, but it technically shares the height of a `control-md`?

Does it become `--spacing-inset-control-md-search`? This instantly degrades B2 into B3 (Hybrid Role + Size).

**Diagnosis**: The `Control` family is too broad. Form inputs (which hold text and caret cursors) behave fundamentally differently than Buttons (which center their content). Calling them both `control` forces us to compromise on asymmetric padding needs (like input text-indent vs button lateral padding). 

---

## Refined B2 Taxonomy Framework (The "Fixed" B2)

If we proceed with B2, the naming architecture must obey a strict grammatical formula to eliminate the flaws above.

**Formula**: `--[property]-[family]-[anatomy/hierarchy]`

### The Fixed Families
Instead of 3 sweeping categories, we need 4 highly specific structural primitives that eliminate overlap:

1. **`Action`**: Things you click. (Buttons, Links, Select Triggers). They prioritize centered content.
2. **`Input`**: Things you type into. (Text, Textarea). They prioritize leading-edge padding and caret visibility.
3. **`Row`**: Full-width repeating blocks. (Tables, Trees, Nav).
4. **`Container`**: Structural boundaries that hold other things.

### The Fixed Inset Matrix

| Component Target | Revised B2 Token Structure | Why it's better |
|:---|:---|:---|
| **Primary Button** | `--spacing-inset-action-standard` | Clearer than "Control." Uses "Standard" over "MD". |
| **Small Button** | `--spacing-inset-action-compact` | Replaces abstract T-shirt sizing with density intent. |
| **Search/Text Input**| `--spacing-inset-input-standard` | Breaks Inputs away from Actions, allowing asymmetric padding for text cursors. |
| **Tree View / Menu** | `--spacing-inset-row-compact` | Removes the subjective "dense" vs "compact" conflict. |
| **Table Row** | `--spacing-inset-row-relaxed` | |
| **Modal / Panel** | `--spacing-inset-container-spacious` | Groups massive structural boxes. |
| **Tooltip / Popover**| `--spacing-inset-container-floating`| Explicitly tags containers that float above the DOM. |

### The Fixed Gap Matrix
| Use Case | Revised B2 Token Structure | Meaning |
|:---|:---|:---|
| **Inside a Button** | `--spacing-gap-inline` | Tiny pixel spacing (Icon + Text). |
| **Between Checkboxes**| `--spacing-gap-sibling` | Nearby elements acting as a single logical unit. |
| **Between Form Fields**| `--spacing-gap-flow` | The standard vertical rhythm of reading the app. |
| **Between Panels** | `--spacing-gap-section` | Major layout boundaries. |

---

## Conclusion of B2 Vet

The initial B2 proposal was structurally sound but linguistically flawed. It forced unrelated interaction modes (Inputs vs Buttons) into the same constrained family (`Control`), and used a mix of synonyms (`dense/compact`) and mixed-anatomies (`flat/header`).

By splitting into **Action**, **Input**, **Row**, and **Container**, and enforcing a strict vocabulary (`inline`, `sibling`, `flow`, `section`), B2 becomes a significantly more robust, unambiguous taxonomy.
