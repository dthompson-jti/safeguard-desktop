# Architecture Specification - Unit Compliance Refinement
(Archived 2026-01-18)

Refine the mock data engine to support "Exemplary" units with 0% missed rates and high-punctuality Live views.

## 3-Tier Compliance System
| Tier | Missed Prob | Live Status | Target Units |
| :--- | :--- | :--- | :--- |
| **Perfectly Punctual** | 0% | **Upcoming Only** (-6 to -14m) | Delta 1-3 |
| **Operational Good** | 0% | Upcoming/Due Mix (no Alert) | Alpha 2-3, Beta 1-3, Gamma 3 |
| **Critical Area** | 18% | Overdue/Due/Upcoming Mix | Alpha 1, Gamma 1-2 |

## Live-View Punctuality (State-First)
- **Delta (Punctual)**: Forced to `deltaMinutes < -5`. No "Due soon" (Warning) or "Missed" (Alert).
- **Good (Operational)**: Forced to `deltaMinutes < 5`. No "Missed" (Alert), but can show "Due soon".
- **Critical**: Full range of states.

## Multi-Resident Distribution
Refactored the mock data generation to support **1-2 residents per room** while ensuring each resident is unique within the facility.

### 1. Expanded Roster
- **Roster Expansion**: Expanded `RESIDENT_NAMES` to **300 unique names** to accommodate the 144 rooms.
- **Unique Assignment**: Consumption-based assignment logic ensures no resident appears in more than one room.

### 2. Room Definition
- `RoomDef.residents`: `Resident[]` (1-2 per room).
- All residents are unique across the entire facility.
