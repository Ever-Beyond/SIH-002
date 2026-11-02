import { useState } from 'react';
import { EmptyState, TableSkeleton, ErrorState, Card } from '../../components';
import { Pagination } from '../../components/Pagination/Pagination';
import { useIncidents } from '../../features/incidents/hooks/useIncidents';
import { IncidentFilters, IncidentListTable } from '../../features/incidents/components';
import type { IncidentFiltersState } from '../../features/incidents/types';

const IncidentList = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IncidentFiltersState>({
    searchQuery: '',
    status: 'ALL',
    severity: 'ALL',
    type: 'ALL',
    district: 'ALL',
    date: 'ALL'
  });

  const { data, totalPages, isLoading, error } = useIncidents(filters, page, 10);

  const handleFilterChange = (key: keyof IncidentFiltersState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Incident Management
        </h1>
      </div>

      <IncidentFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />

      <Card style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
        {error ? (
          <div style={{ padding: '2rem' }}>
            <ErrorState title="Error Loading Incidents" message={error} />
          </div>
        ) : isLoading ? (
          <div style={{ padding: '2rem' }}>
            <TableSkeleton rows={10} columns={6} />
          </div>
        ) : data.length === 0 ? (
          <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <EmptyState title="No Incidents Found" description="Try adjusting your filters or search query." />
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowX: 'auto' }}>
              <IncidentListTable incidents={data} />
            </div>
            {totalPages > 1 && (
              <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'center' }}>
                <Pagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  onPageChange={setPage} 
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default IncidentList;
