# Option A Variants: Scaling by Magnitude

**Option A (Size-Graduated)** focuses on "how much space" rather than "what the space belongs to." It is the most common approach for systems prioritizing developer speed and simplicity.

However, even within "Size-Graduated" naming, there are different strategies for the scale itself.

---

## Variant A1: T-Shirt Sizing (The Classic)

Uses semantic size labels from `xs` to `xl`.

**Philosophy**: "Easy to remember, limited tokens."

### Component Mapping Stress Test (A1)

| Component Area | Inset Padding | Radius | Gap / Internal Rhythm |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-sm` | `--radius-md` | `--spacing-gap-xs` |
| **Search Box** | `--spacing-inset-md` | `--radius-md` | `--spacing-gap-sm` |
| **Table Header** | `--spacing-inset-md` | N/A | `--spacing-gap-xs` |
| **Table Row** | `--spacing-inset-sm` | N/A | `--spacing-gap-sm` |
| **Tree View Row** | `--spacing-inset-xs` | `--radius-sm` | `--spacing-gap-xs` |
| **Left Nav Item** | `--spacing-inset-md` | `--radius-md` | `--spacing-gap-sm` |
| **Tooltip** | `--spacing-inset-xs` | `--radius-sm` | N/A |
| **Modal Content** | `--spacing-inset-lg` | `--radius-xl` | `--spacing-gap-md` |
| **Side Panel** | `--spacing-inset-lg` | N/A | `--spacing-gap-md` |
| **Adv. Search Panel** | `--spacing-inset-md` | N/A | `--spacing-gap-sm` |

---

## Variant A2: Numeric Increments (Atlassian Style)

Uses a numeric scale (e.g., 50, 100, 200) to represent steps.

**Philosophy**: "Predictable and infinite. New sizes can always be added between steps."

### Component Mapping Stress Test (A2)

| Component Area | Inset Padding | Radius | Gap / Internal Rhythm |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-100` | `--radius-200` | `--spacing-gap-50` |
| **Search Box** | `--spacing-inset-200` | `--radius-200` | `--spacing-gap-100` |
| **Table Header** | `--spacing-inset-200` | N/A | `--spacing-gap-50` |
| **Table Row** | `--spacing-inset-100` | N/A | `--spacing-gap-100` |
| **Modal Content** | `--spacing-inset-400` | `--radius-400` | `--spacing-gap-300` |

---

## Variant A3: Purpose-Sized (The "Density" Scale)

Instead of generic sizes, the scale is named after the *intended density* of the interaction zone.

**Philosophy**: "Sizes based on the complexity of the UI."

### Component Mapping Stress Test (A3)

| Component Area | Inset Padding | Radius | Gap / Internal Rhythm |
|:---|:---|:---|:---|
| **Primary Button** | `--spacing-inset-standard` | `--radius-standard` | `--spacing-gap-tight` |
| **Tree View Row** | `--spacing-inset-dense` | `--radius-tight` | `--spacing-gap-max-dense`|
| **Modal Content** | `--spacing-inset-spacious` | `--radius-rounded` | `--spacing-gap-standard` |

---

## Tradeoffs of Option A

- **Pros**: 
    - **Speed**: Developers don't have to look up if an input is a "Control" or a "Surface." They just pick `md`.
    - **Maintainability**: Low token count. Easy to audit the entire app for value consistency.
    - ** Industry Standard**: Mirrors Bootstrap, Tailwind, and Radix.
- **Cons**:
    - **Entanglement**: If you change `spacing-inset-lg` to 20px for Modals, you also change it for Cards and Side Panels. Diverging requires a "split and rename" refactor.
    - **Asymmetric Friction**: As noted in the Eval, `padding: var(--xs) var(--md)` is more verbose to write than `padding: var(--inset-tooltip)`.

## Recommendation

**Variant A1 (T-Shirt Sizing)** is the winner for this category. It provides the best balance of readability and scalability without the overhead of numeric mapping. If the project prioritizes developer efficiency over ultimate architectural flexibility, A1 is the strongest path.
