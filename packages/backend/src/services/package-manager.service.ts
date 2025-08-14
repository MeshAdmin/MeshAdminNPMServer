import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { Server as SocketIOServer } from 'socket.io';
import logger from '@lib/logger';
import {
  PackageManagerType,
  PackageManagerConfig,
  PackageManagerOperation,
  PackageManagerProgress,
  PackageManagerCommand,
  OutdatedPackage,
  InstallOptions,
  UpgradeOptions,
  RemoveOptions,
} from '../types/package-manager';

export class PackageManagerService extends EventEmitter {
  private config: PackageManagerConfig;
  private operations: Map<string, PackageManagerOperation> = new Map();
  private io?: SocketIOServer;

  constructor(config: PackageManagerConfig) {
    super();
    this.config = config;
  }

  /**
   * Set the Socket.IO server instance for real-time progress events
   */
  setSocketIO(io: SocketIOServer): void {
    this.io = io;
  }

  /**
   * Detect the package manager type based on lock files
   */
  static detectPackageManager(workingDirectory: string): PackageManagerType {
    const fs = require('fs');
    const path = require('path');

    if (fs.existsSync(path.join(workingDirectory, 'pnpm-lock.yaml'))) {
      return 'pnpm';
    }
    if (fs.existsSync(path.join(workingDirectory, 'yarn.lock'))) {
      return 'yarn';
    }
    return 'npm';
  }

  /**
   * List outdated packages
   */
  async listOutdated(): Promise<OutdatedPackage[]> {
    const operationId = uuidv4();
    const operation = this.createOperation(operationId, 'list-outdated');

    try {
      const command = this.buildCommand('outdated', [], { json: true });
      const result = await this.executeCommand(command, operation);

      let outdatedPackages: OutdatedPackage[] = [];

      if (this.config.type === 'npm') {
        // npm outdated returns JSON in a specific format
        const output = result.stdout.join('\n');
        if (output.trim()) {
          try {
            const data = JSON.parse(output);
            outdatedPackages = Object.entries(data).map(([name, info]: [string, any]) => ({
              name,
              current: info.current,
              wanted: info.wanted,
              latest: info.latest,
              location: info.location,
              type: info.type,
            }));
          } catch (parseError) {
            logger.warn('Failed to parse npm outdated JSON output:', parseError);
          }
        }
      } else if (this.config.type === 'pnpm') {
        // pnpm outdated returns JSON in a different format
        const output = result.stdout.join('\n');
        if (output.trim()) {
          try {
            const data = JSON.parse(output);
            outdatedPackages = data.map((pkg: any) => ({
              name: pkg.packageName,
              current: pkg.current,
              wanted: pkg.wanted,
              latest: pkg.latest,
            }));
          } catch (parseError) {
            logger.warn('Failed to parse pnpm outdated JSON output:', parseError);
            // Fallback to parsing table output
            outdatedPackages = this.parseOutdatedTableOutput(result.stdout);
          }
        }
      }

      this.completeOperation(operation, { packages: outdatedPackages });
      return outdatedPackages;
    } catch (error) {
      this.failOperation(operation, error as Error);
      throw error;
    }
  }

  /**
   * Install packages
   */
  async install(packages: string[], options: InstallOptions = {}): Promise<void> {
    const operationId = uuidv4();
    const operation = this.createOperation(operationId, 'install', undefined, packages);

    try {
      const args = this.buildInstallArgs(packages, options);
      const command = this.buildCommand('install', args);
      await this.executeCommand(command, operation);
      this.completeOperation(operation);
    } catch (error) {
      this.failOperation(operation, error as Error);
      throw error;
    }
  }

  /**
   * Upgrade packages
   */
  async upgrade(packages?: string[], options: UpgradeOptions = {}): Promise<void> {
    const operationId = uuidv4();
    const operation = this.createOperation(operationId, 'upgrade', undefined, packages);

    try {
      const args = this.buildUpgradeArgs(packages, options);
      let command: PackageManagerCommand;

      if (this.config.type === 'npm') {
        command = this.buildCommand('update', args);
      } else if (this.config.type === 'pnpm') {
        command = this.buildCommand('update', args);
      } else {
        command = this.buildCommand('upgrade', args);
      }

      await this.executeCommand(command, operation);
      this.completeOperation(operation);
    } catch (error) {
      this.failOperation(operation, error as Error);
      throw error;
    }
  }

  /**
   * Remove packages
   */
  async remove(packages: string[], options: RemoveOptions = {}): Promise<void> {
    const operationId = uuidv4();
    const operation = this.createOperation(operationId, 'remove', undefined, packages);

    try {
      const args = this.buildRemoveArgs(packages, options);
      let command: PackageManagerCommand;

      if (this.config.type === 'npm') {
        command = this.buildCommand('uninstall', args);
      } else {
        command = this.buildCommand('remove', args);
      }

      await this.executeCommand(command, operation);
      this.completeOperation(operation);
    } catch (error) {
      this.failOperation(operation, error as Error);
      throw error;
    }
  }

  /**
   * Get operation status
   */
  getOperation(operationId: string): PackageManagerOperation | undefined {
    return this.operations.get(operationId);
  }

  /**
   * Get all operations
   */
  getAllOperations(): PackageManagerOperation[] {
    return Array.from(this.operations.values());
  }

  /**
   * Clear completed operations
   */
  clearCompletedOperations(): void {
    for (const [id, operation] of this.operations.entries()) {
      if (operation.status === 'completed' || operation.status === 'failed') {
        this.operations.delete(id);
      }
    }
  }

  // Private methods

  private createOperation(
    id: string,
    type: PackageManagerOperation['type'],
    packageName?: string,
    packages?: string[]
  ): PackageManagerOperation {
    const operation: PackageManagerOperation = {
      id,
      type,
      package: packageName,
      packages,
      status: 'pending',
      progress: 0,
      output: [],
      startTime: new Date(),
    };

    this.operations.set(id, operation);
    this.emitProgress(operation);
    return operation;
  }

  private updateOperation(operation: PackageManagerOperation): void {
    this.operations.set(operation.id, operation);
    this.emitProgress(operation);
  }

  private completeOperation(operation: PackageManagerOperation, data?: any): void {
    operation.status = 'completed';
    operation.progress = 100;
    operation.endTime = new Date();
    this.updateOperation(operation);
    logger.info(`Package manager operation completed: ${operation.type}`, { operationId: operation.id, data });
  }

  private failOperation(operation: PackageManagerOperation, error: Error): void {
    operation.status = 'failed';
    operation.error = error.message;
    operation.endTime = new Date();
    this.updateOperation(operation);
    logger.error(`Package manager operation failed: ${operation.type}`, { operationId: operation.id, error: error.message });
  }

  private emitProgress(operation: PackageManagerOperation): void {
    const progress: PackageManagerProgress = {
      operationId: operation.id,
      type: operation.type,
      progress: operation.progress,
      message: this.getProgressMessage(operation),
      data: {
        status: operation.status,
        output: operation.output,
        error: operation.error,
      },
    };

    // Emit via EventEmitter
    this.emit('progress', progress);

    // Emit via Socket.IO if available
    if (this.io) {
      this.io.emit('package-manager:progress', progress);
    }
  }

  private getProgressMessage(operation: PackageManagerOperation): string {
    switch (operation.status) {
      case 'pending':
        return `Preparing ${operation.type} operation...`;
      case 'running':
        return `${operation.type} in progress...`;
      case 'completed':
        return `${operation.type} completed successfully`;
      case 'failed':
        return `${operation.type} failed: ${operation.error || 'Unknown error'}`;
      default:
        return `${operation.type} - ${operation.status}`;
    }
  }

  private buildCommand(subcommand: string, args: string[], options: { json?: boolean } = {}): PackageManagerCommand {
    const fullArgs = [subcommand, ...args];
    
    if (options.json && (this.config.type === 'npm' || this.config.type === 'pnpm')) {
      fullArgs.push('--json');
    }

    return {
      command: this.config.type,
      args: fullArgs,
      cwd: this.config.workingDirectory,
    };
  }

  private buildInstallArgs(packages: string[], options: InstallOptions): string[] {
    const args: string[] = [];

    if (packages && packages.length > 0) {
      args.push(...packages);
    }

    if (options.isDev) {
      if (this.config.type === 'npm') {
        args.push('--save-dev');
      } else if (this.config.type === 'pnpm') {
        args.push('--save-dev');
      } else {
        args.push('--dev');
      }
    }

    if (options.isGlobal) {
      args.push('--global');
    }

    if (options.exact) {
      if (this.config.type === 'npm' || this.config.type === 'pnpm') {
        args.push('--save-exact');
      } else {
        args.push('--exact');
      }
    }

    return args;
  }

  private buildUpgradeArgs(packages?: string[], options?: UpgradeOptions): string[] {
    const args: string[] = [];

    if (packages && packages.length > 0) {
      args.push(...packages);
    }

    if (options?.latest) {
      if (this.config.type === 'pnpm') {
        args.push('--latest');
      } else if (this.config.type === 'yarn') {
        args.push('--latest');
      }
    }

    if (options?.interactive && this.config.type === 'pnpm') {
      args.push('--interactive');
    }

    return args;
  }

  private buildRemoveArgs(packages: string[], options: RemoveOptions): string[] {
    const args: string[] = [...packages];

    if (options.isGlobal) {
      args.push('--global');
    }

    return args;
  }

  private async executeCommand(
    command: PackageManagerCommand,
    operation: PackageManagerOperation
  ): Promise<{ stdout: string[]; stderr: string[] }> {
    return new Promise((resolve, reject) => {
      logger.info(`Executing command: ${command.command} ${command.args.join(' ')}`, {
        operationId: operation.id,
        cwd: command.cwd,
      });

      operation.status = 'running';
      operation.progress = 10;
      this.updateOperation(operation);

      const child: ChildProcess = spawn(command.command, command.args, {
        cwd: command.cwd,
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: true,
      });

      const stdout: string[] = [];
      const stderr: string[] = [];
      let progressStep = 10;

      // Handle stdout
      if (child.stdout) {
        child.stdout.on('data', (data: Buffer) => {
          const output = data.toString();
          stdout.push(output);
          operation.output.push(output);
          
          // Update progress incrementally
          if (operation.progress < 90) {
            operation.progress = Math.min(operation.progress + progressStep, 90);
            progressStep = Math.max(progressStep * 0.8, 1); // Diminishing progress increments
          }
          
          this.updateOperation(operation);
          logger.debug(`Command stdout: ${output.trim()}`, { operationId: operation.id });
        });
      }

      // Handle stderr
      if (child.stderr) {
        child.stderr.on('data', (data: Buffer) => {
          const output = data.toString();
          stderr.push(output);
          operation.output.push(`ERROR: ${output}`);
          this.updateOperation(operation);
          logger.debug(`Command stderr: ${output.trim()}`, { operationId: operation.id });
        });
      }

      // Handle process completion
      child.on('close', (code: number | null) => {
        logger.info(`Command completed with code: ${code}`, { operationId: operation.id });
        
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          const error = new Error(`Command failed with exit code ${code}`);
          reject(error);
        }
      });

      // Handle process errors
      child.on('error', (error: Error) => {
        logger.error(`Command error: ${error.message}`, { operationId: operation.id });
        reject(error);
      });

      // Handle timeout
      if (this.config.timeout) {
        setTimeout(() => {
          if (!child.killed) {
            child.kill('SIGTERM');
            reject(new Error(`Command timed out after ${this.config.timeout}ms`));
          }
        }, this.config.timeout);
      }
    });
  }

  private parseOutdatedTableOutput(output: string[]): OutdatedPackage[] {
    const packages: OutdatedPackage[] = [];
    const lines = output.join('\n').split('\n');
    
    for (const line of lines) {
      // Skip headers and empty lines
      if (!line.trim() || line.includes('Package') || line.includes('---')) {
        continue;
      }
      
      // Parse table format: Package | Current | Wanted | Latest
      const parts = line.split(/\s+/).filter(part => part.trim());
      if (parts.length >= 4) {
        packages.push({
          name: parts[0],
          current: parts[1],
          wanted: parts[2],
          latest: parts[3],
        });
      }
    }
    
    return packages;
  }
}

// Create default package manager service instance
const packageManagerConfig: PackageManagerConfig = {
  type: PackageManagerService.detectPackageManager(process.cwd()),
  workingDirectory: process.cwd(),
  timeout: 300000, // 5 minutes
};

export const packageManagerService = new PackageManagerService(packageManagerConfig);
export default packageManagerService;
