# Safeguard: Supervisor Dashboard

This repository contains the specialized **Supervisor Dashboard** for the Safeguard ecosystem. It is a high-performance, desktop-optimized application designed for facility-wide compliance monitoring and historical audit.

---

## 1. Core Principles

-   **Desktop-First Navigation:** Optimized for large screens, mouse-and-keyboard precision, and multi-panel workflows.
-   **High-Density Information:** Layouts designed to maximize data visibility, using compact tables and side-panel details.
-   **Atomic State Management:** Leverages Jotai for predictable, performant state updates across complex dashboard views.
-   **Hardened Security:** Authentication-gated environment ensuring that sensitive compliance data is only accessible to authorized supervisors.

## 2. Technology Stack

-   **Build Tool:** Vite
-   **Framework:** React 18
-   **Language:** TypeScript
-   **Data Grid:** TanStack Table (Headless UI)
-   **State Management:** Jotai
-   **Animation:** Framer Motion
-   **UI Primitives:** Radix UI
-   **Styling:** Global CSS with Design Tokens and `@layer` cascade.

## 3. Key Features

-   **Live Monitor:** Real-time triage view showing all active checks across the facility.
    -   **Consolidated Heartbeat:** A centralized ticker loop ensures all countdowns and status transitions are perfectly synchronized.
    -   **Responsive Data Grid:** High-performance table with sticky headers, auto-fitting columns, and custom skeleton loading states.
-   **Historical Review:** Extensive audit tool for reviewing past performance and identifying compliance gaps.
    -   **Variance Analysis:** Automatically calculates and displays the time difference between scheduled and actual checks.
    -   **Bulk Operations:** Manage multiple records simultaneously for supervisor review and notation.
-   **Unified Detail Panel:** A context-aware side panel that provides deep-dive information for both live and historical records without losing context of the main grid.
-   **Drill-Down Navigation:** (Enhanced Mode) A specialized tree-view navigation for managing large facility hierarchies.

## 4. Architecture

This application is a specialized fork of the Safeguard monolithic prototype, optimized for the "Supervisor" persona:

-   **Heartbeat Manager:** Headless global ticker that drives all time-based UI updates.
-   **Auth Gate:** Security layer that wraps all dashboard content, requiring a valid session.
-   **Storage Namespacing:** Uses `sc_desktop_v1_` prefix for all localStorage items to prevent collision with other Safeguard forks.
-   **Environment Configuration:** Build-time environment variables for API endpoints and deployment settings.

## 5. Directory Structure

-   **/src**: Main entry point and unified desktop roots.
-   **/src/desktop**: Standard Supervisor Dashboard components and logic.
-   **/src/desktop-enhanced**: High-hierarchy tree navigation and optimized layouts.
-   **/src/components**: Shared, accessible UI primitives.
-   **/src/data**: State definitions (Jotai), business logic, and mock data.
-   **/src/styles**: Design system tokens and global themes.

## 6. Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
