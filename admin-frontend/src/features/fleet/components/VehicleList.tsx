import { Badge } from '../../../components';
import type { Vehicle } from '../types';
import styles from './FleetComponents.module.css';

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const VehicleList = ({ vehicles, selectedId, onSelect }: VehicleListProps) => {
  if (vehicles.length === 0) {
    return <div className={styles.emptyList}>No vehicles match the selected filters.</div>;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'IDLE': return 'warning';
      case 'OFFLINE': return 'danger';
      case 'MAINTENANCE': return 'primary';
      default: return 'primary';
    }
  };

  const getRiskVariant = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className={styles.vehicleList}>
      {vehicles.map(v => (
        <div 
          key={v.id} 
          className={`${styles.vehicleListItem} ${selectedId === v.id ? styles.selected : ''}`}
          onClick={() => onSelect(v.id)}
        >
          <div className={styles.listItemHeader}>
            <span className={styles.plate}>{v.plateNumber}</span>
            <span className={styles.id}>{v.id}</span>
          </div>
          <div className={styles.listItemSub}>
            Driver: {v.driverName}
          </div>
          <div className={styles.badges}>
            <Badge variant={getStatusVariant(v.status)}>{v.status}</Badge>
            <Badge variant={getRiskVariant(v.currentRiskLevel)}>{v.currentRiskLevel} RISK</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
