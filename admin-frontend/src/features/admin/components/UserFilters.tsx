import React from 'react';
import { Card, Input, Select } from '../../../components';
import type { SystemRole, UserStatus } from '../types';

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  roleFilter: SystemRole | '';
  onRoleChange: (val: SystemRole | '') => void;
  statusFilter: UserStatus | '';
  onStatusChange: (val: UserStatus | '') => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange
}) => {
  return (
    <Card style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <Input 
          placeholder="Search by name or email..." 
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      <div style={{ flex: '1 1 150px' }}>
        <Select 
          value={roleFilter}
          onChange={e => onRoleChange(e.target.value as SystemRole | '')}
          options={[
            { label: 'All Roles', value: '' },
            { label: 'Super Admin', value: 'SUPER_ADMIN' },
            { label: 'Admin', value: 'ADMIN' },
            { label: 'Officer', value: 'OFFICER' },
            { label: 'Field Officer', value: 'FIELD_OFFICER' },
            { label: 'Driver', value: 'DRIVER' },
            { label: 'Viewer', value: 'VIEWER' }
          ]}
        />
      </div>
      <div style={{ flex: '1 1 150px' }}>
        <Select 
          value={statusFilter}
          onChange={e => onStatusChange(e.target.value as UserStatus | '')}
          options={[
            { label: 'All Statuses', value: '' },
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' }
          ]}
        />
      </div>
    </Card>
  );
};
