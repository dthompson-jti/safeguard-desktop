# Junior Dev Plan: QR Code Generation

> [!IMPORTANT]
> This feature MUST be hidden behind a global toggle. Do NOT break the existing TreeView for users who do not need QR printing.
> **Data Security**: Only encode unique IDs (UUIDs), NEVER encode resident names or PII inside the QR code data.

## Phase 1: State & Toggle (Safety First)

### 1.1 Add Atoms
**File**: `src/desktop-enhanced/atoms.ts`
Add the following atoms. Use `atomWithStorage` for the toggle so it persists.

```typescript
// Add to imports
import { atomWithStorage } from 'jotai/utils';

export type QRLabelPosition = 'top' | 'bottom';
export type QRLayoutType = 'standard' | 'branded';

export const qrGenEnabledAtom = atomWithStorage('qr_gen_enabled', false);

export const qrPrintOptionsAtom = atom({
  size: 2.0,           // inches
  layout: 'standard' as QRLayoutType,
  labelPosition: 'bottom' as QRLabelPosition,
  fontSize: 14,        // pt
});
```

### 1.2 Add Toggle to Burger Menu
**File**: `src/desktop-enhanced/components/TopNavMenu.tsx`
1. Import `qrGenEnabledAtom`.
2. Add a new `menuRow` below "Auto-open side panel".
3. **Check**: Ensure the toggle label is "Show QR Print actions".

---

## Phase 2: TreeView Context Action

### 2.1 Add the `[...]` Button
**File**: `src/desktop-enhanced/components/TreeView.tsx`
1. Use `useAtomValue(qrGenEnabledAtom)`.
2. Inside `TreeItem`, only render the action button if `qrGenEnabled` is true.
3. Use a Radix `DropdownMenu` for the `[...]` icon.
   - **Important**: Always wrap `<DropdownMenu.Content>` in a `<DropdownMenu.Portal>` to avoid z-index clipping by the sidebar.
4. Action: "Print QR Code(s)".

### 2.2 Handle Node Scope (The Recursion Helper)
You must collect all room IDs correctly. Create a helper function:
```typescript
function getAllRoomNodes(node: any): Room[] {
  if (node.type === 'unit') return [node]; // Base case
  if (node.children) {
    return node.children.flatMap(child => getAllRoomNodes(child));
  }
  return [];
}
```
- **Mandate**: When the user clicks "Print" on a Wing, call this helper to get the array of rooms to send to the PDF service.

---

## Phase 3: The Options Modal

### 3.1 Create `QRPrintModal.tsx`
**File**: `src/desktop-enhanced/components/QRPrintModal.tsx` [NEW]
- Use the existing `Modal` component.
- **Left Side**: Preview Pane (Fixed 300px width). Draw a mock QR and label text.
- **Right Side**: Controls.
    - `Slider` (size): 1.0 to 2.5, step 0.1.
    - `SegmentedControl` (position): [Top, Bottom].
    - `SegmentedControl` (layout): [Standard, Unit-Branded].

---

## Phase 4: PDF Service (The Precise Part)

### 4.1 Install Libraries
Run: `npm install jspdf qrcode`
Run: `npm install -D @types/qrcode`

### 4.2 Grid Logic Implementation
**File**: `src/services/qrService.ts` [NEW]
1. **DPI Awareness**: `jsPDF` uses 72 points per inch. Do NOT use 96 (CSS pixels). 
   - `1 inch = 72 points`.
2. **Library Constraint**: Use `qrcode.toDataURL(id, { type: 'image/png' })`. `jsPDF` only accepts PNG/JPEG, not SVG.
3. **Safety Check**: Always add a 1-inch black line at the top of page 1 with text: "Printer Check: This line must measure exactly 1 inch".
4. **Dynamic Naming**: Output file name should follow: `Safeguard_QRs_[NodeName]_[Date].pdf`.

---

## Phase 5: Senior Review Checklist
- [ ] **Data Check**: Scan a generated QR—does it contain a UUID and NOT a room name?
- [ ] **Scale Check**: Is the "1 inch check line" exactly 1 inch when printed?
- [ ] **Layout Check**: Do long room names (e.g. "Isolation 104B") wrap or truncate instead of overlapping the QR?
- [ ] **Z-Index Check**: Does the TreeView context menu work when the sidebar is scrolled? (Use Radix `<DropdownMenu.Portal />`).
