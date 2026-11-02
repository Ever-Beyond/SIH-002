import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle } from 'lucide-react';
import type { EmergencyStatus } from '../types';

interface EmergencyStatusBannerProps {
  status: EmergencyStatus;
}

export const EmergencyStatusBanner: React.FC<EmergencyStatusBannerProps> = ({ status }) => {
  const getBannerStyles = () => {
    switch (status) {
      case 'CRITICAL':
        return { bg: 'var(--color-danger-light)', border: 'var(--color-danger)', text: 'var(--color-danger-dark)', icon: <AlertOctagon size={24} /> };
      case 'ELEVATED':
        return { bg: 'var(--color-warning-light)', border: 'var(--color-warning)', text: 'var(--color-warning-dark)', icon: <AlertTriangle size={24} /> };
      case 'NORMAL':
      default:
        return { bg: 'var(--color-success-light)', border: 'var(--color-success)', text: 'var(--color-success-dark)', icon: <CheckCircle size={24} /> };
    }
  };

  const styles = getBannerStyles();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.5rem',
      backgroundColor: styles.bg,
      border: `1px solid ${styles.border}`,
      borderRadius: 'var(--radius-lg)',
      color: styles.text
    }}>
      {styles.icon}
      <div>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
          SYSTEM STATUS: {status}
        </h2>
        <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9 }}>
          {status === 'CRITICAL' ? 'Multiple severe disruptions detected. Immediate attention required.' : 
           status === 'ELEVATED' ? 'Some disruptions detected. Monitor closely.' : 
           'All systems operating normally.'}
        </p>
      </div>
    </div>
  );
};
