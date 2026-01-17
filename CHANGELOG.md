# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]
### Added
- Sort state toggle logic to `DataTable` that prevents "sorting removal" (sticky sorting).
- Enhanced hover visibility for sort indicators (opacity increased to 0.6).

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
