// Type declarations for external libraries without proper types

declare module 'greenlock' {
  interface GreenlockConfig {
    packageRoot: string;
    configDir: string;
    maintainerEmail: string;
    cluster?: boolean;
    notify?: (event: string, details: any) => void;
    manager?: any;
    challenges?: Record<string, any>;
  }

  interface Certificate {
    subject: string;
    altnames: string[];
    issuedAt: Date;
    expiresAt: Date;
    cert: string;
    chain: string;
    privkey: string;
  }

  interface Greenlock {
    add(options: {
      subject: string;
      altnames?: string[];
      subscriberEmail?: string;
      customerEmail?: string;
    }): Promise<Certificate>;
    
    get(options: { servername: string }): Promise<Certificate | null>;
    
    renew(options: { servername: string }): Promise<Certificate>;
    
    remove(options: { subject: string }): Promise<void>;
  }

  function create(config: GreenlockConfig): Greenlock;
  export = create;
}

declare module 'cron' {
  export interface ScheduledTask {
    start(): void;
    stop(): void;
    destroy(): void;
    running: boolean;
  }

  export class CronJob implements ScheduledTask {
    constructor(
      cronTime: string | Date,
      onTick: () => void,
      onComplete?: () => void,
      start?: boolean,
      timeZone?: string,
      context?: any,
      runOnInit?: boolean
    );
    
    start(): void;
    stop(): void;
    destroy(): void;
    running: boolean;
  }
}

// Fix for fetch timeout option
declare global {
  interface RequestInit {
    timeout?: number;
  }
}

export {};
