import { Card, Badge } from '../../../components';
import type { VehicleIncident } from '../types';
import { AlertTriangle } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface IncidentHistoryCardProps {
  incidents: VehicleIncident[];
}

export const IncidentHistoryCard = ({ incidents }: IncidentHistoryCardProps) => {
  return (
    <Card className={styles.detailCard}>
      <div className={styles.detailCardHeader}>
        <h3 className={styles.detailCardTitle}>
          <AlertTriangle size={20} /> Incident History
        </h3>
      </div>
      
      {incidents.length === 0 ? (
        <div className={styles.emptyCardState}>No recorded incidents.</div>
      ) : (
        <div className={styles.incidentList}>
          {incidents.map((incident) => (
            <div key={incident.id} className={styles.incidentItem}>
              <div className={styles.incidentHeader}>
                <div className={styles.incidentTitle}>{incident.type} ({incident.id})</div>
                <Badge variant={incident.severity === 'HIGH' ? 'danger' : incident.severity === 'MEDIUM' ? 'warning' : 'primary'}>
                  {incident.severity}
                </Badge>
              </div>
              <div className={styles.incidentDesc}>{incident.description}</div>
              <div className={styles.incidentTime}>{incident.timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
