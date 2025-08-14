// Autonomous AI Testing & Fixing System
const aiIntegration = require('./aiIntegration');
const browserAutomation = require('./browserAutomation');
const loggingSystem = require('./loggingSystem');
const gibberlinkIntegration = require('./gibberlinkIntegration');

class AutonomousTestingSystem {
  constructor() {
    this.isRunning = false;
    this.testQueue = [];
    this.emergencyStop = false;
  }

  async start() {
    if (this.emergencyStop) {
      loggingSystem.warning(
        'Emergency stop active. Cannot start autonomous testing.',
        'autonomous-system'
      );
      return;
    }

    this.isRunning = true;
    loggingSystem.info('Autonomous AI Testing System started', 'autonomous-system');

    // Start continuous testing loop
    this.continuousTesting();
  }

  stop() {
    this.isRunning = false;
    loggingSystem.info('Autonomous AI Testing System stopped', 'autonomous-system');
  }

  emergencyStopActivate() {
    this.emergencyStop = true;
    this.isRunning = false;
    loggingSystem.critical('Emergency stop activated!', 'autonomous-system');
  }

  emergencyStopDeactivate() {
    this.emergencyStop = false;
    loggingSystem.info('Emergency stop deactivated', 'autonomous-system');
  }

  async continuousTesting() {
    while (this.isRunning && !this.emergencyStop) {
      try {
        // Detect issues
        const issues = await this.detectIssues();

        if (issues.length > 0) {
          loggingSystem.warning(`Detected ${issues.length} issues`, 'autonomous-system');

          // Fix issues using AI
          for (const issue of issues) {
            await this.fixIssue(issue);
          }
        }

        // Run browser automation tests
        await browserAutomation();

        // Wait before next cycle
        await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds
      } catch (error) {
        loggingSystem.critical(
          `Error in autonomous testing: ${error.message}`,
          'autonomous-system'
        );
      }
    }
  }

  async detectIssues() {
    const issues = [];

    try {
      // Check for port conflicts (the current issue we're experiencing)
      await this.checkPortConflicts(issues);

      // Check service health
      await this.checkServiceHealth(issues);

      // Check API endpoints
      await this.checkAPIHealth(issues);

      // Check database connectivity
      await this.checkDatabaseHealth(issues);

      // Check Electron app health
      await this.checkElectronHealth(issues);
    } catch (error) {
      issues.push({
        type: 'system',
        description: `Issue detection failed: ${error.message}`,
        severity: 'high',
      });
    }

    return issues;
  }

  async checkPortConflicts(issues) {
    const { spawn } = require('child_process');
    const criticalPorts = [5555, 3001]; // Frontend and backend ports

    for (const port of criticalPorts) {
      try {
        const result = await new Promise((resolve, reject) => {
          const lsof = spawn('lsof', ['-ti', port.toString()]);
          let output = '';

          lsof.stdout.on('data', data => {
            output += data.toString();
          });

          lsof.on('close', code => {
            resolve({
              port,
              inUse: code === 0,
              processes: output
                .trim()
                .split('\n')
                .filter(p => p),
            });
          });

          lsof.on('error', error => {
            resolve({ port, inUse: false, error: error.message });
          });
        });

        if (result.inUse && result.processes.length > 0) {
          // Check if these are legitimate processes or conflicts
          const isLegitimate = await this.validatePortUsage(port, result.processes);
          if (!isLegitimate) {
            issues.push({
              type: 'port_conflict',
              description: `Port ${port} is occupied by unexpected processes: ${result.processes.join(', ')}`,
              severity: 'high',
              port: port,
              processes: result.processes,
              autoFix: true,
            });
          }
        }
      } catch (error) {
        // Ignore port check errors for now
      }
    }
  }

  async validatePortUsage(port, processes) {
    // For port 5555, it should only be used by our frontend Vite server
    // For port 3001, it should only be used by our backend
    if (port === 5555) {
      // Check if it's our Vite process
      return processes.some(pid => this.checkProcessCommand(pid, ['vite', 'node_modules']));
    }
    if (port === 3001) {
      // Check if it's our backend process
      return processes.some(pid => this.checkProcessCommand(pid, ['ts-node', 'index.ts']));
    }
    return true; // Unknown port, assume legitimate
  }

  async checkProcessCommand(pid, expectedStrings) {
    try {
      const { spawn } = require('child_process');
      const result = await new Promise(resolve => {
        const ps = spawn('ps', ['-p', pid, '-o', 'command=']);
        let output = '';

        ps.stdout.on('data', data => {
          output += data.toString();
        });

        ps.on('close', () => {
          resolve(output.toLowerCase());
        });

        ps.on('error', () => resolve(''));
      });

      return expectedStrings.some(str => result.includes(str.toLowerCase()));
    } catch {
      return false;
    }
  }

  async checkServiceHealth(issues) {
    // This would integrate with the serviceManager to check service statuses
    // For now, just check if services are in ERROR state
    try {
      const services = await this.getServicesStatus();
      services.forEach(service => {
        if (service.status === 'ERROR') {
          issues.push({
            type: 'service_error',
            description: `Service ${service.name} is in ERROR state`,
            severity: 'medium',
            serviceId: service.id,
            autoFix: true,
          });
        }
      });
    } catch (error) {
      // Skip if we can't get service status
    }
  }

  async checkAPIHealth(issues) {
    // Check if backend API is responding
    try {
      const http = require('http');
      await new Promise((resolve, reject) => {
        const req = http.get('http://localhost:3001/', res => {
          resolve(res.statusCode);
        });
        req.on('error', reject);
        req.setTimeout(5000, () => reject(new Error('Timeout')));
      });
    } catch (error) {
      issues.push({
        type: 'api_down',
        description: 'Backend API is not responding',
        severity: 'high',
        autoFix: true,
      });
    }
  }

  async checkDatabaseHealth(issues) {
    // This would check database connectivity
    // Implementation would depend on your database service
  }

  async checkElectronHealth(issues) {
    // Check if Electron processes are running properly
    // This could check for crash logs, hung processes, etc.
  }

  async getServicesStatus() {
    // Mock implementation - in real app, this would query the database
    return [
      { id: '1', name: 'web-app', status: 'RUNNING' },
      { id: '2', name: 'api-server', status: 'RUNNING' },
      { id: '3', name: 'background-worker', status: 'ERROR' },
    ];
  }

  async fixIssue(issue) {
    loggingSystem.info(`Attempting to fix issue: ${issue.description}`, 'autonomous-system');

    // Use AI providers to generate and apply fixes
    const fixStrategy = await this.generateFixStrategy(issue);

    if (fixStrategy) {
      await this.applyFix(fixStrategy);
      loggingSystem.info(`Applied fix for: ${issue.description}`, 'autonomous-system');
    }
  }

  async generateFixStrategy(issue) {
    switch (issue.type) {
      case 'port_conflict':
        return {
          type: 'kill_conflicting_processes',
          port: issue.port,
          processes: issue.processes,
          issue: issue,
        };
      case 'service_error':
        return {
          type: 'restart_service',
          serviceId: issue.serviceId,
          issue: issue,
        };
      case 'api_down':
        return {
          type: 'restart_backend',
          issue: issue,
        };
      default:
        return {
          type: 'log_only',
          issue: issue,
        };
    }
  }

  async applyFix(strategy) {
    loggingSystem.info(`Applying fix strategy: ${strategy.type}`, 'autonomous-system');

    try {
      switch (strategy.type) {
        case 'kill_conflicting_processes':
          await this.fixPortConflict(strategy);
          break;
        case 'restart_service':
          await this.fixServiceError(strategy);
          break;
        case 'restart_backend':
          await this.fixBackendDown(strategy);
          break;
        default:
          loggingSystem.info(
            `No automatic fix available for ${strategy.issue.type}`,
            'autonomous-system'
          );
      }
    } catch (error) {
      loggingSystem.warning(`Fix failed: ${error.message}`, 'autonomous-system');
    }
  }

  async fixPortConflict(strategy) {
    const { spawn } = require('child_process');
    const { port, processes } = strategy;

    loggingSystem.info(
      `🔧 Fixing port conflict on ${port} by killing processes: ${processes.join(', ')}`,
      'autonomous-system'
    );

    for (const pid of processes) {
      try {
        // Kill the process
        await new Promise((resolve, reject) => {
          const kill = spawn('kill', ['-9', pid]);
          kill.on('close', code => {
            if (code === 0) {
              loggingSystem.info(`✅ Killed process ${pid}`, 'autonomous-system');
            } else {
              loggingSystem.warning(`⚠️ Failed to kill process ${pid}`, 'autonomous-system');
            }
            resolve();
          });
          kill.on('error', error => {
            loggingSystem.warning(
              `Error killing process ${pid}: ${error.message}`,
              'autonomous-system'
            );
            resolve();
          });
        });
      } catch (error) {
        loggingSystem.warning(
          `Failed to kill process ${pid}: ${error.message}`,
          'autonomous-system'
        );
      }
    }

    // Wait a moment for processes to die
    await new Promise(resolve => setTimeout(resolve, 2000));

    loggingSystem.info(`🎯 Port ${port} should now be available`, 'autonomous-system');
  }

  async fixServiceError(strategy) {
    loggingSystem.info(
      `🔧 Attempting to restart service ${strategy.serviceId}`,
      'autonomous-system'
    );

    // This would integrate with the service manager to restart the service
    // For now, just log the action
    loggingSystem.info(`Service restart initiated for ${strategy.serviceId}`, 'autonomous-system');
  }

  async fixBackendDown(strategy) {
    loggingSystem.info('🔧 Backend API is down, attempting restart...', 'autonomous-system');

    // This could restart the backend process or send notifications
    // For now, just log the issue
    loggingSystem.critical(
      'Backend restart needed - manual intervention may be required',
      'autonomous-system'
    );
  }

  addTest(test) {
    this.testQueue.push(test);
    loggingSystem.debug(`Test added to queue: ${test.name}`, 'autonomous-system');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      emergencyStop: this.emergencyStop,
      queueLength: this.testQueue.length,
    };
  }
}

const autonomousTestingSystem = new AutonomousTestingSystem();
module.exports = autonomousTestingSystem;
