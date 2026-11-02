/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute, PermissionRoute } from './components';

// Static Imports for Layouts/Error
import NotFound from './pages/NotFound/NotFound';

// Lazy Loaded Pages
const Login = lazy(() => import('./pages/Auth/Login'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const LiveFleet = lazy(() => import('./pages/Fleet/LiveFleet'));
const VehicleDetails = lazy(() => import('./pages/Fleet/VehicleDetails'));
const RerouteWorkflow = lazy(() => import('./pages/Fleet/RerouteWorkflow'));
const DriverList = lazy(() => import('./pages/Fleet/DriverList'));
const DriverDetails = lazy(() => import('./pages/Fleet/DriverDetails'));

const ShipmentList = lazy(() => import('./pages/Logistics/ShipmentList'));
const CreateShipment = lazy(() => import('./pages/Logistics/CreateShipment'));
const ShipmentDetails = lazy(() => import('./pages/Logistics/ShipmentDetails'));
const GlobalMap = lazy(() => import('./pages/Accessibility/GlobalMap'));
const RoadDetails = lazy(() => import('./pages/Accessibility/RoadDetails'));
const RouteAnalysis = lazy(() => import('./pages/Accessibility/RouteAnalysis'));
const AiDashboard = lazy(() => import('./pages/AI/AiDashboard'));
const RiskCorridors = lazy(() => import('./pages/AI/RiskCorridors'));
const CorridorDetails = lazy(() => import('./pages/AI/CorridorDetails'));
const RouteSimulation = lazy(() => import('./pages/AI/RouteSimulation'));
const IncidentList = lazy(() => import('./pages/Incidents/IncidentList'));
const IncidentDetails = lazy(() => import('./pages/Incidents/IncidentDetails'));
const EmergencyCenter = lazy(() => import('./pages/Emergency/EmergencyCenter'));
const EmergencySimulation = lazy(() => import('./pages/Emergency/EmergencySimulation'));
const KpiDashboard = lazy(() => import('./pages/Analytics/KpiDashboard'));
const ReportGenerator = lazy(() => import('./pages/Analytics/ReportGenerator'));
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'));
const RoleManagement = lazy(() => import('./pages/Admin/RoleManagement'));
const SystemSettings = lazy(() => import('./pages/Admin/SystemSettings'));
const ComponentGallery = lazy(() => import('./pages/Dev/ComponentGallery'));

export const routes = [
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password', element: <ResetPassword /> },
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { 
        path: 'dashboard', 
        element: <PermissionRoute requiredPermission="VIEW_DASHBOARD"><Dashboard /></PermissionRoute> 
      },
      
      // Fleet
      { path: 'fleet/live', element: <PermissionRoute requiredPermission="VIEW_FLEET"><LiveFleet /></PermissionRoute> },
      { path: 'fleet/vehicles/:vehicleId', element: <PermissionRoute requiredPermission="VIEW_FLEET"><VehicleDetails /></PermissionRoute> },
      { path: 'fleet/vehicles/:vehicleId/reroute', element: <PermissionRoute requiredPermission="APPROVE_REROUTE"><RerouteWorkflow /></PermissionRoute> },
      { path: 'fleet/drivers', element: <PermissionRoute requiredPermission="VIEW_DRIVERS"><DriverList /></PermissionRoute> },
      { path: 'fleet/drivers/:driverId', element: <PermissionRoute requiredPermission="VIEW_DRIVERS"><DriverDetails /></PermissionRoute> },
      
      // Logistics
      { path: 'logistics/shipments', element: <PermissionRoute requiredPermission="VIEW_SHIPMENTS"><ShipmentList /></PermissionRoute> },
      { path: 'logistics/shipments/create', element: <PermissionRoute requiredPermission="CREATE_SHIPMENT"><CreateShipment /></PermissionRoute> },
      { path: 'logistics/shipments/:shipmentId', element: <PermissionRoute requiredPermission="VIEW_SHIPMENTS"><ShipmentDetails /></PermissionRoute> },
      
      // Accessibility
      { path: 'accessibility/map', element: <PermissionRoute requiredPermission="VIEW_ACCESSIBILITY"><GlobalMap /></PermissionRoute> },
      { path: 'accessibility/roads/:roadId', element: <PermissionRoute requiredPermission="VIEW_ACCESSIBILITY"><RoadDetails /></PermissionRoute> },
      { path: 'accessibility/routes/:routeId', element: <PermissionRoute requiredPermission="VIEW_ACCESSIBILITY"><RouteAnalysis /></PermissionRoute> },
      
      // AI
      { path: 'ai/predictions', element: <PermissionRoute requiredPermission="VIEW_AI_METRICS"><AiDashboard /></PermissionRoute> },
      { path: 'ai/risk-corridors', element: <PermissionRoute requiredPermission="VIEW_AI_METRICS"><RiskCorridors /></PermissionRoute> },
      { path: 'ai/risk-corridors/:corridorId', element: <PermissionRoute requiredPermission="VIEW_AI_METRICS"><CorridorDetails /></PermissionRoute> },
      { path: 'ai/routes', element: <PermissionRoute requiredPermission="RUN_SIMULATION"><RouteSimulation /></PermissionRoute> },
      
      // Incidents
      { path: 'incidents', element: <PermissionRoute requiredPermission="VIEW_INCIDENTS"><IncidentList /></PermissionRoute> },
      { path: 'incidents/:incidentId', element: <PermissionRoute requiredPermission="VIEW_INCIDENTS"><IncidentDetails /></PermissionRoute> },
      
      // Emergency
      { path: 'emergency', element: <PermissionRoute requiredPermission="MANAGE_EMERGENCIES"><EmergencyCenter /></PermissionRoute> },
      { path: 'emergency/simulation', element: <PermissionRoute requiredPermission="RUN_SIMULATION"><EmergencySimulation /></PermissionRoute> },
      
      // Analytics
      { path: 'analytics', element: <PermissionRoute requiredPermission="VIEW_ANALYTICS"><KpiDashboard /></PermissionRoute> },
      { path: 'analytics/reports', element: <PermissionRoute requiredPermission="EXPORT_ANALYTICS"><ReportGenerator /></PermissionRoute> },
      
      // Admin
      { path: 'admin/users', element: <PermissionRoute requiredPermission="MANAGE_USERS"><UserManagement /></PermissionRoute> },
      { path: 'admin/roles', element: <PermissionRoute requiredPermission="MANAGE_ROLES"><RoleManagement /></PermissionRoute> },
      { path: 'admin/settings', element: <PermissionRoute requiredPermission="SUPER_ADMIN"><SystemSettings /></PermissionRoute> },
      
      // 404 Not Found Catch-All
      { path: '*', element: <NotFound /> }
    ],
  },
  {
    path: '/dev/gallery',
    element: <ComponentGallery /> // Intentionally lazy loaded but outside of Auth/Suspense layout for dev purposes
  }
];

export const router = createBrowserRouter(routes);
