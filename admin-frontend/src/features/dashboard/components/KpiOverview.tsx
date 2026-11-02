import { Card } from '../../../components';
import type { KpiMetrics } from '../types';
import { Truck, Package, AlertTriangle, Map, Clock, AlertOctagon } from 'lucide-react';
import styles from './DashboardComponents.module.css';

interface KpiOverviewProps {
  metrics: KpiMetrics;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({ metrics }) => {
  return (
    <div className={styles.kpiGrid}>
      <Card className={styles.kpiCard}>
        <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary)' }}>
          <Truck size={24} />
        </div>
        <div className={styles.kpiContent}>
          <div className={styles.kpiLabel}>Active Vehicles</div>
          <div className={styles.kpiValue}>{metrics.activeVehicles}</div>
        </div>
      </Card>
      
      <Card className={styles.kpiCard}>
        <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)' }}>
          <Package size={24} />
        </div>
        <div className={styles.kpiContent}>
          <div className={styles.kpiLabel}>Active Shipments</div>
          <div className={styles.kpiValue}>{metrics.activeShipments}</div>
        </div>
      </Card>
      
      <Card className={styles.kpiCard}>
        <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>
          <AlertTriangle size={24} />
        </div>
        <div className={styles.kpiContent}>
          <div className={styles.kpiLabel}>Active Incidents</div>
          <div className={styles.kpiValue}>{metrics.activeIncidents}</div>
        </div>
      </Card>
      
      <Card className={styles.kpiCard}>
        <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' }}>
          <Map size={24} />
        </div>
        <div className={styles.kpiContent}>
          <div className={styles.kpiLabel}>Critical Corridors</div>
          <div className={styles.kpiValue}>{metrics.criticalCorridors}</div>
        </div>
      </Card>

      <Card className={styles.kpiCard}>
        <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
          <Clock size={24} />
        </div>
        <div className={styles.kpiContent}>
          <div className={styles.kpiLabel}>Delayed Shipments</div>
          <div className={styles.kpiValue}>{metrics.delayedShipments}</div>
        </div>
      </Card>

      <Card className={styles.kpiCard}>
        <div className={styles.kpiIconWrapper} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>
          <AlertOctagon size={24} />
        </div>
        <div className={styles.kpiContent}>
          <div className={styles.kpiLabel}>High Risk Routes</div>
          <div className={styles.kpiValue}>{metrics.highRiskRoutes}</div>
        </div>
      </Card>
    </div>
  );
};
