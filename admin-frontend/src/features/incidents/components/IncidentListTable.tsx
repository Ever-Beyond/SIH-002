import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Button } from '../../../components';
import type { Incident, IncidentStatus, IncidentSeverity } from '../types';

interface IncidentListTableProps {
  incidents: Incident[];
}

export const IncidentListTable: React.FC<IncidentListTableProps> = ({ incidents }) => {
  const navigate = useNavigate();

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

  if (incidents.length === 0) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        No incidents found matching your filters.
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Incident ID</TableHeader>
          <TableHeader>Timestamp</TableHeader>
          <TableHeader>District</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Severity</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Affected Roads</TableHeader>
          <TableHeader>Vehicles</TableHeader>
          <TableHeader align="right">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {incidents.map(incident => (
          <TableRow key={incident.id}>
            <TableCell style={{ fontWeight: 500 }}>{incident.id}</TableCell>
            <TableCell>{new Date(incident.timestamp).toLocaleString()}</TableCell>
            <TableCell>{incident.district}</TableCell>
            <TableCell>{incident.type.replace('_', ' ')}</TableCell>
            <TableCell>
              <Badge variant={getSeverityVariant(incident.severity)}>
                {incident.severity}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(incident.status)}>
                {incident.status.replace('_', ' ')}
              </Badge>
            </TableCell>
            <TableCell>
              <div style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {incident.affectedRoads.join(', ')}
              </div>
            </TableCell>
            <TableCell>{incident.affectedVehicles.length}</TableCell>
            <TableCell align="right">
              <Button size="sm" variant="outline" onClick={() => navigate(`/incidents/${incident.id}`)}>
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
