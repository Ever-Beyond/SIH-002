import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useVehicleStore } from '../store/vehicleStore';
import { useShipmentStore } from '../store/shipmentStore';
import { useIncidentStore } from '../store/incidentStore';

export const useInitializeApp = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        useAuthStore.getState().init(),
        useVehicleStore.getState().init(),
        useShipmentStore.getState().init(),
        useIncidentStore.getState().init()
      ]);
      setIsInitializing(false);
    };
    init();
  }, []);

  return { isInitializing };
};
