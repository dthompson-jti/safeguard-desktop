// src/types.ts

export type SafetyCheckStatus =
  | 'early'      // 0-13m (internal, shows "Upcoming" in UI)
  | 'pending'    // 0-13m (internal, shows "Upcoming" in UI)
  | 'due'        // 13-15m (warning/yellow)
  | 'missed'     // 15m+ (alert/red)
  | 'completing'
  | 'complete'
  | 'completed-late' // New status for late completions
  | 'queued';

export type SafetyCheckType = 'scheduled' | 'supplemental';

export type RoomIdMethod = 'NFC' | 'QR_CODE' | 'MANUAL_ENTRY';

export interface SpecialClassification {
  type: string;
  details: string;
  residentId: string;
}

export interface Resident {
  id: string;
  name: string;
  location: string;
  hasHighRisk?: boolean; // Added for per-resident risk display
  hasMedicalWatch?: boolean; // Added for per-resident MW display
  otherRisks?: string[]; // Additional risks (Flight Risk, Assaultive, etc)
}

export interface SafetyCheckReview {
  id: string;
  safetyCheckId: string;
  reason: string;
  notes?: string;
  reviewedById: string;
  reviewedDate: string; // ISO Date String
}

export interface SafetyCheck {
  id: string;
  correlationGuid?: string; // Links related check events (SCHEDULED -> MISSED -> COMPLETED)
  clientUniqueId?: string; // For mobile idempotency
  type: SafetyCheckType;
  residents: Resident[];
  status: SafetyCheckStatus;

  // Timing Model (IA Aligned)
  scheduledStartTime: string; // ISO Date String
  scheduledEndTime: string;   // ISO Date String (Max time before MISSED)
  completedTime?: string;     // ISO Date String
  missedTime?: string;        // ISO Date String

  // Audit & Method
  roomIdMethod?: RoomIdMethod;
  clientOffsetMs?: number;

  // Legacy/UI Compatibility (to be phased out or aliased)
  dueDate: string; // Alias for scheduledEndTime
  lastChecked?: string; // Alias for completedTime

  specialClassifications?: SpecialClassification[];
  notes?: string;

  // Lifecycle Fields
  generationId: number; // 1, 2, 3... The iteration count for this room
  baseInterval: number; // Minutes between checks (e.g., 15)
  supervisorReview?: SafetyCheckReview; // Attached review for MISSED checks
}
