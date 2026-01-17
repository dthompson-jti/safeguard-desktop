# Architecture: Left Navigation Components

## 1. Component Hierarchy
We will implement a recursive, data-driven navigation system.

```mermaid
graph TD
    A[SideBar] --> B[SearchInput]
    A --> C[NavScrollArea]
    C --> D[NavGroup (Section)]
    D --> E[NavItem (Primary)]
    D --> F[NavGroup (Nested)]
    A --> G[UserProfile / Footer]
```

### Components Definition
1.  **`SideBar.tsx`**: The main layout container. Manages the expanded/collapsed width transitions and global keyboard listeners.
2.  **`NavGroup.tsx`**: A purely presentational wrapper for sections (e.g., "Main", "Workspaces"). Handles the `h3` headers.
3.  **`NavItem.tsx`**: The core interactive unit.
    *   **Props**: `icon`, `label`, `href`, `isActive`, `isExpanded`, `onClick`.
    *   **Variants**: `standard`, `quickAccess`, `subItem`.
4.  **`SidebarSearch.tsx`**: The specialized search input with validity polling logic.

## 2. State Management (Jotai)
We will use Atoms to avoid prop drilling and managing specific UI states.

### `sidebarAtom.ts`
```typescript
import { atom } from 'jotai';

// Persisted expansion state (Collapsed vs Expanded)
export const sidebarExpandedAtom = atomWithStorage('sidebar-expanded', true);

// Active navigation selection (Derived or synced with Router)
export const activeNavIdAtom = atom<string | null>(null);

// Search interactions
export const sidebarSearchQueryAtom = atom('');
```

## 3. Interfaces

```typescript
interface NavItemProps {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: NavItemProps[]; // For recursion
  isExpanded?: boolean; // Controlled by parent or local state?
}
```

## 4. Accessibility Strategy
*   **Landmark**: `<nav aria-label="Main Navigation">`.
*   **List Structure**: `<ul>` -> `<li>` for all items.
*   **Icons**: `aria-hidden="true"` for decorative icons.
*   **Collapse Button**: `aria-expanded={isExpanded}` `aria-controls="sidebar-content"`.
*   **Keyboard**:
    *   `Tab`: Moves focus linearly.
    *   `Space/Enter`: Activates link or toggles group.
    *   `Arrow Keys` (Bonus): Map Up/Down to traverse list without Tabbing (Phase 2 feature, strictly not MVP but good for Dev Notes compliance).

## 5. CSS Modules Strategy
We will use CSS Modules mapping to our Semantic Tokens.
*   `SideBar.module.css`:
    *   `.container`: `background-color: var(--surface-bg-secondary)`
    *   `.container[data-collapsed="true"]`: Width changes, labels hide.
```css
/* Example Mapping */
.navItem {
  color: var(--surface-fg-secondary); /* Mapped from #223a58 */
  height: var(--control-height-sm); /* 32px */
}
.navItem:hover {
  background-color: var(--surface-bg-secondary-hover);
}
.navItem[data-active="true"] {
  background-color: var(--surface-bg-active);
  color: var(--surface-fg-secondary);
  border-left: 2px solid var(--surface-border-theme);
}
```
