import React from 'react';
import { Skeleton } from './Skeleton';
import { Card } from '../Card';

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ rows = 5, columns = 4 }) => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`th-${i}`} shape="text" style={{ flex: 1, height: '24px' }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={`tr-${r}`} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={`td-${r}-${c}`} shape="text" style={{ flex: 1, height: '20px' }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Skeleton shape="circle" style={{ width: '40px', height: '40px' }} />
        <Skeleton shape="text" style={{ width: '120px', height: '24px' }} />
      </div>
      <Skeleton shape="text" style={{ width: '100%', height: '32px', marginBottom: '0.5rem' }} />
      <Skeleton shape="text" style={{ width: '60%', height: '16px' }} />
    </Card>
  );
};

export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 3 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={`list-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Skeleton shape="rect" style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
          <div style={{ flex: 1 }}>
            <Skeleton shape="text" style={{ width: '60%', height: '20px', marginBottom: '0.5rem' }} />
            <Skeleton shape="text" style={{ width: '40%', height: '14px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};
