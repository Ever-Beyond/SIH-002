import React from 'react';
import { Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Button, EmptyState } from '../../../components';
import { Eye, Download } from 'lucide-react';
import type { GeneratedReport } from '../types';

interface ReportHistoryTableProps {
  reports: GeneratedReport[];
  onView: (report: GeneratedReport) => void;
  onExport: (id: string) => void;
}

export const ReportHistoryTable: React.FC<ReportHistoryTableProps> = ({ reports, onView, onExport }) => {
  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Generated Reports History</h2>
      </div>
      
      {reports.length === 0 ? (
        <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
          <EmptyState title="No Reports Found" description="No reports have been generated yet." />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Report ID</TableHeader>
              <TableHeader>Generated On</TableHeader>
              <TableHeader>Parameters</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell style={{ fontWeight: 500 }}>{report.id}</TableCell>
                <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {Object.entries(report.filters).map(([key, value]) => {
                      if (!value) return null;
                      return <Badge key={key} variant="secondary">{key}: {value}</Badge>;
                    })}
                    {Object.values(report.filters).every(v => !v) && <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>All Data</span>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={report.status === 'COMPLETED' ? 'success' : 'danger'}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell align="right">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button variant="outline" size="sm" onClick={() => onView(report)}>
                      <Eye size={14} /> View
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => onExport(report.id)}>
                      <Download size={14} /> Export
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
