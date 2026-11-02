import { Card, Badge, ErrorState, EmptyState, TableSkeleton, CardSkeleton } from '../../components';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/Table/Table';
import { usePredictions } from '../../features/ai/hooks/usePredictions';
import { AlertTriangle, BrainCircuit, Activity, Clock, Server } from 'lucide-react';

const AiDashboard = () => {
  const { data: predictions, isLoading, error } = usePredictions();

  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Failed to Load Predictions" message={error} />
      </div>
    );
  }

  // Calculate simple KPIs
  const avgRisk = Math.round(predictions.reduce((acc, p) => acc + p.riskScore, 0) / (predictions.length || 1));
  const highRiskCount = predictions.filter(p => p.riskScore >= 75).length;

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* DEVELOPMENT BANNER */}
      <div style={{
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        border: '1px solid var(--color-warning)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--color-warning)'
      }}>
        <AlertTriangle size={24} />
        <div>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>DEVELOPMENT DATA</h3>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
            These are mock predictions simulating ML outputs for the purpose of UI development. They do not represent actual trained AI inferences.
          </p>
        </div>
      </div>

      {/* Header & KPIs */}
      <div className="page-header">
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BrainCircuit size={28} color="var(--color-primary)" /> AI Risk Predictions
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Proactive threat detection & forecasting</p>
        </div>
      </div>

      <div className="grid">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Activity size={20} color="var(--color-primary)" />
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Active Predictions</h3>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>{predictions.length}</p>
            </Card>
            
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <AlertTriangle size={20} color="var(--color-danger)" />
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>High Risk Scenarios</h3>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0, color: 'var(--color-danger)' }}>{highRiskCount}</p>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Server size={20} color="var(--color-warning)" />
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Average Risk Score</h3>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0, color: 'var(--color-warning)' }}>{avgRisk}</p>
            </Card>
          </>
        )}
      </div>

      {/* Main Data Table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Prediction Feed</h2>
        </div>
        
        {isLoading ? (
          <div style={{ padding: '2rem' }}>
            <TableSkeleton rows={5} columns={7} />
          </div>
        ) : predictions.length === 0 ? (
          <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
            <EmptyState title="No Predictions Available" description="There are currently no AI risk predictions." />
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Route</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Risk Score</TableHeader>
                  <TableHeader>Probability</TableHeader>
                  <TableHeader>Time Window</TableHeader>
                  <TableHeader>Reason</TableHeader>
                  <TableHeader>Model Version</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictions.map(pred => (
                  <TableRow key={pred.id}>
                    <TableCell style={{ fontWeight: 500 }}>{pred.affectedRoute}</TableCell>
                    <TableCell>
                      <Badge variant={
                        pred.riskCategory === 'WEATHER' ? 'primary' :
                        pred.riskCategory === 'TRAFFIC' ? 'warning' :
                        pred.riskCategory === 'INFRASTRUCTURE' ? 'danger' : 'secondary'
                      }>
                        {pred.riskCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ 
                          fontWeight: 600, 
                          color: pred.riskScore >= 75 ? 'var(--color-danger)' : 
                                pred.riskScore >= 50 ? 'var(--color-warning)' : 'var(--color-success)' 
                        }}>
                          {pred.riskScore}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                          width: '40px', height: '6px', backgroundColor: 'var(--color-bg)', borderRadius: '3px', overflow: 'hidden' 
                        }}>
                          <div style={{ 
                            width: `${pred.confidence}%`, height: '100%', 
                            backgroundColor: pred.confidence > 80 ? 'var(--color-success)' : 'var(--color-primary)' 
                          }} />
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>{pred.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        <Clock size={14} /> {pred.predictionTimeWindow}
                      </span>
                    </TableCell>
                    <TableCell style={{ maxWidth: '250px' }}>
                      <p style={{ margin: 0, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={pred.reason}>
                        {pred.reason}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        {pred.modelVersion}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AiDashboard;
