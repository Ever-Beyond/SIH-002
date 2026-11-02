import { Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge } from '../../../components';
import type { TripRecord } from '../types';
import { Route } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface DriverTripHistoryProps {
  history: TripRecord[];
}

export const DriverTripHistory = ({ history }: DriverTripHistoryProps) => {
  return (
    <Card className={styles.detailCard} style={{ gridColumn: '1 / -1' }}>
      <div className={styles.detailCardHeader}>
        <h3 className={styles.detailCardTitle}>
          <Route size={20} /> Trip History
        </h3>
      </div>
      
      {history.length === 0 ? (
        <div className={styles.emptyCardState}>No trips recorded for this driver.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Trip ID</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Vehicle</TableHeader>
                <TableHeader>Distance</TableHeader>
                <TableHeader>Route</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map(trip => (
                <TableRow key={trip.id}>
                  <TableCell style={{ fontWeight: 500 }}>{trip.id}</TableCell>
                  <TableCell>{trip.date}</TableCell>
                  <TableCell>{trip.vehicleId}</TableCell>
                  <TableCell>{trip.distanceKm} km</TableCell>
                  <TableCell>
                    {trip.startLocation} &rarr; {trip.endLocation}
                  </TableCell>
                  <TableCell>
                    <Badge variant={trip.status === 'COMPLETED' ? 'success' : trip.status === 'CANCELLED' ? 'danger' : 'primary'}>
                      {trip.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
};
