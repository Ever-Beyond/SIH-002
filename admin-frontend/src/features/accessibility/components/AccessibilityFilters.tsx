import { Card, Select } from '../../../components';
import type { AccessibilityFiltersState } from '../types';

interface AccessibilityFiltersProps {
  filters: AccessibilityFiltersState;
  onFilterChange: <K extends keyof AccessibilityFiltersState>(key: K, value: AccessibilityFiltersState[K]) => void;
}

export const AccessibilityFilters = ({ filters, onFilterChange }: AccessibilityFiltersProps) => {
  return (
    <Card style={{ 
      position: 'absolute', 
      top: '1rem', 
      left: '1rem', 
      zIndex: 1000, 
      width: '300px', 
      padding: '1rem',
      backgroundColor: 'rgba(15, 23, 42, 0.95)', // dark slightly transparent
      backdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-lg)',
      color: 'white'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: 'white' }}>Map Filters</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Select
          label="Road Status"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value as AccessibilityFiltersState['status'])}
          options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'OPEN', label: 'Open' },
            { value: 'PARTIAL', label: 'Partially Open' },
            { value: 'BLOCKED', label: 'Blocked' }
          ]}
        />

        <Select
          label="Risk Level"
          value={filters.risk}
          onChange={(e) => onFilterChange('risk', e.target.value as AccessibilityFiltersState['risk'])}
          options={[
            { value: 'ALL', label: 'All Risk Levels' },
            { value: 'LOW', label: 'Low Risk' },
            { value: 'MEDIUM', label: 'Medium Risk' },
            { value: 'HIGH', label: 'High Risk' },
            { value: 'CRITICAL', label: 'Critical Risk' }
          ]}
        />

        <Select
          label="Incident Type"
          value={filters.incidentType}
          onChange={(e) => onFilterChange('incidentType', e.target.value as AccessibilityFiltersState['incidentType'])}
          options={[
            { value: 'ALL', label: 'All Incidents' },
            { value: 'LANDSLIDE', label: 'Landslides' },
            { value: 'FLOOD', label: 'Floods' },
            { value: 'ACCIDENT', label: 'Accidents' },
            { value: 'CONSTRUCTION', label: 'Construction' }
          ]}
        />
      </div>
    </Card>
  );
};
