# Data Files Reference

> [!NOTE]
> This document catalogs all mock data and related data files used to drive the Desktop Supervisor Dashboard views.

---

## Primary Mock Data (Desktop Enhanced)

### [mockData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/data/mockData.ts)

**Purpose**: Unified data generator for both Live and Historical views

| Export | Type | Description |
|--------|------|-------------|
| `generateEnhancedData()` | Function | Generates fresh `liveData` and `historicalData` |
| `enhancedMockData` | Object | Cached data: `{ liveData, historicalData }` |
| `TOTAL_LIVE_RECORDS` | Number | Count of live records (60) |
| `TOTAL_HISTORICAL_RECORDS` | Number | Count of historical records (~5,760) |
| `loadEnhancedLivePage()` | Function | Paginated loader with filtering |
| `loadEnhancedHistoricalPage()` | Function | Paginated loader with filtering |

**Room Definition**: 60 rooms across 4 groups × 3 units × 5 rooms each

---

## Mock Data Behavior

### Live Data Generation

| Room Index | Scheduled Offset | Status |
|------------|------------------|--------|
| 0-9 | -20 to -29 mins | `overdue` |
| 10-19 | -5 to +4 mins | `due` |
| 20-59 | +5 to +44 mins | `upcoming` |

### Historical Data Generation

| Check Age | Status | Supervisor Note |
|-----------|--------|-----------------|
| > 8 hours | `missed` | Auto: "Reviewed and documented." |
| ≤ 8 hours | `missed` | None (requires manual review) |
| Any | `completed` | None |

### High-Risk Residents

| Calculation | Result |
|-------------|--------|
| `roomIdx % 7 === 0` | `hasHighRisk: true` (SR badge) |

---

## Legacy Mock Data (Desktop Standard)

### [mockLiveData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/mockLiveData.ts)

**Purpose**: Original live check mock data (124 records)

| Export | Description |
|--------|-------------|
| `mockLiveChecks` | Static array of `LiveCheckRow` |
| `TOTAL_LIVE_RECORDS` | 8,914 (simulated server count) |
| `loadLiveChecksPage()` | Paginated loader with 1.5s delay |
| `getLiveCounts()` | Returns `{ missed, due }` counts |

---

### [mockHistoricalData.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/mockHistoricalData.ts)

**Purpose**: Original historical check mock data (57 records)

| Export | Description |
|--------|-------------|
| `historicalChecks` | Static array of `HistoricalCheck` |
| `TOTAL_HISTORICAL_RECORDS` | 5,420 (simulated server count) |
| `loadHistoricalChecksPage()` | Paginated loader with 1.5s delay |
| `getHistoricalCounts()` | Returns `{ unreviewed }` count |

---

## Type Definitions

### [src/desktop/types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/types.ts)

| Type | Usage |
|------|-------|
| `DesktopView` | `'live'` \| `'historical'` |
| `HistoricalCheck` | Historical table row (includes `hasHighRisk`) |
| `LiveCheckRow` | Live table row (includes `hasHighRisk`) |
| `DesktopFilter` | Toolbar filter state |
| `LiveStatusFilter` | `'all'` \| `'upcoming'` \| `'due'` \| `'overdue'` |
| `HistoricalStatusFilter` | `'all'` \| `'missed-uncommented'` \| `'missed-commented'` \| `'completed'` |
| `SupervisorNoteReason` | Predefined note reasons |

---

### [src/types.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/types.ts)

| Type | Usage |
|------|-------|
| `SafetyCheck` | Core check interface (mobile-centric) |
| `SafetyCheckStatus` | `'early'` \| `'pending'` \| `'due'` \| `'missed'` \| etc. |
| `Resident` | `{ id, name, location }` |
| `SpecialClassification` | Risk type info |

---

## State Atoms

### [src/desktop/atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/atoms.ts)

| Atom | Persistence | Purpose |
|------|-------------|---------|
| `desktopViewAtom` | ✅ Storage | Current view: live/historical |
| `desktopFilterAtom` | ❌ Session | Filter state for toolbar |
| `selectedHistoryRowsAtom` | ❌ Session | Selected row IDs (historical) |
| `selectedLiveRowsAtom` | ❌ Session | Selected row IDs (live) |
| `historicalChecksAtom` | ❌ Session | Historical data array |
| `filteredHistoricalChecksAtom` | ❌ Derived | Filtered historical checks |
| `activeDetailRecordAtom` | ❌ Session | Currently viewed record in panel |
| `isDetailPanelOpenAtom` | ❌ Session | Panel visibility |
| `panelWidthAtom` | ✅ Storage | Panel resize width |
| `autoRefreshAtom` | ❌ Session | Auto-refresh config |
| `desktopTabCountsAtom` | ❌ Derived | Badge counts for tabs |

---

### [src/desktop-enhanced/atoms.ts](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/atoms.ts)

| Atom | Purpose |
|------|---------|
| `desktopEnhancedViewAtom` | View mode for enhanced layout |
| `desktopEnhancedSelectionAtom` | Tree navigation selection |

---

## Data Flow Diagram

```mermaid
flowchart TD
    subgraph Mock Data Layer
        MD[mockData.ts] --> ED[enhancedMockData]
        MLD[mockLiveData.ts] --> MLC[mockLiveChecks]
        MHD[mockHistoricalData.ts] --> MHC[historicalChecks]
    end

    subgraph State Layer
        ED --> HA[historicalChecksAtom]
        ED --> DTC[desktopTabCountsAtom]
        HA --> FHA[filteredHistoricalChecksAtom]
    end

    subgraph Hooks Layer
        ED --> UTD[useTreeData]
        ED --> UGS[useGlobalSummary]
    end

    subgraph UI Layer
        UTD --> TV[TreeView]
        FHA --> HRV[HistoricalReviewView]
        ED --> LMV[LiveMonitorView]
        DTC --> GSW[GlobalStatusWidget]
    end
```

---

## Usage Notes

> [!IMPORTANT]
> The **enhanced** mock data (`mockData.ts`) is the primary data source used by the current desktop-enhanced views. The legacy files (`mockLiveData.ts`, `mockHistoricalData.ts`) are retained for the standard desktop view but may be deprecated.

> [!TIP]
> When modifying mock data distribution:
> - **Completion rates**: Lines 179-182 in mockData.ts
> - **Status timing offsets**: Lines 95-104 in mockData.ts
> - **Auto-comment threshold**: Line 193 (currently 8 hours)
> - **SR badge logic**: `roomIdx % 7 === 0`
