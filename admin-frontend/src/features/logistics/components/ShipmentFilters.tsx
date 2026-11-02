import { Input, Select } from '../../../components';
import type { ShipmentFiltersState } from '../types';
import styles from './LogisticsComponents.module.css';

interface ShipmentFiltersProps {
  filters: ShipmentFiltersState;
  onFilterChange: (key: keyof ShipmentFiltersState, value: string) => void;
}

export const ShipmentFilters = ({ filters, onFilterChange }: ShipmentFiltersProps) => {
  return (
    <div className={styles.filtersBar}>
      <Input
        placeholder="Search shipments, origin, destination, vehicle..."
        value={filters.searchQuery}
        onChange={(e) => onFilterChange('searchQuery', e.target.value)}
        className={styles.searchBox}
      />
      <Select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        options={[
          { value: 'ALL', label: 'All Statuses' },
          { value: 'PENDING', label: 'Pending' },
          { value: 'IN_TRANSIT', label: 'In Transit' },
          { value: 'DELIVERED', label: 'Delivered' },
          { value: 'DELAYED', label: 'Delayed' },
          { value: 'CANCELLED', label: 'Cancelled' },
        ]}
      />
      <Select
        value={filters.priority}
        onChange={(e) => onFilterChange('priority', e.target.value)}
        options={[
          { value: 'ALL', label: 'All Priorities' },
          { value: 'LOW', label: 'Low' },
          { value: 'MEDIUM', label: 'Medium' },
          { value: 'HIGH', label: 'High' },
          { value: 'CRITICAL', label: 'Critical' },
        ]}
      />
      <Select
        value={filters.commodityType}
        onChange={(e) => onFilterChange('commodityType', e.target.value)}
        options={[
          { value: 'ALL', label: 'All Commodities' },
          { value: 'GENERAL', label: 'General' },
          { value: 'HAZARDOUS', label: 'Hazardous' },
          { value: 'PERISHABLE', label: 'Perishable' },
          { value: 'FRAGILE', label: 'Fragile' },
          { value: 'SECURE', label: 'Secure' },
        ]}
      />
    </div>
  );
};
