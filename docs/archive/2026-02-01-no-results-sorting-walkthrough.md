# Walkthrough - No Results UI & Sorting Update

I have updated the "no results" state to a two-line design as per Figma and added initial sorting by 'scheduled' for the Live View.

## Changes Made

### Core UI
- **[EmptyStateMessage.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/EmptyStateMessage.tsx)**: Refactored to a strict two-line Title/Message pattern. Removed icons to align with the minimalist design.
- **[EmptyStateMessage.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/components/EmptyStateMessage.module.css)**: Implemented Figma-specified typography (16px/600 for title, 16px/400 for message) and used the tertiary color palette.

### State & Header Sync
- **[atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)**: Introduced `isNoResultsAtom` for global tracking of empty filtered states.
- **[DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)**: Synchronized the page title. When `isNoResultsAtom` is true, the title changes to **"No search results"**.

### View Logic
- **[EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx)**:
  - Added logic to update `isNoResultsAtom` based on filter results.
  - Set `initialSorting` to `scheduled` (ascending) to show immediate/overdue checks first.
  - Switched to the new two-line `EmptyStateMessage`.
- **[EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx)**:
  - Added logic to update `isNoResultsAtom`.
  - Switched to the new two-line `EmptyStateMessage`.

### Modals
- **[SupervisorNoteModal.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.tsx)**: Moved the "Updating N records" notification from the modal header to an info banner within the modal body, positioned above the form fields.
- **[SupervisorNoteModal.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.module.css)**: Implemented `.infoBanner` using semantic info tokens (`--surface-bg-info`, `--surface-fg-info-primary`, `--surface-border-info_subtle`).
- **[DesktopToolbar.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopToolbar.tsx)**: Updated the regular search placeholder to "Find records".
- **[AdvancedSearch.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/AdvancedSearch.tsx)**: Reverted the close button to a standard "X" icon.
- **[DesktopHeader.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DesktopHeader.tsx)** & **[DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx)**: Hidden the Export button (commented out) across all views.
- **[TopNavMenu.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNavMenu.tsx)**: Removed configuration toggles for "Reason required", "Table font weight", and "Dim location breadcrumbs". These settings are now enforced as defaults.

### Debugging & Stabilization
- **[atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)**: Cleanup of deleted `historicalRowUpdateAtom`.
- **[SupervisorNoteModal.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/SupervisorNoteModal.tsx)**: Fixed broken imports and state redeclarations.
- **[mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)**: Refactored `enhancedMockData` to use explicit `export { ... }` syntax to resolve a dev-server evaluation error. Fixed several type safety issues (`any` usage).
- **Views**: Fixed missing `useMemo` dependencies in `EnhancedLiveMonitorView.tsx` and `EnhancedHistoricalReviewView.tsx`.

| Feature | Requirement | Result |
| :--- | :--- | :--- |
| **No Results UI** | Two lines, centered, tertiary color | Fixed (CSS/JSX) |
| **Header Sync** | Title becomes "No search results" | Implemented (State) |
| **Live Sorting** | Initial sort by 'Scheduled' | Updated (Component Prop) |
| **Info Banner** | Body area, info tokens, above fields | Implemented (CSS/JSX) |

> [!NOTE]
> Browser verification was skipped per user request. Code logic and styles have been cross-verified against the provided Figma screenshots.
