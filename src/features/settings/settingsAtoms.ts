import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_PREFIX } from '../../config';
import { DEFAULT_SAFETY_CHECKS, SafetyChecksConfig } from './settingsData';

/** Currently selected settings tree node ID */
export const settingsSelectedNodeAtom = atom<string>('general');

/** Expanded node IDs in the settings tree */
export const settingsExpandedNodesAtom = atom<Set<string>>(new Set(['general', 'safety-check']));

/** Safety Check configuration (persisted) */
export const safetyChecksAtom = atomWithStorage<SafetyChecksConfig>(
  `${STORAGE_PREFIX}safety_checks_config`,
  DEFAULT_SAFETY_CHECKS
);
