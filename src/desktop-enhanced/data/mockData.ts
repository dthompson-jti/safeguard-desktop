// src/desktop-enhanced/data/mockData.ts

import { LiveCheckRow, HistoricalCheck, DesktopFilter } from '../../desktop/types';

const GROUPS = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const UNIT_PREFIXES = ['A', 'B', 'C', 'D'];

/**
 * Enhanced mock data for high-density testing.
 * Mirroring the "Upcoming", "Due", "Overdue" and "Completed", "Missed" model.
 */

const RESIDENT_NAMES = [
    'James Wilson', 'Maria Garcia', 'Robert Taylor', 'Linda Johnson', 'Michael Brown',
    'Elizabeth Davis', 'William Miller', 'Susan Wilson', 'David Moore', 'Jessica Taylor',
    'John Anderson', 'Karen Thomas', 'Christopher Jackson', 'Nancy White', 'Matthew Harris',
    'Sarah Martin', 'Daniel Thompson', 'Lisa Garcia', 'Anthony Martinez', 'Dorothy Robinson'
];

const OFFICER_NAMES = [
    'Brett Corbin', 'Sarah Jenkins', 'John Doe', 'Alice Miller', 'Robert Smith'
];

const NOTE_SNIPPETS = [
    'Resident is sleeping.', 'Resident is awake and alert.', 'Room is tidy.',
    'Resident refused check.', 'Resident is in common area.', 'Checked vitals.',
    'Assisted with mobility.', 'Resident is watching TV.', 'Observation complete.'
];

const createEnhancedLiveCheck = (
    id: string,
    residentName: string,
    location: string,
    status: 'upcoming' | 'due' | 'overdue',
    timerText: string,
    options: {
        hasHighRisk?: boolean;
        group?: string;
        unit?: string;
        lastCheckTime?: string;
    } = {}
): LiveCheckRow => {
    const timerSeverity = status === 'overdue' ? 'alert' : status === 'due' ? 'warning' : 'neutral';
    const officer = OFFICER_NAMES[Math.floor(Math.random() * OFFICER_NAMES.length)];

    return {
        id,
        status,
        timerText,
        timerSeverity,
        location,
        residents: [{ id: `res-${id}`, name: residentName, location }],
        hasHighRisk: options.hasHighRisk || false,
        group: options.group || GROUPS[0],
        unit: options.unit || 'A1',
        lastCheckTime: options.lastCheckTime || null,
        lastCheckOfficer: officer,
        originalCheck: null as never,
    };
};

const createEnhancedHistoricalCheck = (
    id: string,
    residentName: string,
    location: string,
    status: 'completed' | 'missed' | 'late',
    scheduledTime: string,
    actualTime: string | null,
    varianceMinutes: number,
    options: {
        group?: string;
        unit?: string;
        officerNote?: string;
        supervisorNote?: string;
    } = {}
): HistoricalCheck => {
    const officer = OFFICER_NAMES[Math.floor(Math.random() * OFFICER_NAMES.length)];
    return {
        id,
        residents: [{ id: `res-${id}`, name: residentName, location }],
        location,
        scheduledTime,
        actualTime,
        status,
        varianceMinutes,
        group: options.group || GROUPS[0],
        unit: options.unit || 'A1',
        officerName: officer,
        officerNote: options.officerNote,
        supervisorNote: options.supervisorNote,
        reviewStatus: (status === 'completed' || status === 'late') ? 'verified' : 'pending',
    };
};

// Generate a large set of data
export const generateEnhancedData = () => {
    const liveData: LiveCheckRow[] = [];
    const historicalData: HistoricalCheck[] = [];

    const now = new Date();

    // Generate ~20-30 checks per unit for high density
    GROUPS.forEach((group, gIdx) => {
        for (let u = 1; u <= 3; u++) {
            const unit = `${UNIT_PREFIXES[gIdx]}${u}`;

            // Unit-level random performance factor (some units are just better)
            const unitPerformanceSeed = Math.random();
            const isPerfectUnit = group === 'Delta' || unitPerformanceSeed < 0.4; // 40% of non-Delta units are also perfect

            // Live Checks
            for (let i = 1; i <= 25; i++) {
                const id = `live-${group}-${unit}-${i}`;
                const room = `${unit}-${100 + i}`;

                // Randomized status distribution
                const rand = Math.random();
                let status: 'upcoming' | 'due' | 'overdue' = 'upcoming';
                let timerText = '';

                if (!isPerfectUnit && rand < 0.1) { // Reduced from 0.15
                    status = 'overdue';
                    const mins = Math.floor(Math.random() * 45) + 1;
                    timerText = `Overdue ${mins}m`;
                } else if (!isPerfectUnit && rand < 0.3) { // Reduced from 0.40
                    status = 'due';
                    const mins = Math.floor(Math.random() * 15);
                    timerText = `Due in ${mins}m`;
                } else {
                    status = 'upcoming';
                    const mins = Math.floor(Math.random() * 120) + 15;
                    timerText = `Due in ${mins}m`;
                }

                const name = RESIDENT_NAMES[(gIdx * 10 + u * 5 + i) % RESIDENT_NAMES.length];

                liveData.push(createEnhancedLiveCheck(id, name, room, status, timerText, {
                    group,
                    unit,
                    hasHighRisk: (i + gIdx) % 7 === 0,
                }));
            }

            // Historical Checks - Generate for multiple days to prevent date-filter mismatches
            const dates = [
                new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString().split('T')[0],
                new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                now.toISOString().split('T')[0]
            ];

            dates.forEach((isoDateForHist, dIdx) => {
                // Reduce volume per day to keep total manageable (e.g., 20 per day = 60 total)
                for (let i = 1; i <= 20; i++) {
                    const id = `hist-${group}-${unit}-d${dIdx}-${i}`;
                    const room = `${unit}-${100 + i}`;
                    const isMissed = !isPerfectUnit && Math.random() < 0.02;

                    const hour = 8 + Math.floor(i / 2);
                    const minute = (i % 2) * 30;
                    const schedTime = `${isoDateForHist}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;

                    let actTime = null;
                    let variance = Infinity;
                    let status: 'completed' | 'missed' | 'late' = 'missed';

                    if (!isMissed) {
                        variance = isPerfectUnit
                            ? Math.floor(Math.random() * 5) - 2
                            : Math.floor(Math.random() * 35) - 5;

                        const actDate = new Date(new Date(schedTime).getTime() + variance * 60000);
                        actTime = actDate.toISOString();
                        status = variance > 15 ? 'late' : 'completed';
                    }

                    const name = RESIDENT_NAMES[(gIdx * 10 + u * 5 + i + dIdx) % RESIDENT_NAMES.length];
                    const officerNote = (i % 3 === 0) ? NOTE_SNIPPETS[Math.floor(Math.random() * NOTE_SNIPPETS.length)] : undefined;
                    const supervisorNote = (!isPerfectUnit && i % 15 === 0) ? 'Follow up required.' : undefined;

                    historicalData.push(createEnhancedHistoricalCheck(id, name, room, status, schedTime, actTime, variance, {
                        group,
                        unit,
                        officerNote,
                        supervisorNote,
                    }));
                }
            });
        }
    });

    return { liveData, historicalData };
};

const cachedData = generateEnhancedData();
export const enhancedMockData = cachedData;
export const TOTAL_LIVE_RECORDS = cachedData.liveData.length;
export const TOTAL_HISTORICAL_RECORDS = cachedData.historicalData.length;

export const loadEnhancedLivePage = (
    cursor: number,
    pageSize: number,
    filter?: DesktopFilter
): Promise<{ data: LiveCheckRow[]; nextCursor: number | null; totalCount: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = cachedData.liveData;
            if (filter) {
                if (filter.search) {
                    const s = filter.search.toLowerCase();
                    filtered = filtered.filter(row =>
                        row.residents.some(r => r.name.toLowerCase().includes(s)) ||
                        row.location.toLowerCase().includes(s)
                    );
                }
                if (filter.group && filter.group !== 'all') filtered = filtered.filter(r => r.group === filter.group);
                if (filter.unit && filter.unit !== 'all') filtered = filtered.filter(r => r.unit === filter.unit);
                if (filter.statusFilter && filter.statusFilter !== 'all') {
                    // Strictly match status. 'missed' is historical per user request.
                    filtered = filtered.filter(r => r.status === filter.statusFilter);
                }
            }

            const data = filtered.slice(cursor, cursor + pageSize);
            const nextCursor = (cursor + pageSize < filtered.length) ? cursor + pageSize : null;
            resolve({ data, nextCursor, totalCount: filtered.length });
        }, 800);
    });
};

export const loadEnhancedHistoricalPage = (
    cursor: number,
    pageSize: number,
    filter?: DesktopFilter
): Promise<{ data: HistoricalCheck[]; nextCursor: number | null; totalCount: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = cachedData.historicalData;
            if (filter) {
                if (filter.search) {
                    const s = filter.search.toLowerCase();
                    filtered = filtered.filter(row =>
                        row.residents.some(r => r.name.toLowerCase().includes(s)) ||
                        row.location.toLowerCase().includes(s)
                    );
                }
                if (filter.group && filter.group !== 'all') filtered = filtered.filter(r => r.group === filter.group);
                if (filter.unit && filter.unit !== 'all') filtered = filtered.filter(r => r.unit === filter.unit);
                if (filter.statusFilter && filter.statusFilter !== 'all') {
                    if (filter.statusFilter === 'unreviewed') {
                        filtered = filtered.filter(r =>
                            (r.status === 'missed' || r.status === 'late') && !r.supervisorNote
                        );
                    } else {
                        filtered = filtered.filter(r => r.status === filter.statusFilter);
                    }
                }

                // Date Range Filter
                if (filter.dateStart || filter.dateEnd) {
                    const checkDate = (iso: string) => iso.split('T')[0];
                    filtered = filtered.filter(r => {
                        const date = checkDate(r.scheduledTime);
                        if (filter.dateStart && date < filter.dateStart) return false;
                        if (filter.dateEnd && date > filter.dateEnd) return false;
                        return true;
                    });
                }

                // Comment filter
                if (filter.commentFilter === 'comment') {
                    filtered = filtered.filter(r => !!r.officerNote);
                } else if (filter.commentFilter === 'no-comment') {
                    filtered = filtered.filter(r => !r.officerNote);
                }
            }

            const data = filtered.slice(cursor, cursor + pageSize);
            const nextCursor = (cursor + pageSize < filtered.length) ? cursor + pageSize : null;
            resolve({ data, nextCursor, totalCount: filtered.length });
        }, 800);
    });
};
