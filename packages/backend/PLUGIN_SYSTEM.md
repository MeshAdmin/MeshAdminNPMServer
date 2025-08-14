# Plugin Architecture Documentation

## Overview

The Mesh Admin backend implements a comprehensive plugin architecture that allows for extending functionality through modular plugins. The system supports dynamic loading, enabling/disabling of plugins, and provides a rich set of hooks for integration.

## Plugin Interface

All plugins must implement the `Plugin` interface with the following signature:

```typescript
interface Plugin {
  name: string;
  version: string;
  description?: string;
  hooks?: string[]; // Available hook types: ['routes', 'menus', 'events']
  init(app: Express, ctx: PluginContext): Promise<void> | void;
  destroy?(): Promise<void> | void;

  // Hook implementations
  registerRoutes?(router: Router, ctx: PluginContext): void | Promise<void>;
  getMenuItems?(ctx: PluginContext): any[] | Promise<any[]>;
  handleEvent?(eventName: string, data: any, ctx: PluginContext): void | Promise<void>;
}
```

## Plugin Context

The `PluginContext` provides access to the application's core services:

```typescript
interface PluginContext {
  app: Express; // Express application instance
  io: SocketIOServer; // Socket.IO server instance
  db: PrismaClient; // Database client
  logger: Logger; // Application logger
  config?: any; // Plugin-specific configuration
}
```

## Plugin Hooks

### 1. Routes Hook

Plugins can register custom API routes that will be accessible at `/api/plugins/{plugin-name}/...`

```typescript
async registerRoutes(router: Router, ctx: PluginContext): Promise<void> {
  router.get('/status', (req, res) => {
    res.json({ status: 'active' });
  });

  router.post('/action', async (req, res) => {
    // Handle action
    res.json({ success: true });
  });
}
```

### 2. Menus Hook

Plugins can contribute menu items to the frontend navigation:

```typescript
getMenuItems(ctx: PluginContext): any[] {
  return [
    {
      id: 'my-plugin',
      label: 'My Plugin',
      icon: 'gear',
      path: '/plugins/my-plugin',
      category: 'Tools',
      order: 10,
    },
  ];
}
```

### 3. Events Hook

Plugins can listen for and respond to system events:

```typescript
async handleEvent(eventName: string, data: any, ctx: PluginContext): Promise<void> {
  if (eventName === 'service.started') {
    ctx.logger.info('Service started:', data);
    // Respond to service start event
  }
}
```

## Plugin Development

### Creating a New Plugin

1. Create a new file in `src/plugins/` with the `.plugin.ts` suffix
2. Implement the `Plugin` interface
3. Export the plugin class as default

Example plugin structure:

```typescript
import { Express, Router, Request, Response } from 'express';
import { Plugin, PluginContext } from './base';

export class MyPlugin implements Plugin {
  name = 'my-plugin';
  version = '1.0.0';
  description = 'My custom plugin';
  hooks = ['routes', 'events'];

  async init(app: Express, ctx: PluginContext): Promise<void> {
    // Plugin initialization logic
    ctx.logger.info('My plugin initialized');
  }

  async registerRoutes(router: Router, ctx: PluginContext): Promise<void> {
    router.get('/hello', (req, res) => {
      res.json({ message: 'Hello from my plugin!' });
    });
  }

  async handleEvent(eventName: string, data: any, ctx: PluginContext): Promise<void> {
    // Event handling logic
  }

  async destroy(): Promise<void> {
    // Cleanup logic
  }
}

export default MyPlugin;
```

### Plugin Configuration

Plugins can store configuration in the database using the plugin context:

```typescript
// Save configuration
await ctx.db.plugin.upsert({
  where: { name: this.name },
  update: { config: myConfig },
  create: {
    name: this.name,
    version: this.version,
    description: this.description,
    enabled: true,
    hooks: this.hooks,
    config: myConfig,
  },
});

// Load configuration
const dbPlugin = await ctx.db.plugin.findUnique({
  where: { name: this.name },
});
const config = dbPlugin?.config;
```

## Built-in Plugins

### 1. Logging Plugin

- **Name**: `logging`
- **Description**: HTTP request logging using Morgan
- **Hooks**: Events
- **Features**:
  - Logs HTTP requests in development/production formats
  - Listens for system events and logs important activities

### 2. Auto-Deploy Plugin

- **Name**: `auto-deploy`
- **Description**: Automated deployment via Git webhooks
- **Hooks**: Routes, Events, Menus
- **Features**:
  - Git webhook endpoint (`/api/plugins/auto-deploy/webhook`)
  - Support for GitHub, GitLab, and generic webhooks
  - Signature verification for security
  - Configurable deployment commands
  - Manual deployment trigger
  - IP whitelisting support

**Auto-Deploy Configuration:**

```typescript
{
  webhookSecret: 'your-webhook-secret',
  repositoryUrl: 'https://github.com/user/repo.git',
  deploymentPath: '/path/to/deployment',
  branch: 'main',
  buildCommand: 'npm run build',
  restartCommand: 'pm2 restart all',
  allowedIPs: ['192.168.1.100'],
  enabled: true
}
```

### 3. Load-Balancer Plugin

- **Name**: `load-balancer`
- **Description**: Load balancer configuration and health monitoring
- **Hooks**: Routes, Events, Menus
- **Features**:
  - Support for Nginx, HAProxy, and Caddy
  - Upstream server management
  - Health check monitoring
  - Automatic configuration generation
  - Server status tracking
  - Load balancing methods (round-robin, least-conn, ip-hash)

**Load-Balancer Configuration:**

```typescript
{
  enabled: true,
  configType: 'nginx',
  configPath: '/etc/nginx/conf.d/load-balancer.conf',
  reloadCommand: 'nginx -s reload',
  healthCheckInterval: 30000,
  upstreams: [
    {
      name: 'web-servers',
      method: 'round_robin',
      servers: [
        { host: '10.0.1.10', port: 3000, weight: 1 },
        { host: '10.0.1.11', port: 3000, weight: 2 }
      ],
      healthCheck: {
        enabled: true,
        path: '/health',
        interval: 30000,
        timeout: 5000,
        expectedStatus: 200
      }
    }
  ]
}
```

## Plugin Management API

### List All Plugins

```
GET /api/plugins
```

### Get Plugin Details

```
GET /api/plugins/:name
```

### Enable Plugin

```
POST /api/plugins/:name/enable
```

### Disable Plugin

```
POST /api/plugins/:name/disable
```

### Update Plugin Configuration

```
PUT /api/plugins/:name/config
Content-Type: application/json

{
  "config": {
    "key": "value"
  }
}
```

### Get Plugin Menu Items

```
GET /api/plugins/menus/all
```

### Emit Event to Plugins

```
POST /api/plugins/events/:eventName
Content-Type: application/json

{
  "data": {
    "key": "value"
  }
}
```

### Reload Plugins

```
POST /api/plugins/reload
```

## System Events

The plugin system emits and listens for various system events:

- `service.started` - When a service starts
- `service.stopped` - When a service stops
- `cert.renewed` - When SSL certificate is renewed
- `plugin.enabled` - When a plugin is enabled
- `plugin.disabled` - When a plugin is disabled
- `deployment.started` - When deployment begins
- `deployment.completed` - When deployment finishes
- `server.status.changed` - When load balancer server status changes

## Database Schema

The plugin system uses the following database model:

```prisma
model Plugin {
  id          String    @id @default(cuid())
  name        String    @unique
  version     String
  description String?
  enabled     Boolean   @default(true)
  config      Json?     // Plugin-specific configuration
  hooks       String[]  // Available hooks: routes, menus, events
  filePath    String?   // Path to plugin file
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Security Considerations

1. **Authentication**: All plugin management APIs require admin role
2. **Input Validation**: Plugin configurations are validated before storage
3. **Sandboxing**: Plugins run in the same process but have controlled access to system resources
4. **Error Handling**: Plugin errors are isolated and don't crash the main application
5. **Resource Limits**: Plugins should implement proper cleanup in their `destroy()` method

## Best Practices

1. **Error Handling**: Always wrap plugin logic in try-catch blocks
2. **Cleanup**: Implement the `destroy()` method to clean up resources
3. **Configuration**: Use the database for persistent configuration storage
4. **Logging**: Use the provided logger for consistent logging
5. **Events**: Use events for loose coupling between plugins
6. **Performance**: Avoid blocking operations in plugin initialization
7. **Security**: Validate all inputs and sanitize outputs

## Troubleshooting

### Plugin Not Loading

- Check file naming convention (must end with `.plugin.ts`)
- Verify plugin exports default class
- Check plugin implements required interface methods
- Review application logs for initialization errors

### Plugin Not Responding to Events

- Verify `handleEvent` method is implemented
- Check event name matching (case-sensitive)
- Ensure plugin is enabled in database

### Database Connection Issues

- Use the provided `ctx.db` instance
- Don't create separate Prisma client instances
- Handle database errors gracefully

This plugin architecture provides a flexible and powerful way to extend the Mesh Admin backend functionality while maintaining system stability and security.
