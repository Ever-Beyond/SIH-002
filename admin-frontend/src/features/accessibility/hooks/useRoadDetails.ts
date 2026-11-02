import { useState, useEffect } from 'react';
import { accessibilityService } from '../services/accessibilityService';
import type { RoadDetailsData } from '../types';

export const useRoadDetails = (roadId: string | undefined) => {
  const [data, setData] = useState<RoadDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roadId) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const details = await accessibilityService.getRoadDetails(roadId);
        setData(details);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch road details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [roadId]);

  return {
    data,
    isLoading,
    error
  };
};
