// src/desktop-enhanced/data/mockData.ts
// AUDIT: This file generates unified data for both Live and Historical views

import { LiveCheckRow, HistoricalCheck, DesktopFilter } from '../../desktop/types';

const FACILITY_CONFIG = [
    {
        group: 'Cedar',
        units: ['Cedar Intake', 'Cedar Assessment']
    },
    {
        group: 'Oak',
        units: ['Oak Integrated', 'Oak Enhanced', 'Oak Secure']
    },
    {
        group: 'Maple',
        units: ['Maple General', 'Maple Transitional']
    },
    {
        group: 'Pine',
        units: ['Pine Honors', 'Pine Re-entry']
    }
];

const RESIDENT_NAMES = [
    'James Wilson', 'Maria Garcia', 'Robert Taylor', 'Linda Johnson', 'Michael Brown',
    'Elizabeth Davis', 'William Miller', 'Susan Wilson', 'David Moore', 'Jessica Taylor',
    'John Anderson', 'Karen Thomas', 'Christopher Jackson', 'Nancy White', 'Matthew Harris',
    'Sarah Martin', 'Daniel Thompson', 'Lisa Garcia', 'Anthony Martinez', 'Dorothy Robinson',
    'Kevin Clark', 'Sandra Rodriguez', 'Paul Lewis', 'Donna Lee', 'Mark Walker',
    'Betty Hall', 'George Allen', 'Margaret Young', 'Kenneth Hernandez', 'Ruth King',
    'Edward Wright', 'Sharon Lopez', 'Ronald Hill', 'Michelle Scott', 'Timothy Green',
    'Laura Adams', 'Jason Baker', 'Sarah Gonzalez', 'Jeffrey Nelson', 'Kimberly Carter',
    'Gary Mitchell', 'Deborah Perez', 'Nicholas Roberts', 'Jessica Turner', 'Eric Phillips',
    'Shirley Campbell', 'Stephen Parker', 'Cynthia Evans', 'Andrew Edwards', 'Angela Collins',
    'Raymond Stewart', 'Melissa Sanchez', 'Joshua Morris', 'Brenda Rogers', 'Dennis Reed',
    'Amy Cook', 'Jerry Morgan', 'Anna Bell', 'Tyler Murphy', 'Rebecca Bailey',
    'Aaron Rivera', 'Virginia Cooper', 'Henry Richardson', 'Kathleen Cox', 'Douglas Howard',
    'Martha Ward', 'Peter Torres', 'Debra Peterson', 'Walter Gray', 'Amanda Ramirez',
    'Harold James', 'Stephanie Watson', 'Jose Brooks', 'Carolyn Kelly', 'Adam Sanders',
    'Christine Price', 'Nathan Bennett', 'Janet Wood', 'Lawrence Chen', 'Catherine Barnes',
    'Arthur Ross', 'Frances Henderson', 'Ryan Coleman', 'Ann Jenkins', 'Joe Perry',
    'Alice Powell', 'Juan Long', 'Julie Patterson', 'Jack Hughes', 'Heather Flores',
    'Albert Washington', 'Teresa Butler', 'Jonathan Simmons', 'Doris Foster', 'Justin Gonzales',
    'Sara Bryant', 'Terry Alexander', 'Gloria Russell', 'Gerald Griffin', 'Evelyn Diaz',
    'Keith Hayes', 'Jean Myers', 'Samuel Ford', 'Cheryl Hamilton', 'Willie Graham',
    'Mildred Sullivan', 'Ralph Wallace', 'Katherine Woods', 'Roy Cole', 'Joan West',
    'Benjamin Jordan', 'Ashley Owens', 'Bruce Reynolds', 'Judith Fisher', 'Brandon Ellis',
    'Rose Harrison', 'Harry Gibson', 'Janice Mcdonald', 'Wayne Cruz', 'Kelly Marshall',
    'Billy Ortiz', 'Nicole Gomez', 'Steve Murray', 'Judy Freeman', 'Louis Wells',
    'Christina Webb', 'Eugene Simpson', 'Kathy Stevens', 'Russell Tucker', 'Theresa Porter',
    'Bobby Hunter', 'Beverly Hicks', 'Philip Crawford', 'Denise Henry', 'Johnny Boyd',
    'Marilyn Mason', 'Christian Morales', 'Amber Kennedy', 'Isaiah Warren', 'Danielle Dixon',
    'Frank Ramos', 'Brittany Reyes', 'Scott Burns', 'Diana Gordon', 'Eric Shaw',
    'Jane Holmes', 'Randy Rice', 'Lori Robertson', 'Victor Hunt', 'Tiffany Black',
    'Roy Daniels', 'Crystal Palmer', 'Willie Mills', 'Julia Nichols', 'Ray Grant',
    'Ruby Knight', 'Bobby Ferguson', 'Paula Rose', 'Jesse Stone', 'Kelly Meyer',
    'Lillian Watkins', 'Ernest Jenkins', 'Annie Berry', 'Phillip Barker', 'Liza Andrews',
    'Gregory Payne', 'Irene Pearson', 'Joshua Garrett', 'Bonnie Burton', 'Sean Fuller',
    'Alice Lynch', 'Fred Dean', 'Jeanette Gilbert', 'Bradley Soto', 'Florence Vargas',
    'Philip Moreno', 'Nellie Jimenez', 'Eugene Franklin', 'Hazel Lawson', 'Shawn Johnston',
    'Mabel Lane', 'Stanley Mendez', 'Eileen Harvey', 'Jacob Little', 'Gladys Burton',
    'Clarence Stanley', 'Edna Nguyen', 'Leonard Stephens', 'Bernice George', 'Franklin Hunt',
    'Gertrude Chapman', 'Harvey Berry', 'Beulah Howell', 'Theodore Spencer', 'Ethel Gardner',
    'Curtis Stephens', 'Vera Payne', 'Melvin Pierce', 'Charlene Watkins', 'Mitchell Murray',
    'Bessie Simmons', 'Clinton Lucas', 'Dora Rhodes', 'Rufus Weaver', 'Edith Wagner',
    'Gilbert Willis', 'Verna Foster', 'Gene Arnold', 'Lois Chapman', 'Willard Elliott',
    'Inez Duncan', 'Lester Knight', 'Lorene Bishop', 'Horace Porter', 'Mamie Hudson',
    'Duane Snyder', 'Lydia Perkins', 'Ross Mccoy', 'Nettie Oliver', 'Ivan Montgomery',
    'Eula Blair', 'Guy Lawson', 'Sally Coleman', 'Max Wade', 'Estella Rhodes',
    'Floyd Jennings', 'Olive Barker', 'Hubert Garrett', 'Phoebe Franklin', 'Alvin Stevenson',
    'Lela Weber', 'Julian Yates', 'Vesta Glover', 'Herman Mcbride', 'Wilda Huffman',
    'Everett Mckenzie', 'Goldie Goodman', 'Sidney Massey', 'Roxie Holloway', 'Chester Hubbard',
    'Hattie Daniel', 'Oliver Vance', 'Leila Stark', 'Wesley Preston', 'Ollie Calhoun',
    'Claude Rowland', 'Bertie Merritt', 'Leon Hull', 'Lottie Blackwell', 'Milton Sellers',
    'Myra Gentry', 'Irving Sexton', 'Alta Calhoun', 'Percy Browning', 'Della Whitehead',
    'Oscar Singleton', 'Callie Mayo', 'Felix Pate', 'Eula Bullock', 'Elmer Mcknight',
    'Leona Cherry', 'Leland Moon', 'Iva Gamble', 'Arthur Kirby', 'Nelle Mcintosh',
    'Julius Hardin', 'Etta Carver', 'Cecil Whitehead', 'Lula Dalton', 'Marshall Maynard',
    'Effie Mcgee', 'Salvador Burgess', 'Lilly Small', 'Freddie Branch', 'Opal Hensley',
    'Clifford Harmon', 'Ora Best', 'Emil Merritt', 'Essie Britt', 'Cornelius Davenport',
    'Iva Christian', 'Aubrey Bond', 'Elnora Mcpherson', 'Wallace Glass', 'Fannie Bullock',
    'Alonzo Pruitt', 'Ollie Shepherd', 'Roderick Vinson', 'Veda Dotson', 'Emmett House',
];

export const OFFICER_NAMES = [
    'Brett Corbin', 'Jeff Siemens', 'Jalpa Mazmudar',
    'Sarah Jenkins', 'John Doe', 'Alice Miller', 'Robert Smith'
];

const NOTE_SNIPPETS = [
    'Resident is sleeping.', 'Resident is awake and alert.', 'Room is tidy.',
    'Resident refused check.', 'Resident is in common area.', 'Checked vitals.',
];

// Seeded random for consistent results between refreshes
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Room Definition
interface RoomDef {
    id: string;
    residents: { id: string; name: string; location: string; hasHighRisk?: boolean; hasMedicalWatch?: boolean }[];
    location: string;
    group: string;
    unit: string;
}

// Generate rooms with 1-2 residents each
const ROOMS: RoomDef[] = ((): RoomDef[] => {
    const rooms: RoomDef[] = [];
    const usedNames = new Set<string>();

    let globalSeed = 0;

    // Create random but repeatable assignments
    FACILITY_CONFIG.forEach((config) => {
        config.units.forEach((unitName) => {
            // ~6-8 rooms per unit
            const numRooms = 6 + Math.floor(seededRandom(globalSeed++) * 3);

            for (let i = 0; i < numRooms; i++) {
                const roomNum = 100 + i;
                const locationDisplay = `${roomNum}`; // Hotel style: just "100"
                const roomId = `room-${unitName.replace(/\s+/g, '-')}-${roomNum}`;

                // Deterministic count based on loop
                const seed = globalSeed * 100 + i;
                const isDouble = (seededRandom(seed) > 0.6); // 40% doubles
                const residentCount = isDouble ? 2 : 1;

                const roomResidents: { id: string; name: string; location: string; hasHighRisk?: boolean; hasMedicalWatch?: boolean; otherRisks?: string[] }[] = [];

                // FORCE: Make rooms 2 and 5 explicitly Paired MW for visibility (using approximate index)
                const globalRoomIndex = rooms.length;
                const isForcedPaired = (globalRoomIndex === 2 || globalRoomIndex === 5);

                // Decide if this room is a "Paired MW" room. Force it or random chance.
                const isPairedMW = isForcedPaired || (residentCount === 2 && (seed % 10 === 0));

                // If forced paired, ensure count is 2
                const finalResidentCount = isForcedPaired ? 2 : residentCount;

                for (let r = 0; r < finalResidentCount; r++) {
                    // Pick names that haven't been used
                    let nameIdx = (seed * 7 + r) % RESIDENT_NAMES.length;
                    while (usedNames.has(RESIDENT_NAMES[nameIdx])) {
                        nameIdx = (nameIdx + 1) % RESIDENT_NAMES.length;
                    }
                    const name = RESIDENT_NAMES[nameIdx];
                    usedNames.add(name);

                    // Assign High Risk
                    let hasHighRisk = !isPairedMW && ((seed + r) % 8 === 0);
                    let hasMedicalWatch = isPairedMW;

                    // Assign Other Risks (Assaultive, Flight Risk) for variety (approx 5% chance)
                    let otherRisks: string[] | undefined = undefined;
                    const randomVal = seededRandom(seed * 13 + r);

                    if (randomVal > 0.95) {
                        otherRisks = ['Flight Risk'];
                    } else if (randomVal > 0.90 && randomVal <= 0.95) {
                        otherRisks = ['Assaultive'];
                    }

                    // Manual override for Victor Hunt to ensure we see the [+2] case
                    if (name === 'Victor Hunt') {
                        hasHighRisk = true;
                        hasMedicalWatch = true;
                        otherRisks = ['Flight Risk', 'Assaultive']; // Total 4 statuses test
                    }
                    // Override for Flight Risk test (Single + Other)
                    if (name === 'Bobby Ferguson') {
                        hasHighRisk = true;
                        otherRisks = ['Flight Risk'];
                    }

                    roomResidents.push({
                        id: `res-${roomId}-${r}`,
                        name,
                        location: locationDisplay, // "100"
                        hasHighRisk,
                        hasMedicalWatch,
                        otherRisks
                    });
                }

                rooms.push({
                    id: roomId,
                    residents: roomResidents,
                    location: locationDisplay,
                    group: config.group,
                    unit: unitName
                });
            }
        });
    });
    return rooms;
})();

interface RiskProfile {
    missedProb: number;
    commentFailProb: number;
    tier: 'punctual' | 'good' | 'critical';
}

const getUnitProfile = (group: string, unit: string): RiskProfile => {
    // Critical: Cedar Intake (High volatility)
    if (unit.includes('Intake')) {
        return { missedProb: 0.180, commentFailProb: 0.65, tier: 'critical' };
    }

    // Punctual: Pine Honors (Best behavior)
    if (group === 'Pine') {
        return { missedProb: 0, commentFailProb: 0, tier: 'punctual' };
    }

    // Good: Everyone else
    return { missedProb: 0.02, commentFailProb: 0.1, tier: 'good' };
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
    const HISTORY_HOURS = 48;

    ROOMS.forEach((room, roomIdx) => {
        const officer = OFFICER_NAMES[roomIdx % OFFICER_NAMES.length];

        // For Live view, we want a realistic yet controlled distribution.
        // Force states based on profile to ensure 75% are "Good"
        const profile = getUnitProfile(room.group, room.unit);

        let targetDelta: number;
        const seed = roomIdx * 123 + 456;
        const rand = seededRandom(seed);

        if (profile.tier === 'punctual') {
            // Punctual: Forced to Upcoming (-15 to -6m)
            // NO Warning (Due soon), NO Alert (Missed)
            targetDelta = -Math.floor(seededRandom(seed + 1) * 10 + 6);
        } else if (profile.tier === 'good') {
            // Good: Upcoming or Due (-10 to 4m)
            // NO Alert (Missed)
            targetDelta = rand < 0.6
                ? -Math.floor(seededRandom(seed + 1) * 10 + 1) // Upcoming
                : Math.floor(seededRandom(seed + 1) * 5);      // Due
        } else {
            // Critical: Balanced mix including alerts
            if (rand < 0.2) {
                targetDelta = -Math.floor(seededRandom(seed + 1) * 10 + 1); // Upcoming
            } else if (rand < 0.5) {
                targetDelta = Math.floor(seededRandom(seed + 1) * 5);       // Due
            } else {
                targetDelta = Math.floor(seededRandom(seed + 1) * 40 + 5);  // Overdue
            }
        }

        const scheduledTime = new Date(now.getTime() - targetDelta * MS_PER_MINUTE);
        scheduledTime.setSeconds(0, 0);

        // Calculate how many minutes ago (positive) or in the future (negative) this check is
        const deltaMinutes = Math.floor((now.getTime() - scheduledTime.getTime()) / MS_PER_MINUTE);

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

        // Calculate missed check count
        let missedCheckCount = 0;
        if (liveStatus === 'overdue') {
            // 1 check is base. Additional checks every 15 mins if they are also > 5 mins overdue
            missedCheckCount = 1 + Math.max(0, Math.floor((deltaMinutes - 6) / 15));
        }

        // Add to Live data (ONE check per room)
        liveData.push({
            id: `live-${room.id}`,
            status: liveStatus,
            timerText,
            timerSeverity,
            location: room.location,
            residents: room.residents, // All residents
            hasHighRisk: room.residents.some((_, i) => (roomIdx + i) % 7 === 0),
            group: room.group,
            unit: room.unit,
            lastCheckTime: null,
            lastCheckOfficer: null,
            missedCheckCount,
            originalCheck: {
                id: `check-${room.id}`,
                type: 'scheduled',
                status: liveStatus === 'upcoming' ? 'pending' : (liveStatus === 'due' ? 'due' : 'missed'),
                residents: room.residents,
                dueDate: scheduledTime.toISOString(),
                generationId: 1,
                baseInterval: 15
            },
        });

        // Generate historical rows per resident
        room.residents.forEach((resident, resIdx) => {
            // Historical checks for this resident
            const historyStart = new Date(now.getTime() - HISTORY_HOURS * 60 * MS_PER_MINUTE);
            historyStart.setMinutes(scheduledTime.getMinutes(), 0, 0);

            let slotTime = new Date(historyStart);
            let slotIndex = 0;

            while (slotTime < scheduledTime) {
                const checkId = `hist-${room.id}-${resIdx}-${slotIndex}`;
                const scheduledTimeISO = slotTime.toISOString();

                const checkAgeHours = (now.getTime() - slotTime.getTime()) / (60 * 60 * 1000);
                const decayFactor = Math.exp(-checkAgeHours / 12);

                // Use resident specific seed
                const resSeed = slotIndex + roomIdx * 1000 + resIdx * 50;
                const randomVal = seededRandom(resSeed);
                const isMissed = randomVal < (profile.missedProb * decayFactor);

                const status: 'completed' | 'missed' = isMissed ? 'missed' : 'completed';
                const variance = isMissed ? Infinity : Math.floor(seededRandom(resSeed + 1) * 10) - 2;
                const actualTime = isMissed ? null : new Date(slotTime.getTime() + variance * MS_PER_MINUTE).toISOString();
                const officerNote = (slotIndex % 4 === 0) ? NOTE_SNIPPETS[slotIndex % NOTE_SNIPPETS.length] : undefined;

                const commentRandomVal = seededRandom(resSeed + 2);
                const commentThreshold = checkAgeHours < 4 ? 0.95 : (profile.commentFailProb * decayFactor);
                const shouldHaveComment = commentRandomVal > commentThreshold;

                const supervisorNote = isMissed
                    ? (shouldHaveComment ? 'Reviewed and documented.' : undefined)
                    : undefined;

                const supervisorName = supervisorNote ? 'Dave Thompson' : undefined;
                const reviewDate = supervisorNote ? new Date(slotTime.getTime() + 60 * MS_PER_MINUTE).toISOString() : undefined;

                historicalData.push({
                    id: checkId,
                    residents: [resident], // Single resident
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
                    supervisorName,
                    reviewDate,
                    reviewStatus: isMissed ? (supervisorNote ? 'verified' : 'pending') : 'verified',
                    hasHighRisk: (roomIdx + resIdx) % 7 === 0,
                });

                slotTime = new Date(slotTime.getTime() + CHECK_INTERVAL_MINS * MS_PER_MINUTE);
                slotIndex++;
            }

            // INJECT: If the current live status is 'overdue', we must add the "missed" checks to history.
            // The Live View aggregates these into "Missed (N)", but History needs individual rows.
            if (missedCheckCount > 0) {
                for (let m = 0; m < missedCheckCount; m++) {
                    // Calculate time for this specific missed check
                    // The first one (m=0) is at scheduledTime. Subsequent ones are +15m, +30m, etc.
                    const missedTime = new Date(scheduledTime.getTime() + m * CHECK_INTERVAL_MINS * MS_PER_MINUTE);
                    const checkId = `hist-${room.id}-${resIdx}-missed-${m}`; // Distinct ID

                    // These are RECENT missed checks, so they are likely unreviewed (pending).
                    // But to match the mock vibe, we'll leave them mostly unreviewed.
                    const supervisorNote = undefined;
                    const supervisorName = undefined;
                    const reviewDate = undefined;

                    historicalData.push({
                        id: checkId,
                        residents: [resident],
                        location: room.location,
                        scheduledTime: missedTime.toISOString(),
                        actualTime: null,
                        status: 'missed',
                        varianceMinutes: Infinity,
                        group: room.group,
                        unit: room.unit,
                        officerName: '', // Blank for missed
                        officerNote: undefined,
                        supervisorNote,
                        supervisorName,
                        reviewDate,
                        reviewStatus: 'pending',
                        hasHighRisk: (roomIdx + resIdx) % 7 === 0,
                    });
                }
            }
        });
    });

    return { liveData, historicalData };
};

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
                    if (filter.historicalStatusFilter === 'missed-all') {
                        filtered = filtered.filter(r => r.status === 'missed');
                    } else if (filter.historicalStatusFilter === 'missed-not-reviewed') {
                        filtered = filtered.filter(r => r.status === 'missed' && !r.supervisorNote);
                    } else if (filter.historicalStatusFilter === 'missed-reviewed') {
                        filtered = filtered.filter(r => r.status === 'missed' && !!r.supervisorNote);
                    } else if (filter.historicalStatusFilter === 'completed') {
                        filtered = filtered.filter(r => r.status === 'completed');
                    }
                }
                if (filter.startDate || filter.endDate) {
                    const checkDate = (iso: string) => iso.split('T')[0];
                    filtered = filtered.filter(r => {
                        if (filter.startDate) {
                            const date = checkDate(r.scheduledTime);
                            if (date < filter.startDate) return false;
                        }
                        if (filter.endDate) {
                            const date = checkDate(r.scheduledTime);
                            if (date > filter.endDate) return false;
                        }
                        return true;
                    });
                }

                // Advanced Fields
                if (filter.officer) {
                    filtered = filtered.filter(r =>
                        r.officerName.toLowerCase().includes(filter.officer.toLowerCase())
                    );
                }
                if (filter.startDate) {
                    filtered = filtered.filter(r => r.scheduledTime.split('T')[0] >= filter.startDate!);
                }
                if (filter.endDate) {
                    filtered = filtered.filter(r => r.scheduledTime.split('T')[0] <= filter.endDate!);
                }
                if (filter.enhancedObservation && filter.enhancedObservation !== 'any') {
                    filtered = filtered.filter(r => {
                        if (filter.enhancedObservation === 'has-any') return !!r.hasHighRisk || r.location.includes('MW');
                        if (filter.enhancedObservation === 'sr') return !!r.hasHighRisk;
                        if (filter.enhancedObservation === 'mw') return r.location.includes('MW'); // Mock logic
                        return true;
                    });
                }
                if (filter.commentFilter && filter.commentFilter !== 'any') {
                    filtered = filtered.filter(r => {
                        if (filter.commentFilter === 'has') return !!r.supervisorNote;
                        if (filter.commentFilter === 'none') return !r.supervisorNote;
                        return true;
                    });
                }
                if (filter.commentReason && filter.commentReason !== 'any') {
                    filtered = filtered.filter(r =>
                        r.supervisorNote && r.supervisorNote.startsWith(filter.commentReason)
                    );
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
