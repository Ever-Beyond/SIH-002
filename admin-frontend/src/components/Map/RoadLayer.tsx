import { Polyline } from 'react-leaflet';

export interface RoadLayerProps {
  positions: [number, number][];
  type?: 'HIGHWAY' | 'LOCAL' | 'DIRT';
  color?: string;
  onClick?: () => void;
}

export const RoadLayer = ({ positions, type = 'LOCAL', color, onClick }: RoadLayerProps) => {
  const getStyle = () => {
    switch (type) {
      case 'HIGHWAY': return { color: '#f59e0b', weight: 6, opacity: 0.7 }; // Amber for highways
      case 'DIRT': return { color: '#8b5cf6', weight: 3, opacity: 0.6, dashArray: '5, 10' }; // Purple dashed for dirt
      case 'LOCAL': 
      default: return { color: '#64748b', weight: 4, opacity: 0.6 }; // Slate for local roads
    }
  };

  return (
    <Polyline 
      positions={positions} 
      pathOptions={color ? { color, weight: 6, opacity: 0.8 } : getStyle()} 
      eventHandlers={onClick ? { click: onClick } : undefined}
    />
  );
};
