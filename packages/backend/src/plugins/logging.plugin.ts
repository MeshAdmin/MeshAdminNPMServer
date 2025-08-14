import { Express } from 'express';
import morgan from 'morgan';
import { Plugin, PluginContext } from './base';
import { appConfig } from '@config/index';

export class LoggingPlugin implements Plugin {
  name = 'logging';
  version = '1.0.0';
  description = 'HTTP request logging plugin using Morgan';
  hooks = ['events']; // This plugin handles events

  init(app: Express, ctx: PluginContext): void {
    const format = appConfig.nodeEnv === 'production' ? 'combined' : 'dev';

    // Create a stream that writes to our custom logger
    const stream = {
      write: (message: string) => {
        // Remove trailing newline and log as info
        ctx.logger.info(message.trim());
      },
    };

    // Add Morgan middleware with custom stream
    app.use(morgan(format, { stream }));

    ctx.logger.info('HTTP request logging enabled');
  }

  async handleEvent(eventName: string, data: any, ctx: PluginContext): Promise<void> {
    // Log important system events
    const logEvents = [
      'service.started',
      'service.stopped',
      'cert.renewed',
      'plugin.enabled',
      'plugin.disabled',
    ];
    if (logEvents.includes(eventName)) {
      ctx.logger.info(`[Event] ${eventName}:`, data);
    }
  }
}

export default LoggingPlugin;
