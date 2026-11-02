// React is automatically injected in Vite/React 17+
import { Spinner, ErrorState } from '../../components';
import { useEmergency } from '../../features/emergency/hooks/useEmergency';
import { 
  EmergencyStatusBanner, 
  EmergencyStatsGrid, 
  AIRecommendationPanel, 
  ActionPlanPanel 
} from '../../features/emergency/components';

const EmergencyCenter = () => {
  const { 
    data, 
    recommendations, 
    plans, 
    isLoading, 
    error, 
    isActionLoading,
    approveRecommendation,
    rejectRecommendation
  } = useEmergency();

  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState title="Error Loading Emergency Center" message={error} />
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 64px - 3rem)' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Emergency Operations Center
        </h1>
      </div>

      <EmergencyStatusBanner status={data.status} />

      <EmergencyStatsGrid data={data} />

      <div className="grid-layout-1-1" style={{ flex: 1, minHeight: 0 }}>
        <div style={{ overflow: 'hidden' }}>
          <AIRecommendationPanel 
            recommendations={recommendations}
            onApprove={approveRecommendation}
            onReject={rejectRecommendation}
            isActionLoading={isActionLoading}
          />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <ActionPlanPanel plans={plans} />
        </div>
      </div>
    </div>
  );
};

export default EmergencyCenter;
