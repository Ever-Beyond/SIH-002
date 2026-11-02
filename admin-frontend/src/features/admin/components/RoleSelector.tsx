import React from 'react';
import { Card } from '../../../components';
import { Shield, ShieldAlert, User, Navigation, Eye, CheckCircle } from 'lucide-react';
import type { SystemRole } from '../types';

interface RoleSelectorProps {
  roles: SystemRole[];
  selectedRole: SystemRole;
  onSelect: (role: SystemRole) => void;
}

const getRoleIcon = (role: SystemRole) => {
  switch (role) {
    case 'SUPER_ADMIN': return <ShieldAlert size={18} />;
    case 'ADMIN': return <Shield size={18} />;
    case 'OFFICER': return <User size={18} />;
    case 'FIELD_OFFICER': return <CheckCircle size={18} />;
    case 'DRIVER': return <Navigation size={18} />;
    case 'VIEWER': return <Eye size={18} />;
    default: return <User size={18} />;
  }
};

const getRoleLabel = (role: SystemRole) => {
  return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, selectedRole, onSelect }) => {
  return (
    <Card style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>System Roles</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}>
        {roles.map(role => (
          <button
            key={role}
            onClick={() => onSelect(role)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              border: 'none',
              background: selectedRole === role ? 'var(--color-primary-subtle)' : 'transparent',
              color: selectedRole === role ? 'var(--color-primary)' : 'var(--color-text-base)',
              fontWeight: selectedRole === role ? 600 : 400,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            {getRoleIcon(role)}
            <span>{getRoleLabel(role)}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};
