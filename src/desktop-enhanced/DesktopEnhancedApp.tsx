import { useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './Layout';
import { NavigationPanel } from './components/NavigationPanel';
import { Breadcrumbs } from './components/Breadcrumbs';
import { desktopEnhancedViewAtom } from './atoms';
import {
    desktopFilterAtom,
    desktopViewAtom,
    activeDetailRecordAtom,
    isDetailPanelOpenAtom,
    selectedHistoryRowsAtom,
    selectedLiveRowsAtom,
    panelWidthAtom
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
import { Popover } from '../components/Popover';
import styles from './DesktopEnhancedApp.module.css';

export default function DesktopEnhancedApp() {
    const view = useAtomValue(desktopEnhancedViewAtom);
    const setFilter = useSetAtom(desktopFilterAtom);
    const setDesktopView = useSetAtom(desktopViewAtom);
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

    // Sync View Mode to Legacy Atom (so Toolbar works)
    useEffect(() => {
        setDesktopView(view);
        // Clear active record and selections on view switch to prevent stale states
        setActiveRecord(null);
        setSelectedLive(new Set());
        setSelectedHistory(new Set());

        // Apply default filters when switching to historical
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
    }, [view, setDesktopView, setFilter, setActiveRecord, setSelectedLive, setSelectedHistory]);

    // Note: Selection syncing to desktop filter is now handled exclusively in Layout.tsx
    // to avoid duplication and potential race conditions.

    const showPanel = view === 'historical' && isPanelOpen;

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
                                            <button className="menuItem" onClick={() => setIsMoreActionsOpen(false)}>
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

