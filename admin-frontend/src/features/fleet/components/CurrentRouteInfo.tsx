import { AlertOctagon } from 'lucide-react';

interface CurrentRouteInfoProps {
  vehicleId: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const CurrentRouteInfo = ({ vehicleId, riskLevel }: CurrentRouteInfoProps) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'HIGH': return 'var(--color-danger)';
      case 'MEDIUM': return 'var(--color-warning)';
      case 'LOW': return 'var(--color-success)';
      default: return 'var(--color-text-muted)';
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem', 
      padding: '1rem', 
      backgroundColor: 'var(--color-surface)',
      border: `1px solid ${getRiskColor()}`,
      borderLeft: `4px solid ${getRiskColor()}`,
      borderRadius: 'var(--radius-md)',
      marginBottom: '1.5rem'
    }}>
      <AlertOctagon color={getRiskColor()} size={24} />
      <div>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Current Route for {vehicleId}</h3>
        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          The active route is currently flagged as <strong>{riskLevel} RISK</strong>. Please select an alternative below.
        </p>
      </div>
    </div>
  );
};
