## 1. Global Dimensions & Layout
| Property | Value (Px/Ref) | Source Node | Notes |
| :--- | :--- | :--- | :--- |
| Sidebar Width (Collapsed) | `[PENDING]` | | Matches `Side Bar -- Filter Interaction` |
| Sidebar Width (Expanded) | `236px` | `1179:34953` | verified instance width |
| Background Color | `#EAEAEA` | `6756:48612` | Matches `primitives-grey-70`/`80` legacy. |
| Border Right | `[PENDING]` | | |
| Padding (General) | `[PENDING]` | | |

## 2. Component: Standard Nav Item
**Node ID**: `377:9972` (and variants `382:11325`)
**Description**: The primary link style (e.g. "Dashboard", "Calendar").

### State Matrix
| State | Height | Bg Color | Text Color | Icon Color | Border | Opacity |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Default** | `32px` | `transparent` | `secondary-text` (#223a58) | `secondary-text` | None | 100% |
| **Hover** | `32px` | `bg-base-hover` | `secondary-text` | `secondary-text` | None | 100% |
| **Active** | `32px` | `bg-sunken` | `secondary-text` | `secondary-text` | `blue-500` (Left) | 100% |

### Typography & Spacing
*   **Font**: `Segoe UI` (Legacy) -> Map to `Inter`.
*   **Style**: `Semibold` (600).
*   **Size**: `14px`.
*   **Line Height**: `16px`.
*   **Icon Size**: `20px` (Matches System `--icon-size-md`).
*   **Gap (Icon-Text)**: `4px` (Derived from `pl-4px` on text container).
*   **Legacy Token**: `semantic/control/secondary-text`.

---

## 3. Component: Quick Access Item
**Node ID**: `76:17108` (Link Menu Item)
**Description**: The "Pinned" items. Matches Standard Item specs but grouped differently.
**Specs**: Verified match to Standard Nav Item (Icon + Text structure).
*   **Selected State (`21:70403`)**: Uses `bg-sunken` + `blue-500` border left.

---

## 4. Component: Search Input
**Node ID**: `8:1263` (Active)

*   **Height**: `32px` (Standard Control Height).
*   **Bg Default**: `bg-elevated` (White).
*   **Placeholder Color**: `#606f80` (`control/placeholder-text`) -> Map to `grey-500`.
*   **Typography**: `Segoe UI Semilight` 14px -> Map to `Inter Regular 14px`.
*   **Icon Size**: `24px` (Matches System `--icon-size-lg`).
*   **Focus Cursor (`200:2011`)**: Placeholder changes to "Search Navigation...".
*   **Text Input (`282:7379`)**: Typed text uses `#1c2f46` (`text-base`).
*   **Focus State (`282:7356`)**: Shows "Focus Blink" (Cursor) and Dropdown.

---

## 5. Typography Standards
| Usage | Font Family | Weight | Size | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Header | Segoe UI | Semibold | 16px | 20px | Normal |
| Nav Item Label | Segoe UI | Semibold | 14px | 16px | Normal |
| Search Placeholder | Segoe UI | Semilight | 14px | 16px | Normal |
