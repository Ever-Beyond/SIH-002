import type { ReactNode } from 'react';
import { Marker } from './Marker';
import { AlertTriangle } from 'lucide-react';

export interface IncidentMarkerProps {
  position: [number, number];
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  popupContent?: ReactNode;
}

export const IncidentMarker = ({ position, severity = 'HIGH', popupContent }: IncidentMarkerProps) => {
  const getColor = () => {
    switch (severity) {
      case 'CRITICAL': 
      case 'HIGH': return 'var(--color-danger)';
      case 'MEDIUM': return 'var(--color-warning)';
      case 'LOW': return 'var(--color-primary)';
      default: return 'var(--color-danger)';
    }
  };

  const isPulsing = severity === 'CRITICAL' || severity === 'HIGH';

  return (
    <Marker 
      position={position} 
      icon={<AlertTriangle size={16} />} 
      color={getColor()}
      pulsing={isPulsing}
      popupContent={popupContent}
    />
  );
};
