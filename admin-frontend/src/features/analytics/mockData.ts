import type { AnalyticsDashboardData } from './types';

export const mockAnalyticsData: AnalyticsDashboardData = {
  delivery: {
    averageDeliveryTimeHours: 14.5,
    averageDelayMinutes: 42,
    deliveryTimeHistory: [
      { date: 'Mon', avgTime: 12, avgDelay: 20 },
      { date: 'Tue', avgTime: 13, avgDelay: 30 },
      { date: 'Wed', avgTime: 18, avgDelay: 120 }, // Simulated spike
      { date: 'Thu', avgTime: 16, avgDelay: 85 },
      { date: 'Fri', avgTime: 14, avgDelay: 40 },
      { date: 'Sat', avgTime: 14, avgDelay: 35 },
      { date: 'Sun', avgTime: 13, avgDelay: 25 },
    ]
  },
  incidents: {
    totalIncidents: 24,
    incidentsByDistrict: [
      { district: 'Kamrup', count: 12 },
      { district: 'Dibrugarh', count: 5 },
      { district: 'Nagaon', count: 4 },
      { district: 'Jorhat', count: 3 }
    ]
  },
  fleet: {
    vehicleUtilizationPercent: 82.4
  },
  risk: {
    routeDisruptionRatePercent: 15.2,
    districtAccessibility: [
      { district: 'Kamrup', score: 95 },
      { district: 'Dibrugarh', score: 60 }, // Lower score indicates worse accessibility
      { district: 'Nagaon', score: 85 },
      { district: 'Jorhat', score: 78 }
    ],
    criticalCorridorRisk: [
      { corridor: 'NH-37', riskLevel: 8.5 },
      { corridor: 'NH-27', riskLevel: 4.2 },
      { corridor: 'SH-12', riskLevel: 6.8 },
      { corridor: 'SH-44', riskLevel: 2.1 }
    ]
  }
};

export const mockReports: import('./types').GeneratedReport[] = [
  {
    id: 'REP-1029',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    filters: {
      startDate: '2026-09-01',
      endDate: '2026-09-07',
      district: 'Kamrup',
      commodity: '',
      vehicleId: '',
      incidentType: '',
      routeId: ''
    },
    status: 'COMPLETED',
    summary: 'Weekly operational summary for Kamrup district. 12 incidents recorded.'
  }
];
