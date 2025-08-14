# Package Manager Module Implementation

## Overview

This document describes the implementation of Step 7: NPM package management module that uses `npm` / `pnpm` CLI via child_process with real-time streaming and emits progress events over WebSocket.

## Components Implemented

### 1. Type Definitions (`src/types/package-manager.ts`)

Comprehensive TypeScript types for package management operations:

- `PackageManagerType`: Support for npm, pnpm, and yarn package managers
- `PackageManagerConfig`: Configuration interface for package manager settings
- `PackageManagerOperation`: Tracking operation state with progress and output
- `PackageManagerProgress`: Real-time progress data for WebSocket events
- `OutdatedPackage`: Structured data for outdated package information
- `InstallOptions`, `UpgradeOptions`, `RemoveOptions`: Configuration options for operations

### 2. Package Manager Service (`src/services/package-manager.service.ts`)

Core service implementing package management functionality:

#### Key Features:

- **Auto-detection**: Automatically detects package manager type based on lock files
- **Real-time streaming**: Uses child_process.spawn for streaming command output
- **Progress tracking**: Tracks operation progress with incremental updates
- **Event emission**: Extends EventEmitter for custom progress events
- **WebSocket integration**: Emits progress events via Socket.IO
- **Error handling**: Comprehensive error handling with operation state management

#### Methods:

- `listOutdated()`: Lists outdated packages with JSON parsing
- `install(packages, options)`: Installs packages with customizable options
- `upgrade(packages, options)`: Upgrades packages (all or specific)
- `remove(packages, options)`: Removes packages with options
- `getAllOperations()`: Retrieves all operation history
- `getOperation(id)`: Gets specific operation by ID
- `clearCompletedOperations()`: Cleans up completed operations

#### Real-time Features:

- Streaming stdout/stderr from child processes
- Progressive percentage updates during operations
- WebSocket event emission for live progress updates
- Operation timeout handling

### 3. REST API Endpoints (`src/api/package-manager.ts`)

Comprehensive REST API with JWT authentication:

#### Implemented Endpoints:

1. **GET `/api/package-manager/outdated`**
   - Lists all outdated packages
   - Returns structured package information with current/wanted/latest versions

2. **POST `/api/package-manager/install`**
   - Installs specified packages
   - Supports dev, global, exact, and save options
   - Request validation with express-validator

3. **POST `/api/package-manager/upgrade`**
   - Upgrades packages (all or specified list)
   - Supports latest and interactive options

4. **DELETE `/api/package-manager/remove`**
   - Removes specified packages
   - Supports global removal option

5. **GET `/api/package-manager/operations`**
   - Lists all package manager operations
   - Includes operation status and progress

6. **GET `/api/package-manager/operations/:operationId`**
   - Gets specific operation details
   - UUID validation for operation ID

7. **DELETE `/api/package-manager/operations/completed`**
   - Clears completed operations
   - Returns count of cleared operations

8. **GET `/api/package-manager/info`**
   - Returns package manager configuration
   - Shows active operations count

### 4. WebSocket Integration (`src/index.ts`)

Socket.IO server integration for real-time progress updates:

#### Features:

- Client connection management
- Room-based messaging for package-manager events
- Real-time progress event broadcasting
- Client join/leave room functionality

#### Events:

- `package-manager:progress`: Real-time operation progress
- Connection/disconnection logging
- Room management for targeted messaging

### 5. Dependencies Added

Updated `package.json` with required dependencies:

- `socket.io`: WebSocket server for real-time communication
- `express-validator`: Request validation middleware
- `@types/socket.io`: TypeScript definitions

### 6. Test Suite (`src/services/__tests__/package-manager.service.test.ts`)

Comprehensive unit tests covering:

- Package manager detection logic
- Command building for different package managers
- Argument parsing for install/upgrade/remove operations
- Progress message generation
- Operation state management
- Output parsing for outdated packages

## Architecture Highlights

### Child Process Integration

- Uses `spawn()` for non-blocking package manager execution
- Streams stdout/stderr for real-time output capture
- Implements progressive timeout handling
- Proper process cleanup and error handling

### Progress Tracking

- Incremental progress updates during operations
- Diminishing progress step calculation
- Operation state transitions (pending → running → completed/failed)
- Output accumulation for debugging

### WebSocket Broadcasting

- Dual event emission (EventEmitter + Socket.IO)
- Room-based messaging for targeted clients
- Structured progress data with operation context
- Real-time status updates

### Package Manager Support

- Auto-detection based on lock files (pnpm-lock.yaml, yarn.lock, package-lock.json)
- Command generation for npm, pnpm, and yarn
- Different argument handling per package manager
- JSON output parsing with fallback to table parsing

### Error Handling

- Operation-level error tracking
- Timeout management with configurable limits
- Command failure detection via exit codes
- Comprehensive error logging with operation context

## Usage Examples

### Installing Packages via API

```bash
curl -X POST http://localhost:3000/api/package-manager/install \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "packages": ["lodash", "axios"],
    "options": {
      "isDev": false,
      "exact": true
    }
  }'
```

### WebSocket Client Connection

```javascript
const socket = io('http://localhost:3000');
socket.emit('join-package-manager');
socket.on('package-manager:progress', progress => {
  console.log(`Operation ${progress.operationId}: ${progress.progress}%`);
  console.log(`Status: ${progress.message}`);
});
```

### Service Usage

```typescript
import { packageManagerService } from '@services/package-manager.service';

// List outdated packages
const outdated = await packageManagerService.listOutdated();

// Install packages with progress tracking
packageManagerService.on('progress', progress => {
  console.log(`${progress.type}: ${progress.progress}%`);
});

await packageManagerService.install(['express'], { isDev: false });
```

## Implementation Status

✅ **Complete**: All requested features have been implemented:

- NPM/PNPM CLI integration via child_process
- Real-time streaming with progress tracking
- WebSocket progress event emission
- Comprehensive REST API endpoints
- Full TypeScript type coverage
- Unit test suite
- Error handling and timeout management
- Auto-detection of package manager type
- Operation history and status tracking

The PackageManager module is fully functional and ready for production use with comprehensive real-time progress tracking and WebSocket integration.
