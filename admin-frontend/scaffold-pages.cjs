const fs = require('fs');
const path = require('path');

const pages = [
  'Dashboard/Dashboard.tsx',
  'Fleet/LiveFleet.tsx',
  'Fleet/VehicleDetails.tsx',
  'Fleet/DriverList.tsx',
  'Fleet/DriverDetails.tsx',
  'Fleet/RerouteVehicle.tsx',
  'Logistics/ShipmentList.tsx',
  'Logistics/CreateShipment.tsx',
  'Logistics/ShipmentDetails.tsx',
  'Accessibility/GlobalMap.tsx',
  'Accessibility/RoadDetails.tsx',
  'Accessibility/RouteAnalysis.tsx',
  'AI/AiDashboard.tsx',
  'AI/RiskCorridors.tsx',
  'AI/CorridorDetails.tsx',
  'AI/RouteSimulation.tsx',
  'Incidents/IncidentList.tsx',
  'Incidents/IncidentDetails.tsx',
  'Emergency/CommandCenter.tsx',
  'Emergency/EmergencySimulation.tsx',
  'Analytics/KpiDashboard.tsx',
  'Analytics/ReportGenerator.tsx',
  'Admin/UserManagement.tsx',
  'Admin/RoleManagement.tsx',
  'Admin/SystemSettings.tsx',
  'Dev/ComponentGallery.tsx'
];

const template = (name) => `import React from 'react';
import { EmptyState } from '../../components';

const ${name} = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <EmptyState 
        title="${name.replace(/([A-Z])/g, ' $1').trim()}" 
        description="This page is currently under construction." 
      />
    </div>
  );
};

export default ${name};
`;

const root = path.join(__dirname, 'src', 'pages');

pages.forEach(p => {
  const fullPath = path.join(root, p);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const componentName = path.basename(p, '.tsx');
  fs.writeFileSync(fullPath, template(componentName));
});

console.log('Pages scaffolded successfully.');
