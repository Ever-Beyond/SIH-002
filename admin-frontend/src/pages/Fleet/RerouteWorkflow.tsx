import { Spinner, ErrorState, Button } from '../../components';
import { useReroute } from '../../features/fleet/hooks/useReroute';
import { RouteAlternativeCard, CurrentRouteInfo } from '../../features/fleet/components';

const RerouteWorkflow = () => {
  const {
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
  } = useReroute();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '400px' }}>
        <Spinner size="lg" />
        <p style={{ color: 'var(--color-text-muted)' }}>AI is calculating optimal routes...</p>
      </div>
    );
  }

  if (error || !recommendation || !vehicleId) {
    return (
      <div style={{ padding: '2rem' }}>
        <ErrorState title="Reroute Failed" message={error || 'Could not generate alternative routes.'} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button variant="outline" onClick={handleCancel}>Back to Vehicle</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Reroute Recommendation
        </h1>
      </div>

      <CurrentRouteInfo vehicleId={vehicleId} riskLevel={recommendation.currentRouteRisk} />

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1rem 0' }}>Alternative Routes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recommendation.alternatives.map(alt => (
            <RouteAlternativeCard
              key={alt.id}
              alternative={alt}
              isSelected={selectedRouteId === alt.id}
              onSelect={setSelectedRouteId}
            />
          ))}
        </div>
      </div>

      {submitError && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
          {submitError}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
        <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAcceptRoute} disabled={isSubmitting || !selectedRouteId}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" /> Accepting...
            </>
          ) : (
            'Accept Route'
          )}
        </Button>
      </div>
    </div>
  );
};

export default RerouteWorkflow;
