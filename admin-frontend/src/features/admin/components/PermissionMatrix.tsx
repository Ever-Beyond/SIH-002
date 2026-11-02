import React from 'react';
import { Card, Button } from '../../../components';
import { ShieldCheck, Lock } from 'lucide-react';
import type { SystemPermission, SystemRole } from '../types';

interface PermissionMatrixProps {
  role: SystemRole;
  currentPermissions: SystemPermission[];
  allPermissions: SystemPermission[];
  onToggle: (permission: SystemPermission) => void;
  onSave: () => void;
  onDiscard: () => void;
  hasChanges: boolean;
  isSaving: boolean;
}

const categorizePermission = (perm: SystemPermission) => {
  if (perm.includes('FLEET') || perm.includes('DRIVER') || perm.includes('REROUTE')) return 'Fleet & Logistics';
  if (perm.includes('SHIPMENT')) return 'Logistics';
  if (perm.includes('INCIDENT') || perm.includes('EMERGENCY') || perm.includes('SIMULATION')) return 'Emergency Operations';
  if (perm.includes('AI') || perm.includes('ANALYTICS') || perm.includes('ACCESSIBILITY') || perm.includes('DASHBOARD')) return 'Analytics & AI';
  return 'Administration';
};

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({
  role,
  currentPermissions,
  allPermissions,
  onToggle,
  onSave,
  onDiscard,
  hasChanges,
  isSaving
}) => {
  const isSuperAdmin = role === 'SUPER_ADMIN';

  // Group permissions by category
  const grouped = allPermissions.reduce((acc, perm) => {
    const category = categorizePermission(perm);
    if (!acc[category]) acc[category] = [];
    acc[category].push(perm);
    return acc;
  }, {} as Record<string, SystemPermission[]>);

  return (
    <Card style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} className={isSuperAdmin ? 'text-primary' : ''} />
            {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Permissions
          </h3>
          {isSuperAdmin && (
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--color-warning)' }}>
              SUPER_ADMIN has master access. These permissions cannot be modified.
            </p>
          )}
        </div>
        
        {!isSuperAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {hasChanges && (
              <Button variant="outline" onClick={onDiscard} disabled={isSaving}>
                Discard
              </Button>
            )}
            <Button variant="primary" onClick={onSave} disabled={!hasChanges || isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto' }}>
        {Object.entries(grouped).map(([category, perms]) => (
          <div key={category}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              {category}
            </h4>
            <div className="grid-auto-fit" style={{ gap: '1rem' }}>
              {perms.map(perm => {
                const isChecked = currentPermissions.includes(perm);
                return (
                  <label 
                    key={perm} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem',
                      cursor: isSuperAdmin ? 'not-allowed' : 'pointer',
                      opacity: isSuperAdmin ? 0.7 : 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-subtle)'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => !isSuperAdmin && onToggle(perm)}
                      disabled={isSuperAdmin}
                      style={{ cursor: isSuperAdmin ? 'not-allowed' : 'pointer' }}
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      {perm.replace(/_/g, ' ')}
                    </span>
                    {isSuperAdmin && <Lock size={12} style={{ marginLeft: 'auto', color: 'var(--color-text-muted)' }} />}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
