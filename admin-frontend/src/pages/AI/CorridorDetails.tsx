import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Spinner, ErrorState } from '../../components';
import { Map, MapControls, RouteLayer } from '../../components/Map';
import { useRiskCorridorDetails } from '../../features/ai/hooks/useRiskCorridorDetails';
import { ArrowLeft, AlertTriangle, CloudRain, ShieldAlert, History, Truck } from 'lucide-react';

const CorridorDetails = () => {
  const { corridorId } = useParams();
  const navigate = useNavigate();
  const { data: corridor, isLoading, error } = useRiskCorridorDetails(corridorId);

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !corridor) {
    return (
      <div className="page-container">
        <Button variant="ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back
        </Button>
        <ErrorState title="Corridor Not Found" message={error || "We couldn't locate the details for this risk corridor."} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 64px)' }}>
      <div className="page-header">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Rankings
        </Button>
        <Badge variant={corridor.currentAccessibility === 'OPEN' ? 'success' : corridor.currentAccessibility === 'PARTIAL' ? 'warning' : 'danger'}>
          {corridor.currentAccessibility}
        </Badge>
      </div>

      <div className="grid-layout-1-1" style={{ flex: 1, minHeight: 0 }}>
        {/* Main Area: Map & Top Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <Card style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{corridor.name}</h1>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>ID: {corridor.id} | Rank: #{corridor.ranking}</p>
              </div>
            </div>

            <div className="grid-auto-fit" style={{ gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertTriangle size={14} /> AI Risk Score
                </span>
                <span style={{ fontWeight: 600, color: corridor.riskScore >= 75 ? 'var(--color-danger)' : 'inherit' }}>
                  {corridor.riskScore}/100
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldAlert size={14} /> Disruption Prob.
                </span>
                <span style={{ fontWeight: 600 }}>{corridor.disruptionProbability}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <History size={14} /> Past Incidents
                </span>
                <span style={{ fontWeight: 600 }}>{corridor.historicalIncidents}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CloudRain size={14} /> Weather Impact
                </span>
                <span style={{ fontWeight: 600 }}>{corridor.weatherImpact}</span>
              </div>
            </div>
          </Card>

          <Card style={{ height: '500px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Corridor Topology</h3>
            </div>
            <div style={{ flex: 1 }}>
              <Map center={corridor.coordinates[0] || [26.1158, 91.7086]} zoom={8}>
                <MapControls />
                <RouteLayer 
                  positions={corridor.coordinates} 
                  color={corridor.currentAccessibility === 'BLOCKED' ? 'var(--color-danger)' : corridor.currentAccessibility === 'PARTIAL' ? 'var(--color-warning)' : 'var(--color-success)'} 
                />
              </Map>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          
          <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
              <AlertTriangle size={18} /> Recommended Action
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
              {corridor.recommendedAction}
            </p>
          </Card>

          <Card>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={18} color="var(--color-primary)" /> 
              Affected Operations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.875rem' }}>Active Shipments</span>
                <Badge variant="primary">{corridor.affectedShipments}</Badge>
              </div>
            </div>
            <Button variant="outline" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/logistics/shipments')}>
              View Shipment Details
            </Button>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default CorridorDetails;
