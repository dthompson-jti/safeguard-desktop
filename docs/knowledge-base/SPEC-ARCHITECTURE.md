# SPEC: Architecture & System Overview

## 1. Core Architecture
- **Framework**: React + Vite (Desktop First)
- **State Management**: Jotai (Atoms)
    - `src/data/atoms.ts`: Core state
    - `src/desktop-enhanced/atoms.ts`: Desktop V2 specific state
- **Routing**: `react-router-dom`
    - `/`: Desktop Enhanced (Home)
    - `/alternate`: Standard View

## 2. Desktop V2 (`src/desktop-enhanced/`)
The primary focus of current development.
- **Layout**: Hierarchical Tree View + Data Table
- **CSS**: heavily relies on `Layout.module.css` and `SPEC-CSS` tokens.
- **Key Components**:
    - `NavigationPanel`: Left sidebar with Tree View
    - `TopBar`: Header with breadcrumbs
    - `ModeToggle`: Live vs Historic switch
    - `LiveMonitorView`: Real-time tracking
    - `HistoricalReviewView`: Compliance reporting

## 3. References
- [PRD: Desktop Enhanced](PRD-desktop-enhanced.md)
- [Design Tokens (CSS)](SPEC-CSS.md)
- [Animation Guide](SPEC-ANIMATION.md)
