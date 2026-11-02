import type { ShipmentDetails } from './types';
import { mockShipments } from './mockData';

export const mockShipmentDetails: Record<string, ShipmentDetails> = {
  'SHP-2026-001': {
    ...mockShipments.find(s => s.id === 'SHP-2026-001')!,
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98765 43210',
    currentLocation: 'NH-27, near Nagaon',
    riskLevel: 'LOW',
    incidentImpact: null,
    timeline: [
      { id: 't1', title: 'Shipment Created', description: 'Order entered into system.', timestamp: '08:00 AM', status: 'neutral' },
      { id: 't2', title: 'Vehicle Assigned', description: 'V-101 assigned to shipment.', timestamp: '08:30 AM', status: 'neutral' },
      { id: 't3', title: 'Dispatched', description: 'Left Guwahati Hub.', timestamp: '09:15 AM', status: 'success' },
      { id: 't4', title: 'Checkpoint Passed', description: 'Cleared Nagaon checkpost.', timestamp: '11:45 AM', status: 'primary' }
    ]
  },
  'SHP-2026-002': {
    ...mockShipments.find(s => s.id === 'SHP-2026-002')!,
    driverName: 'Amit Singh',
    driverPhone: '+91 91234 56789',
    currentLocation: 'NH-10, near Teesta',
    riskLevel: 'HIGH',
    incidentImpact: 'Landslide warning ahead. Speed restricted.',
    timeline: [
      { id: 't1', title: 'Dispatched', description: 'Left Siliguri.', timestamp: '09:15 AM', status: 'success' },
      { id: 't2', title: 'Weather Alert', description: 'Heavy rain detected on route.', timestamp: '12:00 PM', status: 'warning' },
      { id: 't3', title: 'Delayed', description: 'Halted due to landslide clearance.', timestamp: '01:30 PM', status: 'danger' }
    ]
  }
};
