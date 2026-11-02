import { Card } from '../../../components';
import { Map as MapIcon } from 'lucide-react';
import styles from './DashboardComponents.module.css';

export const MapWidget: React.FC = () => {
  return (
    <Card className={styles.mapWidget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>Live Operations Map</h3>
      </div>
      <div className={styles.mapPlaceholder}>
        <MapIcon size={48} color="var(--color-text-muted)" />
        <p>GIS Map Integration Pending (PostGIS/Leaflet)</p>
      </div>
    </Card>
  );
};
