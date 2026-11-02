import { useNavigate } from 'react-router-dom';
import { Card, ErrorState, Button, CardSkeleton, TableSkeleton, EmptyState } from '../../components';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/Table/Table';
import { useRiskCorridors } from '../../features/ai/hooks/useRiskCorridors';
import { AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const RiskCorridors = () => {
  const navigate = useNavigate();
  const { data: corridors, isLoading, error } = useRiskCorridors();



  if (error) {
    return (
      <div className="page-container">
        <ErrorState title="Failed to Load Risk Corridors" message={error} />
      </div>
    );
  }

  // Sort by ranking
  const sortedCorridors = [...corridors].sort((a, b) => a.ranking - b.ranking);
  const avgRisk = Math.round(corridors.reduce((acc, c) => acc + c.riskScore, 0) / (corridors.length || 1));

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & KPIs */}
      <div className="page-header">
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={28} color="var(--color-danger)" /> AI Risk Corridors
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Vulnerability ranking for critical supply corridors</p>
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
                <TrendingUp size={20} color="var(--color-primary)" />
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Monitored Corridors</h3>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>{corridors.length}</p>
            </Card>
            
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <AlertTriangle size={20} color="var(--color-danger)" />
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Most Vulnerable</h3>
              </div>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, color: 'var(--color-danger)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {sortedCorridors[0]?.name || 'N/A'}
              </p>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Activity size={20} color="var(--color-warning)" />
                <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Average Risk Score</h3>
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0, color: 'var(--color-warning)' }}>{avgRisk || 0}</p>
            </Card>
          </>
        )}
      </div>

      {/* Main Data Table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Vulnerability Rankings</h2>
        </div>
        
        {isLoading ? (
          <div style={{ padding: '2rem' }}>
            <TableSkeleton rows={5} columns={5} />
          </div>
        ) : corridors.length === 0 ? (
          <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
            <EmptyState title="No Corridors Found" description="There are no monitored risk corridors." />
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Corridor Name</TableHeader>
                  <TableHeader>Risk Score</TableHeader>
                  <TableHeader>Disruption Probability</TableHeader>
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCorridors.map(corridor => (
                  <TableRow key={corridor.id}>
                    <TableCell>
                      <span style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '24px', height: '24px', borderRadius: '12px',
                        backgroundColor: corridor.ranking === 1 ? 'var(--color-danger)' : 
                                         corridor.ranking === 2 ? 'var(--color-warning)' : 'var(--color-bg)',
                        color: corridor.ranking <= 2 ? 'white' : 'var(--color-text-muted)',
                        fontWeight: 600, fontSize: '0.875rem'
                      }}>
                        {corridor.ranking}
                      </span>
                    </TableCell>
                    <TableCell style={{ fontWeight: 500 }}>{corridor.name}</TableCell>
                    <TableCell>
                      <span style={{ 
                        fontWeight: 600, 
                        color: corridor.riskScore >= 75 ? 'var(--color-danger)' : 
                               corridor.riskScore >= 50 ? 'var(--color-warning)' : 'var(--color-success)' 
                      }}>
                        {corridor.riskScore}/100
                      </span>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                          width: '60px', height: '6px', backgroundColor: 'var(--color-bg)', borderRadius: '3px', overflow: 'hidden' 
                        }}>
                          <div style={{ 
                            width: `${corridor.disruptionProbability}%`, height: '100%', 
                            backgroundColor: corridor.disruptionProbability > 60 ? 'var(--color-danger)' : 'var(--color-primary)' 
                          }} />
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>{corridor.disruptionProbability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/ai/risk-corridors/${corridor.id}`)}>
                        Analyze
                      </Button>
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

export default RiskCorridors;
