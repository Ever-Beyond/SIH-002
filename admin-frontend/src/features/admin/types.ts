export type SystemRole = 'SUPER_ADMIN' | 'ADMIN' | 'OFFICER' | 'FIELD_OFFICER' | 'DRIVER' | 'VIEWER';

export type SystemPermission = 
  | 'VIEW_DASHBOARD'
  | 'VIEW_FLEET'
  | 'APPROVE_REROUTE'
  | 'VIEW_DRIVERS'
  | 'VIEW_SHIPMENTS'
  | 'CREATE_SHIPMENT'
  | 'VIEW_ACCESSIBILITY'
  | 'VIEW_AI_METRICS'
  | 'RUN_SIMULATION'
  | 'VIEW_INCIDENTS'
  | 'MANAGE_EMERGENCIES'
  | 'VIEW_ANALYTICS'
  | 'EXPORT_ANALYTICS'
  | 'MANAGE_USERS'
  | 'MANAGE_ROLES'
  | 'SUPER_ADMIN';

export type RolePermissionMap = Record<SystemRole, SystemPermission[]>;
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: SystemRole;
  status: UserStatus;
  lastLogin: string | null;
  createdAt: string;
}

export type CreateUserDTO = Omit<User, 'id' | 'lastLogin' | 'createdAt'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

export interface SystemSettingsConfig {
  general: {
    organizationName: string;
    supportEmail: string;
  };
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    inAppAlerts: boolean;
  };
  map: {
    defaultView: 'satellite' | 'terrain' | 'street';
    refreshInterval: number; // in seconds
    showTrafficOverlay: boolean;
  };
  risk: {
    criticalIncidentThreshold: number;
    highRiskCorridorScore: number;
  };
  preferences: {
    language: 'en' | 'hi' | 'as'; // English, Hindi, Assamese
    timezone: string;
    theme: 'light' | 'dark' | 'system';
  };
}
