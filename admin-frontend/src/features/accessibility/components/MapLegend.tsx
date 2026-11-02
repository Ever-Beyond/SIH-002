import { Card } from '../../../components';

export const MapLegend = () => {
  return (
    <Card style={{ 
      position: 'absolute', 
      bottom: '2rem', 
      right: '1rem', 
      zIndex: 1000, 
      padding: '1rem',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      minWidth: '200px'
    }}>
      <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>Legend</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '4px', backgroundColor: 'var(--color-success)' }} />
          <span style={{ fontSize: '0.75rem', color: 'white' }}>Open Road</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '4px', backgroundColor: 'var(--color-warning)' }} />
          <span style={{ fontSize: '0.75rem', color: 'white' }}>Partially Blocked</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '4px', backgroundColor: 'var(--color-danger)' }} />
          <span style={{ fontSize: '0.75rem', color: 'white' }}>Blocked Route</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '16px', height: '4px', backgroundColor: '#8b5cf6', opacity: 0.8 }} />
          <span style={{ fontSize: '0.75rem', color: 'white' }}>Critical Supply Corridor</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--color-danger)', backgroundColor: 'transparent' }} />
          <span style={{ fontSize: '0.75rem', color: 'white' }}>Active Incident</span>
        </div>
      </div>
    </Card>
  );
};
