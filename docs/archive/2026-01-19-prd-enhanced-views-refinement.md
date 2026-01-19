# PRD: Enhanced Views Refinement

## 1. Introduction
This document outlines the refinements for the Enhanced Live Monitor and Historical Review views in the Safeguard Desktop application. The goal is to align the specific implementation details (columns, data presentation, logic) with stakeholder feedback.

## 2. Requirements

### 2.1 Live View (`EnhancedLiveMonitorView`)
- **Status Column**:
    - Combine into a single column displaying **Icon**, **Text**, and **Color**.
    - Replace separate status columns.
- **Scheduled Column**:
    - Display both **Date** and **Time**.
- **Overdue Logic (-> Missed)**:
    - Rename "Overdue" status to "Missed".


### 2.2 Historical View (`EnhancedHistoricalReviewView`)
- **Status Column**:
    - Single column with **Icon**, **Text**, **Color**.
- **Columns Order**:
    - **Comments** should be the **last column** (after Status)
- **Visuals**:
    - "Actual" column: Display **dash** (`—`) if missed.
    - "Officer" column: Display **dash** (`—`) if missed/blank (currently blank).
- **Details Panel**:
    - Location: Display as **Breadcrumb** (e.g., "Group > Unit > Room") linking to facility management (mock links, not real links).
    - Scheduled/Actual: Display **Date** and **Time**.
    - Missed Actual: Display **dash** (`—`) instead of "Pending".

### 2.3 General / Other
- **Variance**: Remove Variance column/data.
- **Supervisor Review**: Include **Supervisor Name** and **Date/Time** of review.
- **Check Type**: Display in Details Panel if enabled (mock data/toggle).
- **Advanced Search**:
    - Rename "Special status" -> "Enhanced observation".
    - Rename "After date" -> "Start date".
    - Rename "Before date" -> "End date".
    - Remove "Comments" (dropdown).
    - Remove "Comment text" input. Use global search or "Has the words" equivalent.

## 3. Implementation Notes
- **Mock Data**:
    - Update data generation to support "Missed" logic (renaming).
- **Atoms**:
    - Update `DesktopFilter` state for renamed fields.

### 2.4 Resident & Overdue Logic Refinement
- **Multiple Residents**:
    - If a room has multiple residents, show multiple residents in the Resident column.
    - Display 1 line for each resident.
- **Overdue Status**:
    - If there are multiple missed checks, only the **first scheduled time** is displayed.
    - A **count** of the missed checks should be displayed.
    - This row is cleared from the live view **only** if a check is completed.
    - Each missed check must be available in the **Historical View** for recording reasons.
    - If a reason is recorded but no check is performed, the room **continues to display as Missed** in the Live View.

### 2.5 UI Refinements
- **Resident Column**:
    - Residents are displayed vertically with a small gap (`--spacing-1`) between them.
    - Each resident's name is vertically centered with their status badge (if applicable).
    - Status badges (e.g., "SR") are tied to the specific resident on the same line.
- **Context Menu**:
    - Remove "**View resident**" action.
    - Resulting actions: "Facility management" only.
