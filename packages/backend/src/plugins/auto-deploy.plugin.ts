import { Express, Router, Request, Response } from 'express';
import { Plugin, PluginContext } from './base';
import crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface AutoDeployConfig {
  webhookSecret?: string;
  repositoryUrl: string;
  deploymentPath: string;
  branch: string;
  buildCommand?: string;
  restartCommand?: string;
  allowedIPs?: string[];
  enabled: boolean;
}

export class AutoDeployPlugin implements Plugin {
  name = 'auto-deploy';
  version = '1.0.0';
  description = 'Automated deployment via Git webhooks';
  hooks = ['routes', 'events'];

  private config: AutoDeployConfig = {
    repositoryUrl: '',
    deploymentPath: '',
    branch: 'main',
    enabled: false,
  };

  async init(app: Express, ctx: PluginContext): Promise<void> {
    // Load configuration from database
    const dbPlugin = await ctx.db.plugin.findUnique({
      where: { name: this.name },
    });

    if (dbPlugin?.config) {
      // Safely cast JSON config to AutoDeployConfig
      const dbConfig = dbPlugin.config as any;
      if (typeof dbConfig === 'object' && dbConfig !== null) {
        this.config = { ...this.config, ...dbConfig };
      }
    }

    ctx.logger.info('Auto-Deploy plugin initialized');
  }

  async registerRoutes(router: Router, ctx: PluginContext): Promise<void> {
    // Webhook endpoint for Git providers
    router.post('/webhook', async (req: Request, res: Response) => {
      try {
        if (!this.config.enabled) {
          return res.status(503).json({ error: 'Auto-deploy is disabled' });
        }

        // Verify webhook signature if secret is configured
        if (this.config.webhookSecret) {
          const signature = req.headers['x-hub-signature-256'] as string;
          if (
            !this.verifyGitHubSignature(
              JSON.stringify(req.body),
              signature,
              this.config.webhookSecret
            )
          ) {
            ctx.logger.warn('Invalid webhook signature received');
            return res.status(401).json({ error: 'Invalid signature' });
          }
        }

        // Check IP whitelist if configured
        if (this.config.allowedIPs && this.config.allowedIPs.length > 0) {
          const clientIP = req.ip || req.connection.remoteAddress;
          if (!this.config.allowedIPs.includes(clientIP || '')) {
            ctx.logger.warn(`Webhook from unauthorized IP: ${clientIP}`);
            return res.status(403).json({ error: 'IP not allowed' });
          }
        }

        const payload = req.body;

        // Handle GitHub webhook
        if (req.headers['x-github-event']) {
          await this.handleGitHubWebhook(payload, ctx);
        }
        // Handle GitLab webhook
        else if (req.headers['x-gitlab-event']) {
          await this.handleGitLabWebhook(payload, ctx);
        }
        // Generic webhook
        else {
          await this.handleGenericWebhook(payload, ctx);
        }

        return res.json({ success: true, message: 'Deployment triggered' });
      } catch (error) {
        ctx.logger.error('Webhook processing failed:', error);
        return res.status(500).json({ error: 'Deployment failed' });
      }
    });

    // Configuration endpoints
    router.get('/config', (req: Request, res: Response) => {
      // Don't expose sensitive data
      const safeConfig = { ...this.config };
      delete safeConfig.webhookSecret;
      res.json(safeConfig);
    });

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
        ctx.logger.info('Auto-Deploy configuration updated');

        res.json({ success: true, message: 'Configuration updated' });
      } catch (error) {
        ctx.logger.error('Failed to update Auto-Deploy config:', error);
        res.status(500).json({ error: 'Failed to update configuration' });
      }
    });

    // Manual deployment trigger
    router.post('/deploy', async (req: Request, res: Response) => {
      try {
        if (!this.config.enabled) {
          return res.status(503).json({ error: 'Auto-deploy is disabled' });
        }

        const result = await this.performDeployment(ctx);
        return res.json({ success: true, result });
      } catch (error) {
        ctx.logger.error('Manual deployment failed:', error);
        return res.status(500).json({ error: 'Deployment failed' });
      }
    });

    // Deployment status/logs
    router.get('/status', (req: Request, res: Response) => {
      res.json({
        enabled: this.config.enabled,
        lastDeployment: this.getLastDeploymentStatus(),
        config: {
          repositoryUrl: this.config.repositoryUrl,
          branch: this.config.branch,
          deploymentPath: this.config.deploymentPath,
        },
      });
    });
  }

  async handleEvent(eventName: string, data: any, ctx: PluginContext): Promise<void> {
    if (eventName === 'deployment.completed') {
      ctx.logger.info('Deployment completed event received:', data);
    }
  }

  getMenuItems(ctx: PluginContext): any[] {
    return [
      {
        id: 'auto-deploy',
        label: 'Auto Deploy',
        icon: 'rocket',
        path: '/plugins/auto-deploy',
        category: 'Deployment',
        order: 10,
      },
    ];
  }

  private verifyGitHubSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature =
      'sha256=' + crypto.createHmac('sha256', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  }

  private async handleGitHubWebhook(payload: any, ctx: PluginContext): Promise<void> {
    const event = payload;

    // Only process push events to the configured branch
    if (event.ref === `refs/heads/${this.config.branch}`) {
      ctx.logger.info(`GitHub push to ${this.config.branch} branch detected, starting deployment`);
      await this.performDeployment(ctx);

      // Emit event for other plugins
      await ctx.db.$disconnect(); // Temporary workaround for event emitting
      // await ctx.emitEvent('deployment.started', {
      //   plugin: this.name,
      //   repository: event.repository?.full_name,
      //   branch: this.config.branch,
      //   commit: event.head_commit?.id,
      // });
    }
  }

  private async handleGitLabWebhook(payload: any, ctx: PluginContext): Promise<void> {
    const event = payload;

    if (event.ref === `refs/heads/${this.config.branch}`) {
      ctx.logger.info(`GitLab push to ${this.config.branch} branch detected, starting deployment`);
      await this.performDeployment(ctx);
    }
  }

  private async handleGenericWebhook(payload: any, ctx: PluginContext): Promise<void> {
    ctx.logger.info('Generic webhook received, starting deployment');
    await this.performDeployment(ctx);
  }

  private async performDeployment(ctx: PluginContext): Promise<string> {
    const { deploymentPath, buildCommand, restartCommand } = this.config;

    try {
      ctx.logger.info('Starting deployment process');

      // Git pull
      const gitResult = await execAsync('git pull origin ' + this.config.branch, {
        cwd: deploymentPath,
      });
      ctx.logger.info('Git pull result:', { stdout: gitResult.stdout });

      // Run build command if configured
      if (buildCommand) {
        ctx.logger.info('Running build command:', { command: buildCommand });
        const buildResult = await execAsync(buildCommand, {
          cwd: deploymentPath,
        });
        ctx.logger.info('Build result:', { stdout: buildResult.stdout });
      }

      // Run restart command if configured
      if (restartCommand) {
        ctx.logger.info('Running restart command:', { command: restartCommand });
        const restartResult = await execAsync(restartCommand, {
          cwd: deploymentPath,
        });
        ctx.logger.info('Restart result:', { stdout: restartResult.stdout });
      }

      ctx.logger.info('Deployment completed successfully');
      return 'Deployment completed successfully';
    } catch (error) {
      ctx.logger.error('Deployment failed:', error);
      throw error;
    }
  }

  private getLastDeploymentStatus(): any {
    // In a real implementation, this would track deployment history
    return {
      timestamp: new Date(),
      status: 'success',
      message: 'Last deployment completed successfully',
    };
  }
}

export default AutoDeployPlugin;
