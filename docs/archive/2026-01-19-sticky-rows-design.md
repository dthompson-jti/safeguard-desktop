# Design: Handling Rows that Fall Out of Filter Criteria

**Problem**: When a user adds a comment to a "Missed - No Comment" item, the item immediately disappears from the view because it no longer matches the filter criteria. This is jarring and disruptive to the user's workflow ("What I was just working on instantly disappears").

**Goal**: Keep the user in flow while maintaining data accuracy.

## Option 1: "Sticky" Rows (Recommended)
Keep the modified row visible in the list until the user explicitly refreshes or changes the filter/sort.

-   **Behavior**:
    -   User adds a comment.
    -   The row updates in-place to show the new comment (Optimistic Update).
    -   The row **remains** in the list, even though it technically violates the "No Comment" filter.
    -   The row is only removed when the user:
        -   Changes the filter.
        -   Changes the page.
        -   Clicks "Refresh".
-   **Pros**: 
    -   Zero jarring movement. 
    -   User can immediately review what they just wrote. 
    -   Maintains context.
-   **Cons**: 
    -   Technically "stale" view (shows data that doesn't match the *strict* definition of the current filter header).
    -   Requires managing local state carefully (optimistic update without triggering re-fetch).
-   **Best Practice**: Common in "Inbox" style workflows where you tick items off but they stay for a second or until navigation.

## Option 2: Animate Removal (Ghosting)
Allow the row to disappear, but make it slow and deliberate.

-   **Behavior**:
    -   User saves comment.
    -   Row turns green or fades to 50% opacity for 2 seconds.
    -   Row slides out of view.
-   **Pros**: 
    -   Communicates "Action Successful" + "Item Processed".
    -   Explains *where* it went (it didn't just crash/vanish).
-   **Cons**:
    -   Still removes the context. If the user realizes "Oh wait, I made a typo", they have to go hunt for it.

## Option 3: Toast with "View" Action
Row disappears immediately, but a Snackbar/Toast offers a path back.

-   **Behavior**:
    -   Row vanishes.
    -   Toast appears: "Comment saved. [View Item]"
    -   Clicking [View Item] opens the "All" filter or a specific Modal with that item.
-   **Pros**:
    -   Keeps the list strictly accurate (only "No Comment" items).
    -   Provides an escape hatch.
-   **Cons**:
    -   Requires an extra click to verify work.
    -   Toast might be missed.

## Option 4: "Recent" Section at Top
Move processed items to a temporary "Recently Updated" group at the top of the table.

-   **Behavior**:
    -   Row moves to a pinned "Recently Modified" section at the top.
    -   It stays there for X seconds or until refresh.
-   **Pros**:
    -   Very explicit.
-   **Cons**:
    -   High implementation complexity (breaking table sort/grouping).
    -   Visual clutter.

## Option 5: Auto-Switch Filter
Change the filter to accommodate the new state.

-   **Behavior**:
    -   If the user adds a comment, automatically switch the filter from "No Comment" to "All" or "With Review".
-   **Pros**:
    -   Keeps row visible.
-   **Cons**:
    -   **Extremely disruptive**. The user is likely processing a queue of "No Comment" items. Switching the filter breaks their workflow for the *next* item.


## Recommendation

**Option 1 (Sticky Rows)** is the best balance of usability and implementation effort. It respects the user's immediate context without forcing them to hunt for the item they just touched.

### Implementation Sketch (Option 1)
1.  Modify `SupervisorNoteModal` to **not** trigger the global `historicalRefreshAtom`.
2.  Instead, have it dispatch a granular `updateRowAtom` or similar custom event.
3.  `EnhancedHistoricalReviewView` listens to this event and updates its local `loadedData` state **in place**.
4.  Since `loadedData` is not re-fetched from the "server" (mock), the row stays until the next natural refresh.
