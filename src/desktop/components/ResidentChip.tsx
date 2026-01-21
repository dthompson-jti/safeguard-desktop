import React from 'react';
import styles from './ResidentChip.module.css';
import { Tooltip } from '../../components/Tooltip';

import { ResidentBadgeTextMode } from '../atoms';

interface ResidentChipProps {
    name: string;
    showHighRisk?: boolean;
    showMedicalWatch?: boolean;
    textMode?: ResidentBadgeTextMode;
}

export const ResidentChip: React.FC<ResidentChipProps> = ({ name, showHighRisk, showMedicalWatch, textMode = 'short' }) => {
    // Only show one status if multiple exist, prioritize SR over MW?
    // User requirement: "wrap the resident with special statuses... into a chip... name | icon initial"
    // Assuming if both are present, we might want to show both or prioritize. 
    // The requirement says "The chip should use the warning semantic... AND initial like MW of SR"
    // Let's implement showing one at a time or both if needed, but the design seems to point to a single chip.
    // Let's prioritize SR if both are present for the initial version to match the "single chip" aesthetic, 
    // or arguably render multiple chips if they are distinct statuses. 
    // However, the prompt says "residents... into A chip", implying the resident name is inside the chip.
    // So if a resident has multiple statuses, it's still ONE chip.

    // Let's just determine the primary status to show.
    let statusLabel = '';
    let tooltip = '';

    const srLabel = textMode === 'full' ? 'Suicide risk' : 'SR';
    const mwLabel = textMode === 'full' ? 'Medical watch' : 'MW';

    if (showHighRisk) {
        statusLabel = srLabel;
        tooltip = 'Suicide Risk';
    }
    if (showMedicalWatch) {
        if (statusLabel) {
            statusLabel += ` / ${mwLabel}`;
            tooltip += ', Medical Watch';
        } else {
            statusLabel = mwLabel;
            tooltip = 'Medical Watch';
        }
    }

    if (!statusLabel) return <span style={{ fontWeight: 500, color: 'var(--surface-fg-primary)' }}>{name}</span>;

    return (
        <Tooltip content={tooltip}>
            <div className={styles.chip}>
                <span className={styles.name}>{name}</span>
                <div className={styles.separator} />
                <span className={`material-symbols-rounded ${styles.icon}`}>warning</span>
                <span className={styles.status}>{statusLabel}</span>
            </div>
        </Tooltip>
    );
};
