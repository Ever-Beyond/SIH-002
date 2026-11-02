import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Spinner, ErrorState } from '../../components';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/Table/Table';
import { Map, MapControls, RouteLayer, IncidentMarker } from '../../components/Map';
import { ArrowLeft, Clock, MapPin, AlertTriangle, CloudRain, ShieldAlert } from 'lucide-react';
import { useRouteDetails } from '../../features/accessibility/hooks/useRouteDetails';

const RouteAnalysis = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const { data: route, isLoading, error } = useRouteDetails(routeId);

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !route) {
    return (
      <div className="page-container">
        <Button variant="ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back
        </Button>
        <ErrorState title="Route Not Found" message={error || "We couldn't locate the details for this route."} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 64px)' }}>
      <div className="page-header">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Accessibility
        </Button>
        <Badge variant={route.status === 'OPEN' ? 'success' : route.status === 'PARTIAL' ? 'warning' : 'danger'}>
          {route.status}
        </Badge>
      </div>

      <div className="grid-layout-1-1" style={{ flex: 1, minHeight: 0 }}>
        {/* Main Area: Map & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <Card style={{ padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{route.name}</h1>
            <p style={{ color: 'var(--color-text-muted)', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{route.origin}</span>
              <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
              <span>{route.destination}</span>
            </p>

            <div className="grid-auto-fit" style={{ gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} /> Distance
                </span>
                <span style={{ fontWeight: 600 }}>{route.distanceKm} km</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} /> Est. Time
                </span>
                <span style={{ fontWeight: 600 }}>{Math.floor(route.estimatedTimeMinutes / 60)}h {route.estimatedTimeMinutes % 60}m</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertTriangle size={14} /> Risk Level
                </span>
                <Badge variant={route.currentRisk === 'LOW' ? 'success' : route.currentRisk === 'MEDIUM' ? 'warning' : 'danger'} style={{ width: 'fit-content' }}>
                  {route.currentRisk}
                </Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CloudRain size={14} /> Weather
                </span>
                <span style={{ fontWeight: 600 }}>{route.weatherImpact}</span>
              </div>
            </div>
          </Card>

          <Card style={{ height: '400px', padding: 0, overflow: 'hidden' }}>
            <Map center={route.coordinates[0] || [26.1158, 91.7086]} zoom={8}>
              <MapControls />
              <RouteLayer 
                positions={route.coordinates} 
                color={route.status === 'BLOCKED' ? 'var(--color-danger)' : route.status === 'PARTIAL' ? 'var(--color-warning)' : 'var(--color-success)'} 
              />
              {route.incidents.map(inc => (
                <IncidentMarker 
                  key={inc.id}
                  position={inc.coordinates}
                  severity={inc.severity}
                  popupContent={<div><strong>{inc.type}</strong></div>}
                />
              ))}
            </Map>
          </Card>

          <Card>
            <h3 style={{ marginBottom: '1rem' }}>Road Segments</h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Segment ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {route.segments.map(seg => (
                  <TableRow key={seg.id}>
                    <TableCell>{seg.id}</TableCell>
                    <TableCell>{seg.name}</TableCell>
                    <TableCell>
                      <Badge variant={seg.status === 'OPEN' ? 'success' : seg.status === 'PARTIAL' ? 'warning' : 'danger'}>
                        {seg.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/accessibility/roads/${seg.id}`)}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <Card>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} color="var(--color-danger)" /> 
              Active Incidents
            </h3>
            {route.incidents.length === 0 ? (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>No active incidents on this route.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {route.incidents.map(inc => (
                  <div key={inc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.875rem' }}>{inc.type}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {inc.id}</span>
                    </div>
                    <Badge variant="danger">{inc.severity}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <h3 style={{ marginBottom: '1rem' }}>Alternative Routes</h3>
            {route.alternativeRoutes.length === 0 ? (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>No alternatives found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {route.alternativeRoutes.map(alt => (
                  <div key={alt.id} style={{ padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.875rem' }}>{alt.name}</strong>
                      <Badge variant={alt.status === 'OPEN' ? 'success' : alt.status === 'PARTIAL' ? 'warning' : 'danger'}>
                        {alt.status}
                      </Badge>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <span>{alt.distanceKm} km</span>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/accessibility/routes/${alt.id}`)}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouteAnalysis;
