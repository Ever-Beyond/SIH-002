import React from 'react';
import { Spinner, ErrorState } from '../index';

interface ChartContainerProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  height?: number | string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyMessage = 'No data available',
  height = 300,
  children
}) => {
  if (isLoading) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem' }}>
        <ErrorState title="Error Loading Chart" message={error} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: 'var(--color-text-muted)' }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }}>
      {children}
    </div>
  );
};
