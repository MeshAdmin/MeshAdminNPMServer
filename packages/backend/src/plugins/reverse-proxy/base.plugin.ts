import logger from '@lib/logger';

export interface CertificateDeploymentConfig {
  certificateId: string;
  domainName: string;
  certPath?: string;
  keyPath?: string;
  fullchainPath?: string;
  servicesToRestart?: string[];
  customConfig?: Record<string, any>;
}

export interface ReverseProxyPlugin {
  name: string;
  description: string;
  version: string;

  /**
   * Initialize the plugin with configuration
   */
  initialize(config: Record<string, any>): Promise<void>;

  /**
   * Deploy certificate to the reverse proxy
   */
  deployCertificate(config: CertificateDeploymentConfig): Promise<boolean>;

  /**
   * Reload/restart the reverse proxy service
   */
  reloadService(): Promise<boolean>;

  /**
   * Validate configuration before deployment
   */
  validateConfig(config: CertificateDeploymentConfig): Promise<boolean>;

  /**
   * Check if the plugin is available on the system
   */
  isAvailable(): Promise<boolean>;

  /**
   * Clean up resources
   */
  destroy(): Promise<void>;
}

export abstract class BaseReverseProxyPlugin implements ReverseProxyPlugin {
  abstract name: string;
  abstract description: string;
  abstract version: string;

  protected config: Record<string, any> = {};
  protected initialized = false;

  async initialize(config: Record<string, any>): Promise<void> {
    this.config = config;
    this.initialized = true;
    logger.info(`Initialized ${this.name} plugin v${this.version}`);
  }

  abstract deployCertificate(config: CertificateDeploymentConfig): Promise<boolean>;
  abstract reloadService(): Promise<boolean>;
  abstract isAvailable(): Promise<boolean>;

  async validateConfig(config: CertificateDeploymentConfig): Promise<boolean> {
    // Basic validation
    if (!config.certificateId || !config.domainName) {
      logger.error('Certificate ID and domain name are required');
      return false;
    }
    return true;
  }

  async destroy(): Promise<void> {
    this.initialized = false;
    logger.info(`Destroyed ${this.name} plugin`);
  }

  protected throwIfNotInitialized(): void {
    if (!this.initialized) {
      throw new Error(`Plugin ${this.name} is not initialized`);
    }
  }
}
