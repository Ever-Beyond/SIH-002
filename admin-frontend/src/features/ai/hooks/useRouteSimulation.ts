import { useState } from 'react';
import { aiService } from '../services/aiService';
import type { RouteSimulationResult, SimulationParams } from '../types';

export const useRouteSimulation = () => {
  const [result, setResult] = useState<RouteSimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulate = async (params: SimulationParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await aiService.simulateRoute(params);
      setResult(res);
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to run route simulation.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    simulate,
    reset,
    result,
    isLoading,
    error
  };
};
