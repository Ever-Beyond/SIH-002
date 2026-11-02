import { useState } from 'react';
import { incidentService } from '../services/incidentService';
import { useToast } from '../../../components';

export const useIncidentActions = () => {
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const { addToast } = useToast();

  const handleAction = async (actionFn: () => Promise<void>, successMessage: string) => {
    setIsActionLoading(true);
    try {
      await actionFn();
      addToast({ title: 'Success', message: successMessage, type: 'success' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', message: 'Action failed to execute.', type: 'error' });
    } finally {
      setIsActionLoading(false);
    }
  };

  const blockRoad = (id: string) => 
    handleAction(() => incidentService.blockRoad(id), 'Road blocked successfully.');

  const dispatchTeam = (id: string) => 
    handleAction(() => incidentService.dispatchTeam(id), 'Team dispatched successfully.');

  const calculateAlternativeRoute = (id: string) => 
    handleAction(() => incidentService.calculateAlternativeRoute(id), 'Alternative route calculated and broadcasted.');

  return {
    blockRoad,
    dispatchTeam,
    calculateAlternativeRoute,
    isActionLoading
  };
};
