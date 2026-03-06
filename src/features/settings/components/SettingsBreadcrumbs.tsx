import React from 'react';
import { useAtom } from 'jotai';
import { settingsSelectedNodeAtom } from '../settingsAtoms';
import { SETTINGS_TREE, SettingsNode } from '../settingsData';
import styles from './SettingsBreadcrumbs.module.css';

export const SettingsBreadcrumbs: React.FC = () => {
  const [selectedNode, setSelectedNode] = useAtom(settingsSelectedNodeAtom);

  // Helper to find the path to the selected node
  const getPath = (nodes: SettingsNode[], targetId: string, currentPath: SettingsNode[] = []): SettingsNode[] | null => {
    for (const node of nodes) {
      if (node.id === targetId) {
        return [...currentPath, node];
      }
      if (node.children) {
        const path = getPath(node.children, targetId, [...currentPath, node]);
        if (path) return path;
      }
    }
    return null;
  };

  const path = getPath(SETTINGS_TREE, selectedNode) || [];
  const displayPath = path[0]?.id === 'general' ? path.slice(1) : path;

  return (
    <nav className={styles.container} aria-label="Breadcrumb">
      <div className={styles.parts}>
        <div className={styles.part}>
          <button
            className={styles.text}
            onClick={() => setSelectedNode('general')}
          >
            System Properties
          </button>

          {displayPath.length > 0 && (
            <span className={`material-symbols-rounded ${styles.chevron}`}>
              chevron_right
            </span>
          )}
        </div>

        {displayPath.map((node, index) => (
          <div key={node.id} className={styles.part}>
            <button
              className={styles.text}
              onClick={() => setSelectedNode(node.id)}
            >
              {node.label}
            </button>
            {index < displayPath.length - 1 && (
              <span className={`material-symbols-rounded ${styles.chevron}`}>
                chevron_right
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
