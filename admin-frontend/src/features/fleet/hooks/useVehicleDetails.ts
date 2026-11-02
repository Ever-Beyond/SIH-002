import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fleetService } from '../services/fleetService';
import type { VehicleDetails } from '../types';

export const useVehicleDetails = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [data, setData] = useState<VehicleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!vehicleId) {
        setError('No Vehicle ID provided.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const details = await fleetService.getVehicleDetails(vehicleId);
        if (details) {
          setData(details);
          setError(null);
        } else {
          setError(`Vehicle ${vehicleId} not found.`);
        }
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch vehicle details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [vehicleId]);

  return { vehicleId, data, isLoading, error };
};
