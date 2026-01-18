import React, { useState } from 'react';
import styles from './TopNav.module.css';
import { TopNavAvatar } from './TopNavAvatar';
import { TopNavMenu } from './TopNavMenu';
import { SearchInput } from '../../components/SearchInput';

export const TopNav = React.forwardRef<HTMLDivElement>((_, ref) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (val: string) => {
        console.log('Search triggered:', val);
    };

    return (
        <div className={styles.topNav} ref={ref}>
            {/* LEFT GROUP: System & Quick Tools */}
            <div className={styles.leftSection}>
                <TopNavMenu />
                <span className={styles.logoText}>eSupervision</span>

                <div className={styles.verticalDivider} />

                <button className={styles.iconButton} title="Favorites">
                    <span className="material-symbols-rounded">star_border</span>
                </button>
                <button className={styles.iconButton} title="My Team">
                    <span className="material-symbols-rounded">group</span>
                </button>
                <button className={styles.iconButton} title="Calendar">
                    <span className="material-symbols-rounded">calendar_today</span>
                </button>
            </div>

            {/* CENTER GROUP: Global Search */}
            <div className={styles.centerSection}>
                <div className={styles.searchContainer}>
                    <SearchInput
                        value={searchValue}
                        onChange={setSearchValue}
                        onSearch={handleSearch}
                        placeholder="Search people and cases"
                        flavor="trigger"
                        size="sm"
                    />
                </div>
            </div>

            {/* RIGHT GROUP: Settings & Session */}
            <div className={styles.rightSection}>
                {/* Language Dropdown Mock */}
                <button className={styles.actionLink} title="Select Region">
                    <span>En (AU)</span>
                    <span className={`material-symbols-rounded ${styles.iconSm}`}>expand_more</span>
                </button>

                {/* POS Action */}
                <button className={styles.actionLink} title="Open Till">
                    <span className="material-symbols-rounded">point_of_sale</span>
                    <span>Open Till</span>
                </button>

                <div className={styles.verticalDivider} />

                <button className={styles.iconButton} title="Help Center">
                    <span className="material-symbols-rounded">help_outline</span>
                </button>
                <button className={styles.iconButton} title="Log Out">
                    <span className="material-symbols-rounded">logout</span>
                </button>

                <TopNavAvatar />
            </div>
        </div>
    );
});
