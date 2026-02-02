// src/components/EmptyStateMessage.tsx
import { ReactNode } from 'react';
import styles from './EmptyStateMessage.module.css';

interface EmptyStateMessageProps {
  icon?: string;
  title: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
}

/**
 * EmptyStateMessage
 * 
 * ARCHITECTURAL INVARIANT: 
 * - This is the single source of truth for all empty states.
 * - Enforces the two-line "No search results" design from Figma.
 */
export const EmptyStateMessage = ({
  title,
  message,
  action,
}: EmptyStateMessageProps) => {
  return (
    <div className={styles.emptyStateContainer}>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      {message && <p className={styles.emptyStateMessage}>{message}</p>}
      {action && <div className={styles.actionContainer}>{action}</div>}
    </div>
  );
};