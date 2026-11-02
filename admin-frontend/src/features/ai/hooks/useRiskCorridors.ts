import { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import type { RiskCorridor } from '../types';

export const useRiskCorridors = () => {
  const [data, setData] = useState<RiskCorridor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCorridors = async () => {
      try {
        setIsLoading(true);
        const corridors = await aiService.getRiskCorridors();
        setData(corridors);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch risk corridors.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCorridors();
  }, []);

  return {
    data,
    isLoading,
    error
  };
};
