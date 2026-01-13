// src/desktop/atoms.ts

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_PREFIX } from '../config';
import { DesktopView, DesktopFilter, HistoricalCheck } from './types';
import { enhancedMockData } from '../desktop-enhanced/data/mockData';
// We'll need access to live data for the polymorphic resolver. 
// Ideally this should be exported from real stores, but for now we might need to rely on the view pushing data or a shared store.
// To keep it simple and clean: The View will push the *full object* to the panel atom when clicked.
// This avoids complex lookups in mock data.

/** Current desktop view: 'live' or 'historical' */
export const desktopViewAtom = atomWithStorage<DesktopView>(`${STORAGE_PREFIX}view`, 'live');

/** Desktop filter state */
export const desktopFilterAtom = atom<DesktopFilter>({
    facility: 'all',
    group: 'all',
    unit: 'all',
    search: '',
    showMissedOnly: false,
    statusFilter: 'all',
    commentFilter: 'any',
    dateStart: null,
    dateEnd: null,
});

/** Selected row IDs for bulk actions (Historical view) */
export const selectedHistoryRowsAtom = atom<Set<string>>(new Set<string>());

/** Selected row IDs for live monitor */
export const selectedLiveRowsAtom = atom<Set<string>>(new Set<string>());

/** Historical checks data (mock) */
export const historicalChecksAtom = atom<HistoricalCheck[]>(enhancedMockData.historicalData);

/** Counter changed to trigger re-fetches in views */
export const historicalRefreshAtom = atom(0);

/** Derived: filtered historical checks */
export const filteredHistoricalChecksAtom = atom((get) => {
    const checks = get(historicalChecksAtom);
    const filter = get(desktopFilterAtom);

    return checks.filter((check) => {
        // Search filter
        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            const matchesResident = check.residents.some((r) =>
                r.name.toLowerCase().includes(searchLower)
            );
            const matchesLocation = check.location.toLowerCase().includes(searchLower);
            if (!matchesResident && !matchesLocation) return false;
        }

        // Unit filter - extract unit letter from location (e.g., "A-101" → "A")
        if (filter.unit !== 'all') {
            const unitFromLocation = check.location.split('-')[0];
            if (unitFromLocation !== filter.unit) return false;
        }

        // Status filter
        if (filter.statusFilter === 'missed' && check.status !== 'missed') {
            return false;
        }
        if (filter.statusFilter === 'completed' && check.status !== 'completed') {
            return false;
        }

        // Date Range Filter
        if (filter.dateStart || filter.dateEnd) {
            const checkDate = check.scheduledTime.split('T')[0]; // Extract YYYY-MM-DD
            if (filter.dateStart && checkDate < filter.dateStart) return false;
            if (filter.dateEnd && checkDate > filter.dateEnd) return false;
        }

        return true;
    });
});

/** Supervisor note modal state */
export const supervisorNoteModalAtom = atom<{
    isOpen: boolean;
    selectedIds: string[];
}>({
    isOpen: false,
    selectedIds: [],
});

// ============================================================================
// INFO PANEL STATE (UNIFIED)
// ============================================================================

/**
 * The normalized data shape for the Detail Panel.
 * Adapts both LiveCheckRow and HistoricalCheck into a single interface.
 */
export interface PanelData {
    id: string;
    source: 'live' | 'historical';
    residentName: string;
    location: string;
    status: 'missed' | 'due' | 'pending' | 'done' | 'late' | 'completing' | 'complete' | 'queued' | 'upcoming' | 'overdue' | 'completed';
    timeScheduled: string;
    timeActual: string | null;
    varianceMinutes?: number;
    officerName: string;
    officerNote?: string;
    supervisorNote?: string;
    reviewStatus?: 'pending' | 'verified';
    // Potential future fields
    riskType?: string;
    hasHighRisk?: boolean;
}

/** 
 * Holds the currently open record for the detail panel.
 * If null, panel is closed.
 */
export const activeDetailRecordAtom = atom<PanelData | null>(null);

/** Visibility state for the detail panel (independent of data) */
export const isDetailPanelOpenAtom = atom<boolean>(false);

/** Panel width for resize functionality (min: 320, max: 600) */
export const panelWidthAtom = atomWithStorage<number>(`${STORAGE_PREFIX}panel_width`, 400);

// ============================================================================
// AUTO-REFRESH STATE
// ============================================================================

/** Auto-refresh configuration */
export interface AutoRefreshState {
    isPaused: boolean;
    intervalSeconds: number;
    lastRefreshTime: number; // timestamp (ms)
}

export const autoRefreshAtom = atom<AutoRefreshState>({
    isPaused: false,
    intervalSeconds: 30,
    lastRefreshTime: Date.now(),
});

/** Derived: Time until next refresh (in seconds) */
export const nextRefreshSecondsAtom = atom((get) => {
    const { isPaused, intervalSeconds, lastRefreshTime } = get(autoRefreshAtom);

    if (isPaused) return null; // null = paused

    const elapsed = (Date.now() - lastRefreshTime) / 1000;
    const remaining = Math.max(0, intervalSeconds - elapsed);
    return Math.ceil(remaining);
});

// ============================================================================
// DESKTOP STATUS COUNTS
// ============================================================================

/** Desktop-specific counts for header tabs - now pulling from unified enhanced mock data */
export const desktopTabCountsAtom = atom((get) => {
    // We get historicalRefreshAtom to ensure this re-runs when data is updated via modal
    get(historicalRefreshAtom);

    // Live counts - Strictly active overdue
    const overdue = enhancedMockData.liveData.filter(c => c.status === 'overdue').length;
    const due = enhancedMockData.liveData.filter(c => c.status === 'due').length;

    // Historical count (missed / need comment)
    const unreviewed = enhancedMockData.historicalData.filter(c =>
        c.status === 'missed' && !c.supervisorNote
    ).length;

    return {
        // Live View badges
        missed: overdue,     // 🔔 red bell
        due: due,            // ⏰ amber clock

        // Historical View badge
        unreviewed: unreviewed, // 👤⚠ gray
    };
});
