import { Card, Badge, Button } from '../../../components';
import type { AiRecommendation } from '../types';
import { Zap } from 'lucide-react';
import styles from './DashboardComponents.module.css';

interface AiRecommendationsProps {
  recommendations: AiRecommendation[];
}

export const AiRecommendations: React.FC<AiRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card className={styles.listWidget}>
      <div className={styles.widgetHeader}>
        <h3 className={styles.widgetTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} color="var(--color-primary)" />
          AI Recommendations
        </h3>
      </div>
      <div className={styles.listContainer}>
        {recommendations.length === 0 ? (
          <div className={styles.emptyText}>No new recommendations.</div>
        ) : (
          recommendations.map(rec => (
            <div key={rec.id} className={styles.aiItem}>
              <div className={styles.aiHeader}>
                <div className={styles.itemTitle}>{rec.action}</div>
                <Badge variant="primary">{rec.confidence}% Confidence</Badge>
              </div>
              <div className={styles.itemSub}>{rec.reason}</div>
              <div className={styles.aiActions}>
                <Button variant="outline" size="sm">Ignore</Button>
                <Button variant="primary" size="sm">Apply</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
