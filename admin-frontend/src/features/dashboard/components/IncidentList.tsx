import { Card, Badge } from '../../../components';
import type { CriticalIncident } from '../types';
import styles from './DashboardComponents.module.css';

interface IncidentListProps {
  incidents: CriticalIncident[];
}

export const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  return (
    <Card className={styles.listWidget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>Critical Incidents</h3>
      </div>
      <div className={styles.listContainer}>
        {incidents.length === 0 ? (
          <div className={styles.emptyText}>No active incidents.</div>
        ) : (
          incidents.map(inc => (
            <div key={inc.id} className={styles.listItem}>
              <div className={styles.itemMain}>
                <div className={styles.itemTitle}>{inc.type}</div>
                <div className={styles.itemSub}>{inc.location} • {inc.timeReported}</div>
              </div>
              <Badge variant={inc.severity === 'CRITICAL' ? 'danger' : inc.severity === 'HIGH' ? 'warning' : 'primary'}>
                {inc.severity}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
