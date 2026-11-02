import { Map as MapIcon } from 'lucide-react';
import type { Vehicle } from '../types';
import styles from './FleetComponents.module.css';

interface LiveMapProps {
  vehicles: Vehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const LiveMap = ({ vehicles, selectedId, onSelect }: LiveMapProps) => {
  // A simple placeholder logic for GIS
  // In a real app this would be Leaflet or Google Maps with real Lat/Lng plots.
  // Here we just scatter them randomly over a background map placeholder.
  
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapBackground}>
        <MapIcon size={64} color="var(--color-text-muted)" style={{ opacity: 0.2 }} />
        <span className={styles.mapWatermark}>Live GIS View (Placeholder)</span>
        
        {vehicles.map((v, i) => {
          // Fake random positioning for the placeholder
          const top = `${20 + (i * 15 % 60)}%`;
          const left = `${20 + (i * 25 % 60)}%`;
          
          return (
            <div 
              key={v.id} 
              className={`${styles.mapMarker} ${selectedId === v.id ? styles.markerSelected : ''}`}
              style={{ top, left }}
              onClick={() => onSelect(v.id)}
              title={v.plateNumber}
            >
              <div className={`${styles.markerDot} ${styles[v.status.toLowerCase()]}`} />
              {selectedId === v.id && (
                <div className={styles.markerLabel}>{v.plateNumber}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
