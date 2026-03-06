import React from 'react';
import { useAtom } from 'jotai';
import { AnimatedTabs } from '../../../components/AnimatedTabs';
import * as Tabs from '@radix-ui/react-tabs';
import { settingsSelectedNodeAtom } from '../settingsAtoms';
import { SETTINGS_TREE } from '../settingsData';
import { SafetyChecksForm } from './SafetyChecksForm';
import { PlaceholderSection } from './PlaceholderSection';
import styles from './SettingsTabbedPage.module.css';

export const SettingsTabbedPage: React.FC = () => {
    const [activeTab, setActiveTab] = useAtom(settingsSelectedNodeAtom);

    // Flatten logic: if a node has children, use children. Otherwise use node.
    const flattenedTabs = SETTINGS_TREE.flatMap(node =>
        node.children && node.children.length > 0 ? node.children : [node]
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>System Properties</h1>
            </header>

            <div className={styles.tabHeader}>
                <AnimatedTabs value={activeTab} onValueChange={setActiveTab}>
                    {flattenedTabs.map((tab) => (
                        <Tabs.Trigger key={tab.id} value={tab.id} className={styles.tabTrigger}>
                            {tab.label}
                        </Tabs.Trigger>
                    ))}
                </AnimatedTabs>
            </div>

            <div className={styles.contentScrollArea}>
                <Tabs.Root value={activeTab} onValueChange={setActiveTab} className={styles.tabsRoot}>
                    {flattenedTabs.map((tab) => (
                        <Tabs.Content key={tab.id} value={tab.id} className={styles.tabContent}>
                            {tab.id === 'safety-check' ? (
                                <SafetyChecksForm />
                            ) : (
                                <PlaceholderSection title={tab.label} />
                            )}
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerActions}>
                    <button className="btn" data-variant="primary" data-size="m">
                        Save
                    </button>
                    <button className="btn" data-variant="tertiary" data-size="m">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
