# Filter Semantics Analysis

The user highlighted an ambiguity with "Any" options in filters.
*Example*: Does "Any status" mean "Show rows with *any* status (ignore nulls)" or "Show *all* rows (disable filter)"?

## Current State Audit

| Filter Context | Label Used | Internal Value | Logic Implemented | Interpretation |
| :--- | :--- | :--- | :--- | :--- |
| **Officer** | "Any user" | `'any'` | `if (val !== 'any') match()` | **Disable Filter** (Show All) |
| **Hist. Status** | "Any status" | `'all'` | `if (val !== 'all') match()` | **Disable Filter** (Show All) |
| **Enh. Observe** | "Any status" | `'any'` | `if (val !== 'any') match()` | **Disable Filter** (Show All) |
| **Comment Reason**| "Any reason" | `'any'` | `if (val !== 'any') match()` | **Disable Filter** (Show All) |

## The Ambiguity

1.  **"Any status" (Enhanced Observation)**:
    - Current: Shows records with SR, MW, *and* records with None.
    - User Expectation Nuance: A user might select "Enhanced Observation" filter expecting to see *only* records that have an observation (SR *or* MW). They currently see *everything*, effectively resetting the filter.
    - Ambiguity: "Any" acts as "All Records" (Reset), but linguistically implies "At least one" (Presence).

2.  **"Any reason" (Comment Reason)**:
    - Current: Shows records with "Medical Emergency", "Lockdown", *and* records with NO comment.
    - Ambiguity: If I filter by "Comment Reason", I might expect to see *only* commented rows, and "Any reason" means "Has comment (regardless of reason)".
    - Currently, it behaves like "Ignore this filter".

## Proposal: "All" vs. "Any" vs. "Blank"

We should standardize the "No Filter" state and potentially introduce a "Has Value" state where appropriate.

### Pattern A: Explicit "All" (Current "Reset")
Rename the "Reset/No Filter" option to be explicitly about the *scope* of records shown, not the property value.
- **"All records"** (or "All officers", "All statuses") -> Disables filter.
- **"Has any [property]"** -> Filters for presence (Not Null).
- **"[Specific Property]"** -> Filters for value.

### Pattern B: The "Blank" Row (User Idea)
The first item is blank or says effectively nothing, implying "No constraint".
- `[          ]` (All records)
- `[ SR       ]`
- `[ MW       ]`

*Critique*: Blank can be confusing. "Is it broken/loading?" A placeholder like "All" is usually safer.

### Pattern C: Sentence Logic (Standardization)
Use clear phrasing that completes the sentence: "Show records where Officer is..."
- **"...anyone"** (All records)
- **"...John Doe"**
- **"...Jane Smith"**

"Show records where Enhanced Observation is..."
- **"...ignored (Show all)"**
- **"...Any observation"** (New! Union of SR + MW)
- **"...SR"**
- **"...MW"**

## Recommendation

Refine labels to distinguish **"No Filter"** from **"Has Any Value"**.

### 1. Enhanced Observation
- Change current "Any status" (`'any'`) to **"All records"** (or just "All").
- *Optionally* add a new **"Has observation"** option if the user wants to see SR+MW combined excluding normal records.

### 2. Comment Reason
- Change current "Any reason" (`'any'`) to **"All records"**.
- *Note*: We already have a separate "Comment Filter" (None / Has). The "Comment Reason" filter is a sub-filter using the Searchable Select? No, it's a standard Select.
- If "Comment Reason" is a primary filter, "All records" makes sense.

### 3. Officer
- Change "Any user" to **"All officers"**.

### 4. Historical Status
- Change "Any status" to **"All statuses"**.

## Specific "Blank" Concept
If we strictly follow the user's "Blank" idea:
- The trigger button displays the *selected value*.
- If "All" is selected, does it show "All" or ""?
- Showing "All" is explicit. Showing "" reduces noise but increases cognitive load ("Did I select something?").
- **My suggestion**: Stick to text, but use **"All"** instead of "Any". "Any" implies selection from a set. "All" implies the whole set.

### Summary of Label Changes

| Filter | Old Label | New Label (Proposed) | Logic Change? |
| :--- | :--- | :--- | :--- |
| **Officer** | Any user | **All officers** | No |
| **Hist. Status** | Any status | **All statuses** | No |
| **Enh. Obs.** | Any status | **All records** (or 'All types') | No |
| **Cmnt. Reason** | Any reason | **All records** | No |
