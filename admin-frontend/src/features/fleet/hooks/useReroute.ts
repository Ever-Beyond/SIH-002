import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { routeApi } from '../services/routeApi';
import type { RerouteRecommendation } from '../types';

export const useReroute = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();

  const [recommendation, setRecommendation] = useState<RerouteRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlternatives = async () => {
      if (!vehicleId) {
        setError('No Vehicle ID provided.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await routeApi.reroute(vehicleId);
        setRecommendation(data);
        // Auto-select the first LOW risk route, or just the first one
        const recommended = data.alternatives.find(r => r.riskLevel === 'LOW') || data.alternatives[0];
        if (recommended) setSelectedRouteId(recommended.id);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to generate alternative routes.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlternatives();
  }, [vehicleId]);

  const handleAcceptRoute = async () => {
    if (!selectedRouteId || !vehicleId) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const success = await routeApi.acceptRoute(selectedRouteId);
      
      if (success) {
        // Redirect back to the vehicle details page after successfully accepting the route
        navigate(`/fleet/vehicles/${vehicleId}`);
      }
    } catch (err: unknown) {
      console.error(err);
      setSubmitError('Failed to accept the new route. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (vehicleId) {
      navigate(`/fleet/vehicles/${vehicleId}`);
    } else {
      navigate('/fleet/live');
    }
  };

  return {
    vehicleId,
    recommendation,
    isLoading,
    error,
    selectedRouteId,
    setSelectedRouteId,
    isSubmitting,
    submitError,
    handleAcceptRoute,
    handleCancel
  };
};
