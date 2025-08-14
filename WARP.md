# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

MeshAdminNPMServer is a modern full-stack administration panel for managing network services with real-time monitoring, service lifecycle management, and comprehensive logging capabilities. It features a monorepo architecture with an extensible plugin system, JWT-based authentication, and both web and Electron interfaces.

## Prerequisites and Environment

### Requirements

- **Node.js 18+** and **pnpm** package manager
- **Docker** and **Docker Compose** for containerized workflows
- **PostgreSQL** or **SQLite** for database (configurable)

### Environment Management

This project uses `dotenv-flow` for hierarchical environment configuration:

1. `.env` - Default values
2. `.env.development` - Development overrides
3. `.env.local` - Local overrides (ignored by git)

### Key Environment Variables

**Backend:**

- `PORT` - Server port (defaults to 3000)
- `DATABASE_URL` - Database connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - JWT expiration (default: 7d)
- `CORS_ORIGIN` - Allowed CORS origins
- `ACME_EMAIL` - Email for SSL certificate generation

**Frontend:**

- `VITE_API_URL` - Backend API base URL (e.g., http://localhost:3001/api)

### Default Ports

- **Backend**: 3000 (default), 3001 (Docker/production)
- **Frontend**: 5555 (development, Electron-optimized)
- **Docker**: 80/443 (frontend), 3001 (backend API)

## Common Development Commands

### Monorepo (Root Level)

```bash
# Start all packages in development mode (parallel)
pnpm dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint
pnpm lint:fix

# Format code with Prettier
pnpm format
pnpm format:check

# Run tests in all packages
pnpm test

# Electron development (frontend + backend + Electron)
pnpm dev:electron

# Electron builds
pnpm electron:build          # All platforms
pnpm electron:build:mac      # macOS only
pnpm electron:build:win      # Windows only
pnpm electron:build:linux    # Linux only
```

### Frontend (@meshadmin/frontend)

```bash
# Development server (http://localhost:5555)
pnpm --filter @meshadmin/frontend dev

# Build for production
pnpm --filter @meshadmin/frontend build

# Preview production build
pnpm --filter @meshadmin/frontend preview

# Lint
pnpm --filter @meshadmin/frontend lint

# Tests
pnpm --filter @meshadmin/frontend test
pnpm --filter @meshadmin/frontend test:run
pnpm --filter @meshadmin/frontend test:coverage
```

### Backend (@meshadmin/backend)

```bash
# Development server with hot reload
pnpm --filter @meshadmin/backend dev

# Build TypeScript to JavaScript
pnpm --filter @meshadmin/backend build

# Start compiled application
pnpm --filter @meshadmin/backend start

# Lint
pnpm --filter @meshadmin/backend lint
pnpm --filter @meshadmin/backend lint:fix

# Database operations
pnpm --filter @meshadmin/backend db:generate  # Generate Prisma client
pnpm --filter @meshadmin/backend db:migrate   # Run migrations
pnpm --filter @meshadmin/backend db:seed      # Seed database

# Tests
pnpm --filter @meshadmin/backend test
pnpm --filter @meshadmin/backend test:watch
pnpm --filter @meshadmin/backend test:coverage

# Utility scripts
pnpm --filter @meshadmin/backend test:db          # Test database connection
pnpm --filter @meshadmin/backend test:monitoring  # Test system monitoring
```

### Shared (@meshadmin/shared)

```bash
# Build shared types and utilities
pnpm --filter @meshadmin/shared build
```

## Architecture Overview

### Monorepo Structure

- **Frontend**: React 18 + Vite + Tailwind CSS + React Query + TypeScript
- **Backend**: Express.js + Prisma ORM + Redis + Socket.IO + TypeScript
- **Shared**: Common types, interfaces, and utilities

### Backend Boot Sequence

The backend initialization follows this sequence (see `packages/backend/src/index.ts`):

1. **Server Setup**: Express + HTTP server + Socket.IO
2. **Database**: Connect via `databaseService.connect()`
3. **Redis**: Initialize (non-blocking, retries in background)
4. **Plugin System**: Load and initialize plugins from `src/plugins/`
5. **Socket.IO**: Configure rooms (system-monitoring active, package-manager disabled)
6. **Services**: Start system monitoring, autonomous testing, ACME service
7. **Middleware**: Security (helmet), CORS, parsing, authentication (passport), tracing
8. **Routes**: `/api` endpoints, root health check, error handlers
9. **Graceful Shutdown**: Cleanup all services in reverse order

### Key Services

- **databaseService**: Prisma client lifecycle and health checks
- **systemMonitoringService**: Real-time system metrics via Socket.IO
- **acmeService**: SSL certificate issuance and renewal
- **redisService**: Caching and session management
- **notificationService**: Error notifications and alerts
- **pluginManager**: Dynamic plugin loading and management

### Plugin System

The backend features an extensible plugin architecture:

- **Location**: Plugins in `src/plugins/` with `.plugin.ts` suffix
- **Interface**: Implement `Plugin` interface with hooks (routes, menus, events)
- **Context**: Access to Express app, Socket.IO, Prisma client, and logger
- **Routes**: Plugins can register endpoints under `/api/plugins/{plugin-name}/`
- **Management**: APIs for enable/disable, configuration, and reloading

See [packages/backend/PLUGIN_SYSTEM.md](packages/backend/PLUGIN_SYSTEM.md) for complete plugin development guide.

### Path Aliases (Backend)

- `@api/*` → `src/api/*`
- `@services/*` → `src/services/*`
- `@plugins/*` → `src/plugins/*`
- `@lib/*` → `src/lib/*`
- `@config/*` → `src/config/*`

## Database and Prisma Workflow

### Current Configuration

- **Provider**: SQLite (in `schema.prisma`)
- **Client Output**: `../src/generated/prisma`
- **Models**: Users, Services, Certificates, Plugins, Logs, Metrics

### Development Workflow

```bash
# Generate Prisma client after schema changes
pnpm --filter @meshadmin/backend db:generate

# Create and apply migrations
pnpm --filter @meshadmin/backend db:migrate

# Seed database with initial data
pnpm --filter @meshadmin/backend db:seed
```

### Docker Database Setup

**Important**: There's a provider mismatch to resolve:

- `schema.prisma` uses SQLite
- `docker-compose.yml` configures PostgreSQL

**Resolution Options**:

1. **Use PostgreSQL** (recommended for production):

   ```bash
   # Change datasource provider in packages/backend/prisma/schema.prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   # Then regenerate and migrate
   pnpm --filter @meshadmin/backend db:generate
   pnpm --filter @meshadmin/backend db:migrate
   ```

2. **Use SQLite in Docker**:
   Update `docker-compose.yml` backend service to use SQLite URL and add volume for persistence.

### Health Checks

The `databaseService.healthCheck()` is used in the root `/` endpoint response.

## Testing Strategy

### Backend Testing (Jest + ts-jest)

- **Configuration**: `packages/backend/jest.config.js`
- **Test Roots**: `src/` and `tests/`
- **Setup**: `tests/setup.ts`
- **Coverage**: Excludes `src/index.ts`

```bash
# Run tests
pnpm --filter @meshadmin/backend test

# Watch mode
pnpm --filter @meshadmin/backend test:watch

# With coverage
pnpm --filter @meshadmin/backend test:coverage
```

**Testing Recommendations**:

- Use `supertest` for API endpoint testing
- Mock Prisma via dependency injection or test database
- Test Socket.IO events in integration tests
- Test plugins via isolated router with `pluginManager`

### Frontend Testing (Vitest + Testing Library)

- **Configuration**: `vite.config.ts` (test section)
- **Environment**: jsdom
- **Setup**: `src/test/setup.ts`

```bash
# Run tests
pnpm --filter @meshadmin/frontend test

# Single run
pnpm --filter @meshadmin/frontend test:run

# With coverage
pnpm --filter @meshadmin/frontend test:coverage
```

**Testing Recommendations**:

- Component tests for hooks (React Query) and UI components
- Mock network requests via axios mocks or MSW
- Keep Electron-specific behavior abstracted for easier testing

## Docker and Deployment

### Docker Compose Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

**Services**:

- **postgres**: PostgreSQL 15-alpine with health checks
- **redis**: Redis 7-alpine with persistence and optional password
- **backend**: Built from `Dockerfile.backend`, exposes port 3001
- **frontend**: Built from `Dockerfile.frontend`, exposes ports 80/443

### Environment Configuration

- `VITE_API_URL`: Must match backend API route for frontend build
- `CORS_ORIGIN`: Must match frontend origin for proper CORS
- Database and Redis URLs must be accessible from containers

### Electron Packaging

```bash
# Build all packages first
pnpm build

# Package for specific platforms
pnpm electron:build:mac     # Creates .dmg and .zip
pnpm electron:build:win     # Creates .exe installer and portable
pnpm electron:build:linux   # Creates .AppImage and .deb
```

Icons and resources are stored in the `resources/` directory.

## Architectural Patterns

### TypeScript Configuration

- **Backend**: CommonJS modules (`"type": "commonjs"`)
- **Frontend**: ES modules (`"type": "module"`)
- **Shared**: ES modules with dual CJS/ESM support

### Logging and Error Handling

- **Winston**: Structured logging with daily rotation
- **Trace Middleware**: Injects `traceId` for request correlation
- **ResponseHelper**: Standardized API response format
- **Global Error Handler**: Logs errors and notifies via `notificationService`

### Authentication and Security

- **Passport JWT**: Token-based authentication
- **Helmet**: Security headers
- **CORS**: Configurable origin restrictions
- **Input Validation**: Express-validator for API endpoints

### Real-time Communication

- **Socket.IO Rooms**:
  - `system-monitoring`: Active for metrics updates
  - `package-manager`: Reserved for future use
- **Client Usage**: Join/leave rooms explicitly, receive targeted updates

### Code Quality

- **ESLint + Prettier**: Unified configuration across packages
- **Husky + lint-staged**: Pre-commit hooks for code quality
- **Path Aliases**: Consistent import paths in backend

## Known Pitfalls and TODOs

### Database Provider Mismatch

- **Issue**: `schema.prisma` uses SQLite, but `docker-compose.yml` configures PostgreSQL
- **Resolution**: Choose one provider and align schema + environment configuration
- **Recommendation**: Use PostgreSQL for production, SQLite for local development

### Health Check Endpoint

- **Issue**: `docker-compose.yml` expects `/health` endpoint, but backend doesn't expose it
- **Resolution**: Either implement `GET /health` route or update Docker health check to use `/`

### Frontend Development Port

- **Current**: Frontend dev server uses port 5555 (Electron-optimized)
- **Note**: Some older documentation may reference port 5173

### Package Manager Service

- **Status**: Currently disabled in backend code
- **Socket.IO Room**: `package-manager` room exists but unused
- **TODO**: If re-enabling, document configuration and event emissions

### Electron Development

- **Dependency**: `dev:electron` script waits for `http://localhost:5555`
- **Requirement**: Ensure frontend dev server is healthy before Electron starts

### Security Considerations

- Verify admin-only protection on plugin management endpoints
- Validate plugin configurations according to PLUGIN_SYSTEM.md guidelines
- Ensure proper input sanitization for all user-facing APIs

## Reference Links

- **Plugin Development**: [packages/backend/PLUGIN_SYSTEM.md](packages/backend/PLUGIN_SYSTEM.md)
- **Electron Entry Point**: `electron/main.cjs`
- **Icons and Assets**: `resources/` directory
- **CI/CD Configuration**: `.github/workflows/ci-cd.yml`

## Running a Single Test

```bash
# Backend - specific test file
pnpm --filter @meshadmin/backend test -- --testPathPattern="user.service.test"

# Frontend - specific test file
pnpm --filter @meshadmin/frontend test -- src/components/auth/LoginPage.test.tsx

# Backend - tests matching pattern
pnpm --filter @meshadmin/backend test -- --testNamePattern="should create user"
```

This covers the essential commands, architecture, and gotchas for productive development in this codebase.
