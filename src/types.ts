// src/types.ts

export type SafetyCheckStatus =
  | 'early'      // 0-13m (internal, shows "Upcoming" in UI)
  | 'pending'    // 0-13m (internal, shows "Upcoming" in UI)
  | 'due'        // 13-15m (warning/yellow)
  | 'missed'     // 15m+ (alert/red)
  | 'completing'
  | 'complete'
  | 'queued';

export type SafetyCheckType = 'scheduled' | 'supplemental';

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
}

export interface SafetyCheck {
  id: string;
  type: SafetyCheckType;
  residents: Resident[];
  status: SafetyCheckStatus;
  dueDate: string; // ISO Date String
  specialClassifications?: SpecialClassification[];

  // Optional fields for completed/historical checks
  lastChecked?: string; // ISO Date String
  notes?: string;

  // Lifecycle Fields
  generationId: number; // 1, 2, 3... The iteration count for this room
  baseInterval: number; // Minutes between checks (e.g., 15)
}
