/**
 * Simulation Configuration & Operational Logic
 * 
 * Provides stable seeding, cadence management, and operational "stories"
 * to drive high-fidelity mock data.
 */

// Simple string hash for stable seeding
export const getStableHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export type OperationalMode = 'NORMAL' | 'SHIFT_CHANGE' | 'LOCKDOWN' | 'NIGHT';

export interface SimulationState {
    mode: OperationalMode;
    varianceMultiplier: number;
    missedProbabilityScale: number;
    noteProbabilityScale: number;
}

/**
 * Cadence Manager: Modulates facility behavior based on time of day
 */
export const getOperationalState = (timestamp: string): SimulationState => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Night Shift: 00:00 - 06:00
    if (hour < 6) {
        return {
            mode: 'NIGHT',
            varianceMultiplier: 0.5,
            missedProbabilityScale: 0.2,
            noteProbabilityScale: 0.5
        };
    }

    // Shift Changes: Spikes in variance/misses around 07:00, 15:00, 23:00
    const isShiftChange = (h: number, m: number) => {
        const h_mins = h * 60 + m;
        const shifts = [7 * 60, 15 * 60, 23 * 60];
        return shifts.some(s => h_mins >= s && h_mins <= s + 20);
    };

    if (isShiftChange(hour, minute)) {
        return {
            mode: 'SHIFT_CHANGE',
            varianceMultiplier: 3.5,
            missedProbabilityScale: 5.0,
            noteProbabilityScale: 0.8
        };
    }

    // Default Normal Day Operations
    return {
        mode: 'NORMAL',
        varianceMultiplier: 1.0,
        missedProbabilityScale: 1.0,
        noteProbabilityScale: 1.0
    };
};

/**
 * Story Controller: Coordinated events across units
 */
export const getActiveStory = (unit: string, timestamp: string): OperationalMode | null => {
    // Shared localStorage override for demos
    try {
        const override = localStorage.getItem('SIM_OVERRIDE');
        if (override) {
            interface SimOverride { mode: OperationalMode; target: string }
            const parsed = JSON.parse(override) as SimOverride;
            if (parsed.target === unit || parsed.target === 'ALL') {
                return parsed.mode;
            }
        }
    } catch { /* ignore */ }

    // Probabilistic Coordinated Event (e.g. a random 1-hour lockdown once a day in a specific unit)
    const seed = getStableHash(unit + new Date(timestamp).toDateString());
    const dayChance = (seed % 100) / 100;

    // 5% chance of a lockdown happening in any given unit on any given day
    if (dayChance < 0.05) {
        const hour = new Date(timestamp).getHours();
        const lockdownHour = seed % 24;
        if (hour === lockdownHour) return 'LOCKDOWN';
    }

    return null;
};
