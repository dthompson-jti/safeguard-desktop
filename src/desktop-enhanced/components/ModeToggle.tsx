import React from 'react';
import { useAtom } from 'jotai';
import { desktopEnhancedViewAtom } from '../atoms';
import styles from './ModeToggle.module.css';

export const ModeToggle: React.FC = () => {
    const [view, setView] = useAtom(desktopEnhancedViewAtom);

    return (
        <div className={styles.toggleContainer}>
            <button
                className={`${styles.toggleButton} ${view === 'historical' ? styles.active : ''}`}
                onClick={() => setView('historical')}
            >
                Historical
            </button>
            <button
                className={`${styles.toggleButton} ${view === 'live' ? styles.active : ''}`}
                onClick={() => setView('live')}
            >
                Live
            </button>
        </div>
    );
};
