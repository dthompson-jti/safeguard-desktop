# Evaluation: Searchable Select vs. Combo Box

The user has requested to evaluate switching the "Officer" filter to a **Combo Box** pattern (Input as trigger) versus the current **Searchable Select** (Button as trigger -> Menu with Search).

## Option A: Current Implementation (Searchable Select)
**Pattern**: Button triggers a Popover. Popover contains a Sticky Search Input + List.
**Visuals**: Looks exactly like other filters (Status, Date) in the row.

### Pros
- **Consistency**: Identical visual rhythm with adjacent "Status", "enhanced observation" filters. All are buttons until clicked.
- **Predictability**: Users know "Click to choose". Search is a helpful utility *inside* the choice, not the primary interaction.
- **Mobile/Touch Friendly**: Opening the menu gives a full view before keyboard pops up (if focus management is handled well).
- **Clear State**: "Any user" or "Name" is clearly displayed as a selected value, separate from the search term.

### Cons
- **Extra Click**: Requires Click -> Wait for Popover -> Type. (Though we auto-focus the search input).
- **Discovery**: User sees a dropdown arrow, might not expect search capability until they open it.

## Option B: Combo Box
**Pattern**: The trigger IS an text input. Typing filters the list immediately.
**Visuals**: Looks like a text field, or a text field with a chevron.

### Pros
- **Speed**: Fastest for power users. Click-and-type or Tab-and-type.
- **Expectation**: "Find..." implies typing. If the goal is primarily "Search", an input feels more natural.

### Cons
- **Visual Inconsistency**: In the `AdvancedSearch` grid, we have:
    - Text Input (Has words)
    - **Officer (Currently Select)**
    - Select (Status)
    - Select (Enhanced Observation)
    - Date Inputs
    - *Changing Officer to a ComboBox might make it look like the "Has words" input, blurring the distinction between "Global Search" and "Filter by Person".*
- **State Complexity**: If I type "Do", do I select "Doe, John"? What if I leave it as "Do"? A Select enforces a valid choice. A ComboBox allows ambiguous "search terms".
- **Design System Gap**: We don't have a standardized "Combo Box" style that matches our Select trigger perfectly yet.

## Recommendation

**Stick with Option A (Searchable Select)** for this specific context.
1.  **Uniformity**: It sits right next to other Selects. Keeping them visually effectively "Selects" is cleaner.
2.  **Validation**: We want to filter by a *specific* officer (Enum), not a fuzzy string. The Select pattern enforces picking a valid record.
3.  **Low Friction**: With `autoFocus` on the search input, the "extra click" cost is negligible.

> [!NOTE]
> If we want to move to Option B, we would ideally refactor *all* filters to be command-palette style or more uniform, but mixing one ComboBox in a sea of Selects might feel disjointed.
