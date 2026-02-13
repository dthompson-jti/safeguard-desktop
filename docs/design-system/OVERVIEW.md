# Journal Design System: Overview

The Journal Design System is the central infrastructure for visual and interactive patterns across all company applications. It provides a standardized framework that synchronizes design specifications in Figma with CSS implementations in code.

## System Status

The design system is a living infrastructure. Developers will encounter both modernized patterns and legacy implementations during this transition.

### Classification Tags
The following tags are used in documentation and source code to identify the status of system elements:

*   **`OLD`**: Identifies legacy patterns or tokens scheduled for deprecation. These should not be utilized for new development.
*   **`REMAP`**: Indicates an active migration. These elements are being transitioned from legacy values to the modern semantic system.

## Token Architecture

The system is built on a two-tier architecture that separates raw values from their application.

### 1. Primitives
*   **Definition**: The raw building blocks of the system (e.g., specific hex codes, spacing units).
*   **Sub-Types**:
    *   **Color Scales**: Theme-specific palettes (e.g., `theme-50` to `theme-900`, `grey-10` to `grey-950`).
    *   **Spacing Scale**: A linear scale based on `rem` units (e.g., `spacing-4` = 1rem).
    *   **Radii**: Standardized curve values for containers and controls.

### 2. Semantics
*   **Definition**: The functional role of a token. Semantics map a specific intent to a primitive value, allowing for automatic theming (e.g., Light vs Dark mode).
*   **Major Types**:
    *   **Surface**: Structural application. Used for backgrounds, borders, and containers.
    *   **Control**: Interactive application. Used for buttons, inputs, and selection states.

## Figma Integration

Figma serves as the primary source for all design tokens.

### Token Extraction
Specifications can be extracted from Figma using the following methods:
*   **Manual Inspection**: Utilization of Figma's Dev Mode to retrieve specific values.
*   **Automated Integration**: For large-scale updates, an MCP (Model Context Protocol) integration is available to programmatically extract tokens.

## Documentation Index

1. [**Tokens**](./TOKENS.md): Detailed technical breakdown of the architecture.
2. [**Semantic Radii**](./SEMANTIC_RADII.md): Standardization contract for corner roundness.
3. [**Dark Mode**](./DARK_MODE.md): Elevation and contrast strategy for dark environments.
4. [**CSS Principles**](./CSS_PRINCIPLES.md): Technical standards for professional implementation.
5. [**Technical Specification**](../knowledge-base/SPEC-CSS.md): Detailed layout contracts and layering systems.
