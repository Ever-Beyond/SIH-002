import { useState } from 'react';
import { EmptyState, TableSkeleton, ErrorState, Card, Button } from '../../components';
import { useShipments } from '../../features/logistics/hooks/useShipments';
import { ShipmentFilters, ShipmentListTable } from '../../features/logistics/components';
import type { ShipmentFiltersState } from '../../features/logistics/types';

const ShipmentList = () => {
  const [filters, setFilters] = useState<ShipmentFiltersState>({
    searchQuery: '',
    status: 'ALL',
    priority: 'ALL',
    commodityType: 'ALL',
  });

  const { data: shipments, isLoading, error } = useShipments(filters);

  const handleFilterChange = (key: keyof ShipmentFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Shipment Management
        </h1>
        <Button variant="primary" onClick={() => window.location.href = '/logistics/shipments/create'}>
          + Create Shipment
        </Button>
      </div>

      <ShipmentFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />

      <Card style={{ padding: 0, overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        {error ? (
          <div style={{ padding: '2rem' }}>
            <ErrorState title="Error Loading Shipments" message={error} />
          </div>
        ) : isLoading ? (
          <div style={{ padding: '2rem' }}>
            <TableSkeleton rows={8} columns={5} />
          </div>
        ) : shipments.length === 0 ? (
          <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <EmptyState title="No Shipments Found" description="Try adjusting your filters to find what you are looking for." />
          </div>
        ) : (
          <div style={{ flex: 1, overflowX: 'auto' }}>
            <ShipmentListTable shipments={shipments} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShipmentList;
