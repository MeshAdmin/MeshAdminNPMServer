import nodemailer, { Transporter } from 'nodemailer';
import { appConfig } from '@config/index';
import logger from '../lib/logger';

export interface NotificationPayload {
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  traceId?: string;
  metadata?: Record<string, any>;
}

export interface SlackAttachment {
  color: string;
  fields: Array<{
    title: string;
    value: string;
    short: boolean;
  }>;
  footer: string;
  ts: number;
}

export class NotificationService {
  private emailTransporter: Transporter | null = null;
  private slackWebhookUrl: string | null = null;
  private isEmailEnabled: boolean = false;
  private isSlackEnabled: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Initialize email transport if configured
    if (appConfig.notifications?.email?.enabled) {
      try {
        this.emailTransporter = nodemailer.createTransport({
          host: appConfig.notifications.email.host,
          port: appConfig.notifications.email.port,
          secure: appConfig.notifications.email.secure,
          auth: {
            user: appConfig.notifications.email.user,
            pass: appConfig.notifications.email.password,
          },
        });
        this.isEmailEnabled = true;
        logger.info('Email notifications enabled');
      } catch (error) {
        logger.error('Failed to initialize email transport:', { error });
      }
    }

    // Initialize Slack webhook if configured
    if (appConfig.notifications?.slack?.webhookUrl) {
      this.slackWebhookUrl = appConfig.notifications.slack.webhookUrl;
      this.isSlackEnabled = true;
      logger.info('Slack notifications enabled');
    }
  }

  private getSeverityColor(severity: string): string {
    switch (severity) {
      case 'critical':
        return '#ff0000'; // Red
      case 'high':
        return '#ff8c00'; // Orange
      case 'medium':
        return '#ffd700'; // Yellow
      case 'low':
        return '#36a64f'; // Green
      default:
        return '#808080'; // Gray
    }
  }

  private getSeverityEmoji(severity: string): string {
    switch (severity) {
      case 'critical':
        return '🚨';
      case 'high':
        return '⚠️';
      case 'medium':
        return '⚡';
      case 'low':
        return '💡';
      default:
        return 'ℹ️';
    }
  }

  async sendSlackNotification(payload: NotificationPayload): Promise<boolean> {
    if (!this.isSlackEnabled || !this.slackWebhookUrl) {
      logger.debug('Slack notifications not enabled or webhook URL not configured');
      return false;
    }

    try {
      const emoji = this.getSeverityEmoji(payload.severity);
      const color = this.getSeverityColor(payload.severity);

      const attachment: SlackAttachment = {
        color,
        fields: [
          {
            title: 'Message',
            value: payload.message,
            short: false,
          },
          {
            title: 'Severity',
            value: payload.severity.toUpperCase(),
            short: true,
          },
          {
            title: 'Environment',
            value: appConfig.nodeEnv,
            short: true,
          },
        ],
        footer: 'Mesh Admin Backend',
        ts: Math.floor(Date.now() / 1000),
      };

      if (payload.traceId) {
        attachment.fields.push({
          title: 'Trace ID',
          value: payload.traceId,
          short: true,
        });
      }

      if (payload.metadata) {
        Object.entries(payload.metadata).forEach(([key, value]) => {
          attachment.fields.push({
            title: key,
            value: typeof value === 'object' ? JSON.stringify(value) : String(value),
            short: true,
          });
        });
      }

      const slackPayload = {
        text: `${emoji} ${payload.title}`,
        attachments: [attachment],
        username: 'Mesh Admin Bot',
        icon_emoji: ':robot_face:',
      };

      const response = await fetch(this.slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackPayload),
      });

      if (!response.ok) {
        throw new Error(`Slack API responded with status: ${response.status}`);
      }

      logger.debug('Slack notification sent successfully', {
        traceId: payload.traceId,
        title: payload.title,
      });
      return true;
    } catch (error) {
      logger.error('Failed to send Slack notification:', {
        error,
        traceId: payload.traceId,
      });
      return false;
    }
  }

  async sendEmailNotification(
    payload: NotificationPayload,
    recipients?: string[]
  ): Promise<boolean> {
    if (!this.isEmailEnabled || !this.emailTransporter) {
      logger.debug('Email notifications not enabled or transporter not configured');
      return false;
    }

    try {
      const emailRecipients = recipients || appConfig.notifications?.email?.recipients || [];
      if (emailRecipients.length === 0) {
        logger.warn('No email recipients configured for notifications');
        return false;
      }

      const emoji = this.getSeverityEmoji(payload.severity);
      const subject = `${emoji} [${payload.severity.toUpperCase()}] ${payload.title}`;

      let htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: ${this.getSeverityColor(payload.severity)}; color: white; padding: 20px; text-align: center;">
              <h2>${emoji} ${payload.title}</h2>
            </div>
            <div style="padding: 20px;">
              <h3>Alert Details</h3>
              <p><strong>Message:</strong> ${payload.message}</p>
              <p><strong>Severity:</strong> ${payload.severity.toUpperCase()}</p>
              <p><strong>Environment:</strong> ${appConfig.nodeEnv}</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `;

      if (payload.traceId) {
        htmlContent += `<p><strong>Trace ID:</strong> ${payload.traceId}</p>`;
      }

      if (payload.metadata) {
        htmlContent += '<h4>Additional Information:</h4><ul>';
        Object.entries(payload.metadata).forEach(([key, value]) => {
          const displayValue =
            typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
          htmlContent += `<li><strong>${key}:</strong> <pre>${displayValue}</pre></li>`;
        });
        htmlContent += '</ul>';
      }

      htmlContent += `
            </div>
            <div style="background-color: #f8f9fa; padding: 10px; text-align: center; font-size: 12px; color: #6c757d;">
              Generated by Mesh Admin Backend
            </div>
          </body>
        </html>
      `;

      const mailOptions = {
        from: appConfig.notifications?.email?.from || 'alerts@meshadmin.local',
        to: emailRecipients.join(', '),
        subject,
        html: htmlContent,
      };

      await this.emailTransporter.sendMail(mailOptions);

      logger.debug('Email notification sent successfully', {
        traceId: payload.traceId,
        title: payload.title,
        recipients: emailRecipients.length,
      });
      return true;
    } catch (error) {
      logger.error('Failed to send email notification:', {
        error,
        traceId: payload.traceId,
      });
      return false;
    }
  }

  async notify(
    payload: NotificationPayload,
    options?: {
      email?: boolean;
      slack?: boolean;
      recipients?: string[];
    }
  ): Promise<{ email: boolean; slack: boolean }> {
    const results = { email: false, slack: false };

    const emailEnabled = options?.email !== false;
    const slackEnabled = options?.slack !== false;

    // Send notifications concurrently
    const promises: Promise<void>[] = [];

    if (slackEnabled) {
      promises.push(
        this.sendSlackNotification(payload).then(success => {
          results.slack = success;
        })
      );
    }

    if (emailEnabled) {
      promises.push(
        this.sendEmailNotification(payload, options?.recipients).then(success => {
          results.email = success;
        })
      );
    }

    await Promise.all(promises);

    return results;
  }

  // Quick methods for common notification types
  async notifyError(
    message: string,
    error: Error,
    traceId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.notify({
      title: 'Application Error',
      message: `${message}: ${error.message}`,
      severity: 'high',
      traceId,
      metadata: {
        ...metadata,
        stack: error.stack,
      },
    });
  }

  async notifyCritical(
    title: string,
    message: string,
    traceId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.notify({
      title,
      message,
      severity: 'critical',
      traceId,
      metadata,
    });
  }

  async notifyWarning(
    title: string,
    message: string,
    traceId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.notify({
      title,
      message,
      severity: 'medium',
      traceId,
      metadata,
    });
  }
}

export const notificationService = new NotificationService();
export default notificationService;
