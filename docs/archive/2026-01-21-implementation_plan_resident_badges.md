# Resident Badges Toggle

## Goal Description
Add a toggle to the hamburger menu to switch resident display mode in the Live Monitor table. Feature "Resident in badges" will wrap high-risk/medical-watch residents in a warning-colored chip. Additionally, update the default "special" status badge to always use warning semantic colors.

## Proposed Changes

### State Management
#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
- Add `showResidentBadgesAtom` (boolean, default `false`).

### Styling
#### [MODIFY] [StatusBadge.module.css](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/StatusBadge.module.css)
- Update `[data-status='special']` to use warning semantic variables (e.g., `--semantic-warning-fg`, `--semantic-warning-bg`, `--semantic-warning-border`).

### Components
#### [MODIFY] [TopNavMenu.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/TopNavMenu.tsx)
- Import `showResidentBadgesAtom`.
- Add a toggle switch to the popover menu.

#### [NEW] [ResidentChip.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/ResidentChip.tsx)
- Create a new component for the "enabled" state.
- Props: `name`, `highRisk`, `medicalWatch`.
- Renders: `[Name] <Separator> [Icon] [Initial]` (SR/MW).
- Styling: Warning semantic colors (border, bg, fg).

#### [MODIFY] [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx)
- Subscribe to `showResidentBadgesAtom`.
- In `resident` column `cell` renderer:
    - If atom is `true` AND resident has special status: Render `ResidentChip`.
    - Else: Render default plain text + `StatusBadge` (which will now be warning colored).

## Verification Plan

### Manual Verification
1.  **Initial State**:
    - Open Live View.
    - Observe residents with "SR" or "MW" flags.
    - **Verify**: The "SR"/"MW" badges are now warning colored (Yellow/Orange) instead of their previous color.
2.  **Toggle Feature**:
    - Open Hamburger Menu.
    - Toggle "Show resident in badges" to ON.
    - **Verify**: The toggle state persists (or updates) correctly.
3.  **Active State**:
    - Observe the same residents.
    - **Verify**: They are now rendered as a single chip containing the Name and Status, styled with warning colors.
    - Example: `John Doe | ⚠ SR`
