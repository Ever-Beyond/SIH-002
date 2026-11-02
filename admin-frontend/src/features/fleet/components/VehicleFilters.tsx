import { Input, Select } from '../../../components';
import type { FleetFilters, VehicleStatus, RiskLevel } from '../types';
import styles from './FleetComponents.module.css';

interface VehicleFiltersProps {
  filters: FleetFilters;
  onChange: (filters: FleetFilters) => void;
}

export const VehicleFilters = ({ filters, onChange }: VehicleFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, searchQuery: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, status: e.target.value as VehicleStatus | 'ALL' });
  };

  const handleRiskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, riskLevel: e.target.value as RiskLevel | 'ALL' });
  };

  return (
    <div className={styles.filtersBar}>
      <Input
        placeholder="Search plate, ID, or driver..."
        value={filters.searchQuery || ''}
        onChange={handleSearchChange}
        className={styles.searchBox}
      />
      <Select
        value={filters.status || 'ALL'}
        onChange={handleStatusChange}
        options={[
          { value: 'ALL', label: 'All Statuses' },
          { value: 'ACTIVE', label: 'Active' },
          { value: 'IDLE', label: 'Idle' },
          { value: 'OFFLINE', label: 'Offline' },
          { value: 'MAINTENANCE', label: 'Maintenance' },
        ]}
      />
      <Select
        value={filters.riskLevel || 'ALL'}
        onChange={handleRiskChange}
        options={[
          { value: 'ALL', label: 'All Risks' },
          { value: 'HIGH', label: 'High Risk' },
          { value: 'MEDIUM', label: 'Medium Risk' },
          { value: 'LOW', label: 'Low Risk' },
        ]}
      />
    </div>
  );
};
