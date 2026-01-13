# Live Monitor View Specification

> [!NOTE]
> The Live Monitor View displays real-time status of all scheduled safety checks that are currently active or upcoming.

---

## Purpose

Allows supervisors to monitor:
- **Overdue checks** requiring immediate attention (red alert)
- **Due checks** in the grace window (amber warning)
- **Upcoming checks** scheduled for the near future (neutral)

---

## UI Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Facility ABCD > [Group] > [Unit]                   │
├─────────────────────────────────────────────────────────────────┤
│ DesktopToolbar: [Search] [Status▾] [Export] [More▾]             │
├─────────────────────────────────────────────────────────────────┤
│ DataTable                                                       │
│ ┌─────┬────────────┬─────────┬─────────┬────────────┬─────────┐ │
│ │ ☐   │ Status     │ Timer   │ Room    │ Resident   │ Actions │ │
│ ├─────┼────────────┼─────────┼─────────┼────────────┼─────────┤ │
│ │ ☐   │ 🔴 Overdue │Overdue 5│ A1-101  │ J. Wilson  │ ⋮       │ │
│ │ ☐   │ 🟡 Due     │Due in 2m│ B2-205  │ M. Garcia  │ ⋮       │ │
│ │ ☐   │ ⚪ Upcoming│Due in 30│ C3-301  │ R. Taylor  │ ⋮       │ │
│ └─────┴────────────┴─────────┴─────────┴────────────┴─────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Footer: Showing 60 of 60 records                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Source

**Primary**: [enhancedMockData.liveData](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts#L206-L208)

| Field | Source |
|-------|--------|
| `liveData` | `generateEnhancedData()` cached on module load |
| `TOTAL_LIVE_RECORDS` | `cachedData.liveData.length` (60 rooms) |

---

## Table Columns

| Column | Field | Sortable | Notes |
|--------|-------|----------|-------|
| Checkbox | — | No | Row selection for bulk actions |
| Status | `status` | Yes | Visual badge: overdue/due/upcoming |
| Timer | `timerText` | Yes | Relative time display |
| Room | `location` | Yes | Room identifier (e.g., A1-101) |
| Resident | `residents[0].name` | Yes | Primary resident name |
| Last Check | `lastCheckTime` | Yes | Time of previous check |
| Officer | `lastCheckOfficer` | Yes | Officer who performed last check |
| Actions | — | No | Context menu trigger |

---

## Filtering

Filters are managed via [desktopFilterAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts#L17-L27):

| Filter | Options | Default |
|--------|---------|---------|
| `group` | `all`, `Alpha`, `Beta`, `Gamma`, `Delta` | `all` |
| `unit` | `all`, `A1`-`D3` | `all` |
| `statusFilter` | `all`, `overdue`, `due`, `upcoming` | `all` |
| `search` | Free text | `""` |

---

## Badge Counts

Displayed in header tabs and Global Status Widget:

| Badge | Calculation |
|-------|-------------|
| 🔔 Overdue | `liveData.filter(c => c.status === 'overdue').length` |
| ⏰ Due | `liveData.filter(c => c.status === 'due').length` |

---

## Tree Navigation Integration

Selection in the NavigationPanel TreeView filters the table:

| Selection Type | Filter Result |
|----------------|---------------|
| Facility Root | `group: 'all', unit: 'all'` |
| Group (e.g., Alpha) | `group: 'Alpha', unit: 'all'` |
| Unit (e.g., A1) | `group: 'all', unit: 'A1'` |

---

## Component Files

| Component | Path |
|-----------|------|
| Enhanced View | [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx) |
| Data Loader | [loadEnhancedLivePage](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts#L212-L239) |
| Tree Hook | [useTreeData](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/hooks/useTreeData.ts#L27-L129) |

---

## Auto-Refresh

Controlled by [autoRefreshAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts#L130-L141):

| Setting | Default |
|---------|---------|
| `isPaused` | `false` |
| `intervalSeconds` | `30` |
