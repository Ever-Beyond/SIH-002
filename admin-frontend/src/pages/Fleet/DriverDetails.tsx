import { Link } from 'react-router-dom';
import { ErrorState, Button, CardSkeleton } from '../../components';
import { useDriverDetails } from '../../features/fleet/hooks/useDriverDetails';
import { DriverInfoCard, DriverTripHistory } from '../../features/fleet/components';
import { ArrowLeft } from 'lucide-react';

const DriverDetails = () => {
  const { data: driver, isLoading, error } = useDriverDetails();

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
        </div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState title="Driver Not Found" message={error || 'The requested driver could not be loaded.'} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/fleet/drivers">
            <Button variant="outline">Back to Driver List</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/fleet/drivers">
          <Button variant="outline" size="sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Driver Profile: {driver.id}
        </h1>
      </div>

      <div className="grid-auto-fit">
        <DriverInfoCard driver={driver} />
        <DriverTripHistory history={driver.tripHistory} />
      </div>
    </div>
  );
};

export default DriverDetails;
