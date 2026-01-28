# SPEC-TOASTS: Toast Notification Strategy & Design Specification

## 1. Core Philosophy

To maintain a high-craft, low-friction user experience, the application adheres to a **"Minimize & Contextualize"** philosophy for notifications.

1.  **Intrinsic Feedback First:** Do not use a toast if the UI itself changes state to indicate success (e.g., a card animating off-screen, a page transition, or a modal closing).
2.  **No Redundancy:** Do not layer a toast on top of an existing error view (e.g., if a scanner viewfinder turns red and says "Error", do not also pop a toast saying "Error").
3.  **Semantic Clarity:** Every toast must transmit its severity and intent immediately through color and iconography.
4.  **System Awareness:** Toasts must respect the layout of the screen, floating dynamically above fixed footers or keyboards.

## 2. Design Specifications

### Visual Architecture
Toasts are high-elevation floating surfaces that prioritize readability and professional weighting.

*   **Dimensions & Metrics:**
    *   **Positioning**: **Bottom Right** corner.
    *   **Border Radius:** 10px (`var(--radius-lg)`)
    *   **Padding:** 12px (`var(--spacing-3)`) uniform on all sides.
    *   **Icon-to-Text Gap:** 12px (`var(--spacing-3)`)
    *   **Title-to-Body Gap:** 4px (`var(--spacing-1)`)
    *   **Shadow:** `var(--surface-shadow-xl)`
    *   **Elevation:** Layer 9999 (`var(--z-toast)`)
    *   **Alignment**: All elements (icon, text, actions) are **vertically centered**.

*   **Typography:**
    *   **Size:** 14px (`var(--font-size-sm)`) for both title and body.
    *   **Title Weight:** 600 (Semi-bold)
    *   **Body Weight:** 400 (Regular)
    *   **Color:** `var(--surface-fg-on-solid)` for high contrast on semantic backgrounds.

*   **Iconography:**
    *   **Size:** 24px (`var(--icon-size-lg)`)
    *   **Centering**: Perfectly centered vertically within the toast container.

### Component Refinements
*   **Action Link**: Secondary actions are rendered as an underlined **Action Link** style (bold, underlined) rather than boxy buttons.
*   **Close Button**: Uses the **Large** (40x40) "On Solid" button variant with a 24px icon.

## 3. Semantic Variants

Toasts use **Solid** semantic tokens for maximum visibility and "premium" feel.

| Variant | Data Attribute | Background Token | Icon |
| :--- | :--- | :--- | :--- |
| **Success** | `success` | `var(--surface-bg-success-solid)` | `check_circle` |
| **Warning** | `warning` | `var(--surface-bg-warning-solid)` | `warning` |
| **Alert** | `alert` | `var(--surface-bg-error-solid)` | `error` |
| **Info** | `info` | `var(--surface-bg-info-solid)` | `info` |

## 4. Terminology Standards

To maintain consistency with administrative workflows, use the following phrasing for Supervisor Reviews:
- **Success**: "Supervisor review saved"
- **Removal**: "Supervisor review removed"
- **Context**: Mention the count (e.g., "Applied to X checks") in the body text.

## 5. Placement & Motion Logic

*   **Animation (Framer Motion):**
    *   **Enter:** Slide Y (-20px) + Scale (0.95 -> 1.0) + Opacity (Spring: `stiffness: 400, damping: 30`).
    *   **Exit:** Scale (1.0 -> 0.95) + Opacity (Tween, 150ms, `easeOut`).
    *   **Constraint:** The `layout` prop is **disabled** on the Toast component to prevent conflicts with Radix UI swipe gestures.

*   **Gestures:**
    *   **Swipe Direction:** Right (`swipeDirection="right"`).
    *   **Behavior:** Toast tracks finger 1:1. On release past threshold, it dismisses.