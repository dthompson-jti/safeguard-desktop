# Component Spec: Focus Ring

## 1. Overview
The standardized visual focus indicator for keyboard navigation.

## 2. Visual Specification
*   **Style**: Double Border (using box-shadow).
*   **Shadow 1 (Outer)**: 2px offset? No, inner-outer model.
*   **Shadow 2 (Inner)**: 2px stroke.

## 3. Code Implementation
```css
:focus-visible {
    outline: none;
    box-shadow: 
        0 0 0 2px var(--surface-bg-base),
        0 0 0 4px var(--control-border-theme);
}
```

## 4. Verification
*   Matches Figma instance `2074:59503`.
