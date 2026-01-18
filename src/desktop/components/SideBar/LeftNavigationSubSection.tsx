import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LeftNavigationSubSection.module.css';

interface LeftNavigationSubSectionProps {
    label: string;
    isOpen?: boolean;
    onToggle?: () => void;
    children?: React.ReactNode;
    level?: number;
}

export const LeftNavigationSubSection: React.FC<LeftNavigationSubSectionProps> = ({
    label,
    isOpen: controlledIsOpen,
    onToggle,
    children,
    level = 0
}) => {
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const isOpen = controlledIsOpen ?? localIsOpen;
    const handleToggle = onToggle ?? (() => setLocalIsOpen(!localIsOpen));

    const contentId = `subsection-content-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={styles.subsection} data-level={level}>
            <button
                className={styles.header}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={contentId}
            >
                <svg
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.label}>{label}</span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={contentId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className={styles.content}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
