import { useState, useEffect, useCallback } from 'react';
import { emergencyService } from '../services/emergencyService';
import { useToast } from '../../../components';
import type { EmergencyData, AIRecommendation, ActionPlan } from '../types';

export const useEmergency = () => {
  const [data, setData] = useState<EmergencyData | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const result = await emergencyService.getDashboardData();
      setData(result.data);
      setRecommendations(result.recommendations);
      setPlans(result.plans);
      setError(null);
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to load emergency dashboard data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  const approveRecommendation = async (id: string) => {
    setIsActionLoading(id);
    try {
      await emergencyService.approveRecommendation(id);
      addToast({ title: 'Authorized', message: 'AI recommendation approved and added to Action Plans.', type: 'success' });
      await fetchData(); // Refresh data
    } catch {
      addToast({ title: 'Error', message: 'Failed to authorize recommendation.', type: 'error' });
    } finally {
      setIsActionLoading(null);
    }
  };

  const rejectRecommendation = async (id: string) => {
    setIsActionLoading(id);
    try {
      await emergencyService.rejectRecommendation(id);
      addToast({ title: 'Rejected', message: 'AI recommendation has been discarded.', type: 'info' });
      await fetchData(); // Refresh data
    } catch {
      addToast({ title: 'Error', message: 'Failed to reject recommendation.', type: 'error' });
    } finally {
      setIsActionLoading(null);
    }
  };

  return {
    data,
    recommendations,
    plans,
    isLoading,
    error,
    isActionLoading,
    approveRecommendation,
    rejectRecommendation
  };
};
