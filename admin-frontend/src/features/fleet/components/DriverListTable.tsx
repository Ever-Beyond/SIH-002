import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Button } from '../../../components';
import type { Driver } from '../types';

interface DriverListTableProps {
  drivers: Driver[];
}

export const DriverListTable = ({ drivers }: DriverListTableProps) => {
  const navigate = useNavigate();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'ON_DUTY': return 'primary';
      case 'OFF_DUTY': return 'warning';
      case 'SUSPENDED': return 'danger';
      default: return 'primary';
    }
  };

  if (drivers.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No drivers found.</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Driver ID</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>License No.</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Vehicle</TableHeader>
          <TableHeader align="right">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {drivers.map(driver => (
          <TableRow key={driver.id}>
            <TableCell style={{ fontWeight: 500 }}>{driver.id}</TableCell>
            <TableCell>{driver.name}</TableCell>
            <TableCell>{driver.licenseNumber}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(driver.status)}>
                {driver.status.replace('_', ' ')}
              </Badge>
            </TableCell>
            <TableCell>{driver.assignedVehicleId || <span style={{ color: 'var(--color-text-muted)' }}>None</span>}</TableCell>
            <TableCell align="right">
              <Button size="sm" variant="outline" onClick={() => navigate(`/fleet/drivers/${driver.id}`)}>
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
