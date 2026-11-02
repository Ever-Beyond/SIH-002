/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useRoles } from '../../features/admin/hooks/useRoles';
import { 
  RoleSelector,
  PermissionMatrix
} from '../../features/admin/components';
import { ErrorState, TableSkeleton } from '../../components';
import type { SystemRole, SystemPermission } from '../../features/admin/types';
import { allPermissions } from '../../features/admin/mockData';

const ROLES: SystemRole[] = ['SUPER_ADMIN', 'ADMIN', 'OFFICER', 'FIELD_OFFICER', 'DRIVER', 'VIEWER'];

const RoleManagement = () => {
  const {
    roleMap,
    isLoading,
    isMutating,
    error,
    updatePermissions
  } = useRoles();

  const [selectedRole, setSelectedRole] = useState<SystemRole>('ADMIN');
  const [localPermissions, setLocalPermissions] = useState<SystemPermission[]>([]);

  // Sync local permissions when role changes or roleMap loads
  useEffect(() => {
    if (roleMap) {
      setLocalPermissions(roleMap[selectedRole]);
    }
  }, [roleMap, selectedRole]);

  const handleTogglePermission = (permission: SystemPermission) => {
    setLocalPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = async () => {
    await updatePermissions(selectedRole, localPermissions);
  };

  const handleDiscard = () => {
    if (roleMap) {
      setLocalPermissions(roleMap[selectedRole]);
    }
  };

  const hasChanges = roleMap ? JSON.stringify(localPermissions.sort()) !== JSON.stringify([...roleMap[selectedRole]].sort()) : false;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem', height: '100%' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: '0 0 0.5rem 0' }}>
          Role Management
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>
          Configure granular system permissions for standard operational roles.
        </p>
      </div>

      {error && <ErrorState title="Error Loading Roles" message={error} style={{ marginBottom: '1.5rem' }} />}

      {isLoading ? (
        <div style={{ padding: '2rem' }}>
          <TableSkeleton rows={8} columns={3} />
        </div>
      ) : (
        <div className="grid-layout-2-1" style={{ flex: 1, minHeight: 0 }}>
          <RoleSelector 
            roles={ROLES} 
            selectedRole={selectedRole} 
            onSelect={setSelectedRole} 
          />
          
          <PermissionMatrix 
            role={selectedRole}
            currentPermissions={localPermissions}
            allPermissions={allPermissions}
            onToggle={handleTogglePermission}
            onSave={handleSave}
            onDiscard={handleDiscard}
            hasChanges={hasChanges}
            isSaving={isMutating}
          />
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
