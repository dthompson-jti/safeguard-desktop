# Historical Review View Specification

> [!NOTE]
> The Historical Review View displays past safety checks for audit and compliance review.

---

## Purpose

Allows supervisors to:
- Review **missed checks** requiring explanation
- Add **supervisor notes** to justify missed checks
- Export historical data for compliance reporting
- Filter by date range and combined status

---

## UI Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Facility ABCD > [Group] > [Unit]                   │
├─────────────────────────────────────────────────────────────────┤
│ DesktopToolbar: [Search] [tune] [Filter Dropdowns]            │
├─────────────────────────────────────────────────────────────────┤
│ DataTable                                                       │
│ ┌─────┬──────────────────┬──────────┬─────────┬─────────┬──────┐│
│ │ ☐   │ Resident         │ Scheduled│ Actual  │ Status  │ Opts ││
│ ├─────┼──────────────────┼──────────┼─────────┼─────────┼──────┤│
│ │ ☐   │ C. Mendez        │ 8:30 AM  │ —       │ 🔴 MSC  │ ⋮    ││
│ │ ☐   │ L. Park          │ 7:15 AM  │ 7:14 AM │ ✓ CMP   │ ⋮    ││
│ │ ☐   │ A. Lopez [SR]    │ 8:45 AM  │ —       │ ⚫ MSC  │ ⋮    ││
│ └─────┴──────────────────┴──────────┴─────────┴─────────┴──────┘│
├─────────────────────────────────────────────────────────────────┤
│ Footer: Showing 69 of 5,760 results                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Source

**Primary**: [enhancedMockData.historicalData](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)

| Field | Source |
|-------|--------|
| `historicalData` | `generateEnhancedData()` — 24 hours × 60 rooms ÷ 15 min intervals |
| `TOTAL_HISTORICAL_RECORDS` | ~5,760 checks (varies by timing) |

---

## Table Columns

| Column | Field | Sortable | Notes |
|--------|-------|----------|-------|
| Checkbox | — | No | Row selection for bulk actions |
| Resident | `residents[0].name` | Yes | Primary resident + SR badge if `hasHighRisk` |
| Group | `group` | Yes | Alpha, Beta, Gamma, Delta |
| Unit | `unit` | Yes | A1-D3 |
| Room | `location` | Yes | Room identifier |
| Scheduled | `scheduledTime` | Yes | ISO timestamp formatted (default: desc) |
| Actual | `actualTime` | Yes | Time of completion or `—` if missed |
| Status | `status` + `supervisorNote` | Yes | Display status badge (see below) |
| Actions | — | No | Context menu trigger |

---

## Status Badge Logic

| Data State | Display | Color |
|------------|---------|-------|
| `status='missed'` AND no `supervisorNote` | Missed – No Comment | 🔴 Red |
| `status='missed'` AND has `supervisorNote` | Missed – Commented | ⚫ Grey |
| `status='completed'` | Completed | 🟢 Green |

---

## Filtering

Filters are managed via [desktopFilterAtom](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts):

| Filter | Options | Default (Historical) |
|--------|---------|----------------------|
| `historicalStatusFilter` | `all`, `missed-uncommented`, `missed-commented`, `completed` | `missed-uncommented` |
| `dateStart` | ISO date | Last 24 hours |
| `dateEnd` | ISO date | Today |
| `group` | `all`, Alpha-Delta | `all` |
| `unit` | `all`, A1-D3 | `all` |
| `search` | Free text | `""` |

> [!IMPORTANT]
> The separate `statusFilter` and `commentFilter` have been **merged** into a single `historicalStatusFilter` for streamlined UX.

---

## Auto-Comment Logic

From [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts):

| Check Age | Supervisor Note |
|-----------|-----------------|
| > 8 hours old | Auto-generated: "Reviewed and documented." |
| ≤ 8 hours old | None (requires manual review) |

---

## Badge Counts

| Badge | Calculation | Location |
|-------|-------------|----------|
| 👤⚠ Need Comment | `historicalData.filter(c => c.status === 'missed' && !c.supervisorNote).length` | Header tab, Global Widget |

---

## Default Sorting

Table is sorted by `scheduled` column **descending** (most recent first) by default.

---

## High-Risk Residents (SR Badge)

| Field | Value |
|-------|-------|
| `hasHighRisk` | `true` if room index % 7 === 0 |

SR badge displayed in Resident column for high-risk residents, consistent with Live view.

---

## Supervisor Note Workflow

1. Select rows with pending review
2. Click "Add Note" action
3. Modal opens with reason dropdown:
   - Unit Lockdown
   - Medical Emergency
   - Court Appearance
   - Transport
   - Staff Shortage
   - Other
4. Add optional custom text
5. `reviewStatus` changes to `verified`
6. Status badge changes from "Missed – No Comment" to "Missed – Commented"

---

## Component Files

| Component | Path |
|-----------|------|
| Enhanced View | [EnhancedHistoricalReviewView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedHistoricalReviewView.tsx) |
| Data Loader | [loadEnhancedHistoricalPage](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts) |
| Types | [HistoricalCheck](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/types.ts) |

---

## Mock Data Distribution

| Room Type | Completion Rate |
|-----------|-----------------|
| "Perfect" (Delta group or 30% random) | 98% completed |
| Standard | 85% completed |

Officer notes added every 4th check. Auto-comments on missed checks older than 8 hours.
