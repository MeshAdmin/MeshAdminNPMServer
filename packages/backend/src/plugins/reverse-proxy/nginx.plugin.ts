import { BaseReverseProxyPlugin, CertificateDeploymentConfig } from './base.plugin';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import logger from '@lib/logger';

const execAsync = promisify(exec);

interface NginxConfig {
  configPath: string;
  sitesAvailablePath: string;
  sitesEnabledPath: string;
  certStorePath: string;
  serviceCommand: string;
}

export class NginxPlugin extends BaseReverseProxyPlugin {
  name = 'nginx';
  description = 'Nginx reverse proxy SSL certificate deployment';
  version = '1.0.0';

  private nginxConfig: NginxConfig = {
    configPath: '/etc/nginx/nginx.conf',
    sitesAvailablePath: '/etc/nginx/sites-available',
    sitesEnabledPath: '/etc/nginx/sites-enabled',
    certStorePath: '/etc/ssl/certs/meshadmin',
    serviceCommand: 'nginx',
  };

  async initialize(config: Record<string, any>): Promise<void> {
    await super.initialize(config);

    // Override defaults with provided config
    this.nginxConfig = { ...this.nginxConfig, ...config };

    // Ensure certificate storage directory exists
    try {
      await fs.mkdir(this.nginxConfig.certStorePath, { recursive: true });
    } catch (error) {
      logger.warn(`Could not create cert store directory: ${(error as Error).message}`);
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      await execAsync('which nginx');
      await execAsync('nginx -v');
      return true;
    } catch {
      return false;
    }
  }

  async deployCertificate(config: CertificateDeploymentConfig): Promise<boolean> {
    this.throwIfNotInitialized();

    try {
      logger.info(`Deploying certificate for ${config.domainName} to Nginx`);

      // Validate configuration first
      if (!(await this.validateConfig(config))) {
        return false;
      }

      // Get certificate data from database
      const { databaseService } = await import('../../services/database.service');
      const certificate = await databaseService.prisma.certificate.findUnique({
        where: { id: config.certificateId },
      });

      if (!certificate) {
        logger.error(`Certificate ${config.certificateId} not found`);
        return false;
      }

      // Write certificate files
      const domainCertDir = path.join(this.nginxConfig.certStorePath, config.domainName);
      await fs.mkdir(domainCertDir, { recursive: true });

      const certPath = path.join(domainCertDir, 'cert.pem');
      const keyPath = path.join(domainCertDir, 'privkey.pem');
      const fullchainPath = path.join(domainCertDir, 'fullchain.pem');

      await fs.writeFile(certPath, certificate.certPem);
      await fs.writeFile(keyPath, certificate.keyPem);
      await fs.writeFile(fullchainPath, certificate.fullchainPem);

      // Update Nginx configuration if needed
      await this.updateNginxConfig(config.domainName, certPath, keyPath, fullchainPath);

      // Test Nginx configuration
      const testResult = await this.testNginxConfig();
      if (!testResult) {
        logger.error('Nginx configuration test failed');
        return false;
      }

      // Reload Nginx
      const reloadResult = await this.reloadService();
      if (!reloadResult) {
        logger.error('Failed to reload Nginx service');
        return false;
      }

      logger.info(`Successfully deployed certificate for ${config.domainName} to Nginx`);
      return true;
    } catch (error) {
      logger.error(`Failed to deploy certificate to Nginx: ${(error as Error).message}`);
      return false;
    }
  }

  async reloadService(): Promise<boolean> {
    this.throwIfNotInitialized();

    try {
      // Test configuration first
      if (!(await this.testNginxConfig())) {
        logger.error('Nginx configuration test failed, not reloading');
        return false;
      }

      // Reload Nginx
      await execAsync(`sudo systemctl reload ${this.nginxConfig.serviceCommand}`);
      logger.info('Nginx reloaded successfully');
      return true;
    } catch (error) {
      logger.error(`Failed to reload Nginx: ${(error as Error).message}`);

      // Try alternative reload methods
      try {
        await execAsync('sudo nginx -s reload');
        logger.info('Nginx reloaded using nginx -s reload');
        return true;
      } catch (altError) {
        logger.error(`Alternative reload also failed: ${(altError as Error).message}`);
        return false;
      }
    }
  }

  private async testNginxConfig(): Promise<boolean> {
    try {
      await execAsync('sudo nginx -t');
      return true;
    } catch (error) {
      logger.error(`Nginx configuration test failed: ${(error as Error).message}`);
      return false;
    }
  }

  private async updateNginxConfig(
    domainName: string,
    certPath: string,
    keyPath: string,
    fullchainPath: string
  ): Promise<void> {
    const siteConfigPath = path.join(this.nginxConfig.sitesAvailablePath, domainName);

    try {
      // Check if site config exists
      await fs.access(siteConfigPath);

      // Read existing config
      let configContent = await fs.readFile(siteConfigPath, 'utf8');

      // Update SSL certificate paths
      configContent = this.updateSSLPaths(configContent, fullchainPath, keyPath);

      // Write updated config
      await fs.writeFile(siteConfigPath, configContent);

      logger.info(`Updated Nginx configuration for ${domainName}`);
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        // Site config doesn't exist, create a basic SSL-enabled config
        await this.createBasicSSLConfig(domainName, certPath, keyPath, fullchainPath);
      } else {
        throw error;
      }
    }
  }

  private updateSSLPaths(configContent: string, fullchainPath: string, keyPath: string): string {
    // Update SSL certificate path
    configContent = configContent.replace(
      /ssl_certificate\s+[^;]+;/g,
      `ssl_certificate ${fullchainPath};`
    );

    // Update SSL certificate key path
    configContent = configContent.replace(
      /ssl_certificate_key\s+[^;]+;/g,
      `ssl_certificate_key ${keyPath};`
    );

    return configContent;
  }

  private async createBasicSSLConfig(
    domainName: string,
    certPath: string,
    keyPath: string,
    fullchainPath: string
  ): Promise<void> {
    const configTemplate = `
server {
    listen 80;
    listen [::]:80;
    server_name ${domainName};
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${domainName};

    # SSL Configuration
    ssl_certificate ${fullchainPath};
    ssl_certificate_key ${keyPath};
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Default location - customize as needed
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

    const siteConfigPath = path.join(this.nginxConfig.sitesAvailablePath, domainName);
    const siteEnabledPath = path.join(this.nginxConfig.sitesEnabledPath, domainName);

    // Write the configuration
    await fs.writeFile(siteConfigPath, configTemplate.trim());

    // Enable the site by creating a symlink
    try {
      await fs.symlink(siteConfigPath, siteEnabledPath);
    } catch (error) {
      if ((error as any).code !== 'EEXIST') {
        throw error;
      }
    }

    logger.info(`Created basic SSL configuration for ${domainName}`);
  }

  async validateConfig(config: CertificateDeploymentConfig): Promise<boolean> {
    if (!(await super.validateConfig(config))) {
      return false;
    }

    // Additional Nginx-specific validation
    try {
      // Check if Nginx is installed and accessible
      if (!(await this.isAvailable())) {
        logger.error('Nginx is not available on this system');
        return false;
      }

      // Check if we have write permissions to Nginx directories
      await fs.access(this.nginxConfig.sitesAvailablePath, fs.constants.W_OK);
      await fs.access(this.nginxConfig.certStorePath, fs.constants.W_OK);

      return true;
    } catch (error) {
      logger.error(`Nginx validation failed: ${(error as Error).message}`);
      return false;
    }
  }
}
