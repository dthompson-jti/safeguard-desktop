// src/hooks/useAppFont.ts
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { appFontAtom } from '../desktop/atoms';

/**
 * useAppFont Hook
 * 
 * Synchronizes the appFontAtom state with the 'data-font' attribute 
 * on the document element to enable global CSS variable-based font switching.
 */
export const useAppFont = () => {
    const font = useAtomValue(appFontAtom);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-font', font);
    }, [font]);

    return font;
};
