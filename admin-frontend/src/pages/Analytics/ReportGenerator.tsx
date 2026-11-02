import { useState } from 'react';
import { useReports } from '../../features/analytics/hooks/useReports';
import { 
  ReportFilterForm, 
  ReportHistoryTable, 
  ReportViewerModal 
} from '../../features/analytics/components';
import { ErrorState, TableSkeleton } from '../../components';
import type { GeneratedReport } from '../../features/analytics/types';

const ReportGenerator = () => {
  const {
    reports,
    isLoading,
    isGenerating,
    error,
    generateReport,
    exportReport
  } = useReports();

  const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null);

  const handleView = (report: GeneratedReport) => {
    setSelectedReport(report);
  };

  const handleCloseViewer = () => {
    setSelectedReport(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: 0 }}>
          Custom Report Generator
        </h1>
      </div>

      <div className="grid-layout-2-1" style={{ alignItems: 'start' }}>
        <div>
          <ReportFilterForm onGenerate={generateReport} isGenerating={isGenerating} />
        </div>
        
        <div>
          {error && <ErrorState title="Error Loading History" message={error} style={{ marginBottom: '1.5rem' }} />}
          
          {isLoading ? (
            <div style={{ padding: '2rem' }}>
              <TableSkeleton rows={6} columns={5} />
            </div>
          ) : (
            <ReportHistoryTable 
              reports={reports} 
              onView={handleView} 
              onExport={exportReport} 
            />
          )}
        </div>
      </div>

      <ReportViewerModal 
        isOpen={!!selectedReport}
        onClose={handleCloseViewer}
        report={selectedReport}
        onExport={exportReport}
      />
    </div>
  );
};

export default ReportGenerator;
