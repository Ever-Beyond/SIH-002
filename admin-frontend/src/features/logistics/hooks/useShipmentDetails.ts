import { useState, useEffect } from 'react';
import { logisticsService } from '../services/logisticsService';
import type { ShipmentDetails } from '../types';

export const useShipmentDetails = (shipmentId: string | undefined) => {
  const [data, setData] = useState<ShipmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shipmentId) {
      Promise.resolve().then(() => {
        setError('Shipment ID is missing.');
        setIsLoading(false);
      });
      return;
    }

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const details = await logisticsService.getShipmentById(shipmentId);
        setData(details as ShipmentDetails);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch shipment details or shipment does not exist.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [shipmentId]);

  return { data, isLoading, error };
};
