// Simple type workaround for greenlock module
const Greenlock = require('greenlock') as any;
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import pm2 from 'pm2';
import cron from 'node-cron';
import { databaseService } from './database.service';
import logger from '@lib/logger';
import { CertificateStatus, RenewalStatus, DeploymentStatus } from '../generated/prisma';

interface CertificateOrder {
  privkey: string;
  cert: string;
  chain: string;
  subject: string;
  altnames: string[];
  issuedAt: Date;
  expiresAt: Date;
}

interface AcmeConfig {
  maintainerEmail: string;
  staging: boolean;
  notify?: (event: string, details: any) => void;
}

class AcmeService {
  private greenlock: any;
  private config: AcmeConfig;
  private pm2Connect = promisify(pm2.connect.bind(pm2));
  private pm2Reload = promisify(pm2.reload.bind(pm2));
  private pm2Restart = promisify(pm2.restart.bind(pm2));
  private pm2List = promisify(pm2.list.bind(pm2));
  private renewalCronJob: any | null = null;

  constructor(
    config: AcmeConfig = {
      maintainerEmail: process.env.ACME_EMAIL || 'admin@example.com',
      staging: process.env.NODE_ENV !== 'production',
    }
  ) {
    this.config = config;
    this.initializeGreenlock();
    this.setupRenewalCron();
  }

  private initializeGreenlock() {
    const configDir = path.join(__dirname, '../../acme-data');

    // Ensure config directory exists
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    this.greenlock = Greenlock.create({
      packageRoot: path.join(__dirname, '../..'),
      configDir,
      // Use staging server for development
      staging: this.config.staging,
      // Required maintainer email
      maintainerEmail: this.config.maintainerEmail,
      // Notify function for events
      notify: this.config.notify || this.defaultNotify.bind(this),
    });

    logger.info(
      `Greenlock initialized with ${this.config.staging ? 'staging' : 'production'} server`
    );
  }

  private defaultNotify(event: string, details: any) {
    logger.info(`ACME Event: ${event}`, details);
  }

  /**
   * Setup or update ACME account
   */
  async setupAccount(email: string, agreeToTerms: boolean = true): Promise<void> {
    try {
      // Check if account exists in database
      const existingAccount = await databaseService.prisma.acmeAccount.findUnique({
        where: { email },
      });

      if (!existingAccount) {
        // Create new ACME account
        const account = await this.greenlock.accounts.create({
          subscriberEmail: email,
          agreeToTerms,
        });

        // Save to database
        await databaseService.prisma.acmeAccount.create({
          data: {
            email,
            accountKey: account.privateKeyJwk ? JSON.stringify(account.privateKeyJwk) : '',
            accountUrl: account.url || '',
            directoryUrl: this.config.staging
              ? 'https://acme-staging-v02.api.letsencrypt.org/directory'
              : 'https://acme-v02.api.letsencrypt.org/directory',
            serverName: "Let's Encrypt",
            status: 'valid',
            termsAccepted: agreeToTerms,
          },
        });

        logger.info(`ACME account created for ${email}`);
      }
    } catch (error) {
      logger.error('Failed to setup ACME account:', error);
      throw error;
    }
  }

  /**
   * Issue a new certificate for a domain
   */
  async issueCertificate(domainName: string, altNames: string[] = []): Promise<string> {
    try {
      logger.info(`Issuing certificate for ${domainName}`);

      // Get domain configuration from database
      const domain = await databaseService.prisma.domain.findUnique({
        where: { name: domainName },
      });

      if (!domain) {
        throw new Error(`Domain ${domainName} not found in database`);
      }

      // Setup account if needed
      await this.setupAccount(this.config.maintainerEmail);

      // Prepare certificate order
      const allNames = [domainName, ...altNames].filter(
        (name, index, arr) => arr.indexOf(name) === index
      );

      // Issue certificate using Greenlock
      const result = await this.greenlock.get({
        servername: domainName,
        altnames: allNames,
        subscriberEmail: this.config.maintainerEmail,
        agreeToTerms: true,
      });

      if (!result || !result.pems) {
        throw new Error('Failed to obtain certificate from ACME server');
      }

      const { privkey, cert, chain } = result.pems;
      const fullchain = cert + '\n' + chain;

      // Save certificate to database
      const certificate = await databaseService.prisma.certificate.create({
        data: {
          domainId: domain.id,
          subject: domainName,
          altNames: allNames.join(','),
          issuer: this.extractIssuer(cert),
          serial: this.extractSerial(cert),
          certPem: cert,
          chainPem: chain,
          keyPem: privkey,
          fullchainPem: fullchain,
          issuedAt: new Date(),
          expiresAt: this.extractExpiryDate(cert),
          status: CertificateStatus.ACTIVE,
          challengeType: domain.validationMethod,
          acmeAccountKey: this.config.maintainerEmail,
        },
      });

      // Schedule renewal
      await this.scheduleRenewal(certificate.id, domain.id);

      // Deploy certificate
      await this.deployCertificate(certificate.id);

      logger.info(`Certificate issued successfully for ${domainName}`);
      return certificate.id;
    } catch (error) {
      logger.error(`Failed to issue certificate for ${domainName}:`, error);
      throw error;
    }
  }

  /**
   * Renew an existing certificate
   */
  async renewCertificate(certificateId: string): Promise<boolean> {
    try {
      const certificate = await databaseService.prisma.certificate.findUnique({
        where: { id: certificateId },
        include: { domain: true },
      });

      if (!certificate) {
        throw new Error('Certificate not found');
      }

      logger.info(`Renewing certificate for ${certificate.subject}`);

      // Update renewal status
      await databaseService.prisma.certificateRenewal.updateMany({
        where: { certificateId },
        data: {
          status: RenewalStatus.IN_PROGRESS,
          attemptedAt: new Date(),
        },
      });

      // Renew using Greenlock
      const altNamesArray = certificate.altNames.split(',').filter(name => name.trim());
      const result = await this.greenlock.renew({
        servername: certificate.subject,
        altnames: altNamesArray,
        force: true,
      });

      if (!result || !result.pems) {
        throw new Error('Failed to renew certificate');
      }

      const { privkey, cert, chain } = result.pems;
      const fullchain = cert + '\n' + chain;

      // Update certificate in database
      await databaseService.prisma.certificate.update({
        where: { id: certificateId },
        data: {
          certPem: cert,
          chainPem: chain,
          keyPem: privkey,
          fullchainPem: fullchain,
          issuedAt: new Date(),
          expiresAt: this.extractExpiryDate(cert),
          status: CertificateStatus.ACTIVE,
        },
      });

      // Update renewal status
      await databaseService.prisma.certificateRenewal.updateMany({
        where: { certificateId },
        data: {
          status: RenewalStatus.COMPLETED,
          completedAt: new Date(),
        },
      });

      // Deploy renewed certificate
      await this.deployCertificate(certificateId);

      logger.info(`Certificate renewed successfully for ${certificate.subject}`);
      return true;
    } catch (error) {
      logger.error(`Failed to renew certificate ${certificateId}:`, error);

      // Update renewal status to failed
      await databaseService.prisma.certificateRenewal.updateMany({
        where: { certificateId },
        data: {
          status: RenewalStatus.FAILED,
          lastError: (error as Error).message,
        },
      });

      return false;
    }
  }

  /**
   * Deploy certificate and restart services
   */
  private async deployCertificate(certificateId: string): Promise<void> {
    try {
      const certificate = await databaseService.prisma.certificate.findUnique({
        where: { id: certificateId },
        include: { domain: true },
      });

      if (!certificate) {
        throw new Error('Certificate not found');
      }

      // Create deployment record
      const deployment = await databaseService.prisma.certificateDeployment.create({
        data: {
          certificateId,
          targetType: 'pm2',
          targetConfig: {},
          status: DeploymentStatus.IN_PROGRESS,
          pm2RestartRequired: true,
          pm2Services: '', // Will be populated with affected services (comma-separated)
        },
      });

      // TODO: Implement deployment hooks for different targets (nginx, caddy, etc.)
      // For now, we'll focus on PM2 service restart

      const restartSuccess = await this.reloadPm2Services(certificate.subject);

      // Update deployment status
      await databaseService.prisma.certificateDeployment.update({
        where: { id: deployment.id },
        data: {
          status: restartSuccess ? DeploymentStatus.COMPLETED : DeploymentStatus.FAILED,
          deployedAt: restartSuccess ? new Date() : undefined,
          pm2RestartCompleted: restartSuccess,
          lastError: restartSuccess ? null : 'Failed to restart PM2 services',
        },
      });
    } catch (error) {
      logger.error(`Failed to deploy certificate ${certificateId}:`, error);
      throw error;
    }
  }

  /**
   * Schedule certificate renewal
   */
  private async scheduleRenewal(certificateId: string, domainId: string): Promise<void> {
    const certificate = await databaseService.prisma.certificate.findUnique({
      where: { id: certificateId },
    });

    if (!certificate) return;

    // Schedule renewal 30 days before expiry
    const renewalDate = new Date(certificate.expiresAt);
    renewalDate.setDate(renewalDate.getDate() - 30);

    await databaseService.prisma.certificateRenewal.create({
      data: {
        certificateId,
        domainId,
        scheduledAt: renewalDate,
        status: RenewalStatus.SCHEDULED,
        autoRenewal: true,
        renewalThreshold: 30,
      },
    });
  }

  /**
   * Setup cron job for automatic renewal
   */
  private setupRenewalCron(): void {
    // Run renewal check daily at 2 AM
    this.renewalCronJob = cron.schedule('0 2 * * *', async () => {
      try {
        await this.checkAndRenewCertificates();
      } catch (error) {
        logger.error('Error in renewal cron job:', error);
      }
    });

    logger.info('Certificate renewal cron job scheduled');
  }

  /**
   * Check for certificates that need renewal and renew them
   */
  async checkAndRenewCertificates(): Promise<void> {
    try {
      const now = new Date();

      // Find certificates scheduled for renewal
      const pendingRenewals = await databaseService.prisma.certificateRenewal.findMany({
        where: {
          status: RenewalStatus.SCHEDULED,
          scheduledAt: {
            lte: now,
          },
          autoRenewal: true,
        },
        include: {
          certificate: true,
        },
      });

      logger.info(`Found ${pendingRenewals.length} certificates scheduled for renewal`);

      for (const renewal of pendingRenewals) {
        try {
          await this.renewCertificate(renewal.certificateId);
        } catch (error) {
          logger.error(`Failed to renew certificate ${renewal.certificateId}:`, error);

          // Increment attempts and schedule retry if under limit
          const newAttempts = renewal.attempts + 1;
          if (newAttempts < renewal.maxAttempts) {
            const nextAttempt = new Date();
            nextAttempt.setHours(nextAttempt.getHours() + 6); // Retry in 6 hours

            await databaseService.prisma.certificateRenewal.update({
              where: { id: renewal.id },
              data: {
                attempts: newAttempts,
                nextAttempt,
                lastError: (error as Error).message,
              },
            });
          } else {
            // Max attempts reached, mark as failed
            await databaseService.prisma.certificateRenewal.update({
              where: { id: renewal.id },
              data: {
                status: RenewalStatus.FAILED,
                lastError: `Max attempts (${renewal.maxAttempts}) reached: ${(error as Error).message}`,
              },
            });
          }
        }
      }
    } catch (error) {
      logger.error('Error checking for certificate renewals:', error);
    }
  }

  /**
   * Reload PM2 services after certificate deployment
   */
  private async reloadPm2Services(domainName: string): Promise<boolean> {
    try {
      await this.pm2Connect();

      // Get list of PM2 processes
      const processes = await this.pm2List();

      // For now, restart all processes. In production, you might want to be more selective
      // based on which services use SSL certificates for the specific domain
      if (processes && processes.length > 0) {
        logger.info(
          `Reloading ${processes.length} PM2 processes after certificate update for ${domainName}`
        );
        await this.pm2Reload('all');
        logger.info('PM2 processes reloaded successfully');
      }

      pm2.disconnect();
      return true;
    } catch (error) {
      logger.error('Failed to reload PM2 services:', error);
      pm2.disconnect();
      return false;
    }
  }

  /**
   * Helper methods for certificate parsing
   */
  private extractIssuer(certPem: string): string {
    try {
      // Simple extraction - in production you might want to use a proper X.509 parser
      const match = certPem.match(/Issuer: (.+)/i);
      return match ? match[1] : "Let's Encrypt";
    } catch {
      return "Let's Encrypt";
    }
  }

  private extractSerial(certPem: string): string {
    try {
      const match = certPem.match(/Serial Number: ([a-f0-9:]+)/i);
      return match ? match[1] : 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private extractExpiryDate(certPem: string): Date {
    try {
      const match = certPem.match(/Not After : (.+)/i);
      if (match) {
        return new Date(match[1]);
      }
    } catch {
      // Fallback: assume 90 days from now (Let's Encrypt standard)
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 90);
    return expiryDate;
  }

  /**
   * Get certificate status
   */
  async getCertificateInfo(domainName: string) {
    return await databaseService.prisma.certificate.findFirst({
      where: {
        domain: {
          name: domainName,
        },
        status: CertificateStatus.ACTIVE,
      },
      include: {
        domain: true,
        renewalJobs: true,
        deployments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Clean up on service shutdown
   */
  async destroy(): Promise<void> {
    if (this.renewalCronJob) {
      this.renewalCronJob.destroy();
      logger.info('Certificate renewal cron job stopped');
    }
  }
}

export const acmeService = new AcmeService();
