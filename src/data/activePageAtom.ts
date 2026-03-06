import { atom } from 'jotai';

export type ActivePage = 'checks' | 'settings' | 'settings-tabs';

/** Top-level page routing — NOT the same as desktopViewAtom (live/historical) */
export const activePageAtom = atom<ActivePage>('checks');
