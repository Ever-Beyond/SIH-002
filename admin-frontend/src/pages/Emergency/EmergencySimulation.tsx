import { useEmergencySimulation } from '../../features/emergency/hooks/useEmergencySimulation';
import { 
  SimulationWarningBanner, 
  SimulationControls, 
  SimulationResultsPanel 
} from '../../features/emergency/components';
import { ErrorState } from '../../components';

const EmergencySimulation = () => {
  const {
    selectedScenario,
    setSelectedScenario,
    result,
    isRunning,
    error,
    runSimulation
  } = useEmergencySimulation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Emergency Simulation Engine
        </h1>
      </div>

      <SimulationWarningBanner />

      <SimulationControls 
        selectedScenario={selectedScenario}
        onScenarioChange={setSelectedScenario}
        onRun={runSimulation}
        isRunning={isRunning}
      />

      {error && (
        <ErrorState title="Simulation Error" message={error} />
      )}

      {result && !isRunning && !error && (
        <SimulationResultsPanel result={result} />
      )}
      
      {!result && !isRunning && !error && (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Select a scenario and click "Run Simulation" to generate impact analysis.
        </div>
      )}
    </div>
  );
};

export default EmergencySimulation;
