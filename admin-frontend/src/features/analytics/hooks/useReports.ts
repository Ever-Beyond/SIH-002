import { useState, useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analyticsService';
import type { GeneratedReport, ReportFilterState } from '../types';
import { useToast } from '../../../components';

export const useReports = () => {
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchReports = useCallback(async () => {
    try {
      const data = await analyticsService.getReports();
      setReports(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, [fetchReports]);

  const generateReport = async (filters: ReportFilterState) => {
    setIsGenerating(true);
    try {
      const newReport = await analyticsService.generateReport(filters);
      setReports(prev => [newReport, ...prev]);
      addToast({ title: 'Success', message: 'Report generated successfully.', type: 'success' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', message: 'Failed to generate report.', type: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportReport = (id: string) => {
    // Simulate export
    addToast({ title: 'Export Started', message: `Report ${id} is downloading as PDF.`, type: 'info' });
  };

  return {
    reports,
    isLoading,
    isGenerating,
    error,
    generateReport,
    exportReport
  };
};
