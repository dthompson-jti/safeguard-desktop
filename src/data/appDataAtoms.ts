// src/data/appDataAtoms.ts
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { SafetyCheck } from '../types';
import { STORAGE_PREFIX } from '../config';
import { initialChecks, generateInitialChecks } from './mock/checkData';

// =================================================================
//                 Smart Storage with Debounce & Pruning
// =================================================================

const STORAGE_KEY = `${STORAGE_PREFIX}checks_v1`;

// Debounce Utility to prevent UI freezing on write
const debounce = (fn: (key: string, value: string) => void, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (key: string, value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(key, value), ms);
  };
};

const debouncedSetItem = debounce((key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Storage Error:', error);
  }
}, 1000); // 1 second delay

const safeStorage = createJSONStorage<SafetyCheck[]>(() => ({
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => debouncedSetItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
}));

const baseChecksAtom = atomWithStorage<SafetyCheck[]>(STORAGE_KEY, initialChecks, safeStorage);

// =================================================================
//                Core Application Data & Reducer
// =================================================================

export type AppAction =
  | { type: 'RESET_DATA' };

export const dispatchActionAtom = atom(null, (_get, set, action: AppAction) => {
  if (action.type === 'RESET_DATA') {
    set(baseChecksAtom, generateInitialChecks());
  }
});

// Alias for compatibility if needed elsewhere
export const safetyChecksAtom = baseChecksAtom;

// Placeholder derived atoms for minimal compatibility if required by shared components
export const statusCountsAtom = atom(() => ({ missed: 0, due: 0, pending: 0, completed: 0, queued: 0 }));
