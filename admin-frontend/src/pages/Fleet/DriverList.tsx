import { useState } from 'react';
import { ErrorState, Card, TableSkeleton, EmptyState } from '../../components';
import { useDrivers } from '../../features/fleet/hooks/useDrivers';
import type { DriverStatus } from '../../features/fleet/types';
import { DriverFilters, DriverListTable } from '../../features/fleet/components';

const DriverList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<DriverStatus | 'ALL'>('ALL');
  
  const { data: drivers, isLoading, error } = useDrivers(searchQuery, status);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Driver Management
        </h1>
      </div>

      <DriverFilters 
        searchQuery={searchQuery} 
        status={status} 
        onSearchChange={setSearchQuery} 
        onStatusChange={setStatus} 
      />

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {error ? (
          <div style={{ padding: '2rem' }}>
            <ErrorState title="Error Loading Drivers" message={error} />
          </div>
        ) : isLoading ? (
          <div style={{ padding: '2rem' }}>
            <TableSkeleton rows={8} columns={5} />
          </div>
        ) : drivers.length === 0 ? (
          <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
            <EmptyState title="No Drivers Found" description="Try adjusting your filters or search query." />
          </div>
        ) : (
          <DriverListTable drivers={drivers} />
        )}
      </Card>
    </div>
  );
};

export default DriverList;
