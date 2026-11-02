import { useNavigate } from 'react-router-dom';
import { Map, MapControls, RoadLayer, IncidentMarker, VehicleMarker } from '../../components/Map';
import { AccessibilityFilters, MapLegend } from '../../features/accessibility/components';
import { useAccessibilityMap } from '../../features/accessibility/hooks/useAccessibilityMap';
import { Spinner } from '../../components';
import { mockDrivers } from '../../features/fleet/mockData';

const GlobalMap = () => {
  const navigate = useNavigate();
  const { filters, updateFilter, roads, corridors, incidents, isLoading } = useAccessibilityMap();

  // For demonstration, map some mock drivers to vehicle markers on the map
  const vehiclePositions: [number, number][] = [
    [26.1400, 91.7300], // V-101
    [26.1500, 91.7500], // V-102
    [27.0500, 88.2600]  // V-104 (stuck near incident)
  ];

  const activeVehicles = mockDrivers
    .filter(d => d.assignedVehicleId)
    .map((d, index) => ({
      id: d.assignedVehicleId!,
      status: d.status === 'ON_DUTY' ? 'ACTIVE' as const : 'IDLE' as const,
      position: vehiclePositions[index] || [26.0, 91.0]
    }));

  const getRoadColor = (status: string) => {
    switch (status) {
      case 'BLOCKED': return 'var(--color-danger)';
      case 'PARTIAL': return 'var(--color-warning)';
      case 'OPEN': return 'var(--color-success)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)' }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2000 }}>
          <Spinner size="lg" />
        </div>
      )}

      <Map center={[26.4, 90.5]} zoom={7}>
        <MapControls />
        
        <AccessibilityFilters filters={filters} onFilterChange={updateFilter} />
        <MapLegend />

        {/* Critical Corridors Layer */}
        {corridors.map(corridor => (
          <RoadLayer 
            key={corridor.id} 
            positions={corridor.coordinates} 
            type="HIGHWAY"
            // Override style to highlight corridor
          />
        ))}

        {/* Road Network Layer */}
        {roads.map(road => (
          <RoadLayer 
            key={road.id}
            positions={road.coordinates}
            color={getRoadColor(road.status)}
            onClick={() => navigate(`/accessibility/roads/${road.id}`)}
          />
        ))}

        {/* Incident Layer */}
        {incidents.map(incident => (
          <IncidentMarker 
            key={incident.id} 
            position={incident.coordinates} 
            severity={incident.severity}
            popupContent={<div><strong>{incident.type}</strong><br/>Severity: {incident.severity}</div>}
          />
        ))}

        {/* Vehicle Layer */}
        {activeVehicles.map(vehicle => (
          <VehicleMarker 
            key={vehicle.id} 
            position={vehicle.position} 
            status={vehicle.status}
            popupContent={<div><strong>Vehicle: {vehicle.id}</strong><br/>Status: {vehicle.status}</div>}
          />
        ))}
      </Map>
    </div>
  );
};

export default GlobalMap;
