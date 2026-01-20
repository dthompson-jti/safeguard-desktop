# PRD: Path Interaction (Non-Shifting Segments)

Refine the interaction of "Path" based links (Breadcrumbs in Table and Panel) to eliminate layout jitter when icons reveal.

## 1. Problem Statement
The current width-expansion animation for the `open_in_new` icon causes a "push" effect on subsequent path nodes and separators. In dense views like the Detail Panel or the Table's location column, this creates a jumpy experience ("jitter") as the entire path shifts right and left on hover.

### Goal:
- **Zero-Shift Interaction:** Reveal the external link icon without moving surrounding text or separators.
- **Visual Clarity:** Ensure the icon is clearly associated with the hovered segment.
- **Consistency:** Apply the same logic to both Residents (inline lists) and Locations (paths).

---

## 2. Design Options

### Option A: The "Separator Swap" (Recommended for Paths)
- **Concept:** Every interactive path segment is followed by a separator (e.g., `navigate_next`). On hover, the separator for that segment fades out, and the `open_in_new` icon fades in *in the same physical space*.
- **Pros:** Zero layout shift. The icon effectively "replaces" the utility icon for the duration of the hover.
- **Cons:** Only works if there is a separator. Does not work for the "Last Node" or solitary links.

### Option B: The "Negative Space Overlay"
- **Concept:** The icon reveals using `position: absolute`. To prevent overlapping the next node, the path is designed with a slightly wider gap (`margin-right` or `gap`). 
- **Pros:** No shift.
- **Cons:** Nodes look more sparse in their rest state.

### Option C: The "Expand + Offset" (Graceful Shift)
- **Concept:** Instead of pushing the whole row, the link expands *inward* (the text shifts left while the icon appears on the right). 
- **Pros:** Keeps the right-side content stable.
- **Cons:** The text itself moving is often more jarring than the text being pushed.

---

## 3. Specification (Recommended Approach)

### The "PathSegment" Component
To implement "Zero-Shift", we will bundle the link and its separator (or trailing space) together.

#### Rest State:
- `[ Link Segment ] [ Separator / Gap ]`
- Separator is visible (`opacity: 0.7`).
- Link Icon is hidden (`width: 0`, `opacity: 0`, `position: absolute`).

#### Hover State:
- `[ Link Segment ] [ Link Icon Overlaying Separator ]`
- Separator fades to `opacity: 0`.
- Link Icon fades to `opacity: 1`.
- **Shift is avoided** because the icon occupies the space already reserved for the gap/separator.

### Solitary Links (Resident Names)
For solitary links or lists (e.g., `Resident A, Resident B`), we will use a small `padding-right` reservation to ensure the icon doesn't push the "comma" or the next name.

---

## 4. Implementation Plan

1. **Step 1:** Create (or update `LinkButton` to support) a `PathSegment` wrapper.
2. **Step 2:** Refactor `EnhancedLiveMonitorView.tsx` location column to use `PathSegment`.
3. **Step 3:** Refactor `DetailPanel.tsx` breadcrumbs to use `PathSegment`.
4. **Step 4:** Update `LinkButton.module.css` to handle absolute positioning of the icon when in "path mode".

## 5. Done Criteria
- [ ] Hovering over "Group" does not shift "Unit" or "Room".
- [ ] Hovering over "Resident A" does not shift "Resident B".
- [ ] All icons fade in smoothly with no layout jitter.
