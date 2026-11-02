import { mockIncidents } from '../features/incidents/mockData';
import { mockShipments } from '../features/logistics/mockData';
import { mockVehicles, mockVehicleDetails, mockDrivers, mockDriverDetails } from '../features/fleet/mockData';
import { useVehicleStore } from '../store/vehicleStore';
import { useShipmentStore } from '../store/shipmentStore';
import { useIncidentStore } from '../store/incidentStore';

export const seedStores = () => {
    useVehicleStore.setState({
      vehicles: mockVehicles,
      vehicleDetails: mockVehicleDetails,
      drivers: mockDrivers,
      driverDetails: mockDriverDetails
    });
    useShipmentStore.setState({
      shipments: mockShipments
    });
    useIncidentStore.setState({
      incidents: mockIncidents
    });
};
