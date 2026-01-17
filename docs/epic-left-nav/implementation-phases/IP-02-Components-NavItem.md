# Implementation Plan 02: Core Components (NavItems)
**Objective**: Build the reusable navigation components (`NavItem`, `NavGroup`).
**Role**: Junior Developer / Component Architect
**Prerequisites**: IP-01 Completed.

---

## 1. NavItem CSS (Strict Token Adherence)
**File**: `src/desktop/components/SideBar/NavItem.module.css` (Create New)
**Specs**: Based on `05-DATA-token-map.md`.

```css
/* Base Link Container */
.link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px; /* Fixed Height 32px */
    padding: 0 8px 0 16px; /* 16px Left, 8px Right */
    gap: var(--spacing-1); /* 4px Gap */
    
    text-decoration: none;
    border-radius: var(--radius-sm); /* 6px */
    background-color: transparent;
    color: var(--surface-fg-secondary); /* Grey-700 (Migrated from Blue-Grey) */
    
    /* Typography: Inter Semibold 14px */
    font-family: 'Inter', sans-serif;
    font-size: var(--font-size-sm); /* 14px */
    font-weight: var(--font-weight-semibold); /* 600 */
    line-height: 16px; /* Explicit Leading */
    
    transition: background-color 0.1s ease, color 0.1s ease;
    cursor: pointer;
    position: relative;
}

/* Hover State */
.link:hover {
    background-color: var(--surface-bg-secondary_hover); /* Grey-50 */
    color: var(--surface-fg-secondary_hover);
}

/* Active State (Selected) */
.link[data-active="true"] {
    background-color: var(--surface-bg-active); /* Grey-50/Sunken */
    
    /* Visual Trick: Border Left in Figma is modeled here */
}

/* Active Border Indicator (Pseudo-element) */
.link[data-active="true"]::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4px; /* Offset */
    bottom: 4px;
    width: 3px;
    background-color: var(--surface-border-theme); /* Blue-500 */
    border-radius: 0 4px 4px 0;
}

/* Icon */
.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px; /* Verified 20px */
    height: 20px;
    color: inherit; /* Inherits from link parent */
}

/* Standardize Icon SVGs */
.icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
}
```

## 2. NavItem Component
**File**: `src/desktop/components/SideBar/NavItem.tsx` (Create New)

```typescript
import React from 'react';
import classNames from 'classnames'; // Ensure installed or use template literal
import styles from './NavItem.module.css';

interface NavItemProps {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    isActive?: boolean;
    onClick?: () => void;
}

export function NavItem({ label, icon: Icon, isActive, onClick }: NavItemProps) {
    return (
        <a 
            className={styles.link}
            data-active={isActive}
            onClick={onClick}
            // Accessibility
            aria-current={isActive ? 'page' : undefined}
            role="link"
            tabIndex={0}
        >
            <span className={styles.icon}>
                <Icon />
            </span>
            <span className={styles.label}>{label}</span>
        </a>
    );
}
```

## 3. NavGroup Component (Headers)
**File**: `src/desktop/components/SideBar/NavGroup.tsx` (Create New)
**Specs**: Section Headers use `Inter Semibold 16px`.

```typescript
import React from 'react';
import styles from './NavGroup.module.css';

interface NavGroupProps {
    title: string;
    children: React.ReactNode;
}

export function NavGroup({ title, children }: NavGroupProps) {
    return (
        <div className={styles.group}>
            <h3 className={styles.header}>
                {title}
            </h3>
            <div className={styles.list}>
                {children}
            </div>
        </div>
    );
}
```

**File**: `src/desktop/components/SideBar/NavGroup.module.css` (Create New)

```css
.group {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
}

.header {
    padding: 0 16px;
    margin-bottom: 8px;
    
    /* Typography: Inter Semibold 16px */
    font-family: 'Inter', sans-serif;
    font-size: var(--font-size-md); /* 16px */
    font-weight: var(--font-weight-semibold); /* 600 */
    color: var(--surface-fg-primary); /* Grey-900 */
    line-height: 20px;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 2px; /* Minor vertical spacing between items */
}
```

## 4. Helper: Icons Index
Ensure you have the required icons. Create `src/desktop/components/SideBar/icons.ts` to export standard SVG components if not already present in project.

## 5. Verification Checklist
1.  [ ] **CSS Check**: `NavItem` height is exactly 32px.
2.  [ ] **Hover**: Background changes to `grey-50` (or approx) on hover.
3.  [ ] **Active**: Blue bar appears on the left when `isActive` prop is true.
4.  [ ] **Typography**: Headers are `16px`, Items are `14px`.
