import { Card, Badge, Button } from '../../../components';
import type { VehicleDetails } from '../types';
import { Truck, MapPin, Zap, User, AlertOctagon, Phone } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface VehicleInfoCardProps {
  vehicle: VehicleDetails;
}

export const VehicleInfoCard = ({ vehicle }: VehicleInfoCardProps) => {
  return (
    <Card className={styles.detailCard}>
      <div className={styles.detailCardHeader}>
        <h2 className={styles.detailCardTitle}>
          <Truck size={24} /> {vehicle.plateNumber}
        </h2>
        <Badge variant={vehicle.status === 'ACTIVE' ? 'success' : vehicle.status === 'OFFLINE' ? 'danger' : 'warning'}>
          {vehicle.status}
        </Badge>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Vehicle ID</div>
          <div className={styles.detailValue}>{vehicle.id}</div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Type</div>
          <div className={styles.detailValue}>{vehicle.type}</div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Driver</div>
          <div className={styles.detailValue}>
            <User size={16} /> {vehicle.driverName}
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Risk Level</div>
          <div className={styles.detailValue}>
            <Badge variant={vehicle.currentRiskLevel === 'HIGH' ? 'danger' : vehicle.currentRiskLevel === 'MEDIUM' ? 'warning' : 'success'}>
              {vehicle.currentRiskLevel} RISK
            </Badge>
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Current Speed</div>
          <div className={styles.detailValue}>
            <Zap size={16} /> {vehicle.speedKmH} km/h
          </div>
        </div>
        <div className={styles.detailItemFull}>
          <div className={styles.detailLabel}>Current Location</div>
          <div className={styles.detailValue}>
            <MapPin size={16} /> {vehicle.location.address}
            <span className={styles.timestamp}>(Ping: {vehicle.lastPing})</span>
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Button variant="outline"><MapPin size={16} style={{ marginRight: '6px' }}/> View Route</Button>
        <Button variant="outline"><AlertOctagon size={16} style={{ marginRight: '6px' }}/> Reroute</Button>
        <Button variant="primary"><Phone size={16} style={{ marginRight: '6px' }}/> Contact Driver</Button>
      </div>
    </Card>
  );
};
