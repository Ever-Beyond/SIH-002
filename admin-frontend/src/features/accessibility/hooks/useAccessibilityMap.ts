import { useState, useEffect } from 'react';
import { accessibilityService } from '../services/accessibilityService';
import type { AccessibilityFiltersState, RoadSegment, CriticalCorridor, MapIncident } from '../types';

export const useAccessibilityMap = () => {
  const [filters, setFilters] = useState<AccessibilityFiltersState>({
    status: 'ALL',
    risk: 'ALL',
    district: 'ALL',
    incidentType: 'ALL'
  });

  const [roads, setRoads] = useState<RoadSegment[]>([]);
  const [corridors, setCorridors] = useState<CriticalCorridor[]>([]);
  const [incidents, setIncidents] = useState<MapIncident[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch all layers in parallel based on filters
        const [roadsData, corridorsData, incidentsData] = await Promise.all([
          accessibilityService.getRoadNetwork(filters),
          accessibilityService.getCriticalCorridors(),
          accessibilityService.getIncidents(filters)
        ]);

        setRoads(roadsData);
        setCorridors(corridorsData);
        setIncidents(incidentsData);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch accessibility map data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const updateFilter = <K extends keyof AccessibilityFiltersState>(key: K, value: AccessibilityFiltersState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilter,
    roads,
    corridors,
    incidents,
    isLoading,
    error
  };
};
