import { Card, Badge } from '../../../components';
import type { ShipmentDetails } from '../types';
import { Truck, User, MapPin, AlertTriangle } from 'lucide-react';

interface ShipmentInfoCardProps {
  shipment: ShipmentDetails;
}

export const ShipmentInfoCard = ({ shipment }: ShipmentInfoCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'var(--color-danger)';
      case 'MEDIUM': return 'var(--color-warning)';
      case 'LOW': return 'var(--color-success)';
      default: return 'var(--color-text-muted)';
    }
  };

  return (
    <Card style={{ marginBottom: '1.5rem', borderTop: `4px solid ${getRiskColor(shipment.riskLevel)}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{shipment.id}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Badge variant={shipment.priority === 'CRITICAL' ? 'danger' : shipment.priority === 'HIGH' ? 'warning' : 'primary'}>
              {shipment.priority} PRIORITY
            </Badge>
            <Badge variant={shipment.status === 'DELIVERED' ? 'success' : shipment.status === 'DELAYED' ? 'warning' : 'secondary'}>
              {shipment.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 0.25rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>ETA</p>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '1.125rem' }}>{shipment.eta || 'Unknown'}</p>
        </div>
      </div>

      <div className="grid-auto-fit" style={{ marginBottom: '1.5rem', gap: '1.5rem' }}>
        <div>
          <p style={{ margin: '0 0 0.25rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Origin</p>
          <p style={{ margin: 0, fontWeight: 500 }}>{shipment.origin}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 0.25rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Destination</p>
          <p style={{ margin: 0, fontWeight: 500 }}>{shipment.destination}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 0.25rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Commodity</p>
          <p style={{ margin: 0, fontWeight: 500 }}>{shipment.commodityType} ({shipment.weightKg} kg)</p>
        </div>
        <div>
          <p style={{ margin: '0 0 0.25rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Current Location</p>
          <p style={{ margin: 0, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={16} color="var(--color-primary)" /> {shipment.currentLocation}
          </p>
        </div>
      </div>

      <div className="grid-layout-1-1" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-surface-hover)', borderRadius: 'var(--radius-md)' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={16} /> Assigned Vehicle
          </p>
          <p style={{ margin: 0, fontWeight: 500 }}>{shipment.assignedVehicleId || 'Unassigned'}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <User size={16} /> Driver
          </p>
          <p style={{ margin: 0, fontWeight: 500 }}>{shipment.driverName} <br/><span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{shipment.driverPhone}</span></p>
        </div>
      </div>

      {shipment.incidentImpact && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <AlertTriangle color="var(--color-danger)" size={20} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-danger)', fontSize: '0.875rem', fontWeight: 600 }}>Active Incident Impact</h4>
            <p style={{ margin: 0, color: 'var(--color-danger)', fontSize: '0.875rem' }}>{shipment.incidentImpact}</p>
          </div>
        </div>
      )}
    </Card>
  );
};
