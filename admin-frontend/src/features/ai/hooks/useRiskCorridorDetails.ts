import { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import type { RiskCorridorDetails } from '../types';

export const useRiskCorridorDetails = (corridorId: string | undefined) => {
  const [data, setData] = useState<RiskCorridorDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!corridorId) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const details = await aiService.getRiskCorridorDetails(corridorId);
        setData(details);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch risk corridor details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [corridorId]);

  return {
    data,
    isLoading,
    error
  };
};
