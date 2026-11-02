import { Card, Badge } from '../../../components';
import type { ShipmentDetail } from '../types';
import { Package, Clock, Map } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface ShipmentCardProps {
  shipment: ShipmentDetail | null;
}

export const ShipmentCard = ({ shipment }: ShipmentCardProps) => {
  return (
    <Card className={styles.detailCard}>
      <div className={styles.detailCardHeader}>
        <h3 className={styles.detailCardTitle}>
          <Package size={20} /> Current Shipment
        </h3>
      </div>
      
      {!shipment ? (
        <div className={styles.emptyCardState}>No active shipment attached to this vehicle.</div>
      ) : (
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Shipment ID</div>
            <div className={styles.detailValue}>{shipment.id}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Status</div>
            <div className={styles.detailValue}>
              <Badge variant={shipment.status === 'IN_TRANSIT' ? 'success' : shipment.status === 'DELAYED' ? 'danger' : 'warning'}>
                {shipment.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <div className={styles.detailItemFull}>
            <div className={styles.detailLabel}>Destination</div>
            <div className={styles.detailValue}>
              <Map size={16} /> {shipment.destination}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Goods Type</div>
            <div className={styles.detailValue}>{shipment.goodsType}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Weight</div>
            <div className={styles.detailValue}>{shipment.weight}</div>
          </div>
          <div className={styles.detailItemFull}>
            <div className={styles.detailLabel}>Estimated Time of Arrival (ETA)</div>
            <div className={styles.detailValue}>
              <Clock size={16} /> {shipment.eta}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
