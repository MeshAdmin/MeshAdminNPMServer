import { Express, Router, Request, Response } from 'express';
import { Plugin, PluginContext } from './base';
import fs from 'fs/promises';
import path from 'path';

export interface LoadBalancerConfig {
  enabled: boolean;
  configType: 'nginx' | 'haproxy' | 'caddy';
  configPath: string;
  reloadCommand: string;
  healthCheckInterval: number;
  upstreams: UpstreamConfig[];
}

export interface UpstreamConfig {
  id: string;
  name: string;
  servers: ServerConfig[];
  method: 'round_robin' | 'least_conn' | 'ip_hash' | 'weighted';
  healthCheck?: {
    enabled: boolean;
    path: string;
    interval: number;
    timeout: number;
    expectedStatus: number;
  };
}

export interface ServerConfig {
  id: string;
  host: string;
  port: number;
  weight?: number;
  maxFails?: number;
  failTimeout?: number;
  backup?: boolean;
  down?: boolean;
  status?: 'up' | 'down' | 'unknown';
  lastCheck?: Date;
}

export class LoadBalancerPlugin implements Plugin {
  name = 'load-balancer';
  version = '1.0.0';
  description = 'Load balancer configuration and health monitoring';
  hooks = ['routes', 'events', 'menus'];

  private config: LoadBalancerConfig = {
    enabled: false,
    configType: 'nginx',
    configPath: '/etc/nginx/conf.d/load-balancer.conf',
    reloadCommand: 'nginx -s reload',
    healthCheckInterval: 30000, // 30 seconds
    upstreams: [],
  };

  private healthCheckIntervals: Map<string, NodeJS.Timeout> = new Map();

  async init(app: Express, ctx: PluginContext): Promise<void> {
    // Load configuration from database
    const dbPlugin = await ctx.db.plugin.findUnique({
      where: { name: this.name },
    });

    if (dbPlugin?.config) {
      // Safely cast JSON config to LoadBalancerConfig
      const dbConfig = dbPlugin.config as any;
      if (typeof dbConfig === 'object' && dbConfig !== null) {
        this.config = { ...this.config, ...dbConfig };
      }
    }

    // Start health checks if enabled
    if (this.config.enabled) {
      await this.startHealthChecks(ctx);
    }

    ctx.logger.info('Load Balancer plugin initialized');
  }

  async destroy(): Promise<void> {
    // Stop all health checks
    for (const interval of this.healthCheckIntervals.values()) {
      clearInterval(interval);
    }
    this.healthCheckIntervals.clear();
  }

  async registerRoutes(router: Router, ctx: PluginContext): Promise<void> {
    // Get load balancer configuration
    router.get('/config', (req: Request, res: Response) => {
      res.json(this.config);
    });

    // Update load balancer configuration
    router.put('/config', async (req: Request, res: Response) => {
      try {
        const newConfig = { ...this.config, ...req.body };

        // Update database
        await ctx.db.plugin.upsert({
          where: { name: this.name },
          update: { config: newConfig },
          create: {
            name: this.name,
            version: this.version,
            description: this.description,
            enabled: true,
            hooks: this.hooks,
            config: newConfig,
          },
        });

        this.config = newConfig;

        // Restart health checks if configuration changed
        if (this.config.enabled) {
          await this.restartHealthChecks(ctx);
        }

        ctx.logger.info('Load Balancer configuration updated');
        res.json({ success: true, message: 'Configuration updated' });
      } catch (error) {
        ctx.logger.error('Failed to update Load Balancer config:', error);
        res.status(500).json({ error: 'Failed to update configuration' });
      }
    });

    // Get upstreams
    router.get('/upstreams', (req: Request, res: Response) => {
      res.json({ upstreams: this.config.upstreams });
    });

    // Add upstream
    router.post('/upstreams', async (req: Request, res: Response) => {
      try {
        const upstream: UpstreamConfig = {
          id: this.generateId(),
          ...req.body,
          servers: req.body.servers || [],
        };

        this.config.upstreams.push(upstream);
        await this.saveConfig(ctx);
        await this.generateLoadBalancerConfig();

        ctx.logger.info(`Upstream ${upstream.name} added`);
        res.json({ success: true, upstream });
      } catch (error) {
        ctx.logger.error('Failed to add upstream:', error);
        res.status(500).json({ error: 'Failed to add upstream' });
      }
    });

    // Update upstream
    router.put('/upstreams/:id', async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const upstreamIndex = this.config.upstreams.findIndex(u => u.id === id);

        if (upstreamIndex === -1) {
          return res.status(404).json({ error: 'Upstream not found' });
        }

        this.config.upstreams[upstreamIndex] = {
          ...this.config.upstreams[upstreamIndex],
          ...req.body,
        };

        await this.saveConfig(ctx);
        await this.generateLoadBalancerConfig();

        ctx.logger.info(`Upstream ${id} updated`);
        return res.json({ success: true, upstream: this.config.upstreams[upstreamIndex] });
      } catch (error) {
        ctx.logger.error('Failed to update upstream:', error);
        return res.status(500).json({ error: 'Failed to update upstream' });
      }
    });

    // Delete upstream
    router.delete('/upstreams/:id', async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const upstreamIndex = this.config.upstreams.findIndex(u => u.id === id);

        if (upstreamIndex === -1) {
          return res.status(404).json({ error: 'Upstream not found' });
        }

        this.config.upstreams.splice(upstreamIndex, 1);
        await this.saveConfig(ctx);
        await this.generateLoadBalancerConfig();

        ctx.logger.info(`Upstream ${id} deleted`);
        return res.json({ success: true, message: 'Upstream deleted' });
      } catch (error) {
        ctx.logger.error('Failed to delete upstream:', error);
        return res.status(500).json({ error: 'Failed to delete upstream' });
      }
    });

    // Get server status
    router.get('/servers/status', (req: Request, res: Response) => {
      const serverStatus = this.config.upstreams.flatMap(upstream =>
        upstream.servers.map(server => ({
          upstreamId: upstream.id,
          upstreamName: upstream.name,
          serverId: server.id,
          host: server.host,
          port: server.port,
          status: server.status || 'unknown',
          lastCheck: server.lastCheck,
        }))
      );

      res.json({ servers: serverStatus });
    });

    // Manual health check
    router.post(
      '/servers/:upstreamId/:serverId/health-check',
      async (req: Request, res: Response) => {
        try {
          const { upstreamId, serverId } = req.params;
          const upstream = this.config.upstreams.find(u => u.id === upstreamId);

          if (!upstream) {
            return res.status(404).json({ error: 'Upstream not found' });
          }

          const server = upstream.servers.find(s => s.id === serverId);
          if (!server) {
            return res.status(404).json({ error: 'Server not found' });
          }

          const isHealthy = await this.checkServerHealth(server, upstream.healthCheck);
          server.status = isHealthy ? 'up' : 'down';
          server.lastCheck = new Date();

          await this.saveConfig(ctx);

          return res.json({
            success: true,
            server: {
              id: server.id,
              host: server.host,
              port: server.port,
              status: server.status,
              lastCheck: server.lastCheck,
            },
          });
        } catch (error) {
          ctx.logger.error('Manual health check failed:', error);
          return res.status(500).json({ error: 'Health check failed' });
        }
      }
    );

    // Reload load balancer configuration
    router.post('/reload', async (req: Request, res: Response) => {
      try {
        await this.reloadLoadBalancer(ctx);
        res.json({ success: true, message: 'Load balancer reloaded' });
      } catch (error) {
        ctx.logger.error('Failed to reload load balancer:', error);
        res.status(500).json({ error: 'Failed to reload load balancer' });
      }
    });
  }

  async handleEvent(eventName: string, data: any, ctx: PluginContext): Promise<void> {
    if (eventName === 'service.started' || eventName === 'service.stopped') {
      // Check if we need to update load balancer configuration
      await this.checkAndUpdateUpstreams(ctx);
    }
  }

  getMenuItems(ctx: PluginContext): any[] {
    return [
      {
        id: 'load-balancer',
        label: 'Load Balancer',
        icon: 'network',
        path: '/plugins/load-balancer',
        category: 'Infrastructure',
        order: 20,
      },
    ];
  }

  private async startHealthChecks(ctx: PluginContext): Promise<void> {
    for (const upstream of this.config.upstreams) {
      if (upstream.healthCheck?.enabled) {
        await this.startUpstreamHealthCheck(upstream, ctx);
      }
    }
  }

  private async restartHealthChecks(ctx: PluginContext): Promise<void> {
    // Stop existing health checks
    for (const interval of this.healthCheckIntervals.values()) {
      clearInterval(interval);
    }
    this.healthCheckIntervals.clear();

    // Start new health checks
    await this.startHealthChecks(ctx);
  }

  private async startUpstreamHealthCheck(
    upstream: UpstreamConfig,
    ctx: PluginContext
  ): Promise<void> {
    if (!upstream.healthCheck?.enabled) return;

    const interval = setInterval(async () => {
      for (const server of upstream.servers) {
        try {
          const isHealthy = await this.checkServerHealth(server, upstream.healthCheck);
          const previousStatus = server.status;
          server.status = isHealthy ? 'up' : 'down';
          server.lastCheck = new Date();

          // Log status changes
          if (previousStatus !== server.status) {
            ctx.logger.info(
              `Server ${server.host}:${server.port} status changed: ${previousStatus} -> ${server.status}`
            );

            // Log event for other plugins (emitEvent not available in context)
            ctx.logger.info('Server status changed event', {
              upstream: upstream.name,
              server: `${server.host}:${server.port}`,
              status: server.status,
              previousStatus,
            });
          }
        } catch (error) {
          ctx.logger.error(`Health check failed for ${server.host}:${server.port}:`, error);
          server.status = 'down';
          server.lastCheck = new Date();
        }
      }

      // Save updated status
      await this.saveConfig(ctx);
    }, upstream.healthCheck.interval || this.config.healthCheckInterval);

    this.healthCheckIntervals.set(upstream.id, interval);
  }

  private async checkServerHealth(
    server: ServerConfig,
    healthCheck?: UpstreamConfig['healthCheck']
  ): Promise<boolean> {
    if (!healthCheck?.enabled) return true;

    try {
      const response = await fetch(`http://${server.host}:${server.port}${healthCheck.path}`, {
        method: 'GET',
        timeout: healthCheck.timeout || 5000,
      });

      return response.status === (healthCheck.expectedStatus || 200);
    } catch (error) {
      return false;
    }
  }

  private async generateLoadBalancerConfig(): Promise<void> {
    switch (this.config.configType) {
      case 'nginx':
        await this.generateNginxConfig();
        break;
      case 'haproxy':
        await this.generateHAProxyConfig();
        break;
      case 'caddy':
        await this.generateCaddyConfig();
        break;
    }
  }

  private async generateNginxConfig(): Promise<void> {
    let config = '# Generated by Load Balancer Plugin\n\n';

    // Generate upstream blocks
    for (const upstream of this.config.upstreams) {
      config += `upstream ${upstream.name} {\n`;

      if (upstream.method === 'least_conn') {
        config += '    least_conn;\n';
      } else if (upstream.method === 'ip_hash') {
        config += '    ip_hash;\n';
      }

      for (const server of upstream.servers) {
        if (server.status === 'down') continue;

        let serverLine = `    server ${server.host}:${server.port}`;
        if (server.weight) serverLine += ` weight=${server.weight}`;
        if (server.maxFails) serverLine += ` max_fails=${server.maxFails}`;
        if (server.failTimeout) serverLine += ` fail_timeout=${server.failTimeout}s`;
        if (server.backup) serverLine += ' backup';
        serverLine += ';\n';

        config += serverLine;
      }

      config += '}\n\n';
    }

    await fs.writeFile(this.config.configPath, config);
  }

  private async generateHAProxyConfig(): Promise<void> {
    // HAProxy configuration generation
    let config = '# Generated by Load Balancer Plugin\n\n';

    for (const upstream of this.config.upstreams) {
      config += `backend ${upstream.name}\n`;
      config += `    balance ${this.mapMethodToHAProxy(upstream.method)}\n`;

      upstream.servers.forEach((server, index) => {
        if (server.status === 'down') return;
        config += `    server srv${index} ${server.host}:${server.port}`;
        if (server.weight) config += ` weight ${server.weight}`;
        config += '\n';
      });

      config += '\n';
    }

    await fs.writeFile(this.config.configPath, config);
  }

  private async generateCaddyConfig(): Promise<void> {
    // Caddy configuration generation
    let config = '# Generated by Load Balancer Plugin\n\n';

    for (const upstream of this.config.upstreams) {
      config += `${upstream.name} {\n`;
      config += '    reverse_proxy {\n';

      for (const server of upstream.servers) {
        if (server.status === 'down') continue;
        config += `        to ${server.host}:${server.port}\n`;
      }

      config += '    }\n';
      config += '}\n\n';
    }

    await fs.writeFile(this.config.configPath, config);
  }

  private mapMethodToHAProxy(method: string): string {
    switch (method) {
      case 'round_robin':
        return 'roundrobin';
      case 'least_conn':
        return 'leastconn';
      case 'ip_hash':
        return 'source';
      default:
        return 'roundrobin';
    }
  }

  private async reloadLoadBalancer(ctx: PluginContext): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      await execAsync(this.config.reloadCommand);
      ctx.logger.info('Load balancer configuration reloaded');
    } catch (error) {
      ctx.logger.error('Failed to reload load balancer:', error);
      throw error;
    }
  }

  private async saveConfig(ctx: PluginContext): Promise<void> {
    await ctx.db.plugin.upsert({
      where: { name: this.name },
      update: { config: this.config as any },
      create: {
        name: this.name,
        version: this.version,
        description: this.description,
        enabled: true,
        hooks: this.hooks,
        config: this.config as any,
      },
    });
  }

  private async checkAndUpdateUpstreams(ctx: PluginContext): Promise<void> {
    // Logic to automatically discover and update upstream servers
    // This could integrate with service discovery or container orchestration
    ctx.logger.info('Checking for upstream configuration updates');
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

export default LoadBalancerPlugin;
