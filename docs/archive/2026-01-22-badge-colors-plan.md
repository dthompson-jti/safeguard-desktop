# Implementation: Resident Badge Color Options

## Goal Description
Allow users to configure the appearance of resident status badges (e.g., Suicide Risk, Medical Watch) with three color modes:
1.  **Neutral** (Default): Grey/Slate background (current behavior if "special" is mapped to grey).
2.  **Warning**: Yellow/Orange background (current behavior of "special").
3.  **Info**: Blue background.

This setting will be controlled via a menu toggle, similar to the `residentDisplayMode`.

## Proposed Changes

### 1. State Management
#### [MODIFY] [atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)
-   Add `residentBadgeColorModeAtom` with type `'neutral' | 'warning' | 'info'`.
-   Default to `'neutral'`.

### 2. Component Updates
#### [MODIFY] [StatusBadge.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/StatusBadge.tsx)
-   Update `StatusBadge` to accept a `colorMode` prop override, or internalize the atom (better to pass prop for purity, but considering `StatusBadge` is low level, maybe the caller `ResidentStatusGroup` should control this).
-   Actually, `StatusBadge` accepts `status`. We might need a new prop `visualVariant` or just map the `special` status to different CSS variables based on the mode.
-   **Approach**: `ResidentStatusGroup` reads the atom and passes a prop `variant` to `StatusBadge`?
    -   `StatusBadge` currently uses `status` to determine color.
    -   If we pass `status="special"`, it maps to a specific style.
    -   We can add a `variant` prop to `StatusBadge` that overrides the color variables for `special` status.
    -   Or we can just change what `status` we pass? No, semantic status is "special".
    -   Let's add `colorOverride?: 'neutral' | 'warning' | 'info'` to `StatusBadge` props.

#### [MODIFY] [ResidentStatusGroup.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/ResidentStatusGroup.tsx)
-   Read `residentBadgeColorModeAtom`.
-   Pass the color mode to `StatusBadge`.

#### [MODIFY] [DetailPanel.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/DetailPanel.tsx)
-   Read `residentBadgeColorModeAtom`.
-   Pass the color mode to `StatusBadge` used in the tree layout.

### 3. UI Controls
#### [MODIFY] [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx)
-   (Or wherever the view options menu is). Add the toggle for Badge Color Mode.
-   Probably in `ViewOptions` menu if it exists, or just next to the resident display toggle.

## Verification Plan
1.  **Menu**: Open View Options, toggle between Neutral, Warning, Info.
2.  **Visuals**:
    -   **Neutral**: Badges are Grey.
    -   **Warning**: Badges are Yellow/Orange.
    -   **Info**: Badges are Blue.
3.  **Persistence**: Verify the setting likely persists (if atoms persist, otherwise just session).
