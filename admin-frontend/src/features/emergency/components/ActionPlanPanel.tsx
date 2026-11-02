import React from 'react';
import { Card, Badge } from '../../../components';
import { ClipboardList, Activity } from 'lucide-react';
import type { ActionPlan } from '../types';

interface ActionPlanPanelProps {
  plans: ActionPlan[];
}

export const ActionPlanPanel: React.FC<ActionPlanPanelProps> = ({ plans }) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', backgroundColor: 'var(--color-bg-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <ClipboardList size={20} color="var(--color-text-base)" />
          Active Action Plans
        </h2>
        <Badge variant="primary">{plans.length} Active</Badge>
      </div>

      {plans.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No active emergency action plans.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {plan.title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{plan.id}</span>
                </div>
                <Badge variant={plan.status === 'IN_PROGRESS' ? 'warning' : 'success'}>
                  {plan.status === 'IN_PROGRESS' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Activity size={12} /> Executing
                    </span>
                  ) : 'Completed'}
                </Badge>
              </div>
              
              <div>
                <strong style={{ fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Execution Steps:</strong>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {plan.steps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
