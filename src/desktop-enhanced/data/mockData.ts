// src/desktop-enhanced/data/mockData.ts
// AUDIT: This file generates unified data for both Live and Historical views

import { LiveCheckRow, HistoricalCheck, DesktopFilter } from '../../desktop/types';

const GROUPS = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const UNIT_PREFIXES = ['A', 'B', 'C', 'D'];

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
];

// 60 rooms: 4 groups × 3 units × 5 rooms
interface RoomDef {
    id: string;
    resident: string;
    location: string;
    group: string;
    unit: string;
}

const ROOMS: RoomDef[] = GROUPS.flatMap((group, gIdx) =>
    [1, 2, 3].flatMap(unitNum => {
        const unit = `${UNIT_PREFIXES[gIdx]}${unitNum}`;
        return Array.from({ length: 5 }, (_, i) => ({
            id: `room-${unit}-${100 + i}`,
            resident: RESIDENT_NAMES[(gIdx * 15 + unitNum * 5 + i) % RESIDENT_NAMES.length],
            location: `${unit}-${100 + i}`,
            group,
            unit,
        }));
    })
);

// Seeded random for consistent results between refreshes
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Format time for display: "7:03 AM"
const formatTimeDisplay = (date: Date): string => {
    const hours = date.getHours();
    const mins = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${String(mins).padStart(2, '0')} ${ampm}`;
};

/**
 * CORE DATA GENERATOR
 * 
 * For 60 rooms, spread scheduled times across the full hour:
 * - Room 0  → :00
 * - Room 1  → :01
 * - Room 59 → :59
 * 
 * At any given time, this creates a natural mix:
 * - Rooms with times in the past → Overdue
 * - Rooms within 5 mins of now   → Due  
 * - Rooms in the future          → Upcoming
 */
export const generateEnhancedData = () => {
    const liveData: LiveCheckRow[] = [];
    const historicalData: HistoricalCheck[] = [];

    const now = new Date();
    const MS_PER_MINUTE = 60000;
    const CHECK_INTERVAL_MINS = 15;
    const HISTORY_HOURS = 24;

    ROOMS.forEach((room, roomIdx) => {
        const isPerfectRoom = room.group === 'Delta' || seededRandom(roomIdx + 1000) < 0.3;
        const officer = OFFICER_NAMES[roomIdx % OFFICER_NAMES.length];

        // Create scheduled time based on room index with GUARANTEED variety:
        // Rooms 0-9:   Overdue (20-29 mins ago)
        // Rooms 10-19: Due (0-9 mins ago/ahead)
        // Rooms 20-59: Upcoming (10-49 mins ahead)
        const scheduledTime = new Date(now);
        let offsetMinutes: number;

        if (roomIdx < 10) {
            // OVERDUE: 20-29 mins in the past
            offsetMinutes = -(20 + roomIdx);
        } else if (roomIdx < 20) {
            // DUE: -5 to +4 mins (around now)
            offsetMinutes = roomIdx - 15; // -5, -4, -3, -2, -1, 0, 1, 2, 3, 4
        } else {
            // UPCOMING: 5-44 mins in the future
            offsetMinutes = roomIdx - 15; // 5, 6, 7, ... 44
        }

        scheduledTime.setTime(now.getTime() + offsetMinutes * MS_PER_MINUTE);

        // Calculate how many minutes ago (positive) or in the future (negative) this check is
        const deltaMinutes = -offsetMinutes; // Flip sign: past is positive, future is negative

        // Determine Live status based on time difference
        let liveStatus: 'upcoming' | 'due' | 'overdue';
        let timerText: string;
        let timerSeverity: 'alert' | 'warning' | 'neutral';

        if (deltaMinutes > 15) {
            // More than 15 mins past scheduled time
            liveStatus = 'overdue';
            timerText = `Missed ${deltaMinutes}m`;
            timerSeverity = 'alert';
        } else if (deltaMinutes > 5) {
            // 6-15 mins past scheduled time
            liveStatus = 'overdue';
            timerText = `Missed ${deltaMinutes}m`;
            timerSeverity = 'alert';
        } else if (deltaMinutes >= 0) {
            // 0-5 mins past scheduled time (grace period) → Due
            liveStatus = 'due';
            timerText = deltaMinutes === 0 ? 'Due now' : `Due ${deltaMinutes}m ago`;
            timerSeverity = 'warning';
        } else if (deltaMinutes >= -5) {
            // 1-5 mins before scheduled time → Due soon
            liveStatus = 'due';
            timerText = `Due in ${Math.abs(deltaMinutes)}m`;
            timerSeverity = 'warning';
        } else {
            // More than 5 mins before scheduled time → Upcoming
            liveStatus = 'upcoming';
            timerText = `Due in ${Math.abs(deltaMinutes)}m`;
            timerSeverity = 'neutral';
        }

        // Add to Live data (ONE check per room)
        liveData.push({
            id: `live-${room.id}`,
            status: liveStatus,
            timerText,
            timerSeverity,
            location: room.location,
            residents: [{ id: `res-${room.id}`, name: room.resident, location: room.location }],
            hasHighRisk: roomIdx % 7 === 0,
            group: room.group,
            unit: room.unit,
            lastCheckTime: formatTimeDisplay(scheduledTime), // This is what LiveMonitorView displays
            lastCheckOfficer: officer,
            originalCheck: {
                id: `check-${room.id}`,
                type: 'scheduled',
                status: liveStatus === 'upcoming' ? 'pending' : (liveStatus === 'due' ? 'due' : 'missed'),
                residents: [{ id: `res-${room.id}`, name: room.resident, location: room.location }],
                dueDate: scheduledTime.toISOString(),
                walkingOrderIndex: roomIdx,
                generationId: 1,
                baseInterval: 15
            },
        });

        // Generate Historical checks (past 24 hours, every 15 mins)
        const historyStart = new Date(now.getTime() - HISTORY_HOURS * 60 * MS_PER_MINUTE);
        historyStart.setMinutes(scheduledTime.getMinutes(), 0, 0); // Align to this room's minute offset

        let slotTime = new Date(historyStart);
        let slotIndex = 0;

        while (slotTime < scheduledTime) {
            const checkId = `hist-${room.id}-${slotIndex}`;
            const scheduledTimeISO = slotTime.toISOString();

            // 85% completed, 15% missed (perfect rooms: 98% completed)
            const isMissed = isPerfectRoom
                ? seededRandom(slotIndex + roomIdx * 1000) < 0.02
                : seededRandom(slotIndex + roomIdx * 1000) < 0.15;

            const status: 'completed' | 'missed' = isMissed ? 'missed' : 'completed';
            const variance = isMissed ? Infinity : Math.floor(seededRandom(slotIndex * 3 + roomIdx) * 10) - 2;
            const actualTime = isMissed ? null : new Date(slotTime.getTime() + variance * MS_PER_MINUTE).toISOString();
            const officerNote = (slotIndex % 4 === 0) ? NOTE_SNIPPETS[slotIndex % NOTE_SNIPPETS.length] : undefined;

            // Auto-comment missed checks older than 8 hours
            // Recent missed checks (within 8h) remain uncommented for supervisor review
            const checkAgeMs = now.getTime() - slotTime.getTime();
            const MS_PER_HOUR = 60 * 60 * 1000; // 60 mins * 60 secs * 1000 ms
            const isOlderThan8Hours = checkAgeMs > 8 * MS_PER_HOUR;
            const supervisorNote = isMissed
                ? (isOlderThan8Hours ? 'Reviewed and documented.' : undefined)
                : undefined;

            historicalData.push({
                id: checkId,
                residents: [{ id: `res-${room.id}`, name: room.resident, location: room.location }],
                location: room.location,
                scheduledTime: scheduledTimeISO,
                actualTime,
                status,
                varianceMinutes: variance,
                group: room.group,
                unit: room.unit,
                officerName: isMissed ? '' : officer,
                officerNote,
                supervisorNote,
                reviewStatus: isMissed ? (supervisorNote ? 'verified' : 'pending') : 'verified',
                hasHighRisk: roomIdx % 7 === 0, // Same logic as live view - resident property
            });

            slotTime = new Date(slotTime.getTime() + CHECK_INTERVAL_MINS * MS_PER_MINUTE);
            slotIndex++;
        }
    });

    return { liveData, historicalData };
};

// Cache the data on module load
const cachedData = generateEnhancedData();
export const enhancedMockData = cachedData;
export const TOTAL_LIVE_RECORDS = cachedData.liveData.length;
export const TOTAL_HISTORICAL_RECORDS = cachedData.historicalData.length;

// Paginated data loaders for table views
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
                    filtered = filtered.filter(r => r.status === filter.statusFilter);
                }
            }
            const data = filtered.slice(cursor, cursor + pageSize);
            const nextCursor = (cursor + pageSize < filtered.length) ? cursor + pageSize : null;
            resolve({ data, nextCursor, totalCount: filtered.length });
        }, 200);
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
                if (filter.historicalStatusFilter && filter.historicalStatusFilter !== 'all') {
                    if (filter.historicalStatusFilter === 'missed-uncommented') {
                        filtered = filtered.filter(r => r.status === 'missed' && !r.supervisorNote);
                    } else if (filter.historicalStatusFilter === 'missed-commented') {
                        filtered = filtered.filter(r => r.status === 'missed' && !!r.supervisorNote);
                    } else if (filter.historicalStatusFilter === 'completed') {
                        filtered = filtered.filter(r => r.status === 'completed');
                    }
                }
                if (filter.dateStart || filter.dateEnd) {
                    const checkDate = (iso: string) => iso.split('T')[0];
                    filtered = filtered.filter(r => {
                        const date = checkDate(r.scheduledTime);
                        if (filter.dateStart && date < filter.dateStart) return false;
                        if (filter.dateEnd && date > filter.dateEnd) return false;
                        return true;
                    });
                }
            }
            const data = filtered.slice(cursor, cursor + pageSize);
            const nextCursor = (cursor + pageSize < filtered.length) ? cursor + pageSize : null;
            resolve({ data, nextCursor, totalCount: filtered.length });
        }, 200);
    });
};

/**
 * Update one or more historical checks in the mock database.
 */
export const updateHistoricalCheck = (ids: string[], updates: Partial<HistoricalCheck>): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            cachedData.historicalData = cachedData.historicalData.map(check =>
                ids.includes(check.id) ? { ...check, ...updates } : check
            );
            resolve();
        }, 100);
    });
};
