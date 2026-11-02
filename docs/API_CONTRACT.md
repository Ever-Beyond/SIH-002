# NER-SHIELD: API Contract Specification
Base URL: `/api/v1`

## General Conventions
- **Authentication**: Bearer JWT in the `Authorization` header.
- **Response Wrapper**: All successful responses are wrapped in `{ "data": T, "meta"?: MetaType }`.
- **Error Wrapper**: Errors return `{ "error": { "code": String, "message": String, "details"?: Array } }`.
- **Pagination**: Query params `?page=1&limit=20`. Meta returns `{ "total", "page", "limit", "totalPages" }`.
- **Sorting**: Query params `?sortBy=createdAt&sortOrder=DESC`.

---

## 1. Authentication

### `POST /auth/login`
- **Purpose**: Authenticate user and return JWTs.
- **Auth Requirements**: None
- **Request Body**: `{ "email": "user@example.com", "password": "password" }`
- **Response (200)**: `{ "data": { "accessToken": "jwt...", "refreshToken": "jwt...", "user": { ... } } }`
- **Errors**: `400 Bad Request`, `401 Unauthorized`

### `POST /auth/refresh`
- **Purpose**: Get a new access token using a refresh token.
- **Auth Requirements**: None (Expects Refresh Token in body or HttpOnly cookie)
- **Request Body**: `{ "refreshToken": "jwt..." }`
- **Response (200)**: `{ "data": { "accessToken": "jwt..." } }`
- **Errors**: `401 Unauthorized`

---

## 2. Users

### `GET /users`
- **Auth / Role**: Required / `MANAGE_USERS`
- **Query Params**: `page`, `limit`, `roleId`, `isActive`, `sortBy`, `sortOrder`
- **Response (200)**: Paginated array of Users.
- **Errors**: `401`, `403`

### `POST /users`
- **Auth / Role**: Required / `SUPER_ADMIN`
- **Request Body**: `{ "email", "password", "firstName", "lastName", "roleId" }`
- **Response (201)**: Created User DTO.

---

## 3. Roles

### `GET /roles`
- **Auth / Role**: Required / `MANAGE_ROLES`
- **Response (200)**: Array of Role DTOs with their Permissions.

---

## 4. Vehicles

### `GET /vehicles`
- **Auth / Role**: Required / `VIEW_FLEET`
- **Query Params**: `page`, `limit`, `status`, `type`
- **Response (200)**: Paginated array of Vehicles.

### `POST /vehicles`
- **Auth / Role**: Required / `MANAGE_FLEET`
- **Request Body**: `{ "licensePlate", "capacityKg", "vehicleType" }`
- **Response (201)**: Vehicle DTO.

---

## 5. Drivers

### `GET /drivers`
- **Auth / Role**: Required / `VIEW_DRIVERS`
- **Query Params**: `page`, `limit`, `status`
- **Response (200)**: Paginated array of Drivers.

### `POST /drivers`
- **Auth / Role**: Required / `MANAGE_DRIVERS`
- **Request Body**: `{ "userId", "licenseNumber", "phone" }`
- **Response (201)**: Driver DTO.

---

## 6. GPS

### `POST /gps/batch`
- **Purpose**: Mobile apps send bulk GPS pings to preserve battery/network.
- **Auth / Role**: Required / `DRIVER_APP`
- **Request Body**: `{ "vehicleId", "locations": [ { "lat", "lng", "speed", "timestamp" } ] }`
- **Response (202 Accepted)**: `{ "data": { "processed": Integer } }`
- **Errors**: `400`, `401`

---

## 7. Shipments

### `GET /shipments`
- **Auth / Role**: Required / `VIEW_SHIPMENTS`
- **Query Params**: `page`, `limit`, `status`, `driverId`, `vehicleId`, `sortBy`
- **Response (200)**: Paginated shipments.

### `POST /shipments`
- **Auth / Role**: Required / `CREATE_SHIPMENT`
- **Request Body**: `{ "vehicleId", "driverId", "origin": GeoJSON, "destination": GeoJSON, "cargoDescription", "weightKg", "scheduledDeparture" }`
- **Response (201)**: Shipment DTO.

### `PATCH /shipments/:id/status`
- **Auth / Role**: Required / `UPDATE_SHIPMENT`
- **Path Params**: `id` (UUID)
- **Request Body**: `{ "status" }`
- **Response (200)**: Updated Shipment DTO.

---

## 8. Incidents

### `POST /incidents`
- **Auth / Role**: Required / `REPORT_INCIDENT`
- **Request Body**: `{ "location": GeoJSON, "type", "severity", "photoUrl", "description", "timestamp" }`
- **Response (201)**: Incident DTO.

### `GET /incidents`
- **Auth / Role**: Required / `VIEW_INCIDENTS`
- **Query Params**: `page`, `limit`, `status`, `severity`, `bbox` (bounding box for map)
- **Response (200)**: Paginated Incident DTOs.

---

## 9. Roads

### `GET /roads`
- **Auth / Role**: Required / `VIEW_ACCESSIBILITY`
- **Query Params**: `page`, `limit`, `type`
- **Response (200)**: Paginated Roads with RoadSegments.

---

## 10. Routes

### `GET /routes/:id/alternatives`
- **Auth / Role**: Required / `VIEW_FLEET`
- **Path Params**: `id` (Route UUID)
- **Response (200)**: Array of RouteAlternative DTOs.

### `POST /routes/alternatives/:altId/approve`
- **Auth / Role**: Required / `APPROVE_REROUTE`
- **Path Params**: `altId` (UUID)
- **Response (200)**: Updated Route DTO.

---

## 11. Accessibility

### `PATCH /accessibility/:roadSegmentId`
- **Auth / Role**: Required / `MANAGE_ACCESSIBILITY`
- **Path Params**: `roadSegmentId` (UUID)
- **Request Body**: `{ "status": "OPEN|RESTRICTED|CLOSED" }`
- **Response (200)**: Updated AccessibilityStatus DTO.

---

## 12. Weather

### `GET /weather`
- **Auth / Role**: Required / `VIEW_DASHBOARD`
- **Query Params**: `lat`, `lng`, `radiusKm`
- **Response (200)**: Array of WeatherRecord DTOs near location.

---

## 13. AI Predictions

### `GET /ai/risk-corridors`
- **Auth / Role**: Required / `VIEW_AI_METRICS`
- **Query Params**: `bbox` (bounding box)
- **Response (200)**: Array of RiskPrediction GeoJSON Polygons/Segments.

### `POST /internal/ai/predict-risk`
- *Note: Called internally by NestJS to Python FastAPI.*
- **Request Body**: `{ "roadSegmentId", "weatherData", "recentIncidents" }`
- **Response (200)**: `{ "riskScore": Float, "confidence": Float }`

---

## 14. ETA

### `GET /shipments/:id/eta`
- **Auth / Role**: Required / `VIEW_SHIPMENTS`
- **Path Params**: `id` (Shipment UUID)
- **Response (200)**: ETAPrediction DTO.

---

## 15. Alerts

### `GET /alerts`
- **Auth / Role**: Required / `VIEW_ALERTS`
- **Query Params**: `status`, `severity`, `page`, `limit`
- **Response (200)**: Paginated Alert DTOs.

### `PATCH /alerts/:id/dismiss`
- **Auth / Role**: Required / `MANAGE_ALERTS`
- **Path Params**: `id` (UUID)
- **Response (200)**: Alert DTO (status = DISMISSED).

---

## 16. Notifications

### `POST /notifications/push`
- **Auth / Role**: Required / Internal System User
- **Request Body**: `{ "userId", "title", "body", "dataPayload" }`
- **Response (202)**: FCM delivery receipt.

---

## 17. Emergency

### `POST /emergency`
- **Auth / Role**: Required / `MANAGE_EMERGENCIES`
- **Request Body**: `{ "name", "affectedArea": GeoJSON, "isSimulation" }`
- **Response (201)**: EmergencyEvent DTO.

### `GET /emergency/:id/action-plans`
- **Auth / Role**: Required / `MANAGE_EMERGENCIES`
- **Path Params**: `id` (UUID)
- **Response (200)**: Array of EmergencyActionPlan DTOs.

---

## 18. Analytics

### `GET /analytics/kpi`
- **Auth / Role**: Required / `VIEW_ANALYTICS`
- **Query Params**: `startDate`, `endDate`
- **Response (200)**: `{ "onTimeDeliveryRate", "activeFleetUtilization", "aiPredictionAccuracy" }`

---

## 19. Audit Logs

### `GET /audit-logs`
- **Auth / Role**: Required / `SUPER_ADMIN`
- **Query Params**: `userId`, `action`, `entityType`, `page`, `limit`, `startDate`, `endDate`
- **Response (200)**: Paginated AuditLog DTOs.
