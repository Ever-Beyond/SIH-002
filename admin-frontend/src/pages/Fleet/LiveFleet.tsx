import { useState, useEffect } from 'react';
import { ErrorState, ListSkeleton, EmptyState } from '../../components';
import { fleetService } from '../../features/fleet/services/fleetService';
import type { Vehicle, FleetFilters } from '../../features/fleet/types';
import {
  VehicleFilters,
  VehicleList,
  LiveMap,
  VehicleSummary
} from '../../features/fleet/components';

const LiveFleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FleetFilters>({
    status: 'ALL',
    riskLevel: 'ALL',
    searchQuery: ''
  });
  
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await fleetService.getVehicles(filters);
        setVehicles(data);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch live fleet data.');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the search slightly
    const timer = setTimeout(() => {
      fetchVehicles();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  const selectedVehicle = vehicles.find(v => v.id === selectedId) || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>Live Fleet Tracking</h1>
      </div>

      <VehicleFilters filters={filters} onChange={setFilters} />

      {error ? (
        <ErrorState title="Tracking Error" message={error} />
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
          {/* Left pane: List */}
          <div style={{ width: '350px', flexShrink: 0 }}>
            {isLoading ? (
              <div style={{ padding: '1rem' }}>
                <ListSkeleton items={6} />
              </div>
            ) : vehicles.length === 0 ? (
              <div style={{ padding: '2rem' }}>
                <EmptyState title="No Vehicles Found" description="Try adjusting your filters." />
              </div>
            ) : (
              <VehicleList 
                vehicles={vehicles} 
                selectedId={selectedId} 
                onSelect={setSelectedId} 
              />
            )}
          </div>

          {/* Right pane: Map */}
          <div style={{ flex: 1, position: 'relative' }}>
            <LiveMap 
              vehicles={vehicles} 
              selectedId={selectedId} 
              onSelect={setSelectedId} 
            />
            
            <VehicleSummary 
              vehicle={selectedVehicle} 
              onClose={() => setSelectedId(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveFleet;
