import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fleetService } from '../services/fleetService';
import type { DriverDetails } from '../types';

export const useDriverDetails = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const [data, setData] = useState<DriverDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!driverId) {
        setError('No Driver ID provided.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const details = await fleetService.getDriverDetails(driverId);
        if (details) {
          setData(details);
          setError(null);
        } else {
          setError(`Driver ${driverId} not found.`);
        }
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch driver details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [driverId]);

  return { driverId, data, isLoading, error };
};
