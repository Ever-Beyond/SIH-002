import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Spinner, ErrorState, Table, useToast } from '../../components';
import { TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/Table/Table';
import { ArrowLeft, RefreshCw, CloudRain, AlertTriangle, Route } from 'lucide-react';
import { useRoadDetails } from '../../features/accessibility/hooks/useRoadDetails';

const RoadDetails = () => {
  const { roadId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { data: road, isLoading, error } = useRoadDetails(roadId);

  if (isLoading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !road) {
    return (
      <div className="page-container">
        <Button variant="ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back
        </Button>
        <ErrorState title="Road Not Found" message={error || "We couldn't locate the details for this road."} />
      </div>
    );
  }

  const handleCalculateAlternative = () => {
    toast.addToast({
      title: 'Calculating Routes...',
      message: 'AI optimization engine is processing fallback routes. (Mock)',
      type: 'info'
    });
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: "1.5rem" }}>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Map
        </Button>
        
        <Button onClick={handleCalculateAlternative} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={16} /> Calculate Alternative
        </Button>
      </div>

      <div className="grid">
        {/* Main Info */}
        <Card style={{ gridColumn: '1 / -1' }}>
          <div className="page-header">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{road.name}</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>ID: {road.id} | District: {road.district} | Type: {road.type}</p>
            </div>
            <Badge 
              variant={road.status === 'OPEN' ? 'success' : road.status === 'PARTIAL' ? 'warning' : 'danger'}
            >
              {road.status}
            </Badge>
          </div>
        </Card>

        {/* Risk & Weather */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertTriangle size={20} color="var(--color-warning)" />
            <h3 style={{ margin: 0 }}>Risk & Environment</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 0.25rem 0' }}>Current Risk Level</p>
              <Badge variant={road.riskLevel === 'LOW' ? 'success' : road.riskLevel === 'MEDIUM' ? 'warning' : 'danger'}>
                {road.riskLevel} RISK
              </Badge>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: '0 0 0.25rem 0' }}>Weather Impact</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-base)' }}>
                <CloudRain size={16} />
                <span>{road.weatherImpact}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Incidents */}
        <Card>
          <h3 style={{ marginBottom: '1rem' }}>Recent Incidents</h3>
          {road.recentIncidents.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No active incidents on this route.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {road.recentIncidents.map(inc => (
                <div key={inc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.875rem' }}>{inc.type}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(inc.date).toLocaleString()}</span>
                  </div>
                  <Badge variant="danger">{inc.severity}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Affected Operations */}
        <Card style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1rem' }}>Operational Impact</h3>
          <div className="grid">
            <div>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Affected Vehicles</h4>
              {road.affectedVehicles.length === 0 ? (
                <p style={{ fontSize: '0.875rem' }}>None</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {road.affectedVehicles.map(vId => (
                    <Badge key={vId} variant="secondary">{vId}</Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Affected Shipments</h4>
              {road.affectedShipments.length === 0 ? (
                <p style={{ fontSize: '0.875rem' }}>None</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {road.affectedShipments.map(sId => (
                    <Badge key={sId} variant="primary">{sId}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Alternative Routes */}
        <Card style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Route size={20} color="var(--color-primary)" />
            <h3 style={{ margin: 0 }}>Alternative Routes</h3>
          </div>
          
          {road.alternativeRoutes.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No viable alternative routes identified.</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Route ID</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {road.alternativeRoutes.map(route => (
                  <TableRow key={route.id}>
                    <TableCell>{route.id}</TableCell>
                    <TableCell>{route.name}</TableCell>
                    <TableCell>
                      <Badge variant={route.status === 'OPEN' ? 'success' : route.status === 'PARTIAL' ? 'warning' : 'danger'}>
                        {route.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RoadDetails;
