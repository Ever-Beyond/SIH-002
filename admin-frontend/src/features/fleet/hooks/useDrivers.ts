import { useState, useEffect } from 'react';
import { fleetService } from '../services/fleetService';
import type { Driver, DriverStatus } from '../types';

export const useDrivers = (searchQuery: string, status: DriverStatus | 'ALL') => {
  const [data, setData] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setIsLoading(true);
        const drivers = await fleetService.getDrivers(searchQuery, status);
        setData(drivers);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch drivers.');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchDrivers();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, status]);

  return { data, isLoading, error };
};
