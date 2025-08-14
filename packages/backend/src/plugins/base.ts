import { Express, Router } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import logger from '@lib/logger';
import { PrismaClient } from '@generated/prisma';

export interface PluginContext {
  app: Express;
  io: SocketIOServer;
  db: PrismaClient;
  logger: typeof logger;
  config?: any;
}

export interface PluginHooks {
  routes?: (router: Router, ctx: PluginContext) => void | Promise<void>;
  menus?: (ctx: PluginContext) => any[] | Promise<any[]>;
  events?: {
    [eventName: string]: (data: any, ctx: PluginContext) => void | Promise<void>;
  };
}

export interface Plugin {
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

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private enabledPlugins: Map<string, Plugin> = new Map();
  private context?: PluginContext;
  private pluginRoutes: Map<string, Router> = new Map();

  setContext(ctx: PluginContext): void {
    this.context = ctx;
  }

  async registerPlugin(plugin: Plugin): Promise<void> {
    logger.info(`Registering plugin: ${plugin.name} v${plugin.version}`);

    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin ${plugin.name} is already registered`);
    }

    this.plugins.set(plugin.name, plugin);
    logger.info(`Plugin ${plugin.name} registered successfully`);
  }

  async loadPluginsFromDirectory(pluginsDir: string = 'src/plugins'): Promise<void> {
    const fs = await import('fs');
    const path = await import('path');

    try {
      const pluginFiles = fs
        .readdirSync(pluginsDir)
        .filter(file => file.endsWith('.plugin.ts') || file.endsWith('.plugin.js'))
        .filter(file => !file.includes('.test.') && !file.includes('.spec.'));

      for (const file of pluginFiles) {
        try {
          const pluginPath = path.join(process.cwd(), pluginsDir, file);
          const pluginModule = await import(pluginPath);
          const PluginClass = pluginModule.default || pluginModule[Object.keys(pluginModule)[0]];

          if (PluginClass && typeof PluginClass === 'function') {
            const plugin = new PluginClass();
            if (plugin.name && plugin.version && plugin.init) {
              await this.registerPlugin(plugin);
            } else {
              logger.warn(`Plugin file ${file} does not export a valid plugin`);
            }
          }
        } catch (error) {
          logger.error(`Failed to load plugin from ${file}:`, error);
        }
      }
    } catch (error) {
      logger.error(`Failed to read plugins directory ${pluginsDir}:`, error);
    }
  }

  async initializePlugins(app: Express, ctx: PluginContext): Promise<void> {
    logger.info('Initializing plugins...');
    this.setContext(ctx);

    // Get enabled plugins from database
    try {
      const dbPlugins = await ctx.db.plugin.findMany({ where: { enabled: true } });
      const enabledPluginNames = new Set(dbPlugins.map(p => p.name));

      for (const [name, plugin] of this.plugins) {
        if (enabledPluginNames.has(name)) {
          try {
            logger.info(`Initializing plugin: ${name}`);
            await plugin.init(app, ctx);
            this.enabledPlugins.set(name, plugin);

            // Register routes if plugin supports it
            if (plugin.registerRoutes) {
              const router = Router();
              await plugin.registerRoutes(router, ctx);
              this.pluginRoutes.set(name, router);
              app.use(`/api/plugins/${name}`, router);
            }

            logger.info(`Plugin ${name} initialized successfully`);
          } catch (error) {
            logger.error(`Failed to initialize plugin ${name}:`, error);
            // Don't throw - continue with other plugins
          }
        } else {
          logger.info(`Plugin ${name} is disabled, skipping initialization`);
        }
      }
    } catch (error) {
      logger.error('Failed to query plugin status from database:', error);
      // Fallback: initialize all registered plugins
      for (const [name, plugin] of this.plugins) {
        try {
          logger.info(`Initializing plugin: ${name} (fallback mode)`);
          await plugin.init(app, ctx);
          this.enabledPlugins.set(name, plugin);
          logger.info(`Plugin ${name} initialized successfully`);
        } catch (error) {
          logger.error(`Failed to initialize plugin ${name}:`, error);
        }
      }
    }

    logger.info(`Initialized ${this.enabledPlugins.size} plugins`);
  }

  async enablePlugin(name: string): Promise<void> {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      throw new Error(`Plugin ${name} is not registered`);
    }

    if (this.enabledPlugins.has(name)) {
      return; // Already enabled
    }

    if (!this.context) {
      throw new Error('Plugin context not set');
    }

    try {
      await plugin.init(this.context.app, this.context);
      this.enabledPlugins.set(name, plugin);

      // Register routes if plugin supports it
      if (plugin.registerRoutes) {
        const router = Router();
        await plugin.registerRoutes(router, this.context);
        this.pluginRoutes.set(name, router);
        this.context.app.use(`/api/plugins/${name}`, router);
      }

      // Update database
      await this.context.db.plugin.upsert({
        where: { name },
        update: { enabled: true },
        create: {
          name,
          version: plugin.version,
          description: plugin.description,
          enabled: true,
          hooks: plugin.hooks || [],
        },
      });

      logger.info(`Plugin ${name} enabled successfully`);
    } catch (error) {
      logger.error(`Failed to enable plugin ${name}:`, error);
      throw error;
    }
  }

  async disablePlugin(name: string): Promise<void> {
    const plugin = this.enabledPlugins.get(name);
    if (!plugin) {
      return; // Already disabled or not registered
    }

    try {
      if (plugin.destroy) {
        await plugin.destroy();
      }

      this.enabledPlugins.delete(name);
      this.pluginRoutes.delete(name);

      // Update database
      if (this.context) {
        await this.context.db.plugin.update({
          where: { name },
          data: { enabled: false },
        });
      }

      logger.info(`Plugin ${name} disabled successfully`);
    } catch (error) {
      logger.error(`Failed to disable plugin ${name}:`, error);
      throw error;
    }
  }

  async destroyPlugins(): Promise<void> {
    logger.info('Destroying plugins...');

    for (const [name, plugin] of this.enabledPlugins) {
      try {
        if (plugin.destroy) {
          logger.info(`Destroying plugin: ${name}`);
          await plugin.destroy();
        }
      } catch (error) {
        logger.error(`Failed to destroy plugin ${name}:`, error);
      }
    }

    this.plugins.clear();
    this.enabledPlugins.clear();
    this.pluginRoutes.clear();
    logger.info('All plugins destroyed');
  }

  async emitEvent(eventName: string, data: any): Promise<void> {
    for (const [name, plugin] of this.enabledPlugins) {
      try {
        if (plugin.handleEvent && this.context) {
          await plugin.handleEvent(eventName, data, this.context);
        }
      } catch (error) {
        logger.error(`Plugin ${name} failed to handle event ${eventName}:`, error);
      }
    }
  }

  async getMenuItems(): Promise<any[]> {
    const allMenuItems: any[] = [];

    for (const [name, plugin] of this.enabledPlugins) {
      try {
        if (plugin.getMenuItems && this.context) {
          const menuItems = await plugin.getMenuItems(this.context);
          if (Array.isArray(menuItems)) {
            allMenuItems.push(...menuItems.map(item => ({ ...item, pluginName: name })));
          }
        }
      } catch (error) {
        logger.error(`Plugin ${name} failed to provide menu items:`, error);
      }
    }

    return allMenuItems;
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  getEnabledPlugin(name: string): Plugin | undefined {
    return this.enabledPlugins.get(name);
  }

  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getEnabledPlugins(): Plugin[] {
    return Array.from(this.enabledPlugins.values());
  }

  getPluginStatus(): Array<{
    name: string;
    enabled: boolean;
    version: string;
    description?: string;
  }> {
    return Array.from(this.plugins.values()).map(plugin => ({
      name: plugin.name,
      enabled: this.enabledPlugins.has(plugin.name),
      version: plugin.version,
      description: plugin.description,
    }));
  }
}

export const pluginManager = new PluginManager();
export default pluginManager;
