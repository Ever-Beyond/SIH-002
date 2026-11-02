import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../../../components';
import type { Vehicle } from '../types';
import { X, Navigation, Zap, User } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface VehicleSummaryProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export const VehicleSummary = ({ vehicle, onClose }: VehicleSummaryProps) => {
  const navigate = useNavigate();

  if (!vehicle) return null;

  return (
    <Card className={styles.summaryPanel}>
      <div className={styles.summaryHeader}>
        <div>
          <h3 className={styles.summaryTitle}>{vehicle.plateNumber}</h3>
          <span className={styles.summarySubtitle}>{vehicle.type} • {vehicle.id}</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close summary">
          <X size={20} />
        </button>
      </div>

      <div className={styles.summaryBody}>
        <div className={styles.statusRow}>
          <Badge variant={vehicle.status === 'ACTIVE' ? 'success' : vehicle.status === 'OFFLINE' ? 'danger' : 'warning'}>
            {vehicle.status}
          </Badge>
          <Badge variant={vehicle.currentRiskLevel === 'HIGH' ? 'danger' : vehicle.currentRiskLevel === 'MEDIUM' ? 'warning' : 'success'}>
            {vehicle.currentRiskLevel} RISK
          </Badge>
        </div>

        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <Zap size={16} />
            <span>{vehicle.speedKmH} km/h</span>
          </div>
          <div className={styles.statItem}>
            <User size={16} />
            <span>{vehicle.driverName}</span>
          </div>
        </div>

        <div className={styles.locationInfo}>
          <Navigation size={16} className={styles.locIcon} />
          <div>
            <div className={styles.locAddress}>{vehicle.location.address}</div>
            <div className={styles.locTimestamp}>Last ping: {vehicle.lastPing}</div>
          </div>
        </div>
      </div>

      <div className={styles.summaryFooter}>
        <Button 
          variant="primary" 
          onClick={() => navigate(`/fleet/vehicles/${vehicle.id}`)}
          style={{ width: '100%' }}
        >
          View Full Details
        </Button>
      </div>
    </Card>
  );
};
