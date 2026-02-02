import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './Layout';
import { NavigationPanel } from './components/NavigationPanel';
import { Breadcrumbs } from './components/Breadcrumbs';
import {
    desktopFilterAtom,
    activeDetailRecordAtom,
    isDetailPanelOpenAtom,
    autoOpenDetailPanelAtom,
    selectedHistoryRowsAtom,
    selectedLiveRowsAtom,
    panelWidthAtom,
    desktopViewAtom
} from '../desktop/atoms';
import { EnhancedLiveMonitorView as LiveMonitorView } from './components/EnhancedLiveMonitorView';
import { EnhancedHistoricalReviewView as HistoricalReviewView } from './components/EnhancedHistoricalReviewView';
import { DesktopToolbar } from '../desktop/components/DesktopToolbar';
import { DetailPanel } from '../desktop/components/DetailPanel';
import { SupervisorNoteModal } from '../desktop/components/SupervisorNoteModal';
import { ToastContainer } from '../components/ToastContainer';
import { ToastMessage } from '../components/Toast';
import { toastsAtom } from '../data/toastAtoms';
import { Button } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import { Popover } from '../components/Popover';
import styles from './DesktopEnhancedApp.module.css';

export default function DesktopEnhancedApp() {
    // FIX: Use the specific enhanced view atom shared with ModeToggle
    const view = useAtomValue(desktopViewAtom);

    const setFilter = useSetAtom(desktopFilterAtom);

    const activeRecord = useAtomValue(activeDetailRecordAtom);
    const [isPanelOpen, setIsPanelOpen] = useAtom(isDetailPanelOpenAtom);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const autoOpenPanel = useAtomValue(autoOpenDetailPanelAtom);
    const panelWidth = useAtomValue(panelWidthAtom);

    const toasts = useAtomValue(toastsAtom);

    // Selection counts for panel empty states
    const [selectedLive, setSelectedLive] = useAtom(selectedLiveRowsAtom);
    const [selectedHistory, setSelectedHistory] = useAtom(selectedHistoryRowsAtom);
    const setActiveRecord = useSetAtom(activeDetailRecordAtom);
    const totalSelected = selectedLive.size + selectedHistory.size;

    // Track mount state to prevent resetting persisted filters on reload
    const isMountedRef = useRef(false);

    // Handle View Switching Logic
    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }

        setActiveRecord(null);
        setSelectedLive(new Set());
        setSelectedHistory(new Set());

        // Apply default filters when explicitly switching views
        if (view === 'historical') {
            setFilter(prev => ({
                ...prev,
                historicalStatusFilter: 'missed-not-reviewed',
                // Time range "Last 24h" (mock values)
                dateStart: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                dateEnd: new Date().toISOString().split('T')[0],
            }));
        } else {
            // Reset filters for Live
            setFilter(prev => ({
                ...prev,
                statusFilter: 'all',
                dateStart: null,
                dateEnd: null,
            }));
        }
    }, [view, setFilter, setActiveRecord, setSelectedLive, setSelectedHistory]);

    /**
     * ARCHITECTURAL INVARIANT: Side Panel Visibility
     * The panel is visible if:
     * 1. It is explicitly "Open" (Preview Mode) (isPanelOpen === true)
     * 2. Auto-open is ENABLED AND exactly one record is selected (Transient Mode)
     */
    const showPanel = isPanelOpen || (autoOpenPanel && totalSelected === 1);
    const [isResizing, setIsResizing] = useState(false);

    // Grid styling removed in favor of Flexbox optimization
    // const mainContainerStyle = ...

    return (
        <Layout leftPanel={<NavigationPanel />}>
            <ToastPrimitive.Provider swipeDirection="right" swipeThreshold={80}>
                <div
                    data-platform="desktop"
                    data-view-mode={view}
                    className={styles.mainContainer}
                    data-panel-open={showPanel}
                >
                    <div className={styles.contentWrapper}>
                        <div className={styles.navContainer}>
                            <div className={styles.navRow1}>
                                <Breadcrumbs />
                            </div>
                            <div className={styles.navRow2}>
                                <h2 className={styles.pageTitle}>
                                    Safeguard checks – {view === 'live' ? 'Live view' : 'Historical view'}
                                </h2>

                                <div className={styles.row2Actions}>
                                    <Popover
                                        open={isExportOpen}
                                        onOpenChange={setIsExportOpen}
                                        align="end"
                                        trigger={
                                            <Button
                                                variant="secondary"
                                                size="s"
                                            >
                                                Export
                                            </Button>
                                        }
                                    >
                                        <div className="menuPopover">
                                            <button className="menuItem" onClick={() => console.log('Export Excel')}>
                                                <span className="material-symbols-rounded">table_view</span>
                                                Excel
                                            </button>
                                            <button className="menuItem" onClick={() => console.log('Export XML')}>
                                                <span className="material-symbols-rounded">code</span>
                                                XML
                                            </button>
                                            <button className="menuItem" onClick={() => console.log('Export CSV')}>
                                                <span className="material-symbols-rounded">description</span>
                                                CSV
                                            </button>
                                            <button className="menuItem" onClick={() => console.log('Export PDF')}>
                                                <span className="material-symbols-rounded">picture_as_pdf</span>
                                                PDF
                                            </button>
                                            <button className="menuItem" onClick={() => console.log('Export RTF')}>
                                                <span className="material-symbols-rounded">text_snippet</span>
                                                RTF
                                            </button>
                                        </div>
                                    </Popover>

                                    <Tooltip content={showPanel ? "Close side panel" : "Open side panel"}>
                                        <Button
                                            variant="secondary"
                                            size="s"
                                            iconOnly
                                            active={isPanelOpen}
                                            onClick={() => {
                                                if (showPanel) {
                                                    // Close and Clear Selection
                                                    setIsPanelOpen(false);
                                                    setSelectedLive(new Set());
                                                    setSelectedHistory(new Set());
                                                } else {
                                                    // Open/Pin
                                                    setIsPanelOpen(true);
                                                }
                                            }}
                                        >
                                            <span className="material-symbols-rounded">
                                                {showPanel ? 'right_panel_close' : 'right_panel_open'}
                                            </span>
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        <div className={styles.toolbarWrapper}>
                            <DesktopToolbar isEnhanced={true} />
                        </div>

                        <div className={styles.viewWrapper}>
                            {view === 'live' ? <LiveMonitorView /> : <HistoricalReviewView />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {showPanel && (
                            <motion.div
                                className={styles.detailPanelWrapper}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{
                                    width: isResizing ? 'var(--panel-width)' : panelWidth,
                                    opacity: 1
                                }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{
                                    type: 'tween',
                                    ease: [0.16, 1, 0.3, 1],
                                    duration: isResizing ? 0 : 0.3
                                }}
                                style={{ overflow: 'hidden' }}
                                data-resizing={isResizing}
                            >
                                <DetailPanel
                                    record={activeRecord}
                                    selectedCount={totalSelected}
                                    onResizeStart={() => setIsResizing(true)}
                                    onResizeEnd={() => setIsResizing(false)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <SupervisorNoteModal />

                    {/* Toast System */}
                    <AnimatePresence>
                        {toasts.map((toast) => (
                            <ToastMessage key={toast.id} {...toast} />
                        ))}
                    </AnimatePresence>
                    <ToastContainer platform="desktop" />
                </div>
            </ToastPrimitive.Provider>
        </Layout>
    );
}
