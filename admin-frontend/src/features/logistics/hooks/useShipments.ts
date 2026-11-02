import { useState, useEffect } from 'react';
import { logisticsService } from '../services/logisticsService';
import type { Shipment, ShipmentFiltersState } from '../types';

export const useShipments = (filters: ShipmentFiltersState) => {
  const [data, setData] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setIsLoading(true);
        const shipments = await logisticsService.getShipments(filters);
        setData(shipments);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch shipments.');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchShipments();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return { data, isLoading, error };
};
