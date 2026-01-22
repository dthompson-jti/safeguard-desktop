export type BadgeTextMode = 'full' | 'short';

export const RISK_ACRONYMS: Record<string, string> = {
    'Suicide Risk': 'SR',
    'Medical Watch': 'MW',
    'Assault Risk': 'AR',
    'Escape Risk': 'ER',
    'Flight Risk': 'FR',
    'Self Harm': 'SH',
    'Fall Risk': 'FL',
};

/**
 * Gets the display label for a badge based on the current text mode.
 * @param label The full label text (e.g., "Suicide Risk")
 * @param mode The current badge text mode ('full' or 'short')
 * @returns The label to display
 */
export const getBadgeLabel = (label: string, mode: BadgeTextMode): string => {
    if (mode === 'full') {
        return label;
    }

    // Check specific acronyms first
    if (RISK_ACRONYMS[label]) {
        return RISK_ACRONYMS[label];
    }

    // Fallback: Take first 2 letters, uppercase
    return label.substring(0, 2).toUpperCase();
};
