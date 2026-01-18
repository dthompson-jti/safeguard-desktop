# Implementation Plan 01: Foundation & Layout
**Objective**: Build the structural foundation for the Left Navigation.
**Role**: Junior Developer / Implementation Engine
**Prerequisites**: None.

---

## 1. Atoms Setup (State Management)
**File**: `src/desktop/atoms.ts`
**Action**: Add the following atoms to the end of the file.

```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// ... existing atoms ...

/**
 * SIDEBAR STATE
 * Persists the expanded/collapsed state of the left navigation.
 * Default: true (Expanded)
 */
export const sidebarExpandedAtom = atomWithStorage<boolean>('sidebar-expanded', true);

/**
 * SIDEBAR SEARCH
 * Tracks the current input in the sidebar search box.
 */
export const sidebarSearchQueryAtom = atom<string>('');
```

## 2. CSS Foundation (The Container)
**File**: `src/desktop/components/SideBar/SideBar.module.css` (Create New)
**Action**: Define the rigid layout properties. **Strictly adhere to these tokens.**

```css
/* Sidebar Container */
.container {
    /* Dimensions from Audit */
    width: 236px; /* Fixed width (Expanded) */
    height: 100%;
    
    /* Layout */
    display: flex;
    flex-direction: column;
    
    /* Surface */
    background-color: var(--surface-bg-secondary); /* #F9F9F9 (Light) / #0A0C12 (Dark) */
    border-right: 1px solid var(--surface-border-tertiary); /* Divider line */
    
    /* Transition for collapse animation (Phase 2 polish, setting up now) */
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: width; /* Optimization from Architecture Review */
    overflow: hidden; /* Hide content when collapsing */
}

/* Collapsed State Modifier */
.container[data-collapsed="true"] {
    width: 60px; /* Standard collapsed width */
}
```

## 3. Component Skeleton
**File**: `src/desktop/components/SideBar/SideBar.tsx` (Create New)
**Action**: Create the logical wrapper.

```typescript
import { useAtomValue } from 'jotai';
import { sidebarExpandedAtom } from '../../atoms';
import styles from './SideBar.module.css';

export function SideBar() {
    const isExpanded = useAtomValue(sidebarExpandedAtom);

    return (
        <nav 
            className={styles.container}
            data-collapsed={!isExpanded}
            aria-label="Main Navigation"
        >
            {/* Placeholder for Content - Will populate in IP-02 */}
            <div style={{ padding: '16px', color: 'var(--surface-fg-tertiary)' }}>
                [Sidebar Content]
            </div>
        </nav>
    );
}
```

## 4. Architecture Strategy (The "Addition" Model)
**Concept**: The `SideBar` is a **Global Component** that sits at the root of the application shell (`Layout.tsx`), acting as the "Extreme Left Nav". It does NOT replace the contextual "Tree View" (`NavigationPanel`).

**Core Requirement**:
*   **Column 1 (Global)**: `SideBar` (Icon Navigation, User Profile)
*   **Column 2 (Contextual)**: `NavigationPanel` (Tree View), handled by the page/view itself.

## 5. Layout Integration
**File**: `src/desktop-enhanced/Layout.tsx`
**Action**: Inject the `SideBar` as the first child of the `body` flex container.

```typescript
// Imports
import { SideBar } from '../desktop/components/SideBar/SideBar';

// ... inside Layout component return ...
<div className={styles.body}>
    {/* INJECT HERE: Global Extreme Left Nav */}
    <SideBar />
    
    {/* Existing "Left Panel" (Tree View) which is passed as a prop */}
    {leftPanel && (
        <div className={styles.leftPanelWrapper}>
            {leftPanel}
            ...
        </div>
    )}
    ...
</div>
```

**Note**: Do NOT modify `App.tsx` or `DesktopEnhancedApp.tsx` grid columns. The `SideBar` lives outside the "Page" grid.

## 6. Verification Checklist
1.  [ ] **Lint Check**: `npm run lint`.
2.  [ ] **Render**: Sidebar appears on the left as a grey column (`#F9F9F9` approx).
3.  [ ] **Grid Check**: Main content is pushed right, not obscured.
4.  [ ] **Detail Panel**: Open a row. Grid should successfully show 3 columns.
