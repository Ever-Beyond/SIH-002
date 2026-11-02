import type { ReactNode } from 'react';
import { Marker } from './Marker';
import { Truck } from 'lucide-react';

export interface VehicleMarkerProps {
  position: [number, number];
  status?: 'ACTIVE' | 'IDLE' | 'MAINTENANCE';
  popupContent?: ReactNode;
}

export const VehicleMarker = ({ position, status = 'ACTIVE', popupContent }: VehicleMarkerProps) => {
  const getColor = () => {
    switch (status) {
      case 'ACTIVE': return 'var(--color-success)';
      case 'IDLE': return 'var(--color-warning)';
      case 'MAINTENANCE': return 'var(--color-danger)';
      default: return 'var(--color-primary)';
    }
  };

  return (
    <Marker 
      position={position} 
      icon={<Truck size={16} />} 
      color={getColor()}
      popupContent={popupContent}
    />
  );
};
