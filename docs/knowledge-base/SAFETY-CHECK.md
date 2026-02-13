# Safety Check Scheduling - Architecture Specification

**Status:** ARCHITECTURE - Ready for Implementation
**Date:** 2026-02-06 (Updated)
**Authors:** Christian Morin

---

## Executive Summary

**What:** Automated safety check system ensuring legal compliance for detention facilities through scheduled checks of detainees.

**How:** Safety check records are never modified after creation—system only creates new records (SCHEDULED, MISSED, COMPLETED). This append-only design provides complete audit trail for legal compliance.

**Key Design:** Each state transition creates a new record linked by `correlationGuid`. Records flow through states but are never updated.

**Three Core Operations:**
1. **Create SCHEDULED** - When detainee enter/exit room requiring checks, observation status changes, checks are performed
2. **Create MISSED** - Timer detects overdue checks (permanent audit record)
3. **Create COMPLETED** - Officer performs check via mobile app

**Business Benefits:**
- Legal compliance through complete audit trail
- Zero missed checks go undetected
- Officers use mobile PWA (works offline)
- Supervisors can review all missed checks

**Technical Approach:**
- New `SafetyCheck` entity with three states: SCHEDULED, MISSED, COMPLETED
- Background timer detects missed checks
- Mobile app syncs when online, server handles late completions
- All operations use transactions for consistency

---

## How to Read This Document

**📱 Product Owners / Business Stakeholders:**
Start here → Read in this order:
1. [Problem Space](#problem-space) - Why we're building this
2. [Core Concept](#core-concept) - High-level architecture approach
3. [Temporal Movement Handling](#temporal-movement-handling) - Handling past/future timestamps
4. [Use Case Analysis](#use-case-analysis) - Real-world scenarios (read TL;DR boxes)
5. Skip technical sections (Timer Behavior, Transaction Boundaries, Location Validation)

**👨‍💻 Developers / Architects:**
Start here → Read in this order:
1. [Executive Summary](#executive-summary) - Quick overview
2. [Core Concept](#core-concept) - Key principles
3. [Data Model](#data-model) - Entity structure
4. [Clock Skew Handling](#clock-skew-handling) - Server time sync (important for mobile app)
5. [Timer Behavior and Implementation](#timer-behavior-and-implementation) - Background processing
6. [Transaction Boundaries](#transaction-boundaries) - Concurrency handling
7. [Use Case Analysis](#use-case-analysis) - Implementation examples
8. [Appendix: Technical Details](#appendix-technical-details) - Location validation, etc.

**🧪 QA / Testing:**
Start here → Read in this order:
1. [Use Case Analysis](#use-case-analysis) - Test scenarios (in Appendix)

---

## Table of Contents

**Foundation**
- [Problem Space](#problem-space) - Background, goals, requirements
- [Core Concept](#core-concept) - Architecture approach and record lifecycle
- [System Configuration](#system-configuration) - Check intervals, timing, room settings
- [Scheduling Behavior](#scheduling-behavior) - When SCHEDULED records are created

**Behavior**

**Implementation Details**
- [Clock Skew Handling](#clock-skew-handling) - Server time sync for accurate timestamps
- [Temporal Movement Handling](#temporal-movement-handling) - Handling past/future timestamps

**Appendix**
- [Appendix: Technical Details](#appendix-technical-details) - Data model, use cases, location validation
- [Implementation Readiness](#implementation-readiness) - Status and next steps

---

## Problem Space

### Background

The Safety Check system ensures compliance with state law requiring regular visual checks of detainees at specified intervals. Check frequency varies based on:
- **Room type** (sleeping pods, medical cells, etc.)
- **Detainee observation level** (standard vs. enhanced observation)

**Current State:** Manual tracking leads to missed checks, incomplete audit trails, and compliance risk.

### System Goals

Implement an automated safety check system that:

1. **Automatic Scheduling** - Create SCHEDULED records when detainees enter/exit rooms requiring checks, observation status changes, or checks are completed
2. **Track Completion** - Officers complete checks via mobile PWA, creating COMPLETED records
3. **Detect Missed Checks** - Timer detects overdue checks and creates MISSED records for audit trail
4. **Complete Audit Trail** - All records (SCHEDULED, MISSED, COMPLETED) are never modified after creation, providing complete history for legal compliance
5. **Handle State Transitions** - Manage check lifecycle when detainees move between rooms

### Critical Requirements

- **Complete Audit Trail** - Every check (scheduled, missed, completed) permanently recorded for legal compliance
- **Zero Missed Detections** - Timer must detect missed checks within the configured evaluation delay
- **Offline Support** - Mobile app queues checks and syncs when reconnected

---

## Core Concept

Records are never modified after creation—the system only creates new records. This append-only design provides complete audit trail.

### Key Principles

**Core Concepts:**

-  **Immutability**: Records never change status after creation
-  **Three States Only**: SCHEDULED, MISSED, COMPLETED
-  **correlationGuid**: UUID field links related records (see "How correlationGuid works" section for details)

**Record Creation Rules:**

-  **Limited Creation Triggers**: New SCHEDULED records created only by:
    - Detainee entering a room requiring checks (`room.safetyCheckRequired = true`)
    - Check performed (creates COMPLETED + new SCHEDULED, if `room.safetyCheckRequired = true`)
    - Enhanced observation status change (creates new SCHEDULED, if `room.safetyCheckRequired = true`)
    - Detainee exits room requiring checks (creates SCHEDULED with `scheduledEndTime=NULL`)
-  **Timer Role**: Only creates MISSED records

**Operational Details:**

-  **MISSED Records**: Permanent audit trail requiring supervisor review - never superseded
-  **Mobile App Detainees Query**: Always show the most recent SCHEDULED check per detainee (by scheduledStartTime)
-  **Missed Evaluation Delay**: Configurable delay (e.g., 2-5 minutes) used by timer before marking overdue SCHEDULED as MISSED - allows time for mobile app syncing and network delays
-  **scheduledEndTime=NULL for No Checks Needed**: When detainee exits a room requiring checks, create SCHEDULED with scheduledStartTime=exitTime, scheduledEndTime=NULL

---

## System Configuration

The Safety Check system is configured through system properties, room settings, and lookup lists. Configuration controls check timing, when checks are marked as missed, which rooms require checks, and enhanced observation behavior.

### Feature Enablement

**Property:** `FACILITY_MANAGEMENT_SAFETY_CHECK_ENABLED`

**Purpose:** System-wide on/off switch for entire Safety Check feature

**Values:**
- `true` - Feature active (default)
- `false` - Feature disabled (no records created, timer stopped, APIs filtered)

**Scope:** Affects all facilities system-wide

**Impact:**
- When disabled, existing records preserved but read-only
- No new SCHEDULED, MISSED, or COMPLETED records created
- Mobile app does not display safety check functionality

### Check Intervals

Controls the maximum time allowed before a check becomes MISSED. Both normal and enhanced observation use the same scheduling formula: `scheduledEndTime = scheduledStartTime + MAXIMUM_INTERVAL`.

**Normal Observation**

**Property:** `FACILITY_MANAGEMENT_SAFETY_CHECK_MAXIMUM_INTERVAL`

**Purpose:** Maximum time before check is marked MISSED for standard observation

**Value:** Minutes (typically 15)

**Enhanced Observation**

**Property:** `FACILITY_MANAGEMENT_SAFETY_CHECK_ENHANCED_OBSERVATION_MAXIMUM_INTERVAL`

**Purpose:** Maximum time before check is marked MISSED for enhanced observation

**Value:** Minutes (typically 5)

**Impact:**
- SCHEDULED records created with `scheduledEndTime = scheduledStartTime + MAXIMUM_INTERVAL`
- After this time (plus missed evaluation delay), timer creates MISSED record
- Enhanced observation creates more frequent checks (shorter interval)
- Regulatory compliance requirement

**Architectural Note:** Enhanced observation is for detainees requiring more frequent monitoring due to medical, behavioral, or legal requirements.

### Missed Check Detection

**Property:** `FACILITY_MANAGEMENT_SAFETY_CHECK_MISSED_CHECK_DELAY`

**Purpose:** Delay after scheduled time before marking check as MISSED

**Value:** Minutes (typically 5)

**Rationale:**
- Prevents false MISSED records when mobile devices haven't synced yet
- Accounts for network delays, mobile sync latency
- Officers may complete check on time but sync arrives late to server

**Behavior:**
- Check due at 10:00 AM
- Timer waits until 10:05 AM (10:00 + 5 min delay) before creating MISSED record
- If check syncs before 10:05 AM, no MISSED record created

### Room Configuration

**Property:** `DetentionRoom.safetyCheckRequired` (boolean per room)

**Purpose:** Determines which rooms require safety checks

**Values:**
- `true` - Room requires safety checks (sleeping pods, medical cells, isolation)
- `false` - Room does not require safety checks (lunch room, visitation, offices)

### Lookup Lists

**Property:** `SAFETY_CHECK_ENHANCED_OBSERVATION`

**Purpose:** Defines enhanced observation classification options

**Impact:**
- Determines check frequency (uses enhanced observation interval)
- Officers can classify detainees requiring closer monitoring
- System uses appropriate interval based on classification

---

## Scheduling Behavior

Safety check scheduling is driven by detainee movements and officer actions. The system automatically creates SCHEDULED records when detainees enter rooms requiring checks, when checks are completed, or when observation levels change. Each SCHEDULED record defines a time window (`scheduledStartTime` to `scheduledEndTime`) during which a check must be performed. If a check is not completed within this window, the timer automatically creates a MISSED record for audit trail purposes.

### State Transitions

The system creates three types of records. Once created, records never change - new records are created for state transitions.

```
                    Timer detects overdue
┌─────────────┐    (after 5 min delay)     ┌─────────────┐
│  SCHEDULED  │ ─────────────────────────> │   MISSED    │
│             │                            │             │
│ Check due   │                            │ Check not   │
│ at 10:15 AM │                            │ performed   │
└─────────────┘                            │ at 11:00 AM │
       │                                   └─────────────┘
       │ Officer performs check
       │ via mobile app
       │
       v
┌─────────────┐
│  COMPLETED  │
│             │
│ Check done  │
│ at 10:13 AM │
└─────────────┘
       │
       │ Immediately creates
       │ next SCHEDULED
       v
┌─────────────┐
│  SCHEDULED  │
│             │
│ Next check  │
│ due 10:28   │
└─────────────┘
```

### When SCHEDULED Records Are Created

New SCHEDULED records are created by exactly **4 triggers**:

| Trigger | Behavior | Example |
|---------|----------|---------|
| **1. Room Entry** | Detainee enters room requiring checks | Enter sleeping pod at 10:00 → SCHEDULED for 10:15 |
| **2. Check Completed** | Officer finishes check via mobile app | Complete at 10:13 → SCHEDULED for 10:28 |
| **3. Observation Change** | Enhanced observation status changes | Normal→Enhanced at 11:00 → SCHEDULED for 11:05 (5 min) |
| **4. Room Exit** | Detainee leaves room requiring checks | Exit at 2:00 → SCHEDULED with NULL end time (no checks) |

**SCHEDULED with NULL end time** = No checks needed (detainee not in check-required room)

**Note:** Triggers only create SCHEDULED when `room.safetyCheckRequired = true` (see System Configuration section). All record creation operations (room movements, check completions, observation changes) are transactional to ensure data consistency.

---

## Clock Skew Handling

Mobile devices may have inaccurate clocks, leading to incorrect timestamps and UI display errors. The system addresses this through server time synchronization.

### Architecture

**Server Responsibility:**
- Provides current server time with every schedule response
- Stores client offset with completed checks (informational/audit only)
- Does not adjust or recalculate based on offset

**Client Responsibility:**
- Calculates offset between server time and device time
- Applies offset to all timestamps (UI display, completed records)
- Stores offset with each completed check for audit purposes

**Key Principle:** Client adjusts, server trusts. The offset is metadata for audit and diagnostics, not for server-side calculation.

### Benefits

**Accurate Timestamps:**
- Completed checks recorded with correct server time regardless of device clock accuracy
- UI displays accurate countdown timers and due/overdue status

**Audit Trail:**
- Offset stored with each completed record provides context for late checks
- Helps distinguish between actual late checks vs. device clock issues
- Enables detection of suspicious patterns (time manipulation)

**Operational Resilience:**
- Works offline using last known offset
- Handles moderate clock skew seamlessly
- No complex time synchronization protocols needed

---

## Temporal Movement Handling

### Overview

Users can record detainee movements with past or future timestamps (e.g., backdating a move to 30 minutes ago, or scheduling a move for 45 minutes in the future).

**Important Context:** The detainee movement system is designed to track the current location of detainees. Past and future timestamps are administrative tools for correcting data entry errors or planning purposes - not for scheduling actual movements. The Safety Check system adapts to these administrative timestamps to ensure they don't adversely affect detainee safety or create false compliance records.

### Architectural Decisions

The system implements the following temporal handling approach:

1. **Backdated movements ARE supported** - Users can record movements with past timestamps for administrative record-keeping
2. **Future-dated movements ARE supported** - Users can record movements with future timestamps for scheduled moves
3. **Schedules always start at NOW or later** - When movements are backdated, safety check schedules start at current time (not the past timestamp) to prevent creation of MISSED checks that were never actually scheduled
4. **Future schedules cleaned up** - If a new movement is recorded before a future-scheduled time arrives, the future SCHEDULED record is automatically removed (no longer valid)


---

## Appendix: Technical Details

### Data Model

<pre>
SafetyCheck (tSafetyCheck)
├── id: Long (PK, auto-increment) - Database-generated numerical ID
├── correlationGuid: String (UUID, indexed) - Loose connection to related records (NOT FK)
├── clientUniqueId: String (UUID, nullable, unique) - Client-generated ID for idempotency
├── detaineeId: long (FK to Detainee, not null, indexed)
├── detentionRoomId: long (FK to DetentionRoom, not null, indexed)
├── scheduledStartTime: Date (nullable) - When the check schedule window starts
├── scheduledEndTime: Date (nullable) - Max time before MISSED; NULL = no checks needed
├── enhancedObservation: boolean (not null) - Whether detainee was on enhanced observation
├── missedTime: Date (nullable, indexed) - When check was missed (MISSED records only)
├── completedTime: Date (nullable) - When check was completed (COMPLETED records only)
├── performedById: long (nullable) - Officer who performed check (COMPLETED only)
├── clientOffsetMs: Long (nullable) - Device clock offset for mobile app sync
├── status: SafetyCheckStatus enum (SCHEDULED, MISSED, COMPLETED, not null, indexed)
├── createdDate: Date (not null, audit) - Inherited from DomainObject
├── createdBy: String (not null, audit) - Inherited from DomainObject
├── roomIdMethod: SafetyCheckRoomIdMethod enum (NFC, QR_CODE, MANUAL_ENTRY, nullable)
├── residentStatus: String (lookup list, nullable) - Detainee status during check
├── facilityGroupId: long (not null, indexed) - Denormalized for query performance
├── facilityId: long (not null, indexed) - Denormalized for query performance
└── facilityUnitId: long (not null, indexed) - Denormalized for query performance

SafetyCheckMissedCheckReview (tSafetyCheckMissedCheckReview) - Supervisor review of missed checks
├── id: Long (PK, auto-increment)
├── safetyCheckId: Long (FK to SafetyCheck.id, not null, unique) - Links to MISSED record (1:1 relationship)
├── reason: String (not null) - Reason for missed check
├── notes: String (nullable, max 2000 chars) - Additional notes explaining missed check
├── reviewedById: Long (not null) - User ID of supervisor who performed review
├── reviewedDate: Date (not null) - When review was performed
├── createdDate: Date (not null, audit) - Inherited from DomainObject
└── createdBy: String (not null, audit) - Inherited from DomainObject

**Relationship:** 1:1 with SafetyCheck (unique constraint on safetyCheckId)
- Each MISSED check can have exactly one review
- Unique constraint enforces one review per missed check
- Supervisor must provide reason (required field)
</pre>

**Field Usage by Status:**

| Status | correlationGuid | scheduledStartTime | scheduledEndTime | enhancedObservation | missedTime | completedTime | performedById | clientOffsetMs | clientUniqueId |
|--------|-----------------|-------------------|------------------|---------------------|------------|---------------|---------------|----------------|----------------|
| SCHEDULED | Set (new UUID) | Set (schedule window start) | Set (max time before MISSED) | Set (from detainee status) | NULL | NULL | NULL | NULL | NULL |
| MISSED | Copied from SCHEDULED | Copied from SCHEDULED | Copied from SCHEDULED | Copied from SCHEDULED | Set (when missed) | NULL | NULL | NULL | NULL |
| COMPLETED | Copied from SCHEDULED (or NULL) | Copied from SCHEDULED | Copied from SCHEDULED | Copied from SCHEDULED | NULL | Set (when performed) | Set (officer) | Set (device offset) | Set (mobile app) |

**scheduledStartTime Field:**
- **Purpose:** When the check schedule window starts (beginning of the check interval)
- **Set by:** Server when creating SCHEDULED record
- **Value:** Time when schedule window begins (e.g., when previous check completed, when detainee entered room, or when detainee exited room)
- **Example:** Check completed at 12:00 → scheduledStartTime=12:00, scheduledEndTime=12:15 (for 15-min interval)
- **Example (no checks):** Detainee exits room at 1:50 PM → scheduledStartTime=1:50, scheduledEndTime=NULL
- **Note:** This is NOT the same as createdDate (record might be created at 12:02 due to processing, but scheduledStartTime is still 12:00)

**enhancedObservation Field:**
- **Purpose:** Indicates detainee's observation level when SCHEDULED was created
- **Set by:** Server based on detainee's observation status at SCHEDULED creation time
- **Value:** true = enhanced observation (shorter interval, e.g., 5 min), false = normal observation (e.g., 15 min)
- **Used by Timer:** Determines check interval (MISSED_INTERVAL) for calculating multiple MISSED records
- **Used by Mobile App:** Display visual indicator (e.g., badge/highlight) for high-priority checks
- **Immutable:** Never changes after creation (reflects observation level at that moment)
- **Note:** Even for scheduledEndTime=NULL records, captures detainee's observation status at creation time

**clientUniqueId Field:**
- **Purpose:** Idempotency for mobile app check submissions
- **Set by:** Mobile app when creating COMPLETED record (UUID generated before submission)
- **Value:** NULL for SCHEDULED and MISSED records (server-generated)
- **Constraint:** Unique (allows NULL, but no duplicate non-NULL values)
- **Usage:** Prevents duplicate COMPLETED records if mobile app retries submission

**Special Case - scheduledEndTime=NULL:**
- **Created when:** Detainee exits room requiring checks (Trigger #4)
- **Status:** SCHEDULED (with scheduledStartTime=exitTime, scheduledEndTime=NULL)
- **Purpose:** Signals timer and mobile app that no checks needed for this detainee
- **scheduledStartTime:** Always set to the exit time
- **scheduledEndTime Normal meaning:** The maximum time by which check must be completed before becoming MISSED (after missed evaluation delay)
- **scheduledEndTime NULL meaning:** No checks needed - detainee not in a room requiring safety checks
- **Timer behavior:** Skips immediately (no location validation needed)
- **Mobile app behavior:** Filters out from detainee list or ignores client-side
- **Note:** If detainee enters room requiring checks, new SCHEDULED with actual scheduledEndTime is created (supersedes the NULL one)

**Important Design Decisions:**

**Why correlationGuid is NOT a foreign key:**
- It's a loose connection between events, not a hard constraint
- Allows flexibility: offline COMPLETED checks may have correlationGuid = NULL
- Audit trail maintained through correlation, not database constraints

**When to use FK vs correlationGuid:**
- **SafetyCheckReview → SafetyCheck**: Uses proper FK (`safetyCheckId`) because review directly references a specific check record
- **SafetyCheck → SafetyCheck**: Uses correlationGuid (NOT FK) because it's a loose business logic connection between check events

**Why scheduledEndTime in COMPLETED/MISSED:**
- Allows easy lateness calculation without joins
- COMPLETED: `completedTime - scheduledEndTime` = how late
- MISSED: For recurring missed checks, `scheduledEndTime` stays constant (original schedule) while `missedTime` increments by check interval

**Why separate performedById and createdBy:**
- `performedById` = officer who physically performed the safety check (COMPLETED only)
- `createdBy` = system user/process that created the DB record (timer, officer, sync process)

**How correlationGuid works:**

**Key Principle:** **Only SCHEDULED records generate new correlationGuid** (always server-generated). COMPLETED and MISSED records use existing correlationGuid from SCHEDULED, or NULL if no SCHEDULED available.

**How correlationGuid links records:**
- **SCHEDULED**: Has its own correlationGuid (server-generated, always new UUID)
- **MISSED**: Uses same correlationGuid as the SCHEDULED it marks as missed
- **COMPLETED (normal)**: Uses same correlationGuid as the SCHEDULED it fulfills (from synced list)
- **COMPLETED (Edge case - no sync)**: May have correlationGuid = NULL
- All records related to same check event share the same correlationGuid

---

## Use Case Analysis

> **TL;DR:** Six real-world scenarios showing how the safety check system handles: (1) on-time checks, (2) single missed check, (3) multiple missed checks with backfill, (4) offline check completion creating false MISSED, (5) late offline check, (6) enhanced observation changes, and (7) detainee exiting rooms. Each shows exact record creation with all field values. **Key pattern:** Records never change after creation - new records are always created for state transitions.

### UC-1: Standard Check Flow (On-Time Check)

**Scenario:**
- Detainee enters sleeping pod at 10:00 AM
- Officer performs check on time at 10:13 AM (before scheduled time of 10:15 AM)
- Next check scheduled for 10:28 AM

**Flow:**

<pre>
10:00 AM - Detainee enters room
  → Create SCHEDULED:
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
     <b style="color: #0066cc">scheduledStartTime=10:00</b>, <b style="color: #0066cc">scheduledEndTime=10:15</b>,
     missedTime=NULL, completedTime=NULL, performedById=NULL

10:13 AM - Officer Jane (userId=456) performs check on time (submits GUID-A):
  → Create COMPLETED:
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
     <b style="color: #0066cc">scheduledStartTime=10:00</b>, <b style="color: #0066cc">scheduledEndTime=10:15</b>,
     missedTime=NULL, <b style="color: #0066cc">completedTime=10:13</b>, performedById=456
  → Create SCHEDULED:
     <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
     <b style="color: #0066cc">scheduledStartTime=10:13</b>, <b style="color: #0066cc">scheduledEndTime=10:28</b>,
     missedTime=NULL, completedTime=NULL, performedById=NULL

Mobile app query at 10:14 AM:
  → Returns most recent SCHEDULED (<b style="color: #0066cc">GUID-B</b>, <b style="color: #0066cc">scheduledEndTime=10:28</b>)
</pre>

**Result:**
- Check was on time: `completedTime (10:13) < scheduledEndTime (10:15)` - 2 minutes early
- No MISSED record created
- New SCHEDULED created for next check at 10:28

---

### UC-2: Missed Check Detection and Recovery (Single MISSED)

**Scenario:**
- Check scheduled for 11:00 AM
- Officer doesn't perform it on time
- Timer marks it MISSED at 11:02 AM (after missed evaluation delay)
- Officer performs check at 11:10 AM

**Flow:**

<pre>
Before 11:00 AM:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
             missedTime=NULL, completedTime=NULL, performedById=NULL

11:02 AM - Timer runs (after missed evaluation delay):
  → Create MISSED:
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
     <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
     <b style="color: #0066cc">missedTime=11:00</b>, completedTime=NULL, performedById=NULL

Mobile app query at 11:05 AM:
  → Returns most recent SCHEDULED (<b style="color: #0066cc">GUID-A</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b> - already past due)

11:10 AM - Officer Jane (userId=456) performs check (submits GUID-A):
  → Create COMPLETED:
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
     <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
     missedTime=NULL, <b style="color: #0066cc">completedTime=11:10</b>, performedById=456
  → Create SCHEDULED:
     <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
     <b style="color: #0066cc">scheduledStartTime=11:10</b>, <b style="color: #0066cc">scheduledEndTime=11:25</b>,
     missedTime=NULL, completedTime=NULL, performedById=NULL
</pre>

**Result:**
- Check was 10 minutes late: `completedTime (11:10) - scheduledEndTime (11:00) = 10 min`
- MISSED record shows it was missed at missedTime=11:00
- All records linked via correlationGuid=GUID-A

**Supervisor Review:**
- Sees MISSED record (missedTime=11:00)
- Also sees COMPLETED record (completedTime=11:10, performedById=456)
- Can add note: "Check performed 10 minutes late, officer was delayed"

---

### UC-2B: Multiple Missed Checks (Extended Absence)

**Scenario:**
- Check scheduled for 11:00 AM
- Officer never performs check
- Timer creates ALL missing MISSED records

**Scenario A: Normal Operation (Incremental MISSED Creation)**

Timer runs every 1 minute, check is missed for 50 minutes:

<pre>
Before 11:00 AM:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>

11:02 AM - Timer runs (after 2-min missed evaluation delay):
  → Find most recent MISSED with correlationGuid=GUID-A: None found
  → Calculate missedTime = 11:00 (SCHEDULED.scheduledEndTime)
  → Create MISSED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                   <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                   <b style="color: #0066cc">missedTime=11:00</b>

11:17 AM - Timer runs again:
  → Find most recent MISSED: <b style="color: #0066cc">missedTime=11:00</b>
  → Calculate missedTime = 11:15 (11:00 + 15 min)
  → Create MISSED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                   <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                   <b style="color: #0066cc">missedTime=11:15</b>

11:32 AM - Timer runs again:
  → Find most recent MISSED: <b style="color: #0066cc">missedTime=11:15</b>
  → Calculate missedTime = 11:30 (11:15 + 15 min)
  → Create MISSED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                   <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                   <b style="color: #0066cc">missedTime=11:30</b>

11:50 AM - Officer Jane (userId=456) finally performs check (submits GUID-A):
  → Create COMPLETED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                      <b style="color: #0066cc">completedTime=11:50</b>, performedById=456
  → Create SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=11:50</b>, <b style="color: #0066cc">scheduledEndTime=12:05</b>
</pre>

**Note:** All MISSED records have **scheduledEndTime=11:00** (original scheduled time), but **missedTime** increments by 15 minutes.

**Scenario B: System Downtime (Backfill)**

Timer was down, comes back online after 1 hour:

<pre>
Before 11:00 AM:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
             enhancedObservation=false

[System down from 11:00 AM to 12:00 PM]

12:00 PM - Timer runs after system recovery:
  → Find most recent MISSED with correlationGuid=GUID-A: None found
  → Determine MISSED_INTERVAL: enhancedObservation=false → 15 minutes (normal observation)
  → Calculate missedTime = 11:00 (SCHEDULED.scheduledEndTime)
  → Calculate MISSED records that should exist:
     currentCheckTime = 11:00
     WHILE currentCheckTime + MISSED_EVALUATION_DELAY <= 12:00:
       - 11:00 + 2 min = 11:02 <= 12:00 ✓ → Add 11:00 to list
       - 11:15 + 2 min = 11:17 <= 12:00 ✓ → Add 11:15 to list
       - 11:30 + 2 min = 11:32 <= 12:00 ✓ → Add 11:30 to list
       - 11:45 + 2 min = 11:47 <= 12:00 ✓ → Add 11:45 to list
       - 12:00 + 2 min = 12:02 > 12:00 ✗ → Exit loop
  → Create ALL 4 MISSED records in single transaction:
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
       <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
       enhancedObservation=false, <b style="color: #0066cc">missedTime=11:00</b>
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
       <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
       enhancedObservation=false, <b style="color: #0066cc">missedTime=11:15</b>
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
       <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
       enhancedObservation=false, <b style="color: #0066cc">missedTime=11:30</b>
     <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
       <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
       enhancedObservation=false, <b style="color: #0066cc">missedTime=11:45</b>

12:05 PM - Officer Jane (userId=456) performs check (submits GUID-A):
  → Create COMPLETED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                      <b style="color: #0066cc">completedTime=12:05</b>, performedById=456
  → Create SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=12:05</b>, <b style="color: #0066cc">scheduledEndTime=12:20</b>
</pre>

**Result:**
- **Scenario A**: MISSED records created incrementally as timer runs frequently
- **Scenario B**: All MISSED records backfilled in single timer run
- Both scenarios produce identical results:
  - GUID-2 at 11:00 (when check was due)
  - GUID-3 at 11:15 (15 min after first missed)
  - GUID-4 at 11:30 (15 min after second missed)
  - GUID-5 at 11:45 (15 min after third missed)
- MISSED.missedTime reflects **when check was due** (11:00, 11:15, 11:30, 11:45)
- Both scenarios produce identical results for compliance

**Supervisor Review:**
- Sees 4 MISSED records (GUID-2, 3, 4, 5) - all for same SCHEDULED
- Shows severity: check was missed for 48 minutes
- Also sees GUID-6 (COMPLETED) - officer eventually performed check
- Can add notes to explain the extended delay

**Timer Logic:**
- Check if 15 min has passed since last MISSED for this SCHEDULED
- Create new MISSED if yes

---

### UC-3: On-Time Check Completed Offline (False MISSED)

**Scenario:**
- Check scheduled for 10:00 AM
- Officer performs check on time at 9:58 AM but offline
- Timer marks MISSED at 10:02 AM (doesn't know about offline check)
- Device comes online at 10:15 AM and syncs completion

**Flow:**

<pre>
Before 10:00 AM:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=9:45</b>, <b style="color: #0066cc">scheduledEndTime=10:00</b>

9:58 AM - Officer Jane (userId=456) performs check on time but offline (submits GUID-A):
  [Queued locally on device - check done BEFORE scheduledEndTime]

10:02 AM - Timer runs (device still offline):
  → Create MISSED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                   <b style="color: #0066cc">scheduledStartTime=9:45</b>, <b style="color: #0066cc">scheduledEndTime=10:00</b>,
                   <b style="color: #0066cc">missedTime=10:00</b>

10:15 AM - Device comes online, syncs completion:
  → Create COMPLETED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=9:45</b>, <b style="color: #0066cc">scheduledEndTime=10:00</b>,
                      <b style="color: #0066cc">completedTime=9:58</b>, performedById=456
  → Create SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=9:58</b>, <b style="color: #0066cc">scheduledEndTime=10:13</b>
</pre>

**Result:**
- Check was actually on time: `completedTime (9:58) < scheduledEndTime (10:00)` - 2 minutes early
- MISSED record exists because timer didn't know about offline check
- COMPLETED record shows check was done on time (completedTime=9:58)
- Both MISSED and COMPLETED exist for same correlationGuid (supervisor can see it was a false positive)

**Supervisor Review:**
- Sees MISSED record (missedTime=10:00)
- Also sees COMPLETED record (completedTime=9:58, performedById=456)
- Can determine it was false MISSED due to offline sync delay
- Check was actually completed 2 minutes early

---

### UC-4: Late Check Completion (Offline Mobile Sync)

**Scenario:**
- Check scheduled for 11:00 AM
- Officer performs check late at 11:02 AM but offline
- Timer marks MISSED at 11:01 AM
- Device comes online at 11:15 AM and syncs completion

**Flow:**

<pre>
Before 11:00 AM:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,

11:01 AM - Timer runs:
  → Create MISSED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                   <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                   <b style="color: #0066cc">missedTime=11:00</b>

11:02 AM - Officer Jane (userId=456) performs check offline (submits GUID-A):
  [Queued locally on device - check done AFTER scheduledEndTime]

11:15 AM - Device comes online, syncs completion:
  → Create COMPLETED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=10:45</b>, <b style="color: #0066cc">scheduledEndTime=11:00</b>,
                      <b style="color: #0066cc">completedTime=11:02</b>, performedById=456,
  → Create SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=11:02</b>, <b style="color: #0066cc">scheduledEndTime=11:17</b>,
</pre>

**Result:**
- Check was 2 minutes late: `completedTime (11:02) - scheduledEndTime (11:00) = 2 min`
- MISSED record is valid (check was actually late)
- Both MISSED and COMPLETED exist for same correlationGuid

**Supervisor Review:**
- Sees MISSED record (missedTime=11:00) - valid
- Also sees COMPLETED record (completedTime=11:02, performedById=456)
- Check was legitimately 2 minutes late

---

### UC-5: Enhanced Observation Status Change

**Scenario:**
- Detainee in cell, checks every 15 minutes
- Current SCHEDULED check at 11:15 AM
- At 11:05 AM, detainee classified as enhanced observation (5-minute checks)

**Flow:**

<pre>
Before 11:05 AM:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=11:00</b>, <b style="color: #0066cc">scheduledEndTime=11:15</b>,
             <b style="color: #0066cc">enhancedObservation=false</b>,

11:05 AM - Enhanced observation status changes:
  → Create SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
                      <b style="color: #0066cc">scheduledStartTime=11:05</b>, <b style="color: #0066cc">scheduledEndTime=11:10</b>,
                      <b style="color: #0066cc">enhancedObservation=true</b>,

  Note: GUID-A still exists

11:11 AM - Timer runs:
  → Query most recent SCHEDULED for detainee: Returns <b style="color: #0066cc">GUID-B</b> (scheduledStartTime=11:05)
  → GUID-B is overdue (<b style="color: #0066cc">scheduledEndTime=11:10</b>, current time=11:11, past missed evaluation delay)
  → Determine MISSED_INTERVAL: <b style="color: #0066cc">enhancedObservation=true</b> → 5 minutes
  → Validate detainee location: Still in same room
  → Create MISSED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=5,
                   <b style="color: #0066cc">scheduledStartTime=11:05</b>, <b style="color: #0066cc">scheduledEndTime=11:10</b>,
                   <b style="color: #0066cc">enhancedObservation=true</b>, <b style="color: #0066cc">missedTime=11:10</b>,
  → GUID-A automatically ignored (not most recent)
</pre>

**Result:**
- GUID-A: SCHEDULED (original, preserved)
- GUID-B: SCHEDULED (current, with enhanced observation frequency)
- MISSED created for GUID-B only, not GUID-A

**Key Insight:**
- Timer automatically processes only the current SCHEDULED (see Timer Behavior section)
- Original SCHEDULED preserved showing frequency change

---

### UC-6: Detainee Exits Room Requiring Checks

**Scenario:**
- Detainee in sleeping pod (safetyCheckRequired = true), checks every 15 minutes
- Current SCHEDULED check at 2:00 PM
- At 1:50 PM, detainee moves to lunch room (safetyCheckRequired = false)

**Flow:**

<pre>
1:45 PM - Current state:
  SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-A</b>, detaineeId=123, detentionRoomId=5,
             <b style="color: #0066cc">scheduledStartTime=1:45</b>, <b style="color: #0066cc">scheduledEndTime=2:00</b>,

1:50 PM - Detainee moves to lunch room (Trigger #4: Exit room requiring checks):
  → Detainee exits sleeping pod (safetyCheckRequired=true)
  → Enters lunch room (safetyCheckRequired=false)
  → Create SCHEDULED: <b style="color: #0066cc">correlationGuid=GUID-B</b>, detaineeId=123, detentionRoomId=10,
                      <b style="color: #0066cc">scheduledStartTime=1:50</b>, <b style="color: #0066cc">scheduledEndTime=NULL</b> (no checks needed),

1:55 PM - Timer runs:
  → Query most recent SCHEDULED for detainee 123: Returns <b style="color: #0066cc">GUID-B</b>
  → Check scheduledEndTime: <b style="color: #0066cc">NULL</b>
  → Skip immediately (no location validation needed)

Mobile app query at 1:55 PM:
  → Query most recent SCHEDULED for detainee 123: Returns <b style="color: #0066cc">GUID-B</b>
  → <b style="color: #0066cc">scheduledEndTime=NULL</b> → Filter out detainee 123 (no checks needed)
</pre>

**Result:**
- GUID-A: SCHEDULED (superseded when detainee moved to lunch room)
- GUID-B: SCHEDULED with scheduledEndTime=NULL (signals no checks needed)
- Timer skips detainee 123 efficiently (no repeated location validation)
- Mobile app doesn't show detainee 123 in check list
- If detainee returns to sleeping pod later, Trigger #1 creates new SCHEDULED with actual scheduledEndTime

**Key Benefit:**
- Without this mechanism, timer would repeatedly check location for GUID-A every timer run
- With scheduledEndTime=NULL, timer skips immediately after single check

---
### Location Validation Algorithm

> **TL;DR:** Before creating MISSED records, timer verifies detainee was actually in the room at scheduled time by querying `DetentionLocationTracking`. Prevents false MISSED records when detainee moved rooms or left facility. If location can't be confirmed or detainee was elsewhere, skip creating MISSED.

**Purpose:** Prevent "noise" MISSED records when detainees have moved rooms or been released.

**Data Source:** `DetentionLocationTracking` entity (fields: `detainee`, `currentRoom`, `type`, `startDateTime`, `endDateTime`)

**Algorithm:**
<pre>
Step 1: Find actual location at scheduled time (TEMPORARY takes precedence over DEFAULT)
  Find DetentionLocationTracking where:
    - detainee = SCHEDULED.detainee
    - startDateTime <= SCHEDULED.scheduledEndTime
    - (endDateTime IS NULL OR endDateTime > SCHEDULED.scheduledEndTime)
    - ORDER BY: type DESC, startDateTime DESC
    - LIMIT 1

Step 2: Validate location matches
  If found_record.currentRoom == SCHEDULED.room:
    → Create MISSED (detainee was in scheduled room)
  Else:
    → Skip MISSED (detainee was elsewhere or location unknown)
</pre>

**Key Edge Cases:**

| Scenario | Decision | Rationale |
|----------|----------|-----------|
| **NULL endDateTime** (detainee still in room) | ✅ Create MISSED | Detainee was in room at scheduled time |
| **Location history gap** (no record found) | ❌ Skip MISSED | Cannot confirm location; data integrity issue |
| **Detainee moved rooms** | ❌ Skip MISSED | New SCHEDULED created for new room |
| **Detainee released** (no subsequent records) | ❌ Skip MISSED | Detainee left facility |
| **TEMPORARY overrides DEFAULT** | Use TEMPORARY | Actual physical location takes precedence |
| **Multiple overlapping records** | ✅ Create MISSED | Data issue but detainee was in room |

