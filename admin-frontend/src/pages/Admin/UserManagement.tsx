import { useState } from 'react';
import { useUsers } from '../../features/admin/hooks/useUsers';
import { 
  UserFilters, 
  UserListTable, 
  UserFormModal 
} from '../../features/admin/components';
import { ErrorState, Button } from '../../components';
import { Plus } from 'lucide-react';
import type { User, CreateUserDTO, UpdateUserDTO } from '../../features/admin/types';

const UserManagement = () => {
  const {
    users,
    isLoading,
    isMutating,
    error,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    createUser,
    updateUser,
    toggleStatus
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  const handleCreateNew = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  const handleModalSubmit = async (data: CreateUserDTO | UpdateUserDTO) => {
    if (editingUser) {
      await updateUser(editingUser.id, data as UpdateUserDTO);
    } else {
      await createUser(data as CreateUserDTO);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-base)', margin: '0 0 0.5rem 0' }}>
            User Management
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>
            Manage system administrators, operators, and viewers.
          </p>
        </div>
        <Button variant="primary" onClick={handleCreateNew}>
          <Plus size={18} style={{ marginRight: '6px' }} /> Add User
        </Button>
      </div>

      <UserFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {error && <ErrorState title="Error Loading Users" message={error} style={{ marginBottom: '1.5rem' }} />}

      <UserListTable 
        users={users}
        isLoading={isLoading}
        onEdit={handleEdit}
        onToggleStatus={toggleStatus}
        isMutating={isMutating}
      />

      <UserFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={editingUser}
        onSubmit={handleModalSubmit}
        isMutating={isMutating}
      />
    </div>
  );
};

export default UserManagement;
