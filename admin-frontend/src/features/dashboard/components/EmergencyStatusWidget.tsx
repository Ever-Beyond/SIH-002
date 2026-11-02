import { Card, Badge } from '../../../components';
import type { EmergencyStatus } from '../types';
import styles from './DashboardComponents.module.css';

interface EmergencyStatusProps {
  emergencies: EmergencyStatus[];
}

export const EmergencyStatusWidget: React.FC<EmergencyStatusProps> = ({ emergencies }) => {
  return (
    <Card className={styles.listWidget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>Emergency Status</h3>
      </div>
      <div className={styles.listContainer}>
        {emergencies.length === 0 ? (
          <div className={styles.emptyText}>All clear. No active emergencies.</div>
        ) : (
          emergencies.map(emg => (
            <div key={emg.id} className={styles.listItem}>
              <div className={styles.itemMain}>
                <div className={styles.itemTitle}>{emg.type}</div>
                <div className={styles.itemSub}>Affected Vehicles: {emg.affectedVehicles}</div>
              </div>
              <Badge variant={emg.status === 'ACTIVE' ? 'danger' : 'primary'}>
                {emg.status}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
