import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './Layout';
import { NavigationPanel } from './components/NavigationPanel';
import { Breadcrumbs } from './components/Breadcrumbs';
import { desktopEnhancedViewAtom, desktopEnhancedSelectionAtom } from './atoms';
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
import { AuthGate } from '../components/AuthGate';

export default function DesktopEnhancedApp() {
    const view = useAtomValue(desktopEnhancedViewAtom);
    const selection = useAtomValue(desktopEnhancedSelectionAtom);
    const setFilter = useSetAtom(desktopFilterAtom);
    const setDesktopView = useSetAtom(desktopViewAtom);
    const activeRecord = useAtomValue(activeDetailRecordAtom);
    const isPanelOpen = useAtomValue(isDetailPanelOpenAtom);
    const panelWidth = useAtomValue(panelWidthAtom);

    // Selection counts for panel empty states
    const selectedLive = useAtomValue(selectedLiveRowsAtom);
    const selectedHistory = useAtomValue(selectedHistoryRowsAtom);
    const totalSelected = selectedLive.size + selectedHistory.size;

    // Sync View Mode to Legacy Atom (so Toolbar works)
    useEffect(() => {
        setDesktopView(view);

        // Apply default filters when switching to historical
        if (view === 'historical') {
            setFilter(prev => ({
                ...prev,
                statusFilter: 'missed',
                commentFilter: 'no-comment',
                // Time range "Last 24h" (mock values)
                dateStart: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                dateEnd: new Date().toISOString().split('T')[0],
            }));
        } else {
            // Reset filters for Live
            setFilter(prev => ({
                ...prev,
                statusFilter: 'all',
                commentFilter: 'any',
                dateStart: null,
                dateEnd: null,
            }));
        }
    }, [view, setDesktopView, setFilter]);

    // Sync Selection to Desktop Filter
    useEffect(() => {
        setFilter(prev => {
            const next = { ...prev };

            if (selection.type === 'root') {
                next.group = 'all';
                next.unit = 'all';
            } else if (selection.type === 'group') {
                next.group = selection.id;
                next.unit = 'all';
            } else if (selection.type === 'unit') {
                next.group = 'all';
                next.unit = selection.id;
            }
            return next;
        });
    }, [selection, setFilter]);

    const showPanel = (view === 'historical' || view === 'live') && isPanelOpen;

    return (
        <AuthGate>
            <Layout leftPanel={<NavigationPanel />}>
                <div
                    data-platform="desktop"
                    data-view-mode={view}
                    className="desktop-enhanced-main-container"
                    data-panel-open={showPanel}
                    style={{
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: showPanel ? `1fr ${panelWidth}px` : '1fr',
                        flex: 1,
                        backgroundColor: 'var(--surface-bg-primary)',
                        overflow: 'hidden',
                        transition: 'grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    } as React.CSSProperties}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                        <Breadcrumbs />
                        <div style={{ flexShrink: 0 }}>
                            <DesktopToolbar />
                        </div>

                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {view === 'live' ? <LiveMonitorView /> : <HistoricalReviewView />}
                        </div>
                    </div>

                    <AnimatePresence>
                        {showPanel && (
                            <div style={{ borderLeft: '1px solid var(--surface-border-secondary)', height: '100%', position: 'relative' }}>
                                <DetailPanel record={activeRecord} selectedCount={totalSelected} />
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </Layout>
        </AuthGate>
    );
}
