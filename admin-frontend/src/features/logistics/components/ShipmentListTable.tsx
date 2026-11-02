import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Button } from '../../../components';
import type { Shipment, ShipmentStatus, ShipmentPriority } from '../types';
import { Truck } from 'lucide-react';

interface ShipmentListTableProps {
  shipments: Shipment[];
}

export const ShipmentListTable = ({ shipments }: ShipmentListTableProps) => {
  const navigate = useNavigate();

  const getStatusVariant = (status: ShipmentStatus) => {
    switch (status) {
      case 'DELIVERED': return 'success';
      case 'IN_TRANSIT': return 'primary';
      case 'DELAYED': return 'warning';
      case 'CANCELLED': return 'danger';
      case 'PENDING': return 'secondary';
      default: return 'primary';
    }
  };

  const getPriorityVariant = (priority: ShipmentPriority) => {
    switch (priority) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'primary';
      case 'LOW': return 'secondary';
      default: return 'secondary';
    }
  };

  if (shipments.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No shipments found matching your filters.</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Shipment ID</TableHeader>
          <TableHeader>Route</TableHeader>
          <TableHeader>Commodity</TableHeader>
          <TableHeader>Priority</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Vehicle</TableHeader>
          <TableHeader>ETA</TableHeader>
          <TableHeader align="right">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {shipments.map(shipment => (
          <TableRow key={shipment.id}>
            <TableCell style={{ fontWeight: 500 }}>{shipment.id}</TableCell>
            <TableCell>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.875rem' }}>{shipment.origin}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>&darr;</span>
                <span style={{ fontSize: '0.875rem' }}>{shipment.destination}</span>
              </div>
            </TableCell>
            <TableCell>{shipment.commodityType}</TableCell>
            <TableCell>
              <Badge variant={getPriorityVariant(shipment.priority)}>
                {shipment.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(shipment.status)}>
                {shipment.status.replace('_', ' ')}
              </Badge>
            </TableCell>
            <TableCell>
              {shipment.assignedVehicleId ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} /> {shipment.assignedVehicleId}
                </span>
              ) : (
                <span style={{ color: 'var(--color-text-muted)' }}>Unassigned</span>
              )}
            </TableCell>
            <TableCell>{shipment.eta || '-'}</TableCell>
            <TableCell align="right">
              <Button size="sm" variant="outline" onClick={() => navigate(`/logistics/shipments/${shipment.id}`)}>
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
