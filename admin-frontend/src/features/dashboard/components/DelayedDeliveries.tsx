import { Card, Badge } from '../../../components';
import type { DelayedDelivery } from '../types';
import styles from './DashboardComponents.module.css';

interface DelayedDeliveriesProps {
  delays: DelayedDelivery[];
}

export const DelayedDeliveries: React.FC<DelayedDeliveriesProps> = ({ delays }) => {
  return (
    <Card className={styles.listWidget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle}>Delayed Deliveries</h3>
      </div>
      <div className={styles.listContainer}>
        {delays.length === 0 ? (
          <div className={styles.emptyText}>No delayed deliveries.</div>
        ) : (
          delays.map(delay => (
            <div key={delay.shipmentId} className={styles.listItem}>
              <div className={styles.itemMain}>
                <div className={styles.itemTitle}>Shipment {delay.shipmentId} (Veh: {delay.vehicleId})</div>
                <div className={styles.itemSub}>To: {delay.destination} • Reason: {delay.delayReason}</div>
              </div>
              <Badge variant="warning">+{delay.estimatedDelayMins} mins</Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
