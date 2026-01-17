# Strategy: Deep Spec Extraction

## Objective
To systematically extract all visual and interaction specifications from the Figma design files (`Atomic Elements`, `Dev Notes`, `Prototype`) without ambiguity. This ensures the implementation matches the design intent and facilitates the design system migration.

## Scope of Audit
We will target the following Figma Node IDs:
1.  **Atomic Elements (`1245-47578`)**: Icons, base dimensions, typography.
2.  **Dev Notes (`1243-51518`)**: Interaction states, "Old Token" names, Contrast data.
3.  **Prototype (`1179-34949`)**: Composition and layout context.

## Extraction Protocol

## Extraction Protocol

### 1. The "Deep State Matrix" Extraction
For every interactive component (Nav Item, Toggle, Search Bar), we will build a **Deep State Matrix**. We must extract specific values for **every** state: `Default`, `Hover`, `Active` (Pressed), `Selected` (Active Page), `Focus` (Keyboard), `Disabled`.

**A. Box Model & Layout (The Container)**
*   **Dimensions**: Absolute Height (fixed?) vs Hug contents. Min/Max widths.
*   **Padding**: Explicit `Top`, `Right`, `Bottom`, `Left` values. *Note: Figma often uses "Space between" which maps to `gap`.*
*   **Auto Layout**: `Flex Direction` (Row/Column), `Gap` (Item Spacing), `Alignment` (Top/Center/Bottom).
*   **Borders**: `Stroke Weight` (Top/Right/Bottom/Left), `Stroke Align` (Inside/Outside).
*   **Corner Radius**: Explicit values for all 4 corners.

**B. Visual Styling (The Surface)**
*   **Fills**: Hex Code, Opacity, Blend Mode. *Critical: Check for multiple fills layered.*
*   **Strokes**: Hex Code, Opacity.
*   **Effects (Complex Shadows)**:
    *   *Findings*: Watch for multi-layer shadows (e.g., "Elevation 500" has 3 drop shadows). Extract ALL layers: X, Y, Blur, Spread, Color (Hex + Alpha).
    *   **Blur**: Layer Blur or Background Blur values.

**C. Typography (The Content - Segoe Map)**
*   **Font Family**: Figma uses `Segoe UI`. We MUST map this:
    *   `Segoe UI Semilight` -> `Inter Regular (400)` (Confirm visual weight).
    *   `Segoe UI Semibold` -> `Inter SemiBold (600)`.
*   **Weight**: Numerical value (400, 500, 600).
*   **Size**: Pixel value (rem conversion needed later).
*   **Line Height**: Pixel value or % (unitless conversion needed).

**D. Iconography**
*   **Size**: Bounding box (e.g., 24x24 vs 20x20).
*   **Color**: Fill vs Stroke.
*   **Stroke Width**: Internal vector stroke weight.
*   **Rotation**: Check interactions for rotation (e.g., Chevron 90deg vs 180deg).

### 2. Interaction Audit (The "Feel")
We must infer standard web interactions from the "Dev Notes" node.
*   **Transition Timing**: Are there specs for duration (e.g., `200ms`)?
*   **Triggers**: What specific action triggers the state change?
*   **Focus Rings**: *Critical Finding*: System uses a "Double Ring" (Inset -4px Color + Inset -2px White). capture this EXACTLY.

### 3. Tooling Usage Strategy
We will use the `figma-dev-mode-mcp-server` tools with high specificity:

*   **`get_metadata(nodeId)`**: To traverse the component tree and identify *hidden* layers or state varients (e.g., "State=Hover").
*   **`get_design_context(nodeId)`**: To extract the CSS-like properties.
    *   *Rigor Check*: We will cross-reference the generated CSS with the visual inspection.
*   **`get_variable_defs(nodeId)`**: To detect any existing *Figma Variables*.
    *   *Token Hunter*: Look for legacy names like `semantic/control/secondary-text`.

### 4. "Implied Token" & Anomaly Detection
Since the old design system might use raw hex values, we must record the **Raw Value** AND the **Context**.
*   **Anomaly Handling**: If a value is off-grid (e.g., `13px` padding), we flag it. Is it a mistake? Or a specific design choice? Use `[ANOMALY]` tag in audit.

## Execution Checklist & Rigor Gates
1.  [ ] **Atomic Elements Audit**:
    *   [ ] Verify Icon Grid Size (20px vs 24px).
    *   [ ] Capture exact `font-weight` for "Selected" vs "Unselected" states.
2.  [ ] **Dev Notes Analysis**:
    *   [ ] Extract `Enter`/`Space` key behaviors.
    *   [ ] **Focus Ring Deep Dive**: Audit Node `2074:59503` for the Double-Border logic.
3.  [ ] **Nav Items (Primary & Secondary)**:
    *   [ ] Extract `padding-left` indentation for expanded vs collapsed.
    *   [ ] Verify Segoe UI -> Inter mapping weights.
4.  [ ] **Search Input**:
    *   [ ] Capture "Elevation 500" shadow layers (`282:7356`).
5.  [ ] **Global Sidebar**:
    *   [ ] Confirm `width` behavior: Fixed, Resizable, or Collapsible?
    *   [ ] Background color validation against `Dark-A`, `Dark-B`, `Dark-C` themes.

## Output Format
The data will be recorded in `docs/epic-left-nav/04-DATA-figma-audit.md`. Every cell in the table must be filled. "N/A" must be explicit. No empty cells.
