import type { Vehicle } from './types';

export const mockVehicles: Vehicle[] = [
  {
    id: 'V-101',
    plateNumber: 'AS-01-HC-4321',
    type: 'Heavy Truck',
    status: 'ACTIVE',
    currentRiskLevel: 'LOW',
    location: {
      lat: 26.1445,
      lng: 91.7362,
      address: 'NH-27, Guwahati, Assam',
      timestamp: new Date().toISOString()
    },
    driverId: 'D-991',
    driverName: 'Ramesh Singh',
    speedKmH: 65,
    batteryOrFuelLevel: 82,
    lastPing: 'Just now'
  },
  {
    id: 'V-102',
    plateNumber: 'SK-01-PA-1234',
    type: 'Light Carrier',
    status: 'ACTIVE',
    currentRiskLevel: 'HIGH',
    location: {
      lat: 27.3389,
      lng: 88.6065,
      address: 'NH-10, Gangtok, Sikkim (Landslide Zone)',
      timestamp: new Date(Date.now() - 60000 * 5).toISOString() // 5 mins ago
    },
    driverId: 'D-992',
    driverName: 'Karma Bhutia',
    speedKmH: 15,
    batteryOrFuelLevel: 45,
    lastPing: '5 mins ago'
  },
  {
    id: 'V-103',
    plateNumber: 'ML-05-L-8822',
    type: 'Medium Truck',
    status: 'IDLE',
    currentRiskLevel: 'LOW',
    location: {
      lat: 25.5788,
      lng: 91.8933,
      address: 'Shillong Bypass, Meghalaya',
      timestamp: new Date(Date.now() - 60000 * 30).toISOString()
    },
    driverId: 'D-993',
    driverName: 'John Lyngdoh',
    speedKmH: 0,
    batteryOrFuelLevel: 15,
    lastPing: '30 mins ago'
  },
  {
    id: 'V-104',
    plateNumber: 'NL-01-K-5544',
    type: 'Heavy Truck',
    status: 'MAINTENANCE',
    currentRiskLevel: 'MEDIUM',
    location: {
      lat: 25.6701,
      lng: 94.1077,
      address: 'Kohima Service Center, Nagaland',
      timestamp: new Date(Date.now() - 60000 * 120).toISOString()
    },
    driverId: 'D-994',
    driverName: 'Avi Angami',
    speedKmH: 0,
    batteryOrFuelLevel: 100,
    lastPing: '2 hours ago'
  },
  {
    id: 'V-105',
    plateNumber: 'AR-01-M-9911',
    type: '4x4 Carrier',
    status: 'ACTIVE',
    currentRiskLevel: 'MEDIUM',
    location: {
      lat: 27.0844,
      lng: 93.6053,
      address: 'Itanagar Highway, Arunachal Pradesh',
      timestamp: new Date(Date.now() - 60000 * 2).toISOString()
    },
    driverId: 'D-995',
    driverName: 'Tana Teli',
    speedKmH: 42,
    batteryOrFuelLevel: 68,
    lastPing: '2 mins ago'
  },
  {
    id: 'V-106',
    plateNumber: 'MZ-01-F-7766',
    type: 'Light Carrier',
    status: 'OFFLINE',
    currentRiskLevel: 'HIGH',
    location: {
      lat: 23.7271,
      lng: 92.7176,
      address: 'Aizawl Outskirts (No Signal)',
      timestamp: new Date(Date.now() - 60000 * 300).toISOString()
    },
    driverId: 'D-996',
    driverName: 'Lalrinpuii',
    speedKmH: 0,
    batteryOrFuelLevel: 30,
    lastPing: '5 hours ago'
  }
];

import type { VehicleDetails } from './types';

// Extend V-101 for the detailed view
export const mockVehicleDetails: Record<string, VehicleDetails> = {
  'V-101': {
    ...mockVehicles[0],
    currentShipment: {
      id: 'SHP-9022',
      destination: 'Tezpur, Assam',
      status: 'IN_TRANSIT',
      eta: '2026-09-08 14:30',
      goodsType: 'Medical Supplies',
      weight: '4.2 Tons'
    },
    routeHistory: [
      { location: 'Guwahati Hub', timestamp: '08:00 AM', status: 'COMPLETED' },
      { location: 'Jorabat Checkpoint', timestamp: '09:15 AM', status: 'COMPLETED' },
      { location: 'Nagaon Bypass', timestamp: '11:30 AM', status: 'CURRENT' },
      { location: 'Tezpur Final Delivery', timestamp: '02:30 PM (ETA)', status: 'PENDING' }
    ],
    incidentHistory: [
      { id: 'INC-771', type: 'Minor Delay', severity: 'LOW', timestamp: '2026-09-07 10:00', description: 'Traffic congestion at city limits.' }
    ]
  },
  'V-102': {
    ...mockVehicles[1],
    currentShipment: {
      id: 'SHP-9045',
      destination: 'Gangtok, Sikkim',
      status: 'DELAYED',
      eta: 'Unknown',
      goodsType: 'Perishable Food',
      weight: '2.5 Tons'
    },
    routeHistory: [
      { location: 'Siliguri Base', timestamp: '06:00 AM', status: 'COMPLETED' },
      { location: 'Rangpo Checkpost', timestamp: '08:45 AM', status: 'COMPLETED' },
      { location: 'Singtam', timestamp: '10:00 AM', status: 'CURRENT' }
    ],
    incidentHistory: [
      { id: 'INC-882', type: 'Landslide Blockade', severity: 'HIGH', timestamp: '2026-09-08 09:55', description: 'NH-10 blocked due to severe landslide.' }
    ]
  }
};

import type { Driver, DriverDetails } from './types';

export const mockDrivers: Driver[] = [
  {
    id: 'D-991',
    name: 'Ramesh Singh',
    licenseNumber: 'AS-DL-2015-1234',
    status: 'ON_DUTY',
    contactNumber: '+91-9876543210',
    assignedVehicleId: 'V-101'
  },
  {
    id: 'D-992',
    name: 'Karma Bhutia',
    licenseNumber: 'SK-DL-2018-5678',
    status: 'ON_DUTY',
    contactNumber: '+91-8765432109',
    assignedVehicleId: 'V-102'
  },
  {
    id: 'D-993',
    name: 'John Lyngdoh',
    licenseNumber: 'ML-DL-2019-9012',
    status: 'AVAILABLE',
    contactNumber: '+91-7654321098',
    assignedVehicleId: null
  },
  {
    id: 'D-994',
    name: 'Avi Angami',
    licenseNumber: 'NL-DL-2020-3456',
    status: 'OFF_DUTY',
    contactNumber: '+91-6543210987',
    assignedVehicleId: 'V-104'
  },
  {
    id: 'D-997',
    name: 'Pema Khandu',
    licenseNumber: 'AR-DL-2016-7890',
    status: 'SUSPENDED',
    contactNumber: '+91-5432109876',
    assignedVehicleId: null
  }
];

export const mockDriverDetails: Record<string, DriverDetails> = {
  'D-991': {
    ...mockDrivers[0],
    tripHistory: [
      {
        id: 'TRP-101',
        date: '2026-09-05',
        vehicleId: 'V-101',
        distanceKm: 340,
        startLocation: 'Guwahati, Assam',
        endLocation: 'Shillong, Meghalaya',
        status: 'COMPLETED'
      },
      {
        id: 'TRP-105',
        date: '2026-09-07',
        vehicleId: 'V-101',
        distanceKm: 120,
        startLocation: 'Shillong, Meghalaya',
        endLocation: 'Guwahati, Assam',
        status: 'COMPLETED'
      }
    ]
  },
  'D-992': {
    ...mockDrivers[1],
    tripHistory: [
      {
        id: 'TRP-102',
        date: '2026-09-06',
        vehicleId: 'V-102',
        distanceKm: 210,
        startLocation: 'Siliguri, WB',
        endLocation: 'Gangtok, Sikkim',
        status: 'COMPLETED'
      }
    ]
  }
};
