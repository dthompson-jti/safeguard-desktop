import React from 'react';
import { useAtomValue } from 'jotai';
import { settingsSelectedNodeAtom } from '../settingsAtoms';
import { SETTINGS_TREE, SettingsNode } from '../settingsData';
import { SafetyChecksForm } from './SafetyChecksForm';
import { PlaceholderSection } from './PlaceholderSection';

export const SettingsContent: React.FC = () => {
  const selectedNode = useAtomValue(settingsSelectedNodeAtom);

  const findNode = (nodes: SettingsNode[], id: string): SettingsNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const node = findNode(SETTINGS_TREE, selectedNode);
  const nodeLabel = node ? node.label : 'System Properties';

  switch (selectedNode) {
    case 'safety-check':
      return <SafetyChecksForm />;
    default:
      return <PlaceholderSection title={nodeLabel} />;
  }
};
