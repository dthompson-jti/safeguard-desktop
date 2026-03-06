import React from 'react';
import { SettingsBreadcrumbs } from './SettingsBreadcrumbs';
import { SettingsContent } from './SettingsContent';
import styles from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <SettingsBreadcrumbs />
      <div className={styles.contentScrollArea}>
        <SettingsContent />
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
