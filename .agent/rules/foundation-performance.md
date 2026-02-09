---
trigger: model_decision
---

# Performance Foundations

Standards for maintaining high performance and low latency.

## 1. Font Optimization
*   **Variable Fonts:** NEVER import the full variable font range (e.g., `wght 100..900`).
*   **Axis Restriction:** Always restrict variable axes to the exact values needed (e.g., `opsz,wght@24,400`).
*   **API Usage:** Use the Google Fonts API with strict axis parameters. Avoid hosting partial variable fonts manually unless subsetted.
*   **Display:** Check `swap` or `block` strategies to prevent layout shifts (CLS).

## 2. Bundle Size
*   **Lazy Loading:** Route-level components MUST be lazy-loaded using `React.lazy`.
*   **Import Cost:** Avoid importing entire libraries for single utility functions.

## 3. Rendering Stability (`backdrop-filter`)
*   **Pseudo-element Isolation:** Elements using `backdrop-filter` MUST use a `::before` pseudo-element for the filter effect.
    *   *Why:* Isolates the filter from the main element's transforms/layout, preventing flicker during motion.
*   **Blur Optimization:** The standard `--blur-glass` token should be kept at or below `12px` for mobile performance.
*   **Hardware Acceleration:** Always apply `transform: translateZ(0)` and `backface-visibility: hidden` to the translucent layer.
*   **Layer Isolation:** Use `isolation: isolate` on the parent container to create a clean stacking context.

## 4. Verification
*   **Payload Check:** Verify font payload size in Network tab (Target: <200KB).
*   **Flicker Check:** Drag content under translucent headers; if flickering occurs, verify pseudo-element isolation.
