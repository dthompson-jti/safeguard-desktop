import React from 'react';

// Common icon props
interface IconProps {
    className?: string;
}

export const DashboardIcon: React.FC<IconProps> = (props) => (
    <svg width= "20" height = "20" viewBox = "0 0 24 24" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" { ...props }>
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
);

export const LiveMonitorIcon: React.FC<IconProps> = (props) => (
    <svg width= "20" height = "20" viewBox = "0 0 24 24" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" { ...props }>
        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
            </svg>
);

export const HistoryIcon: React.FC<IconProps> = (props) => (
    <svg width= "20" height = "20" viewBox = "0 0 24 24" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" { ...props }>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
);

export const CalendarIcon: React.FC<IconProps> = (props) => (
    <svg width= "20" height = "20" viewBox = "0 0 24 24" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" { ...props }>
        <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
            </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
    <svg width= "20" height = "20" viewBox = "0 0 24 24" fill = "currentColor" xmlns = "http://www.w3.org/2000/svg" { ...props }>
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
);
