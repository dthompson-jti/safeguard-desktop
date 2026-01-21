# Implementation Plan - Fix Chevrons & Update Icons

## User Review Required

> [!NOTE]
> Changing "Medical Watch" (MW) icon to `warning` (triangle) to match "Suicide Risk" (SR). This will make them visually identical in icon, distinguished only by the "MW" vs "SR" label.

## Proposed Changes

### [MODIFY] [ResidentStatusBadge.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop/components/ResidentStatusBadge.tsx)
- Change `medical_services` icon to `warning`.

### [MODIFY] [EnhancedLiveMonitorView.tsx](file:///c:/Users/dthompson/Documents/CODE/safeguard-desktop/src/desktop-enhanced/components/EnhancedLiveMonitorView.tsx)
- Fix the chevron visibility issue (retry previous step).
- Use `span` with inline styles for the chevron in "Enhanced Mode".

## Verification Plan

### Manual Verification
- **Icons**: Verify MW resident shows triangle icon in the badge.
- **Chevrons**: Verify chevrons are visible between location badges.
