# MeshAdminNPMServer

A modern full-stack administration panel for managing network services with real-time monitoring, service lifecycle management, and comprehensive logging capabilities.

## Features

- **Service Management**: Create, read, update, and delete network services
- **Real-time Monitoring**: Live service status updates and performance metrics
- **Authentication System**: JWT-based secure authentication with role-based access
- **Service Logs**: Comprehensive logging system with searchable service logs
- **Modern UI**: React-based responsive interface with TypeScript
- **API-First Design**: RESTful API backend with comprehensive endpoint coverage
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **CI/CD Pipeline**: Automated testing, building, and deployment with GitHub Actions

## Tech Stack

### Backend

- **Node.js** with **Express.js** framework
- **TypeScript** for type safety
- **Prisma ORM** with **PostgreSQL** database
- **Redis** for caching and session management
- **JWT** for authentication
- **Winston** for logging

### Frontend

- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **React Router** for navigation
- **React Query** for server state management
- **Tailwind CSS** for styling
- **Lucide React** for icons

### DevOps

- **Docker** and **Docker Compose** for containerization
- **GitHub Actions** for CI/CD
- **NGINX** for reverse proxy and static file serving
- **Snyk** for security vulnerability scanning

## Project Structure

```
MeshAdminNPMServer/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Prisma models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema and migrations
│   └── tests/              # Backend tests
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   └── tests/              # Frontend tests
├── deployment/             # Deployment configurations
├── .github/workflows/      # GitHub Actions CI/CD
├── docker-compose.dev.yml  # Development Docker setup
├── docker-compose.yml      # Production Docker setup
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Docker and Docker Compose
- PostgreSQL database
- Redis server

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/MeshAdminNPMServer.git
   cd MeshAdminNPMServer
   ```

2. **Environment Configuration**

   ```bash
   cp .env.example .env
   # Edit .env with your database and Redis credentials
   ```

3. **Install Dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   pnpm install
   ```

4. **Database Setup**

   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start Development Servers**

   ```bash
   # Backend (port 3001)
   cd backend
   npm run dev

   # Frontend (port 5173)
   cd frontend
   pnpm dev
   ```

### Docker Development Setup

1. **Start all services with Docker Compose**

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - Database: PostgreSQL on localhost:5432
   - Redis: localhost:6379

## API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/register` - Register new user (admin only)

### Service Management Endpoints

- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `POST /api/services/:id/start` - Start service
- `POST /api/services/:id/stop` - Stop service
- `POST /api/services/:id/restart` - Restart service

### Monitoring Endpoints

- `GET /api/stats` - Get server statistics
- `GET /api/services/:id/logs` - Get service logs
- `GET /api/services/:id/status` - Get service status

## Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/meshadmin"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server
NODE_ENV="development"
PORT="3001"

# Frontend (for Docker builds)
VITE_API_URL="http://localhost:3001/api"
```

## Testing

### Backend Tests

```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Tests

```bash
cd frontend
pnpm test
pnpm test:ui
pnpm test:coverage
```

## Deployment

### Production Deployment with Docker

1. **Build and deploy with Docker Compose**

   ```bash
   docker-compose up -d
   ```

2. **Or use the GitHub Actions CI/CD pipeline**
   - Push to `main` branch triggers automatic deployment
   - Includes testing, security scanning, and deployment to staging/production

### Manual Deployment

1. **Build the applications**

   ```bash
   # Backend
   cd backend
   npm run build

   # Frontend
   cd frontend
   pnpm build
   ```

2. **Deploy to your server**
   - Copy built files to your server
   - Configure NGINX or your web server
   - Set up process manager (PM2, systemd, etc.)

### Available Scripts

- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Fix linting issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm test` - Run tests in all packages

## Packages

### Frontend (`@meshadmin/frontend`)

- **Tech Stack**: React, TypeScript, Vite, Tailwind CSS
- **Port**: 5173 (default Vite port)
- **Features**: Modern React setup with hot reload

### Backend (`@meshadmin/backend`)

- **Tech Stack**: Express, TypeScript, Node.js
- **Port**: 3000 (configurable via PORT env var)
- **Features**: RESTful API with TypeScript support

### Shared (`@meshadmin/shared`)

- **Purpose**: Common types, interfaces, and utilities
- **Usage**: Imported by both frontend and backend packages
- **Features**: Type-safe API contracts

## Environment Configuration

This project uses `dotenv-flow` for hierarchical environment configuration:

1. `.env` - Default values
2. `.env.development` - Development overrides
3. `.env.local` - Local overrides (ignored by git)

## Code Quality

### ESLint & Prettier

- ESLint for code linting
- Prettier for code formatting
- Consistent configuration across all packages

### Husky & lint-staged

- Pre-commit hooks to ensure code quality
- Automatic linting and formatting on commit

## Development Workflow

1. Make changes to any package
2. Code is automatically formatted and linted on commit
3. Shared types can be used across frontend and backend
4. Hot reload works for both frontend and backend

## Production Build

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @meshadmin/frontend build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@meshadmin.com or create an issue in the GitHub repository.
