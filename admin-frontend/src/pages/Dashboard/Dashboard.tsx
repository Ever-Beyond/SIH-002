import { useState, useEffect } from 'react';
import { Spinner, ErrorState } from '../../components';
import { mockDashboardData } from '../../features/dashboard/mockData';
import type { DashboardData } from '../../features/dashboard/types';
import {
  KpiOverview,
  MapWidget,
  IncidentList,
  AiRecommendations,
  DelayedDeliveries,
  RouteRisks,
  EmergencyStatusWidget
} from '../../features/dashboard/components';

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setData(mockDashboardData);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '400px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState title="Dashboard Error" message={error || 'Unknown error occurred.'} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="page-header" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>Command Center Overview</h1>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <KpiOverview metrics={data.metrics} />
      
      <MapWidget />

      <div className="grid-auto-fit" style={{ marginTop: '0.5rem' }}>
        <IncidentList incidents={data.incidents} />
        <AiRecommendations recommendations={data.recommendations} />
        <DelayedDeliveries delays={data.delays} />
        <RouteRisks risks={data.risks} />
        <EmergencyStatusWidget emergencies={data.emergencies} />
      </div>
    </div>
  );
};

export default Dashboard;
