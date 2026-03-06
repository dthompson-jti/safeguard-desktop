import React from 'react';

interface PlaceholderSectionProps {
  title: string;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--surface-fg-secondary)' }}>
      <span className="material-symbols-rounded" style={{ fontSize: '48px', marginBottom: '1rem' }}>
        construction
      </span>
      <h2>{title}</h2>
      <p>This settings section is under development.</p>
    </div>
  );
};
