import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SimulationWarningBanner: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '0.75rem',
      backgroundColor: '#ffaa00', // A strong caution yellow/orange
      color: '#000000',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)'
    }}>
      <AlertTriangle size={20} />
      <span>Simulation Mode Active - Displayed data is mocked and not live</span>
      <AlertTriangle size={20} />
    </div>
  );
};
