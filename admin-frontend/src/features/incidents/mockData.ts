import type { Incident, IncidentStatus, IncidentSeverity, IncidentType } from './types';

const districts = ['Kamrup', 'Sonitpur', 'Dibrugarh', 'Cachar', 'Nagaon', 'Jorhat', 'Tinsukia', 'Golaghat', 'Darrang', 'Bongaigaon'];
const types: IncidentType[] = ['ROADBLOCK', 'WEATHER', 'ACCIDENT', 'INFRASTRUCTURE'];
const severities: IncidentSeverity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
const statuses: IncidentStatus[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];

export const mockIncidents: Incident[] = Array.from({ length: 45 }).map((_, index) => {
  const date = new Date();
  date.setHours(date.getHours() - Math.floor(Math.random() * 72)); // Spread over last 72 hours
  
  return {
    id: `INC-2026-${String(index + 1).padStart(3, '0')}`,
    type: types[index % types.length],
    severity: severities[index % severities.length],
    district: districts[index % districts.length],
    status: statuses[index % statuses.length],
    timestamp: date.toISOString(),
    affectedRoads: [`NH-${(index % 50) + 1}`, `State Highway ${(index % 20) + 1}`],
    affectedVehicles: index % 3 === 0 ? [`VH-${1000 + index}`, `VH-${1001 + index}`] : []
  };
});
