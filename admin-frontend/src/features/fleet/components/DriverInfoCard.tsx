import { Link } from 'react-router-dom';
import { Card, Badge, Button } from '../../../components';
import type { DriverDetails } from '../types';
import { User, Phone, Truck } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface DriverInfoCardProps {
  driver: DriverDetails;
}

export const DriverInfoCard = ({ driver }: DriverInfoCardProps) => {
  return (
    <Card className={styles.detailCard}>
      <div className={styles.detailCardHeader}>
        <h2 className={styles.detailCardTitle}>
          <User size={24} /> {driver.name}
        </h2>
        <Badge variant={driver.status === 'AVAILABLE' ? 'success' : driver.status === 'SUSPENDED' ? 'danger' : driver.status === 'ON_DUTY' ? 'primary' : 'warning'}>
          {driver.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Driver ID</div>
          <div className={styles.detailValue}>{driver.id}</div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>License Number</div>
          <div className={styles.detailValue}>{driver.licenseNumber}</div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.detailLabel}>Contact Number</div>
          <div className={styles.detailValue}>
            <Phone size={16} /> {driver.contactNumber}
          </div>
        </div>
        
        <div className={styles.detailItemFull}>
          <div className={styles.detailLabel}>Currently Assigned Vehicle</div>
          <div className={styles.detailValue}>
            {driver.assignedVehicleId ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span><Truck size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> {driver.assignedVehicleId}</span>
                <Link to={`/fleet/vehicles/${driver.assignedVehicleId}`}>
                  <Button size="sm" variant="outline">View Vehicle</Button>
                </Link>
              </div>
            ) : (
              <span style={{ color: 'var(--color-text-muted)' }}>No vehicle assigned</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
