import React, { useState } from 'react';
import { Card, Input, Select, Button } from '../../../components';
import { Filter, Download } from 'lucide-react';
import type { ReportFilterState } from '../types';

interface ReportFilterFormProps {
  onGenerate: (filters: ReportFilterState) => void;
  isGenerating: boolean;
}

export const ReportFilterForm: React.FC<ReportFilterFormProps> = ({ onGenerate, isGenerating }) => {
  const [filters, setFilters] = useState<ReportFilterState>({
    startDate: '',
    endDate: '',
    district: '',
    commodity: '',
    vehicleId: '',
    incidentType: '',
    routeId: ''
  });

  const handleChange = (field: keyof ReportFilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(filters);
  };

  return (
    <Card style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Filter size={20} /> Report Parameters
      </h2>
      
      <form onSubmit={handleSubmit} className="grid-auto-fit" style={{ gap: '1rem' }}>
        <Input 
          label="Start Date" 
          type="date" 
          value={filters.startDate} 
          onChange={(e) => handleChange('startDate', e.target.value)} 
          disabled={isGenerating}
        />
        <Input 
          label="End Date" 
          type="date" 
          value={filters.endDate} 
          onChange={(e) => handleChange('endDate', e.target.value)} 
          disabled={isGenerating}
        />
        <Select 
          label="District" 
          value={filters.district} 
          onChange={(e) => handleChange('district', e.target.value)}
          disabled={isGenerating}
          options={[
            { label: 'All Districts', value: '' },
            { label: 'Kamrup', value: 'Kamrup' },
            { label: 'Dibrugarh', value: 'Dibrugarh' },
            { label: 'Nagaon', value: 'Nagaon' }
          ]}
        />
        <Select 
          label="Commodity" 
          value={filters.commodity} 
          onChange={(e) => handleChange('commodity', e.target.value)}
          disabled={isGenerating}
          options={[
            { label: 'All Commodities', value: '' },
            { label: 'Medical Supplies', value: 'Medical' },
            { label: 'Food Rations', value: 'Food' },
            { label: 'Fuel', value: 'Fuel' }
          ]}
        />
        <Input 
          label="Vehicle ID" 
          value={filters.vehicleId} 
          onChange={(e) => handleChange('vehicleId', e.target.value)} 
          placeholder="e.g. VH-1023"
          disabled={isGenerating}
        />
        <Input 
          label="Route ID" 
          value={filters.routeId} 
          onChange={(e) => handleChange('routeId', e.target.value)} 
          placeholder="e.g. NH-37"
          disabled={isGenerating}
        />
        
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button type="submit" variant="primary" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : (
              <>
                <Download size={16} style={{ marginRight: '8px' }} /> Generate Report
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
