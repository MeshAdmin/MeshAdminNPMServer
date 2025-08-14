import { PrismaClient, ServiceStatus } from '../src/generated/prisma';
import path from 'path';

const prisma = new PrismaClient();

async function createPM2Configurations() {
  console.log('🔧 Creating PM2 configurations for services...');

  try {
    // Get all PM2-type services without PM2 configurations
    const services = await prisma.service.findMany({
      where: {
        type: 'pm2',
        pm2Config: null,
      },
    });

    for (const service of services) {
      // Create PM2 configuration based on service type and name
      let pm2Config;

      switch (service.name) {
        case 'web-app':
          pm2Config = {
            script: 'src/index.js',
            name: 'web-app',
            cwd: '/path/to/web-app',
            instances: 1,
            execMode: 'fork',
            env: {
              NODE_ENV: 'development',
              PORT: '3000',
            },
            envProduction: {
              NODE_ENV: 'production',
              PORT: '3000',
            },
            watch: false,
            maxRestarts: 10,
            minUptimeSeconds: 2000,
            outFile: '/var/log/pm2/web-app-out.log',
            errorFile: '/var/log/pm2/web-app-error.log',
            logFile: '/var/log/pm2/web-app-combined.log',
            logDateFormat: 'YYYY-MM-DD HH:mm:ss Z',
          };
          break;

        case 'api-server':
          pm2Config = {
            script: 'dist/index.js',
            name: 'api-server',
            cwd: '/path/to/api-server',
            instances: 2,
            execMode: 'cluster',
            env: {
              NODE_ENV: 'development',
              PORT: '3001',
              DATABASE_URL: process.env.DATABASE_URL,
            },
            envProduction: {
              NODE_ENV: 'production',
              PORT: '3001',
              DATABASE_URL: process.env.DATABASE_URL,
            },
            watch: false,
            maxRestarts: 15,
            minUptimeSeconds: 3000,
            maxMemoryRestart: '1G',
            outFile: '/var/log/pm2/api-server-out.log',
            errorFile: '/var/log/pm2/api-server-error.log',
            logFile: '/var/log/pm2/api-server-combined.log',
            logDateFormat: 'YYYY-MM-DD HH:mm:ss Z',
          };
          break;

        case 'background-worker':
          pm2Config = {
            script: 'dist/worker.js',
            name: 'background-worker',
            cwd: '/path/to/worker',
            instances: 1,
            execMode: 'fork',
            env: {
              NODE_ENV: 'development',
              WORKER_CONCURRENCY: '5',
              REDIS_URL: 'redis://localhost:6379',
            },
            envProduction: {
              NODE_ENV: 'production',
              WORKER_CONCURRENCY: '10',
              REDIS_URL: 'redis://localhost:6379',
            },
            watch: false,
            maxRestarts: 20,
            minUptimeSeconds: 1000,
            restartDelay: 2000,
            maxMemoryRestart: '512M',
            outFile: '/var/log/pm2/worker-out.log',
            errorFile: '/var/log/pm2/worker-error.log',
            logFile: '/var/log/pm2/worker-combined.log',
            logDateFormat: 'YYYY-MM-DD HH:mm:ss Z',
          };
          break;

        default:
          // Generic PM2 configuration
          pm2Config = {
            script: 'index.js',
            name: service.name,
            cwd: `/path/to/${service.name}`,
            instances: 1,
            execMode: 'fork',
            env: {
              NODE_ENV: 'development',
            },
            envProduction: {
              NODE_ENV: 'production',
            },
            watch: false,
            maxRestarts: 10,
            minUptimeSeconds: 1000,
            outFile: `/var/log/pm2/${service.name}-out.log`,
            errorFile: `/var/log/pm2/${service.name}-error.log`,
            logFile: `/var/log/pm2/${service.name}-combined.log`,
            logDateFormat: 'YYYY-MM-DD HH:mm:ss Z',
          };
      }

      // Create PM2 configuration in database
      await prisma.servicePm2Config.create({
        data: {
          serviceId: service.id,
          ...pm2Config,
          env: pm2Config.env,
          envProduction: pm2Config.envProduction,
          envDevelopment: pm2Config.env, // Use same env for development
          watchOptions: {},
        },
      });

      console.log(`✅ Created PM2 config for ${service.name}`);
    }

    // Also create a demo PM2 ecosystem file for reference
    const ecosystemConfig = {
      apps: [
        {
          name: 'mesh-admin-frontend',
          script: 'npm',
          args: 'run dev',
          cwd: path.resolve(__dirname, '../../frontend'),
          env: {
            NODE_ENV: 'development',
            PORT: '5173',
          },
          env_production: {
            NODE_ENV: 'production',
            PORT: '3000',
          },
          instances: 1,
          exec_mode: 'fork',
          watch: false,
          max_restarts: 10,
          min_uptime: '2s',
          out_file: '/var/log/pm2/frontend-out.log',
          error_file: '/var/log/pm2/frontend-error.log',
          log_file: '/var/log/pm2/frontend-combined.log',
          log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        },
        {
          name: 'mesh-admin-backend',
          script: 'npm',
          args: 'run dev',
          cwd: path.resolve(__dirname, '..'),
          env: {
            NODE_ENV: 'development',
            PORT: '3001',
          },
          env_production: {
            NODE_ENV: 'production',
            PORT: '3001',
          },
          instances: 1,
          exec_mode: 'fork',
          watch: false,
          max_restarts: 15,
          min_uptime: '3s',
          max_memory_restart: '1G',
          out_file: '/var/log/pm2/backend-out.log',
          error_file: '/var/log/pm2/backend-error.log',
          log_file: '/var/log/pm2/backend-combined.log',
          log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        },
      ],
    };

    // Write the ecosystem config file
    const fs = require('fs');
    const ecosystemPath = path.resolve(__dirname, '../ecosystem.config.js');

    const ecosystemContent = `module.exports = ${JSON.stringify(ecosystemConfig, null, 2)};`;

    fs.writeFileSync(ecosystemPath, ecosystemContent);
    console.log(`✅ Created PM2 ecosystem config at ${ecosystemPath}`);

    console.log('🎉 PM2 configurations created successfully!');
  } catch (error) {
    console.error('❌ Error creating PM2 configurations:', error);
    throw error;
  }
}

async function main() {
  try {
    await createPM2Configurations();
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

export { createPM2Configurations };
