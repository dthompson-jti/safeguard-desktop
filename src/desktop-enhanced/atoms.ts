import { atom } from 'jotai';

export type DesktopEnhancedView = 'live' | 'historical';

export type SelectionType = 'root' | 'group' | 'unit';
export interface SelectionState {
    type: SelectionType;
    id: string;
    parentId?: string;
}

export const desktopEnhancedSelectionAtom = atom<SelectionState>({
    type: 'root',
    id: 'root',
});

// Expanded tree nodes (Set of IDs)
export const desktopEnhancedExpandedNodesAtom = atom<Set<string>>(new Set<string>());

// Width of the left navigation panel
export const desktopEnhancedPanelWidthAtom = atom<number>(320);

// Tree layout configuration
export type TreeLayoutMode = 'indented' | 'full-width';
export const desktopEnhancedTreeLayoutAtom = atom<TreeLayoutMode>('full-width');
