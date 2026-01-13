# Historical Review View Specification

> [!NOTE]
> The Historical Review View displays past safety checks for audit and compliance review.

---

## Purpose

Allows supervisors to:
- Review **missed checks** requiring explanation
- Add **supervisor notes** to justify missed checks
- Export historical data for compliance reporting
- Filter by date range, status, and comment presence

---

## UI Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Facility ABCD > [Group] > [Unit]                   │
├─────────────────────────────────────────────────────────────────┤
│ DesktopToolbar: [Search] [Status▾] [Comments▾] [Date Range]     │
│                 [Export] [More▾]                                │
├─────────────────────────────────────────────────────────────────┤
│ DataTable                                                       │
│ ┌─────┬────────────┬──────────┬─────────┬────────────┬────────┐ │
│ │ ☐   │ Status     │ Scheduled│ Room    │ Resident   │ Actions│ │
│ ├─────┼────────────┼──────────┼─────────┼────────────┼────────┤ │
│ │ ☐   │ 🔴 Missed  │ 8:30 AM  │ C-302   │ C. Mendez  │ ⋮      │ │
│ │ ☐   │ ✓ Completed│ 7:15 AM  │ B-201   │ L. Park    │ ⋮      │ │
│ │ ☐   │ 🔴 Missed  │ 8:45 AM  │ C-303   │ A. Lopez   │ ⋮      │ │
│ └─────┴────────────┴──────────┴─────────┴────────────┴────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Footer: Showing 57 of 5,760 records                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Source

**Primary**: [enhancedMockData.historicalData](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts#L206-L209)

| Field | Source |
|-------|--------|
| `historicalData` | `generateEnhancedData()` — 24 hours × 60 rooms ÷ 15 min intervals |
| `TOTAL_HISTORICAL_RECORDS` | ~5,760 checks (varies by timing) |

---

## Table Columns

| Column | Field | Sortable | Notes |
|--------|-------|----------|-------|
| Checkbox | — | No | Row selection for bulk actions |
| Status | `status` | Yes | `completed` or `missed` |
| Scheduled | `scheduledTime` | Yes | ISO timestamp formatted for display |
| Actual | `actualTime` | Yes | Time of completion or `—` if missed |
| Variance | `varianceMinutes` | Yes | Minutes early/late |
| Room | `location` | Yes | Room identifier |
| Resident | `residents[0].name` | Yes | Primary resident |
| Officer | `officerName` | Yes | Assigned officer |
| Notes | `officerNote` | No | Officer's comment |
| Review | `reviewStatus` | Yes | `pending` or `verified` |
| Actions | — | No | Context menu |

---

## Filtering

| Filter | Options | Default (Historical) |
|--------|---------|----------------------|
| `statusFilter` | `all`, `missed`, `completed` | `missed` |
| `commentFilter` | `any`, `comment`, `no-comment` | `no-comment` |
| `dateStart` | ISO date | Last 24 hours |
| `dateEnd` | ISO date | Today |
| `group` | `all`, Alpha-Delta | `all` |
| `unit` | `all`, A1-D3 | `all` |
| `search` | Free text | `""` |

### Default Filter Preset

When switching to Historical view, filters auto-apply from [DesktopEnhancedApp.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/DesktopEnhancedApp.tsx#L41-L48):

```typescript
statusFilter: 'missed',
commentFilter: 'no-comment',
dateStart: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
dateEnd: new Date().toISOString().split('T')[0],
```

---

## Badge Counts

| Badge | Calculation | Location |
|-------|-------------|----------|
| 👤⚠ Need Comment | `historicalData.filter(c => c.status === 'missed' && !c.supervisorNote).length` | Header tab, Global Widget |

---

## Tree Navigation Integration

Tree counts are filtered to match table filters:

From [useTreeData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/hooks/useTreeData.ts#L63-L87):

- Date range filtering applied
- Status filtering applied
- Comment filtering applied
- Only `missed` checks counted toward `missed` in tree

---

## Supervisor Note Workflow

1. Select rows with pending review
2. Click "Add Note" action
3. Modal opens ([supervisorNoteModalAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts#L79-L86))
4. Choose reason from predefined list:
   - Unit Lockdown
   - Medical Emergency
   - Court Appearance
   - Transport
   - Staff Shortage
   - Other
5. Add optional custom text
6. `reviewStatus` changes to `verified`

---

## Component Files

| Component | Path |
|-----------|------|
| Enhanced View | [EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx) |
| Data Loader | [loadEnhancedHistoricalPage](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts#L241-L282) |
| Filtered Atom | [filteredHistoricalChecksAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts#L38-L77) |

---

## Mock Data Distribution

From [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts#L171-L173):

| Room Type | Completion Rate |
|-----------|-----------------|
| "Perfect" (Delta group or 30% random) | 98% completed |
| Standard | 85% completed |

Officer notes added every 4th check. Supervisor notes added on 10% of missed checks.
