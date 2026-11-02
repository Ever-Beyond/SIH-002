import { Card } from '../../../components';
import type { RouteSegment } from '../types';
import { Navigation } from 'lucide-react';
import styles from './FleetComponents.module.css';

interface RouteHistoryTimelineProps {
  history: RouteSegment[];
}

export const RouteHistoryTimeline = ({ history }: RouteHistoryTimelineProps) => {
  return (
    <Card className={styles.detailCard}>
      <div className={styles.detailCardHeader}>
        <h3 className={styles.detailCardTitle}>
          <Navigation size={20} /> Route Progress
        </h3>
      </div>
      
      {history.length === 0 ? (
        <div className={styles.emptyCardState}>No route history available.</div>
      ) : (
        <div className={styles.timeline}>
          {history.map((segment, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={`${styles.timelineDot} ${styles[`dot_${segment.status.toLowerCase()}`]}`} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineLocation}>{segment.location}</div>
                <div className={styles.timelineMeta}>
                  <span className={styles.timelineTimestamp}>{segment.timestamp}</span>
                  <span className={`${styles.timelineStatus} ${styles[`status_${segment.status.toLowerCase()}`]}`}>
                    {segment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
