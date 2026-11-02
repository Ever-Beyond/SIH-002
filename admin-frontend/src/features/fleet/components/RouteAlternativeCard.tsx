import { Card, Badge } from '../../../components';
import type { RouteAlternative } from '../types';
import { Route, Clock, Navigation } from 'lucide-react';
import styles from './FleetComponents.module.css';
import { cn } from '../../../utils/cn';

interface RouteAlternativeCardProps {
  alternative: RouteAlternative;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const RouteAlternativeCard = ({ alternative, isSelected, onSelect }: RouteAlternativeCardProps) => {
  return (
    <Card 
      className={cn(styles.alternativeCard, isSelected && styles.alternativeCardSelected)}
      onClick={() => onSelect(alternative.id)}
      style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)' }}
    >
      <div className={styles.detailCardHeader}>
        <h3 className={styles.detailCardTitle}>
          <Route size={18} /> {alternative.pathOverview}
        </h3>
        <Badge variant={alternative.riskLevel === 'LOW' ? 'success' : alternative.riskLevel === 'MEDIUM' ? 'warning' : 'danger'}>
          {alternative.riskLevel} RISK
        </Badge>
      </div>

      <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0', color: 'var(--color-text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Navigation size={16} /> {alternative.distanceKm} km
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} /> {alternative.eta}
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
        <strong>AI Recommendation:</strong> {alternative.reason}
      </div>
    </Card>
  );
};
