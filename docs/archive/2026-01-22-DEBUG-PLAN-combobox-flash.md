# Debug Plan: ComboBox Flash

## 1. Reproduce
**Steps:**
1. Open Advanced Search.
2. Click inside the "Officer" input.
**Expected:** Dropdown opens immediately and stays open.
**Actual:** Dropdown opens and immediately closes ("flashes").

## 2. Hypotheses
1.  **H1 (High Confidence): Radix Auto-Focus Conflict.** `Popover.Content` manages focus. When the menu opens, it might be stealing focus from the input, triggering the input's `onBlur` or `onOpenChange` logic to close it.
2.  **H2 (Medium Confidence): Trigger vs. Anchor.** Even without `Popover.Trigger`, `Popover.Anchor` might be inferring trigger behavior or event bubbling is reaching a parent listener.
3.  **H3 (Low Confidence): Strict Mode Double-Render.** React Strict Mode executing effects twice (though `setOpen` should be stable).

## 3. Investigation Plan
- **Test H1:** Prevent focus stealing. Set `onOpenAutoFocus` in `Popover.Content` to `e.preventDefault()`. Check if `onBlur` is firing on the input.
- **Refine H1:** The `onPointerDownOutside` logic added previously might be fighting with the initial click if the click event bubbles strangely.

## 4. Fix Strategy
- **Decouple Trigger:** Remove `Popover.Anchor` wrapping the input if possible, or ensure the input click *stops propagation* so it doesn't reach Radix's listeners.
- **Manual Control:** Use a hidden div as the anchor, positioned relative to the wrapper, so the input is DOM-isolated from Radix's event delegation.
