# Spec: Officer Combo Box Experiment

## 1. Overview
Evaluate converting the "Officer" filter in Advanced Search from a "Searchable Select" to a true "Combo Box".
The goal is to improve usability for power users (keyboard-first) while maintaining a clean UI consistent with the application.

## 2. Current State (`SearchableSelect`)
Currently, the `Officer` field uses `SearchableSelect`.
- **Interaction**:
  1. Click the "Trigger" (looks like a button/select).
  2. Popover opens.
  3. Focus moves to a *separate* Search Input inside the popover.
  4. User types to filter.
  5. User selects an option.

### Pros & Cons
| Pros | Cons |
| :--- | :--- |
| **Explicit Context**: Clear distinction between "closed" and "searching". | **Friction**: Requires an extra click/wait to start typing. |
| **Mobile Friendly**: Default Select behavior is often better on touch (though this is custom). | **Visual Disconnect**: Search input is inside the menu, not the trigger. |
| **Consistent**: Matches other `Select` inputs in the app (mostly). | **Slow for Data Entry**: Repetitive selection of known names is slower. |

## 3. Proposed State (`ComboBox`)
A Combo Box unifies the **Trigger** and the **Search Input**.
- **Interaction**:
  1. Click (or Tab to) the "Trigger" (looks like an input).
  2. Start typing immediately.
  3. Popover opens *automatically* with filtered results.
  4. User hits Enter or Clicks to select.

### Pros & Cons
| Pros | Cons |
| :--- | :--- |
| **Efficiency**: Zero-latency search. Just type. | **Complexity**: Handling "custom values" vs "selection only" requires careful validation. |
| **Standard Pattern**: Familiar to users of modern apps (Spotlight, Linear, etc). | **Space**: Search input text persists in the trigger, which can look "busy" if not styled well. |
| **Keyboard**: Tab -> Type -> Enter is a very fast workflow. | **Mobile**: Virtual keyboard pops up immediately, which might be intrusive if just browsing. |

## 4. Technical Specification
**Constraint**: No new dependencies (e.g., `cmdk`) unless necessary. No Tailwind.

### Component Structure
We will build a `ComboBox` using existing Radix Primitives:
- `@radix-ui/react-popover`: For the floating list.
- `input` (HTML): For the trigger/filter.

### Logic (The "Write Experiment")

#### State
- `inputValue`: The strings being typed.
- `selectedValue`: The actual officer ID/Name selected.
- `open`: Boolean state of the popover.
- `highlightedIndex`: For keyboard navigation (Arrow Up/Down).

#### Behavior
1.  **Focus**: Focusing the input opens the popover (or requires a click - configurable).
2.  **Filtering**: 
    - As `inputValue` changes, filter `OFFICER_NAMES` list.
    - If `inputValue` is empty, show all options (or recent).
3.  **Selection**:
    - **Click Option**: Sets `selectedValue`, updates `inputValue` to match match, closes popover.
    - **Blur**: If `inputValue` matches a valid option, select it. If not, revert to previous `selectedValue` (strict selection).
4.  **Styling** (CSS Modules):
    - **Trigger**: Must look like existing `Select` triggers but with a cursor.
    - **Popover**: Re-use `.menuPopover` styles if possible for consistency.

#### 4.1 Handling "All / Any" Selection
The current implementation uses a special value `'any'` for "All officers". 
In a Combo Box (Input), this maps to an **Empty String**.

- **Empty State**: 
    - When the input is empty (`""`), it implies **"All officers"**.
    - The Input Placeholder will read "All officers".
- **Explicit Option**: 
    - The dropdown will include an "(All officers)" option at the very top.
    - **Behavior**: Selecting "(All officers)" **clears** the input value (sets it to `""`), effectively resetting the filter.
- **Visuals**:
    - If `inputValue === ''`, show "All officers" (placeholder style).
    - If `inputValue !== ''`, show the value (normal text style).

## 5. Migration Plan
1.  **Build** `src/components/ComboBox.tsx` (Experiment).
2.  **Swap** in `AdvancedSearch.tsx` to test.
3.  **Verify** behavior with Keyboard (Tab, Arrows, Enter, Escape).

## 6. Recommendation
Move to **Combo Box**.
For a high-frequency filter like "Officer" (where names are known and specific), the efficiency of typing immediately outweighs the simplicity of a standard Select.

---
**Next Steps**:
- [ ] Approve this spec.
- [ ] Implement `ComboBox` prototype.
- [ ] User testing.
