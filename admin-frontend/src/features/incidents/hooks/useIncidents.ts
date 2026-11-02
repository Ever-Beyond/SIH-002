import { useState, useEffect } from 'react';
import { incidentService } from '../services/incidentService';
import type { Incident, IncidentFiltersState, PaginatedResponse } from '../types';

export const useIncidents = (filters: IncidentFiltersState, page: number, limit: number = 10) => {
  const [data, setData] = useState<PaginatedResponse<Incident>>({ data: [], total: 0, page: 1, totalPages: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchIncidents = async () => {
      try {
        setIsLoading(true);
        const result = await incidentService.getIncidents(filters, page, limit);
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: unknown) {
        console.error(err);
        if (isMounted) {
          setError('Failed to fetch incidents.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Debounce the fetch slightly to avoid rapid calls when typing
    const timer = setTimeout(() => {
      fetchIncidents();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [filters, page, limit]);

  return { ...data, isLoading, error };
};
