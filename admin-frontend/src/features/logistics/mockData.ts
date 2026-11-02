import type { Shipment } from './types';

export const mockShipments: Shipment[] = [
  {
    id: 'SHP-2026-001',
    origin: 'Guwahati, Assam',
    destination: 'Shillong, Meghalaya',
    commodityType: 'GENERAL',
    weightKg: 4500,
    assignedVehicleId: 'V-101',
    status: 'IN_TRANSIT',
    priority: 'MEDIUM',
    eta: 'Today, 14:30',
    createdAt: '2026-09-07T08:00:00Z'
  },
  {
    id: 'SHP-2026-002',
    origin: 'Siliguri, West Bengal',
    destination: 'Gangtok, Sikkim',
    commodityType: 'PERISHABLE',
    weightKg: 2100,
    assignedVehicleId: 'V-102',
    status: 'DELAYED',
    priority: 'HIGH',
    eta: 'Today, 18:00',
    createdAt: '2026-09-07T09:15:00Z'
  },
  {
    id: 'SHP-2026-003',
    origin: 'Dimapur, Nagaland',
    destination: 'Kohima, Nagaland',
    commodityType: 'HAZARDOUS',
    weightKg: 8500,
    assignedVehicleId: 'V-104',
    status: 'PENDING',
    priority: 'CRITICAL',
    eta: null,
    createdAt: '2026-09-08T07:30:00Z'
  },
  {
    id: 'SHP-2026-004',
    origin: 'Agartala, Tripura',
    destination: 'Silchar, Assam',
    commodityType: 'SECURE',
    weightKg: 1200,
    assignedVehicleId: null,
    status: 'PENDING',
    priority: 'HIGH',
    eta: null,
    createdAt: '2026-09-08T10:00:00Z'
  },
  {
    id: 'SHP-2026-005',
    origin: 'Imphal, Manipur',
    destination: 'Guwahati, Assam',
    commodityType: 'GENERAL',
    weightKg: 6000,
    assignedVehicleId: 'V-103',
    status: 'DELIVERED',
    priority: 'LOW',
    eta: 'Delivered 2 days ago',
    createdAt: '2026-09-05T06:45:00Z'
  },
  {
    id: 'SHP-2026-006',
    origin: 'Tezpur, Assam',
    destination: 'Itanagar, Arunachal Pradesh',
    commodityType: 'FRAGILE',
    weightKg: 3400,
    assignedVehicleId: 'V-105',
    status: 'IN_TRANSIT',
    priority: 'MEDIUM',
    eta: 'Tomorrow, 10:00',
    createdAt: '2026-09-07T14:20:00Z'
  }
];
