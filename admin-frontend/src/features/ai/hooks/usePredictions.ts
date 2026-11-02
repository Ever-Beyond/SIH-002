import { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import type { AiPrediction } from '../types';

export const usePredictions = () => {
  const [data, setData] = useState<AiPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true);
        const predictions = await aiService.getPredictions();
        setData(predictions);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch AI predictions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  return {
    data,
    isLoading,
    error
  };
};
