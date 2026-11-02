import { useState } from 'react';
import { Card, Input, Select, Button, Spinner, ErrorState, Badge } from '../../components';
import { Map, MapControls, RouteLayer } from '../../components/Map';
import { useRouteSimulation } from '../../features/ai/hooks/useRouteSimulation';
import { Play, GitMerge } from 'lucide-react';
import type { SimulationParams } from '../../features/ai/types';

const RouteSimulation = () => {
  const { simulate, reset, result, isLoading, error } = useRouteSimulation();
  const [params, setParams] = useState<SimulationParams>({
    vehicle: '',
    origin: '',
    destination: '',
    priority: 'MEDIUM'
  });

  const handleSimulate = () => {
    if (!params.vehicle || !params.origin || !params.destination) return;
    simulate(params);
  };

  return (
    <div className="page-container" style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 64px)' }}>
      
      {/* Configuration Sidebar */}
      <Card style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1.5rem', flexShrink: 0, overflowY: 'auto' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitMerge size={24} color="var(--color-primary)" />
          Simulation Engine
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            label="Vehicle ID" 
            placeholder="e.g. V-204" 
            value={params.vehicle}
            onChange={(e) => { reset(); setParams({ ...params, vehicle: e.target.value }) }}
          />
          <Input 
            label="Origin Location" 
            placeholder="e.g. Guwahati Distribution Hub" 
            value={params.origin}
            onChange={(e) => { reset(); setParams({ ...params, origin: e.target.value }) }}
          />
          <Input 
            label="Destination" 
            placeholder="e.g. Siliguri Base" 
            value={params.destination}
            onChange={(e) => { reset(); setParams({ ...params, destination: e.target.value }) }}
          />
          <Select 
            label="Shipment Priority" 
            value={params.priority}
            onChange={(e) => { reset(); setParams({ ...params, priority: e.target.value }) }}
            options={[
              { value: 'LOW', label: 'Low Priority' },
              { value: 'MEDIUM', label: 'Medium Priority' },
              { value: 'HIGH', label: 'High Priority' },
              { value: 'CRITICAL', label: 'Critical / Emergency' }
            ]}
          />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Button 
            style={{ width: '100%' }} 
            onClick={handleSimulate} 
            disabled={isLoading || !params.vehicle || !params.origin || !params.destination}
          >
            {isLoading ? <Spinner size="sm" color="white" /> : <><Play size={16} style={{ marginRight: '0.5rem' }} /> Run AI Simulation</>}
          </Button>
        </div>
      </Card>

      {/* Main Results View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '1rem' }}>
            <Spinner size="lg" />
            <p style={{ color: 'var(--color-text-muted)' }}>AI Models analyzing topological and weather data...</p>
          </div>
        ) : error ? (
          <ErrorState title="Simulation Failed" message={error} />
        ) : !result ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <EmptyStateView />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            
            {/* Map Area */}
            <Card style={{ padding: 0, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Simulated Routing Topology</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <div style={{ width: '12px', height: '4px', backgroundColor: 'var(--color-text-muted)' }} /> Current
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <div style={{ width: '12px', height: '4px', backgroundColor: 'var(--color-primary)' }} /> Alternative
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <Map center={result.currentRoute.coordinates[0] || [26.1158, 91.7086]} zoom={7}>
                  <MapControls />
                  <RouteLayer positions={result.currentRoute.coordinates} color="var(--color-text-muted)" weight={4} dashArray="5, 10" />
                  {result.alternativeRoutes.map(alt => (
                    <RouteLayer key={alt.id} positions={alt.coordinates} color="var(--color-primary)" weight={6} />
                  ))}
                </Map>
              </div>
            </Card>

            {/* Results Grid */}
            <div className="grid-auto-fit" style={{ flexShrink: 0 }}>
              
              {/* Current Route Stats */}
              <Card style={{ borderTop: '4px solid var(--color-text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Current Plan</h3>
                  <Badge variant="secondary">Original</Badge>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Distance</span>
                    <span style={{ fontWeight: 600 }}>{result.currentRoute.distanceKm} km</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>ETA</span>
                    <span style={{ fontWeight: 600 }}>{result.currentRoute.etaHours} hrs</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Risk Score</span>
                    <span style={{ fontWeight: 600, color: result.currentRoute.riskScore > 70 ? 'var(--color-danger)' : 'inherit' }}>
                      {result.currentRoute.riskScore}/100
                    </span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{result.currentRoute.reason}</p>
              </Card>

              {/* Best Alternative Stats */}
              <Card style={{ borderTop: '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Optimal AI Route</h3>
                  <Badge variant="primary">Recommended</Badge>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Distance</span>
                    <span style={{ fontWeight: 600 }}>{result.alternativeRoutes[0].distanceKm} km</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>ETA</span>
                    <span style={{ fontWeight: 600 }}>{result.alternativeRoutes[0].etaHours} hrs</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Risk Score</span>
                    <span style={{ fontWeight: 600, color: result.alternativeRoutes[0].riskScore < 50 ? 'var(--color-success)' : 'inherit' }}>
                      {result.alternativeRoutes[0].riskScore}/100
                    </span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{result.alternativeRoutes[0].reason}</p>
              </Card>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};

const EmptyStateView = () => (
  <div style={{ textAlign: 'center', maxWidth: '400px' }}>
    <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '50%', marginBottom: '1.5rem' }}>
      <GitMerge size={48} color="var(--color-primary)" />
    </div>
    <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>AI Route Simulation</h2>
    <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
      Enter vehicle and location parameters in the sidebar to generate AI-optimized alternative routing paths considering active weather, traffic, and infrastructure incidents.
    </p>
  </div>
);

export default RouteSimulation;
