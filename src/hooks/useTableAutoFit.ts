import { Table, ColumnSizingState } from '@tanstack/react-table';
import { useCallback } from 'react';

// Buffer calculation:
// 16px (left padding) + 16px (right padding) + 24px (sort icon + buffer) + 4px (border/gap)
// This replaces the magic number '60' in the previous implementation.
const PADDING_BUFFER = 60;

export function useTableAutoFit<T>(
    table: Table<T>,
    setColumnSizing: React.Dispatch<React.SetStateAction<ColumnSizingState>>
) {
    const handleAutoFit = useCallback((columnId: string) => {
        const column = table.getColumn(columnId);
        if (!column) return;

        // Create temporary canvas for measurement
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;

        // Uses standard font stack - check --font-size-sm
        context.font = '500 0.875rem Inter, sans-serif';

        let maxWidth = 0;

        // Measure Header
        const headerText = typeof column.columnDef.header === 'string'
            ? column.columnDef.header
            : '';

        if (headerText) {
            maxWidth = Math.max(maxWidth, context.measureText(headerText).width);
        }

        // Measure Visible Rows
        const rows = table.getRowModel().rows;
        rows.forEach(row => {
            const cellValue = row.getValue(columnId);
            const text = String((cellValue as string | number | null | undefined) ?? '');
            const width = context.measureText(text).width;
            maxWidth = Math.max(maxWidth, width);
        });

        const targetWidth = maxWidth + PADDING_BUFFER;

        // Clamp to min/max
        const minSize = column.columnDef.minSize || 0;
        const maxSize = column.columnDef.maxSize || 1000;
        const finalWidth = Math.max(minSize, Math.min(targetWidth, maxSize));

        setColumnSizing(old => ({
            ...old,
            [columnId]: finalWidth
        }));
    }, [table, setColumnSizing]);

    return { handleAutoFit };
}
