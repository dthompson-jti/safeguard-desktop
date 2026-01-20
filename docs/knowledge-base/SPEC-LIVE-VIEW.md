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
│ ┌─────┬────────────┬──────────┬─────────┬────────────┐          ││
│ │ ☐   │ Resident   │ Scheduled│ Room    │ Status     │          ││
│ ├─────┼────────────┼──────────┼─────────┼────────────┤          ││
│ │ ☐   │ J. Wilson  │ 6:20 PM  │ A1-101  │ 🔴 Overdue │          ││
│ │ ☐   │ M. Garcia  │ 6:42 PM  │ B2-205  │ 🟡 Due     │          ││
│ │ ☐   │ R. Taylor  │ 7:15 PM  │ C3-301  │ ⚪ Upcoming│          ││
│ └─────┴────────────┴──────────┴─────────┴────────────┘          ││
├─────────────────────────────────────────────────────────────────┤
│ Footer: Showing 60 of 60 records                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Source

**Primary**: [enhancedMockData.liveData](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)

| Field | Source |
|-------|--------|
| `liveData` | `generateEnhancedData()` cached on module load |
| `TOTAL_LIVE_RECORDS` | `cachedData.liveData.length` (60 rooms) |

---

## Table Columns

| Column | Field | Sortable | Notes |
|--------|-------|----------|-------|
| Checkbox | — | No | Row selection for bulk actions |
| Resident | `residents[0].name` | Yes | Primary resident + SR badge if `hasHighRisk` |
| Group | `group` | Yes | Alpha, Beta, Gamma, Delta |
| Unit | `unit` | Yes | A1-D3 |
| Room | `location` | Yes | Room identifier (e.g., A1-101) |
| Scheduled | `originalCheck.dueDate` | Yes | Actual scheduled time per room |
| Status | `status` | Yes | Visual badge: overdue/due/upcoming |

---

## Scheduled Time Distribution

Each room has a **unique** scheduled time based on room index:

| Room Index | Scheduled Offset | Status |
|------------|------------------|--------|
| 0-9 | -20 to -29 mins (past) | Overdue |
| 10-19 | -5 to +4 mins (around now) | Due |
| 20-59 | +5 to +44 mins (future) | Upcoming |

---

## Default Sorting

Table is sorted by `status` column **descending** by default using custom priority:
- Overdue (highest) → Due → Upcoming (lowest)

---

## High-Risk Residents (SR Badge)

| Field | Value |
|-------|-------|
| `hasHighRisk` | `true` if room index % 7 === 0 |

SR badge displayed in Resident column for ~9 residents across the facility.

---

## Filtering

Filters are managed via [desktopFilterAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts):

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
| Data Loader | [loadEnhancedLivePage](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts) |
| Tree Hook | [useTreeData](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/hooks/useTreeData.ts) |

---

## Auto-Refresh

Controlled by [autoRefreshAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts):

| Setting | Default |
|---------|---------|
| `isPaused` | `false` |
| `intervalSeconds` | `30` |
