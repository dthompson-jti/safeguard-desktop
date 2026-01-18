import { useEffect, useMemo, useState, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './Layout';
import { NavigationPanel } from './components/NavigationPanel';
import { Breadcrumbs } from './components/Breadcrumbs';
import {
    desktopFilterAtom,
    activeDetailRecordAtom,
    isDetailPanelOpenAtom,
    selectedHistoryRowsAtom,
    selectedLiveRowsAtom,
    panelWidthAtom,
    saveFiltersAsDefaultAtom,
    desktopViewAtom
} from '../desktop/atoms';
import { EnhancedLiveMonitorView as LiveMonitorView } from './components/EnhancedLiveMonitorView';
import { EnhancedHistoricalReviewView as HistoricalReviewView } from './components/EnhancedHistoricalReviewView';
import { DesktopToolbar } from '../desktop/components/DesktopToolbar';
import { DetailPanel } from '../desktop/components/DetailPanel';
import { SupervisorNoteModal } from '../desktop/components/SupervisorNoteModal';
import { ToastContainer } from '../components/ToastContainer';
import { ToastMessage } from '../components/Toast';
import { toastsAtom, addToastAtom } from '../data/toastAtoms';
import { Button } from '../components/Button';
import { Popover } from '../components/Popover';
import styles from './DesktopEnhancedApp.module.css';

export default function DesktopEnhancedApp() {
    // FIX: Use the specific enhanced view atom shared with ModeToggle
    const view = useAtomValue(desktopViewAtom);

    const setFilter = useSetAtom(desktopFilterAtom);
    const saveDefaults = useSetAtom(saveFiltersAsDefaultAtom);
    const addToast = useSetAtom(addToastAtom);
    const activeRecord = useAtomValue(activeDetailRecordAtom);
    const [isPanelOpen, setIsPanelOpen] = useAtom(isDetailPanelOpenAtom);
    const panelWidth = useAtomValue(panelWidthAtom);
    const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
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
                historicalStatusFilter: 'missed-uncommented',
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

    const showPanel = view === 'historical' && isPanelOpen;

    const handleSaveDefaults = () => {
        saveDefaults();
        addToast({
            message: 'Current filters saved as default',
            icon: 'bookmark',
            variant: 'success'
        });
        setIsMoreActionsOpen(false);
    };

    const mainContainerStyle = useMemo(() => ({
        gridTemplateColumns: showPanel ? `1fr ${panelWidth}px` : '1fr',
    }), [showPanel, panelWidth]);

    return (
        <Layout leftPanel={<NavigationPanel />}>
            <ToastPrimitive.Provider swipeDirection="right" swipeThreshold={80}>
                <div
                    data-platform="desktop"
                    data-view-mode={view}
                    className={styles.mainContainer}
                    data-panel-open={showPanel}
                    style={mainContainerStyle}
                >
                    <div className={styles.contentWrapper}>
                        <div className={styles.navContainer}>
                            <div className={styles.navRow1}>
                                <Breadcrumbs />
                            </div>
                            <div className={styles.navRow2}>
                                <div className={styles.row2Actions}>
                                    {view === 'historical' && (
                                        <Button variant="secondary" size="s">
                                            Export
                                        </Button>
                                    )}
                                    <Popover
                                        open={isMoreActionsOpen}
                                        onOpenChange={setIsMoreActionsOpen}
                                        trigger={
                                            <Button variant="secondary" size="s" iconOnly>
                                                <span className="material-symbols-rounded">more_horiz</span>
                                            </Button>
                                        }
                                    >
                                        <div className="menuPopover">
                                            <button className="menuItem" onClick={() => setIsMoreActionsOpen(false)}>
                                                <span className="material-symbols-rounded">qr_code</span>
                                                Generate QR codes
                                            </button>
                                            <button className="menuItem" onClick={() => setIsMoreActionsOpen(false)}>
                                                <span className="material-symbols-rounded">corporate_fare</span>
                                                Manage facilities
                                            </button>
                                            <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--control-border-secondary)' }} />
                                            <button className="menuItem" onClick={handleSaveDefaults}>
                                                <span className="material-symbols-rounded">bookmark</span>
                                                Save as my defaults
                                            </button>
                                            <button className="menuItem" onClick={() => setIsMoreActionsOpen(false)}>
                                                <span className="material-symbols-rounded">settings</span>
                                                Settings
                                            </button>
                                        </div>
                                    </Popover>
                                    {view === 'historical' && (
                                        <Button
                                            variant="secondary"
                                            size="s"
                                            iconOnly
                                            active={isPanelOpen}
                                            onClick={() => setIsPanelOpen(!isPanelOpen)}
                                        >
                                            <span className="material-symbols-rounded">
                                                {isPanelOpen ? 'right_panel_close' : 'right_panel_open'}
                                            </span>
                                        </Button>
                                    )}
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
                            <div className={styles.detailPanelWrapper}>
                                <DetailPanel record={activeRecord} selectedCount={totalSelected} />
                            </div>
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
