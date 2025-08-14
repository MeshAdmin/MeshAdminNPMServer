-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('RUNNING', 'STOPPED', 'ERROR', 'RESTARTING', 'STOPPING', 'STARTING', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'REVOKED', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "RenewalStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DeploymentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'viewer',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'pm2',
    "config" JSONB,
    "status" "ServiceStatus" NOT NULL DEFAULT 'STOPPED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceLog" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "level" "LogLevel" NOT NULL DEFAULT 'INFO',
    "source" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePm2Config" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cwd" TEXT,
    "args" TEXT,
    "interpreter" TEXT,
    "interpreterArgs" TEXT,
    "instances" INTEGER NOT NULL DEFAULT 1,
    "execMode" TEXT NOT NULL DEFAULT 'fork',
    "env" JSONB,
    "envProduction" JSONB,
    "envDevelopment" JSONB,
    "logFile" TEXT,
    "outFile" TEXT,
    "errorFile" TEXT,
    "logDateFormat" TEXT,
    "pidFile" TEXT,
    "minUptimeSeconds" INTEGER DEFAULT 1000,
    "maxRestarts" INTEGER DEFAULT 15,
    "restartDelay" INTEGER DEFAULT 0,
    "watch" BOOLEAN NOT NULL DEFAULT false,
    "watchOptions" JSONB,
    "ignoreWatch" TEXT,
    "maxMemoryRestart" TEXT,
    "killTimeout" INTEGER DEFAULT 1600,
    "waitReady" BOOLEAN NOT NULL DEFAULT false,
    "listenTimeout" INTEGER DEFAULT 3000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePm2Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PackageAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogEntry" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricSample" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetricSample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wildcard" BOOLEAN NOT NULL DEFAULT false,
    "validationMethod" TEXT NOT NULL DEFAULT 'http-01',
    "challengePlugin" TEXT,
    "pluginConfig" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "altNames" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "certPem" TEXT NOT NULL,
    "chainPem" TEXT NOT NULL,
    "keyPem" TEXT NOT NULL,
    "fullchainPem" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "CertificateStatus" NOT NULL DEFAULT 'ACTIVE',
    "acmeAccountKey" TEXT,
    "acmeOrderUrl" TEXT,
    "challengeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateRenewal" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "attemptedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "nextAttempt" TIMESTAMP(3),
    "status" "RenewalStatus" NOT NULL DEFAULT 'SCHEDULED',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "lastError" TEXT,
    "autoRenewal" BOOLEAN NOT NULL DEFAULT true,
    "renewalThreshold" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificateRenewal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateDeployment" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetConfig" JSONB NOT NULL,
    "deploymentPath" TEXT,
    "status" "DeploymentStatus" NOT NULL DEFAULT 'PENDING',
    "deployedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "pm2RestartRequired" BOOLEAN NOT NULL DEFAULT false,
    "pm2RestartCompleted" BOOLEAN NOT NULL DEFAULT false,
    "pm2Services" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificateDeployment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcmeAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accountKey" TEXT NOT NULL,
    "accountUrl" TEXT NOT NULL,
    "directoryUrl" TEXT NOT NULL DEFAULT 'https://acme-v02.api.letsencrypt.org/directory',
    "serverName" TEXT NOT NULL DEFAULT 'Let''s Encrypt',
    "status" TEXT NOT NULL DEFAULT 'valid',
    "termsAccepted" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcmeAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plugin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "hooks" JSONB,
    "filePath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plugin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE INDEX "ServiceLog_serviceId_timestamp_idx" ON "ServiceLog"("serviceId", "timestamp");

-- CreateIndex
CREATE INDEX "ServiceLog_timestamp_idx" ON "ServiceLog"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "ServicePm2Config_serviceId_key" ON "ServicePm2Config"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AcmeAccount_email_key" ON "AcmeAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Plugin_name_key" ON "Plugin"("name");

-- AddForeignKey
ALTER TABLE "ServiceLog" ADD CONSTRAINT "ServiceLog_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePm2Config" ADD CONSTRAINT "ServicePm2Config_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateRenewal" ADD CONSTRAINT "CertificateRenewal_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateRenewal" ADD CONSTRAINT "CertificateRenewal_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateDeployment" ADD CONSTRAINT "CertificateDeployment_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
