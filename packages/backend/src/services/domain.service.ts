import { databaseService } from './database.service';
import logger from '@lib/logger';

interface DomainConfig {
  name: string;
  wildcard?: boolean;
  validationMethod?: 'http-01' | 'dns-01';
  challengePlugin?: string;
  pluginConfig?: Record<string, any>;
}

class DomainService {
  /**
   * Add a new domain for SSL management
   */
  async addDomain(config: DomainConfig) {
    try {
      const domain = await databaseService.prisma.domain.create({
        data: {
          name: config.name,
          wildcard: config.wildcard || false,
          validationMethod: config.validationMethod || 'http-01',
          challengePlugin: config.challengePlugin,
          pluginConfig: config.pluginConfig
            ? JSON.parse(JSON.stringify(config.pluginConfig))
            : null,
          isActive: true,
          lastVerified: null,
        },
      });

      logger.info(`Domain ${config.name} added successfully`);
      return domain;
    } catch (error) {
      logger.error(`Failed to add domain ${config.name}:`, error);
      throw error;
    }
  }

  /**
   * Get domain by name
   */
  async getDomain(name: string) {
    return await databaseService.prisma.domain.findUnique({
      where: { name },
      include: {
        certificates: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        renewalJobs: {
          where: { status: 'SCHEDULED' },
          orderBy: { scheduledAt: 'asc' },
        },
      },
    });
  }

  /**
   * List all domains
   */
  async listDomains() {
    return await databaseService.prisma.domain.findMany({
      include: {
        certificates: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        renewalJobs: {
          where: { status: 'SCHEDULED' },
          orderBy: { scheduledAt: 'asc' },
          take: 1,
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Update domain configuration
   */
  async updateDomain(name: string, updates: Partial<DomainConfig>) {
    try {
      const domain = await databaseService.prisma.domain.update({
        where: { name },
        data: {
          wildcard: updates.wildcard,
          validationMethod: updates.validationMethod,
          challengePlugin: updates.challengePlugin,
          pluginConfig: updates.pluginConfig
            ? JSON.parse(JSON.stringify(updates.pluginConfig))
            : undefined,
          updatedAt: new Date(),
        },
      });

      logger.info(`Domain ${name} updated successfully`);
      return domain;
    } catch (error) {
      logger.error(`Failed to update domain ${name}:`, error);
      throw error;
    }
  }

  /**
   * Remove domain
   */
  async removeDomain(name: string) {
    try {
      await databaseService.prisma.domain.delete({
        where: { name },
      });

      logger.info(`Domain ${name} removed successfully`);
    } catch (error) {
      logger.error(`Failed to remove domain ${name}:`, error);
      throw error;
    }
  }

  /**
   * Verify domain ownership (placeholder for future implementation)
   */
  async verifyDomain(name: string): Promise<boolean> {
    try {
      // TODO: Implement domain verification logic
      // For now, just mark as verified
      await databaseService.prisma.domain.update({
        where: { name },
        data: { lastVerified: new Date() },
      });

      return true;
    } catch (error) {
      logger.error(`Failed to verify domain ${name}:`, error);
      return false;
    }
  }
}

export const domainService = new DomainService();
