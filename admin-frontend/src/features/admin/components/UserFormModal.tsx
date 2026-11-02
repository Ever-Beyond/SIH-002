/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '../../../components';
import type { User, CreateUserDTO, UpdateUserDTO, SystemRole } from '../types';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User; // If provided, we are in Edit mode
  onSubmit: (data: CreateUserDTO | UpdateUserDTO) => Promise<void>;
  isMutating: boolean;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, user, onSubmit, isMutating }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SystemRole>('VIEWER');
  
  useEffect(() => {
    if (user && isOpen) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    } else if (!user && isOpen) {
      setName('');
      setEmail('');
      setRole('VIEWER');
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      if (user) {
        const updateData: UpdateUserDTO = { name, email, role };
        await onSubmit(updateData);
      } else {
        const createData: CreateUserDTO = { name, email, role, status: 'ACTIVE' };
        await onSubmit(createData);
      }
      onClose();
    } catch {
      // Error is handled by hook toasts
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Create New User'}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Input 
          label="Full Name" 
          placeholder="e.g. John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={isMutating}
        />
        
        <Input 
          label="Email Address" 
          type="email"
          placeholder="john.doe@ner-shield.gov.in"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={isMutating}
        />
        
        <Select
          label="System Role"
          value={role}
          onChange={e => setRole(e.target.value as SystemRole)}
          disabled={isMutating}
          options={[
            { label: 'Super Admin', value: 'SUPER_ADMIN' },
            { label: 'Admin', value: 'ADMIN' },
            { label: 'Officer', value: 'OFFICER' },
            { label: 'Field Officer', value: 'FIELD_OFFICER' },
            { label: 'Driver', value: 'DRIVER' },
            { label: 'Viewer', value: 'VIEWER' }
          ]}
        />
        
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button type="button" variant="outline" onClick={onClose} disabled={isMutating}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isMutating || !name || !email}>
            {isMutating ? 'Saving...' : (user ? 'Save Changes' : 'Create User')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
