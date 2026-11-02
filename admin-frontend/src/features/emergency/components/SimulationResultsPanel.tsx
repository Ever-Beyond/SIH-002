import React from 'react';
import { Card, Badge, Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../../components';
import { ShieldAlert, Truck, Package, Clock, Navigation } from 'lucide-react';
import type { SimulationResult } from '../types';
import { AIRecommendationPanel } from './AIRecommendationPanel';

interface SimulationResultsPanelProps {
  result: SimulationResult;
}

export const SimulationResultsPanel: React.FC<SimulationResultsPanelProps> = ({ result }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Level Impact Summary */}
      <div className="grid-auto-fit">
        <Card style={{ borderLeft: '4px solid var(--color-danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <ShieldAlert size={20} color="var(--color-danger)" />
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)' }}>Affected Roads</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{result.affectedRoads.length}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {result.affectedRoads.join(', ')}
          </div>
        </Card>
        
        <Card style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Truck size={20} color="var(--color-warning)" />
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)' }}>Affected Vehicles</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{result.affectedVehicles.length}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {result.affectedVehicles.slice(0, 3).join(', ')}{result.affectedVehicles.length > 3 ? '...' : ''}
          </div>
        </Card>
        
        <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Package size={20} color="var(--color-primary)" />
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)' }}>Critical Shipments</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{result.affectedShipments.length}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            High priority tracking required
          </div>
        </Card>
      </div>

      <div className="grid-layout-1-1">
        {/* Route Alternatives */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Navigation size={18} /> Route Alternatives
            </h3>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Blocked Route</TableHeader>
                <TableHeader>Alternative</TableHeader>
                <TableHeader align="right">Added Delay</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.routeAlternatives.map((alt, idx) => (
                <TableRow key={idx}>
                  <TableCell><Badge variant="danger">{alt.original}</Badge></TableCell>
                  <TableCell><Badge variant="success">{alt.alternative}</Badge></TableCell>
                  <TableCell align="right">
                    <span style={{ color: 'var(--color-warning-dark)', fontWeight: 500 }}>+{alt.addedDelayMinutes} mins</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Regional Delays */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-subtle)' }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} /> Estimated Regional Delays
            </h3>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Region</TableHeader>
                <TableHeader align="right">Estimated Delay</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.estimatedDelays.map((delay, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ fontWeight: 500 }}>{delay.region}</TableCell>
                  <TableCell align="right">
                    {delay.delayHours > 0 ? (
                      <Badge variant="danger">{delay.delayHours} Hours</Badge>
                    ) : (
                      <Badge variant="success">None</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* AI Recommendations from Simulation */}
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Simulated Action Plan</h3>
        <AIRecommendationPanel 
          recommendations={result.aiRecommendations}
          onApprove={() => alert('Simulated Approval recorded.')}
          onReject={() => alert('Simulated Rejection recorded.')}
          isActionLoading={null}
        />
      </div>

    </div>
  );
};
