# Check System Protocol (End-to-End)

This document defines the lifecycle of a safety check from both the Officer (Mobile) and Supervisor (Desktop) perspectives, ensuring consistency across the platform.

## 1. Persona Lifecycle Mapping

| State (System) | Officer Threshold (Mobile) | Supervisor Status (Desktop) | Visual Severity |
|:---|:---|:---|:---|
| **Early** | 0m - 10m elapsed | `Upcoming` | Neutral |
| **Near Due** | 10m - 13m elapsed | `Upcoming` / `Due` | Neutral / Warning |
| **Due Window** | 13m - 15m elapsed | `Due` | Warning (Amber) |
| **Hard Deadline** | ≥ 15m elapsed | `Overdue` | Alert (Red) |

## 2. Event Synchronization

### Check Completion (Officer)
1. **Trigger**: Officer scans NFC/QR or submits manual form on mobile.
2. **System Action**: Record `actualTime`, calculate `varianceMinutes`.
3. **Supervisor Update**: 
   - Row moves from **Live Monitor** to **Historical Review**.
   - Status marked as `Completed`.
   - If variance > 2m, flagged as "Late" (Informational).

### Check Missed (Officer)
1. **Trigger**: System timer exceeds 15m interval without check.
2. **System Action**: Automatically record a `missed` event.
3. **Supervisor Update**:
   - Live View: Marked as `Overdue` (Highest priority).
   - Historical View: Appears as `Missed - No Comment`.
   - Trigger: Requires Supervisor explanation/note.

## 3. The "Other Side" Relationship

The Desktop Dashboard serves as the **Verification Layer** for the Mobile App's **Execution Layer**.

- **Visibility**: Every action (or inaction) on the mobile device is reflected in real-time (within ~30s sync window) on the Desktop.
- **Actionability**: While the Officer *performs* the check, the Supervisor *validates* the completion, especially for missed or late entries.
- **Audit Trail**: The system maintains a deterministic link between the scheduled window, the officer's scan, and any subsequent supervisor review.
