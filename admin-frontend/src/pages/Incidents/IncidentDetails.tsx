import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, MapPin, User, Clock, Truck, Navigation, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { ErrorState, Card, Badge, Button, CardSkeleton } from '../../components';
import { useIncidentDetails } from '../../features/incidents/hooks/useIncidentDetails';
import { useIncidentActions } from '../../features/incidents/hooks/useIncidentActions';
import type { IncidentSeverity, IncidentStatus } from '../../features/incidents/types';

const IncidentDetails = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();
  const { data: incident, isLoading, error } = useIncidentDetails(incidentId);
  const { blockRoad, dispatchTeam, calculateAlternativeRoute, isActionLoading } = useIncidentActions();

  const getStatusVariant = (status: IncidentStatus) => {
    switch (status) {
      case 'OPEN': return 'danger';
      case 'IN_PROGRESS': return 'warning';
      case 'RESOLVED': return 'success';
      default: return 'primary';
    }
  };

  const getSeverityVariant = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'primary';
      case 'LOW': return 'secondary';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
        <div style={{ padding: '1rem 0' }}>
          <Button variant="outline" disabled style={{ marginBottom: '1rem' }}>
            <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Incidents
          </Button>
          <div style={{ width: '250px', height: '36px', backgroundColor: 'var(--color-bg-hover)', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ width: '150px', height: '24px', backgroundColor: 'var(--color-bg-hover)', borderRadius: '4px' }} />
        </div>
        <div className="grid-layout-2-1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div style={{ padding: '2rem' }}>
        <Button variant="outline" onClick={() => navigate('/incidents')} style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Incidents
        </Button>
        <ErrorState title="Not Found" message={error || 'Incident details not found.'} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* Header */}
      <div>
        <Button variant="outline" onClick={() => navigate('/incidents')} style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Incidents
        </Button>
        <div className="page-header">
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-text-base)', margin: '0 0 0.5rem 0' }}>
              Incident {incident.id}
            </h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Badge variant={getStatusVariant(incident.status)}>{incident.status.replace('_', ' ')}</Badge>
              <Badge variant={getSeverityVariant(incident.severity)}>{incident.severity}</Badge>
              <Badge variant="secondary">{incident.type.replace('_', ' ')}</Badge>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> {new Date(incident.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="danger" disabled={isActionLoading} onClick={() => blockRoad(incident.id)}>
              <ShieldAlert size={16} style={{ marginRight: '8px' }} /> Block Road
            </Button>
            <Button variant="secondary" disabled={isActionLoading} onClick={() => dispatchTeam(incident.id)}>
              <User size={16} style={{ marginRight: '8px' }} /> Dispatch Team
            </Button>
            <Button variant="primary" disabled={isActionLoading} onClick={() => calculateAlternativeRoute(incident.id)}>
              <Navigation size={16} style={{ marginRight: '8px' }} /> Calc Alternative
            </Button>
          </div>
        </div>
      </div>

      <div className="grid-layout-2-1">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Details Card */}
          <Card>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Incident Details</h2>
            <div className="grid-layout-1-1" style={{ marginBottom: '1.5rem' }}>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  <MapPin size={16} /> District
                </span>
                <div style={{ fontWeight: 500 }}>{incident.district}</div>
              </div>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  <Navigation size={16} /> Location
                </span>
                <div style={{ fontWeight: 500 }}>{incident.location}</div>
              </div>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  <User size={16} /> Reporter
                </span>
                <div style={{ fontWeight: 500 }}>{incident.reporter}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{incident.description}</p>
            </div>
            
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-danger)' }}>Risk Impact</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{incident.riskImpact}</p>
            </div>
          </Card>

          {/* Photos */}
          <Card>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={20} /> Photos
            </h2>
            {incident.photos.length > 0 ? (
              <div className="grid-auto-fit">
                {incident.photos.map((url, idx) => (
                  <img 
                    key={idx} 
                    src={url} 
                    alt={`Incident photo ${idx + 1}`} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} 
                  />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>No photos uploaded for this incident.</p>
            )}
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} /> Affected Roads
            </h2>
            {incident.affectedRoads.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--color-text-muted)' }}>
                {incident.affectedRoads.map(road => (
                  <li key={road} style={{ marginBottom: '0.5rem' }}>{road}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>No major roads currently affected.</p>
            )}
          </Card>

          <Card>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={18} /> Affected Vehicles
            </h2>
            {incident.affectedVehicles.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {incident.affectedVehicles.map(v => (
                  <Badge key={v} variant="secondary" onClick={() => navigate(`/fleet/vehicles/${v}`)} style={{ cursor: 'pointer' }}>
                    {v}
                  </Badge>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>No active vehicles in the vicinity.</p>
            )}
          </Card>

          <Card>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} /> Affected Shipments
            </h2>
            {incident.affectedShipments.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {incident.affectedShipments.map(s => (
                  <Badge key={s} variant="secondary" onClick={() => navigate(`/logistics/shipments/${s}`)} style={{ cursor: 'pointer' }}>
                    {s}
                  </Badge>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>No shipments directly affected.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
