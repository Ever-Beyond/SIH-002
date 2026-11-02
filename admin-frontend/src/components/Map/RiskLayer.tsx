import { Polygon } from 'react-leaflet';

export interface RiskLayerProps {
  positions: [number, number][]; // Array of lat,lng points defining the polygon
  level?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const RiskLayer = ({ positions, level = 'MEDIUM' }: RiskLayerProps) => {
  const getColor = () => {
    switch (level) {
      case 'HIGH': return 'var(--color-danger)';
      case 'MEDIUM': return 'var(--color-warning)';
      case 'LOW': return 'var(--color-success)';
      default: return 'var(--color-danger)';
    }
  };

  return (
    <Polygon 
      positions={positions} 
      pathOptions={{ 
        color: getColor(), 
        fillColor: getColor(), 
        fillOpacity: 0.2,
        weight: 2
      }} 
    />
  );
};
