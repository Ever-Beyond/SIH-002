import { Card, Badge } from '../../../components';
import type { RouteRisk } from '../types';
import styles from './DashboardComponents.module.css';

interface RouteRisksProps {
  risks: RouteRisk[];
}

export const RouteRisks: React.FC<RouteRisksProps> = ({ risks }) => {
  return (
    <Card className={styles.listWidget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>Route Risks</h3>
      </div>
      <div className={styles.listContainer}>
        {risks.length === 0 ? (
          <div className={styles.emptyText}>No identified route risks.</div>
        ) : (
          risks.map(risk => (
            <div key={risk.routeId} className={styles.listItem}>
              <div className={styles.itemMain}>
                <div className={styles.itemTitle}>{risk.origin} to {risk.destination} ({risk.routeId})</div>
                <div className={styles.itemSub}>Factor: {risk.primaryRiskFactor}</div>
              </div>
              <Badge variant={risk.riskLevel === 'HIGH' ? 'danger' : risk.riskLevel === 'MEDIUM' ? 'warning' : 'success'}>
                {risk.riskLevel}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
