# Visual Specification: Left Navigation (Figma Verified)

## 1. Global Layout & Proportions
Verified against Node `1179:34953`. The Sidebar is a fixed column addition.

```text
┌─────────────────────────────────────────────────────────┐
│ [TopNav]                                                │
├─────────┬──────────────┬────────────────────────────────┤
│ SideBar │ Tree View    │ Workspace / Main Content       │
│ 236px   │ 280px        │ flex: 1                        │
└─────────┴──────────────┴────────────────────────────────┘
```

---

## 2. Token Rosetta Stone (Figma -> Code)
Based on direct extraction from `21:31167` and `8:1263`.

| Context | Figma Hex / Token | Codebase Semantic Candidate | Dark Mode Check |
| :--- | :--- | :--- | :--- |
| **Sidebar BG** | `#F9F9F9` (bg-base) | `--surface-bg-secondary` | OK |
| **Section Header** | `#436289` (faint-text) | `--control-fg-faint` | High contrast vs BG |
| **Nav Item Text** | `#223a58` (secondary-text) | `--surface-fg-secondary` | Legacy Blue-Grey tint |
| **Active Item BG** | `#223A58` (Active-Dark) | `--surface-bg-active-dark` | Inversion state |
| **Dividers** | `#D9DFE5` (border-faint) | `--surface-border-tertiary` | Subtle separation |
| **Search Holder** | `#606F80` (placeholder) | `--control-fg-placeholder` | Standard mapped |

---

## 3. High-Fidelity Component Audit

### A. The Search & Collapse Row
*   **Search Input**: 32px height, white background.
*   **Placeholder**: "Search Navigation...", Inter Regular 14px.
*   **Collapse Button**: Sits to the right of search, 32x32px, Icon: `last_page`.

### B. Accordion Groups (Quick Access / Workspace)
*   **Padding Top**: 8px (`var(--spacing-m)`).
*   **Header**: Bold/Semibold, Chevron Right (unselected) or Down (selected).
*   **Background**: Blue-tinted shadow (`sunken-100`) when active? No, verified as white elevated surface in `21:31168`.

### C. The "Inversion" Active State
*   **Target**: "Search Case" (Active).
*   **Background**: Deep Blue-Grey (`#223A58`).
*   **Foreground**: White (`#FFFFFF`).
*   **Action**: 3-dot menu (`more_horiz`) aligned to the right.

---

## 4. Hierarchy Structure (Example Feed)
Only **Safeguard** is functional.

1.  **Search Row**
2.  **Accordion: Quick Access** (V)
    *   Action Items
    *   22STCP00011
    *   22STCP00013
    *   **Search Case** (Active/Dark)
    *   Open Till
    *   Close Till
3.  **Accordion: Workspace** (V)
    *   Action Items
    *   Barcode Scanning
    *   Scan / Print Test
    *   **Safeguard** (Functional)
4.  **Foldable: Recent Cases** (>)
5.  **Foldable: Calendar** (>)
6.  **Foldable: Notes Library** (>)
