# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Changed (2026-01-20)
- **Live View Refinement**: Removed the Details Panel and its toggle button from the Live Monitor view to optimize focus on real-time metrics. The panel remains available in Historical Review for administrative tasks.
- **Side Panel Refinement**: Implemented "Pinned" vs "Transient" visibility modes for the Details Panel.
    - **Transient Mode**: Panel automatically shows when exactly one record is selected and hides when selection is cleared or multiple items are selected.
    - **Pinned Mode**: Panel remains open regardless of selection when explicitly toggled via the header button.
    - **Universal Support**: Enabled the side panel and its toggle button for both Live Monitor and Historical Review views.
    - **UI Standardisation**: Standardized the panel toggle button with proper tooltips, icons, and consistent pinning behavior.
- **UI Content Audit**: Standardized and enforced **Sentence case** across the entire application interface.
    - Updated over 50+ strings including tooltips, button labels, dropdown options, and selection indicators.
    - Standardized interactive cues like "Add comment", "View resident", and "Reset filters".
- **Enhanced Breadcrumbs**:
    - Ancestor path levels and chevrons now use subtle `var(--surface-fg-quaternary)` to reduce visual noise.
    - Active location (the final item) now uses `var(--control-fg-selected)` (Blue) for clear orientation.
- **View Title Refinement**: Standardized the main content area title ("Safeguard checks – Live view/Historical view") to use `var(--surface-fg-secondary)` with 18px font-weight at a left-aligned position.
- **Sidebar Search Placeholder**: Updated to "Find nav items".
- **Toolbar Search Placeholder**: Updated to "Find checks".
- **Table Action Menu**: Refined the table row action menu visibility and styling.
    - **Live View**: Removed the rightmost action column entirely to maximize horizontal space for live metrics.
    - **Historical View**: Retained the action column for administrative tasks (Add/Edit comments, etc.).
    - **Uniform Styling**: Updated the `...` menu trigger to use the standard **Tertiary** button variant, replacing the previous non-standard style.

### Removed (2026-01-20)
- **Technical Debt Cleanup**: 
    - Removed unused "More Actions" popover from the Enhanced UI.
    - Cleaned up unused variables and imports (`isMoreActionsOpen`, `Popover`, `useState`) in `DesktopEnhancedApp.tsx`.
    - Renamed Navigation Panel header from "Safeguard Checks" to "Facility".


### Added
- **Design System Hardening**: Introduced a unified Z-Index semantic scale (`--z-overlay`, `--z-modal`, `--z-toast`) in `semantics.css` to prevent layering conflicts.
- **Layout Stability**: Added `useTableAutoFit` hook to `DataTable` to reliably calculate column widths based on content rendering, removing fragile "magic number" logic.

### Changed
- **Component Hygiene**: Refactored `SearchController` and `TopNavMenu` to use semantic `<button>` elements instead of `div onClick` for improved accessibility and focus management.
- **Row Context Menu**: Migrated from manual URL-based portal positioning to **Radix UI Popover**, ensuring robust positioning, collision handling, and proper focus containment.
- **Token Adoption**: Refactored `TreeView`, `BulkActionFooter`, and `toast` CSS modules to strictly use design system tokens for spacing, typography, and z-index.

### Fixed
- **Accessibility**: Fixed inaccessible interaction patterns in key navigation components ("div buttons").
- **Layout**: Fixed inconsistent z-index usage that could lead to stacking context warring (e.g., toasts appearing under modals).
- **Sticky Rows**: Implemented "Sticky Rows" for Historical View.
    - Rows now remain visible after adding a comment (even if they violate the active filter) until navigation/refresh.
    - Fixed initial race condition in multi-select updates by implementing atomic batch updates.
    - Significantly improved UX flow for bulk-commenting "Missed" items.

### Fixed (2026-01-19) - Late Session 2
- **Supervisor Comment Refinement**:
    - **Visual Clarity**: Split the Supervisor Comment section in the Details Panel into distinct "Date", "Supervisor", and "Comment" fields.
    - **Data Integrity**: Resolved an architectural issue where Supervisor Name and Review Date were not being generated or saved by the modal.
    - **Real-time Sync**: Implemented explicit synchronization of the `activeDetailRecordAtom` to ensure the Details Panel updates immediately upon saving a comment, eliminating stale data.

### Fixed (2026-01-19) - Late Session
- **Z-Index Hierarchy Fix**:
    - **Semantics**: Audited and updated semantic z-index scale (Modals: 2000, Dropdowns: 2100).
    - **Visual Fix**: Resolved issue where "Reason for missed checks" dropdown rendered BEHIND the Supervisor Note modal.
    - **Consistency**: All overlay components (`menu.css`, `modal.css`, `popover.css`, `tooltip.css`) now strictly use semantic z-index tokens.
- **Missed Checks Logic Refinement**:
    - **Live View Consistency**: Live "Overdue" checks (which display "Missed (N)") now generate distinct "missed" records in the Historical View for each missed interval (e.g., at 15m, 30m).
    - **Visual Clarity**:
        - Open checks (Upcoming/Due/Overdue) now display "—" (em dash) in the **Actual** time column of the Details Panel instead of misleading scheduled times.
        - Checks without an assigned officer now display "—" instead of "Pending" in the Details Panel.

### Removed (2026-01-19)
- **Save Default Filter**: Removed the ability for users to save their own default filters.
    - Simplified the reset logic to always revert to factory defaults.
    - Removed the "Save as my defaults" action from the More Actions menu.

### Fixed (2026-01-18)
- **Mock Data Reliability**: Fixed a critical `ReferenceError` in `mockData.ts` caused by circular initialization order of `seededRandom`.
- **Save Filters as Default**: Fixed the "Save as my defaults" action in the enhanced view which was previously non-functional.
    - Connected the action to `saveFiltersAsDefaultAtom` to properly save user preferences.
    - Added success toast notification.
    - Ensured that saving defaults correctly resets the "modified" state of dropdowns (returning them to normal gray appearance).

### Fixed (2026-01-17)
- **Architectural Overhaul of Control States**: Fixed pixel-perfect styling for all button and select components.
    - Added missing `--control-border-selected-pressed` token to `semantics.css` (all themes) - this was causing silent shadow failures.
    - Fixed Selected button hover/pressed states to show correct 2/2/4/2 visual border model (2px sides, 4px bottom).
    - Added `!important` to selected/active pressed state styles to override variant-level `!important` declarations.
    - FilterSelect split-button now has 2px gap between trigger and clear button.
    - FilterSelect chevron now inherits theme color (blue) in selected state.
    - FilterSelect state changes are now instant (no transition animations).
    - Added comprehensive architectural invariant comments to prevent future regressions.

### Fixed (2026-01-18) - Late Session
- **Tree Count Logic**: Refined Historical View tree counts.
    - Counts now strictly reflect "Missed & Un-commented" checks.
    - **Outcome**: Counts respect the **Global Date Range** (e.g., "Last 24 Hours"), but ignore the **Status** filter.
    - This ensures the tree serves as a stable "To-Do" list for the selected period, regardless of table view status.
- **Search Legibility**: Fixed "Find" input text color.
    - Applied appropriate semantic tokens to ensure search text is clearly visible against the background.
- **Nav Item Hover**: Added hover state for selected navigation items.
    - Implemented a 1-token darker hover effect for the currently selected nav item.
- **Resident Distribution**: Refined mock data generation.
    - Residents are now uniquely assigned to 1-2 per room, preventing duplicates across the facility.
- **Live View Order**: Updated default sort to Status (Missed First) -> Scheduled Time.
    - Fixed sorting priority so "Overdue" correctly appears before "Upcoming".
    - Automatically sorts oldest missed items to the top.
- **Micro-Interactions (Tooltips)**: Implemented comprehensive tooltip support using Radix UI.
    - Added meaningful tooltips to **Status Chips** ("Missed – No Comment", etc.).
    - Added stats tooltips to the **Global Status Widget** ("Overdue: 5", "Due: 2").
    - Added tooltips to sidebar badges for context-aware counts (e.g., "Missed – No Comment" in Historical vs. "Overdue" in Live).
    - Added full-text tooltips for truncated **Supervisor Comments** in the Historical View.
    - Implemented consistent "Special Risk (High Risk Resident)" tooltip for all "SR" badges.
    - **Visuals**: Styled tooltips with regular borders (`--surface-border-primary`) instead of theme colors for a clean, neutral look in both light and dark modes.
    - **Tree View Hover**: Added hover state for tree items.
        - Items now display a `control-border-tertiary` left border on hover, providing a clear interactive cue.
    - **Tree View Selection**: Implemented default selection behavior.
        - The facility (root) node is now automatically selected on load if no other node is selected, preventing an empty details panel state.
    - **Multi-Resident Display**: Flattened mock data generation.
        - Multi-resident rooms now display as separate rows (one per resident) in both Live and Historical views, matching the 1-check-per-resident requirement.
    - **Table Sort Indicators**: Fixed double sort arrow.
        - Merged scheduled time logic into the primary Status sort.
        - Removed the explicit secondary sort from the initial table state to prevent visual clutter.
    - **Default View**: Changed default landing view.
        - The application now defaults to the **Historical View** instead of the Live Monitor on fresh sessions.


    - **Live View Refinements (2026-01-19)**:
        - **Multiple Residents**: Rooms with multiple residents now stack names vertically within the "Resident" cell.
        - **Layout Alignment**: Content now aligns to the top of the cell for multi-line rows, while centered single-resident rows are visually preserved.
        - **Status Badges**:
            - Added **Medical Watch (MW)** support with badges.
            - "MW" and "SR" badges now right-aligned with specific residents.
            - **Missed Check Counts**: Added "(N)" count to the "Missed" status badge (e.g., "Missed (3)").
        - **Context Menu**: Removed "View resident" action.
    - **Detail Panel**:
        - **Typography**: `LabelValueRow` values now use **regular** font weight (was medium/bold).
        - **Interaction**: Panel **no longer auto-opens** on row selection; manual toggle only.
        - **Officer Details**: "Officer Log" demoted to "Officer Comments" row; empty names fallback to `—`.
    - **Historical View**:
        - **Columns**: Removed "Variance", moved "Comments" to end.
        - **Export**: Removed Export button.


- **View State Synchronization**: Unified view state management across the application.
    - Removed redundant `desktopEnhancedViewAtom`.
    - Migrated all components to use the canonical `desktopViewAtom`.
    - Ensured immediate and consistent synchronization between the sidebar tree, mode toggle, and toolbar filters.
- **Filter Experience Refinement**: Cleaned up toolbar filters for improved operational focus.
    - **Live View**:
        - Updated Status dropdown options to "All", "Due", "Missed", "Upcoming".
        - Removed irrelevant "Missed – No Comment" status option.
        - Removed redundant Time Range dropdown.
    - **Historical View**: Maintained full status and time range filtering capabilities.

- **Navigation Visuals**: Reached parity with high-fidelity visual design for Sidebar and Top Navigation.
    - **Visual Hierarchy**: Refined Sidebar with "Quick Access", "Recent Cases", and "Notes Library" sections.
    - **Semantic Theme**: Implemented "Hybrid" theme for navigation (Dark top nav, Light sidebar) using new `nav-*` semantic tokens.
    - **Hover States**: Added `--nav-item-selected-hover` token for selected items (1-token darker) naturally maintaining "on-solid" foreground color.
    - **Label Renames**: Renamed "Safeguard" to "Safeguard checks" in the left navigation to match operational specifications.
    - **3-Column Top Nav**: Overhauled header layout to support System Icons (Left), Global Search (Center), and Session Actions (Right).
    - **Refined Avatar**: Updated user avatar to use high-contrast initials on a white background.
    - **Unified Spacing**: Standardized left navigation item spacing to a consistent 1px gap using Flexbox.
    - **Token Alignment**: Removed `32px`/`48px` magic numbers, replacing them with standard sizing tokens (`control-height-sm`, `avatar-size-md`).

- **Enhanced Navigation Restructuring**: Split the navigation area into two distinct rows for better visual hierarchy.
    - Added Row 1 strictly for breadcrumbs, centered vertically in a 20px height.
    - Added Row 2 for right-aligned actions (Export, More Actions, Panel Toggle) with an 8px gap.
- **Button Styling Refinement**: Reached high-fidelity skeuomorphic standards for all button variants.
    - Standardized **Primary**, **Secondary**, and **Semantic** buttons to be flat at rest (1px border) with 3px visual bottom on hover.
    - Refined the **Pressed state** with a recessed skeuomorphic inner shadow (`inset 0 2px 4px`) across all solid variants.
    - Increased **Selected Hover** logic to 4px visual bottom (2px base + 2px extra emphasis) for distinct feedback on active toggles.
    - Unified all semantic variants (Destructive, Success, Info, Warning, Alert) to follow the "flat at rest" design system rule.
- **Dropdown Standardisation**: Refined Select and FilterSelect triggers.
    - Standard dropdowns now match text input hover states (subtle 1px border).
    - Filter dropdowns now explicitly match Secondary button characteristics for rest, hover (3px), and pressed (recessed) states.
- **Button Token Standardization**: Reached 100% Figma parity for quaternary button hover and active states.
    - Restored hover borders for `quaternary` buttons across the design system.
    - Refactored `TreeView` chevrons to use the standard root `Button` component for styling consistency.
- **Mode Toggle Refinement**: Standardized the view toggle switcher.
    - Applied quaternary styling to unselected items (with borderless hover specifically for the toggle row).
    - Reduced gap and internal padding to 2px (`var(--spacing-0p5)`) for a more compact vertical rhythm.
- **More Actions Popover**: Implemented a list-style menu for the `[...]` button in the Enhanced UI.
    - Includes actions: "Generate QR codes", "Manage facilities", "Save as my defaults", and "Settings".
    - Standardized sentence casing and concise wording across all action menus.
- **Improved Alignment**: Synchronized margins for `ModeToggle` and `Breadcrumbs` to 12px (`var(--spacing-3)`) for a perfectly balanced toolbar layout.

- Smooth auto-width transitions for filter controls using mechanical (linear) motion.
- "Save Filters as Default" feature with `localStorage` persistence and dynamic time presets.
- Sticky customization state: filters track explicit user modifications and remain "active" (blue) until cleared.
- High-fidelity split-button UI for active filters with 2px borders and rock-solid segment joining.
- "Today" and "Last 24 Hours" presets to the historical time range filter.
- "Expand All" and "Collapse All" actions to the Tree View navigation menu.
- Accurate "Last 8 Hours" and ISO timestamp filtering in mock data.
- Added `group` and `unit` fields to `PanelData` for enhanced monitoring metrics.

### Changed
- Custom Time Range filter from a Popover to a refined Centered Modal.
- Refined Custom Range UI with date-only inputs, internal button alignment, and tertiary Cancel variant.
- **Advanced Search Refinement**: Reached 100% Figma parity for the Historical filter panel.
    - Standardized control height to `44px` (`--control-height-lg`) and gaps to `16px`.
    - Applied `surface-bg-secondary` background to all toolbar search bars.
    - Migrated all dropdowns to Radix-based `Select` components with 8px radii.
    - Updated typography to 14px Medium with precise 6px vertical label spacing.
- **Toolbar**: Conditionally removed "Advanced search" trigger from the Live view.
- **Design System**: Redefined `size="m"` (36px) and `size="s"` (32px) buttons to align with desktop standards.
- **Selected States**: Refined active button appearance with a 2px visual border and 4px depth on hover (Figma parity).
- **Side Panel Resizers**: Standardized resizer width to 2px and applied `control-border-selected` blue theme.
- **Component Hierarchy**: Adjusted Navigation Panel action button to `tertiary` variant for correct visual weighting.
- **Button Icons**: Added `opsz: 20` to button icons for optical clarity.
- **UI Refinement**: Standardized all Modals to use "Desktop Medium" (36px) primary actions.
- **Menu Spacing**: Redefined menu item padding (`8px 12px`) and gap (`8px`) across all dropdowns and popovers for a more compact, balanced layout.
- **Detail Panel**: Simplified Supervisor Comments display and moved "Delete" action to the editing modal.
- **Modals**: Standardized all "Cancel" actions to use `variant="secondary"` and appear on the right side.
- **Supervisor Note Modal**: Refined layout, removed extra padding, and cleaned up helper text.
- **Mobile Cleanup**: Removed `desktop-overrides.css`, `touch-action: none` (except where necessary), and hardcoded mobile touch targets.

### Fixed
- Bulk Action Footer layering issue by increasing z-index to 102.
- Layout instability by enforcing max-width on the navigation panel.
- Border flicker on side panel resizers by syncing indicator width and background color.
- **Advanced Search**: Fixed critical `SyntaxError` and Radix Select empty-value crash.

---

## [Unreleased-Previous]

### Added
- `--spacing-2p5` (10px) token to spacing specification.
- `DesktopEnhancedApp.module.css` to replace inline styles.
- `@media (hover: hover)` wrappers to prevent sticky hover states on touch devices.

### Changed
- Updated `BulkActionFooter` to use correct design tokens for radius, border, and background.
- Fixed `BulkActionFooter` hardcoded shadow values to ensure visibility as per user request.
- Normalized Z-index values across all components to strictly adhere to the layering contract (Overlays: 106).
- Replaced primitive grey tokens with semantic surface tokens in global CSS files.
- Refactored `DesktopEnhancedApp`, `Breadcrumbs`, and `EnhancedLiveMonitorView` to remove inline styles.
- Consolidated selection synchronization logic into `Layout.tsx`.

### Removed
- Obsolete `NfcScanState` type from `types.ts`.
- Redundant `walkingOrderIndex` and `completionStatus` fields from `SafetyCheck` interface.
- Inline styles from major desktop components.

---

## [1.0.0] - YYYY-MM-DD

### Added
- [Describe what was added]

### Changed
- [Describe what was changed]

### Fixed
- [Describe what was fixed]

### Removed
- [Describe what was removed]

---
