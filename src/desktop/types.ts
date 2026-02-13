// src/desktop/types.ts

import { SafetyCheck, Resident, SafetyCheckReview } from '../types';

/** Desktop-specific view states */
export type DesktopView = 'live' | 'historical';

/** Historical check with audit fields */
export interface HistoricalCheck {
    id: string;
    correlationGuid?: string;
    residents: Resident[];
    location: string;

    // IA-Aligned Timestamps
    scheduledStartTime: string;
    scheduledEndTime: string;   // Maps to legacy 'scheduledTime'
    completedTime: string | null; // Maps to legacy 'actualTime'
    missedTime: string | null;

    // Legacy Display Fields (for backward compatibility)
    scheduledTime: string;      // Should be aliased to scheduledEndTime
    actualTime: string | null;  // Should be aliased to completedTime

    varianceMinutes: number;    // Positive = late, negative = early, Infinity = missed
    status: 'completed' | 'missed' | 'completed-late';

    roomIdMethod?: 'NFC' | 'QR_CODE' | 'MANUAL_ENTRY';
    group: string;
    unit: string;
    officerName: string;
    officerNote?: string;
    supervisorNote?: string;
    supervisorReview?: SafetyCheckReview; // Proper entity for reviews
    reviewStatus: 'pending' | 'verified';
    supervisorName?: string;
    reviewDate?: string;        // ISO string
    hasHighRisk?: boolean;      // Resident has suicide risk classification
}

/** Combined status filter for historical view */
export type HistoricalStatusFilter = 'all' | 'missed-all' | 'missed-not-reviewed' | 'missed-reviewed' | 'completed' | 'completed-late';

/** Status filter for live view */
export type LiveStatusFilter = 'all' | 'upcoming' | 'due' | 'overdue';

/** Time range presets for historical view */
export type TimeRangePreset = 'today' | 'last-24h' | 'last-12h' | 'last-8h' | 'last-72h' | 'custom';

/** Filter state for toolbar */
export interface DesktopFilter {
    facility: string;  // 'all' or facility ID
    group: string;     // 'all' or group ID
    unit: string;      // 'all' or unit ID
    search: string;    // Resident name search
    showMissedOnly: boolean;
    statusFilter: LiveStatusFilter;  // Live view status filter
    historicalStatusFilter: HistoricalStatusFilter[];  // Historical view combined status filter (Multi-select)
    timeRangePreset: TimeRangePreset;
    dateStart: string | null; // ISO Date string (YYYY-MM-DD)
    dateEnd: string | null;   // ISO Date string (YYYY-MM-DD)
    // Advanced Search Fields
    officer: string;
    startDate: string | null;
    endDate: string | null;
    enhancedObservation: 'any' | 'has-any' | 'sr' | 'mw';
    commentFilter: 'any' | 'has' | 'none';
    commentReason: string;
    // New Filters
    resident: string; // Name search
    reviewer: string; // Supervisor name search
}

/** Derived live check for table display */
export interface LiveCheckRow {
    id: string;
    status: 'due' | 'upcoming' | 'overdue';
    timerText: string;
    timerSeverity: 'alert' | 'warning' | 'info';
    location: string;
    residents: Resident[];
    hasHighRisk: boolean;
    riskType?: string;
    group: string;      // Group assignment
    unit: string;       // Unit identifier
    lastCheckTime: string | null;
    lastCheckOfficer: string | null;
    supervisorNote?: string;
    missedCheckCount?: number;
    originalCheck: SafetyCheck;
}

/** Supervisor note reason options */
export const SUPERVISOR_NOTE_REASONS = [
    'Unspecified',
    'Unit Lockdown',
    'Medical Emergency',
    'Court Appearance',
    'Transport',
    'Staff Shortage',
    'Other',
] as const;

export type SupervisorNoteReason = typeof SUPERVISOR_NOTE_REASONS[number];
