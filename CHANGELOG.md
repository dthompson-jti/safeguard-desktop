# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

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
        - The application now defaults to the **Historical View** instead of the Live Monitor on fresh sessions.,

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

## Example Entry

### [2.1.0] - 2024-01-15

### Added
- New Button component with primary/secondary variants
- Dark mode support with theme switcher
- Accessibility audit workflow

### Changed
- Refactored spacing system to use `gap` instead of margins
- Updated typography scale to match brand guidelines

### Fixed
- Button hover state in dark mode
- Inconsistent spacing in sidebar navigation

### Removed
- Deprecated `LegacyButton` component
