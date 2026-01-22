// src/components/Toast.tsx
import { useEffect, useRef } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useSetAtom } from 'jotai';
import { motion } from 'framer-motion';
import { removeToastAtom, Toast } from '../data/toastAtoms';

/**
 * A self-contained, animated toast instance. It wraps Radix's Root component
 * with Framer Motion to handle animations, adhering to the project's canonical
 * 'spring' animation principle for a consistent, high-craft feel.
 * 
 * ARCHITECTURAL INVARIANT: Structure
 * Toasts support an optional 'title' and a required 'message'. 
 * If a title is provided, it is rendered prominently above the message.
 * Screen-reader accessibility is maintained via Radix Toast primitives.
 */
export const ToastMessage = ({ id, title, message, icon, variant = 'neutral', timestamp, action, persistent }: Toast) => {
  const removeToast = useSetAtom(removeToastAtom);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss logic that respects updates (timestamp)
  useEffect(() => {
    // Only set a timer for non-persistent variants AND if not explicitly persistent
    const shouldAutoDismiss = !['alert', 'warning'].includes(variant) && !persistent;

    if (shouldAutoDismiss) {
      timerRef.current = setTimeout(() => {
        removeToast(id);
      }, 4000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id, timestamp, variant, persistent, removeToast]);

  return (
    <ToastPrimitive.Root
      asChild
      forceMount // Let AnimatePresence control mounting
      duration={Infinity} // We handle timing manually via useEffect to support updates
      onOpenChange={(open) => {
        if (!open) {
          // This handles both timed and swipe dismissals
          removeToast(id);
        }
      }}
    >
      <motion.li
        // FIX: Removed `layout` prop.
        // Framer Motion's layout projection interferes with Radix's CSS transform-based 
        // swipe gestures. Removing it ensures the toast tracks the finger 1:1 during swipe.
        className={`toast-root ${variant}`}
        data-variant={variant}
        initial={{ y: -20, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <span className="material-symbols-rounded toast-icon">{icon}</span>

        <div className="toast-content">
          {title && <div className="toast-title">{title}</div>}
          <ToastPrimitive.Description className="toast-description">{message}</ToastPrimitive.Description>
        </div>

        {action && (
          <button
            className="toast-action"
            onClick={(e) => {
              e.stopPropagation(); // Prevent swipe trigger if any
              action.onClick();
            }}
          >
            {action.label}
          </button>
        )}

        <ToastPrimitive.Close
          className="toast-close-button btn"
          data-variant="on-solid"
          data-size="lg"
          data-icon-only="true"
          aria-label="Close"
        >
          <span className="material-symbols-rounded">close</span>
        </ToastPrimitive.Close>
      </motion.li>
    </ToastPrimitive.Root>
  );
};