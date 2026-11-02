import React from 'react';
import { Card, Select, Button, Spinner } from '../../../components';
import { Play } from 'lucide-react';
import type { SimulationScenario } from '../types';

interface SimulationControlsProps {
  selectedScenario: SimulationScenario;
  onScenarioChange: (scenario: SimulationScenario) => void;
  onRun: () => void;
  isRunning: boolean;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  selectedScenario, onScenarioChange, onRun, isRunning
}) => {
  return (
    <Card style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', backgroundColor: 'var(--color-bg-subtle)' }}>
      <div style={{ flex: 1, maxWidth: '400px' }}>
        <Select 
          label="Select Disaster Scenario"
          value={selectedScenario}
          onChange={(e) => onScenarioChange(e.target.value as SimulationScenario)}
          disabled={isRunning}
          options={[
            { label: 'Landslide', value: 'LANDSLIDE' },
            { label: 'Flood', value: 'FLOOD' },
            { label: 'Heavy Rainfall', value: 'HEAVY_RAINFALL' },
            { label: 'Road Blockage', value: 'ROAD_BLOCKAGE' },
            { label: 'Multiple Incidents', value: 'MULTIPLE_INCIDENTS' }
          ]}
        />
      </div>
      <Button variant="primary" onClick={onRun} disabled={isRunning} style={{ height: '42px', padding: '0 2rem' }}>
        {isRunning ? <Spinner size="sm" /> : <Play size={18} style={{ marginRight: '8px' }} />}
        {isRunning ? <span style={{ marginLeft: '8px' }}>Simulating...</span> : 'Run Simulation'}
      </Button>
    </Card>
  );
};
