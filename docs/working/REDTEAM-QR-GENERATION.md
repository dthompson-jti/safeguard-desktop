# Red Team Report: QR Generation Plan

I have red-teamed the current architecture and implementation docs. Below are the identified vulnerabilities, traps for junior developers, and overlooked edge cases.

## 1. Top Technical Vulnerabilities

| Risk Area | Vulnerability | Impact | Mitigation |
|---|---|---|---|
| **Data Encoding** | Junior dev encodes `room.name` instead of `room.id`. | Duplicate names across wings cause the mobile app to scan the wrong room. | **Hard Rule**: Mandatory use of `resident.id` or `room.uuid`. |
| **PDF Rendering** | `jsPDF` `addImage` fails on SVG strings. | QR libraries often default to SVG; junior dev might struggle with buffer conversion. | **Mandate**: Use a library that outputs `data:image/png;base64`. |
| **Memory Limit** | Printing a "Whole Facility" (500+ rooms). | Sync generation of 500 QR codes will freeze the UI thread for several seconds. | **Mandate**: Use `async` generation with a progress bar or 10ms `setTimeout(..., 0)` gaps between codes. |
| **Grid Math** | "The Off-by-One Page". | If the grid fills a page exactly, the dev might trigger a blank second page or cut off the last row. | **Prescription**: Provide fixed `calculateGrid(index)` function in the Arch spec. |

---

## 2. Junior Dev "Traps"

1.  **CSS Pixel Confusion**: Most junior devs think in 96 DPI (browser). `jsPDF` is 72 DPI (points). 
    - *Trap*: They will set font-size to 14px in CSS and 14 in PDF, resulting in a 25% size mismatch.
2.  **The "Z-Index" Battle**: The `DropdownMenu` inside the `TreeView` might be clipped by `overflow: hidden` on the sidebar or parent scroll containers.
    - *Trap*: Junior dev will try `!important` z-index hacking instead of using Radix `Portal`.
3.  **Recursion runaway**: Collecting IDs for a whole wing.
    - *Trap*: They might write a nested loop that re-traverses the entire tree for every item.

---

## 3. Overlooked UX Gaps

- **The "Empty Queue" State**: What happens if they select a wing that currently has no rooms (e.g. empty/renovation)? The "Generate" button should disable.
- **Label Alignment**: "Room name on bottom" sounds easy, but long names ($>15$ chars) will overflow the QR width on small 1-inch labels.
- **PDF naming**: Files shouldn't just be `download.pdf`. They should be `Safeguard_QRs_A-Wing_2024-02-04.pdf`.

---

## 4. Mitigation Summary (Updates to Plans)

I will now update `IMPL-QR-GENERATION.md` with the following "Junior-Proof" guards:
1.  **Explicit Data mandate**: `qrcode.toDataURL` for PNG output only.
2.  **Explicit Math mandate**: `1 inch = 72 points`.
3.  **Naming mandate**: Dynamic file naming requirement.
4.  **Quiet Zone mandate**: Explicitly require a 0.2" margin between QR and text.
