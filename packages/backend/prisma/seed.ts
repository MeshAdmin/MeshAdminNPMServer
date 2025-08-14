import { PrismaClient, ServiceStatus, LogLevel } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Hash the admin password
  const hashedPassword = await bcrypt.hash('admin123', 12);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@meshadmin.local' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@meshadmin.local',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', {
    id: adminUser.id,
    email: adminUser.email,
    createdAt: adminUser.createdAt,
  });

  // Create detailed sample services
  const webService = await prisma.service.upsert({
    where: { name: 'web-app' },
    update: {},
    create: {
      name: 'web-app',
      description: 'Main web application server',
      type: 'pm2',
      status: ServiceStatus.STOPPED,
      config: {
        port: 3000,
        environment: 'development',
        autoRestart: true,
      },
    },
  });

  const apiService = await prisma.service.upsert({
    where: { name: 'api-server' },
    update: {},
    create: {
      name: 'api-server',
      description: 'REST API server',
      type: 'pm2',
      status: ServiceStatus.RUNNING,
      config: {
        port: 3001,
        environment: 'development',
        autoRestart: true,
      },
    },
  });

  const workerService = await prisma.service.upsert({
    where: { name: 'background-worker' },
    update: {},
    create: {
      name: 'background-worker',
      description: 'Background job processor',
      type: 'pm2',
      status: ServiceStatus.ERROR,
      config: {
        environment: 'development',
        autoRestart: true,
        maxMemory: '512MB',
      },
    },
  });

  const nginxService = await prisma.service.upsert({
    where: { name: 'nginx' },
    update: {},
    create: {
      name: 'nginx',
      description: 'Nginx web server',
      type: 'systemd',
      status: ServiceStatus.RUNNING,
      config: {
        port: 80,
        ssl_port: 443,
        environment: 'production',
      },
    },
  });

  console.log('✅ Sample services created');

  // Create sample service logs
  const services = [webService, apiService, workerService, nginxService];

  for (const service of services) {
    // Create some sample logs for each service
    await prisma.serviceLog.createMany({
      data: [
        {
          serviceId: service.id,
          message: `Service ${service.name} initialized successfully`,
          level: LogLevel.INFO,
          source: 'system',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          serviceId: service.id,
          message: `Starting ${service.name} on port ${service.config?.port || 'N/A'}`,
          level: LogLevel.INFO,
          source: 'stdout',
          timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
        },
        {
          serviceId: service.id,
          message: `${service.name} listening for connections`,
          level: LogLevel.INFO,
          source: 'stdout',
          timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
        },
        {
          serviceId: service.id,
          message: `HTTP request processed: GET /health`,
          level: LogLevel.DEBUG,
          source: 'stdout',
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        },
        {
          serviceId: service.id,
          message:
            service.status === ServiceStatus.ERROR
              ? `Error: Failed to connect to database`
              : `Memory usage: ${Math.floor(Math.random() * 200 + 50)}MB`,
          level: service.status === ServiceStatus.ERROR ? LogLevel.ERROR : LogLevel.INFO,
          source: 'pm2',
          timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        },
      ],
    });
  }

  console.log('✅ Sample service logs created');

  // Create some sample package actions
  const packageActions = [
    { name: 'install' },
    { name: 'update' },
    { name: 'remove' },
    { name: 'upgrade' },
  ];

  for (const action of packageActions) {
    await prisma.packageAction.create({
      data: action,
    });
  }

  console.log('✅ Sample package actions created');

  // Create sample domains
  const domains = [
    { name: 'example.com' },
    { name: 'test.local' },
    { name: 'dev.meshadmin.local' },
  ];

  for (const domain of domains) {
    await prisma.domain.upsert({
      where: { name: domain.name },
      update: {},
      create: domain,
    });
  }

  console.log('✅ Sample domains created');

  // Create sample plugins
  const plugins = [
    { name: 'backup-plugin', hooks: 'routes,events' },
    { name: 'monitoring-plugin', hooks: 'routes,menus,events' },
    { name: 'security-plugin', hooks: 'routes,events' },
  ];

  for (const plugin of plugins) {
    await prisma.plugin.upsert({
      where: { name: plugin.name },
      update: {},
      create: plugin,
    });
  }

  console.log('✅ Sample plugins created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
