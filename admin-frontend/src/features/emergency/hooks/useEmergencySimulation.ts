import { useState } from 'react';
import { emergencyService } from '../services/emergencyService';
import type { SimulationScenario, SimulationResult } from '../types';

export const useEmergencySimulation = () => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>('LANDSLIDE');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setIsRunning(true);
    setError(null);
    try {
      const simResult = await emergencyService.runSimulation(selectedScenario);
      setResult(simResult);
    } catch (err) {
      console.error(err);
      setError('Failed to run emergency simulation.');
    } finally {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setResult(null);
    setError(null);
  };

  return {
    selectedScenario,
    setSelectedScenario,
    result,
    isRunning,
    error,
    runSimulation,
    resetSimulation
  };
};
