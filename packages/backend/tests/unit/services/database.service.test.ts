import { PrismaClient } from '@prisma/client';
import { databaseService } from '@services/database.service';
import { logger } from '@lib/logger';

// Mock dependencies
jest.mock('@prisma/client');
jest.mock('@lib/logger');

describe('DatabaseService', () => {
  let mockPrismaClient: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create mock PrismaClient
    mockPrismaClient = {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $queryRaw: jest.fn(),
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as any;

    // Replace the actual prisma client with mock
    (databaseService as any).prisma = mockPrismaClient;
  });

  describe('connect', () => {
    it('should connect to database successfully', async () => {
      mockPrismaClient.$connect.mockResolvedValue(undefined);

      await databaseService.connect();

      expect(mockPrismaClient.$connect).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('✅ Database connected successfully');
    });

    it('should handle connection errors', async () => {
      const error = new Error('Connection failed');
      mockPrismaClient.$connect.mockRejectedValue(error);

      await expect(databaseService.connect()).rejects.toThrow('Connection failed');
      expect(logger.error).toHaveBeenCalledWith('❌ Database connection failed:', error);
    });

    it('should handle connection timeout', async () => {
      jest.useFakeTimers();
      
      // Mock $connect to never resolve
      mockPrismaClient.$connect.mockImplementation(() => new Promise(() => {}));

      const connectPromise = databaseService.connect();
      
      // Fast-forward time to trigger timeout
      jest.advanceTimersByTime(10000);

      await expect(connectPromise).rejects.toThrow('Database connection timeout');
      
      jest.useRealTimers();
    });
  });

  describe('disconnect', () => {
    it('should disconnect from database successfully', async () => {
      mockPrismaClient.$disconnect.mockResolvedValue(undefined);

      await databaseService.disconnect();

      expect(mockPrismaClient.$disconnect).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith('Database disconnected');
    });

    it('should handle disconnection errors gracefully', async () => {
      const error = new Error('Disconnection failed');
      mockPrismaClient.$disconnect.mockRejectedValue(error);

      await databaseService.disconnect();

      expect(logger.error).toHaveBeenCalledWith('Error disconnecting from database:', error);
    });
  });

  describe('healthCheck', () => {
    it('should return true when database is healthy', async () => {
      mockPrismaClient.$queryRaw.mockResolvedValue([{ 1: 1 }]);

      const result = await databaseService.healthCheck();

      expect(result).toBe(true);
      expect(mockPrismaClient.$queryRaw).toHaveBeenCalledWith(
        expect.objectContaining({ strings: ['SELECT 1'] })
      );
    });

    it('should return false when database is unhealthy', async () => {
      mockPrismaClient.$queryRaw.mockRejectedValue(new Error('Query failed'));

      const result = await databaseService.healthCheck();

      expect(result).toBe(false);
      expect(logger.error).toHaveBeenCalledWith(
        'Database health check failed:',
        expect.any(Error)
      );
    });
  });

  describe('transaction management', () => {
    it('should execute transaction successfully', async () => {
      const mockTransaction = jest.fn().mockResolvedValue('transaction result');
      mockPrismaClient.$transaction = jest.fn().mockImplementation((fn) => fn(mockPrismaClient));

      const result = await (databaseService as any).prisma.$transaction(mockTransaction);

      expect(result).toBe('transaction result');
      expect(mockTransaction).toHaveBeenCalledWith(mockPrismaClient);
    });

    it('should rollback transaction on error', async () => {
      const error = new Error('Transaction failed');
      const mockTransaction = jest.fn().mockRejectedValue(error);
      mockPrismaClient.$transaction = jest.fn().mockImplementation((fn) => fn(mockPrismaClient));

      await expect(
        (databaseService as any).prisma.$transaction(mockTransaction)
      ).rejects.toThrow('Transaction failed');
    });
  });

  describe('error handling', () => {
    it('should handle unique constraint violations', async () => {
      const prismaError = {
        code: 'P2002',
        meta: { target: ['email'] },
        message: 'Unique constraint failed',
      };

      mockPrismaClient.user.create.mockRejectedValue(prismaError);

      await expect(
        mockPrismaClient.user.create({ data: { email: 'test@example.com' } as any })
      ).rejects.toMatchObject({
        code: 'P2002',
      });
    });

    it('should handle foreign key constraint violations', async () => {
      const prismaError = {
        code: 'P2003',
        meta: { field_name: 'userId' },
        message: 'Foreign key constraint failed',
      };

      mockPrismaClient.user.update.mockRejectedValue(prismaError);

      await expect(
        mockPrismaClient.user.update({ 
          where: { id: '1' }, 
          data: { email: 'new@example.com' } as any 
        })
      ).rejects.toMatchObject({
        code: 'P2003',
      });
    });

    it('should handle record not found errors', async () => {
      const prismaError = {
        code: 'P2025',
        message: 'Record to update not found',
      };

      mockPrismaClient.user.update.mockRejectedValue(prismaError);

      await expect(
        mockPrismaClient.user.update({ 
          where: { id: 'non-existent' }, 
          data: {} as any 
        })
      ).rejects.toMatchObject({
        code: 'P2025',
      });
    });
  });
});
