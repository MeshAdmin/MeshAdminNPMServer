import { databaseService, PrismaClient } from './database.service';
import logger from '@lib/logger';

export class ServiceService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = databaseService.getClient();
  }

  async getAllServices() {
    logger.info('Fetching all services');
    return await this.prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getServiceById(id: string) {
    logger.info(`Finding service by ID: ${id}`);
    return await this.prisma.service.findUnique({
      where: { id },
    });
  }

  async getServiceByName(name: string) {
    logger.info(`Finding service by name: ${name}`);
    return await this.prisma.service.findUnique({
      where: { name },
    });
  }

  async createService(name: string) {
    logger.info(`Creating service: ${name}`);
    return await this.prisma.service.create({
      data: { name },
    });
  }

  async updateService(id: string, name: string) {
    logger.info(`Updating service ID: ${id} with name: ${name}`);
    return await this.prisma.service.update({
      where: { id },
      data: { name },
    });
  }

  async deleteService(id: string) {
    logger.info(`Deleting service ID: ${id}`);
    return await this.prisma.service.delete({
      where: { id },
    });
  }
}

export const serviceService = new ServiceService();
export default serviceService;
