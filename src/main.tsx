import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'jotai'

import DesktopApp from './desktop/App'
import DesktopEnhancedApp from './desktop-enhanced/DesktopEnhancedApp'
import { HeartbeatManager } from './data/HeartbeatManager'
import { LayoutOrchestrator } from './components/LayoutOrchestrator'

import './styles/index.css'
import { STORAGE_PREFIX } from './config'

// --- VERSION BOMB ---
const APP_VERSION = 'v5_desktop';
const STORAGE_VERSION_KEY = `${STORAGE_PREFIX}version_marker`;

try {
  const currentVersion = localStorage.getItem(STORAGE_VERSION_KEY);
  if (currentVersion !== APP_VERSION) {
    console.warn(`Version mismatch (found ${currentVersion}, expected ${APP_VERSION}). Clearing storage.`);
    localStorage.clear();
    localStorage.setItem(STORAGE_VERSION_KEY, APP_VERSION);
  }
} catch (e) {
  console.error('Failed to check/clear storage version:', e);
}
// --------------------

const getApp = () => {
  // 1. Explicit Route for Desktop Enhanced
  if (window.location.pathname.includes('/desktop-enhanced')) {
    return <DesktopEnhancedApp />;
  }

  // Default Desktop
  return <DesktopApp />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <HeartbeatManager />
      <LayoutOrchestrator />
      {getApp()}
    </Provider>
  </React.StrictMode>,
)