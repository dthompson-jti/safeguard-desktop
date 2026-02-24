import React from 'react';
import { Resident } from '../../types'; // Import from global types
import { StatusBadge, StatusBadgeType } from './StatusBadge';
import { useAtomValue } from 'jotai';
import { residentBadgeColorModeAtom, residentBadgeTextAtom } from '../atoms';
import { getBadgeLabel } from '../utils/badgeUtils';

interface ResidentStatusGroupProps {
    residents: Resident[];
    view: 'table' | 'detail';
}

interface BadgeItem {
    label: string;
    status: StatusBadgeType; // 'special' mainly
    tooltip: string;
    priority: number;
}

export const ResidentStatusGroup: React.FC<ResidentStatusGroupProps> = ({ residents, view }) => {
    const colorMode = useAtomValue(residentBadgeColorModeAtom);
    const badgeTextMode = useAtomValue(residentBadgeTextAtom);
    // 1. Flatten all statuses from all residents into a single list of simplified objects
    // We want to know: { label: string, status: StatusBadgeType, tooltip: string }

    const allBadges: BadgeItem[] = [];

    residents.forEach(r => {
        // High Risk (Suicide Risk)
        if (r.hasHighRisk) {
            allBadges.push({
                label: 'Suicide Risk',
                status: 'special',
                tooltip: `${r.name}: Suicide Risk`,
                priority: 1
            });
        }
        // Medical Watch
        if (r.hasMedicalWatch) {
            allBadges.push({
                label: 'Medical Watch',
                status: 'special',
                tooltip: `${r.name}: Medical Watch`,
                priority: 2
            });
        }
        // Other Risks
        if (r.otherRisks) {
            r.otherRisks.forEach(risk => {
                allBadges.push({
                    label: risk,
                    status: 'special', // We might want a different color eventually, but 'special' (warning) is safe
                    tooltip: `${r.name}: ${risk}`,
                    priority: 5
                });
            });
        }
    });

    // 2. Sort by Priority
    allBadges.sort((a, b) => a.priority - b.priority);

    if (allBadges.length === 0) return null;

    // 3. Render
    const limit = 3;
    const isTable = view === 'table';
    const visibleBadges = isTable ? allBadges.slice(0, limit) : allBadges;

    return (
        <div style={{
            display: 'flex',
            gap: view === 'detail' ? '8px' : '4px',
            flexWrap: 'wrap',
            alignItems: 'center'
        }}>
            {visibleBadges.map((badge, i) => (
                <StatusBadge
                    key={i}
                    status={badge.status}
                    label={view === 'table' ? getBadgeLabel(badge.label, badgeTextMode) : badge.label}
                    fill
                    tooltip={badge.tooltip}
                    colorMode={colorMode}
                />
            ))}
        </div>
    );
};

