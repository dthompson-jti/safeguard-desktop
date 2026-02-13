import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { STORAGE_PREFIX } from '../config';

type Theme = 'light' | 'dark';

// The atom holds the user's theme preference.
export const themeAtom = atom<Theme>((() => {
    try {
        const stored = localStorage.getItem(`${STORAGE_PREFIX}theme`);
        if (stored === 'light') return 'light';
        if (stored === 'dark' || (stored && stored.startsWith('dark-'))) {
            return 'dark'; // Migrate dark-a, dark-b, dark-c to 'dark'
        }
        return 'light'; // Default to light
    } catch {
        return 'light';
    }
})());

export const useTheme = () => {
    const [theme, _setTheme] = useAtom(themeAtom);

    const setTheme = (newTheme: Theme) => {
        _setTheme(newTheme);
    };

    useEffect(() => {
        const root = document.documentElement;

        // Apply the theme
        if (theme === 'light') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', theme);
        }

        // Persist choice
        try {
            localStorage.setItem(`${STORAGE_PREFIX}theme`, theme);
        } catch {
            // Ignore storage errors
        }
    }, [theme]);

    return { theme, setTheme };
};
