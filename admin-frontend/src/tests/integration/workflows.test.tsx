import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils';
import { useVehicleStore } from '../../store/vehicleStore';
import { useShipmentStore } from '../../store/shipmentStore';
import { useIncidentStore } from '../../store/incidentStore';
import { mockVehicles, mockVehicleDetails, mockDrivers, mockDriverDetails } from '../../features/fleet/mockData';
import { mockShipments } from '../../features/logistics/mockData';
import { mockIncidents } from '../../features/incidents/mockData';

// Mock the global ResizeObserver
(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Frontend Integration Workflows', () => {
  let originalRandom: () => number;
  let mockRandomCounter = 0;

  beforeAll(() => {
    originalRandom = Math.random;
    Math.random = () => {
      mockRandomCounter += 0.0001;
      return 0.5 + mockRandomCounter;
    };
  });

  afterAll(() => {
    Math.random = originalRandom;
  });

  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
    
    // Seed the stores synchronously for testing
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
  });

  it('1. Login workflow - Should authenticate and redirect to dashboard', async () => {
    // Render starting at /login
    renderWithRouter('/login');

    expect(await screen.findByRole('heading', { name: /Welcome Back/i })).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'admin@ner-shield.gov.in');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(signInButton);

    expect(await screen.findByText('Login successful', {}, { timeout: 5000 })).toBeInTheDocument();
    
    // Once login is successful, we should hit the dashboard
    expect(await screen.findByText('Command Center Overview', {}, { timeout: 5000 })).toBeInTheDocument();
  }, 10000);

  it('2. Dashboard Loading workflow', async () => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
    renderWithRouter('/dashboard');

    // Wait for mock data to resolve (e.g. activeVehicles = 42 or the page loaded)
    expect(await screen.findByText('Command Center Overview', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(await screen.findByText('42', {}, { timeout: 5000 })).toBeInTheDocument();
  }, 10000);

  it('3. Vehicle Selection workflow', async () => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
    renderWithRouter('/fleet/live');

    // Fleet list should render
    expect(await screen.findByText('Live Fleet Tracking', {}, { timeout: 5000 })).toBeInTheDocument();
    
    // Find a vehicle and click details (V-101 is hardcoded in mockVehicles)
    const vehicleRow = await screen.findByText('V-101', {}, { timeout: 5000 });
    await userEvent.click(vehicleRow);

    const viewButtons = await screen.findAllByRole('button', { name: /View Full Details/i }, { timeout: 5000 });
    expect(viewButtons.length).toBeGreaterThan(0);
  }, 10000);

  it('4. Shipment Creation workflow', async () => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
    renderWithRouter('/logistics/shipments/create');

    expect(await screen.findByText('Create New Shipment', {}, { timeout: 5000 })).toBeInTheDocument();

    // Use getByRole to target the select element properly
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /Commodity Type \*/i }), 'GENERAL');
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /Priority \*/i }), 'HIGH');
    await userEvent.type(screen.getByRole('textbox', { name: /Origin \*/i }), 'Delhi');
    await userEvent.type(screen.getByRole('textbox', { name: /Destination \*/i }), 'Mumbai');
    await userEvent.type(screen.getByRole('spinbutton', { name: /Quantity/i }), '500');

    await userEvent.click(screen.getByRole('button', { name: /Create Shipment/i }));

    expect(await screen.findByText('Shipment Created Successfully!', {}, { timeout: 5000 })).toBeInTheDocument();
  }, 10000);

  it('5. Incident Management workflow', async () => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
    renderWithRouter('/incidents');

    // We don't have "Report Incident", so just check the page loads
    expect(await screen.findByText('Incident Management', {}, { timeout: 5000 })).toBeInTheDocument();
  }, 10000);

  it('6. Rerouting workflow', async () => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
    renderWithRouter('/fleet/vehicles/V-101/reroute');

    // Should automatically fetch reroute data
    // ALT-1 risk level is LOW, distance 42.5
    expect(await screen.findByText('42.5 km', {}, { timeout: 5000 })).toBeInTheDocument();
  }, 10000);

  it('7. Route Acceptance workflow', async () => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
    renderWithRouter('/fleet/vehicles/V-101/reroute');

    // RerouteWorkflow automatically selects the first route (ALT-1)
    expect(await screen.findByText('42.5 km', {}, { timeout: 5000 })).toBeInTheDocument();

    const acceptBtn = await screen.findByRole('button', { name: /Accept Route/i });
    await userEvent.click(acceptBtn);

    // Because handleAcceptRoute navigates to /fleet/vehicles/V-101
    // we expect to see the vehicle profile eventually
    expect(await screen.findByText(/Vehicle Profile: V-101/i, {}, { timeout: 5000 })).toBeInTheDocument();
  }, 15000);

  it('8. Permission Denial workflow', async () => {
    const { PermissionRoute } = await import('../../components/PermissionRoute/PermissionRoute');
    const { AuthContext } = await import('../../contexts/AuthContext');

    render(
      <AuthContext.Provider value={{
        isAuthenticated: true,
        user: { id: 'u1', name: 'Test', email: 'test@test.com', role: 'DISPATCHER' },
        permissions: ['VIEW_DASHBOARD'], // Lacks SUPER_ADMIN
        login: vi.fn(), logout: vi.fn(), resetPassword: vi.fn(), isLoading: false
      }}>
        <PermissionRoute requiredPermission="SUPER_ADMIN">
          <div data-testid="protected-content">Secret</div>
        </PermissionRoute>
      </AuthContext.Provider>
    );

    // Verify fallback "Access Denied" error state
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  }, 10000);
});
