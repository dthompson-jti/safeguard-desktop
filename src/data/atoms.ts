// src/data/atoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_PREFIX } from '../config';

// =================================================================
//                      Global Time State (Heartbeat)
// =================================================================

export const fastTickerAtom = atom<number>(Date.now());
export const throttledTickerAtom = atom<number>(Date.now()); // 10fps (For Text Timers)
export const slowTickerAtom = atom<number>(Date.now());

// =================================================================
//                      Session State
// =================================================================

import type { User } from './users';

interface Session {
  isAuthenticated: boolean;
  user: User | null;
}

export const sessionAtom = atom<Session>({
  isAuthenticated: false,
  user: null,
});

// User preferences (avatar color overrides)
interface UserPreferences {
  [username: string]: {
    avatarHue?: number; // Custom hue override (0-360)
  };
}

export const userPreferencesAtom = atomWithStorage<UserPreferences>(`${STORAGE_PREFIX}user_prefs`, {});

// =================================================================
//                  Global UI & Layout State
// =================================================================

export const isOfflineToggleVisibleAtom = atomWithStorage(`${STORAGE_PREFIX}feat_offline_toggle`, false);

// =================================================================
//                App Configuration & Status State
// =================================================================

export type ConnectionStatus = 'online' | 'offline' | 'syncing' | 'connected';
const _connectionStatusAtom = atom<ConnectionStatus>('online');
export const offlineTimestampAtom = atom<number | null>(null);

export const connectionStatusAtom = atom(
  (get) => get(_connectionStatusAtom),
  (get, set, newStatus: ConnectionStatus) => {
    const currentStatus = get(_connectionStatusAtom);
    if (newStatus === 'offline' && currentStatus !== 'offline') {
      set(offlineTimestampAtom, Date.now());
    } else if (newStatus === 'online') {
      set(offlineTimestampAtom, null);
    }
    set(_connectionStatusAtom, newStatus);
  }
);

interface AppConfig {
  showEnvironmentName: boolean;
  environmentName: string;
}

export const appConfigAtom = atomWithStorage<AppConfig>(`${STORAGE_PREFIX}config`, {
  showEnvironmentName: (import.meta.env.VITE_SHOW_ENVIRONMENT as string) === 'true',
  environmentName: (import.meta.env.VITE_ENVIRONMENT_NAME as string) || 'https://vicbc-qa-symphony.logan-symphony.com',
});

// =================================================================
//                       Global Actions
// =================================================================

export const logoutAtom = atom(null, (_get, set) => {
  set(sessionAtom, { isAuthenticated: false, user: null });
});
