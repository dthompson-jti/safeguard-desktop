# Architecture: Unified Filter UI (Option A)

This specification details the transition from a dual-bar filter model to a consolidated toolbar model with symmetric styling and integrated feedback.

## 1. Requirement Mapping

| PRD Requirement | Implementation Strategy |
|:---:|---|
| **Eliminate UI Overlap** | Remove `FilterBar` component; move active filter chips into `DesktopToolbar`. |
| **Symmetric Styling** | Create `FilterChip` (36px) matching `FilterSelect` (36px) "Selected" theme. |
| **Clear Feedback** | Display results count in `DataTable` footer to maximize table real estate. |
| **Unify Search Panel** | Keep Search Panel open after search; chips provide instant feedback in toolbar. |

## 2. Component Hierarchy & Manifest

```mermaid
graph TD
    DT[DesktopToolbar] --> AS[AdvancedSearch]
    DT --> FS[FilterSelect (Quick)]
    View[EnhancedHistoricalReviewView] --> DT
    View --> Table[DataTable]
    Table --> Footer[TableFooter]
```

### [NEW] `FilterChip.tsx`
- **Purpose**: Generic interactive chip for an active filter.
- **Props**: `label`, `value`, `onRemove`.
- **Styling**: `FilterChip.module.css`. Uses `--control-bg-selected`, `--control-border-selected`, identical to `FilterSelect.module.css`.

### [NEW] `ActiveFiltersGrid.tsx`
- **Purpose**: Manager for the collection of active filter chips.
- **Logic**: Filters `desktopFilterAtom` keys to exclude quick filters (`facility`, `statusFilter`, `historicalStatusFilter`, `timeRangePreset`).

## 3. Data Flow & State Management

- **Atoms**: `desktopFilterAtom`, `modifiedFiltersAtom` (already exist).
- **Resolver**: `ActiveFiltersGrid` computes the visible chip set:
    ```typescript
    const CHIP_KEYS = [
        'search', 'officer', 'group', 'unit', 
        'enhancedObservation', 'commentFilter', 'commentReason'
    ];
    ```
- **Action**: `FilterChip.onRemove` calls `clearFilterForKeyAtom`.

## 4. Visual Specification (Symmetry)

| Element | Height | Font | Border/Background |
|:---:|:---:|:---:|---|
| `FilterSelect` | 36px | 14px | `--control-*-selected` |
| `FilterChip` | 36px | 14px | `--control-*-selected` |
| **Result** | Harmonious inline appearance | Combined 44px (with 4px margin) | Unified visual language |

## 5. Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
|:---:|:---:|---|
| **Crowding** | Multiple active filters push toolbar height. | Wrap chips into a flexible container; use `gap` and horizontal wrap. |
| **Redundancy** | FilterBar logic already existed. | Delete `FilterBar.tsx` and `FilterBar.module.css` to prevent codebase bloat. |
| **Empty State** | Results count hidden if footer isn't visible. | The `DataTable` footer is `position: sticky; bottom: 0`, ensuring constant visibility. |

## 6. Phased Implementation

### Phase 1: Foundation
- Create `FilterChip` and `FilterChip.module.css`.

### Phase 2: Toolbar Unification
- Implement `ActiveFiltersGrid` inside `DesktopToolbar`.
- Wire up logical filters for chip visibility.

### Phase 3: Footer Enhancement
- Update `DataTable.tsx` to handle "Showing X of Y" results count prominently.

### Phase 4: Cleanup
- Remove `FilterBar` component and all imports in View files.
