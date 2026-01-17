# Implementation Plan 03: Search Feature & Assembly
**Objective**: Implement the specialized Search Input and assemble the full SideBar.
**Role**: Junior Developer / UI Specialist
**Prerequisites**: IP-02 Completed.

---

## 1. Sidebar Search CSS
**File**: `src/desktop/components/SideBar/SidebarSearch.module.css` (Create New)
**Specs**: Based on `04-DATA` Audit.

```css
.container {
    padding: 16px 16px 8px 16px; /* Top padding for breathing room */
}

.inputWrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px; /* Standard Control Height */
    
    background-color: var(--control-bg-primary); /* White/Grey-800 */
    border: 1px solid var(--surface-border-secondary); /* Grey-200 */
    border-radius: var(--radius-sm); /* 6px */
    
    transition: all 0.1s ease;
}

/* Focus State */
.inputWrapper:focus-within {
    border-color: var(--control-focus-ring-standard); /* Blue-500 */
    box-shadow: 0 0 0 1px var(--control-focus-ring-standard); /* Double Ring simulation */
}

.icon {
    position: absolute;
    left: 8px;
    width: 24px; /* Verified 24px */
    height: 24px;
    color: var(--control-fg-quaternary); /* Grey-500 */
    pointer-events: none;
}

.input {
    width: 100%;
    height: 100%;
    padding-left: 36px; /* 8px + 24px + 4px */
    padding-right: 8px;
    
    background: transparent;
    border: none;
    outline: none;
    
    /* Typography: Inter Regular 14px */
    font-family: 'Inter', sans-serif;
    font-size: var(--font-size-sm);
    color: var(--control-fg-primary); /* Grey-900 */
    line-height: 16px;
}

.input::placeholder {
    color: var(--control-fg-placeholder); /* Grey-500 */
    font-weight: var(--font-weight-regular);
}

/* Interaction: Change placeholder on focus? */
.input:focus::placeholder {
    color: var(--control-fg-placeholder_subtle); /* Lighter grey */
}
```

## 2. Sidebar Search Component
**File**: `src/desktop/components/SideBar/SidebarSearch.tsx` (Create New)

```typescript
import { useAtom } from 'jotai';
import { sidebarSearchQueryAtom } from '../../atoms';
import styles from './SidebarSearch.module.css';

// You will need a SearchIcon SVG component here
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
    </svg>
);

export function SidebarSearch() {
    const [query, setQuery] = useAtom(sidebarSearchQueryAtom);

    return (
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <div className={styles.icon}>
                    <SearchIcon />
                </div>
                <input 
                    type="text"
                    className={styles.input}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Navigation..."
                    aria-label="Search navigation items"
                />
            </div>
        </div>
    );
}
```

## 3. Final Assembly
**File**: `src/desktop/components/SideBar/SideBar.tsx` (Update)
**Action**: Replace the placeholder with the real component tree.

```typescript
import { useAtomValue } from 'jotai';
import { sidebarExpandedAtom } from '../../atoms';
import { SidebarSearch } from './SidebarSearch';
import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import styles from './SideBar.module.css';

// Mock Data for Verification (Replace with real data later)
const MOCK_ITEMS = [
    { label: 'Dashboard', icon: 'DashboardIcon' },
    { label: 'Workspaces', icon: 'WorkspaceIcon' },
];

export function SideBar() {
    const isExpanded = useAtomValue(sidebarExpandedAtom);

    return (
        <nav 
            className={styles.container} 
            data-collapsed={!isExpanded}
            aria-label="Main Navigation"
        >
            <SidebarSearch />
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <NavGroup title="Main">
                    {/* Map items here */}
                    <NavItem label="Dashboard" icon={() => <div />} isActive />
                    <NavItem label="Calendar" icon={() => <div />} />
                </NavGroup>
                
                <NavGroup title="Workspaces">
                    <NavItem label="Case Searches" icon={() => <div />} />
                </NavGroup>
            </div>
        </nav>
    );
}
```

## 4. Verification Checklist (Final)
1.  [ ] **Search**: Input renders with correct border (Grey-200) and Focus Ring (Blue-500).
2.  [ ] **Assembly**: Full Sidebar renders with Search at top, then Groups.
3.  [ ] **Layout**: Ensure Sidebar height is 100% and internal scroll works if content overflows.
