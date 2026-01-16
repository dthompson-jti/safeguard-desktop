# Filter Evolution — Detailed Architecture

Refine filter dropdowns to use a split-button pattern when customized. Add "Save Filters as Default" with localStorage persistence.

---

## 1. Requirement Mapping

| Requirement | Component(s) Affected |
|-------------|----------------------|
| Split-button UI when filter ≠ default | `FilterSelect` (new), `DesktopToolbar` |
| Custom date range shows date label | `FilterSelect`, `DesktopToolbar` |
| "Save Filters as Default" menu action | `NavigationPanel`, `atoms.ts` |
| Persist defaults to localStorage | `atoms.ts` (`atomWithStorage`) |
| "Reset Filters" resets to saved defaults | `DesktopToolbar`, `atoms.ts` |
| Add "Today" time range option | `DesktopToolbar` |

---

## 2. Data Model

### 2.1 Factory Defaults (Immutable)

```typescript
// src/desktop/atoms.ts
export const FACTORY_FILTER_DEFAULTS: DesktopFilter = {
  facility: 'all',
  group: 'all',
  unit: 'all',
  search: '',
  showMissedOnly: false,
  statusFilter: 'all',
  historicalStatusFilter: 'missed-uncommented',
  dateStart: null,
  dateEnd: null,
};
```

### 2.2 Saved Defaults (Persisted)

```typescript
export const savedFilterDefaultsAtom = atomWithStorage<DesktopFilter>(
  `${STORAGE_PREFIX}filter_defaults`,
  FACTORY_FILTER_DEFAULTS
);
```

### 2.3 Time Range Type

```typescript
// src/desktop/types.ts
export type TimeRangePreset = 'today' | 'last-24h' | 'last-8h' | 'last-7d' | 'custom';
```

---

## 3. State Management

### 3.1 Atoms

| Atom | Type | Purpose |
|------|------|---------|
| `savedFilterDefaultsAtom` | `atomWithStorage<DesktopFilter>` | User's saved defaults (localStorage) |
| `desktopFilterAtom` | `atom<DesktopFilter>` | Current active filters (session) |
| `isFilterCustomizedAtom` | Derived `atom<boolean>` | `true` if current ≠ saved defaults |

### 3.2 Derived State

```typescript
export const isFilterCustomizedAtom = atom((get) => {
  const current = get(desktopFilterAtom);
  const saved = get(savedFilterDefaultsAtom);
  return !isEqual(current, saved); // Use lodash.isEqual or manual compare
});
```

### 3.3 Actions

```typescript
// Write-only atom to save current filters as new defaults
export const saveFiltersAsDefaultAtom = atom(null, (get, set) => {
  const current = get(desktopFilterAtom);
  set(savedFilterDefaultsAtom, current);
});

// Reset to saved defaults
export const resetFiltersAtom = atom(null, (get, set) => {
  const saved = get(savedFilterDefaultsAtom);
  set(desktopFilterAtom, { ...saved });
});
```

---

## 4. Component Hierarchy

```
DesktopEnhancedApp
├── NavigationPanel
│   └── Popover (... menu)
│       ├── Expand All
│       ├── Collapse All
│       └── [NEW] Save Filters as Default
├── DesktopToolbar
│   ├── SearchInput
│   ├── FilterSelect (Status)      ← [NEW]
│   ├── FilterSelect (Time Range)  ← [NEW] (Historical only)
│   └── FilterSelect (Facility)    ← [NEW] (non-enhanced only)
└── DataTable / TreeView
```

---

## 5. FilterSelect Component Spec

### Props

```typescript
interface FilterSelectProps {
  value: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  onClear: () => void;
  /** For custom date range, display this instead of option label */
  displayLabel?: string;
}
```

### Render Logic

```
if (value === defaultValue) {
  // Standard Select (gray)
} else {
  // Split-button: [Select | X]
  // Blue background, blue border, blue text
}
```

### CSS Tokens

| Property | Default State | Active State |
|----------|---------------|--------------|
| Background | `--control-bg-secondary` | `--control-bg-selected` |
| Border | `--control-border-secondary` | `--control-border-selected` |
| Text | `--control-fg-secondary` | `--control-fg-selected` |
| Radius (left) | `--radius-md` | `--radius-md` |
| Radius (right) | `--radius-md` | `0` (inside), `--radius-md` (outside) |

---

## 6. File Manifest

| Status | File | Changes |
|--------|------|---------|
| [MODIFY] | `src/desktop/types.ts` | Add `TimeRangePreset` type |
| [MODIFY] | `src/desktop/atoms.ts` | Add `FACTORY_FILTER_DEFAULTS`, `savedFilterDefaultsAtom`, `isFilterCustomizedAtom`, action atoms |
| [MODIFY] | `src/components/Select.tsx` | Add `triggerClassName` prop |
| [NEW] | `src/desktop/components/FilterSelect.tsx` | Split-button filter component |
| [NEW] | `src/desktop/components/FilterSelect.module.css` | Styles for active state |
| [MODIFY] | `src/desktop/components/DesktopToolbar.tsx` | Use `FilterSelect`, update time options, use derived atoms |
| [MODIFY] | `src/desktop-enhanced/components/NavigationPanel.tsx` | Add "Save Filters as Default" menu item |

---

## 7. Risk Analysis

### Attack Vector 1: Stale localStorage Data

**Risk:** User upgrades app, but old `savedFilterDefaultsAtom` has missing fields.

**Mitigation:** Merge saved defaults with `FACTORY_FILTER_DEFAULTS`:
```typescript
const raw = localStorage.getItem(key);
const saved = raw ? JSON.parse(raw) : {};
return { ...FACTORY_FILTER_DEFAULTS, ...saved };
```

### Attack Vector 2: Race Condition on Save

**Risk:** User clicks "Save" while filters are mid-update.

**Mitigation:** Jotai's synchronous `get()` ensures atomic read. No async gap.

### Attack Vector 3: Custom Date Range Edge Cases

**Risk:** User saves custom range as default, but dates become stale (e.g., "Jan 1–Jan 7" in February).

**Mitigation:** Document this as expected behavior. "Saved defaults are static snapshots." Consider future enhancement: relative date support.

### Attack Vector 4: Filter Select Focus Trap

**Risk:** Split-button with two focusable elements may confuse keyboard users.

**Mitigation:** Ensure clear focus ring on both parts. X button has `aria-label="Clear filter"`.

---

## 8. Phased Implementation

### Phase 1: State Layer (atoms.ts, types.ts)
1. Add `FACTORY_FILTER_DEFAULTS` constant.
2. Add `savedFilterDefaultsAtom` with merge logic.
3. Add `isFilterCustomizedAtom` derived atom.
4. Add `saveFiltersAsDefaultAtom` and `resetFiltersAtom` actions.
5. Add `TimeRangePreset` type.
6. **Verify:** `npm run lint && npm run build`

### Phase 2: Select Enhancement
1. Add `triggerClassName` prop to `Select.tsx`.
2. **Verify:** No breaking changes to existing `Select` usage.

### Phase 3: FilterSelect Component
1. Create `FilterSelect.tsx` with conditional rendering.
2. Create `FilterSelect.module.css` with active-state tokens.
3. **Verify:** Storybook or manual test with hardcoded props.

### Phase 4: DesktopToolbar Integration
1. Add "Today" and "Last 24 Hours" to `TIME_RANGE_OPTIONS`.
2. Replace `Select` with `FilterSelect` for each filter.
3. Compute `displayLabel` for custom date range.
4. Wire `isFilterCustomizedAtom` to "Reset Filters" visibility.
5. Wire `resetFiltersAtom` to "Reset Filters" button.
6. **Verify:** Full manual test of all filter states.

### Phase 5: NavigationPanel Menu
1. Add "Save Filters as Default" menu item.
2. Wire to `saveFiltersAsDefaultAtom`.
3. Optionally show confirmation toast.
4. **Verify:** Save, refresh page, confirm persistence.

### Phase 6: Aesthetic & Behavioral Refinements
1. **FilterSelect Borders**: Update `FilterSelect.module.css` to use 2px borders and fix split-button inner borders.
2. **Modal Regression**: Add missing modal styles to `DesktopToolbar.module.css`.
3. **Time Preset Logic**: Refactor `DesktopToolbar.tsx` to handle time preset defaults correctly (gray state for saved presets).
4. **Clean up**: Remove duplicate `Modal` import and unused variables.

---

## 9. Verification Checklist

- [ ] Split-button uses 2px blue border
- [ ] No white gap between split-button parts; inner borders are blue
- [ ] Custom Date Range modal has correct layout, titles, and spacing
- [ ] Saving "Last 7 Days" as default makes it appear gray (not blue)
- [ ] "Today" is used as fallback when resetting if no specific default is found
- [ ] `npm run lint` and `npm run build` pass
