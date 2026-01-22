# Animation Specification & Contracts

This document defines the critical animation behaviors and constraints for the Safety Check application. Adherence to these specifications is mandatory to prevent layout thrashing and ensure a native-quality user experience.

---

## 1. DataTable & Row Transitions

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Row Add/Update** | 300ms | Fade in / Scale subtle |
| **Row Exit** | 200ms | Slide out right + Collapse |
| **Status Change** | 500ms | Color cross-fade |

### The Interaction Flow

1. **Trigger:** User scans QR code or manually submits check
2. **Phase 1: Transient Success (0ms - ~1200ms)**
   - **State:** Check status → `'completing'`
   - **Visual:** 
     - Outward pulse (green ring, `card-flash-complete`)
     - Background fade: Green → Grey
   - **Constraint:** Card **MUST NOT MOVE** from original position
   - **Overlay:** Form/Scan view closes immediately to reveal animation
3. **Phase 2: Exit Transition (after 1s delay)**
   - **State:** Check status → `'complete'`
   - **Visual:** Card slides right, then height collapses
   - **Layout:** List below fills gap smoothly

---

## 2. Nested Motion Divs Pattern

**Problem:** Framer Motion applies all exit animations simultaneously. Setting `height: 0` with a delay still causes an instant height jump at exit start.

**Solution:** Use two nested `motion.div` elements to separate concerns:

```tsx
// OUTER: Height collapse wrapper (delayed)
<motion.div
  initial={{ height: 'auto', marginBottom: 'var(--space-3)' }}
  animate={{ height: 'auto', marginBottom: 'var(--space-3)' }}
  exit={{
    height: 0,
    marginBottom: 0,
    overflow: 'hidden',
    transition: { delay: 0.1, duration: 0.2, ease: 'linear' }
  }}
>
  {/* INNER: Slide and fade (immediate) */}
  <motion.div
    initial={{ opacity: 0, x: 0 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{
      x: '100%',
      opacity: 0,
      transition: {
        x: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.3, delay: 0.2, ease: 'easeOut' }
      }
    }}
    className={cardClassName}
  >
    {/* Card content */}
  </motion.div>
</motion.div>
```

**Key Points:**
- No `overflow: hidden` on outer during normal state (would clip pulse box-shadow)
- Outer only handles height/margin collapse
- Inner handles slide-right and fade
- `overflow: hidden` applied only in exit transition

---

## 3. Critical Architecture Rules

### A. Sorting Stability Contract
**Rule:** List sorting **MUST NEVER** sort by `status`.

- **Why:** Sorting by status causes cards to jump positions when status changes to `'completing'`
- **Implementation:** Sort by `dueDate` (Time View) or `walkingOrderIndex` (Route View)

### B. Ghost Item Contract
**Rule:** Filtering logic **MUST INCLUDE** items with status `'completing'`.

- **Why:** Excluding `'completing'` items unmounts the card instantly, preventing exit animation
- **Implementation:**
  1. `ScheduleView` grouping explicitly includes `'completing'` items
  2. **Computed Display Group:** Calculate display position from timing window, not raw status

### C. Z-Index for Pulse Visibility
**Rule:** Completing cards must have elevated z-index.

```css
.checkCard[data-status='completing'] {
  position: relative;
  z-index: 10; /* Above sticky headers (z-index: 5) */
}
```

### D. Interactive Resizing Contract
**Rule:** Disable all active transitions during interactive width resizing.

- **Why:** Browsers attempt to interpolate width changes over the transition duration (e.g., 0.3s), creating a "rubber-band" lag effect against the mouse position.
- **Implementation:**
  1. Lift `isResizing` state to the parent that controls the resizable container width.
  2. Set `data-resizing="true"` on the wrapper during the `mousemove` cycle.
  3. CSS: `.wrapper[data-resizing="true"] { transition: none; }`.
  4. Use Hardware Acceleration: Add `will-change: width` to the resizable container.

---

## 4. File Locations

| Concern | File |
|---------|------|
| CSS animations | `src/features/Schedule/CheckCard.module.css` |
| Exit animation | `src/features/Schedule/CheckCard.tsx` |
| Status delay | `src/features/Workflow/useCompleteCheck.ts` |
| Grouping logic | `src/features/Schedule/ScheduleView.tsx` |

---

## 5. Page Transitions

Uses "Push/Pop" navigation metaphor:
- **Container:** `position: relative`, `overflow: hidden`
- **Views:** `position: absolute`, `inset: 0`
- **Easing:** `[0.25, 1, 0.5, 1]` (iOS-like)
- **Z-Index:** Entering view higher, exiting view lower with slight scale (0.95)

## 6. Micro-Interactions

- **Haptics:** Success state triggers `success` haptic pattern
- **Sound:** Success state triggers `success` audio cue
- **Ripple:** Use `::before` pseudo-elements for overlays

---

## 7. View Transitions

The dashboard transitions between **Live** and **Historical** modes using a coordinated cross-fade and tree-state persistence.

### Architecture

| Component | Role |
|-----------|------|
| `index.html` | Static HTML splash (Journal logo + "Safeguard" title) shown instantly |
| `SplashView.tsx` | React fallback with matching layout and shared `layoutId`s |
| `LoginView.tsx` | Target view with staggered form entry and conditional `layoutId` |
| `DelayedFallback.tsx` | Prevents spinner flash on fast loads (200ms delay) |
| `withMinDelay()` | Ensures minimum 500ms display time for lazy imports |

### Shared LayoutIds

```tsx
// SplashView.tsx - centered logo + title
<motion.div layoutId="app-logo"><JournalLogo size={144} /></motion.div>
<motion.h3 layoutId="app-title">Safeguard</motion.h3>

// LoginView.tsx - logo/title in header position
<motion.div layoutId={isExiting ? undefined : "app-logo"}>
  <JournalLogo size={144} />
</motion.div>
<motion.h3 layoutId={isExiting ? undefined : "app-title"}>Safeguard</motion.h3>
```

### Conditional LayoutId on Exit

**Problem:** When clicking login bypass, the logo distorts during the exit to AppShell because Framer Motion animates the `layoutId` handoff to a non-existent target.

**Solution:** Track `isExiting` state and set `layoutId={undefined}` before triggering navigation:

```tsx
const [isExiting, setIsExiting] = useState(false);

const handleShortcutLogin = () => {
  setIsExiting(true);  // Disable layoutId before navigation
  setSession({ isAuthenticated: true, user });
};
```

### Staggered Form Entry

```tsx
const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const formItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
};
```

### Minimum Splash Time

```tsx
const MIN_SPLASH_MS = 500;
const withMinDelay = <T,>(promise: Promise<T>, minMs: number): Promise<T> =>
  Promise.all([promise, new Promise(r => setTimeout(r, minMs))]).then(([result]) => result);

const LoginView = lazy(() => withMinDelay(
  import('./features/Session/LoginView').then(m => ({ default: m.LoginView })),
  MIN_SPLASH_MS
));

## 8. General Animation Principles
 
 All continuous pulse animations (Header, Footer, Badges, Overlays) MUST synchronize using the Web Animations API (WAAPI) to prevent drift.
 
 ### The Rule: `startTime = 0`
 We do NOT use `animation-delay` offsets. Instead, we use `useWaapiSync` to force the animation's timeline position to absolute zero.
 
 ### Multipliers
 | Effect | Duration | Sync Logic |
 |:---|:---|:---|
 | **Basic Pulse** | 1.2s | `startTime = 0` |
 | **Badge Pulse** | 1.2s | `startTime = 0` (local ref) |
 | **Gradient Pulse** | 2.4s | `startTime = 0` |
 
 ### Implementation Pattern
 ```tsx
 const ref = useRef(null);
 // Hook handles all logic:
 useWaapiSync(ref, { isEnabled: true });
 ```
 
 ### Why Calculation Failed
 Previous methods using `Date.now() % Period` failed because:
 1.  **Execution Latency:** JS calculated the offset, but the Paint happened 16-50ms later.
 2.  **Tab Sleep:** CSS `animation-delay` pauses in background tabs, while `Date.now()` continues, causing immediate desync on resume.
 3.  **WAAPI Fix:** `currentTime` is relative to the document timeline, which accounts for all of this automatically.


## 10. AnimatePresence Coordination & Interference Prevention

### The Problem
Multiple uncoordinated `AnimatePresence` blocks or continuous CSS animations can cause visual artifacts during Framer Motion transitions.

### Common Issues
1.  **CSS Animation Interference:** CSS `animation` property continues running during Framer Motion's exit, creating compositing layer flash
2.  **Uncoordinated Transitions:** Separate AnimatePresence blocks don't communicate timing
3.  **mode="wait" Delays:** Can cause unexpected mounting/unmounting behavior

### Solution Patterns

#### Disable CSS Animation During Framer Control
```tsx
<motion.div
    className={styles.labelWithPulse}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    style={{ animation: 'none' }} // Override CSS animation
>
```

#### Coordinate Related Animations
```tsx
// BAD: Separate blocks, uncoordinated timing
<AnimatePresence>
    {showSuccess && <SuccessElements />}
</AnimatePresence>
<AnimatePresence mode="wait">
    {showLabel && <ScanningLabel />}
</AnimatePresence>

// GOOD: Single block with mode coordination
<AnimatePresence mode="wait">
    {showSuccess && <motion.div key="success">...</motion.div>}
    {showLabel && <motion.div key="label">...</motion.div>}
</AnimatePresence>
```

#### Explicit Exit Transitions
```tsx
// Always specify transition on exit animations
exit={{ opacity: 0, scale: 0.95 }}
transition={{ duration: 0.15, ease: 'easeOut' }}
// Don't rely on parent MotionConfig for exit timing
```

### Reference Implementation
See `src/features/Shell/NfcScanButton.tsx` for case study of resolving label flash during success animation.


---

## 8. Skeleton Shimmer

The "Premium Shimmer" effect used in DataTables and Cards.

### Timing Values
| Parameter | Value | Notes |
|-----------|-------|-------|
| **Duration** | 3000ms (3s) | Slow "breathing" cycle |
| **Ease** | `ease-in-out` | Smooth start/end |
| **Iteration** | `infinite` | Continuous loop |

### Gradient Definition
A high-contrast wave that moves across the element.
```css
background: linear-gradient(
  90deg,
  var(--surface-bg-secondary) 25%,
  var(--surface-bg-tertiary) 37%, /* Highlight */
  var(--surface-bg-secondary) 63%
);
background-size: 400% 100%;
```

### Shape Primitives
- **Standard:** `border-radius: var(--radius-sm)` (Text bars)
- **Checkbox:** `border-radius: 4px` (20x20px Square)
- **Action:** `border-radius: 999px` (24x24px Circle)

