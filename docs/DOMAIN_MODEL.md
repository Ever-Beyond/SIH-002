# NER-SHIELD: Domain Model
AI-Based Smart Logistics and Accessibility Intelligence Platform

## Layer Distinctions Overview
Before defining the entities, we establish strict boundaries between how data is represented across the stack:
- **Database Entity**: The TypeORM/Prisma class that maps exactly to PostgreSQL tables. Uses PostGIS types (`geometry`, `geography`) for spatial data.
- **API DTO (Data Transfer Object)**: The NestJS class used for incoming/outgoing REST payloads. Uses `class-validator` (e.g., parsing GeoJSON points to DB geometries). Never exposes internal DB fields like raw passwords or internal flags.
- **Frontend Type**: TypeScript `interface` or `type` used in React/React Native. Uses standard GeoJSON formats for maps rather than raw WKB/WKT geometries.
- **AI Feature**: The representation of the data when consumed by the Python FastAPI engine. Often transformed into Pandas DataFrames, Numpy arrays, or GeoPandas GeoDataFrames for ML tensor operations.

---

## 1. User
**Purpose**: Represents a human interacting with the system (Admin, Dispatcher, Field Officer). Drivers also have users but are linked to a specific Driver profile.
**Relationships**: Many-to-One with Role.
**Indexes**: Unique index on `email`.
**Fields**:
- `id` (UUID, Required)
- `email` (String, Required)
- `passwordHash` (String, Required, DB only)
- `firstName` (String, Required)
- `lastName` (String, Required)
- `roleId` (UUID, Required)
- `isActive` (Boolean, Required, default: true)
- `createdAt`, `updatedAt` (DateTime, Required)

## 2. Role
**Purpose**: Defines a group of users with specific access rights.
**Relationships**: One-to-Many with User. Many-to-Many with Permission.
**Indexes**: Unique index on `name`.
**Fields**:
- `id` (UUID, Required)
- `name` (String, Required) e.g., 'SUPER_ADMIN', 'DISPATCHER'
- `description` (String, Optional)

## 3. Permission
**Purpose**: Granular access rights to specific system actions.
**Relationships**: Many-to-Many with Role.
**Fields**:
- `id` (UUID, Required)
- `action` (String, Required) e.g., 'CREATE_SHIPMENT', 'APPROVE_REROUTE'
- `resource` (String, Required) e.g., 'SHIPMENT', 'ROUTE'

## 4. Vehicle
**Purpose**: Represents a physical truck/asset in the fleet.
**Status Values**: `AVAILABLE`, `IN_TRANSIT`, `MAINTENANCE`, `OUT_OF_SERVICE`.
**Relationships**: One-to-Many with Shipment.
**Indexes**: Unique index on `licensePlate`.
**Fields**:
- `id` (UUID, Required)
- `licensePlate` (String, Required)
- `capacityKg` (Float, Required)
- `vehicleType` (String, Required)
- `status` (Enum, Required)

## 5. Driver
**Purpose**: Represents a fleet driver. Linked to a user account for auth.
**Status Values**: `ON_DUTY`, `OFF_DUTY`, `ON_LEAVE`.
**Relationships**: One-to-One with User. One-to-Many with Shipment.
**Indexes**: Unique index on `licenseNumber`.
**Fields**:
- `id` (UUID, Required)
- `userId` (UUID, Required)
- `licenseNumber` (String, Required)
- `phone` (String, Required)
- `status` (Enum, Required)

## 6. VehicleLocation
**Purpose**: Ephemeral entity storing the high-frequency GPS ping of a vehicle. Mostly resides in Redis, but flushed to PostgreSQL for history.
**Geospatial**: `coordinates` (PostGIS `Point`, SRID 4326).
**Indexes**: Spatial index (GIST) on `coordinates`. B-Tree index on `vehicleId` + `timestamp`.
**Fields**:
- `id` (UUID, Required)
- `vehicleId` (UUID, Required)
- `coordinates` (Point, Required)
- `speedKmh` (Float, Required)
- `heading` (Float, Optional)
- `timestamp` (DateTime, Required)

## 7. Shipment
**Purpose**: A logistical job assigning a vehicle and driver to move cargo from Origin to Destination.
**Status Values**: `PENDING`, `ASSIGNED`, `IN_TRANSIT`, `DELIVERED`, `DELAYED`, `CANCELLED`.
**Geospatial**: `origin`, `destination` (PostGIS `Point`).
**Relationships**: Many-to-One with Vehicle, Driver, Route.
**Fields**:
- `id` (UUID, Required)
- `vehicleId` (UUID, Required)
- `driverId` (UUID, Required)
- `activeRouteId` (UUID, Optional)
- `origin` (Point, Required)
- `destination` (Point, Required)
- `cargoDescription` (String, Required)
- `weightKg` (Float, Required)
- `status` (Enum, Required)
- `scheduledDeparture` (DateTime, Required)
- `actualDeparture`, `actualArrival` (DateTime, Optional)

## 8. Road
**Purpose**: A logical highway or main road (e.g., NH-10). Composed of RoadSegments.
**Relationships**: One-to-Many with RoadSegment.
**Fields**:
- `id` (UUID, Required)
- `name` (String, Required)
- `type` (String, Required) e.g., 'HIGHWAY', 'STATE_ROAD'

## 9. RoadSegment
**Purpose**: A topological edge on the map representing a specific stretch of road. Used by the AI to calculate granular Risk Scores.
**Geospatial**: `path` (PostGIS `LineString`).
**Indexes**: Spatial index (GIST) on `path`.
**Relationships**: Many-to-One with Road.
**AI Feature**: Highly utilized in AI for Disruption modeling based on terrain gradients and historical incidents.
**Fields**:
- `id` (UUID, Required)
- `roadId` (UUID, Required)
- `path` (LineString, Required)
- `lengthKm` (Float, Required)
- `elevationGradient` (Float, Optional)
- `baseRiskMultiplier` (Float, Required, default 1.0)

## 10. Route
**Purpose**: A specific geographic path assigned to a shipment, consisting of multiple road segments.
**Geospatial**: `fullPath` (PostGIS `LineString`).
**Relationships**: One-to-Many with RouteAlternative. Many-to-Many with RoadSegment.
**Fields**:
- `id` (UUID, Required)
- `shipmentId` (UUID, Required)
- `fullPath` (LineString, Required)
- `totalDistanceKm` (Float, Required)
- `estimatedDurationMins` (Integer, Required)
- `isActive` (Boolean, Required)

## 11. RouteAlternative
**Purpose**: An alternative route generated by the AI optimization engine when a disruption occurs. Requires human approval.
**Status Values**: `PROPOSED`, `APPROVED`, `REJECTED`.
**Relationships**: Many-to-One with Route (Parent).
**Fields**:
- `id` (UUID, Required)
- `parentRouteId` (UUID, Required)
- `proposedPath` (LineString, Required)
- `reason` (String, Required) e.g., 'Avoid Landslide on NH-10'
- `status` (Enum, Required)
- `approvalUserId` (UUID, Optional)

## 12. Incident
**Purpose**: A real-world event (e.g., Landslide, Accident) reported by Field Officers or external feeds.
**Status Values**: `REPORTED`, `VERIFIED`, `RESOLVED`, `FALSE_ALARM`.
**Geospatial**: `location` (PostGIS `Point` or `Polygon`).
**Indexes**: Spatial index (GIST) on `location`.
**Relationships**: Many-to-One with User (Reporter).
**AI Feature**: Triggers AI recalculation of Risk Scores for overlapping/nearby RoadSegments.
**Fields**:
- `id` (UUID, Required)
- `reporterId` (UUID, Required)
- `location` (Point, Required)
- `type` (String, Required) e.g., 'LANDSLIDE', 'ROAD_CLOSURE'
- `severity` (Enum: LOW, MED, HIGH, CRITICAL, Required)
- `status` (Enum, Required)
- `photoUrl` (String, Optional)
- `description` (String, Optional)

## 13. WeatherRecord
**Purpose**: Historical and real-time weather data associated with locations.
**Geospatial**: `location` (PostGIS `Point`).
**AI Feature**: Major tensor input for Disruption Prediction models.
**Fields**:
- `id` (UUID, Required)
- `location` (Point, Required)
- `temperatureC` (Float, Required)
- `precipitationMm` (Float, Required)
- `visibilityMeters` (Float, Required)
- `timestamp` (DateTime, Required)

## 14. AccessibilityStatus
**Purpose**: The current drivability state of a specific RoadSegment.
**Status Values**: `OPEN`, `RESTRICTED`, `CLOSED`.
**Relationships**: One-to-One with RoadSegment.
**Fields**:
- `id` (UUID, Required)
- `roadSegmentId` (UUID, Required)
- `status` (Enum, Required)
- `lastUpdated` (DateTime, Required)
- `updatedBy` (UUID, Optional)

## 15. RiskPrediction
**Purpose**: Output from the Python AI Service. Stores the predicted risk of a disruption on a segment.
**Relationships**: Many-to-One with RoadSegment.
**AI Feature**: The direct output DTO from FastAPI model inference.
**Fields**:
- `id` (UUID, Required)
- `roadSegmentId` (UUID, Required)
- `riskScore` (Float 0-1, Required)
- `confidence` (Float 0-1, Required)
- `predictedAt` (DateTime, Required)
- `validUntil` (DateTime, Required)

## 16. ETAPrediction
**Purpose**: AI-revised Estimated Time of Arrival for a Shipment based on risk and weather.
**Relationships**: Many-to-One with Shipment.
**Fields**:
- `id` (UUID, Required)
- `shipmentId` (UUID, Required)
- `originalEta` (DateTime, Required)
- `predictedEta` (DateTime, Required)
- `confidence` (Float 0-1, Required)
- `calculatedAt` (DateTime, Required)

## 17. Alert
**Purpose**: A system-generated warning based on incidents, AI predictions, or delays.
**Status Values**: `UNREAD`, `ACKNOWLEDGED`, `DISMISSED`.
**Relationships**: Many-to-One with User or Shipment.
**Fields**:
- `id` (UUID, Required)
- `type` (String, Required) e.g., 'RISK_THRESHOLD_EXCEEDED', 'SHIPMENT_DELAY'
- `message` (String, Required)
- `severity` (Enum, Required)
- `status` (Enum, Required)

## 18. Notification
**Purpose**: The actual delivery payload for an Alert (Push/WebSocket).
**Fields**:
- `id` (UUID, Required)
- `alertId` (UUID, Required)
- `channel` (String, Required) e.g., 'FCM', 'WSS'
- `deliveredAt` (DateTime, Optional)

## 19. EmergencyEvent
**Purpose**: A high-level crisis orchestrating multiple incidents (e.g., "Monsoon Floods 2026"). Can be real or a simulation.
**Status Values**: `DRAFT` (Simulation), `ACTIVE`, `CONTAINED`, `CLOSED`.
**Geospatial**: `affectedArea` (PostGIS `Polygon`).
**Fields**:
- `id` (UUID, Required)
- `name` (String, Required)
- `affectedArea` (Polygon, Required)
- `isSimulation` (Boolean, Required, default false)
- `status` (Enum, Required)

## 20. EmergencyActionPlan
**Purpose**: Optimization engine output recommending actions (e.g., mass reroutes) for an EmergencyEvent. Requires Admin approval.
**Status Values**: `PENDING_REVIEW`, `APPROVED`, `EXECUTED`, `REJECTED`.
**Relationships**: Many-to-One with EmergencyEvent.
**Fields**:
- `id` (UUID, Required)
- `emergencyEventId` (UUID, Required)
- `recommendedActions` (JSONB, Required)
- `status` (Enum, Required)

## 21. AuditLog
**Purpose**: Immutable ledger of critical actions (RBAC enforcement, route approvals).
**Indexes**: B-Tree on `userId`, `action`.
**Fields**:
- `id` (UUID, Required)
- `userId` (UUID, Required)
- `action` (String, Required)
- `entityType` (String, Required) e.g., 'ROUTE_ALTERNATIVE'
- `entityId` (UUID, Required)
- `oldPayload` (JSONB, Optional)
- `newPayload` (JSONB, Optional)
- `timestamp` (DateTime, Required)
