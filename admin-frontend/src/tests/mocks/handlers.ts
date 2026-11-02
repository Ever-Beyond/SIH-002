import { http, HttpResponse } from 'msw';

export const handlers = [
  // 1. Login
  http.post('*/api/v1/auth/login', () => {
    return HttpResponse.json({
      token: 'fake-jwt-token',
      user: {
        id: 'usr_001',
        name: 'Admin User',
        email: 'admin@ner-shield.gov.in',
        role: 'SUPER_ADMIN',
      },
      permissions: ['VIEW_DASHBOARD', 'VIEW_FLEET', 'CREATE_SHIPMENT', 'APPROVE_REROUTE']
    });
  }),

  // 2. Dashboard Loading (KPIs)
  http.get('*/api/v1/analytics/dashboard', async () => {
    return HttpResponse.json({
      activeVehicles: 45,
      totalShipments: 128,
      activeIncidents: 3,
      avgDeliveryTime: '2.4 days'
    });
  }),

  // 3. Vehicle Selection
  http.get('*/api/v1/fleet/vehicles/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      status: 'ACTIVE',
      driverName: 'John Doe',
      location: [26.2006, 92.9376],
      batteryLevel: 85
    });
  }),

  // 4. Shipment Creation
  http.post('*/api/v1/shipments', () => {
    return HttpResponse.json({
      id: 'shp_mock_new',
      status: 'PENDING',
      message: 'Shipment created successfully'
    }, { status: 201 });
  }),

  // 5. Incident Creation
  http.post('*/api/v1/incidents', async ({ request }) => {
    const data = await request.json() as Record<string, unknown>;
    return HttpResponse.json({
      id: 'inc_mock_new',
      title: data.title || 'New Incident',
      status: 'ACTIVE',
      severity: data.severity || 'MEDIUM',
      timestamp: new Date().toISOString()
    }, { status: 201 });
  }),

  // 6. Rerouting (AI Analysis)
  http.post('*/api/v1/ai/routes/analyze', () => {
    return HttpResponse.json({
      originalRouteRisk: 0.85,
      alternatives: [
        { id: 'alt_1', riskScore: 0.12, distance: 45, eta: '2h 15m' },
        { id: 'alt_2', riskScore: 0.35, distance: 38, eta: '1h 50m' }
      ]
    });
  }),

  // 7. Route Acceptance
  http.post('*/api/v1/routes/:id/accept', ({ params }) => {
    return HttpResponse.json({
      success: true,
      routeId: params.id,
      message: 'Route accepted and assigned'
    });
  })
];
