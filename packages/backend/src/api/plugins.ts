import { Router, Request, Response } from 'express';
import pluginManager from '@plugins/base';
import { databaseService } from '@services/database.service';
import ResponseHelper from '@lib/response';
import logger from '@lib/logger';
import { authenticateJwt } from '@middleware/auth.middleware';
import { requireRole } from '@middleware/rbac.middleware';

const router = Router();

// Apply authentication and admin role requirement to all plugin routes
router.use(authenticateJwt);
router.use(requireRole(['admin']));

/**
 * GET /api/plugins
 * Get list of all plugins with their status
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const pluginStatus = pluginManager.getPluginStatus();
    const dbPlugins = await databaseService.prisma.plugin.findMany();

    // Merge plugin status with database info
    const plugins = pluginStatus.map(plugin => {
      const dbPlugin = dbPlugins.find(p => p.name === plugin.name);
      return {
        ...plugin,
        id: dbPlugin?.id,
        config: dbPlugin?.config,
        hooks: dbPlugin?.hooks || [],
        filePath: dbPlugin?.filePath,
        createdAt: dbPlugin?.createdAt,
        updatedAt: dbPlugin?.updatedAt,
      };
    });

    ResponseHelper.success(res, { plugins }, 'Plugins retrieved successfully');
  } catch (error) {
    logger.error('Failed to get plugins:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve plugins');
  }
});

/**
 * GET /api/plugins/:name
 * Get details of a specific plugin
 */
router.get('/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const plugin = pluginManager.getPlugin(name);

    if (!plugin) {
      return ResponseHelper.notFound(res, 'Plugin not found');
    }

    const dbPlugin = await databaseService.prisma.plugin.findUnique({
      where: { name },
    });

    const pluginInfo = {
      name: plugin.name,
      version: plugin.version,
      description: plugin.description,
      hooks: plugin.hooks || [],
      enabled: pluginManager.getEnabledPlugin(name) !== undefined,
      id: dbPlugin?.id,
      config: dbPlugin?.config,
      filePath: dbPlugin?.filePath,
      createdAt: dbPlugin?.createdAt,
      updatedAt: dbPlugin?.updatedAt,
    };

    return ResponseHelper.success(res, pluginInfo, 'Plugin details retrieved successfully');
  } catch (error) {
    logger.error(`Failed to get plugin ${req.params.name}:`, error);
    return ResponseHelper.internalError(res, 'Failed to retrieve plugin details');
  }
});

/**
 * POST /api/plugins/:name/enable
 * Enable a plugin
 */
router.post('/:name/enable', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    await pluginManager.enablePlugin(name);
    await pluginManager.emitEvent('plugin.enabled', { name, timestamp: new Date() });

    return ResponseHelper.success(res, { name, enabled: true }, `Plugin ${name} enabled successfully`);
  } catch (error) {
    logger.error(`Failed to enable plugin ${req.params.name}:`, error);

    if (error instanceof Error && error.message.includes('not registered')) {
      return ResponseHelper.notFound(res, 'Plugin not found');
    }

    return ResponseHelper.internalError(res, 'Failed to enable plugin');
  }
});

/**
 * POST /api/plugins/:name/disable
 * Disable a plugin
 */
router.post('/:name/disable', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    await pluginManager.disablePlugin(name);
    await pluginManager.emitEvent('plugin.disabled', { name, timestamp: new Date() });

    ResponseHelper.success(res, { name, enabled: false }, `Plugin ${name} disabled successfully`);
  } catch (error) {
    logger.error(`Failed to disable plugin ${req.params.name}:`, error);
    ResponseHelper.internalError(res, 'Failed to disable plugin');
  }
});

/**
 * PUT /api/plugins/:name/config
 * Update plugin configuration
 */
router.put('/:name/config', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { config } = req.body;

    const plugin = pluginManager.getPlugin(name);
    if (!plugin) {
      return ResponseHelper.notFound(res, 'Plugin not found');
    }

    // Update plugin config in database
    const updatedPlugin = await databaseService.prisma.plugin.upsert({
      where: { name },
      update: { config },
      create: {
        name,
        version: plugin.version,
        description: plugin.description,
        enabled: pluginManager.getEnabledPlugin(name) !== undefined,
        hooks: plugin.hooks || [],
        config,
      },
    });

    return ResponseHelper.success(res, updatedPlugin, 'Plugin configuration updated successfully');
  } catch (error) {
    logger.error(`Failed to update plugin config for ${req.params.name}:`, error);
    return ResponseHelper.internalError(res, 'Failed to update plugin configuration');
  }
});

/**
 * GET /api/plugins/menus
 * Get menu items from all enabled plugins
 */
router.get('/menus/all', async (req: Request, res: Response) => {
  try {
    const menuItems = await pluginManager.getMenuItems();
    ResponseHelper.success(res, { menuItems }, 'Plugin menu items retrieved successfully');
  } catch (error) {
    logger.error('Failed to get plugin menu items:', error);
    ResponseHelper.internalError(res, 'Failed to retrieve plugin menu items');
  }
});

/**
 * POST /api/plugins/events/:eventName
 * Emit an event to all plugins (for testing/admin purposes)
 */
router.post('/events/:eventName', async (req: Request, res: Response) => {
  try {
    const { eventName } = req.params;
    const { data } = req.body;

    await pluginManager.emitEvent(eventName, data);

    ResponseHelper.success(res, { eventName, data }, `Event ${eventName} emitted successfully`);
  } catch (error) {
    logger.error(`Failed to emit event ${req.params.eventName}:`, error);
    ResponseHelper.internalError(res, 'Failed to emit event');
  }
});

/**
 * POST /api/plugins/reload
 * Reload plugins from directory
 */
router.post('/reload', async (req: Request, res: Response) => {
  try {
    await pluginManager.loadPluginsFromDirectory('src/plugins');
    const pluginCount = pluginManager.getPlugins().length;

    ResponseHelper.success(res, { pluginCount }, 'Plugins reloaded successfully');
  } catch (error) {
    logger.error('Failed to reload plugins:', error);
    ResponseHelper.internalError(res, 'Failed to reload plugins');
  }
});

export default router;
