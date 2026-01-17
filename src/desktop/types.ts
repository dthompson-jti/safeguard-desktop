// src/desktop/types.ts

import { SafetyCheck, Resident } from '../types';

/** Desktop-specific view states */
export type DesktopView = 'live' | 'historical';

/** Historical check with audit fields */
export interface HistoricalCheck {
    id: string;
    residents: Resident[];
    location: string;
    scheduledTime: string;      // ISO string - when check was scheduled
    actualTime: string | null;  // ISO string or null if missed
    varianceMinutes: number;    // Positive = late, negative = early, Infinity = missed
    status: 'completed' | 'missed';
    group: string;
    unit: string;
    officerName: string;
    officerNote?: string;
    supervisorNote?: string;
    reviewStatus: 'pending' | 'verified';
    hasHighRisk?: boolean;      // Resident has special risk classification
}

/** Combined status filter for historical view */
export type HistoricalStatusFilter = 'all' | 'missed-uncommented' | 'missed-commented' | 'completed';

/** Status filter for live view */
export type LiveStatusFilter = 'all' | 'upcoming' | 'due' | 'overdue';

/** Time range presets for historical view */
export type TimeRangePreset = 'today' | 'last-24h' | 'last-8h' | 'last-7d' | 'custom';

/** Filter state for toolbar */
export interface DesktopFilter {
    facility: string;  // 'all' or facility ID
    group: string;     // 'all' or group ID
    unit: string;      // 'all' or unit ID
    search: string;    // Resident name search
    showMissedOnly: boolean;
    statusFilter: LiveStatusFilter;  // Live view status filter
    historicalStatusFilter: HistoricalStatusFilter;  // Historical view combined status filter
    timeRangePreset: TimeRangePreset;
    dateStart: string | null; // ISO Date string (YYYY-MM-DD)
    dateEnd: string | null;   // ISO Date string (YYYY-MM-DD)
    // Advanced Search Fields
    officer: string;
    afterDate: string | null;
    beforeDate: string | null;
    specialStatus: 'any' | 'sr' | 'mw';
    commentFilter: 'any' | 'has' | 'none';
    commentSearch: string;
}

/** Derived live check for table display */
export interface LiveCheckRow {
    id: string;
    status: 'due' | 'upcoming' | 'overdue';
    timerText: string;
    timerSeverity: 'alert' | 'warning' | 'neutral';
    location: string;
    residents: Resident[];
    hasHighRisk: boolean;
    riskType?: string;
    group: string;      // Group assignment
    unit: string;       // Unit identifier
    lastCheckTime: string | null;
    lastCheckOfficer: string | null;
    supervisorNote?: string;
    originalCheck: SafetyCheck;
}

/** Supervisor note reason options */
export const SUPERVISOR_NOTE_REASONS = [
    'Unit Lockdown',
    'Medical Emergency',
    'Court Appearance',
    'Transport',
    'Staff Shortage',
    'Other',
] as const;

export type SupervisorNoteReason = typeof SUPERVISOR_NOTE_REASONS[number];
