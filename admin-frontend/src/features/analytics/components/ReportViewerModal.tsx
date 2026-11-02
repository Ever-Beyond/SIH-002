import React from 'react';
import { Modal, Button } from '../../../components';
import { Download } from 'lucide-react';
import type { GeneratedReport } from '../types';

interface ReportViewerModalProps {
  report: GeneratedReport | null;
  isOpen: boolean;
  onClose: () => void;
  onExport: (id: string) => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({ report, isOpen, onClose, onExport }) => {
  if (!report) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Report Viewer - ${report.id}`}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={() => onExport(report.id)}>
            <Download size={16} style={{ marginRight: '8px' }} /> Export as PDF
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-muted)' }}>Report Summary</h4>
          <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 500 }}>{report.summary}</p>
        </div>

        <div>
          <h4 style={{ margin: '1rem 0 0.5rem 0', color: 'var(--color-text-muted)' }}>Applied Filters</h4>
          <pre style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', margin: 0, overflowX: 'auto' }}>
            {JSON.stringify(report.filters, null, 2)}
          </pre>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <p>Detailed chart rendering for PDF export is simulated.</p>
          <p>In a production environment, full tabular data and visualization widgets would render here.</p>
        </div>
      </div>
    </Modal>
  );
};
