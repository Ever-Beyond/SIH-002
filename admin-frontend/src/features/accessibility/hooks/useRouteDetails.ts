import { useState, useEffect } from 'react';
import { accessibilityService } from '../services/accessibilityService';
import type { RouteDetailsData } from '../types';

export const useRouteDetails = (routeId: string | undefined) => {
  const [data, setData] = useState<RouteDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!routeId) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const details = await accessibilityService.getRouteDetails(routeId);
        setData(details);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch route details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [routeId]);

  return {
    data,
    isLoading,
    error
  };
};
