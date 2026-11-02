import { mockIncidents } from './mockData';
import type { IncidentDetails } from './types';

export const mockIncidentDetails: Record<string, IncidentDetails> = {};

mockIncidents.forEach(inc => {
  mockIncidentDetails[inc.id] = {
    ...inc,
    location: `Latitude: ${(26 + Math.random() * 2).toFixed(4)}, Longitude: ${(91 + Math.random() * 4).toFixed(4)}`,
    photos: [
      'https://placehold.co/400x300',
      'https://placehold.co/400x300'
    ],
    description: `A ${inc.severity.toLowerCase()} severity ${inc.type.toLowerCase()} incident has been reported in ${inc.district}. Field teams are assessing the situation.`,
    reporter: `Field Officer ${Math.floor(Math.random() * 100) + 1}`,
    affectedShipments: inc.affectedVehicles.length > 0 ? [`SHP-2026-${Math.floor(Math.random() * 900) + 100}`] : [],
    riskImpact: inc.severity === 'CRITICAL' ? 'High potential for supply chain disruption.' : 'Moderate delays expected.'
  };
});
