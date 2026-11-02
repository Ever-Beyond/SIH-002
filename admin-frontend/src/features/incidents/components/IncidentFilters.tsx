import React from 'react';
import { Input, Select } from '../../../components';
import type { IncidentFiltersState } from '../types';

interface IncidentFiltersProps {
  filters: IncidentFiltersState;
  onFilterChange: (key: keyof IncidentFiltersState, value: string) => void;
}

export const IncidentFilters: React.FC<IncidentFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ flex: '1 1 200px' }}>
        <Input
          placeholder="Search by ID, Road, or District..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
        />
      </div>
      
      <div style={{ width: '150px' }}>
        <Select 
          value={filters.severity} 
          onChange={(e) => onFilterChange('severity', e.target.value)}
          options={[
            { label: 'All Severities', value: 'ALL' },
            { label: 'Critical', value: 'CRITICAL' },
            { label: 'High', value: 'HIGH' },
            { label: 'Medium', value: 'MEDIUM' },
            { label: 'Low', value: 'LOW' }
          ]}
        />
      </div>

      <div style={{ width: '150px' }}>
        <Select 
          value={filters.type} 
          onChange={(e) => onFilterChange('type', e.target.value)}
          options={[
            { label: 'All Types', value: 'ALL' },
            { label: 'Roadblock', value: 'ROADBLOCK' },
            { label: 'Weather', value: 'WEATHER' },
            { label: 'Accident', value: 'ACCIDENT' },
            { label: 'Infrastructure', value: 'INFRASTRUCTURE' }
          ]}
        />
      </div>

      <div style={{ width: '150px' }}>
        <Select 
          value={filters.status} 
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={[
            { label: 'All Statuses', value: 'ALL' },
            { label: 'Open', value: 'OPEN' },
            { label: 'In Progress', value: 'IN_PROGRESS' },
            { label: 'Resolved', value: 'RESOLVED' }
          ]}
        />
      </div>

      <div style={{ width: '150px' }}>
        <Select 
          value={filters.date} 
          onChange={(e) => onFilterChange('date', e.target.value)}
          options={[
            { label: 'Any Time', value: 'ALL' },
            { label: 'Last 24 Hours', value: 'LAST_24_HOURS' },
            { label: 'Last 7 Days', value: 'LAST_7_DAYS' },
            { label: 'Last 30 Days', value: 'LAST_30_DAYS' }
          ]}
        />
      </div>
    </div>
  );
};
