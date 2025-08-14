# Frontend API Migration

This document outlines the migration from mock data to live API using React Query and Axios with JWT authentication.

## Changes Made

### 1. Dependencies Added

- `@tanstack/react-query` - For data fetching and caching
- `axios` - For HTTP client with interceptors

### 2. New Files Created

#### `src/api/axios.js`

- Axios instance with JWT auth interceptor
- Automatic token inclusion in request headers
- Response interceptor for handling token expiration
- Base URL configuration via environment variables

#### `src/api/services.js`

- API service functions for all server operations
- Methods for services, server stats, and service actions
- Proper error handling and response formatting

#### `src/hooks/useServices.js`

- React Query hooks for data fetching and mutations
- `useServices()` - Fetch all services with auto-refresh
- `useServerStats()` - Fetch server statistics with real-time updates
- Service action hooks: `useStartService()`, `useStopService()`, `useRestartService()`
- CRUD operation hooks: `useCreateService()`, `useDeleteService()`, `useUpdateServiceConfig()`
- `useServiceLogs()` - Fetch service logs

### 3. App.tsx Modifications

- Replaced `useState` mock data with `useQuery` hooks
- Integrated React Query provider at the app root
- Updated service action handlers to use mutations
- Added loading and error states
- Structured component hierarchy for proper hook usage

### 4. Environment Configuration

- `.env` file with `VITE_API_BASE_URL` for API endpoint configuration
- Defaults to `http://localhost:3001/api`

## API Endpoints Expected

The frontend now expects the following API endpoints:

### Services

- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `POST /api/services/:id/start` - Start service
- `POST /api/services/:id/stop` - Stop service
- `POST /api/services/:id/restart` - Restart service
- `PUT /api/services/:id/config` - Update service configuration
- `DELETE /api/services/:id` - Delete service
- `GET /api/services/:id/logs?lines=100` - Get service logs

### Server Stats

- `GET /api/server/stats` - Get server statistics (CPU, memory, disk, network)

## Authentication

The frontend automatically includes JWT tokens in API requests:

- Token is expected to be stored in `localStorage` as `authToken`
- Authorization header: `Bearer <token>`
- Automatic token removal on 401 responses

## Data Refresh Intervals

- Services: 30 seconds
- Server stats: 5 seconds
- Service logs: 2 seconds (when viewing)

## Usage

The migration is complete and the app will now:

1. Make real API calls instead of using mock data
2. Handle loading and error states
3. Automatically refresh data at appropriate intervals
4. Provide optimistic updates for service actions
5. Include JWT authentication in all requests

## Environment Variables

Set the following in your `.env` file:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

Or set to your actual API server URL in production.
