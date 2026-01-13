import { useAtomValue } from 'jotai';
import { desktopEnhancedViewAtom } from '../atoms';
import { mockLiveChecks } from '../../desktop/mockLiveData';
import { historicalChecks } from '../../desktop/mockHistoricalData';

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

    scanData(mockLiveChecks);
    scanData(historicalChecks);

    // 2. Initialize counts for the stable structure
    const countsMap = new Map<string, { missed: number; secondary: number }>();

    const getCountKey = (g: string, u: string) => `${g}||${u}`;

    // 3. Process counts only for the ACTIVE view
    if (view === 'live') {
        mockLiveChecks.forEach(check => {
            const key = getCountKey(check.group || 'Other', check.unit || 'Other');
            const current = countsMap.get(key) || { missed: 0, secondary: 0 };
            if (check.status === 'missed') current.missed++;
            if (check.status === 'due') current.secondary++;
            countsMap.set(key, current);
        });
    } else {
        historicalChecks.forEach(check => {
            const key = getCountKey(check.group || 'Other', check.unit || 'Other');
            const current = countsMap.get(key) || { missed: 0, secondary: 0 };

            const isMissedOrLate = check.status === 'missed' || check.status === 'late';
            const hasNoNote = !check.supervisorNote;
            if (isMissedOrLate && hasNoNote) current.missed++;

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
    // Overdue = missed in live
    const overdue = mockLiveChecks.filter(c => c.status === 'missed').length;
    // Due = due in live
    const due = mockLiveChecks.filter(c => c.status === 'due').length;
    // Need Comment = missed or late in historical AND no note
    const needComment = historicalChecks.filter(c =>
        (c.status === 'missed' || c.status === 'late') && !c.supervisorNote
    ).length;

    return { overdue, due, needComment };
};
