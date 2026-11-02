import React from 'react';
import { Card, Badge, Button, Spinner } from '../../../components';
import { BrainCircuit, Check, X, ShieldAlert } from 'lucide-react';
import type { AIRecommendation } from '../types';

interface AIRecommendationPanelProps {
  recommendations: AIRecommendation[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isActionLoading: string | null;
}

export const AIRecommendationPanel: React.FC<AIRecommendationPanelProps> = ({ 
  recommendations, onApprove, onReject, isActionLoading 
}) => {
  const pendingRecs = recommendations.filter(r => r.status === 'PENDING');

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <BrainCircuit size={20} color="var(--color-primary)" />
          AI Recommendations
        </h2>
        <Badge variant="warning">{pendingRecs.length} Pending</Badge>
      </div>

      <div style={{ backgroundColor: 'var(--color-warning-light)', border: '1px solid var(--color-warning)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <ShieldAlert size={20} color="var(--color-warning-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'var(--color-warning-dark)', display: 'block', marginBottom: '4px' }}>Authorization Required</strong>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-warning-dark)' }}>
            AI systems cannot execute emergency actions automatically. Human verification and explicit authorization are strictly required for all proposed interventions.
          </span>
        </div>
      </div>

      {pendingRecs.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No pending AI recommendations at this time.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          {pendingRecs.map(rec => (
            <div key={rec.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{rec.description}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rec.id}</span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ fontSize: '0.875rem', display: 'block', marginBottom: '0.25rem' }}>Risk Assessment:</strong>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{rec.riskAssessment}</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Proposed Action Steps:</strong>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {rec.actionSteps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{step}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <Button 
                  variant="outline" 
                  onClick={() => onReject(rec.id)}
                  disabled={isActionLoading !== null}
                >
                  <X size={16} style={{ marginRight: '4px' }} /> Reject
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => onApprove(rec.id)}
                  disabled={isActionLoading !== null}
                >
                  {isActionLoading === rec.id ? <Spinner size="sm" /> : <Check size={16} style={{ marginRight: '4px' }} />} 
                  <span style={{ marginLeft: isActionLoading === rec.id ? '8px' : '0' }}>Authorize & Execute</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
