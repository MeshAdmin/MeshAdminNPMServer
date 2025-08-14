
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  password: 'password',
  role: 'role',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  type: 'type',
  config: 'config',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ServiceLogScalarFieldEnum = {
  id: 'id',
  serviceId: 'serviceId',
  message: 'message',
  level: 'level',
  source: 'source',
  timestamp: 'timestamp'
};

exports.Prisma.ServicePm2ConfigScalarFieldEnum = {
  id: 'id',
  serviceId: 'serviceId',
  script: 'script',
  name: 'name',
  cwd: 'cwd',
  args: 'args',
  interpreter: 'interpreter',
  interpreterArgs: 'interpreterArgs',
  instances: 'instances',
  execMode: 'execMode',
  env: 'env',
  envProduction: 'envProduction',
  envDevelopment: 'envDevelopment',
  logFile: 'logFile',
  outFile: 'outFile',
  errorFile: 'errorFile',
  logDateFormat: 'logDateFormat',
  pidFile: 'pidFile',
  minUptimeSeconds: 'minUptimeSeconds',
  maxRestarts: 'maxRestarts',
  restartDelay: 'restartDelay',
  watch: 'watch',
  watchOptions: 'watchOptions',
  ignoreWatch: 'ignoreWatch',
  maxMemoryRestart: 'maxMemoryRestart',
  killTimeout: 'killTimeout',
  waitReady: 'waitReady',
  listenTimeout: 'listenTimeout',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PackageActionScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.LogEntryScalarFieldEnum = {
  id: 'id',
  message: 'message',
  createdAt: 'createdAt'
};

exports.Prisma.MetricSampleScalarFieldEnum = {
  id: 'id',
  value: 'value',
  takenAt: 'takenAt'
};

exports.Prisma.DomainScalarFieldEnum = {
  id: 'id',
  name: 'name',
  wildcard: 'wildcard',
  validationMethod: 'validationMethod',
  challengePlugin: 'challengePlugin',
  pluginConfig: 'pluginConfig',
  isActive: 'isActive',
  lastVerified: 'lastVerified',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertificateScalarFieldEnum = {
  id: 'id',
  domainId: 'domainId',
  subject: 'subject',
  altNames: 'altNames',
  issuer: 'issuer',
  serial: 'serial',
  certPem: 'certPem',
  chainPem: 'chainPem',
  keyPem: 'keyPem',
  fullchainPem: 'fullchainPem',
  issuedAt: 'issuedAt',
  expiresAt: 'expiresAt',
  status: 'status',
  acmeAccountKey: 'acmeAccountKey',
  acmeOrderUrl: 'acmeOrderUrl',
  challengeType: 'challengeType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertificateRenewalScalarFieldEnum = {
  id: 'id',
  certificateId: 'certificateId',
  domainId: 'domainId',
  scheduledAt: 'scheduledAt',
  attemptedAt: 'attemptedAt',
  completedAt: 'completedAt',
  nextAttempt: 'nextAttempt',
  status: 'status',
  attempts: 'attempts',
  maxAttempts: 'maxAttempts',
  lastError: 'lastError',
  autoRenewal: 'autoRenewal',
  renewalThreshold: 'renewalThreshold',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CertificateDeploymentScalarFieldEnum = {
  id: 'id',
  certificateId: 'certificateId',
  targetType: 'targetType',
  targetConfig: 'targetConfig',
  deploymentPath: 'deploymentPath',
  status: 'status',
  deployedAt: 'deployedAt',
  lastError: 'lastError',
  pm2RestartRequired: 'pm2RestartRequired',
  pm2RestartCompleted: 'pm2RestartCompleted',
  pm2Services: 'pm2Services',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AcmeAccountScalarFieldEnum = {
  id: 'id',
  email: 'email',
  accountKey: 'accountKey',
  accountUrl: 'accountUrl',
  directoryUrl: 'directoryUrl',
  serverName: 'serverName',
  status: 'status',
  termsAccepted: 'termsAccepted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PluginScalarFieldEnum = {
  id: 'id',
  name: 'name',
  version: 'version',
  description: 'description',
  enabled: 'enabled',
  config: 'config',
  hooks: 'hooks',
  filePath: 'filePath',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ServiceStatus = exports.$Enums.ServiceStatus = {
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  ERROR: 'ERROR',
  RESTARTING: 'RESTARTING',
  STOPPING: 'STOPPING',
  STARTING: 'STARTING',
  UNKNOWN: 'UNKNOWN'
};

exports.LogLevel = exports.$Enums.LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

exports.CertificateStatus = exports.$Enums.CertificateStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
  PENDING: 'PENDING',
  FAILED: 'FAILED'
};

exports.RenewalStatus = exports.$Enums.RenewalStatus = {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.DeploymentStatus = exports.$Enums.DeploymentStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Service: 'Service',
  ServiceLog: 'ServiceLog',
  ServicePm2Config: 'ServicePm2Config',
  PackageAction: 'PackageAction',
  LogEntry: 'LogEntry',
  MetricSample: 'MetricSample',
  Domain: 'Domain',
  Certificate: 'Certificate',
  CertificateRenewal: 'CertificateRenewal',
  CertificateDeployment: 'CertificateDeployment',
  AcmeAccount: 'AcmeAccount',
  Plugin: 'Plugin'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
