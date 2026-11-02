import { Link } from 'react-router-dom';
import { ErrorState, Button, CardSkeleton } from '../../components';
import { useVehicleDetails } from '../../features/fleet/hooks/useVehicleDetails';
import {
  VehicleInfoCard,
  ShipmentCard,
  RouteHistoryTimeline,
  IncidentHistoryCard
} from '../../features/fleet/components';
import { ArrowLeft } from 'lucide-react';

const VehicleDetails = () => {
  const { data: vehicle, isLoading, error } = useVehicleDetails();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft size={16} />
          </Button>
          <div style={{ width: '250px', height: '32px', backgroundColor: 'var(--color-bg-hover)', borderRadius: '4px' }} />
        </div>
        <div className="grid-auto-fit">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState title="Vehicle Not Found" message={error || 'The requested vehicle could not be loaded.'} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/fleet/live">
            <Button variant="outline">Back to Live Fleet</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/fleet/live">
          <Button variant="outline" size="sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Vehicle Profile: {vehicle.id}
        </h1>
      </div>

      <div className="grid-auto-fit">
        <VehicleInfoCard vehicle={vehicle} />
        <ShipmentCard shipment={vehicle.currentShipment} />
        <RouteHistoryTimeline history={vehicle.routeHistory} />
        <IncidentHistoryCard incidents={vehicle.incidentHistory} />
      </div>
    </div>
  );
};

export default VehicleDetails;
