import { useAtomValue } from 'jotai';
import { desktopEnhancedViewAtom } from '../atoms';
import { desktopFilterAtom } from '../../desktop/atoms';
import { enhancedMockData } from '../data/mockData';

import { LiveCheckRow } from '../../desktop/types';
import { HistoricalCheck } from '../../desktop/types';

export interface TreeGroup {
    id: string;
    name: string;
    type: 'group' | 'root';
    missed: number;
    secondary: number;
    children: (TreeGroup | TreeUnit)[];
}

export interface TreeUnit {
    id: string;
    name: string;
    type: 'unit';
    parentId: string;
    missed: number;
    secondary: number;
}

export const useTreeData = () => {
    const view = useAtomValue(desktopEnhancedViewAtom);
    const filter = useAtomValue(desktopFilterAtom);

    // 1. Build a STABLE structure from ALL known groups/units across BOTH datasets
    const allGroups = new Set<string>();
    const allUnitsByGroup = new Map<string, Set<string>>();

    const scanData = (data: (LiveCheckRow | HistoricalCheck)[]) => {
        data.forEach(check => {
            const g = check.group || 'Other';
            const u = check.unit || 'Other';
            allGroups.add(g);
            if (!allUnitsByGroup.has(g)) allUnitsByGroup.set(g, new Set());
            allUnitsByGroup.get(g)!.add(u);
        });
    };

    scanData(enhancedMockData.liveData);
    scanData(enhancedMockData.historicalData);

    // 2. Initialize counts for the stable structure
    const countsMap = new Map<string, { missed: number; secondary: number }>();

    const getCountKey = (g: string, u: string) => `${g}||${u}`;

    // 3. Process counts only for the ACTIVE view
    if (view === 'live') {
        enhancedMockData.liveData.forEach(check => {
            const key = getCountKey(check.group || 'Other', check.unit || 'Other');
            const current = countsMap.get(key) || { missed: 0, secondary: 0 };
            if (check.status === 'overdue') current.missed++;
            if (check.status === 'due') current.secondary++;
            countsMap.set(key, current);
        });
    } else {
        enhancedMockData.historicalData.forEach(check => {
            const key = getCountKey(check.group || 'Other', check.unit || 'Other');
            const current = countsMap.get(key) || { missed: 0, secondary: 0 };

            // Date filtering
            if (filter.dateStart || filter.dateEnd) {
                const checkDate = check.scheduledTime.split('T')[0];
                if (filter.dateStart && checkDate < filter.dateStart) return;
                if (filter.dateEnd && checkDate > filter.dateEnd) return;
            }

            // Status filtering (match table logic)
            if (filter.statusFilter && filter.statusFilter !== 'all') {
                if (filter.statusFilter === 'unreviewed') {
                    // Unreviewed = (missed or late) AND no supervisorNote
                    const isMissedOrLate = check.status === 'missed' || check.status === 'late';
                    if (!isMissedOrLate || check.supervisorNote) return;
                } else if (filter.statusFilter === 'missed' && check.status !== 'missed') {
                    return;
                } else if (filter.statusFilter === 'late' && check.status !== 'late') {
                    return;
                } else if (filter.statusFilter === 'completed' && check.status !== 'completed') {
                    return;
                }
            }

            // Comment filtering
            if (filter.commentFilter === 'comment' && !check.officerNote) return;
            if (filter.commentFilter === 'no-comment' && check.officerNote) return;

            // If we get here, the check passes all filters. Count it.
            current.missed++;
            countsMap.set(key, current);
        });
    }

    // 4. Transform into finalized tree with "Facility ABCD" root
    const groups: TreeGroup[] = Array.from(allGroups).map(groupId => {
        const unitIds = Array.from(allUnitsByGroup.get(groupId) || []);
        const units: TreeUnit[] = unitIds.map(unitId => {
            const c = countsMap.get(getCountKey(groupId, unitId)) || { missed: 0, secondary: 0 };
            return {
                id: unitId,
                name: unitId.includes('Unit') ? unitId : `Unit ${unitId}`,
                type: 'unit',
                parentId: groupId,
                missed: c.missed,
                secondary: c.secondary,
            };
        });

        units.sort((a, b) => a.id.localeCompare(b.id));

        return {
            id: groupId,
            name: `${groupId}`,
            type: 'group',
            missed: units.reduce((acc, u) => acc + u.missed, 0),
            secondary: units.reduce((acc, u) => acc + u.secondary, 0),
            children: units,
        };
    });

    groups.sort((a, b) => a.id.localeCompare(b.id));

    // Wrap in Facility ABCD root
    const facilityRoot: TreeGroup = {
        id: 'facility-root',
        name: 'Facility ABCD',
        type: 'root',
        missed: groups.reduce((acc, g) => acc + g.missed, 0),
        secondary: groups.reduce((acc, g) => acc + g.secondary, 0),
        children: groups
    };

    return [facilityRoot];
};
export const useGlobalSummary = () => {
    // Overdue = overdue in live
    const overdue = enhancedMockData.liveData.filter(c => c.status === 'overdue' || c.status === 'missed').length;
    // Due = due in live
    const due = enhancedMockData.liveData.filter(c => c.status === 'due').length;
    // Need Comment = missed or late in historical AND no note
    const needComment = enhancedMockData.historicalData.filter(c =>
        (c.status === 'missed' || c.status === 'late') && !c.supervisorNote
    ).length;

    return { overdue, due, needComment };
};
