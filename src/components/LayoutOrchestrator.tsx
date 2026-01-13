import { useAtomValue } from 'jotai';
import { useLayoutEffect } from 'react';
import { headerHeightAtom, bannerHeightAtom, totalHeaderHeightAtom } from '../data/layoutAtoms';

/**
 * Headless component that syncs layout atoms (measured by useLayoutRegistration)
 * to global CSS variables on the document root.
 * 
 * This prevents "ResizeObserver loop" errors by decoupling measurement from style updates.
 */
export const LayoutOrchestrator = () => {
    const headerHeight = useAtomValue(headerHeightAtom);
    const bannerHeight = useAtomValue(bannerHeightAtom);
    const totalHeight = useAtomValue(totalHeaderHeightAtom);

    useLayoutEffect(() => {
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        document.documentElement.style.setProperty('--banner-height', `${bannerHeight}px`);
        document.documentElement.style.setProperty('--total-header-height', `${totalHeight}px`);
    }, [headerHeight, bannerHeight, totalHeight]);

    return null;
};
