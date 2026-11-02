import { Polyline } from 'react-leaflet';

export interface RouteLayerProps {
  positions: [number, number][];
  color?: string;
  weight?: number;
  opacity?: number;
  dashArray?: string;
}

export const RouteLayer = ({ 
  positions, 
  color = 'var(--color-primary)', 
  weight = 4, 
  opacity = 0.8,
  dashArray
}: RouteLayerProps) => {
  return (
    <Polyline 
      positions={positions} 
      pathOptions={{ color, weight, opacity, dashArray }} 
    />
  );
};
