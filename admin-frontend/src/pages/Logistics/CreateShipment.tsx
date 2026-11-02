import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components';
import { CreateShipmentForm } from '../../features/logistics/components';
import { ArrowLeft } from 'lucide-react';

const CreateShipment = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="outline" size="sm" onClick={() => navigate('/logistics/shipments')}>
          <ArrowLeft size={16} /> Back
        </Button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Create New Shipment
        </h1>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <CreateShipmentForm />
      </Card>
    </div>
  );
};

export default CreateShipment;
