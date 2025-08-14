import { databaseService, PrismaClient } from './database.service';
import logger from '@lib/logger';
import { ServiceStatus } from '../generated/prisma';
import { PM2Interface, PM2ProcessDescription, PM2StartOptions, PM2Status } from '../types/pm2';
import { spawn, exec, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';

interface ServiceInfo {
  id: string;
  name: string;
  status: ServiceStatus;
  pid?: number;
  uptime?: number;
  memory?: number;
  cpu?: number;
  restarts?: number;
}

interface LogTailOptions {
  lines?: number;
  follow?: boolean;
}

interface ServiceManagerEvents {
  'service-started': (serviceId: string, serviceName: string) => void;
  'service-stopped': (serviceId: string, serviceName: string) => void;
  'service-error': (serviceId: string, serviceName: string, error: Error) => void;
  'log-line': (serviceId: string, line: string) => void;
}

export class ServiceManager extends EventEmitter {
  private prisma: PrismaClient;
  private pm2: PM2Interface | null = null;
  private pm2Available = false;
  private childProcesses = new Map<string, ChildProcess>();
  private logTails = new Map<string, ChildProcess>();

  constructor() {
    super();
    this.prisma = databaseService.getClient();
    this.initializePM2();
  }

  private async initializePM2(): Promise<void> {
    try {
      // Try to load PM2 programmatically
      const pm2Module = await import('pm2');
      // Cast to PM2Interface to handle potential missing methods
      this.pm2 = (pm2Module.default || pm2Module) as unknown as PM2Interface;

      // Test PM2 connection
      await new Promise<void>((resolve, reject) => {
        this.pm2!.connect(err => {
          if (err) {
            logger.warn('PM2 connection failed, falling back to child_process:', err.message);
            reject(err);
          } else {
            logger.info('PM2 connected successfully');
            this.pm2Available = true;
            resolve();
          }
        });
      });
    } catch (error) {
      logger.warn('PM2 not available, using child_process fallback:', (error as Error).message);
      this.pm2Available = false;
    }
  }

  private mapPM2StatusToServiceStatus(pm2Status: string): ServiceStatus {
    switch (pm2Status) {
      case PM2Status.ONLINE:
        return ServiceStatus.RUNNING;
      case PM2Status.STOPPED:
        return ServiceStatus.STOPPED;
      case PM2Status.STOPPING:
        return ServiceStatus.STOPPING;
      case PM2Status.LAUNCHING:
        return ServiceStatus.STARTING;
      case PM2Status.ERRORED:
        return ServiceStatus.ERROR;
      default:
        return ServiceStatus.UNKNOWN;
    }
  }

  async startService(serviceId: string): Promise<ServiceInfo> {
    logger.info(`Starting service: ${serviceId}`);

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { pm2Config: true },
    });

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    if (!service.pm2Config) {
      throw new Error(`Service has no PM2 configuration: ${serviceId}`);
    }

    // Update service status to STARTING
    await this.prisma.service.update({
      where: { id: serviceId },
      data: { status: ServiceStatus.STARTING },
    });

    try {
      if (this.pm2Available && this.pm2) {
        return await this.startServiceWithPM2(service.id, service.name, service.pm2Config);
      } else {
        return await this.startServiceWithChildProcess(service.id, service.name, service.pm2Config);
      }
    } catch (error) {
      // Update service status to ERROR
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.ERROR },
      });
      throw error;
    }
  }

  private async startServiceWithPM2(
    serviceId: string,
    serviceName: string,
    config: any
  ): Promise<ServiceInfo> {
    return new Promise((resolve, reject) => {
      const pm2Options: PM2StartOptions = {
        name: config.name || serviceName,
        script: config.script,
        cwd: config.cwd || process.cwd(),
        args: config.args,
        interpreter: config.interpreter,
        interpreterArgs: config.interpreterArgs,
        instances: config.instances || 1,
        execMode: (config.execMode as 'fork' | 'cluster') || 'fork',
        env: config.env || {},
        envProduction: config.envProduction || {},
        envDevelopment: config.envDevelopment || {},
        logFile: config.logFile,
        outFile: config.outFile,
        errorFile: config.errorFile,
        logDateFormat: config.logDateFormat,
        pidFile: config.pidFile,
        minUptimeSeconds: config.minUptimeSeconds || 1000,
        maxRestarts: config.maxRestarts || 15,
        restartDelay: config.restartDelay || 0,
        watch: config.watch || false,
        watchOptions: config.watchOptions || {},
        ignoreWatch: config.ignoreWatch,
        maxMemoryRestart: config.maxMemoryRestart,
        killTimeout: config.killTimeout || 1600,
        waitReady: config.waitReady || false,
        listenTimeout: config.listenTimeout || 3000,
        autorestart: true,
      };

      this.pm2!.start(pm2Options, async (err, proc) => {
        if (err) {
          logger.error(`Failed to start service ${serviceName} with PM2:`, err);
          reject(new Error(`PM2 start failed: ${err.message}`));
          return;
        }

        // Update service status to RUNNING
        await this.prisma.service.update({
          where: { id: serviceId },
          data: { status: ServiceStatus.RUNNING },
        });

        const serviceInfo: ServiceInfo = {
          id: serviceId,
          name: serviceName,
          status: ServiceStatus.RUNNING,
          pid: proc?.pid,
          uptime: proc?.pm2_env?.pm_uptime,
          memory: proc?.monit?.memory,
          cpu: proc?.monit?.cpu,
          restarts: proc?.pm2_env?.restart_time,
        };

        logger.info(`Service ${serviceName} started successfully with PM2`);
        this.emit('service-started', serviceId, serviceName);
        resolve(serviceInfo);
      });
    });
  }

  private async startServiceWithChildProcess(
    serviceId: string,
    serviceName: string,
    config: any
  ): Promise<ServiceInfo> {
    const script = config.script;
    const cwd = config.cwd || process.cwd();
    const args = config.args
      ? Array.isArray(config.args)
        ? config.args
        : config.args.split(' ')
      : [];
    const env = { ...process.env, ...config.env };

    const childProcess = spawn('node', [script, ...args], {
      cwd,
      env,
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false,
    });

    this.childProcesses.set(serviceId, childProcess);

    // Handle process events
    childProcess.on('spawn', async () => {
      logger.info(`Service ${serviceName} started with PID ${childProcess.pid}`);
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.RUNNING },
      });
      this.emit('service-started', serviceId, serviceName);
    });

    childProcess.on('error', async error => {
      logger.error(`Service ${serviceName} error:`, error);
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.ERROR },
      });
      this.emit('service-error', serviceId, serviceName, error);
    });

    childProcess.on('exit', async (code, signal) => {
      logger.info(`Service ${serviceName} exited with code ${code}, signal ${signal}`);
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.STOPPED },
      });
      this.childProcesses.delete(serviceId);
      this.emit('service-stopped', serviceId, serviceName);
    });

    // Setup log handling
    if (childProcess.stdout) {
      childProcess.stdout.on('data', data => {
        const lines = data
          .toString()
          .split('\n')
          .filter((line: string) => line.trim());
        lines.forEach((line: string) => {
          logger.info(`[${serviceName}] ${line}`);
          this.emit('log-line', serviceId, line);
        });
      });
    }

    if (childProcess.stderr) {
      childProcess.stderr.on('data', data => {
        const lines = data
          .toString()
          .split('\n')
          .filter((line: string) => line.trim());
        lines.forEach((line: string) => {
          logger.error(`[${serviceName}] ${line}`);
          this.emit('log-line', serviceId, `ERROR: ${line}`);
        });
      });
    }

    return {
      id: serviceId,
      name: serviceName,
      status: ServiceStatus.RUNNING,
      pid: childProcess.pid,
    };
  }

  async stopService(serviceId: string): Promise<ServiceInfo> {
    logger.info(`Stopping service: ${serviceId}`);

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { pm2Config: true },
    });

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    // Update service status to STOPPING
    await this.prisma.service.update({
      where: { id: serviceId },
      data: { status: ServiceStatus.STOPPING },
    });

    try {
      if (this.pm2Available && this.pm2) {
        return await this.stopServiceWithPM2(service.id, service.name, service.pm2Config!.name);
      } else {
        return await this.stopServiceWithChildProcess(service.id, service.name);
      }
    } catch (error) {
      // Update service status to ERROR
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.ERROR },
      });
      throw error;
    }
  }

  private async stopServiceWithPM2(
    serviceId: string,
    serviceName: string,
    pm2Name: string
  ): Promise<ServiceInfo> {
    return new Promise((resolve, reject) => {
      this.pm2!.stop(pm2Name, async (err, procs) => {
        if (err) {
          logger.error(`Failed to stop service ${serviceName} with PM2:`, err);
          reject(new Error(`PM2 stop failed: ${err.message}`));
          return;
        }

        // Update service status to STOPPED
        await this.prisma.service.update({
          where: { id: serviceId },
          data: { status: ServiceStatus.STOPPED },
        });

        logger.info(`Service ${serviceName} stopped successfully with PM2`);
        this.emit('service-stopped', serviceId, serviceName);

        resolve({
          id: serviceId,
          name: serviceName,
          status: ServiceStatus.STOPPED,
        });
      });
    });
  }

  private async stopServiceWithChildProcess(
    serviceId: string,
    serviceName: string
  ): Promise<ServiceInfo> {
    const childProcess = this.childProcesses.get(serviceId);

    if (!childProcess) {
      // Service is already stopped
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.STOPPED },
      });
      return {
        id: serviceId,
        name: serviceName,
        status: ServiceStatus.STOPPED,
      };
    }

    return new Promise(resolve => {
      const cleanup = async () => {
        await this.prisma.service.update({
          where: { id: serviceId },
          data: { status: ServiceStatus.STOPPED },
        });
        this.childProcesses.delete(serviceId);
        this.emit('service-stopped', serviceId, serviceName);
        resolve({
          id: serviceId,
          name: serviceName,
          status: ServiceStatus.STOPPED,
        });
      };

      childProcess.on('exit', cleanup);

      // Try graceful shutdown first
      childProcess.kill('SIGTERM');

      // Force kill after timeout
      setTimeout(() => {
        if (!childProcess.killed) {
          childProcess.kill('SIGKILL');
        }
      }, 5000);
    });
  }

  async restartService(serviceId: string): Promise<ServiceInfo> {
    logger.info(`Restarting service: ${serviceId}`);

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { pm2Config: true },
    });

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    // Update service status to RESTARTING
    await this.prisma.service.update({
      where: { id: serviceId },
      data: { status: ServiceStatus.RESTARTING },
    });

    try {
      if (this.pm2Available && this.pm2) {
        return await this.restartServiceWithPM2(service.id, service.name, service.pm2Config!.name);
      } else {
        // For child_process fallback, restart means stop then start
        await this.stopService(serviceId);
        return await this.startService(serviceId);
      }
    } catch (error) {
      // Update service status to ERROR
      await this.prisma.service.update({
        where: { id: serviceId },
        data: { status: ServiceStatus.ERROR },
      });
      throw error;
    }
  }

  private async restartServiceWithPM2(
    serviceId: string,
    serviceName: string,
    pm2Name: string
  ): Promise<ServiceInfo> {
    return new Promise((resolve, reject) => {
      this.pm2!.restart(pm2Name, async (err, procs) => {
        if (err) {
          logger.error(`Failed to restart service ${serviceName} with PM2:`, err);
          reject(new Error(`PM2 restart failed: ${err.message}`));
          return;
        }

        const proc = procs?.[0];
        const status = proc?.pm2_env?.status
          ? this.mapPM2StatusToServiceStatus(proc.pm2_env.status)
          : ServiceStatus.RUNNING;

        // Update service status
        await this.prisma.service.update({
          where: { id: serviceId },
          data: { status },
        });

        logger.info(`Service ${serviceName} restarted successfully with PM2`);

        resolve({
          id: serviceId,
          name: serviceName,
          status,
          pid: proc?.pid,
          uptime: proc?.pm2_env?.pm_uptime,
          memory: proc?.monit?.memory,
          cpu: proc?.monit?.cpu,
          restarts: proc?.pm2_env?.restart_time,
        });
      });
    });
  }

  async getServiceStatus(serviceId: string): Promise<ServiceInfo> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { pm2Config: true },
    });

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    if (this.pm2Available && this.pm2 && service.pm2Config) {
      return await this.getServiceStatusWithPM2(service.id, service.name, service.pm2Config.name);
    } else {
      return await this.getServiceStatusWithChildProcess(service.id, service.name);
    }
  }

  private async getServiceStatusWithPM2(
    serviceId: string,
    serviceName: string,
    pm2Name: string
  ): Promise<ServiceInfo> {
    return new Promise((resolve, reject) => {
      this.pm2!.describe(pm2Name, async (err, procs) => {
        if (err) {
          logger.error(`Failed to get status for service ${serviceName}:`, err);
          reject(new Error(`PM2 describe failed: ${err.message}`));
          return;
        }

        const proc = procs?.[0];
        if (!proc) {
          // Service not found in PM2, update DB status
          await this.prisma.service.update({
            where: { id: serviceId },
            data: { status: ServiceStatus.STOPPED },
          });
          resolve({
            id: serviceId,
            name: serviceName,
            status: ServiceStatus.STOPPED,
          });
          return;
        }

        const status = proc.pm2_env?.status
          ? this.mapPM2StatusToServiceStatus(proc.pm2_env.status)
          : ServiceStatus.UNKNOWN;

        // Update service status in DB
        await this.prisma.service.update({
          where: { id: serviceId },
          data: { status },
        });

        resolve({
          id: serviceId,
          name: serviceName,
          status,
          pid: proc.pid,
          uptime: proc.pm2_env?.pm_uptime,
          memory: proc.monit?.memory,
          cpu: proc.monit?.cpu,
          restarts: proc.pm2_env?.restart_time,
        });
      });
    });
  }

  private async getServiceStatusWithChildProcess(
    serviceId: string,
    serviceName: string
  ): Promise<ServiceInfo> {
    const childProcess = this.childProcesses.get(serviceId);
    const status =
      childProcess && !childProcess.killed ? ServiceStatus.RUNNING : ServiceStatus.STOPPED;

    // Update service status in DB
    await this.prisma.service.update({
      where: { id: serviceId },
      data: { status },
    });

    return {
      id: serviceId,
      name: serviceName,
      status,
      pid: childProcess?.pid,
    };
  }

  async getAllServicesStatus(): Promise<ServiceInfo[]> {
    const services = await this.prisma.service.findMany({
      include: { pm2Config: true },
    });

    const statuses = await Promise.all(
      services.map(async service => {
        try {
          return await this.getServiceStatus(service.id);
        } catch (error) {
          logger.error(`Failed to get status for service ${service.name}:`, error);
          return {
            id: service.id,
            name: service.name,
            status: ServiceStatus.ERROR,
          };
        }
      })
    );

    return statuses;
  }

  async tailLogs(serviceId: string, options: LogTailOptions = {}): Promise<EventEmitter> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { pm2Config: true },
    });

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    const logEmitter = new EventEmitter();

    if (this.pm2Available && this.pm2 && service.pm2Config) {
      await this.tailLogsWithPM2(service.pm2Config.name, options, logEmitter);
    } else {
      await this.tailLogsWithChildProcess(serviceId, service.name, options, logEmitter);
    }

    return logEmitter;
  }

  private async tailLogsWithPM2(
    pm2Name: string,
    options: LogTailOptions,
    emitter: EventEmitter
  ): Promise<void> {
    // PM2 programmatic log tailing is complex, using PM2 CLI as fallback
    const lines = options.lines || 100;
    const followFlag = options.follow ? '-f' : '';

    const logProcess = spawn(
      'npx',
      ['pm2', 'logs', pm2Name, '--lines', lines.toString(), followFlag].filter(Boolean),
      {
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    );

    if (logProcess.stdout) {
      logProcess.stdout.on('data', data => {
        const logLines = data
          .toString()
          .split('\n')
          .filter((line: string) => line.trim());
        logLines.forEach((line: string) => {
          emitter.emit('log', line);
        });
      });
    }

    if (logProcess.stderr) {
      logProcess.stderr.on('data', data => {
        const logLines = data
          .toString()
          .split('\n')
          .filter((line: string) => line.trim());
        logLines.forEach((line: string) => {
          emitter.emit('error', line);
        });
      });
    }

    logProcess.on('exit', () => {
      emitter.emit('end');
    });
  }

  private async tailLogsWithChildProcess(
    serviceId: string,
    serviceName: string,
    options: LogTailOptions,
    emitter: EventEmitter
  ): Promise<void> {
    // For child_process, we rely on the logs we're already capturing
    // This is a simplified implementation - in a real scenario you might want to tail actual log files

    if (options.follow) {
      // Listen for new log lines
      const logHandler = (logServiceId: string, line: string) => {
        if (logServiceId === serviceId) {
          emitter.emit('log', line);
        }
      };

      this.on('log-line', logHandler);

      // Cleanup handler when emitter is closed
      emitter.on('end', () => {
        this.off('log-line', logHandler);
      });
    }

    // For non-following mode, we would need to read from log files if they exist
    // This is a placeholder implementation
    emitter.emit('log', `Log tail for ${serviceName} (child_process mode)`);
    if (!options.follow) {
      emitter.emit('end');
    }
  }

  async createOrUpdateServiceConfig(serviceId: string, config: Partial<any>): Promise<void> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { pm2Config: true },
    });

    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }

    if (service.pm2Config) {
      // Update existing config
      await this.prisma.servicePm2Config.update({
        where: { serviceId },
        data: {
          ...config,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new config
      await this.prisma.servicePm2Config.create({
        data: {
          serviceId,
          script: config.script || 'app.js',
          name: config.name || service.name,
          ...config,
        },
      });
    }

    logger.info(`Updated PM2 config for service ${service.name}`);
  }

  async deleteServiceConfig(serviceId: string): Promise<void> {
    await this.prisma.servicePm2Config.delete({
      where: { serviceId },
    });
    logger.info(`Deleted PM2 config for service ${serviceId}`);
  }

  async disconnect(): Promise<void> {
    if (this.pm2Available && this.pm2) {
      this.pm2.disconnect();
    }

    // Stop all child processes
    for (const [serviceId, childProcess] of this.childProcesses) {
      if (!childProcess.killed) {
        childProcess.kill('SIGTERM');
      }
    }
    this.childProcesses.clear();

    // Stop all log tails
    for (const [serviceId, logTail] of this.logTails) {
      if (!logTail.killed) {
        logTail.kill('SIGTERM');
      }
    }
    this.logTails.clear();
  }
}

export const serviceManager = new ServiceManager();
export default serviceManager;
