import type { ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';
import { cn } from '../../utils/cn';

export interface MapProps {
  children?: ReactNode;
  className?: string;
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
}

export const Map = ({ 
  children, 
  className, 
  center = [26.1445, 91.7362], // Default to Guwahati
  zoom = 12,
  height = '100%',
  width = '100%'
}: MapProps) => {
  return (
    <div className={cn(styles.mapContainer, className)} style={{ height, width }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // We will implement custom controls
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
};
