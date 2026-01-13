import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import styles from './Layout.module.css';
import { TopNav } from './components/TopNav';
import { ExtremeLeftNav } from './components/ExtremeLeftNav';
import { desktopEnhancedPanelWidthAtom } from './atoms';
import { useLayoutRegistration } from '../data/useLayoutRegistration';
import { headerHeightAtom } from '../data/layoutAtoms';

interface LayoutProps {
    leftPanel: React.ReactNode;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ leftPanel, children }) => {
    const [width, setWidth] = useAtom(desktopEnhancedPanelWidthAtom);
    const [isResizing, setIsResizing] = useState(false);
    const widthRef = useRef(width);
    const topNavRef = useLayoutRegistration(headerHeightAtom);

    const startResizing = useCallback((e: React.MouseEvent) => {
        setIsResizing(true);
        e.preventDefault();
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
        setWidth(widthRef.current);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, [setWidth]);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            // Use CSS property for the offset from the strip
            const stripWidthStr = getComputedStyle(document.documentElement).getPropertyValue('--extreme-left-nav-width').trim();
            const stripWidth = parseInt(stripWidthStr) || 192;
            const newWidth = e.clientX - stripWidth;
            if (newWidth > 200 && newWidth < 600) {
                widthRef.current = newWidth;
                document.documentElement.style.setProperty('--desktop-panel-width', `${newWidth}px`);
            }
        }
    }, [isResizing]);

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <div className={styles.layout}>
            <TopNav ref={topNavRef as React.RefObject<HTMLDivElement>} />
            <div className={styles.body}>
                <ExtremeLeftNav />
                <div
                    className={styles.leftPanelWrapper}
                    style={{ width: `var(--desktop-panel-width, ${width}px)` }}
                >
                    {leftPanel}
                    <div
                        className={`${styles.resizer} ${isResizing ? styles.resizerActive : ''}`}
                        onMouseDown={startResizing}
                    >
                        <div className={styles.resizeIndicator} />
                    </div>
                </div>
                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
};
