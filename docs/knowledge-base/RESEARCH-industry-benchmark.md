# Industry Benchmarks: Semantic Token Strategies

To contextualize our decision between Option A (Size-Graduated), Variant B1 (Strict Mapping), and Variant B2 (Abstracted Families), we must look at how industry-leading design systems structure their tokens for the exact same components. 

Here is how **Google Material 3**, **Atlassian**, and **Apple HIG** handle semantic scaling.

---

## 1. Google Material 3 (M3)
**Strategy Alignment**: Extreme Variant B1 (Strict Component Mapping)

Material 3 uses a highly rigorous, machine-generated naming taxonomy. They divide the world into three tiers: Reference (primitive), System (semantic), and Component (specific). 

Crucially, for their **Component layer**, they generate extremely specific, 1-to-1 tokens for *every* unique component and its internal pieces.

### Stress Test Mapping (M3 Style)

| Component Area | M3 Equiv. Inset Token | M3 Equiv. Radius Token |
|:---|:---|:---|
| **Primary Button** | `md.comp.filled-button.container.padding` | `md.comp.filled-button.container.shape` |
| **Search Box** | `md.comp.search-bar.container.padding` | `md.comp.search-bar.container.shape` |
| **Select Trigger** | `md.comp.filled-select.container.padding` | `md.comp.filled-select.container.shape` |
| **Context Menu** | `md.comp.menu.container.padding` | `md.comp.menu.container.shape` |
| **Modal Content** | `md.comp.dialog.container.padding`| `md.comp.dialog.container.shape` |

**Takeaway:** M3 embraces the sheer mass of tokens (thousands of them) required for 1-to-1 mapping. They do this because their tokens are primarily consumed by automated tooling and theme builders, not direct human CSS writing. 

---

## 2. Atlassian Design System
**Strategy Alignment**: Hybrid (Semantic Colors, but Option A Size-Graduated for Spacing)

Atlassian recently underwent a massive token migration. Interestingly, while their *colors* are highly semantic (e.g., `color.background.input`), they deliberately chose to keep their **spacing and radii tokens on a primitive, size-graduated scale**. 

They favor a universal 8-point numeric scale for spacing, relying on strict component-level CSS to apply those universal tokens.

### Stress Test Mapping (Atlassian Style)

| Component Area | Atlassian Equiv. Inset Token | Atlassian Equiv. Radius Token |
|:---|:---|:---|
| **Primary Button** | `space.100` (8px) / `space.200` (16px) | `border.radius.normal` |
| **Text Input** | `space.100` (8px) / `space.150` (12px) | `border.radius.normal` |
| **Left Nav Item** | `space.150` (12px) | `border.radius.normal` |
| **Context Item** | `space.100` (8px) | `border.radius.normal` |
| **Modal Content** | `space.300` (24px) | `border.radius.large` |

**Takeaway:** Atlassian determined that giving "Margin" and "Padding" highly semantic names was an anti-pattern. They train developers to know that "Modals use `space.300` padding" via documentation, rather than via a token named `spacing-modal`. 

---

## 3. Apple Human Interface Guidelines (HIG / SwiftUI)
**Strategy Alignment**: Variant B2 (Abstracted Component Families)

Apple does not expose raw web-tokens natively, but their SwiftUI APIs and HIG documentation reveal a strictly abstracted, family-based taxonomy. Apple deeply categorizes UI elements into "Controls", "Views", and "Presentations". 

If an Input, a Select (Picker), and a Button share the same interaction profile, they share the same overarching "Control" sizing modifiers.

### Stress Test Mapping (Apple Style)

| Component Area | Apple Concept Family | Sizing Modifier Example |
|:---|:---|:---|
| **Primary Button** | Control Family | `.controlSize(.regular)` |
| **Standard Input** | Control Family | `.controlSize(.regular)` |
| **ComboBox (Picker)** | Control Family | `.controlSize(.regular)` |
| **Side Panel** | Presentation Family | `.presentationDetents([.medium])` |
| **Table Row** | List Row Family | `listRowInsets(EdgeInsets)` |

**Takeaway:** Apple refuses to treat a text input and a pop-up button differently at the macro level. They are both `Controls`. If you set the app's control size to `.large`, both inputs and buttons mathematically scale their padding and radius in perfect unison because they share the same structural DNA.

---

## Synthesis vs. Our Project

1. **If we want the M3 approach (B1)**: We must accept creating hundreds of tokens. This is only viable if we intend to build a theme-generation tool that automates the CSS generation.
2. **If we want the Atlassian approach (Option A)**: We stop trying to name spacing tokens `inset-modal` and revert back to `spacing-4`. We use semantic names *only* for colors.
3. **If we want the Apple approach (B2)**: We lean heavily into Abstracted Families (`--spacing-inset-control`), accepting that developers must learn the family taxonomy, but gaining massive synchronization power.
