import { UserRole } from '../../modules/users/entities/user.entity.js';

export enum Permission {
  // Users
  CREATE_USER = 'CREATE_USER',
  READ_USER = 'READ_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',

  // Fleet
  CREATE_VEHICLE = 'CREATE_VEHICLE',
  READ_VEHICLE = 'READ_VEHICLE',
  UPDATE_VEHICLE = 'UPDATE_VEHICLE',
  DELETE_VEHICLE = 'DELETE_VEHICLE',
  ASSIGN_ROUTE = 'ASSIGN_ROUTE',

  // Incidents
  CREATE_INCIDENT = 'CREATE_INCIDENT',
  READ_INCIDENT = 'READ_INCIDENT',
  UPDATE_INCIDENT = 'UPDATE_INCIDENT',
  DELETE_INCIDENT = 'DELETE_INCIDENT',

  // Logistics
  CREATE_SHIPMENT = 'CREATE_SHIPMENT',
  READ_SHIPMENT = 'READ_SHIPMENT',
  UPDATE_SHIPMENT = 'UPDATE_SHIPMENT',
  DELETE_SHIPMENT = 'DELETE_SHIPMENT',
}

export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission),
  [UserRole.ADMIN]: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.CREATE_VEHICLE,
    Permission.READ_VEHICLE,
    Permission.UPDATE_VEHICLE,
    Permission.ASSIGN_ROUTE,
    Permission.CREATE_INCIDENT,
    Permission.READ_INCIDENT,
    Permission.UPDATE_INCIDENT,
    Permission.CREATE_SHIPMENT,
    Permission.READ_SHIPMENT,
    Permission.UPDATE_SHIPMENT,
  ],
  [UserRole.OFFICER]: [
    Permission.READ_USER,
    Permission.READ_VEHICLE,
    Permission.ASSIGN_ROUTE,
    Permission.CREATE_INCIDENT,
    Permission.READ_INCIDENT,
    Permission.CREATE_SHIPMENT,
    Permission.READ_SHIPMENT,
  ],
  [UserRole.FIELD_OFFICER]: [
    Permission.READ_VEHICLE,
    Permission.CREATE_INCIDENT,
    Permission.READ_INCIDENT,
    Permission.READ_SHIPMENT,
  ],
  [UserRole.DRIVER]: [
    Permission.READ_VEHICLE,
    Permission.READ_INCIDENT,
    Permission.READ_SHIPMENT,
  ],
  [UserRole.VIEWER]: [
    Permission.READ_USER,
    Permission.READ_VEHICLE,
    Permission.READ_INCIDENT,
    Permission.READ_SHIPMENT,
  ],
};
