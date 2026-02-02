# Update 'No Results' UI Design

Update the "no results" state to a two-line design as per Figma, and synchronize the page title when a search returns no results.

## Proposed Changes

### [Component] Core UI
#### [MODIFY] [EmptyStateMessage.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/EmptyStateMessage.tsx)
- Refactor to strictly support the two-line design (Title + Message).
- Support optional icon rendering (default to hidden if not specified, matching recent PRD).

#### [MODIFY] [EmptyStateMessage.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/EmptyStateMessage.module.css)
- Apply Figma specs:
  - Title: 16px, 600 weight, `--surface-fg-tertiary`, 24px line-height.
  - Message: 16px, 400 weight, `--surface-fg-tertiary`, 24px line-height.
  - Centered layout with appropriate spacing between lines.

### [Component] Desktop Enhanced
#### [MODIFY] [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)
- Monitor a new `isNoResultsAtom` to toggle the page title between the standard title and "No search results".

#### [MODIFY] [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx)
- Update `emptyState` prop passed to `DataTable` to use `EmptyStateMessage`.
- Update `isNoResultsAtom` based on `loadedData.length` and `isLoading`.
- Change `initialSorting` to `[{ id: 'scheduled', desc: false }]` to show most immediate checks first.

#### [MODIFY] [EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx)
- Update `emptyState` prop passed to `DataTable` to use `EmptyStateMessage`.
- Update `isNoResultsAtom`.

### [Component] Modals
#### [MODIFY] [SupervisorNoteModal.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.tsx)
- Move "Updating N records" from header to a body-content info banner.
- Position the banner above form fields.

#### [MODIFY] [SupervisorNoteModal.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.module.css)
- Implement `.infoBanner` using info tokens from `semantics.css`.

### [Component] State
#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Add `isNoResultsAtom` to track if the current view has zero results after filtering.

## Verification Plan

### Automated Tests
- N/A (UI visual change, will verify via browser tool).

### Manual Verification
1. Open the application in the browser.
2. Go to "Live View".
3. Enter a search term that returns no results (e.g., "NonExistentResident").
4. Verify:
   - Header title changes to "No search results".
   - Table displays "No results found" in bold and "Try adjusting your search or filter settings" below it.
   - Both lines are centered and use the correct tertiary color.
5. Repeat for "Historical View".
6. Clear the search and verify the UI returns to normal.
