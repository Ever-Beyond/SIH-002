import { useState, useEffect } from 'react';
import { incidentService } from '../services/incidentService';
import type { IncidentDetails } from '../types';

export const useIncidentDetails = (id: string | undefined) => {
  const [data, setData] = useState<IncidentDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    if (!id) {
      return;
    }

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const result = await incidentService.getIncidentDetails(id);
        if (isMounted) {
          setData(result);
          setError(result ? null : 'Incident not found.');
        }
      } catch (err: unknown) {
        console.error(err);
        if (isMounted) {
          setError('Failed to fetch incident details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, isLoading, error };
};
