import type { ReactNode } from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import styles from './Map.module.css';
import { cn } from '../../utils/cn';

export interface MarkerProps {
  position: [number, number];
  icon: ReactNode;
  color?: string;
  pulsing?: boolean;
  popupContent?: ReactNode;
}

export const Marker = ({ position, icon, color = 'var(--color-primary)', pulsing = false, popupContent }: MarkerProps) => {
  
  // Render the React icon into a static HTML string to pass to Leaflet's divIcon
  const iconMarkup = renderToStaticMarkup(
    <div className={cn(styles.markerBase, pulsing && styles.markerPulse)} style={{ color }}>
      {icon}
    </div>
  );

  const customIcon = divIcon({
    html: iconMarkup,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  return (
    <LeafletMarker position={position} icon={customIcon}>
      {popupContent && (
        <Popup>
          {popupContent}
        </Popup>
      )}
    </LeafletMarker>
  );
};
