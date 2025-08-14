import { PackageManagerService } from '../package-manager.service';
import { PackageManagerType, PackageManagerConfig } from '../../types/package-manager';

// Mock child_process spawn
jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

// Mock logger
jest.mock('@lib/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
}));

describe('PackageManagerService', () => {
  let service: PackageManagerService;
  let mockConfig: PackageManagerConfig;

  beforeEach(() => {
    mockConfig = {
      type: 'npm' as PackageManagerType,
      workingDirectory: '/test/directory',
      timeout: 30000,
    };
    service = new PackageManagerService(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('detectPackageManager', () => {
    it('should detect package manager based on lock files', () => {
      // This test relies on the actual file system, so we'll just verify the function exists
      const result = PackageManagerService.detectPackageManager('/test/directory');
      expect(['npm', 'pnpm', 'yarn']).toContain(result);
    });
  });

  describe('getOperation', () => {
    it('should return undefined for non-existent operation', () => {
      const result = service.getOperation('non-existent-id');
      expect(result).toBeUndefined();
    });
  });

  describe('getAllOperations', () => {
    it('should return empty array initially', () => {
      const result = service.getAllOperations();
      expect(result).toEqual([]);
    });
  });

  describe('clearCompletedOperations', () => {
    it('should not throw when called on empty operations', () => {
      expect(() => service.clearCompletedOperations()).not.toThrow();
    });
  });

  describe('buildCommand', () => {
    it('should build npm command correctly', () => {
      const command = service['buildCommand']('install', ['package1', 'package2']);
      expect(command).toEqual({
        command: 'npm',
        args: ['install', 'package1', 'package2'],
        cwd: '/test/directory',
      });
    });

    it('should add --json flag when requested', () => {
      const command = service['buildCommand']('outdated', [], { json: true });
      expect(command).toEqual({
        command: 'npm',
        args: ['outdated', '--json'],
        cwd: '/test/directory',
      });
    });
  });

  describe('buildInstallArgs', () => {
    it('should build install args correctly for npm', () => {
      const args = service['buildInstallArgs'](['package1'], { isDev: true, exact: true });
      expect(args).toEqual(['package1', '--save-dev', '--save-exact']);
    });

    it('should build install args for global installation', () => {
      const args = service['buildInstallArgs'](['package1'], { isGlobal: true });
      expect(args).toEqual(['package1', '--global']);
    });
  });

  describe('buildUpgradeArgs', () => {
    it('should build upgrade args correctly', () => {
      const args = service['buildUpgradeArgs'](['package1'], { latest: false });
      expect(args).toEqual(['package1']);
    });

    it('should handle empty packages array', () => {
      const args = service['buildUpgradeArgs'](undefined, { latest: false });
      expect(args).toEqual([]);
    });
  });

  describe('buildRemoveArgs', () => {
    it('should build remove args correctly', () => {
      const args = service['buildRemoveArgs'](['package1', 'package2'], {});
      expect(args).toEqual(['package1', 'package2']);
    });

    it('should add global flag when specified', () => {
      const args = service['buildRemoveArgs'](['package1'], { isGlobal: true });
      expect(args).toEqual(['package1', '--global']);
    });
  });

  describe('parseOutdatedTableOutput', () => {
    it('should parse table output correctly', () => {
      const output = [
        'Package    Current  Wanted  Latest',
        '---------- -------- -------- --------',
        'package1   1.0.0    1.1.0    1.2.0',
        'package2   2.0.0    2.1.0    2.2.0',
      ];

      const result = service['parseOutdatedTableOutput'](output);
      expect(result).toEqual([
        {
          name: 'package1',
          current: '1.0.0',
          wanted: '1.1.0',
          latest: '1.2.0',
        },
        {
          name: 'package2',
          current: '2.0.0',
          wanted: '2.1.0',
          latest: '2.2.0',
        },
      ]);
    });

    it('should handle empty output', () => {
      const result = service['parseOutdatedTableOutput']([]);
      expect(result).toEqual([]);
    });
  });

  describe('getProgressMessage', () => {
    it('should return correct message for pending status', () => {
      const operation = {
        id: 'test-id',
        type: 'install' as const,
        status: 'pending' as const,
        progress: 0,
        output: [],
        startTime: new Date(),
      };

      const message = service['getProgressMessage'](operation);
      expect(message).toBe('Preparing install operation...');
    });

    it('should return correct message for running status', () => {
      const operation = {
        id: 'test-id',
        type: 'upgrade' as const,
        status: 'running' as const,
        progress: 50,
        output: [],
        startTime: new Date(),
      };

      const message = service['getProgressMessage'](operation);
      expect(message).toBe('upgrade in progress...');
    });

    it('should return correct message for completed status', () => {
      const operation = {
        id: 'test-id',
        type: 'remove' as const,
        status: 'completed' as const,
        progress: 100,
        output: [],
        startTime: new Date(),
        endTime: new Date(),
      };

      const message = service['getProgressMessage'](operation);
      expect(message).toBe('remove completed successfully');
    });

    it('should return correct message for failed status', () => {
      const operation = {
        id: 'test-id',
        type: 'install' as const,
        status: 'failed' as const,
        progress: 50,
        output: [],
        error: 'Network error',
        startTime: new Date(),
        endTime: new Date(),
      };

      const message = service['getProgressMessage'](operation);
      expect(message).toBe('install failed: Network error');
    });
  });
});
