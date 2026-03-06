import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { settingsSelectedNodeAtom, settingsExpandedNodesAtom } from '../settingsAtoms';
import { SETTINGS_TREE, SettingsNode } from '../settingsData';
import { Button } from '../../../components/Button';
import styles from './SettingsTree.module.css';

interface TreeItemProps {
  id: string;
  label: string;
  isExpanded?: boolean;
  isSelected: boolean;
  onToggle?: (e: React.MouseEvent) => void;
  onSelect: () => void;
  depth: number;
  children?: React.ReactNode;
}

const TreeItem = React.memo<TreeItemProps>(({
  label,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
  depth,
  children
}) => {
  const isExpandable = !!children;

  return (
    <div className={styles.nodeWrapper}>
      <div
        className={`${styles.row} ${isSelected ? styles.selected : ''}`}
        onClick={() => onSelect()}
        style={{ '--depth': depth } as React.CSSProperties}
      >
        {isExpandable ? (
          <Button
            variant="quaternary"
            size="xs"
            iconOnly
            className={styles.chevron}
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.(e);
            }}
          >
            <span
              className="material-symbols-rounded"
              style={{
                fontSize: 18,
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
              }}
            >
              chevron_right
            </span>
          </Button>
        ) : (
          <div className={styles.indentSpacer} />
        )}


        <span className={styles.label}>{label}</span>
      </div>
      {isExpanded && children && (
        <div className={styles.children}>
          {children}
        </div>
      )}
    </div>
  );
});

export const SettingsTree: React.FC = () => {
  const [selectedNode, setSelectedNode] = useAtom(settingsSelectedNodeAtom);
  const [expandedNodes, setExpandedNodes] = useAtom(settingsExpandedNodesAtom);

  const toggleExpand = useCallback((id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [setExpandedNodes]);

  const renderNode = (node: SettingsNode, depth: number = 0) => {
    const isSelected = selectedNode === node.id;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <TreeItem
        key={node.id}
        id={node.id}
        label={node.label}
        isSelected={isSelected}
        isExpanded={isExpanded}
        onToggle={() => toggleExpand(node.id)}
        onSelect={() => setSelectedNode(node.id)}
        depth={depth}
      >
        {node.children?.map((child) => renderNode(child, depth + 1))}
      </TreeItem>
    );
  };

  return (
    <div className={styles.tree}>
      {SETTINGS_TREE.map(node => renderNode(node, 0))}
    </div>
  );
};
