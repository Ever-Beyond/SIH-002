import { useMap } from 'react-leaflet';
import { Plus, Minus, Layers } from 'lucide-react';
import { Button } from '../Button';
import styles from './Map.module.css';

export interface MapControlsProps {
  onToggleLayer?: (layerId: string) => void;
}

export const MapControls = ({ onToggleLayer }: MapControlsProps) => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className={styles.mapControls}>
      <Button variant="secondary" size="sm" onClick={handleZoomIn} aria-label="Zoom In" style={{ padding: '0.5rem' }}>
        <Plus size={16} />
      </Button>
      <Button variant="secondary" size="sm" onClick={handleZoomOut} aria-label="Zoom Out" style={{ padding: '0.5rem' }}>
        <Minus size={16} />
      </Button>
      {onToggleLayer && (
        <Button variant="secondary" size="sm" onClick={() => onToggleLayer('default')} aria-label="Toggle Layers" style={{ padding: '0.5rem', marginTop: '0.5rem' }}>
          <Layers size={16} />
        </Button>
      )}
    </div>
  );
};
