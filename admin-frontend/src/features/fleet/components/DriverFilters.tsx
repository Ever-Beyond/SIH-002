import { Input, Select } from '../../../components';
import type { DriverStatus } from '../types';
import styles from './FleetComponents.module.css';

interface DriverFiltersProps {
  searchQuery: string;
  status: DriverStatus | 'ALL';
  onSearchChange: (query: string) => void;
  onStatusChange: (status: DriverStatus | 'ALL') => void;
}

export const DriverFilters = ({ searchQuery, status, onSearchChange, onStatusChange }: DriverFiltersProps) => {
  return (
    <div className={styles.filtersBar}>
      <Input
        placeholder="Search by name, ID or license..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchBox}
      />
      <Select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as DriverStatus | 'ALL')}
        options={[
          { value: 'ALL', label: 'All Statuses' },
          { value: 'AVAILABLE', label: 'Available' },
          { value: 'ON_DUTY', label: 'On Duty' },
          { value: 'OFF_DUTY', label: 'Off Duty' },
          { value: 'SUSPENDED', label: 'Suspended' },
        ]}
      />
    </div>
  );
};
