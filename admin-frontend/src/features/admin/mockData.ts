import type { User, RolePermissionMap, SystemPermission } from './types';

export const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Admin Chief',
    email: 'admin@ner-shield.gov.in',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date('2025-01-10').toISOString()
  },
  {
    id: 'USR-002',
    name: 'Field Ops Lead',
    email: 'ops.lead@ner-shield.gov.in',
    role: 'ADMIN',
    status: 'ACTIVE',
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date('2025-01-15').toISOString()
  },
  {
    id: 'USR-003',
    name: 'Dispatch Officer',
    email: 'dispatch@ner-shield.gov.in',
    role: 'OFFICER',
    status: 'ACTIVE',
    lastLogin: new Date(Date.now() - 28800000).toISOString(),
    createdAt: new Date('2025-02-01').toISOString()
  },
  {
    id: 'USR-004',
    name: 'Logistics Viewer',
    email: 'logistics.view@ner-shield.gov.in',
    role: 'VIEWER',
    status: 'ACTIVE',
    lastLogin: null,
    createdAt: new Date('2025-03-05').toISOString()
  },
  {
    id: 'USR-005',
    name: 'Former Contractor',
    email: 'contractor@external.com',
    role: 'FIELD_OFFICER',
    status: 'INACTIVE',
    lastLogin: new Date(Date.now() - 2592000000).toISOString(),
    createdAt: new Date('2025-02-10').toISOString()
  }
];

export const allPermissions: SystemPermission[] = [
  'VIEW_DASHBOARD', 'VIEW_FLEET', 'APPROVE_REROUTE', 'VIEW_DRIVERS', 
  'VIEW_SHIPMENTS', 'CREATE_SHIPMENT', 'VIEW_ACCESSIBILITY', 'VIEW_AI_METRICS', 
  'RUN_SIMULATION', 'VIEW_INCIDENTS', 'MANAGE_EMERGENCIES', 'VIEW_ANALYTICS', 
  'EXPORT_ANALYTICS', 'MANAGE_USERS', 'MANAGE_ROLES', 'SUPER_ADMIN'
];

export const mockRolePermissions: RolePermissionMap = {
  SUPER_ADMIN: [...allPermissions],
  ADMIN: [
    'VIEW_DASHBOARD', 'VIEW_FLEET', 'APPROVE_REROUTE', 'VIEW_DRIVERS',
    'VIEW_SHIPMENTS', 'CREATE_SHIPMENT', 'VIEW_ACCESSIBILITY', 'VIEW_AI_METRICS',
    'VIEW_INCIDENTS', 'VIEW_ANALYTICS', 'EXPORT_ANALYTICS', 'MANAGE_USERS'
  ],
  OFFICER: [
    'VIEW_DASHBOARD', 'VIEW_FLEET', 'VIEW_DRIVERS', 'VIEW_SHIPMENTS',
    'VIEW_INCIDENTS', 'MANAGE_EMERGENCIES'
  ],
  FIELD_OFFICER: [
    'VIEW_DASHBOARD', 'VIEW_INCIDENTS', 'VIEW_FLEET'
  ],
  DRIVER: [
    'VIEW_DASHBOARD'
  ],
  VIEWER: [
    'VIEW_DASHBOARD', 'VIEW_FLEET', 'VIEW_SHIPMENTS', 'VIEW_ANALYTICS'
  ]
};

export const mockSystemSettings: import('./types').SystemSettingsConfig = {
  general: {
    organizationName: 'NER-SHIELD Logistics',
    supportEmail: 'support@ner-shield.gov.in'
  },
  notifications: {
    emailAlerts: true,
    smsAlerts: true,
    inAppAlerts: true
  },
  map: {
    defaultView: 'terrain',
    refreshInterval: 30,
    showTrafficOverlay: true
  },
  risk: {
    criticalIncidentThreshold: 80,
    highRiskCorridorScore: 75
  },
  preferences: {
    language: 'en',
    timezone: 'Asia/Kolkata',
    theme: 'system'
  }
};
