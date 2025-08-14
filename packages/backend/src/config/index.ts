import { config } from 'dotenv-flow';

// Load environment variables
config();

// Validate critical configuration at startup
const validateConfig = () => {
  const errors: string[] = [];
  
  // Ensure JWT secrets are not defaults in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('your-secret-key') || process.env.JWT_SECRET.includes('change-this')) {
      errors.push('JWT_SECRET must be set to a secure non-default value in production');
    }
    if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET.includes('your-refresh-secret') || process.env.JWT_REFRESH_SECRET.includes('change-this')) {
      errors.push('JWT_REFRESH_SECRET must be set to a secure non-default value in production');
    }
    if (!process.env.DATABASE_URL) {
      errors.push('DATABASE_URL must be set in production');
    }
    if (!process.env.REDIS_PASSWORD || process.env.REDIS_PASSWORD.length < 12) {
      errors.push('REDIS_PASSWORD must be set to a secure password (12+ chars) in production');
    }
  }
  
  if (errors.length > 0) {
    console.error('🔒 Configuration validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
  
  console.log('✅ Configuration validation passed');
};

// Run validation
validateConfig();

export const appConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  systemMonitoring: {
    intervalMs: parseInt(process.env.SYSTEM_MONITORING_INTERVAL || '5000', 10),
    historySize: parseInt(process.env.SYSTEM_MONITORING_HISTORY_SIZE || '1440', 10), // 12 hours at 5s intervals
  },
  notifications: {
    slack: {
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
      enabled: !!process.env.SLACK_WEBHOOK_URL,
    },
    email: {
      enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true',
      host: process.env.EMAIL_HOST || 'localhost',
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      secure: process.env.EMAIL_SECURE === 'true',
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      from: process.env.EMAIL_FROM || 'alerts@meshadmin.local',
      recipients: process.env.EMAIL_RECIPIENTS ? process.env.EMAIL_RECIPIENTS.split(',') : [],
    },
  },
};

export default appConfig;
