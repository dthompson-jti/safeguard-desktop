// src/desktop-enhanced/data/mockData.ts

import { LiveCheckRow, HistoricalCheck, DesktopFilter } from '../../desktop/types';

const GROUPS = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const UNIT_PREFIXES = ['A', 'B', 'C', 'D'];

/**
 * Enhanced mock data for high-density testing.
 * Mirroring the "Upcoming", "Due", "Overdue" and "Completed", "Missed" model.
 */

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
        lastCheckOfficer: 'Brett Corbin',
        originalCheck: null as never,
    };
};

const createEnhancedHistoricalCheck = (
    id: string,
    residentName: string,
    location: string,
    status: 'completed' | 'missed',
    scheduledTime: string,
    actualTime: string | null,
    options: {
        group?: string;
        unit?: string;
        officerNote?: string;
        supervisorNote?: string;
    } = {}
): HistoricalCheck => {
    return {
        id,
        residents: [{ id: `res-${id}`, name: residentName, location }],
        location,
        scheduledTime,
        actualTime,
        status,
        varianceMinutes: actualTime ? 1 : Infinity,
        group: options.group || GROUPS[0],
        unit: options.unit || 'A1',
        officerName: 'Brett Corbin',
        officerNote: options.officerNote,
        supervisorNote: options.supervisorNote,
        reviewStatus: status === 'completed' ? 'verified' : 'pending',
    };
};

// Generate a large set of data
export const generateEnhancedData = () => {
    const liveData: LiveCheckRow[] = [];
    const historicalData: HistoricalCheck[] = [];

    const now = new Date();
    const isoDate = now.toISOString().split('T')[0];

    // Generate ~20-30 checks per unit for high density
    GROUPS.forEach((group, gIdx) => {
        for (let u = 1; u <= 3; u++) {
            const unit = `${UNIT_PREFIXES[gIdx]}${u}`;

            // Live Checks
            for (let i = 1; i <= 25; i++) {
                const id = `live-${group}-${unit}-${i}`;
                const room = `${unit}-${100 + i}`;
                const status = i <= 5 ? 'overdue' : i <= 10 ? 'due' : 'upcoming';
                const timerText = status === 'overdue' ? `Overdue ${i}m` : status === 'due' ? `Due in ${15 - i}m` : `Due in ${15 + i}m`;

                liveData.push(createEnhancedLiveCheck(id, `Resident ${group}-${unit}-${i}`, room, status, timerText, {
                    group,
                    unit,
                    hasHighRisk: i % 10 === 0,
                }));
            }

            // Historical Checks
            for (let i = 1; i <= 40; i++) {
                const id = `hist-${group}-${unit}-${i}`;
                const room = `${unit}-${100 + i}`;
                const status = i % 8 === 0 ? 'missed' : 'completed';
                const schedTime = `${isoDate}T${String(8 + Math.floor(i / 4)).padStart(2, '0')}:${String((i % 4) * 15).padStart(2, '0')}:00`;
                const actTime = status === 'completed' ? schedTime.replace('T', 'T') : null; // Simulating same time completion

                // Add comments to some records
                const officerNote = (i % 5 === 0) ? `Regular check, resident is ${i % 2 === 0 ? 'sleeping' : 'awake'}.` : undefined;

                historicalData.push(createEnhancedHistoricalCheck(id, `Resident H-${group}-${unit}-${i}`, room, status, schedTime, actTime, {
                    group,
                    unit,
                    officerNote,
                }));
            }
        }
    });

    return { liveData, historicalData };
};

const cachedData = generateEnhancedData();

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
                if (filter.statusFilter && filter.statusFilter !== 'all') filtered = filtered.filter(r => r.status === filter.statusFilter);
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
                if (filter.statusFilter && filter.statusFilter !== 'all') filtered = filtered.filter(r => r.status === filter.statusFilter);

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
