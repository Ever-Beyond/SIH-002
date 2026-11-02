import { useParams, useNavigate } from 'react-router-dom';
import { ErrorState, Button, Card, Timeline, TimelineItem, CardSkeleton } from '../../components';
import { useShipmentDetails } from '../../features/logistics/hooks/useShipmentDetails';
import { ShipmentInfoCard } from '../../features/logistics/components';
import { ArrowLeft } from 'lucide-react';

const ShipmentDetails = () => {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const navigate = useNavigate();
  const { data: shipment, isLoading, error } = useShipmentDetails(shipmentId);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft size={16} /> Back
          </Button>
          <div style={{ width: '200px', height: '32px', backgroundColor: 'var(--color-bg-hover)', borderRadius: '4px' }} />
        </div>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState title="Shipment Not Found" message={error || 'Could not load shipment data.'} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button variant="outline" onClick={() => navigate('/logistics/shipments')}>Back to Shipments</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="outline" size="sm" onClick={() => navigate('/logistics/shipments')}>
          <ArrowLeft size={16} /> Back
        </Button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Shipment Details
        </h1>
      </div>

      <ShipmentInfoCard shipment={shipment} />

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '1rem 0 0 0' }}>Transit History</h3>
      <Card>
        <Timeline>
          {shipment.timeline.map((event) => (
            <TimelineItem
              key={event.id}
              title={event.title}
              description={event.description}
              timestamp={event.timestamp}
              status={event.status}
            />
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

export default ShipmentDetails;
