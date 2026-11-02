import React from 'react';
import { Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell, Badge, Button, TableSkeleton, EmptyState } from '../../../components';
import { Edit, Power, PowerOff } from 'lucide-react';
import type { User } from '../types';

interface UserListTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onToggleStatus: (id: string) => void;
  isMutating: boolean;
}

export const UserListTable: React.FC<UserListTableProps> = ({ users, isLoading, onEdit, onToggleStatus, isMutating }) => {
  if (isLoading) {
    return (
      <Card style={{ padding: '2rem' }}>
        <TableSkeleton rows={5} columns={6} />
      </Card>
    );
  }

  return (
    <Card style={{ padding: '0', overflow: 'hidden' }}>
      {users.length === 0 ? (
        <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
          <EmptyState title="No Users Found" description="No users match your criteria." />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Last Login</TableHeader>
              <TableHeader align="right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ fontWeight: 500 }}>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                </TableCell>
                <TableCell align="right">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button variant="outline" size="sm" onClick={() => onEdit(user)} disabled={isMutating}>
                      <Edit size={14} /> Edit
                    </Button>
                    <Button 
                      variant={user.status === 'ACTIVE' ? 'danger' : 'primary'} 
                      size="sm" 
                      onClick={() => onToggleStatus(user.id)}
                      disabled={isMutating}
                    >
                      {user.status === 'ACTIVE' ? <><PowerOff size={14} /> Deactivate</> : <><Power size={14} /> Activate</>}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
