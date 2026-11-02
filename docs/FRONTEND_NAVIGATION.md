# NER-SHIELD: Admin Frontend Navigation Specification

## Overview
This document specifies the routing and state management logic for the NER-SHIELD Admin Web Application. It outlines permissions, data requirements, and UI states (loading/empty/error) for 21 distinct routes.

---

## 1. Dashboard

### `/dashboard`
- **Purpose**: Central hub providing a high-level overview of system health, active shipments, unresolved incidents, and critical AI alerts.
- **Entry Points**: Initial login, Sidebar navigation.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "View All Shipments" -> Navigates to `/logistics/shipments`
  - "View Incident" -> Navigates to `/incidents/:incidentId`
- **Permissions**: `VIEW_DASHBOARD`
- **Required Data**: High-level aggregated metrics, list of critical alerts, summary map data.
- **Loading State**: Skeleton widgets for metrics, blurred map with loading spinner.
- **Empty State**: "No active shipments or critical incidents today."
- **Error State**: Toast notification "Failed to load dashboard data." with a Retry button in widgets.

---

## 2. Fleet Management

### `/fleet/live`
- **Purpose**: Real-time geospatial tracking of all active vehicles.
- **Entry Points**: Sidebar.
- **Child Navigation**: Vehicle popup overlays.
- **Buttons/Actions**:
  - "Click Vehicle Marker" -> Opens summary popup.
  - "Details" (in popup) -> Navigates to `/fleet/vehicles/:vehicleId`
- **Permissions**: `VIEW_FLEET`
- **Required Data**: WebSocket stream of VehicleLocation data.
- **Loading State**: Map base layer renders, showing "Connecting to live fleet feed..." overlay.
- **Empty State**: "No active vehicles currently tracked."
- **Error State**: "Live connection lost. Attempting to reconnect..."

### `/fleet/vehicles/:vehicleId`
- **Purpose**: Detailed view of a specific vehicle, its current status, specs, and active shipment.
- **Entry Points**: `/fleet/live`, `/logistics/shipments/:shipmentId`.
- **Child Navigation**: Vehicle timeline tabs.
- **Buttons/Actions**:
  - "Reroute Vehicle" -> Navigates to `/fleet/vehicles/:vehicleId/reroute`
  - "Edit Vehicle" -> Opens modal.
- **Permissions**: `VIEW_FLEET`
- **Required Data**: Vehicle details, current Driver details, active Route.
- **Loading State**: Skeleton profile page.
- **Empty State**: N/A (Route relies on ID existence; 404 if invalid).
- **Error State**: "Vehicle not found."

### `/fleet/drivers`
- **Purpose**: List view of all registered drivers and their current statuses.
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "View Driver" -> Navigates to `/fleet/drivers/:driverId`
  - "Add Driver" -> Opens modal to create driver.
- **Permissions**: `VIEW_DRIVERS`
- **Required Data**: Paginated list of Drivers.
- **Loading State**: Skeleton data table.
- **Empty State**: "No drivers found. [Add Driver]"
- **Error State**: "Failed to load drivers table."

### `/fleet/drivers/:driverId`
- **Purpose**: Detailed profile of a specific driver, performance metrics, and current assignment.
- **Entry Points**: `/fleet/drivers`, `/fleet/vehicles/:vehicleId`.
- **Child Navigation**: History tab, Certifications tab.
- **Buttons/Actions**:
  - "Suspend Driver" -> Triggers API action.
- **Permissions**: `VIEW_DRIVERS`, `MANAGE_DRIVERS` (for actions).
- **Required Data**: Driver DTO, user profile details.
- **Loading State**: Skeleton layout.
- **Empty State**: N/A.
- **Error State**: "Driver profile could not be loaded."

### `/fleet/vehicles/:vehicleId/reroute`
- **Purpose**: Dedicated workspace to view AI-proposed alternative routes or manually draft a new route for an active vehicle.
- **Entry Points**: `/fleet/vehicles/:vehicleId`.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Approve AI Route" -> Submits PATCH to update activeRouteId, navigates to `/fleet/vehicles/:vehicleId`.
  - "Cancel" -> Returns to `/fleet/vehicles/:vehicleId`.
- **Permissions**: `APPROVE_REROUTE`
- **Required Data**: Current Route, RouteAlternatives, Map geometries.
- **Loading State**: Map with "Calculating route alternatives..."
- **Empty State**: "No feasible alternatives found."
- **Error State**: "Optimization engine unavailable."

---

## 3. Logistics

### `/logistics/shipments`
- **Purpose**: Comprehensive list/kanban view of all shipments (Pending, In Transit, Delivered).
- **Entry Points**: Sidebar, Dashboard.
- **Child Navigation**: Tabs for Status filters.
- **Buttons/Actions**:
  - "Create Shipment" -> Navigates to `/logistics/shipments/create`
  - "Click Shipment" -> Navigates to `/logistics/shipments/:shipmentId`
- **Permissions**: `VIEW_SHIPMENTS`
- **Required Data**: Paginated Shipment list.
- **Loading State**: Skeleton table/kanban board.
- **Empty State**: "No shipments found matching criteria."
- **Error State**: "Unable to load shipments."

### `/logistics/shipments/create`
- **Purpose**: Form wizard to define origin, destination, assign vehicle, and calculate initial route.
- **Entry Points**: `/logistics/shipments`.
- **Child Navigation**: Wizard steps (Details -> Assignment -> Route Confirmation).
- **Buttons/Actions**:
  - "Submit Dispatch" -> Creates shipment, returns to `/logistics/shipments`.
  - "Cancel" -> Returns to `/logistics/shipments`.
- **Permissions**: `CREATE_SHIPMENT`
- **Required Data**: List of available vehicles/drivers, map geocoder.
- **Loading State**: Disables form inputs, shows spinner on submit button.
- **Empty State**: N/A.
- **Error State**: Field-level validation errors, or global "Failed to dispatch shipment."

### `/logistics/shipments/:shipmentId`
- **Purpose**: Real-time tracking and metadata for a specific shipment.
- **Entry Points**: `/logistics/shipments`, `/dashboard`.
- **Child Navigation**: Details tab, Map Tracking tab, Audit log tab.
- **Buttons/Actions**:
  - "Cancel Shipment" -> Triggers API action.
  - "View Vehicle" -> Navigates to `/fleet/vehicles/:vehicleId`.
- **Permissions**: `VIEW_SHIPMENTS`
- **Required Data**: Shipment DTO, ETA Prediction DTO.
- **Loading State**: Skeleton view.
- **Empty State**: N/A.
- **Error State**: "Shipment not found or access denied."

---

## 4. Accessibility

### `/accessibility/map`
- **Purpose**: GIS overview showing global accessibility status (Open/Restricted/Closed) of all monitored roads.
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Click Road" -> Navigates to `/accessibility/roads/:roadId`.
- **Permissions**: `VIEW_ACCESSIBILITY`
- **Required Data**: RoadSegments geometries, AccessibilityStatus data.
- **Loading State**: "Rendering map layers..."
- **Empty State**: "No accessibility data available for this region."
- **Error State**: "Failed to load GIS data layers."

### `/accessibility/roads/:roadId`
- **Purpose**: Detailed breakdown of a specific road, active incidents on it, and historical closures.
- **Entry Points**: `/accessibility/map`.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Override Status" -> Opens modal to manually set OPEN/CLOSED.
- **Permissions**: `VIEW_ACCESSIBILITY`, `MANAGE_ACCESSIBILITY`
- **Required Data**: Road DTO, Incident list.
- **Loading State**: Skeleton list and map inset.
- **Empty State**: "No known incidents on this road."
- **Error State**: "Error retrieving road data."

### `/accessibility/routes/:routeId`
- **Purpose**: Pre-trip accessibility analysis for a predefined logical route.
- **Entry Points**: Sidebar (Saved Routes).
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Analyze Risk" -> Triggers AI check.
- **Permissions**: `VIEW_ACCESSIBILITY`
- **Required Data**: Route definition, Segment statuses.
- **Loading State**: Loading bar across route map.
- **Empty State**: N/A.
- **Error State**: "Route analysis failed."

---

## 5. AI Intelligence

### `/ai/predictions`
- **Purpose**: Dashboard dedicated to AI subsystem health, recent ETA recalculations, and model confidence tracking.
- **Entry Points**: Sidebar.
- **Child Navigation**: Model Accuracy tab, Recent Predictions tab.
- **Buttons/Actions**:
  - "Download Model Report" -> Exports PDF.
- **Permissions**: `VIEW_AI_METRICS`
- **Required Data**: Aggregated AI logs and accuracy metrics.
- **Loading State**: Chart skeleton loaders.
- **Empty State**: "No prediction data available for this period."
- **Error State**: "Could not connect to AI reporting service."

### `/ai/risk-corridors`
- **Purpose**: Map displaying predicted high-risk geographical corridors based on weather and terrain analysis.
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Click Corridor Polygon" -> Navigates to `/ai/risk-corridors/:corridorId`.
- **Permissions**: `VIEW_AI_METRICS`
- **Required Data**: RiskPrediction polygons/heatmaps.
- **Loading State**: "Generating heatmaps..."
- **Empty State**: "No elevated risk corridors detected."
- **Error State**: "Failed to fetch risk map."

### `/ai/risk-corridors/:corridorId`
- **Purpose**: Deep dive into the contributing factors (weather, elevation) of a specific risk corridor.
- **Entry Points**: `/ai/risk-corridors`.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Generate Alert" -> Manually trigger alert to field officers in the area.
- **Permissions**: `VIEW_AI_METRICS`, `MANAGE_ALERTS`
- **Required Data**: Detailed Risk factors.
- **Loading State**: Skeleton analysis layout.
- **Empty State**: N/A.
- **Error State**: "Corridor details unavailable."

### `/ai/routes`
- **Purpose**: Proactive AI optimization testing ground (What-if scenario building for specific paths without attaching a shipment).
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Run Optimization" -> Calls API.
- **Permissions**: `RUN_SIMULATION`
- **Required Data**: Origin/Destination inputs.
- **Loading State**: "Simulating routes..."
- **Empty State**: "Select Origin and Destination to begin."
- **Error State**: "Optimization engine timeout."

---

## 6. Incidents

### `/incidents`
- **Purpose**: Central ledger of all reported field incidents.
- **Entry Points**: Sidebar, Dashboard.
- **Child Navigation**: Filters (Reported, Verified, Resolved).
- **Buttons/Actions**:
  - "Click Row" -> Navigates to `/incidents/:incidentId`
- **Permissions**: `VIEW_INCIDENTS`
- **Required Data**: Incident paginated list.
- **Loading State**: Table skeleton.
- **Empty State**: "No incidents reported."
- **Error State**: "Failed to load incidents."

### `/incidents/:incidentId`
- **Purpose**: Detailed incident report with photos, exact GPS, and affected routes.
- **Entry Points**: `/incidents`, `/dashboard`.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Verify Incident" -> Changes status, triggers AI risk recalculation.
  - "Mark False Alarm" -> Closes incident.
- **Permissions**: `MANAGE_INCIDENTS`
- **Required Data**: Incident DTO, Image URLs.
- **Loading State**: Skeleton report card.
- **Empty State**: N/A.
- **Error State**: "Incident report corrupted or not found."

---

## 7. Emergency

### `/emergency`
- **Purpose**: Active emergency command center (only populated during declared EmergencyEvents).
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Declare Emergency" -> Opens creation modal.
  - "View Action Plan" -> Triggers modal/route.
- **Permissions**: `MANAGE_EMERGENCIES`
- **Required Data**: Active EmergencyEvents.
- **Loading State**: Red "Loading Command Center" banner.
- **Empty State**: "No active emergencies. System nominal."
- **Error State**: "Failed to load emergency status."

### `/emergency/simulation`
- **Purpose**: Sandbox environment to simulate catastrophic events (e.g., "Bridge X Collapses") and view AI-generated Emergency Action Plans.
- **Entry Points**: Sidebar, `/emergency`.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Execute Simulation" -> Runs the optimization models.
- **Permissions**: `RUN_SIMULATION`
- **Required Data**: Topology mock data.
- **Loading State**: "Running simulation models (this may take a minute)..."
- **Empty State**: "Configure simulation parameters to start."
- **Error State**: "Simulation engine encountered an error."

---

## 8. Analytics

### `/analytics`
- **Purpose**: High-level KPIs (On-time delivery rates, driver performance, fleet utilization).
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Detailed Reports" -> Navigates to `/analytics/reports`
- **Permissions**: `VIEW_ANALYTICS`
- **Required Data**: Aggregated analytical DTOs.
- **Loading State**: Dashboard skeletons.
- **Empty State**: "Not enough data collected for analytics."
- **Error State**: "Analytics service unreachable."

### `/analytics/reports`
- **Purpose**: Report generation and export interface.
- **Entry Points**: `/analytics`.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Generate CSV" -> Triggers download.
  - "Generate PDF" -> Triggers download.
- **Permissions**: `EXPORT_ANALYTICS`
- **Required Data**: Filter configurations.
- **Loading State**: "Compiling report..."
- **Empty State**: "No data matches the selected filters."
- **Error State**: "Failed to generate report."

---

## 9. Admin Settings

### `/admin/users`
- **Purpose**: Manage system users (Dispatchers, Admins, etc.).
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Create User" -> Opens modal.
  - "Edit User" -> Opens modal.
- **Permissions**: `MANAGE_USERS`
- **Required Data**: User list.
- **Loading State**: Skeleton table.
- **Empty State**: N/A (Admin must exist).
- **Error State**: "Failed to load user roster."

### `/admin/roles`
- **Purpose**: Manage RBAC roles and assign specific permissions.
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Edit Role" -> Opens modal with permission checkboxes.
- **Permissions**: `MANAGE_ROLES`
- **Required Data**: Roles and Permissions matrices.
- **Loading State**: Skeleton lists.
- **Empty State**: N/A.
- **Error State**: "Failed to fetch security matrix."

### `/admin/settings`
- **Purpose**: Global system configurations (e.g., default maps, warning thresholds).
- **Entry Points**: Sidebar.
- **Child Navigation**: None.
- **Buttons/Actions**:
  - "Save Settings" -> Submits PATCH to settings API.
- **Permissions**: `SUPER_ADMIN`
- **Required Data**: Global config keys.
- **Loading State**: Disabled form fields.
- **Empty State**: N/A.
- **Error State**: "Could not load system configurations."
