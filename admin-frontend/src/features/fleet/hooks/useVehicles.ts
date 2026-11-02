import { useState, useEffect } from 'react';
import { fleetService } from '../services/fleetService';
import type { Vehicle, FleetFilters } from '../types';

export const useVehicles = (filters?: FleetFilters) => {
  const [data, setData] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const vehicles = await fleetService.getVehicles(filters);
        setData(vehicles);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch vehicles.');
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(() => {
      fetchVehicles();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);
  return { data, isLoading, error };
};
