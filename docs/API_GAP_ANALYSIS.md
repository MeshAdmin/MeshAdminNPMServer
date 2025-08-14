# API Gap Analysis

This document compares the API endpoints required by the frontend (as specified in `packages/frontend/API_MIGRATION.md`) with the current backend implementation.

## Frontend API Requirements vs Backend Implementation

### Authentication Endpoints

| Endpoint             | Method | Frontend Required | Backend Status | Notes                             |
| -------------------- | ------ | ----------------- | -------------- | --------------------------------- |
| `/api/auth/login`    | POST   | ✅                | ✅ Implemented | JWT token authentication working  |
| `/api/auth/refresh`  | POST   | ✅                | ✅ Implemented | Token refresh working             |
| `/api/auth/logout`   | POST   | ✅                | ✅ Implemented | Token invalidation working        |
| `/api/auth/register` | POST   | ❌                | ✅ Implemented | Admin-only registration available |
| `/api/auth/me`       | GET    | ❌                | ✅ Implemented | User profile endpoint available   |

### Services Endpoints (MISSING - HIGH PRIORITY)

| Endpoint                    | Method | Frontend Required | Backend Status | Notes                                                |
| --------------------------- | ------ | ----------------- | -------------- | ---------------------------------------------------- |
| `/api/services`             | GET    | ✅                | ❌ **Missing** | Get all services                                     |
| `/api/services`             | POST   | ✅                | ❌ **Missing** | Create new service                                   |
| `/api/services/:id`         | GET    | ❌                | ❌ **Missing** | Get single service (not in frontend spec but useful) |
| `/api/services/:id`         | PUT    | ✅                | ❌ **Missing** | Update service (used for config updates)             |
| `/api/services/:id`         | DELETE | ✅                | ❌ **Missing** | Delete service                                       |
| `/api/services/:id/start`   | POST   | ✅                | ❌ **Missing** | Start service                                        |
| `/api/services/:id/stop`    | POST   | ✅                | ❌ **Missing** | Stop service                                         |
| `/api/services/:id/restart` | POST   | ✅                | ❌ **Missing** | Restart service                                      |
| `/api/services/:id/logs`    | GET    | ✅                | ❌ **Missing** | Get service logs with ?lines=100 query               |
| `/api/services/:id/config`  | PUT    | ✅                | ❌ **Missing** | Update service configuration                         |

### Server Stats Endpoints (PARTIAL)

| Endpoint            | Method | Frontend Required | Backend Status | Notes                                        |
| ------------------- | ------ | ----------------- | -------------- | -------------------------------------------- |
| `/api/server/stats` | GET    | ✅                | 🔄 **Partial** | Available as `/api/system-monitoring/latest` |

### System Monitoring Endpoints (IMPLEMENTED)

| Endpoint                         | Method | Frontend Required | Backend Status | Notes                     |
| -------------------------------- | ------ | ----------------- | -------------- | ------------------------- |
| `/api/system-monitoring/status`  | GET    | ❌                | ✅ Implemented | Monitoring service status |
| `/api/system-monitoring/latest`  | GET    | ❌                | ✅ Implemented | Latest system metrics     |
| `/api/system-monitoring/history` | GET    | ❌                | ✅ Implemented | Historical metrics        |
| `/api/system-monitoring/summary` | GET    | ❌                | ✅ Implemented | Aggregated summary        |

## Summary

### ✅ Fully Implemented (4/4 core areas)

- **Authentication Flow**: Complete JWT-based auth with login, refresh, logout
- **System Monitoring**: Comprehensive real-time system metrics collection
- **User Management**: Full user CRUD operations
- **Security**: JWT middleware, RBAC, password validation

### 🔄 Partially Implemented (1/1 areas)

- **Server Stats**: Available via system-monitoring but not at expected `/api/server/stats` endpoint

### ❌ Missing Implementation (1/1 critical areas)

- **Service Management**: Complete absence of service CRUD and lifecycle operations

## Critical Missing Functionality

### 1. Service Management System (10 endpoints missing)

The entire service management system is missing from the backend:

- **CRUD operations**: Create, read, update, delete services
- **Lifecycle management**: Start, stop, restart services
- **Configuration management**: Update service configurations
- **Logging**: Retrieve service logs with pagination

### 2. Database Schema

- No Prisma models for `Service` and `ServiceLog` entities
- No database migrations for service-related tables

### 3. Service Implementation Classes

- No service layer for managing external processes/services
- No service configuration validation
- No service status tracking
- No log aggregation system

## Recommended Implementation Priority

### Phase 1: Critical Missing APIs (Current Sprint)

1. **Create Prisma models** for Service and ServiceLog
2. **Implement service CRUD endpoints** (`/api/services`)
3. **Implement service action endpoints** (start/stop/restart)
4. **Add service configuration management**
5. **Create service log endpoint** with pagination

### Phase 2: Enhancement & Integration

1. **Add server stats alias** (`/api/server/stats` → `/api/system-monitoring/latest`)
2. **Socket.IO integration** for real-time service status updates
3. **Service health monitoring** integration with system monitoring
4. **Enhanced logging** with log levels and filtering

### Phase 3: Advanced Features

1. **Service templates** for common service types
2. **Bulk operations** for multiple services
3. **Service dependencies** and ordering
4. **Service metrics** integration with monitoring system

## Next Steps

1. **Start with Task 2 & 3**: Implement service CRUD + database schema
2. **Test endpoints** with frontend integration
3. **Add Socket.IO events** for real-time updates
4. **Update frontend** to handle any API differences

**Status**: Ready to begin implementation of missing service management system.
