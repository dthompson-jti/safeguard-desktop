# Implementation Plan - Enable Time Filtering in Tree Counts

The goal is to modify the Historical View tree counts to respect the Global Time Filter (Date Range) while preserving the strict "Missed & no comment" status logic.

## User Review Required
- None. This is a direct adjustment to the previous request.

## Options Considered

### Option 1: Full Global Filter Inheritance
- **Description**: Revert to the original behavior where the tree respects ALL filters (Date, Status, Shift, etc.).
- **Pros**: Consistency with the table view.
- **Cons**: User explicitly rejected this; they want a stable "To-Do" list that doesn't vanish when they filter for "Completed" items in the table.

### Option 2: Date-Only Inheritance (Recommended)
- **Description**: The tree respects the Global Date/Time filter, but ignores Status/Shift filters.
- **Pros**:
    - **Relevance**: Shows "Missed" items for the *relevant day/period* (e.g., "Yesterday's missed checks").
    - **Stability**: Changing the table status to "Completed" to review work doesn't hide the pending "Missed" counts in the tree.
- **Cons**: Slight conceptual disconnect if user expects *zero* interaction, but "Time" is usually considered a "Context" rather than a "Filter".

## Proposed Changes

### Data Layer
- [ ] Modify `src/desktop-enhanced/hooks/useTreeData.ts`:
    - Restore `desktopFilterAtom` usage.
    - Inside the historical data loop:
        1. Access global `filter` state.
        2. **Apply Date Filtering**: Restore the `dateStart` and `dateEnd` logic.
        3. **Enforce Strict Status**: Keep the `check.status === 'missed' && !check.supervisorNote` check.
        4. **Ignore Other Filters**: Explicitly skip the `historicalStatusFilter` checks in the tree logic.

## Verification Plan
### Manual Verification
1. Open Historical View.
2. Verify tree counts show X amount.
3. Change Time Range (e.g., "Last 24 Hours").
4. **Expectation**: Tree counts UPDATE.
5. Change Status Filter (e.g., "Completed").
6. **Expectation**: Tree counts DO NOT UPDATE (remain fixed on "Missed & no comment").
