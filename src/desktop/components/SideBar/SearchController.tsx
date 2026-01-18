import React from 'react';
import { useAtom } from 'jotai';
import { sidebarSearchQueryAtom, sidebarExpandedAtom } from '../../atoms';
import { SearchInput } from '../../../components/SearchInput';
import styles from './SearchController.module.css';


const CollapseIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor" />
    </svg>
);

const ExpandIcon = () => (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
    </svg>
);

export const SearchController: React.FC = () => {
    const [query, setQuery] = useAtom(sidebarSearchQueryAtom);
    const [isExpanded, setIsExpanded] = useAtom(sidebarExpandedAtom);

    return (
        <div className={styles.container} data-collapsed={!isExpanded}>
            {isExpanded ? (
                <div className={styles.inputWrapper}>
                    <SearchInput
                        value={query}
                        onChange={setQuery}
                        placeholder="Find"
                        flavor="instant"
                        size="sm"
                    />
                </div>
            ) : (
                <div className={styles.collapsedIcon} onClick={() => setIsExpanded(true)}>
                    <span className="material-symbols-rounded">search</span>
                </div>
            )}

            <button
                className={styles.toggleButton}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
                {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
            </button>
        </div>
    );
};
