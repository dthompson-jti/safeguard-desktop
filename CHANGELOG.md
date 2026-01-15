# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
---

## [Unreleased]

### Added
- `--spacing-2p5` (10px) token to spacing specification.
- `DesktopEnhancedApp.module.css` to replace inline styles.
- `@media (hover: hover)` wrappers to prevent sticky hover states on touch devices.

### Changed
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
