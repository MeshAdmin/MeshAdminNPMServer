
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model ServiceLog
 * 
 */
export type ServiceLog = $Result.DefaultSelection<Prisma.$ServiceLogPayload>
/**
 * Model ServicePm2Config
 * 
 */
export type ServicePm2Config = $Result.DefaultSelection<Prisma.$ServicePm2ConfigPayload>
/**
 * Model PackageAction
 * 
 */
export type PackageAction = $Result.DefaultSelection<Prisma.$PackageActionPayload>
/**
 * Model LogEntry
 * 
 */
export type LogEntry = $Result.DefaultSelection<Prisma.$LogEntryPayload>
/**
 * Model MetricSample
 * 
 */
export type MetricSample = $Result.DefaultSelection<Prisma.$MetricSamplePayload>
/**
 * Model Domain
 * 
 */
export type Domain = $Result.DefaultSelection<Prisma.$DomainPayload>
/**
 * Model Certificate
 * 
 */
export type Certificate = $Result.DefaultSelection<Prisma.$CertificatePayload>
/**
 * Model CertificateRenewal
 * 
 */
export type CertificateRenewal = $Result.DefaultSelection<Prisma.$CertificateRenewalPayload>
/**
 * Model CertificateDeployment
 * 
 */
export type CertificateDeployment = $Result.DefaultSelection<Prisma.$CertificateDeploymentPayload>
/**
 * Model AcmeAccount
 * 
 */
export type AcmeAccount = $Result.DefaultSelection<Prisma.$AcmeAccountPayload>
/**
 * Model Plugin
 * 
 */
export type Plugin = $Result.DefaultSelection<Prisma.$PluginPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ServiceStatus: {
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  ERROR: 'ERROR',
  RESTARTING: 'RESTARTING',
  STOPPING: 'STOPPING',
  STARTING: 'STARTING',
  UNKNOWN: 'UNKNOWN'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]


export const LogLevel: {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
};

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]


export const CertificateStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
  PENDING: 'PENDING',
  FAILED: 'FAILED'
};

export type CertificateStatus = (typeof CertificateStatus)[keyof typeof CertificateStatus]


export const RenewalStatus: {
  SCHEDULED: 'SCHEDULED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type RenewalStatus = (typeof RenewalStatus)[keyof typeof RenewalStatus]


export const DeploymentStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type DeploymentStatus = (typeof DeploymentStatus)[keyof typeof DeploymentStatus]

}

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

export type LogLevel = $Enums.LogLevel

export const LogLevel: typeof $Enums.LogLevel

export type CertificateStatus = $Enums.CertificateStatus

export const CertificateStatus: typeof $Enums.CertificateStatus

export type RenewalStatus = $Enums.RenewalStatus

export const RenewalStatus: typeof $Enums.RenewalStatus

export type DeploymentStatus = $Enums.DeploymentStatus

export const DeploymentStatus: typeof $Enums.DeploymentStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.serviceLog`: Exposes CRUD operations for the **ServiceLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceLogs
    * const serviceLogs = await prisma.serviceLog.findMany()
    * ```
    */
  get serviceLog(): Prisma.ServiceLogDelegate<ExtArgs>;

  /**
   * `prisma.servicePm2Config`: Exposes CRUD operations for the **ServicePm2Config** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServicePm2Configs
    * const servicePm2Configs = await prisma.servicePm2Config.findMany()
    * ```
    */
  get servicePm2Config(): Prisma.ServicePm2ConfigDelegate<ExtArgs>;

  /**
   * `prisma.packageAction`: Exposes CRUD operations for the **PackageAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PackageActions
    * const packageActions = await prisma.packageAction.findMany()
    * ```
    */
  get packageAction(): Prisma.PackageActionDelegate<ExtArgs>;

  /**
   * `prisma.logEntry`: Exposes CRUD operations for the **LogEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogEntries
    * const logEntries = await prisma.logEntry.findMany()
    * ```
    */
  get logEntry(): Prisma.LogEntryDelegate<ExtArgs>;

  /**
   * `prisma.metricSample`: Exposes CRUD operations for the **MetricSample** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetricSamples
    * const metricSamples = await prisma.metricSample.findMany()
    * ```
    */
  get metricSample(): Prisma.MetricSampleDelegate<ExtArgs>;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Domains
    * const domains = await prisma.domain.findMany()
    * ```
    */
  get domain(): Prisma.DomainDelegate<ExtArgs>;

  /**
   * `prisma.certificate`: Exposes CRUD operations for the **Certificate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Certificates
    * const certificates = await prisma.certificate.findMany()
    * ```
    */
  get certificate(): Prisma.CertificateDelegate<ExtArgs>;

  /**
   * `prisma.certificateRenewal`: Exposes CRUD operations for the **CertificateRenewal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CertificateRenewals
    * const certificateRenewals = await prisma.certificateRenewal.findMany()
    * ```
    */
  get certificateRenewal(): Prisma.CertificateRenewalDelegate<ExtArgs>;

  /**
   * `prisma.certificateDeployment`: Exposes CRUD operations for the **CertificateDeployment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CertificateDeployments
    * const certificateDeployments = await prisma.certificateDeployment.findMany()
    * ```
    */
  get certificateDeployment(): Prisma.CertificateDeploymentDelegate<ExtArgs>;

  /**
   * `prisma.acmeAccount`: Exposes CRUD operations for the **AcmeAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcmeAccounts
    * const acmeAccounts = await prisma.acmeAccount.findMany()
    * ```
    */
  get acmeAccount(): Prisma.AcmeAccountDelegate<ExtArgs>;

  /**
   * `prisma.plugin`: Exposes CRUD operations for the **Plugin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plugins
    * const plugins = await prisma.plugin.findMany()
    * ```
    */
  get plugin(): Prisma.PluginDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "service" | "serviceLog" | "servicePm2Config" | "packageAction" | "logEntry" | "metricSample" | "domain" | "certificate" | "certificateRenewal" | "certificateDeployment" | "acmeAccount" | "plugin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      ServiceLog: {
        payload: Prisma.$ServiceLogPayload<ExtArgs>
        fields: Prisma.ServiceLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>
          }
          findFirst: {
            args: Prisma.ServiceLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>
          }
          findMany: {
            args: Prisma.ServiceLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>[]
          }
          create: {
            args: Prisma.ServiceLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>
          }
          createMany: {
            args: Prisma.ServiceLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>[]
          }
          delete: {
            args: Prisma.ServiceLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>
          }
          update: {
            args: Prisma.ServiceLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>
          }
          deleteMany: {
            args: Prisma.ServiceLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceLogPayload>
          }
          aggregate: {
            args: Prisma.ServiceLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceLog>
          }
          groupBy: {
            args: Prisma.ServiceLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceLogCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceLogCountAggregateOutputType> | number
          }
        }
      }
      ServicePm2Config: {
        payload: Prisma.$ServicePm2ConfigPayload<ExtArgs>
        fields: Prisma.ServicePm2ConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServicePm2ConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServicePm2ConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>
          }
          findFirst: {
            args: Prisma.ServicePm2ConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServicePm2ConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>
          }
          findMany: {
            args: Prisma.ServicePm2ConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>[]
          }
          create: {
            args: Prisma.ServicePm2ConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>
          }
          createMany: {
            args: Prisma.ServicePm2ConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServicePm2ConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>[]
          }
          delete: {
            args: Prisma.ServicePm2ConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>
          }
          update: {
            args: Prisma.ServicePm2ConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>
          }
          deleteMany: {
            args: Prisma.ServicePm2ConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServicePm2ConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServicePm2ConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePm2ConfigPayload>
          }
          aggregate: {
            args: Prisma.ServicePm2ConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServicePm2Config>
          }
          groupBy: {
            args: Prisma.ServicePm2ConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServicePm2ConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServicePm2ConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ServicePm2ConfigCountAggregateOutputType> | number
          }
        }
      }
      PackageAction: {
        payload: Prisma.$PackageActionPayload<ExtArgs>
        fields: Prisma.PackageActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>
          }
          findFirst: {
            args: Prisma.PackageActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>
          }
          findMany: {
            args: Prisma.PackageActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>[]
          }
          create: {
            args: Prisma.PackageActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>
          }
          createMany: {
            args: Prisma.PackageActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>[]
          }
          delete: {
            args: Prisma.PackageActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>
          }
          update: {
            args: Prisma.PackageActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>
          }
          deleteMany: {
            args: Prisma.PackageActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PackageActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackageActionPayload>
          }
          aggregate: {
            args: Prisma.PackageActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackageAction>
          }
          groupBy: {
            args: Prisma.PackageActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageActionCountArgs<ExtArgs>
            result: $Utils.Optional<PackageActionCountAggregateOutputType> | number
          }
        }
      }
      LogEntry: {
        payload: Prisma.$LogEntryPayload<ExtArgs>
        fields: Prisma.LogEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          findFirst: {
            args: Prisma.LogEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          findMany: {
            args: Prisma.LogEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>[]
          }
          create: {
            args: Prisma.LogEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          createMany: {
            args: Prisma.LogEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>[]
          }
          delete: {
            args: Prisma.LogEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          update: {
            args: Prisma.LogEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          deleteMany: {
            args: Prisma.LogEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LogEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogEntryPayload>
          }
          aggregate: {
            args: Prisma.LogEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLogEntry>
          }
          groupBy: {
            args: Prisma.LogEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LogEntryCountAggregateOutputType> | number
          }
        }
      }
      MetricSample: {
        payload: Prisma.$MetricSamplePayload<ExtArgs>
        fields: Prisma.MetricSampleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetricSampleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetricSampleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>
          }
          findFirst: {
            args: Prisma.MetricSampleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetricSampleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>
          }
          findMany: {
            args: Prisma.MetricSampleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>[]
          }
          create: {
            args: Prisma.MetricSampleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>
          }
          createMany: {
            args: Prisma.MetricSampleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetricSampleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>[]
          }
          delete: {
            args: Prisma.MetricSampleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>
          }
          update: {
            args: Prisma.MetricSampleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>
          }
          deleteMany: {
            args: Prisma.MetricSampleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetricSampleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MetricSampleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSamplePayload>
          }
          aggregate: {
            args: Prisma.MetricSampleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetricSample>
          }
          groupBy: {
            args: Prisma.MetricSampleGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetricSampleGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetricSampleCountArgs<ExtArgs>
            result: $Utils.Optional<MetricSampleCountAggregateOutputType> | number
          }
        }
      }
      Domain: {
        payload: Prisma.$DomainPayload<ExtArgs>
        fields: Prisma.DomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findFirst: {
            args: Prisma.DomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findMany: {
            args: Prisma.DomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          create: {
            args: Prisma.DomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          createMany: {
            args: Prisma.DomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          delete: {
            args: Prisma.DomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          update: {
            args: Prisma.DomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          deleteMany: {
            args: Prisma.DomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          aggregate: {
            args: Prisma.DomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomain>
          }
          groupBy: {
            args: Prisma.DomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainCountArgs<ExtArgs>
            result: $Utils.Optional<DomainCountAggregateOutputType> | number
          }
        }
      }
      Certificate: {
        payload: Prisma.$CertificatePayload<ExtArgs>
        fields: Prisma.CertificateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          findFirst: {
            args: Prisma.CertificateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          findMany: {
            args: Prisma.CertificateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          create: {
            args: Prisma.CertificateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          createMany: {
            args: Prisma.CertificateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>[]
          }
          delete: {
            args: Prisma.CertificateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          update: {
            args: Prisma.CertificateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          deleteMany: {
            args: Prisma.CertificateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificatePayload>
          }
          aggregate: {
            args: Prisma.CertificateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificate>
          }
          groupBy: {
            args: Prisma.CertificateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificateCountArgs<ExtArgs>
            result: $Utils.Optional<CertificateCountAggregateOutputType> | number
          }
        }
      }
      CertificateRenewal: {
        payload: Prisma.$CertificateRenewalPayload<ExtArgs>
        fields: Prisma.CertificateRenewalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificateRenewalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificateRenewalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>
          }
          findFirst: {
            args: Prisma.CertificateRenewalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificateRenewalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>
          }
          findMany: {
            args: Prisma.CertificateRenewalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>[]
          }
          create: {
            args: Prisma.CertificateRenewalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>
          }
          createMany: {
            args: Prisma.CertificateRenewalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificateRenewalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>[]
          }
          delete: {
            args: Prisma.CertificateRenewalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>
          }
          update: {
            args: Prisma.CertificateRenewalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>
          }
          deleteMany: {
            args: Prisma.CertificateRenewalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificateRenewalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificateRenewalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateRenewalPayload>
          }
          aggregate: {
            args: Prisma.CertificateRenewalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificateRenewal>
          }
          groupBy: {
            args: Prisma.CertificateRenewalGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificateRenewalGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificateRenewalCountArgs<ExtArgs>
            result: $Utils.Optional<CertificateRenewalCountAggregateOutputType> | number
          }
        }
      }
      CertificateDeployment: {
        payload: Prisma.$CertificateDeploymentPayload<ExtArgs>
        fields: Prisma.CertificateDeploymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificateDeploymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificateDeploymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>
          }
          findFirst: {
            args: Prisma.CertificateDeploymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificateDeploymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>
          }
          findMany: {
            args: Prisma.CertificateDeploymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>[]
          }
          create: {
            args: Prisma.CertificateDeploymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>
          }
          createMany: {
            args: Prisma.CertificateDeploymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CertificateDeploymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>[]
          }
          delete: {
            args: Prisma.CertificateDeploymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>
          }
          update: {
            args: Prisma.CertificateDeploymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>
          }
          deleteMany: {
            args: Prisma.CertificateDeploymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificateDeploymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificateDeploymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificateDeploymentPayload>
          }
          aggregate: {
            args: Prisma.CertificateDeploymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertificateDeployment>
          }
          groupBy: {
            args: Prisma.CertificateDeploymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificateDeploymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificateDeploymentCountArgs<ExtArgs>
            result: $Utils.Optional<CertificateDeploymentCountAggregateOutputType> | number
          }
        }
      }
      AcmeAccount: {
        payload: Prisma.$AcmeAccountPayload<ExtArgs>
        fields: Prisma.AcmeAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcmeAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcmeAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>
          }
          findFirst: {
            args: Prisma.AcmeAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcmeAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>
          }
          findMany: {
            args: Prisma.AcmeAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>[]
          }
          create: {
            args: Prisma.AcmeAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>
          }
          createMany: {
            args: Prisma.AcmeAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcmeAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>[]
          }
          delete: {
            args: Prisma.AcmeAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>
          }
          update: {
            args: Prisma.AcmeAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>
          }
          deleteMany: {
            args: Prisma.AcmeAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcmeAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcmeAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcmeAccountPayload>
          }
          aggregate: {
            args: Prisma.AcmeAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcmeAccount>
          }
          groupBy: {
            args: Prisma.AcmeAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcmeAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcmeAccountCountArgs<ExtArgs>
            result: $Utils.Optional<AcmeAccountCountAggregateOutputType> | number
          }
        }
      }
      Plugin: {
        payload: Prisma.$PluginPayload<ExtArgs>
        fields: Prisma.PluginFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PluginFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PluginFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>
          }
          findFirst: {
            args: Prisma.PluginFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PluginFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>
          }
          findMany: {
            args: Prisma.PluginFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>[]
          }
          create: {
            args: Prisma.PluginCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>
          }
          createMany: {
            args: Prisma.PluginCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PluginCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>[]
          }
          delete: {
            args: Prisma.PluginDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>
          }
          update: {
            args: Prisma.PluginUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>
          }
          deleteMany: {
            args: Prisma.PluginDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PluginUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PluginUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PluginPayload>
          }
          aggregate: {
            args: Prisma.PluginAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlugin>
          }
          groupBy: {
            args: Prisma.PluginGroupByArgs<ExtArgs>
            result: $Utils.Optional<PluginGroupByOutputType>[]
          }
          count: {
            args: Prisma.PluginCountArgs<ExtArgs>
            result: $Utils.Optional<PluginCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    logs: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | ServiceCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceLogWhereInput
  }


  /**
   * Count Type DomainCountOutputType
   */

  export type DomainCountOutputType = {
    certificates: number
    renewalJobs: number
  }

  export type DomainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certificates?: boolean | DomainCountOutputTypeCountCertificatesArgs
    renewalJobs?: boolean | DomainCountOutputTypeCountRenewalJobsArgs
  }

  // Custom InputTypes
  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainCountOutputType
     */
    select?: DomainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountCertificatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountRenewalJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateRenewalWhereInput
  }


  /**
   * Count Type CertificateCountOutputType
   */

  export type CertificateCountOutputType = {
    deployments: number
    renewalJobs: number
  }

  export type CertificateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deployments?: boolean | CertificateCountOutputTypeCountDeploymentsArgs
    renewalJobs?: boolean | CertificateCountOutputTypeCountRenewalJobsArgs
  }

  // Custom InputTypes
  /**
   * CertificateCountOutputType without action
   */
  export type CertificateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateCountOutputType
     */
    select?: CertificateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CertificateCountOutputType without action
   */
  export type CertificateCountOutputTypeCountDeploymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateDeploymentWhereInput
  }

  /**
   * CertificateCountOutputType without action
   */
  export type CertificateCountOutputTypeCountRenewalJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateRenewalWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    role: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      role: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    type: string | null
    status: $Enums.ServiceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    type: string | null
    status: $Enums.ServiceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    type: number
    config: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    type?: true
    config?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    description: string | null
    type: string
    config: JsonValue | null
    status: $Enums.ServiceStatus
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    logs?: boolean | Service$logsArgs<ExtArgs>
    pm2Config?: boolean | Service$pm2ConfigArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    type?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | Service$logsArgs<ExtArgs>
    pm2Config?: boolean | Service$pm2ConfigArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      logs: Prisma.$ServiceLogPayload<ExtArgs>[]
      pm2Config: Prisma.$ServicePm2ConfigPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      type: string
      config: Prisma.JsonValue | null
      status: $Enums.ServiceStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends Service$logsArgs<ExtArgs> = {}>(args?: Subset<T, Service$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "findMany"> | Null>
    pm2Config<T extends Service$pm2ConfigArgs<ExtArgs> = {}>(args?: Subset<T, Service$pm2ConfigArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly type: FieldRef<"Service", 'String'>
    readonly config: FieldRef<"Service", 'Json'>
    readonly status: FieldRef<"Service", 'ServiceStatus'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }

  /**
   * Service.logs
   */
  export type Service$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    where?: ServiceLogWhereInput
    orderBy?: ServiceLogOrderByWithRelationInput | ServiceLogOrderByWithRelationInput[]
    cursor?: ServiceLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceLogScalarFieldEnum | ServiceLogScalarFieldEnum[]
  }

  /**
   * Service.pm2Config
   */
  export type Service$pm2ConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    where?: ServicePm2ConfigWhereInput
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model ServiceLog
   */

  export type AggregateServiceLog = {
    _count: ServiceLogCountAggregateOutputType | null
    _min: ServiceLogMinAggregateOutputType | null
    _max: ServiceLogMaxAggregateOutputType | null
  }

  export type ServiceLogMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    message: string | null
    level: $Enums.LogLevel | null
    source: string | null
    timestamp: Date | null
  }

  export type ServiceLogMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    message: string | null
    level: $Enums.LogLevel | null
    source: string | null
    timestamp: Date | null
  }

  export type ServiceLogCountAggregateOutputType = {
    id: number
    serviceId: number
    message: number
    level: number
    source: number
    timestamp: number
    _all: number
  }


  export type ServiceLogMinAggregateInputType = {
    id?: true
    serviceId?: true
    message?: true
    level?: true
    source?: true
    timestamp?: true
  }

  export type ServiceLogMaxAggregateInputType = {
    id?: true
    serviceId?: true
    message?: true
    level?: true
    source?: true
    timestamp?: true
  }

  export type ServiceLogCountAggregateInputType = {
    id?: true
    serviceId?: true
    message?: true
    level?: true
    source?: true
    timestamp?: true
    _all?: true
  }

  export type ServiceLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceLog to aggregate.
     */
    where?: ServiceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceLogs to fetch.
     */
    orderBy?: ServiceLogOrderByWithRelationInput | ServiceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceLogs
    **/
    _count?: true | ServiceLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceLogMaxAggregateInputType
  }

  export type GetServiceLogAggregateType<T extends ServiceLogAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceLog[P]>
      : GetScalarType<T[P], AggregateServiceLog[P]>
  }




  export type ServiceLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceLogWhereInput
    orderBy?: ServiceLogOrderByWithAggregationInput | ServiceLogOrderByWithAggregationInput[]
    by: ServiceLogScalarFieldEnum[] | ServiceLogScalarFieldEnum
    having?: ServiceLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceLogCountAggregateInputType | true
    _min?: ServiceLogMinAggregateInputType
    _max?: ServiceLogMaxAggregateInputType
  }

  export type ServiceLogGroupByOutputType = {
    id: string
    serviceId: string
    message: string
    level: $Enums.LogLevel
    source: string | null
    timestamp: Date
    _count: ServiceLogCountAggregateOutputType | null
    _min: ServiceLogMinAggregateOutputType | null
    _max: ServiceLogMaxAggregateOutputType | null
  }

  type GetServiceLogGroupByPayload<T extends ServiceLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceLogGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceLogGroupByOutputType[P]>
        }
      >
    >


  export type ServiceLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    message?: boolean
    level?: boolean
    source?: boolean
    timestamp?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceLog"]>

  export type ServiceLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    message?: boolean
    level?: boolean
    source?: boolean
    timestamp?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceLog"]>

  export type ServiceLogSelectScalar = {
    id?: boolean
    serviceId?: boolean
    message?: boolean
    level?: boolean
    source?: boolean
    timestamp?: boolean
  }

  export type ServiceLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServiceLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceLog"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      message: string
      level: $Enums.LogLevel
      source: string | null
      timestamp: Date
    }, ExtArgs["result"]["serviceLog"]>
    composites: {}
  }

  type ServiceLogGetPayload<S extends boolean | null | undefined | ServiceLogDefaultArgs> = $Result.GetResult<Prisma.$ServiceLogPayload, S>

  type ServiceLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceLogCountAggregateInputType | true
    }

  export interface ServiceLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceLog'], meta: { name: 'ServiceLog' } }
    /**
     * Find zero or one ServiceLog that matches the filter.
     * @param {ServiceLogFindUniqueArgs} args - Arguments to find a ServiceLog
     * @example
     * // Get one ServiceLog
     * const serviceLog = await prisma.serviceLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceLogFindUniqueArgs>(args: SelectSubset<T, ServiceLogFindUniqueArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ServiceLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServiceLogFindUniqueOrThrowArgs} args - Arguments to find a ServiceLog
     * @example
     * // Get one ServiceLog
     * const serviceLog = await prisma.serviceLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ServiceLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogFindFirstArgs} args - Arguments to find a ServiceLog
     * @example
     * // Get one ServiceLog
     * const serviceLog = await prisma.serviceLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceLogFindFirstArgs>(args?: SelectSubset<T, ServiceLogFindFirstArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ServiceLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogFindFirstOrThrowArgs} args - Arguments to find a ServiceLog
     * @example
     * // Get one ServiceLog
     * const serviceLog = await prisma.serviceLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ServiceLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceLogs
     * const serviceLogs = await prisma.serviceLog.findMany()
     * 
     * // Get first 10 ServiceLogs
     * const serviceLogs = await prisma.serviceLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceLogWithIdOnly = await prisma.serviceLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceLogFindManyArgs>(args?: SelectSubset<T, ServiceLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ServiceLog.
     * @param {ServiceLogCreateArgs} args - Arguments to create a ServiceLog.
     * @example
     * // Create one ServiceLog
     * const ServiceLog = await prisma.serviceLog.create({
     *   data: {
     *     // ... data to create a ServiceLog
     *   }
     * })
     * 
     */
    create<T extends ServiceLogCreateArgs>(args: SelectSubset<T, ServiceLogCreateArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ServiceLogs.
     * @param {ServiceLogCreateManyArgs} args - Arguments to create many ServiceLogs.
     * @example
     * // Create many ServiceLogs
     * const serviceLog = await prisma.serviceLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceLogCreateManyArgs>(args?: SelectSubset<T, ServiceLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceLogs and returns the data saved in the database.
     * @param {ServiceLogCreateManyAndReturnArgs} args - Arguments to create many ServiceLogs.
     * @example
     * // Create many ServiceLogs
     * const serviceLog = await prisma.serviceLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceLogs and only return the `id`
     * const serviceLogWithIdOnly = await prisma.serviceLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ServiceLog.
     * @param {ServiceLogDeleteArgs} args - Arguments to delete one ServiceLog.
     * @example
     * // Delete one ServiceLog
     * const ServiceLog = await prisma.serviceLog.delete({
     *   where: {
     *     // ... filter to delete one ServiceLog
     *   }
     * })
     * 
     */
    delete<T extends ServiceLogDeleteArgs>(args: SelectSubset<T, ServiceLogDeleteArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ServiceLog.
     * @param {ServiceLogUpdateArgs} args - Arguments to update one ServiceLog.
     * @example
     * // Update one ServiceLog
     * const serviceLog = await prisma.serviceLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceLogUpdateArgs>(args: SelectSubset<T, ServiceLogUpdateArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ServiceLogs.
     * @param {ServiceLogDeleteManyArgs} args - Arguments to filter ServiceLogs to delete.
     * @example
     * // Delete a few ServiceLogs
     * const { count } = await prisma.serviceLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceLogDeleteManyArgs>(args?: SelectSubset<T, ServiceLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceLogs
     * const serviceLog = await prisma.serviceLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceLogUpdateManyArgs>(args: SelectSubset<T, ServiceLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ServiceLog.
     * @param {ServiceLogUpsertArgs} args - Arguments to update or create a ServiceLog.
     * @example
     * // Update or create a ServiceLog
     * const serviceLog = await prisma.serviceLog.upsert({
     *   create: {
     *     // ... data to create a ServiceLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceLog we want to update
     *   }
     * })
     */
    upsert<T extends ServiceLogUpsertArgs>(args: SelectSubset<T, ServiceLogUpsertArgs<ExtArgs>>): Prisma__ServiceLogClient<$Result.GetResult<Prisma.$ServiceLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ServiceLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogCountArgs} args - Arguments to filter ServiceLogs to count.
     * @example
     * // Count the number of ServiceLogs
     * const count = await prisma.serviceLog.count({
     *   where: {
     *     // ... the filter for the ServiceLogs we want to count
     *   }
     * })
    **/
    count<T extends ServiceLogCountArgs>(
      args?: Subset<T, ServiceLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceLogAggregateArgs>(args: Subset<T, ServiceLogAggregateArgs>): Prisma.PrismaPromise<GetServiceLogAggregateType<T>>

    /**
     * Group by ServiceLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceLogGroupByArgs['orderBy'] }
        : { orderBy?: ServiceLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceLog model
   */
  readonly fields: ServiceLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceLog model
   */ 
  interface ServiceLogFieldRefs {
    readonly id: FieldRef<"ServiceLog", 'String'>
    readonly serviceId: FieldRef<"ServiceLog", 'String'>
    readonly message: FieldRef<"ServiceLog", 'String'>
    readonly level: FieldRef<"ServiceLog", 'LogLevel'>
    readonly source: FieldRef<"ServiceLog", 'String'>
    readonly timestamp: FieldRef<"ServiceLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceLog findUnique
   */
  export type ServiceLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * Filter, which ServiceLog to fetch.
     */
    where: ServiceLogWhereUniqueInput
  }

  /**
   * ServiceLog findUniqueOrThrow
   */
  export type ServiceLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * Filter, which ServiceLog to fetch.
     */
    where: ServiceLogWhereUniqueInput
  }

  /**
   * ServiceLog findFirst
   */
  export type ServiceLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * Filter, which ServiceLog to fetch.
     */
    where?: ServiceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceLogs to fetch.
     */
    orderBy?: ServiceLogOrderByWithRelationInput | ServiceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceLogs.
     */
    cursor?: ServiceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceLogs.
     */
    distinct?: ServiceLogScalarFieldEnum | ServiceLogScalarFieldEnum[]
  }

  /**
   * ServiceLog findFirstOrThrow
   */
  export type ServiceLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * Filter, which ServiceLog to fetch.
     */
    where?: ServiceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceLogs to fetch.
     */
    orderBy?: ServiceLogOrderByWithRelationInput | ServiceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceLogs.
     */
    cursor?: ServiceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceLogs.
     */
    distinct?: ServiceLogScalarFieldEnum | ServiceLogScalarFieldEnum[]
  }

  /**
   * ServiceLog findMany
   */
  export type ServiceLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * Filter, which ServiceLogs to fetch.
     */
    where?: ServiceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceLogs to fetch.
     */
    orderBy?: ServiceLogOrderByWithRelationInput | ServiceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceLogs.
     */
    cursor?: ServiceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceLogs.
     */
    skip?: number
    distinct?: ServiceLogScalarFieldEnum | ServiceLogScalarFieldEnum[]
  }

  /**
   * ServiceLog create
   */
  export type ServiceLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceLog.
     */
    data: XOR<ServiceLogCreateInput, ServiceLogUncheckedCreateInput>
  }

  /**
   * ServiceLog createMany
   */
  export type ServiceLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceLogs.
     */
    data: ServiceLogCreateManyInput | ServiceLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceLog createManyAndReturn
   */
  export type ServiceLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ServiceLogs.
     */
    data: ServiceLogCreateManyInput | ServiceLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceLog update
   */
  export type ServiceLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceLog.
     */
    data: XOR<ServiceLogUpdateInput, ServiceLogUncheckedUpdateInput>
    /**
     * Choose, which ServiceLog to update.
     */
    where: ServiceLogWhereUniqueInput
  }

  /**
   * ServiceLog updateMany
   */
  export type ServiceLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceLogs.
     */
    data: XOR<ServiceLogUpdateManyMutationInput, ServiceLogUncheckedUpdateManyInput>
    /**
     * Filter which ServiceLogs to update
     */
    where?: ServiceLogWhereInput
  }

  /**
   * ServiceLog upsert
   */
  export type ServiceLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceLog to update in case it exists.
     */
    where: ServiceLogWhereUniqueInput
    /**
     * In case the ServiceLog found by the `where` argument doesn't exist, create a new ServiceLog with this data.
     */
    create: XOR<ServiceLogCreateInput, ServiceLogUncheckedCreateInput>
    /**
     * In case the ServiceLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceLogUpdateInput, ServiceLogUncheckedUpdateInput>
  }

  /**
   * ServiceLog delete
   */
  export type ServiceLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
    /**
     * Filter which ServiceLog to delete.
     */
    where: ServiceLogWhereUniqueInput
  }

  /**
   * ServiceLog deleteMany
   */
  export type ServiceLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceLogs to delete
     */
    where?: ServiceLogWhereInput
  }

  /**
   * ServiceLog without action
   */
  export type ServiceLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceLog
     */
    select?: ServiceLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceLogInclude<ExtArgs> | null
  }


  /**
   * Model ServicePm2Config
   */

  export type AggregateServicePm2Config = {
    _count: ServicePm2ConfigCountAggregateOutputType | null
    _avg: ServicePm2ConfigAvgAggregateOutputType | null
    _sum: ServicePm2ConfigSumAggregateOutputType | null
    _min: ServicePm2ConfigMinAggregateOutputType | null
    _max: ServicePm2ConfigMaxAggregateOutputType | null
  }

  export type ServicePm2ConfigAvgAggregateOutputType = {
    instances: number | null
    minUptimeSeconds: number | null
    maxRestarts: number | null
    restartDelay: number | null
    killTimeout: number | null
    listenTimeout: number | null
  }

  export type ServicePm2ConfigSumAggregateOutputType = {
    instances: number | null
    minUptimeSeconds: number | null
    maxRestarts: number | null
    restartDelay: number | null
    killTimeout: number | null
    listenTimeout: number | null
  }

  export type ServicePm2ConfigMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    script: string | null
    name: string | null
    cwd: string | null
    args: string | null
    interpreter: string | null
    interpreterArgs: string | null
    instances: number | null
    execMode: string | null
    logFile: string | null
    outFile: string | null
    errorFile: string | null
    logDateFormat: string | null
    pidFile: string | null
    minUptimeSeconds: number | null
    maxRestarts: number | null
    restartDelay: number | null
    watch: boolean | null
    ignoreWatch: string | null
    maxMemoryRestart: string | null
    killTimeout: number | null
    waitReady: boolean | null
    listenTimeout: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServicePm2ConfigMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    script: string | null
    name: string | null
    cwd: string | null
    args: string | null
    interpreter: string | null
    interpreterArgs: string | null
    instances: number | null
    execMode: string | null
    logFile: string | null
    outFile: string | null
    errorFile: string | null
    logDateFormat: string | null
    pidFile: string | null
    minUptimeSeconds: number | null
    maxRestarts: number | null
    restartDelay: number | null
    watch: boolean | null
    ignoreWatch: string | null
    maxMemoryRestart: string | null
    killTimeout: number | null
    waitReady: boolean | null
    listenTimeout: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServicePm2ConfigCountAggregateOutputType = {
    id: number
    serviceId: number
    script: number
    name: number
    cwd: number
    args: number
    interpreter: number
    interpreterArgs: number
    instances: number
    execMode: number
    env: number
    envProduction: number
    envDevelopment: number
    logFile: number
    outFile: number
    errorFile: number
    logDateFormat: number
    pidFile: number
    minUptimeSeconds: number
    maxRestarts: number
    restartDelay: number
    watch: number
    watchOptions: number
    ignoreWatch: number
    maxMemoryRestart: number
    killTimeout: number
    waitReady: number
    listenTimeout: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServicePm2ConfigAvgAggregateInputType = {
    instances?: true
    minUptimeSeconds?: true
    maxRestarts?: true
    restartDelay?: true
    killTimeout?: true
    listenTimeout?: true
  }

  export type ServicePm2ConfigSumAggregateInputType = {
    instances?: true
    minUptimeSeconds?: true
    maxRestarts?: true
    restartDelay?: true
    killTimeout?: true
    listenTimeout?: true
  }

  export type ServicePm2ConfigMinAggregateInputType = {
    id?: true
    serviceId?: true
    script?: true
    name?: true
    cwd?: true
    args?: true
    interpreter?: true
    interpreterArgs?: true
    instances?: true
    execMode?: true
    logFile?: true
    outFile?: true
    errorFile?: true
    logDateFormat?: true
    pidFile?: true
    minUptimeSeconds?: true
    maxRestarts?: true
    restartDelay?: true
    watch?: true
    ignoreWatch?: true
    maxMemoryRestart?: true
    killTimeout?: true
    waitReady?: true
    listenTimeout?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServicePm2ConfigMaxAggregateInputType = {
    id?: true
    serviceId?: true
    script?: true
    name?: true
    cwd?: true
    args?: true
    interpreter?: true
    interpreterArgs?: true
    instances?: true
    execMode?: true
    logFile?: true
    outFile?: true
    errorFile?: true
    logDateFormat?: true
    pidFile?: true
    minUptimeSeconds?: true
    maxRestarts?: true
    restartDelay?: true
    watch?: true
    ignoreWatch?: true
    maxMemoryRestart?: true
    killTimeout?: true
    waitReady?: true
    listenTimeout?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServicePm2ConfigCountAggregateInputType = {
    id?: true
    serviceId?: true
    script?: true
    name?: true
    cwd?: true
    args?: true
    interpreter?: true
    interpreterArgs?: true
    instances?: true
    execMode?: true
    env?: true
    envProduction?: true
    envDevelopment?: true
    logFile?: true
    outFile?: true
    errorFile?: true
    logDateFormat?: true
    pidFile?: true
    minUptimeSeconds?: true
    maxRestarts?: true
    restartDelay?: true
    watch?: true
    watchOptions?: true
    ignoreWatch?: true
    maxMemoryRestart?: true
    killTimeout?: true
    waitReady?: true
    listenTimeout?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServicePm2ConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServicePm2Config to aggregate.
     */
    where?: ServicePm2ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePm2Configs to fetch.
     */
    orderBy?: ServicePm2ConfigOrderByWithRelationInput | ServicePm2ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServicePm2ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePm2Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePm2Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServicePm2Configs
    **/
    _count?: true | ServicePm2ConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServicePm2ConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServicePm2ConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServicePm2ConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServicePm2ConfigMaxAggregateInputType
  }

  export type GetServicePm2ConfigAggregateType<T extends ServicePm2ConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateServicePm2Config]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServicePm2Config[P]>
      : GetScalarType<T[P], AggregateServicePm2Config[P]>
  }




  export type ServicePm2ConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServicePm2ConfigWhereInput
    orderBy?: ServicePm2ConfigOrderByWithAggregationInput | ServicePm2ConfigOrderByWithAggregationInput[]
    by: ServicePm2ConfigScalarFieldEnum[] | ServicePm2ConfigScalarFieldEnum
    having?: ServicePm2ConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServicePm2ConfigCountAggregateInputType | true
    _avg?: ServicePm2ConfigAvgAggregateInputType
    _sum?: ServicePm2ConfigSumAggregateInputType
    _min?: ServicePm2ConfigMinAggregateInputType
    _max?: ServicePm2ConfigMaxAggregateInputType
  }

  export type ServicePm2ConfigGroupByOutputType = {
    id: string
    serviceId: string
    script: string
    name: string
    cwd: string | null
    args: string | null
    interpreter: string | null
    interpreterArgs: string | null
    instances: number
    execMode: string
    env: JsonValue | null
    envProduction: JsonValue | null
    envDevelopment: JsonValue | null
    logFile: string | null
    outFile: string | null
    errorFile: string | null
    logDateFormat: string | null
    pidFile: string | null
    minUptimeSeconds: number | null
    maxRestarts: number | null
    restartDelay: number | null
    watch: boolean
    watchOptions: JsonValue | null
    ignoreWatch: string | null
    maxMemoryRestart: string | null
    killTimeout: number | null
    waitReady: boolean
    listenTimeout: number | null
    createdAt: Date
    updatedAt: Date
    _count: ServicePm2ConfigCountAggregateOutputType | null
    _avg: ServicePm2ConfigAvgAggregateOutputType | null
    _sum: ServicePm2ConfigSumAggregateOutputType | null
    _min: ServicePm2ConfigMinAggregateOutputType | null
    _max: ServicePm2ConfigMaxAggregateOutputType | null
  }

  type GetServicePm2ConfigGroupByPayload<T extends ServicePm2ConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServicePm2ConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServicePm2ConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicePm2ConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ServicePm2ConfigGroupByOutputType[P]>
        }
      >
    >


  export type ServicePm2ConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    script?: boolean
    name?: boolean
    cwd?: boolean
    args?: boolean
    interpreter?: boolean
    interpreterArgs?: boolean
    instances?: boolean
    execMode?: boolean
    env?: boolean
    envProduction?: boolean
    envDevelopment?: boolean
    logFile?: boolean
    outFile?: boolean
    errorFile?: boolean
    logDateFormat?: boolean
    pidFile?: boolean
    minUptimeSeconds?: boolean
    maxRestarts?: boolean
    restartDelay?: boolean
    watch?: boolean
    watchOptions?: boolean
    ignoreWatch?: boolean
    maxMemoryRestart?: boolean
    killTimeout?: boolean
    waitReady?: boolean
    listenTimeout?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicePm2Config"]>

  export type ServicePm2ConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    script?: boolean
    name?: boolean
    cwd?: boolean
    args?: boolean
    interpreter?: boolean
    interpreterArgs?: boolean
    instances?: boolean
    execMode?: boolean
    env?: boolean
    envProduction?: boolean
    envDevelopment?: boolean
    logFile?: boolean
    outFile?: boolean
    errorFile?: boolean
    logDateFormat?: boolean
    pidFile?: boolean
    minUptimeSeconds?: boolean
    maxRestarts?: boolean
    restartDelay?: boolean
    watch?: boolean
    watchOptions?: boolean
    ignoreWatch?: boolean
    maxMemoryRestart?: boolean
    killTimeout?: boolean
    waitReady?: boolean
    listenTimeout?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicePm2Config"]>

  export type ServicePm2ConfigSelectScalar = {
    id?: boolean
    serviceId?: boolean
    script?: boolean
    name?: boolean
    cwd?: boolean
    args?: boolean
    interpreter?: boolean
    interpreterArgs?: boolean
    instances?: boolean
    execMode?: boolean
    env?: boolean
    envProduction?: boolean
    envDevelopment?: boolean
    logFile?: boolean
    outFile?: boolean
    errorFile?: boolean
    logDateFormat?: boolean
    pidFile?: boolean
    minUptimeSeconds?: boolean
    maxRestarts?: boolean
    restartDelay?: boolean
    watch?: boolean
    watchOptions?: boolean
    ignoreWatch?: boolean
    maxMemoryRestart?: boolean
    killTimeout?: boolean
    waitReady?: boolean
    listenTimeout?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServicePm2ConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServicePm2ConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServicePm2ConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServicePm2Config"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      script: string
      name: string
      cwd: string | null
      args: string | null
      interpreter: string | null
      interpreterArgs: string | null
      instances: number
      execMode: string
      env: Prisma.JsonValue | null
      envProduction: Prisma.JsonValue | null
      envDevelopment: Prisma.JsonValue | null
      logFile: string | null
      outFile: string | null
      errorFile: string | null
      logDateFormat: string | null
      pidFile: string | null
      minUptimeSeconds: number | null
      maxRestarts: number | null
      restartDelay: number | null
      watch: boolean
      watchOptions: Prisma.JsonValue | null
      ignoreWatch: string | null
      maxMemoryRestart: string | null
      killTimeout: number | null
      waitReady: boolean
      listenTimeout: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["servicePm2Config"]>
    composites: {}
  }

  type ServicePm2ConfigGetPayload<S extends boolean | null | undefined | ServicePm2ConfigDefaultArgs> = $Result.GetResult<Prisma.$ServicePm2ConfigPayload, S>

  type ServicePm2ConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServicePm2ConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServicePm2ConfigCountAggregateInputType | true
    }

  export interface ServicePm2ConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServicePm2Config'], meta: { name: 'ServicePm2Config' } }
    /**
     * Find zero or one ServicePm2Config that matches the filter.
     * @param {ServicePm2ConfigFindUniqueArgs} args - Arguments to find a ServicePm2Config
     * @example
     * // Get one ServicePm2Config
     * const servicePm2Config = await prisma.servicePm2Config.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServicePm2ConfigFindUniqueArgs>(args: SelectSubset<T, ServicePm2ConfigFindUniqueArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ServicePm2Config that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ServicePm2ConfigFindUniqueOrThrowArgs} args - Arguments to find a ServicePm2Config
     * @example
     * // Get one ServicePm2Config
     * const servicePm2Config = await prisma.servicePm2Config.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServicePm2ConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ServicePm2ConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ServicePm2Config that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigFindFirstArgs} args - Arguments to find a ServicePm2Config
     * @example
     * // Get one ServicePm2Config
     * const servicePm2Config = await prisma.servicePm2Config.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServicePm2ConfigFindFirstArgs>(args?: SelectSubset<T, ServicePm2ConfigFindFirstArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ServicePm2Config that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigFindFirstOrThrowArgs} args - Arguments to find a ServicePm2Config
     * @example
     * // Get one ServicePm2Config
     * const servicePm2Config = await prisma.servicePm2Config.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServicePm2ConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ServicePm2ConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ServicePm2Configs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServicePm2Configs
     * const servicePm2Configs = await prisma.servicePm2Config.findMany()
     * 
     * // Get first 10 ServicePm2Configs
     * const servicePm2Configs = await prisma.servicePm2Config.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const servicePm2ConfigWithIdOnly = await prisma.servicePm2Config.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServicePm2ConfigFindManyArgs>(args?: SelectSubset<T, ServicePm2ConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ServicePm2Config.
     * @param {ServicePm2ConfigCreateArgs} args - Arguments to create a ServicePm2Config.
     * @example
     * // Create one ServicePm2Config
     * const ServicePm2Config = await prisma.servicePm2Config.create({
     *   data: {
     *     // ... data to create a ServicePm2Config
     *   }
     * })
     * 
     */
    create<T extends ServicePm2ConfigCreateArgs>(args: SelectSubset<T, ServicePm2ConfigCreateArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ServicePm2Configs.
     * @param {ServicePm2ConfigCreateManyArgs} args - Arguments to create many ServicePm2Configs.
     * @example
     * // Create many ServicePm2Configs
     * const servicePm2Config = await prisma.servicePm2Config.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServicePm2ConfigCreateManyArgs>(args?: SelectSubset<T, ServicePm2ConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServicePm2Configs and returns the data saved in the database.
     * @param {ServicePm2ConfigCreateManyAndReturnArgs} args - Arguments to create many ServicePm2Configs.
     * @example
     * // Create many ServicePm2Configs
     * const servicePm2Config = await prisma.servicePm2Config.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServicePm2Configs and only return the `id`
     * const servicePm2ConfigWithIdOnly = await prisma.servicePm2Config.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServicePm2ConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ServicePm2ConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ServicePm2Config.
     * @param {ServicePm2ConfigDeleteArgs} args - Arguments to delete one ServicePm2Config.
     * @example
     * // Delete one ServicePm2Config
     * const ServicePm2Config = await prisma.servicePm2Config.delete({
     *   where: {
     *     // ... filter to delete one ServicePm2Config
     *   }
     * })
     * 
     */
    delete<T extends ServicePm2ConfigDeleteArgs>(args: SelectSubset<T, ServicePm2ConfigDeleteArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ServicePm2Config.
     * @param {ServicePm2ConfigUpdateArgs} args - Arguments to update one ServicePm2Config.
     * @example
     * // Update one ServicePm2Config
     * const servicePm2Config = await prisma.servicePm2Config.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServicePm2ConfigUpdateArgs>(args: SelectSubset<T, ServicePm2ConfigUpdateArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ServicePm2Configs.
     * @param {ServicePm2ConfigDeleteManyArgs} args - Arguments to filter ServicePm2Configs to delete.
     * @example
     * // Delete a few ServicePm2Configs
     * const { count } = await prisma.servicePm2Config.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServicePm2ConfigDeleteManyArgs>(args?: SelectSubset<T, ServicePm2ConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServicePm2Configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServicePm2Configs
     * const servicePm2Config = await prisma.servicePm2Config.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServicePm2ConfigUpdateManyArgs>(args: SelectSubset<T, ServicePm2ConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ServicePm2Config.
     * @param {ServicePm2ConfigUpsertArgs} args - Arguments to update or create a ServicePm2Config.
     * @example
     * // Update or create a ServicePm2Config
     * const servicePm2Config = await prisma.servicePm2Config.upsert({
     *   create: {
     *     // ... data to create a ServicePm2Config
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServicePm2Config we want to update
     *   }
     * })
     */
    upsert<T extends ServicePm2ConfigUpsertArgs>(args: SelectSubset<T, ServicePm2ConfigUpsertArgs<ExtArgs>>): Prisma__ServicePm2ConfigClient<$Result.GetResult<Prisma.$ServicePm2ConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ServicePm2Configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigCountArgs} args - Arguments to filter ServicePm2Configs to count.
     * @example
     * // Count the number of ServicePm2Configs
     * const count = await prisma.servicePm2Config.count({
     *   where: {
     *     // ... the filter for the ServicePm2Configs we want to count
     *   }
     * })
    **/
    count<T extends ServicePm2ConfigCountArgs>(
      args?: Subset<T, ServicePm2ConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicePm2ConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServicePm2Config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServicePm2ConfigAggregateArgs>(args: Subset<T, ServicePm2ConfigAggregateArgs>): Prisma.PrismaPromise<GetServicePm2ConfigAggregateType<T>>

    /**
     * Group by ServicePm2Config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePm2ConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServicePm2ConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServicePm2ConfigGroupByArgs['orderBy'] }
        : { orderBy?: ServicePm2ConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServicePm2ConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServicePm2ConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServicePm2Config model
   */
  readonly fields: ServicePm2ConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServicePm2Config.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServicePm2ConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServicePm2Config model
   */ 
  interface ServicePm2ConfigFieldRefs {
    readonly id: FieldRef<"ServicePm2Config", 'String'>
    readonly serviceId: FieldRef<"ServicePm2Config", 'String'>
    readonly script: FieldRef<"ServicePm2Config", 'String'>
    readonly name: FieldRef<"ServicePm2Config", 'String'>
    readonly cwd: FieldRef<"ServicePm2Config", 'String'>
    readonly args: FieldRef<"ServicePm2Config", 'String'>
    readonly interpreter: FieldRef<"ServicePm2Config", 'String'>
    readonly interpreterArgs: FieldRef<"ServicePm2Config", 'String'>
    readonly instances: FieldRef<"ServicePm2Config", 'Int'>
    readonly execMode: FieldRef<"ServicePm2Config", 'String'>
    readonly env: FieldRef<"ServicePm2Config", 'Json'>
    readonly envProduction: FieldRef<"ServicePm2Config", 'Json'>
    readonly envDevelopment: FieldRef<"ServicePm2Config", 'Json'>
    readonly logFile: FieldRef<"ServicePm2Config", 'String'>
    readonly outFile: FieldRef<"ServicePm2Config", 'String'>
    readonly errorFile: FieldRef<"ServicePm2Config", 'String'>
    readonly logDateFormat: FieldRef<"ServicePm2Config", 'String'>
    readonly pidFile: FieldRef<"ServicePm2Config", 'String'>
    readonly minUptimeSeconds: FieldRef<"ServicePm2Config", 'Int'>
    readonly maxRestarts: FieldRef<"ServicePm2Config", 'Int'>
    readonly restartDelay: FieldRef<"ServicePm2Config", 'Int'>
    readonly watch: FieldRef<"ServicePm2Config", 'Boolean'>
    readonly watchOptions: FieldRef<"ServicePm2Config", 'Json'>
    readonly ignoreWatch: FieldRef<"ServicePm2Config", 'String'>
    readonly maxMemoryRestart: FieldRef<"ServicePm2Config", 'String'>
    readonly killTimeout: FieldRef<"ServicePm2Config", 'Int'>
    readonly waitReady: FieldRef<"ServicePm2Config", 'Boolean'>
    readonly listenTimeout: FieldRef<"ServicePm2Config", 'Int'>
    readonly createdAt: FieldRef<"ServicePm2Config", 'DateTime'>
    readonly updatedAt: FieldRef<"ServicePm2Config", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServicePm2Config findUnique
   */
  export type ServicePm2ConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * Filter, which ServicePm2Config to fetch.
     */
    where: ServicePm2ConfigWhereUniqueInput
  }

  /**
   * ServicePm2Config findUniqueOrThrow
   */
  export type ServicePm2ConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * Filter, which ServicePm2Config to fetch.
     */
    where: ServicePm2ConfigWhereUniqueInput
  }

  /**
   * ServicePm2Config findFirst
   */
  export type ServicePm2ConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * Filter, which ServicePm2Config to fetch.
     */
    where?: ServicePm2ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePm2Configs to fetch.
     */
    orderBy?: ServicePm2ConfigOrderByWithRelationInput | ServicePm2ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServicePm2Configs.
     */
    cursor?: ServicePm2ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePm2Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePm2Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServicePm2Configs.
     */
    distinct?: ServicePm2ConfigScalarFieldEnum | ServicePm2ConfigScalarFieldEnum[]
  }

  /**
   * ServicePm2Config findFirstOrThrow
   */
  export type ServicePm2ConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * Filter, which ServicePm2Config to fetch.
     */
    where?: ServicePm2ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePm2Configs to fetch.
     */
    orderBy?: ServicePm2ConfigOrderByWithRelationInput | ServicePm2ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServicePm2Configs.
     */
    cursor?: ServicePm2ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePm2Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePm2Configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServicePm2Configs.
     */
    distinct?: ServicePm2ConfigScalarFieldEnum | ServicePm2ConfigScalarFieldEnum[]
  }

  /**
   * ServicePm2Config findMany
   */
  export type ServicePm2ConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * Filter, which ServicePm2Configs to fetch.
     */
    where?: ServicePm2ConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePm2Configs to fetch.
     */
    orderBy?: ServicePm2ConfigOrderByWithRelationInput | ServicePm2ConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServicePm2Configs.
     */
    cursor?: ServicePm2ConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePm2Configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePm2Configs.
     */
    skip?: number
    distinct?: ServicePm2ConfigScalarFieldEnum | ServicePm2ConfigScalarFieldEnum[]
  }

  /**
   * ServicePm2Config create
   */
  export type ServicePm2ConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a ServicePm2Config.
     */
    data: XOR<ServicePm2ConfigCreateInput, ServicePm2ConfigUncheckedCreateInput>
  }

  /**
   * ServicePm2Config createMany
   */
  export type ServicePm2ConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServicePm2Configs.
     */
    data: ServicePm2ConfigCreateManyInput | ServicePm2ConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServicePm2Config createManyAndReturn
   */
  export type ServicePm2ConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ServicePm2Configs.
     */
    data: ServicePm2ConfigCreateManyInput | ServicePm2ConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServicePm2Config update
   */
  export type ServicePm2ConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a ServicePm2Config.
     */
    data: XOR<ServicePm2ConfigUpdateInput, ServicePm2ConfigUncheckedUpdateInput>
    /**
     * Choose, which ServicePm2Config to update.
     */
    where: ServicePm2ConfigWhereUniqueInput
  }

  /**
   * ServicePm2Config updateMany
   */
  export type ServicePm2ConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServicePm2Configs.
     */
    data: XOR<ServicePm2ConfigUpdateManyMutationInput, ServicePm2ConfigUncheckedUpdateManyInput>
    /**
     * Filter which ServicePm2Configs to update
     */
    where?: ServicePm2ConfigWhereInput
  }

  /**
   * ServicePm2Config upsert
   */
  export type ServicePm2ConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the ServicePm2Config to update in case it exists.
     */
    where: ServicePm2ConfigWhereUniqueInput
    /**
     * In case the ServicePm2Config found by the `where` argument doesn't exist, create a new ServicePm2Config with this data.
     */
    create: XOR<ServicePm2ConfigCreateInput, ServicePm2ConfigUncheckedCreateInput>
    /**
     * In case the ServicePm2Config was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServicePm2ConfigUpdateInput, ServicePm2ConfigUncheckedUpdateInput>
  }

  /**
   * ServicePm2Config delete
   */
  export type ServicePm2ConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
    /**
     * Filter which ServicePm2Config to delete.
     */
    where: ServicePm2ConfigWhereUniqueInput
  }

  /**
   * ServicePm2Config deleteMany
   */
  export type ServicePm2ConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServicePm2Configs to delete
     */
    where?: ServicePm2ConfigWhereInput
  }

  /**
   * ServicePm2Config without action
   */
  export type ServicePm2ConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePm2Config
     */
    select?: ServicePm2ConfigSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePm2ConfigInclude<ExtArgs> | null
  }


  /**
   * Model PackageAction
   */

  export type AggregatePackageAction = {
    _count: PackageActionCountAggregateOutputType | null
    _min: PackageActionMinAggregateOutputType | null
    _max: PackageActionMaxAggregateOutputType | null
  }

  export type PackageActionMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type PackageActionMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type PackageActionCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type PackageActionMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type PackageActionMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type PackageActionCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type PackageActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageAction to aggregate.
     */
    where?: PackageActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageActions to fetch.
     */
    orderBy?: PackageActionOrderByWithRelationInput | PackageActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PackageActions
    **/
    _count?: true | PackageActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageActionMaxAggregateInputType
  }

  export type GetPackageActionAggregateType<T extends PackageActionAggregateArgs> = {
        [P in keyof T & keyof AggregatePackageAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackageAction[P]>
      : GetScalarType<T[P], AggregatePackageAction[P]>
  }




  export type PackageActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageActionWhereInput
    orderBy?: PackageActionOrderByWithAggregationInput | PackageActionOrderByWithAggregationInput[]
    by: PackageActionScalarFieldEnum[] | PackageActionScalarFieldEnum
    having?: PackageActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageActionCountAggregateInputType | true
    _min?: PackageActionMinAggregateInputType
    _max?: PackageActionMaxAggregateInputType
  }

  export type PackageActionGroupByOutputType = {
    id: string
    name: string
    _count: PackageActionCountAggregateOutputType | null
    _min: PackageActionMinAggregateOutputType | null
    _max: PackageActionMaxAggregateOutputType | null
  }

  type GetPackageActionGroupByPayload<T extends PackageActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageActionGroupByOutputType[P]>
            : GetScalarType<T[P], PackageActionGroupByOutputType[P]>
        }
      >
    >


  export type PackageActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["packageAction"]>

  export type PackageActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["packageAction"]>

  export type PackageActionSelectScalar = {
    id?: boolean
    name?: boolean
  }


  export type $PackageActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PackageAction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["packageAction"]>
    composites: {}
  }

  type PackageActionGetPayload<S extends boolean | null | undefined | PackageActionDefaultArgs> = $Result.GetResult<Prisma.$PackageActionPayload, S>

  type PackageActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PackageActionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PackageActionCountAggregateInputType | true
    }

  export interface PackageActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PackageAction'], meta: { name: 'PackageAction' } }
    /**
     * Find zero or one PackageAction that matches the filter.
     * @param {PackageActionFindUniqueArgs} args - Arguments to find a PackageAction
     * @example
     * // Get one PackageAction
     * const packageAction = await prisma.packageAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageActionFindUniqueArgs>(args: SelectSubset<T, PackageActionFindUniqueArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PackageAction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PackageActionFindUniqueOrThrowArgs} args - Arguments to find a PackageAction
     * @example
     * // Get one PackageAction
     * const packageAction = await prisma.packageAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageActionFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PackageAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionFindFirstArgs} args - Arguments to find a PackageAction
     * @example
     * // Get one PackageAction
     * const packageAction = await prisma.packageAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageActionFindFirstArgs>(args?: SelectSubset<T, PackageActionFindFirstArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PackageAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionFindFirstOrThrowArgs} args - Arguments to find a PackageAction
     * @example
     * // Get one PackageAction
     * const packageAction = await prisma.packageAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageActionFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PackageActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PackageActions
     * const packageActions = await prisma.packageAction.findMany()
     * 
     * // Get first 10 PackageActions
     * const packageActions = await prisma.packageAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageActionWithIdOnly = await prisma.packageAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageActionFindManyArgs>(args?: SelectSubset<T, PackageActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PackageAction.
     * @param {PackageActionCreateArgs} args - Arguments to create a PackageAction.
     * @example
     * // Create one PackageAction
     * const PackageAction = await prisma.packageAction.create({
     *   data: {
     *     // ... data to create a PackageAction
     *   }
     * })
     * 
     */
    create<T extends PackageActionCreateArgs>(args: SelectSubset<T, PackageActionCreateArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PackageActions.
     * @param {PackageActionCreateManyArgs} args - Arguments to create many PackageActions.
     * @example
     * // Create many PackageActions
     * const packageAction = await prisma.packageAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageActionCreateManyArgs>(args?: SelectSubset<T, PackageActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PackageActions and returns the data saved in the database.
     * @param {PackageActionCreateManyAndReturnArgs} args - Arguments to create many PackageActions.
     * @example
     * // Create many PackageActions
     * const packageAction = await prisma.packageAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PackageActions and only return the `id`
     * const packageActionWithIdOnly = await prisma.packageAction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageActionCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PackageAction.
     * @param {PackageActionDeleteArgs} args - Arguments to delete one PackageAction.
     * @example
     * // Delete one PackageAction
     * const PackageAction = await prisma.packageAction.delete({
     *   where: {
     *     // ... filter to delete one PackageAction
     *   }
     * })
     * 
     */
    delete<T extends PackageActionDeleteArgs>(args: SelectSubset<T, PackageActionDeleteArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PackageAction.
     * @param {PackageActionUpdateArgs} args - Arguments to update one PackageAction.
     * @example
     * // Update one PackageAction
     * const packageAction = await prisma.packageAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageActionUpdateArgs>(args: SelectSubset<T, PackageActionUpdateArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PackageActions.
     * @param {PackageActionDeleteManyArgs} args - Arguments to filter PackageActions to delete.
     * @example
     * // Delete a few PackageActions
     * const { count } = await prisma.packageAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageActionDeleteManyArgs>(args?: SelectSubset<T, PackageActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PackageActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PackageActions
     * const packageAction = await prisma.packageAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageActionUpdateManyArgs>(args: SelectSubset<T, PackageActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PackageAction.
     * @param {PackageActionUpsertArgs} args - Arguments to update or create a PackageAction.
     * @example
     * // Update or create a PackageAction
     * const packageAction = await prisma.packageAction.upsert({
     *   create: {
     *     // ... data to create a PackageAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PackageAction we want to update
     *   }
     * })
     */
    upsert<T extends PackageActionUpsertArgs>(args: SelectSubset<T, PackageActionUpsertArgs<ExtArgs>>): Prisma__PackageActionClient<$Result.GetResult<Prisma.$PackageActionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PackageActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionCountArgs} args - Arguments to filter PackageActions to count.
     * @example
     * // Count the number of PackageActions
     * const count = await prisma.packageAction.count({
     *   where: {
     *     // ... the filter for the PackageActions we want to count
     *   }
     * })
    **/
    count<T extends PackageActionCountArgs>(
      args?: Subset<T, PackageActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PackageAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageActionAggregateArgs>(args: Subset<T, PackageActionAggregateArgs>): Prisma.PrismaPromise<GetPackageActionAggregateType<T>>

    /**
     * Group by PackageAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageActionGroupByArgs['orderBy'] }
        : { orderBy?: PackageActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PackageAction model
   */
  readonly fields: PackageActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PackageAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PackageAction model
   */ 
  interface PackageActionFieldRefs {
    readonly id: FieldRef<"PackageAction", 'String'>
    readonly name: FieldRef<"PackageAction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PackageAction findUnique
   */
  export type PackageActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * Filter, which PackageAction to fetch.
     */
    where: PackageActionWhereUniqueInput
  }

  /**
   * PackageAction findUniqueOrThrow
   */
  export type PackageActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * Filter, which PackageAction to fetch.
     */
    where: PackageActionWhereUniqueInput
  }

  /**
   * PackageAction findFirst
   */
  export type PackageActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * Filter, which PackageAction to fetch.
     */
    where?: PackageActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageActions to fetch.
     */
    orderBy?: PackageActionOrderByWithRelationInput | PackageActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageActions.
     */
    cursor?: PackageActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageActions.
     */
    distinct?: PackageActionScalarFieldEnum | PackageActionScalarFieldEnum[]
  }

  /**
   * PackageAction findFirstOrThrow
   */
  export type PackageActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * Filter, which PackageAction to fetch.
     */
    where?: PackageActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageActions to fetch.
     */
    orderBy?: PackageActionOrderByWithRelationInput | PackageActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PackageActions.
     */
    cursor?: PackageActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PackageActions.
     */
    distinct?: PackageActionScalarFieldEnum | PackageActionScalarFieldEnum[]
  }

  /**
   * PackageAction findMany
   */
  export type PackageActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * Filter, which PackageActions to fetch.
     */
    where?: PackageActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PackageActions to fetch.
     */
    orderBy?: PackageActionOrderByWithRelationInput | PackageActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PackageActions.
     */
    cursor?: PackageActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PackageActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PackageActions.
     */
    skip?: number
    distinct?: PackageActionScalarFieldEnum | PackageActionScalarFieldEnum[]
  }

  /**
   * PackageAction create
   */
  export type PackageActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * The data needed to create a PackageAction.
     */
    data: XOR<PackageActionCreateInput, PackageActionUncheckedCreateInput>
  }

  /**
   * PackageAction createMany
   */
  export type PackageActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PackageActions.
     */
    data: PackageActionCreateManyInput | PackageActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PackageAction createManyAndReturn
   */
  export type PackageActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PackageActions.
     */
    data: PackageActionCreateManyInput | PackageActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PackageAction update
   */
  export type PackageActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * The data needed to update a PackageAction.
     */
    data: XOR<PackageActionUpdateInput, PackageActionUncheckedUpdateInput>
    /**
     * Choose, which PackageAction to update.
     */
    where: PackageActionWhereUniqueInput
  }

  /**
   * PackageAction updateMany
   */
  export type PackageActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PackageActions.
     */
    data: XOR<PackageActionUpdateManyMutationInput, PackageActionUncheckedUpdateManyInput>
    /**
     * Filter which PackageActions to update
     */
    where?: PackageActionWhereInput
  }

  /**
   * PackageAction upsert
   */
  export type PackageActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * The filter to search for the PackageAction to update in case it exists.
     */
    where: PackageActionWhereUniqueInput
    /**
     * In case the PackageAction found by the `where` argument doesn't exist, create a new PackageAction with this data.
     */
    create: XOR<PackageActionCreateInput, PackageActionUncheckedCreateInput>
    /**
     * In case the PackageAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageActionUpdateInput, PackageActionUncheckedUpdateInput>
  }

  /**
   * PackageAction delete
   */
  export type PackageActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
    /**
     * Filter which PackageAction to delete.
     */
    where: PackageActionWhereUniqueInput
  }

  /**
   * PackageAction deleteMany
   */
  export type PackageActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PackageActions to delete
     */
    where?: PackageActionWhereInput
  }

  /**
   * PackageAction without action
   */
  export type PackageActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PackageAction
     */
    select?: PackageActionSelect<ExtArgs> | null
  }


  /**
   * Model LogEntry
   */

  export type AggregateLogEntry = {
    _count: LogEntryCountAggregateOutputType | null
    _min: LogEntryMinAggregateOutputType | null
    _max: LogEntryMaxAggregateOutputType | null
  }

  export type LogEntryMinAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
  }

  export type LogEntryMaxAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
  }

  export type LogEntryCountAggregateOutputType = {
    id: number
    message: number
    createdAt: number
    _all: number
  }


  export type LogEntryMinAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
  }

  export type LogEntryMaxAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
  }

  export type LogEntryCountAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type LogEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogEntry to aggregate.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogEntries
    **/
    _count?: true | LogEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogEntryMaxAggregateInputType
  }

  export type GetLogEntryAggregateType<T extends LogEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLogEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogEntry[P]>
      : GetScalarType<T[P], AggregateLogEntry[P]>
  }




  export type LogEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogEntryWhereInput
    orderBy?: LogEntryOrderByWithAggregationInput | LogEntryOrderByWithAggregationInput[]
    by: LogEntryScalarFieldEnum[] | LogEntryScalarFieldEnum
    having?: LogEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogEntryCountAggregateInputType | true
    _min?: LogEntryMinAggregateInputType
    _max?: LogEntryMaxAggregateInputType
  }

  export type LogEntryGroupByOutputType = {
    id: string
    message: string
    createdAt: Date
    _count: LogEntryCountAggregateOutputType | null
    _min: LogEntryMinAggregateOutputType | null
    _max: LogEntryMaxAggregateOutputType | null
  }

  type GetLogEntryGroupByPayload<T extends LogEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LogEntryGroupByOutputType[P]>
        }
      >
    >


  export type LogEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["logEntry"]>

  export type LogEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["logEntry"]>

  export type LogEntrySelectScalar = {
    id?: boolean
    message?: boolean
    createdAt?: boolean
  }


  export type $LogEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LogEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      createdAt: Date
    }, ExtArgs["result"]["logEntry"]>
    composites: {}
  }

  type LogEntryGetPayload<S extends boolean | null | undefined | LogEntryDefaultArgs> = $Result.GetResult<Prisma.$LogEntryPayload, S>

  type LogEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LogEntryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LogEntryCountAggregateInputType | true
    }

  export interface LogEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LogEntry'], meta: { name: 'LogEntry' } }
    /**
     * Find zero or one LogEntry that matches the filter.
     * @param {LogEntryFindUniqueArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogEntryFindUniqueArgs>(args: SelectSubset<T, LogEntryFindUniqueArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LogEntry that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LogEntryFindUniqueOrThrowArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LogEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LogEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryFindFirstArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogEntryFindFirstArgs>(args?: SelectSubset<T, LogEntryFindFirstArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LogEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryFindFirstOrThrowArgs} args - Arguments to find a LogEntry
     * @example
     * // Get one LogEntry
     * const logEntry = await prisma.logEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LogEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LogEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogEntries
     * const logEntries = await prisma.logEntry.findMany()
     * 
     * // Get first 10 LogEntries
     * const logEntries = await prisma.logEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logEntryWithIdOnly = await prisma.logEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogEntryFindManyArgs>(args?: SelectSubset<T, LogEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LogEntry.
     * @param {LogEntryCreateArgs} args - Arguments to create a LogEntry.
     * @example
     * // Create one LogEntry
     * const LogEntry = await prisma.logEntry.create({
     *   data: {
     *     // ... data to create a LogEntry
     *   }
     * })
     * 
     */
    create<T extends LogEntryCreateArgs>(args: SelectSubset<T, LogEntryCreateArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LogEntries.
     * @param {LogEntryCreateManyArgs} args - Arguments to create many LogEntries.
     * @example
     * // Create many LogEntries
     * const logEntry = await prisma.logEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogEntryCreateManyArgs>(args?: SelectSubset<T, LogEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LogEntries and returns the data saved in the database.
     * @param {LogEntryCreateManyAndReturnArgs} args - Arguments to create many LogEntries.
     * @example
     * // Create many LogEntries
     * const logEntry = await prisma.logEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LogEntries and only return the `id`
     * const logEntryWithIdOnly = await prisma.logEntry.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LogEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LogEntry.
     * @param {LogEntryDeleteArgs} args - Arguments to delete one LogEntry.
     * @example
     * // Delete one LogEntry
     * const LogEntry = await prisma.logEntry.delete({
     *   where: {
     *     // ... filter to delete one LogEntry
     *   }
     * })
     * 
     */
    delete<T extends LogEntryDeleteArgs>(args: SelectSubset<T, LogEntryDeleteArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LogEntry.
     * @param {LogEntryUpdateArgs} args - Arguments to update one LogEntry.
     * @example
     * // Update one LogEntry
     * const logEntry = await prisma.logEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogEntryUpdateArgs>(args: SelectSubset<T, LogEntryUpdateArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LogEntries.
     * @param {LogEntryDeleteManyArgs} args - Arguments to filter LogEntries to delete.
     * @example
     * // Delete a few LogEntries
     * const { count } = await prisma.logEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogEntryDeleteManyArgs>(args?: SelectSubset<T, LogEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogEntries
     * const logEntry = await prisma.logEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogEntryUpdateManyArgs>(args: SelectSubset<T, LogEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LogEntry.
     * @param {LogEntryUpsertArgs} args - Arguments to update or create a LogEntry.
     * @example
     * // Update or create a LogEntry
     * const logEntry = await prisma.logEntry.upsert({
     *   create: {
     *     // ... data to create a LogEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogEntry we want to update
     *   }
     * })
     */
    upsert<T extends LogEntryUpsertArgs>(args: SelectSubset<T, LogEntryUpsertArgs<ExtArgs>>): Prisma__LogEntryClient<$Result.GetResult<Prisma.$LogEntryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LogEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryCountArgs} args - Arguments to filter LogEntries to count.
     * @example
     * // Count the number of LogEntries
     * const count = await prisma.logEntry.count({
     *   where: {
     *     // ... the filter for the LogEntries we want to count
     *   }
     * })
    **/
    count<T extends LogEntryCountArgs>(
      args?: Subset<T, LogEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogEntryAggregateArgs>(args: Subset<T, LogEntryAggregateArgs>): Prisma.PrismaPromise<GetLogEntryAggregateType<T>>

    /**
     * Group by LogEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogEntryGroupByArgs['orderBy'] }
        : { orderBy?: LogEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LogEntry model
   */
  readonly fields: LogEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LogEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LogEntry model
   */ 
  interface LogEntryFieldRefs {
    readonly id: FieldRef<"LogEntry", 'String'>
    readonly message: FieldRef<"LogEntry", 'String'>
    readonly createdAt: FieldRef<"LogEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LogEntry findUnique
   */
  export type LogEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry findUniqueOrThrow
   */
  export type LogEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry findFirst
   */
  export type LogEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogEntries.
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogEntries.
     */
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * LogEntry findFirstOrThrow
   */
  export type LogEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Filter, which LogEntry to fetch.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogEntries.
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogEntries.
     */
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * LogEntry findMany
   */
  export type LogEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Filter, which LogEntries to fetch.
     */
    where?: LogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogEntries to fetch.
     */
    orderBy?: LogEntryOrderByWithRelationInput | LogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogEntries.
     */
    cursor?: LogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogEntries.
     */
    skip?: number
    distinct?: LogEntryScalarFieldEnum | LogEntryScalarFieldEnum[]
  }

  /**
   * LogEntry create
   */
  export type LogEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * The data needed to create a LogEntry.
     */
    data: XOR<LogEntryCreateInput, LogEntryUncheckedCreateInput>
  }

  /**
   * LogEntry createMany
   */
  export type LogEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogEntries.
     */
    data: LogEntryCreateManyInput | LogEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogEntry createManyAndReturn
   */
  export type LogEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LogEntries.
     */
    data: LogEntryCreateManyInput | LogEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LogEntry update
   */
  export type LogEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * The data needed to update a LogEntry.
     */
    data: XOR<LogEntryUpdateInput, LogEntryUncheckedUpdateInput>
    /**
     * Choose, which LogEntry to update.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry updateMany
   */
  export type LogEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LogEntries.
     */
    data: XOR<LogEntryUpdateManyMutationInput, LogEntryUncheckedUpdateManyInput>
    /**
     * Filter which LogEntries to update
     */
    where?: LogEntryWhereInput
  }

  /**
   * LogEntry upsert
   */
  export type LogEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * The filter to search for the LogEntry to update in case it exists.
     */
    where: LogEntryWhereUniqueInput
    /**
     * In case the LogEntry found by the `where` argument doesn't exist, create a new LogEntry with this data.
     */
    create: XOR<LogEntryCreateInput, LogEntryUncheckedCreateInput>
    /**
     * In case the LogEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogEntryUpdateInput, LogEntryUncheckedUpdateInput>
  }

  /**
   * LogEntry delete
   */
  export type LogEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
    /**
     * Filter which LogEntry to delete.
     */
    where: LogEntryWhereUniqueInput
  }

  /**
   * LogEntry deleteMany
   */
  export type LogEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LogEntries to delete
     */
    where?: LogEntryWhereInput
  }

  /**
   * LogEntry without action
   */
  export type LogEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogEntry
     */
    select?: LogEntrySelect<ExtArgs> | null
  }


  /**
   * Model MetricSample
   */

  export type AggregateMetricSample = {
    _count: MetricSampleCountAggregateOutputType | null
    _avg: MetricSampleAvgAggregateOutputType | null
    _sum: MetricSampleSumAggregateOutputType | null
    _min: MetricSampleMinAggregateOutputType | null
    _max: MetricSampleMaxAggregateOutputType | null
  }

  export type MetricSampleAvgAggregateOutputType = {
    value: number | null
  }

  export type MetricSampleSumAggregateOutputType = {
    value: number | null
  }

  export type MetricSampleMinAggregateOutputType = {
    id: string | null
    value: number | null
    takenAt: Date | null
  }

  export type MetricSampleMaxAggregateOutputType = {
    id: string | null
    value: number | null
    takenAt: Date | null
  }

  export type MetricSampleCountAggregateOutputType = {
    id: number
    value: number
    takenAt: number
    _all: number
  }


  export type MetricSampleAvgAggregateInputType = {
    value?: true
  }

  export type MetricSampleSumAggregateInputType = {
    value?: true
  }

  export type MetricSampleMinAggregateInputType = {
    id?: true
    value?: true
    takenAt?: true
  }

  export type MetricSampleMaxAggregateInputType = {
    id?: true
    value?: true
    takenAt?: true
  }

  export type MetricSampleCountAggregateInputType = {
    id?: true
    value?: true
    takenAt?: true
    _all?: true
  }

  export type MetricSampleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricSample to aggregate.
     */
    where?: MetricSampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSamples to fetch.
     */
    orderBy?: MetricSampleOrderByWithRelationInput | MetricSampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetricSampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSamples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSamples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetricSamples
    **/
    _count?: true | MetricSampleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetricSampleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetricSampleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetricSampleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetricSampleMaxAggregateInputType
  }

  export type GetMetricSampleAggregateType<T extends MetricSampleAggregateArgs> = {
        [P in keyof T & keyof AggregateMetricSample]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetricSample[P]>
      : GetScalarType<T[P], AggregateMetricSample[P]>
  }




  export type MetricSampleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetricSampleWhereInput
    orderBy?: MetricSampleOrderByWithAggregationInput | MetricSampleOrderByWithAggregationInput[]
    by: MetricSampleScalarFieldEnum[] | MetricSampleScalarFieldEnum
    having?: MetricSampleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetricSampleCountAggregateInputType | true
    _avg?: MetricSampleAvgAggregateInputType
    _sum?: MetricSampleSumAggregateInputType
    _min?: MetricSampleMinAggregateInputType
    _max?: MetricSampleMaxAggregateInputType
  }

  export type MetricSampleGroupByOutputType = {
    id: string
    value: number
    takenAt: Date
    _count: MetricSampleCountAggregateOutputType | null
    _avg: MetricSampleAvgAggregateOutputType | null
    _sum: MetricSampleSumAggregateOutputType | null
    _min: MetricSampleMinAggregateOutputType | null
    _max: MetricSampleMaxAggregateOutputType | null
  }

  type GetMetricSampleGroupByPayload<T extends MetricSampleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetricSampleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetricSampleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetricSampleGroupByOutputType[P]>
            : GetScalarType<T[P], MetricSampleGroupByOutputType[P]>
        }
      >
    >


  export type MetricSampleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    takenAt?: boolean
  }, ExtArgs["result"]["metricSample"]>

  export type MetricSampleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    takenAt?: boolean
  }, ExtArgs["result"]["metricSample"]>

  export type MetricSampleSelectScalar = {
    id?: boolean
    value?: boolean
    takenAt?: boolean
  }


  export type $MetricSamplePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetricSample"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: number
      takenAt: Date
    }, ExtArgs["result"]["metricSample"]>
    composites: {}
  }

  type MetricSampleGetPayload<S extends boolean | null | undefined | MetricSampleDefaultArgs> = $Result.GetResult<Prisma.$MetricSamplePayload, S>

  type MetricSampleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MetricSampleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MetricSampleCountAggregateInputType | true
    }

  export interface MetricSampleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetricSample'], meta: { name: 'MetricSample' } }
    /**
     * Find zero or one MetricSample that matches the filter.
     * @param {MetricSampleFindUniqueArgs} args - Arguments to find a MetricSample
     * @example
     * // Get one MetricSample
     * const metricSample = await prisma.metricSample.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetricSampleFindUniqueArgs>(args: SelectSubset<T, MetricSampleFindUniqueArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MetricSample that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MetricSampleFindUniqueOrThrowArgs} args - Arguments to find a MetricSample
     * @example
     * // Get one MetricSample
     * const metricSample = await prisma.metricSample.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetricSampleFindUniqueOrThrowArgs>(args: SelectSubset<T, MetricSampleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MetricSample that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleFindFirstArgs} args - Arguments to find a MetricSample
     * @example
     * // Get one MetricSample
     * const metricSample = await prisma.metricSample.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetricSampleFindFirstArgs>(args?: SelectSubset<T, MetricSampleFindFirstArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MetricSample that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleFindFirstOrThrowArgs} args - Arguments to find a MetricSample
     * @example
     * // Get one MetricSample
     * const metricSample = await prisma.metricSample.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetricSampleFindFirstOrThrowArgs>(args?: SelectSubset<T, MetricSampleFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MetricSamples that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetricSamples
     * const metricSamples = await prisma.metricSample.findMany()
     * 
     * // Get first 10 MetricSamples
     * const metricSamples = await prisma.metricSample.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metricSampleWithIdOnly = await prisma.metricSample.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetricSampleFindManyArgs>(args?: SelectSubset<T, MetricSampleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MetricSample.
     * @param {MetricSampleCreateArgs} args - Arguments to create a MetricSample.
     * @example
     * // Create one MetricSample
     * const MetricSample = await prisma.metricSample.create({
     *   data: {
     *     // ... data to create a MetricSample
     *   }
     * })
     * 
     */
    create<T extends MetricSampleCreateArgs>(args: SelectSubset<T, MetricSampleCreateArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MetricSamples.
     * @param {MetricSampleCreateManyArgs} args - Arguments to create many MetricSamples.
     * @example
     * // Create many MetricSamples
     * const metricSample = await prisma.metricSample.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetricSampleCreateManyArgs>(args?: SelectSubset<T, MetricSampleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetricSamples and returns the data saved in the database.
     * @param {MetricSampleCreateManyAndReturnArgs} args - Arguments to create many MetricSamples.
     * @example
     * // Create many MetricSamples
     * const metricSample = await prisma.metricSample.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetricSamples and only return the `id`
     * const metricSampleWithIdOnly = await prisma.metricSample.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetricSampleCreateManyAndReturnArgs>(args?: SelectSubset<T, MetricSampleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MetricSample.
     * @param {MetricSampleDeleteArgs} args - Arguments to delete one MetricSample.
     * @example
     * // Delete one MetricSample
     * const MetricSample = await prisma.metricSample.delete({
     *   where: {
     *     // ... filter to delete one MetricSample
     *   }
     * })
     * 
     */
    delete<T extends MetricSampleDeleteArgs>(args: SelectSubset<T, MetricSampleDeleteArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MetricSample.
     * @param {MetricSampleUpdateArgs} args - Arguments to update one MetricSample.
     * @example
     * // Update one MetricSample
     * const metricSample = await prisma.metricSample.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetricSampleUpdateArgs>(args: SelectSubset<T, MetricSampleUpdateArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MetricSamples.
     * @param {MetricSampleDeleteManyArgs} args - Arguments to filter MetricSamples to delete.
     * @example
     * // Delete a few MetricSamples
     * const { count } = await prisma.metricSample.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetricSampleDeleteManyArgs>(args?: SelectSubset<T, MetricSampleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricSamples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetricSamples
     * const metricSample = await prisma.metricSample.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetricSampleUpdateManyArgs>(args: SelectSubset<T, MetricSampleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MetricSample.
     * @param {MetricSampleUpsertArgs} args - Arguments to update or create a MetricSample.
     * @example
     * // Update or create a MetricSample
     * const metricSample = await prisma.metricSample.upsert({
     *   create: {
     *     // ... data to create a MetricSample
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetricSample we want to update
     *   }
     * })
     */
    upsert<T extends MetricSampleUpsertArgs>(args: SelectSubset<T, MetricSampleUpsertArgs<ExtArgs>>): Prisma__MetricSampleClient<$Result.GetResult<Prisma.$MetricSamplePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MetricSamples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleCountArgs} args - Arguments to filter MetricSamples to count.
     * @example
     * // Count the number of MetricSamples
     * const count = await prisma.metricSample.count({
     *   where: {
     *     // ... the filter for the MetricSamples we want to count
     *   }
     * })
    **/
    count<T extends MetricSampleCountArgs>(
      args?: Subset<T, MetricSampleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetricSampleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetricSample.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetricSampleAggregateArgs>(args: Subset<T, MetricSampleAggregateArgs>): Prisma.PrismaPromise<GetMetricSampleAggregateType<T>>

    /**
     * Group by MetricSample.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSampleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetricSampleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetricSampleGroupByArgs['orderBy'] }
        : { orderBy?: MetricSampleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetricSampleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetricSampleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetricSample model
   */
  readonly fields: MetricSampleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetricSample.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetricSampleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetricSample model
   */ 
  interface MetricSampleFieldRefs {
    readonly id: FieldRef<"MetricSample", 'String'>
    readonly value: FieldRef<"MetricSample", 'Float'>
    readonly takenAt: FieldRef<"MetricSample", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MetricSample findUnique
   */
  export type MetricSampleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * Filter, which MetricSample to fetch.
     */
    where: MetricSampleWhereUniqueInput
  }

  /**
   * MetricSample findUniqueOrThrow
   */
  export type MetricSampleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * Filter, which MetricSample to fetch.
     */
    where: MetricSampleWhereUniqueInput
  }

  /**
   * MetricSample findFirst
   */
  export type MetricSampleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * Filter, which MetricSample to fetch.
     */
    where?: MetricSampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSamples to fetch.
     */
    orderBy?: MetricSampleOrderByWithRelationInput | MetricSampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricSamples.
     */
    cursor?: MetricSampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSamples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSamples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricSamples.
     */
    distinct?: MetricSampleScalarFieldEnum | MetricSampleScalarFieldEnum[]
  }

  /**
   * MetricSample findFirstOrThrow
   */
  export type MetricSampleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * Filter, which MetricSample to fetch.
     */
    where?: MetricSampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSamples to fetch.
     */
    orderBy?: MetricSampleOrderByWithRelationInput | MetricSampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricSamples.
     */
    cursor?: MetricSampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSamples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSamples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricSamples.
     */
    distinct?: MetricSampleScalarFieldEnum | MetricSampleScalarFieldEnum[]
  }

  /**
   * MetricSample findMany
   */
  export type MetricSampleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * Filter, which MetricSamples to fetch.
     */
    where?: MetricSampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSamples to fetch.
     */
    orderBy?: MetricSampleOrderByWithRelationInput | MetricSampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetricSamples.
     */
    cursor?: MetricSampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSamples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSamples.
     */
    skip?: number
    distinct?: MetricSampleScalarFieldEnum | MetricSampleScalarFieldEnum[]
  }

  /**
   * MetricSample create
   */
  export type MetricSampleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * The data needed to create a MetricSample.
     */
    data: XOR<MetricSampleCreateInput, MetricSampleUncheckedCreateInput>
  }

  /**
   * MetricSample createMany
   */
  export type MetricSampleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetricSamples.
     */
    data: MetricSampleCreateManyInput | MetricSampleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricSample createManyAndReturn
   */
  export type MetricSampleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MetricSamples.
     */
    data: MetricSampleCreateManyInput | MetricSampleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricSample update
   */
  export type MetricSampleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * The data needed to update a MetricSample.
     */
    data: XOR<MetricSampleUpdateInput, MetricSampleUncheckedUpdateInput>
    /**
     * Choose, which MetricSample to update.
     */
    where: MetricSampleWhereUniqueInput
  }

  /**
   * MetricSample updateMany
   */
  export type MetricSampleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetricSamples.
     */
    data: XOR<MetricSampleUpdateManyMutationInput, MetricSampleUncheckedUpdateManyInput>
    /**
     * Filter which MetricSamples to update
     */
    where?: MetricSampleWhereInput
  }

  /**
   * MetricSample upsert
   */
  export type MetricSampleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * The filter to search for the MetricSample to update in case it exists.
     */
    where: MetricSampleWhereUniqueInput
    /**
     * In case the MetricSample found by the `where` argument doesn't exist, create a new MetricSample with this data.
     */
    create: XOR<MetricSampleCreateInput, MetricSampleUncheckedCreateInput>
    /**
     * In case the MetricSample was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetricSampleUpdateInput, MetricSampleUncheckedUpdateInput>
  }

  /**
   * MetricSample delete
   */
  export type MetricSampleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
    /**
     * Filter which MetricSample to delete.
     */
    where: MetricSampleWhereUniqueInput
  }

  /**
   * MetricSample deleteMany
   */
  export type MetricSampleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricSamples to delete
     */
    where?: MetricSampleWhereInput
  }

  /**
   * MetricSample without action
   */
  export type MetricSampleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSample
     */
    select?: MetricSampleSelect<ExtArgs> | null
  }


  /**
   * Model Domain
   */

  export type AggregateDomain = {
    _count: DomainCountAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  export type DomainMinAggregateOutputType = {
    id: string | null
    name: string | null
    wildcard: boolean | null
    validationMethod: string | null
    challengePlugin: string | null
    isActive: boolean | null
    lastVerified: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainMaxAggregateOutputType = {
    id: string | null
    name: string | null
    wildcard: boolean | null
    validationMethod: string | null
    challengePlugin: string | null
    isActive: boolean | null
    lastVerified: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainCountAggregateOutputType = {
    id: number
    name: number
    wildcard: number
    validationMethod: number
    challengePlugin: number
    pluginConfig: number
    isActive: number
    lastVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DomainMinAggregateInputType = {
    id?: true
    name?: true
    wildcard?: true
    validationMethod?: true
    challengePlugin?: true
    isActive?: true
    lastVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainMaxAggregateInputType = {
    id?: true
    name?: true
    wildcard?: true
    validationMethod?: true
    challengePlugin?: true
    isActive?: true
    lastVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainCountAggregateInputType = {
    id?: true
    name?: true
    wildcard?: true
    validationMethod?: true
    challengePlugin?: true
    pluginConfig?: true
    isActive?: true
    lastVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domain to aggregate.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Domains
    **/
    _count?: true | DomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainMaxAggregateInputType
  }

  export type GetDomainAggregateType<T extends DomainAggregateArgs> = {
        [P in keyof T & keyof AggregateDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomain[P]>
      : GetScalarType<T[P], AggregateDomain[P]>
  }




  export type DomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithAggregationInput | DomainOrderByWithAggregationInput[]
    by: DomainScalarFieldEnum[] | DomainScalarFieldEnum
    having?: DomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainCountAggregateInputType | true
    _min?: DomainMinAggregateInputType
    _max?: DomainMaxAggregateInputType
  }

  export type DomainGroupByOutputType = {
    id: string
    name: string
    wildcard: boolean
    validationMethod: string
    challengePlugin: string | null
    pluginConfig: JsonValue | null
    isActive: boolean
    lastVerified: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DomainCountAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  type GetDomainGroupByPayload<T extends DomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainGroupByOutputType[P]>
            : GetScalarType<T[P], DomainGroupByOutputType[P]>
        }
      >
    >


  export type DomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    wildcard?: boolean
    validationMethod?: boolean
    challengePlugin?: boolean
    pluginConfig?: boolean
    isActive?: boolean
    lastVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    certificates?: boolean | Domain$certificatesArgs<ExtArgs>
    renewalJobs?: boolean | Domain$renewalJobsArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    wildcard?: boolean
    validationMethod?: boolean
    challengePlugin?: boolean
    pluginConfig?: boolean
    isActive?: boolean
    lastVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectScalar = {
    id?: boolean
    name?: boolean
    wildcard?: boolean
    validationMethod?: boolean
    challengePlugin?: boolean
    pluginConfig?: boolean
    isActive?: boolean
    lastVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certificates?: boolean | Domain$certificatesArgs<ExtArgs>
    renewalJobs?: boolean | Domain$renewalJobsArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Domain"
    objects: {
      certificates: Prisma.$CertificatePayload<ExtArgs>[]
      renewalJobs: Prisma.$CertificateRenewalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      wildcard: boolean
      validationMethod: string
      challengePlugin: string | null
      pluginConfig: Prisma.JsonValue | null
      isActive: boolean
      lastVerified: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["domain"]>
    composites: {}
  }

  type DomainGetPayload<S extends boolean | null | undefined | DomainDefaultArgs> = $Result.GetResult<Prisma.$DomainPayload, S>

  type DomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DomainFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DomainCountAggregateInputType | true
    }

  export interface DomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Domain'], meta: { name: 'Domain' } }
    /**
     * Find zero or one Domain that matches the filter.
     * @param {DomainFindUniqueArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainFindUniqueArgs>(args: SelectSubset<T, DomainFindUniqueArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Domain that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DomainFindUniqueOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Domain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainFindFirstArgs>(args?: SelectSubset<T, DomainFindFirstArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Domain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Domains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Domains
     * const domains = await prisma.domain.findMany()
     * 
     * // Get first 10 Domains
     * const domains = await prisma.domain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainWithIdOnly = await prisma.domain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainFindManyArgs>(args?: SelectSubset<T, DomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Domain.
     * @param {DomainCreateArgs} args - Arguments to create a Domain.
     * @example
     * // Create one Domain
     * const Domain = await prisma.domain.create({
     *   data: {
     *     // ... data to create a Domain
     *   }
     * })
     * 
     */
    create<T extends DomainCreateArgs>(args: SelectSubset<T, DomainCreateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Domains.
     * @param {DomainCreateManyArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainCreateManyArgs>(args?: SelectSubset<T, DomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Domains and returns the data saved in the database.
     * @param {DomainCreateManyAndReturnArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Domains and only return the `id`
     * const domainWithIdOnly = await prisma.domain.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Domain.
     * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
     * @example
     * // Delete one Domain
     * const Domain = await prisma.domain.delete({
     *   where: {
     *     // ... filter to delete one Domain
     *   }
     * })
     * 
     */
    delete<T extends DomainDeleteArgs>(args: SelectSubset<T, DomainDeleteArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Domain.
     * @param {DomainUpdateArgs} args - Arguments to update one Domain.
     * @example
     * // Update one Domain
     * const domain = await prisma.domain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainUpdateArgs>(args: SelectSubset<T, DomainUpdateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Domains.
     * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
     * @example
     * // Delete a few Domains
     * const { count } = await prisma.domain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainDeleteManyArgs>(args?: SelectSubset<T, DomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainUpdateManyArgs>(args: SelectSubset<T, DomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Domain.
     * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
     * @example
     * // Update or create a Domain
     * const domain = await prisma.domain.upsert({
     *   create: {
     *     // ... data to create a Domain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Domain we want to update
     *   }
     * })
     */
    upsert<T extends DomainUpsertArgs>(args: SelectSubset<T, DomainUpsertArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainCountArgs} args - Arguments to filter Domains to count.
     * @example
     * // Count the number of Domains
     * const count = await prisma.domain.count({
     *   where: {
     *     // ... the filter for the Domains we want to count
     *   }
     * })
    **/
    count<T extends DomainCountArgs>(
      args?: Subset<T, DomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainAggregateArgs>(args: Subset<T, DomainAggregateArgs>): Prisma.PrismaPromise<GetDomainAggregateType<T>>

    /**
     * Group by Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainGroupByArgs['orderBy'] }
        : { orderBy?: DomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Domain model
   */
  readonly fields: DomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Domain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    certificates<T extends Domain$certificatesArgs<ExtArgs> = {}>(args?: Subset<T, Domain$certificatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findMany"> | Null>
    renewalJobs<T extends Domain$renewalJobsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$renewalJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Domain model
   */ 
  interface DomainFieldRefs {
    readonly id: FieldRef<"Domain", 'String'>
    readonly name: FieldRef<"Domain", 'String'>
    readonly wildcard: FieldRef<"Domain", 'Boolean'>
    readonly validationMethod: FieldRef<"Domain", 'String'>
    readonly challengePlugin: FieldRef<"Domain", 'String'>
    readonly pluginConfig: FieldRef<"Domain", 'Json'>
    readonly isActive: FieldRef<"Domain", 'Boolean'>
    readonly lastVerified: FieldRef<"Domain", 'DateTime'>
    readonly createdAt: FieldRef<"Domain", 'DateTime'>
    readonly updatedAt: FieldRef<"Domain", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Domain findUnique
   */
  export type DomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findUniqueOrThrow
   */
  export type DomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findFirst
   */
  export type DomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findFirstOrThrow
   */
  export type DomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findMany
   */
  export type DomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domains to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain create
   */
  export type DomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to create a Domain.
     */
    data: XOR<DomainCreateInput, DomainUncheckedCreateInput>
  }

  /**
   * Domain createMany
   */
  export type DomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain createManyAndReturn
   */
  export type DomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain update
   */
  export type DomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to update a Domain.
     */
    data: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
    /**
     * Choose, which Domain to update.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain updateMany
   */
  export type DomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
  }

  /**
   * Domain upsert
   */
  export type DomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The filter to search for the Domain to update in case it exists.
     */
    where: DomainWhereUniqueInput
    /**
     * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
     */
    create: XOR<DomainCreateInput, DomainUncheckedCreateInput>
    /**
     * In case the Domain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
  }

  /**
   * Domain delete
   */
  export type DomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter which Domain to delete.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain deleteMany
   */
  export type DomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domains to delete
     */
    where?: DomainWhereInput
  }

  /**
   * Domain.certificates
   */
  export type Domain$certificatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    where?: CertificateWhereInput
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    cursor?: CertificateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Domain.renewalJobs
   */
  export type Domain$renewalJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    where?: CertificateRenewalWhereInput
    orderBy?: CertificateRenewalOrderByWithRelationInput | CertificateRenewalOrderByWithRelationInput[]
    cursor?: CertificateRenewalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificateRenewalScalarFieldEnum | CertificateRenewalScalarFieldEnum[]
  }

  /**
   * Domain without action
   */
  export type DomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
  }


  /**
   * Model Certificate
   */

  export type AggregateCertificate = {
    _count: CertificateCountAggregateOutputType | null
    _min: CertificateMinAggregateOutputType | null
    _max: CertificateMaxAggregateOutputType | null
  }

  export type CertificateMinAggregateOutputType = {
    id: string | null
    domainId: string | null
    subject: string | null
    altNames: string | null
    issuer: string | null
    serial: string | null
    certPem: string | null
    chainPem: string | null
    keyPem: string | null
    fullchainPem: string | null
    issuedAt: Date | null
    expiresAt: Date | null
    status: $Enums.CertificateStatus | null
    acmeAccountKey: string | null
    acmeOrderUrl: string | null
    challengeType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateMaxAggregateOutputType = {
    id: string | null
    domainId: string | null
    subject: string | null
    altNames: string | null
    issuer: string | null
    serial: string | null
    certPem: string | null
    chainPem: string | null
    keyPem: string | null
    fullchainPem: string | null
    issuedAt: Date | null
    expiresAt: Date | null
    status: $Enums.CertificateStatus | null
    acmeAccountKey: string | null
    acmeOrderUrl: string | null
    challengeType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateCountAggregateOutputType = {
    id: number
    domainId: number
    subject: number
    altNames: number
    issuer: number
    serial: number
    certPem: number
    chainPem: number
    keyPem: number
    fullchainPem: number
    issuedAt: number
    expiresAt: number
    status: number
    acmeAccountKey: number
    acmeOrderUrl: number
    challengeType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CertificateMinAggregateInputType = {
    id?: true
    domainId?: true
    subject?: true
    altNames?: true
    issuer?: true
    serial?: true
    certPem?: true
    chainPem?: true
    keyPem?: true
    fullchainPem?: true
    issuedAt?: true
    expiresAt?: true
    status?: true
    acmeAccountKey?: true
    acmeOrderUrl?: true
    challengeType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateMaxAggregateInputType = {
    id?: true
    domainId?: true
    subject?: true
    altNames?: true
    issuer?: true
    serial?: true
    certPem?: true
    chainPem?: true
    keyPem?: true
    fullchainPem?: true
    issuedAt?: true
    expiresAt?: true
    status?: true
    acmeAccountKey?: true
    acmeOrderUrl?: true
    challengeType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateCountAggregateInputType = {
    id?: true
    domainId?: true
    subject?: true
    altNames?: true
    issuer?: true
    serial?: true
    certPem?: true
    chainPem?: true
    keyPem?: true
    fullchainPem?: true
    issuedAt?: true
    expiresAt?: true
    status?: true
    acmeAccountKey?: true
    acmeOrderUrl?: true
    challengeType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CertificateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificate to aggregate.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Certificates
    **/
    _count?: true | CertificateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificateMaxAggregateInputType
  }

  export type GetCertificateAggregateType<T extends CertificateAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificate[P]>
      : GetScalarType<T[P], AggregateCertificate[P]>
  }




  export type CertificateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateWhereInput
    orderBy?: CertificateOrderByWithAggregationInput | CertificateOrderByWithAggregationInput[]
    by: CertificateScalarFieldEnum[] | CertificateScalarFieldEnum
    having?: CertificateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificateCountAggregateInputType | true
    _min?: CertificateMinAggregateInputType
    _max?: CertificateMaxAggregateInputType
  }

  export type CertificateGroupByOutputType = {
    id: string
    domainId: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date
    expiresAt: Date
    status: $Enums.CertificateStatus
    acmeAccountKey: string | null
    acmeOrderUrl: string | null
    challengeType: string
    createdAt: Date
    updatedAt: Date
    _count: CertificateCountAggregateOutputType | null
    _min: CertificateMinAggregateOutputType | null
    _max: CertificateMaxAggregateOutputType | null
  }

  type GetCertificateGroupByPayload<T extends CertificateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificateGroupByOutputType[P]>
            : GetScalarType<T[P], CertificateGroupByOutputType[P]>
        }
      >
    >


  export type CertificateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    subject?: boolean
    altNames?: boolean
    issuer?: boolean
    serial?: boolean
    certPem?: boolean
    chainPem?: boolean
    keyPem?: boolean
    fullchainPem?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    status?: boolean
    acmeAccountKey?: boolean
    acmeOrderUrl?: boolean
    challengeType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    deployments?: boolean | Certificate$deploymentsArgs<ExtArgs>
    renewalJobs?: boolean | Certificate$renewalJobsArgs<ExtArgs>
    _count?: boolean | CertificateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    subject?: boolean
    altNames?: boolean
    issuer?: boolean
    serial?: boolean
    certPem?: boolean
    chainPem?: boolean
    keyPem?: boolean
    fullchainPem?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    status?: boolean
    acmeAccountKey?: boolean
    acmeOrderUrl?: boolean
    challengeType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificate"]>

  export type CertificateSelectScalar = {
    id?: boolean
    domainId?: boolean
    subject?: boolean
    altNames?: boolean
    issuer?: boolean
    serial?: boolean
    certPem?: boolean
    chainPem?: boolean
    keyPem?: boolean
    fullchainPem?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    status?: boolean
    acmeAccountKey?: boolean
    acmeOrderUrl?: boolean
    challengeType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CertificateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    deployments?: boolean | Certificate$deploymentsArgs<ExtArgs>
    renewalJobs?: boolean | Certificate$renewalJobsArgs<ExtArgs>
    _count?: boolean | CertificateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CertificateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }

  export type $CertificatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Certificate"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs>
      deployments: Prisma.$CertificateDeploymentPayload<ExtArgs>[]
      renewalJobs: Prisma.$CertificateRenewalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      domainId: string
      subject: string
      altNames: string
      issuer: string
      serial: string
      certPem: string
      chainPem: string
      keyPem: string
      fullchainPem: string
      issuedAt: Date
      expiresAt: Date
      status: $Enums.CertificateStatus
      acmeAccountKey: string | null
      acmeOrderUrl: string | null
      challengeType: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["certificate"]>
    composites: {}
  }

  type CertificateGetPayload<S extends boolean | null | undefined | CertificateDefaultArgs> = $Result.GetResult<Prisma.$CertificatePayload, S>

  type CertificateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CertificateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CertificateCountAggregateInputType | true
    }

  export interface CertificateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Certificate'], meta: { name: 'Certificate' } }
    /**
     * Find zero or one Certificate that matches the filter.
     * @param {CertificateFindUniqueArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificateFindUniqueArgs>(args: SelectSubset<T, CertificateFindUniqueArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Certificate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CertificateFindUniqueOrThrowArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificateFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Certificate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindFirstArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificateFindFirstArgs>(args?: SelectSubset<T, CertificateFindFirstArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Certificate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindFirstOrThrowArgs} args - Arguments to find a Certificate
     * @example
     * // Get one Certificate
     * const certificate = await prisma.certificate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificateFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Certificates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Certificates
     * const certificates = await prisma.certificate.findMany()
     * 
     * // Get first 10 Certificates
     * const certificates = await prisma.certificate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificateWithIdOnly = await prisma.certificate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificateFindManyArgs>(args?: SelectSubset<T, CertificateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Certificate.
     * @param {CertificateCreateArgs} args - Arguments to create a Certificate.
     * @example
     * // Create one Certificate
     * const Certificate = await prisma.certificate.create({
     *   data: {
     *     // ... data to create a Certificate
     *   }
     * })
     * 
     */
    create<T extends CertificateCreateArgs>(args: SelectSubset<T, CertificateCreateArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Certificates.
     * @param {CertificateCreateManyArgs} args - Arguments to create many Certificates.
     * @example
     * // Create many Certificates
     * const certificate = await prisma.certificate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificateCreateManyArgs>(args?: SelectSubset<T, CertificateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Certificates and returns the data saved in the database.
     * @param {CertificateCreateManyAndReturnArgs} args - Arguments to create many Certificates.
     * @example
     * // Create many Certificates
     * const certificate = await prisma.certificate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Certificates and only return the `id`
     * const certificateWithIdOnly = await prisma.certificate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificateCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Certificate.
     * @param {CertificateDeleteArgs} args - Arguments to delete one Certificate.
     * @example
     * // Delete one Certificate
     * const Certificate = await prisma.certificate.delete({
     *   where: {
     *     // ... filter to delete one Certificate
     *   }
     * })
     * 
     */
    delete<T extends CertificateDeleteArgs>(args: SelectSubset<T, CertificateDeleteArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Certificate.
     * @param {CertificateUpdateArgs} args - Arguments to update one Certificate.
     * @example
     * // Update one Certificate
     * const certificate = await prisma.certificate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificateUpdateArgs>(args: SelectSubset<T, CertificateUpdateArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Certificates.
     * @param {CertificateDeleteManyArgs} args - Arguments to filter Certificates to delete.
     * @example
     * // Delete a few Certificates
     * const { count } = await prisma.certificate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificateDeleteManyArgs>(args?: SelectSubset<T, CertificateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Certificates
     * const certificate = await prisma.certificate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificateUpdateManyArgs>(args: SelectSubset<T, CertificateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Certificate.
     * @param {CertificateUpsertArgs} args - Arguments to update or create a Certificate.
     * @example
     * // Update or create a Certificate
     * const certificate = await prisma.certificate.upsert({
     *   create: {
     *     // ... data to create a Certificate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Certificate we want to update
     *   }
     * })
     */
    upsert<T extends CertificateUpsertArgs>(args: SelectSubset<T, CertificateUpsertArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Certificates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateCountArgs} args - Arguments to filter Certificates to count.
     * @example
     * // Count the number of Certificates
     * const count = await prisma.certificate.count({
     *   where: {
     *     // ... the filter for the Certificates we want to count
     *   }
     * })
    **/
    count<T extends CertificateCountArgs>(
      args?: Subset<T, CertificateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Certificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificateAggregateArgs>(args: Subset<T, CertificateAggregateArgs>): Prisma.PrismaPromise<GetCertificateAggregateType<T>>

    /**
     * Group by Certificate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificateGroupByArgs['orderBy'] }
        : { orderBy?: CertificateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Certificate model
   */
  readonly fields: CertificateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Certificate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    deployments<T extends Certificate$deploymentsArgs<ExtArgs> = {}>(args?: Subset<T, Certificate$deploymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "findMany"> | Null>
    renewalJobs<T extends Certificate$renewalJobsArgs<ExtArgs> = {}>(args?: Subset<T, Certificate$renewalJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Certificate model
   */ 
  interface CertificateFieldRefs {
    readonly id: FieldRef<"Certificate", 'String'>
    readonly domainId: FieldRef<"Certificate", 'String'>
    readonly subject: FieldRef<"Certificate", 'String'>
    readonly altNames: FieldRef<"Certificate", 'String'>
    readonly issuer: FieldRef<"Certificate", 'String'>
    readonly serial: FieldRef<"Certificate", 'String'>
    readonly certPem: FieldRef<"Certificate", 'String'>
    readonly chainPem: FieldRef<"Certificate", 'String'>
    readonly keyPem: FieldRef<"Certificate", 'String'>
    readonly fullchainPem: FieldRef<"Certificate", 'String'>
    readonly issuedAt: FieldRef<"Certificate", 'DateTime'>
    readonly expiresAt: FieldRef<"Certificate", 'DateTime'>
    readonly status: FieldRef<"Certificate", 'CertificateStatus'>
    readonly acmeAccountKey: FieldRef<"Certificate", 'String'>
    readonly acmeOrderUrl: FieldRef<"Certificate", 'String'>
    readonly challengeType: FieldRef<"Certificate", 'String'>
    readonly createdAt: FieldRef<"Certificate", 'DateTime'>
    readonly updatedAt: FieldRef<"Certificate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Certificate findUnique
   */
  export type CertificateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate findUniqueOrThrow
   */
  export type CertificateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate findFirst
   */
  export type CertificateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate findFirstOrThrow
   */
  export type CertificateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * Filter, which Certificate to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certificates.
     */
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate findMany
   */
  export type CertificateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * Filter, which Certificates to fetch.
     */
    where?: CertificateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certificates to fetch.
     */
    orderBy?: CertificateOrderByWithRelationInput | CertificateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Certificates.
     */
    cursor?: CertificateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certificates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certificates.
     */
    skip?: number
    distinct?: CertificateScalarFieldEnum | CertificateScalarFieldEnum[]
  }

  /**
   * Certificate create
   */
  export type CertificateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * The data needed to create a Certificate.
     */
    data: XOR<CertificateCreateInput, CertificateUncheckedCreateInput>
  }

  /**
   * Certificate createMany
   */
  export type CertificateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Certificates.
     */
    data: CertificateCreateManyInput | CertificateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certificate createManyAndReturn
   */
  export type CertificateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Certificates.
     */
    data: CertificateCreateManyInput | CertificateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Certificate update
   */
  export type CertificateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * The data needed to update a Certificate.
     */
    data: XOR<CertificateUpdateInput, CertificateUncheckedUpdateInput>
    /**
     * Choose, which Certificate to update.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate updateMany
   */
  export type CertificateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Certificates.
     */
    data: XOR<CertificateUpdateManyMutationInput, CertificateUncheckedUpdateManyInput>
    /**
     * Filter which Certificates to update
     */
    where?: CertificateWhereInput
  }

  /**
   * Certificate upsert
   */
  export type CertificateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * The filter to search for the Certificate to update in case it exists.
     */
    where: CertificateWhereUniqueInput
    /**
     * In case the Certificate found by the `where` argument doesn't exist, create a new Certificate with this data.
     */
    create: XOR<CertificateCreateInput, CertificateUncheckedCreateInput>
    /**
     * In case the Certificate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificateUpdateInput, CertificateUncheckedUpdateInput>
  }

  /**
   * Certificate delete
   */
  export type CertificateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
    /**
     * Filter which Certificate to delete.
     */
    where: CertificateWhereUniqueInput
  }

  /**
   * Certificate deleteMany
   */
  export type CertificateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certificates to delete
     */
    where?: CertificateWhereInput
  }

  /**
   * Certificate.deployments
   */
  export type Certificate$deploymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    where?: CertificateDeploymentWhereInput
    orderBy?: CertificateDeploymentOrderByWithRelationInput | CertificateDeploymentOrderByWithRelationInput[]
    cursor?: CertificateDeploymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificateDeploymentScalarFieldEnum | CertificateDeploymentScalarFieldEnum[]
  }

  /**
   * Certificate.renewalJobs
   */
  export type Certificate$renewalJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    where?: CertificateRenewalWhereInput
    orderBy?: CertificateRenewalOrderByWithRelationInput | CertificateRenewalOrderByWithRelationInput[]
    cursor?: CertificateRenewalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificateRenewalScalarFieldEnum | CertificateRenewalScalarFieldEnum[]
  }

  /**
   * Certificate without action
   */
  export type CertificateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certificate
     */
    select?: CertificateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateInclude<ExtArgs> | null
  }


  /**
   * Model CertificateRenewal
   */

  export type AggregateCertificateRenewal = {
    _count: CertificateRenewalCountAggregateOutputType | null
    _avg: CertificateRenewalAvgAggregateOutputType | null
    _sum: CertificateRenewalSumAggregateOutputType | null
    _min: CertificateRenewalMinAggregateOutputType | null
    _max: CertificateRenewalMaxAggregateOutputType | null
  }

  export type CertificateRenewalAvgAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
    renewalThreshold: number | null
  }

  export type CertificateRenewalSumAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
    renewalThreshold: number | null
  }

  export type CertificateRenewalMinAggregateOutputType = {
    id: string | null
    certificateId: string | null
    domainId: string | null
    scheduledAt: Date | null
    attemptedAt: Date | null
    completedAt: Date | null
    nextAttempt: Date | null
    status: $Enums.RenewalStatus | null
    attempts: number | null
    maxAttempts: number | null
    lastError: string | null
    autoRenewal: boolean | null
    renewalThreshold: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateRenewalMaxAggregateOutputType = {
    id: string | null
    certificateId: string | null
    domainId: string | null
    scheduledAt: Date | null
    attemptedAt: Date | null
    completedAt: Date | null
    nextAttempt: Date | null
    status: $Enums.RenewalStatus | null
    attempts: number | null
    maxAttempts: number | null
    lastError: string | null
    autoRenewal: boolean | null
    renewalThreshold: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateRenewalCountAggregateOutputType = {
    id: number
    certificateId: number
    domainId: number
    scheduledAt: number
    attemptedAt: number
    completedAt: number
    nextAttempt: number
    status: number
    attempts: number
    maxAttempts: number
    lastError: number
    autoRenewal: number
    renewalThreshold: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CertificateRenewalAvgAggregateInputType = {
    attempts?: true
    maxAttempts?: true
    renewalThreshold?: true
  }

  export type CertificateRenewalSumAggregateInputType = {
    attempts?: true
    maxAttempts?: true
    renewalThreshold?: true
  }

  export type CertificateRenewalMinAggregateInputType = {
    id?: true
    certificateId?: true
    domainId?: true
    scheduledAt?: true
    attemptedAt?: true
    completedAt?: true
    nextAttempt?: true
    status?: true
    attempts?: true
    maxAttempts?: true
    lastError?: true
    autoRenewal?: true
    renewalThreshold?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateRenewalMaxAggregateInputType = {
    id?: true
    certificateId?: true
    domainId?: true
    scheduledAt?: true
    attemptedAt?: true
    completedAt?: true
    nextAttempt?: true
    status?: true
    attempts?: true
    maxAttempts?: true
    lastError?: true
    autoRenewal?: true
    renewalThreshold?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateRenewalCountAggregateInputType = {
    id?: true
    certificateId?: true
    domainId?: true
    scheduledAt?: true
    attemptedAt?: true
    completedAt?: true
    nextAttempt?: true
    status?: true
    attempts?: true
    maxAttempts?: true
    lastError?: true
    autoRenewal?: true
    renewalThreshold?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CertificateRenewalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CertificateRenewal to aggregate.
     */
    where?: CertificateRenewalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateRenewals to fetch.
     */
    orderBy?: CertificateRenewalOrderByWithRelationInput | CertificateRenewalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificateRenewalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateRenewals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateRenewals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CertificateRenewals
    **/
    _count?: true | CertificateRenewalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CertificateRenewalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CertificateRenewalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificateRenewalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificateRenewalMaxAggregateInputType
  }

  export type GetCertificateRenewalAggregateType<T extends CertificateRenewalAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificateRenewal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificateRenewal[P]>
      : GetScalarType<T[P], AggregateCertificateRenewal[P]>
  }




  export type CertificateRenewalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateRenewalWhereInput
    orderBy?: CertificateRenewalOrderByWithAggregationInput | CertificateRenewalOrderByWithAggregationInput[]
    by: CertificateRenewalScalarFieldEnum[] | CertificateRenewalScalarFieldEnum
    having?: CertificateRenewalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificateRenewalCountAggregateInputType | true
    _avg?: CertificateRenewalAvgAggregateInputType
    _sum?: CertificateRenewalSumAggregateInputType
    _min?: CertificateRenewalMinAggregateInputType
    _max?: CertificateRenewalMaxAggregateInputType
  }

  export type CertificateRenewalGroupByOutputType = {
    id: string
    certificateId: string
    domainId: string
    scheduledAt: Date
    attemptedAt: Date | null
    completedAt: Date | null
    nextAttempt: Date | null
    status: $Enums.RenewalStatus
    attempts: number
    maxAttempts: number
    lastError: string | null
    autoRenewal: boolean
    renewalThreshold: number
    createdAt: Date
    updatedAt: Date
    _count: CertificateRenewalCountAggregateOutputType | null
    _avg: CertificateRenewalAvgAggregateOutputType | null
    _sum: CertificateRenewalSumAggregateOutputType | null
    _min: CertificateRenewalMinAggregateOutputType | null
    _max: CertificateRenewalMaxAggregateOutputType | null
  }

  type GetCertificateRenewalGroupByPayload<T extends CertificateRenewalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificateRenewalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificateRenewalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificateRenewalGroupByOutputType[P]>
            : GetScalarType<T[P], CertificateRenewalGroupByOutputType[P]>
        }
      >
    >


  export type CertificateRenewalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    certificateId?: boolean
    domainId?: boolean
    scheduledAt?: boolean
    attemptedAt?: boolean
    completedAt?: boolean
    nextAttempt?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    lastError?: boolean
    autoRenewal?: boolean
    renewalThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificateRenewal"]>

  export type CertificateRenewalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    certificateId?: boolean
    domainId?: boolean
    scheduledAt?: boolean
    attemptedAt?: boolean
    completedAt?: boolean
    nextAttempt?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    lastError?: boolean
    autoRenewal?: boolean
    renewalThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificateRenewal"]>

  export type CertificateRenewalSelectScalar = {
    id?: boolean
    certificateId?: boolean
    domainId?: boolean
    scheduledAt?: boolean
    attemptedAt?: boolean
    completedAt?: boolean
    nextAttempt?: boolean
    status?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    lastError?: boolean
    autoRenewal?: boolean
    renewalThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CertificateRenewalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }
  export type CertificateRenewalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }

  export type $CertificateRenewalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CertificateRenewal"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs>
      certificate: Prisma.$CertificatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      certificateId: string
      domainId: string
      scheduledAt: Date
      attemptedAt: Date | null
      completedAt: Date | null
      nextAttempt: Date | null
      status: $Enums.RenewalStatus
      attempts: number
      maxAttempts: number
      lastError: string | null
      autoRenewal: boolean
      renewalThreshold: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["certificateRenewal"]>
    composites: {}
  }

  type CertificateRenewalGetPayload<S extends boolean | null | undefined | CertificateRenewalDefaultArgs> = $Result.GetResult<Prisma.$CertificateRenewalPayload, S>

  type CertificateRenewalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CertificateRenewalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CertificateRenewalCountAggregateInputType | true
    }

  export interface CertificateRenewalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CertificateRenewal'], meta: { name: 'CertificateRenewal' } }
    /**
     * Find zero or one CertificateRenewal that matches the filter.
     * @param {CertificateRenewalFindUniqueArgs} args - Arguments to find a CertificateRenewal
     * @example
     * // Get one CertificateRenewal
     * const certificateRenewal = await prisma.certificateRenewal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificateRenewalFindUniqueArgs>(args: SelectSubset<T, CertificateRenewalFindUniqueArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CertificateRenewal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CertificateRenewalFindUniqueOrThrowArgs} args - Arguments to find a CertificateRenewal
     * @example
     * // Get one CertificateRenewal
     * const certificateRenewal = await prisma.certificateRenewal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificateRenewalFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificateRenewalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CertificateRenewal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalFindFirstArgs} args - Arguments to find a CertificateRenewal
     * @example
     * // Get one CertificateRenewal
     * const certificateRenewal = await prisma.certificateRenewal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificateRenewalFindFirstArgs>(args?: SelectSubset<T, CertificateRenewalFindFirstArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CertificateRenewal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalFindFirstOrThrowArgs} args - Arguments to find a CertificateRenewal
     * @example
     * // Get one CertificateRenewal
     * const certificateRenewal = await prisma.certificateRenewal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificateRenewalFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificateRenewalFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CertificateRenewals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CertificateRenewals
     * const certificateRenewals = await prisma.certificateRenewal.findMany()
     * 
     * // Get first 10 CertificateRenewals
     * const certificateRenewals = await prisma.certificateRenewal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificateRenewalWithIdOnly = await prisma.certificateRenewal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificateRenewalFindManyArgs>(args?: SelectSubset<T, CertificateRenewalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CertificateRenewal.
     * @param {CertificateRenewalCreateArgs} args - Arguments to create a CertificateRenewal.
     * @example
     * // Create one CertificateRenewal
     * const CertificateRenewal = await prisma.certificateRenewal.create({
     *   data: {
     *     // ... data to create a CertificateRenewal
     *   }
     * })
     * 
     */
    create<T extends CertificateRenewalCreateArgs>(args: SelectSubset<T, CertificateRenewalCreateArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CertificateRenewals.
     * @param {CertificateRenewalCreateManyArgs} args - Arguments to create many CertificateRenewals.
     * @example
     * // Create many CertificateRenewals
     * const certificateRenewal = await prisma.certificateRenewal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificateRenewalCreateManyArgs>(args?: SelectSubset<T, CertificateRenewalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CertificateRenewals and returns the data saved in the database.
     * @param {CertificateRenewalCreateManyAndReturnArgs} args - Arguments to create many CertificateRenewals.
     * @example
     * // Create many CertificateRenewals
     * const certificateRenewal = await prisma.certificateRenewal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CertificateRenewals and only return the `id`
     * const certificateRenewalWithIdOnly = await prisma.certificateRenewal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificateRenewalCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificateRenewalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CertificateRenewal.
     * @param {CertificateRenewalDeleteArgs} args - Arguments to delete one CertificateRenewal.
     * @example
     * // Delete one CertificateRenewal
     * const CertificateRenewal = await prisma.certificateRenewal.delete({
     *   where: {
     *     // ... filter to delete one CertificateRenewal
     *   }
     * })
     * 
     */
    delete<T extends CertificateRenewalDeleteArgs>(args: SelectSubset<T, CertificateRenewalDeleteArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CertificateRenewal.
     * @param {CertificateRenewalUpdateArgs} args - Arguments to update one CertificateRenewal.
     * @example
     * // Update one CertificateRenewal
     * const certificateRenewal = await prisma.certificateRenewal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificateRenewalUpdateArgs>(args: SelectSubset<T, CertificateRenewalUpdateArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CertificateRenewals.
     * @param {CertificateRenewalDeleteManyArgs} args - Arguments to filter CertificateRenewals to delete.
     * @example
     * // Delete a few CertificateRenewals
     * const { count } = await prisma.certificateRenewal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificateRenewalDeleteManyArgs>(args?: SelectSubset<T, CertificateRenewalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CertificateRenewals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CertificateRenewals
     * const certificateRenewal = await prisma.certificateRenewal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificateRenewalUpdateManyArgs>(args: SelectSubset<T, CertificateRenewalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CertificateRenewal.
     * @param {CertificateRenewalUpsertArgs} args - Arguments to update or create a CertificateRenewal.
     * @example
     * // Update or create a CertificateRenewal
     * const certificateRenewal = await prisma.certificateRenewal.upsert({
     *   create: {
     *     // ... data to create a CertificateRenewal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CertificateRenewal we want to update
     *   }
     * })
     */
    upsert<T extends CertificateRenewalUpsertArgs>(args: SelectSubset<T, CertificateRenewalUpsertArgs<ExtArgs>>): Prisma__CertificateRenewalClient<$Result.GetResult<Prisma.$CertificateRenewalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CertificateRenewals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalCountArgs} args - Arguments to filter CertificateRenewals to count.
     * @example
     * // Count the number of CertificateRenewals
     * const count = await prisma.certificateRenewal.count({
     *   where: {
     *     // ... the filter for the CertificateRenewals we want to count
     *   }
     * })
    **/
    count<T extends CertificateRenewalCountArgs>(
      args?: Subset<T, CertificateRenewalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificateRenewalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CertificateRenewal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificateRenewalAggregateArgs>(args: Subset<T, CertificateRenewalAggregateArgs>): Prisma.PrismaPromise<GetCertificateRenewalAggregateType<T>>

    /**
     * Group by CertificateRenewal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateRenewalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificateRenewalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificateRenewalGroupByArgs['orderBy'] }
        : { orderBy?: CertificateRenewalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificateRenewalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificateRenewalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CertificateRenewal model
   */
  readonly fields: CertificateRenewalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CertificateRenewal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificateRenewalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    certificate<T extends CertificateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CertificateDefaultArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CertificateRenewal model
   */ 
  interface CertificateRenewalFieldRefs {
    readonly id: FieldRef<"CertificateRenewal", 'String'>
    readonly certificateId: FieldRef<"CertificateRenewal", 'String'>
    readonly domainId: FieldRef<"CertificateRenewal", 'String'>
    readonly scheduledAt: FieldRef<"CertificateRenewal", 'DateTime'>
    readonly attemptedAt: FieldRef<"CertificateRenewal", 'DateTime'>
    readonly completedAt: FieldRef<"CertificateRenewal", 'DateTime'>
    readonly nextAttempt: FieldRef<"CertificateRenewal", 'DateTime'>
    readonly status: FieldRef<"CertificateRenewal", 'RenewalStatus'>
    readonly attempts: FieldRef<"CertificateRenewal", 'Int'>
    readonly maxAttempts: FieldRef<"CertificateRenewal", 'Int'>
    readonly lastError: FieldRef<"CertificateRenewal", 'String'>
    readonly autoRenewal: FieldRef<"CertificateRenewal", 'Boolean'>
    readonly renewalThreshold: FieldRef<"CertificateRenewal", 'Int'>
    readonly createdAt: FieldRef<"CertificateRenewal", 'DateTime'>
    readonly updatedAt: FieldRef<"CertificateRenewal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CertificateRenewal findUnique
   */
  export type CertificateRenewalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * Filter, which CertificateRenewal to fetch.
     */
    where: CertificateRenewalWhereUniqueInput
  }

  /**
   * CertificateRenewal findUniqueOrThrow
   */
  export type CertificateRenewalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * Filter, which CertificateRenewal to fetch.
     */
    where: CertificateRenewalWhereUniqueInput
  }

  /**
   * CertificateRenewal findFirst
   */
  export type CertificateRenewalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * Filter, which CertificateRenewal to fetch.
     */
    where?: CertificateRenewalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateRenewals to fetch.
     */
    orderBy?: CertificateRenewalOrderByWithRelationInput | CertificateRenewalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CertificateRenewals.
     */
    cursor?: CertificateRenewalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateRenewals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateRenewals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CertificateRenewals.
     */
    distinct?: CertificateRenewalScalarFieldEnum | CertificateRenewalScalarFieldEnum[]
  }

  /**
   * CertificateRenewal findFirstOrThrow
   */
  export type CertificateRenewalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * Filter, which CertificateRenewal to fetch.
     */
    where?: CertificateRenewalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateRenewals to fetch.
     */
    orderBy?: CertificateRenewalOrderByWithRelationInput | CertificateRenewalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CertificateRenewals.
     */
    cursor?: CertificateRenewalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateRenewals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateRenewals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CertificateRenewals.
     */
    distinct?: CertificateRenewalScalarFieldEnum | CertificateRenewalScalarFieldEnum[]
  }

  /**
   * CertificateRenewal findMany
   */
  export type CertificateRenewalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * Filter, which CertificateRenewals to fetch.
     */
    where?: CertificateRenewalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateRenewals to fetch.
     */
    orderBy?: CertificateRenewalOrderByWithRelationInput | CertificateRenewalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CertificateRenewals.
     */
    cursor?: CertificateRenewalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateRenewals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateRenewals.
     */
    skip?: number
    distinct?: CertificateRenewalScalarFieldEnum | CertificateRenewalScalarFieldEnum[]
  }

  /**
   * CertificateRenewal create
   */
  export type CertificateRenewalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * The data needed to create a CertificateRenewal.
     */
    data: XOR<CertificateRenewalCreateInput, CertificateRenewalUncheckedCreateInput>
  }

  /**
   * CertificateRenewal createMany
   */
  export type CertificateRenewalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CertificateRenewals.
     */
    data: CertificateRenewalCreateManyInput | CertificateRenewalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CertificateRenewal createManyAndReturn
   */
  export type CertificateRenewalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CertificateRenewals.
     */
    data: CertificateRenewalCreateManyInput | CertificateRenewalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CertificateRenewal update
   */
  export type CertificateRenewalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * The data needed to update a CertificateRenewal.
     */
    data: XOR<CertificateRenewalUpdateInput, CertificateRenewalUncheckedUpdateInput>
    /**
     * Choose, which CertificateRenewal to update.
     */
    where: CertificateRenewalWhereUniqueInput
  }

  /**
   * CertificateRenewal updateMany
   */
  export type CertificateRenewalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CertificateRenewals.
     */
    data: XOR<CertificateRenewalUpdateManyMutationInput, CertificateRenewalUncheckedUpdateManyInput>
    /**
     * Filter which CertificateRenewals to update
     */
    where?: CertificateRenewalWhereInput
  }

  /**
   * CertificateRenewal upsert
   */
  export type CertificateRenewalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * The filter to search for the CertificateRenewal to update in case it exists.
     */
    where: CertificateRenewalWhereUniqueInput
    /**
     * In case the CertificateRenewal found by the `where` argument doesn't exist, create a new CertificateRenewal with this data.
     */
    create: XOR<CertificateRenewalCreateInput, CertificateRenewalUncheckedCreateInput>
    /**
     * In case the CertificateRenewal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificateRenewalUpdateInput, CertificateRenewalUncheckedUpdateInput>
  }

  /**
   * CertificateRenewal delete
   */
  export type CertificateRenewalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
    /**
     * Filter which CertificateRenewal to delete.
     */
    where: CertificateRenewalWhereUniqueInput
  }

  /**
   * CertificateRenewal deleteMany
   */
  export type CertificateRenewalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CertificateRenewals to delete
     */
    where?: CertificateRenewalWhereInput
  }

  /**
   * CertificateRenewal without action
   */
  export type CertificateRenewalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateRenewal
     */
    select?: CertificateRenewalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateRenewalInclude<ExtArgs> | null
  }


  /**
   * Model CertificateDeployment
   */

  export type AggregateCertificateDeployment = {
    _count: CertificateDeploymentCountAggregateOutputType | null
    _min: CertificateDeploymentMinAggregateOutputType | null
    _max: CertificateDeploymentMaxAggregateOutputType | null
  }

  export type CertificateDeploymentMinAggregateOutputType = {
    id: string | null
    certificateId: string | null
    targetType: string | null
    deploymentPath: string | null
    status: $Enums.DeploymentStatus | null
    deployedAt: Date | null
    lastError: string | null
    pm2RestartRequired: boolean | null
    pm2RestartCompleted: boolean | null
    pm2Services: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateDeploymentMaxAggregateOutputType = {
    id: string | null
    certificateId: string | null
    targetType: string | null
    deploymentPath: string | null
    status: $Enums.DeploymentStatus | null
    deployedAt: Date | null
    lastError: string | null
    pm2RestartRequired: boolean | null
    pm2RestartCompleted: boolean | null
    pm2Services: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CertificateDeploymentCountAggregateOutputType = {
    id: number
    certificateId: number
    targetType: number
    targetConfig: number
    deploymentPath: number
    status: number
    deployedAt: number
    lastError: number
    pm2RestartRequired: number
    pm2RestartCompleted: number
    pm2Services: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CertificateDeploymentMinAggregateInputType = {
    id?: true
    certificateId?: true
    targetType?: true
    deploymentPath?: true
    status?: true
    deployedAt?: true
    lastError?: true
    pm2RestartRequired?: true
    pm2RestartCompleted?: true
    pm2Services?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateDeploymentMaxAggregateInputType = {
    id?: true
    certificateId?: true
    targetType?: true
    deploymentPath?: true
    status?: true
    deployedAt?: true
    lastError?: true
    pm2RestartRequired?: true
    pm2RestartCompleted?: true
    pm2Services?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CertificateDeploymentCountAggregateInputType = {
    id?: true
    certificateId?: true
    targetType?: true
    targetConfig?: true
    deploymentPath?: true
    status?: true
    deployedAt?: true
    lastError?: true
    pm2RestartRequired?: true
    pm2RestartCompleted?: true
    pm2Services?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CertificateDeploymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CertificateDeployment to aggregate.
     */
    where?: CertificateDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateDeployments to fetch.
     */
    orderBy?: CertificateDeploymentOrderByWithRelationInput | CertificateDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificateDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CertificateDeployments
    **/
    _count?: true | CertificateDeploymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificateDeploymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificateDeploymentMaxAggregateInputType
  }

  export type GetCertificateDeploymentAggregateType<T extends CertificateDeploymentAggregateArgs> = {
        [P in keyof T & keyof AggregateCertificateDeployment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertificateDeployment[P]>
      : GetScalarType<T[P], AggregateCertificateDeployment[P]>
  }




  export type CertificateDeploymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificateDeploymentWhereInput
    orderBy?: CertificateDeploymentOrderByWithAggregationInput | CertificateDeploymentOrderByWithAggregationInput[]
    by: CertificateDeploymentScalarFieldEnum[] | CertificateDeploymentScalarFieldEnum
    having?: CertificateDeploymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificateDeploymentCountAggregateInputType | true
    _min?: CertificateDeploymentMinAggregateInputType
    _max?: CertificateDeploymentMaxAggregateInputType
  }

  export type CertificateDeploymentGroupByOutputType = {
    id: string
    certificateId: string
    targetType: string
    targetConfig: JsonValue
    deploymentPath: string | null
    status: $Enums.DeploymentStatus
    deployedAt: Date | null
    lastError: string | null
    pm2RestartRequired: boolean
    pm2RestartCompleted: boolean
    pm2Services: string
    createdAt: Date
    updatedAt: Date
    _count: CertificateDeploymentCountAggregateOutputType | null
    _min: CertificateDeploymentMinAggregateOutputType | null
    _max: CertificateDeploymentMaxAggregateOutputType | null
  }

  type GetCertificateDeploymentGroupByPayload<T extends CertificateDeploymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificateDeploymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificateDeploymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificateDeploymentGroupByOutputType[P]>
            : GetScalarType<T[P], CertificateDeploymentGroupByOutputType[P]>
        }
      >
    >


  export type CertificateDeploymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    certificateId?: boolean
    targetType?: boolean
    targetConfig?: boolean
    deploymentPath?: boolean
    status?: boolean
    deployedAt?: boolean
    lastError?: boolean
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificateDeployment"]>

  export type CertificateDeploymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    certificateId?: boolean
    targetType?: boolean
    targetConfig?: boolean
    deploymentPath?: boolean
    status?: boolean
    deployedAt?: boolean
    lastError?: boolean
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certificateDeployment"]>

  export type CertificateDeploymentSelectScalar = {
    id?: boolean
    certificateId?: boolean
    targetType?: boolean
    targetConfig?: boolean
    deploymentPath?: boolean
    status?: boolean
    deployedAt?: boolean
    lastError?: boolean
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CertificateDeploymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }
  export type CertificateDeploymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    certificate?: boolean | CertificateDefaultArgs<ExtArgs>
  }

  export type $CertificateDeploymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CertificateDeployment"
    objects: {
      certificate: Prisma.$CertificatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      certificateId: string
      targetType: string
      targetConfig: Prisma.JsonValue
      deploymentPath: string | null
      status: $Enums.DeploymentStatus
      deployedAt: Date | null
      lastError: string | null
      pm2RestartRequired: boolean
      pm2RestartCompleted: boolean
      pm2Services: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["certificateDeployment"]>
    composites: {}
  }

  type CertificateDeploymentGetPayload<S extends boolean | null | undefined | CertificateDeploymentDefaultArgs> = $Result.GetResult<Prisma.$CertificateDeploymentPayload, S>

  type CertificateDeploymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CertificateDeploymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CertificateDeploymentCountAggregateInputType | true
    }

  export interface CertificateDeploymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CertificateDeployment'], meta: { name: 'CertificateDeployment' } }
    /**
     * Find zero or one CertificateDeployment that matches the filter.
     * @param {CertificateDeploymentFindUniqueArgs} args - Arguments to find a CertificateDeployment
     * @example
     * // Get one CertificateDeployment
     * const certificateDeployment = await prisma.certificateDeployment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificateDeploymentFindUniqueArgs>(args: SelectSubset<T, CertificateDeploymentFindUniqueArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CertificateDeployment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CertificateDeploymentFindUniqueOrThrowArgs} args - Arguments to find a CertificateDeployment
     * @example
     * // Get one CertificateDeployment
     * const certificateDeployment = await prisma.certificateDeployment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificateDeploymentFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificateDeploymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CertificateDeployment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentFindFirstArgs} args - Arguments to find a CertificateDeployment
     * @example
     * // Get one CertificateDeployment
     * const certificateDeployment = await prisma.certificateDeployment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificateDeploymentFindFirstArgs>(args?: SelectSubset<T, CertificateDeploymentFindFirstArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CertificateDeployment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentFindFirstOrThrowArgs} args - Arguments to find a CertificateDeployment
     * @example
     * // Get one CertificateDeployment
     * const certificateDeployment = await prisma.certificateDeployment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificateDeploymentFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificateDeploymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CertificateDeployments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CertificateDeployments
     * const certificateDeployments = await prisma.certificateDeployment.findMany()
     * 
     * // Get first 10 CertificateDeployments
     * const certificateDeployments = await prisma.certificateDeployment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificateDeploymentWithIdOnly = await prisma.certificateDeployment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificateDeploymentFindManyArgs>(args?: SelectSubset<T, CertificateDeploymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CertificateDeployment.
     * @param {CertificateDeploymentCreateArgs} args - Arguments to create a CertificateDeployment.
     * @example
     * // Create one CertificateDeployment
     * const CertificateDeployment = await prisma.certificateDeployment.create({
     *   data: {
     *     // ... data to create a CertificateDeployment
     *   }
     * })
     * 
     */
    create<T extends CertificateDeploymentCreateArgs>(args: SelectSubset<T, CertificateDeploymentCreateArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CertificateDeployments.
     * @param {CertificateDeploymentCreateManyArgs} args - Arguments to create many CertificateDeployments.
     * @example
     * // Create many CertificateDeployments
     * const certificateDeployment = await prisma.certificateDeployment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificateDeploymentCreateManyArgs>(args?: SelectSubset<T, CertificateDeploymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CertificateDeployments and returns the data saved in the database.
     * @param {CertificateDeploymentCreateManyAndReturnArgs} args - Arguments to create many CertificateDeployments.
     * @example
     * // Create many CertificateDeployments
     * const certificateDeployment = await prisma.certificateDeployment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CertificateDeployments and only return the `id`
     * const certificateDeploymentWithIdOnly = await prisma.certificateDeployment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CertificateDeploymentCreateManyAndReturnArgs>(args?: SelectSubset<T, CertificateDeploymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CertificateDeployment.
     * @param {CertificateDeploymentDeleteArgs} args - Arguments to delete one CertificateDeployment.
     * @example
     * // Delete one CertificateDeployment
     * const CertificateDeployment = await prisma.certificateDeployment.delete({
     *   where: {
     *     // ... filter to delete one CertificateDeployment
     *   }
     * })
     * 
     */
    delete<T extends CertificateDeploymentDeleteArgs>(args: SelectSubset<T, CertificateDeploymentDeleteArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CertificateDeployment.
     * @param {CertificateDeploymentUpdateArgs} args - Arguments to update one CertificateDeployment.
     * @example
     * // Update one CertificateDeployment
     * const certificateDeployment = await prisma.certificateDeployment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificateDeploymentUpdateArgs>(args: SelectSubset<T, CertificateDeploymentUpdateArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CertificateDeployments.
     * @param {CertificateDeploymentDeleteManyArgs} args - Arguments to filter CertificateDeployments to delete.
     * @example
     * // Delete a few CertificateDeployments
     * const { count } = await prisma.certificateDeployment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificateDeploymentDeleteManyArgs>(args?: SelectSubset<T, CertificateDeploymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CertificateDeployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CertificateDeployments
     * const certificateDeployment = await prisma.certificateDeployment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificateDeploymentUpdateManyArgs>(args: SelectSubset<T, CertificateDeploymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CertificateDeployment.
     * @param {CertificateDeploymentUpsertArgs} args - Arguments to update or create a CertificateDeployment.
     * @example
     * // Update or create a CertificateDeployment
     * const certificateDeployment = await prisma.certificateDeployment.upsert({
     *   create: {
     *     // ... data to create a CertificateDeployment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CertificateDeployment we want to update
     *   }
     * })
     */
    upsert<T extends CertificateDeploymentUpsertArgs>(args: SelectSubset<T, CertificateDeploymentUpsertArgs<ExtArgs>>): Prisma__CertificateDeploymentClient<$Result.GetResult<Prisma.$CertificateDeploymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CertificateDeployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentCountArgs} args - Arguments to filter CertificateDeployments to count.
     * @example
     * // Count the number of CertificateDeployments
     * const count = await prisma.certificateDeployment.count({
     *   where: {
     *     // ... the filter for the CertificateDeployments we want to count
     *   }
     * })
    **/
    count<T extends CertificateDeploymentCountArgs>(
      args?: Subset<T, CertificateDeploymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificateDeploymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CertificateDeployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificateDeploymentAggregateArgs>(args: Subset<T, CertificateDeploymentAggregateArgs>): Prisma.PrismaPromise<GetCertificateDeploymentAggregateType<T>>

    /**
     * Group by CertificateDeployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificateDeploymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificateDeploymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificateDeploymentGroupByArgs['orderBy'] }
        : { orderBy?: CertificateDeploymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificateDeploymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificateDeploymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CertificateDeployment model
   */
  readonly fields: CertificateDeploymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CertificateDeployment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificateDeploymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    certificate<T extends CertificateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CertificateDefaultArgs<ExtArgs>>): Prisma__CertificateClient<$Result.GetResult<Prisma.$CertificatePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CertificateDeployment model
   */ 
  interface CertificateDeploymentFieldRefs {
    readonly id: FieldRef<"CertificateDeployment", 'String'>
    readonly certificateId: FieldRef<"CertificateDeployment", 'String'>
    readonly targetType: FieldRef<"CertificateDeployment", 'String'>
    readonly targetConfig: FieldRef<"CertificateDeployment", 'Json'>
    readonly deploymentPath: FieldRef<"CertificateDeployment", 'String'>
    readonly status: FieldRef<"CertificateDeployment", 'DeploymentStatus'>
    readonly deployedAt: FieldRef<"CertificateDeployment", 'DateTime'>
    readonly lastError: FieldRef<"CertificateDeployment", 'String'>
    readonly pm2RestartRequired: FieldRef<"CertificateDeployment", 'Boolean'>
    readonly pm2RestartCompleted: FieldRef<"CertificateDeployment", 'Boolean'>
    readonly pm2Services: FieldRef<"CertificateDeployment", 'String'>
    readonly createdAt: FieldRef<"CertificateDeployment", 'DateTime'>
    readonly updatedAt: FieldRef<"CertificateDeployment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CertificateDeployment findUnique
   */
  export type CertificateDeploymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * Filter, which CertificateDeployment to fetch.
     */
    where: CertificateDeploymentWhereUniqueInput
  }

  /**
   * CertificateDeployment findUniqueOrThrow
   */
  export type CertificateDeploymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * Filter, which CertificateDeployment to fetch.
     */
    where: CertificateDeploymentWhereUniqueInput
  }

  /**
   * CertificateDeployment findFirst
   */
  export type CertificateDeploymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * Filter, which CertificateDeployment to fetch.
     */
    where?: CertificateDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateDeployments to fetch.
     */
    orderBy?: CertificateDeploymentOrderByWithRelationInput | CertificateDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CertificateDeployments.
     */
    cursor?: CertificateDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CertificateDeployments.
     */
    distinct?: CertificateDeploymentScalarFieldEnum | CertificateDeploymentScalarFieldEnum[]
  }

  /**
   * CertificateDeployment findFirstOrThrow
   */
  export type CertificateDeploymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * Filter, which CertificateDeployment to fetch.
     */
    where?: CertificateDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateDeployments to fetch.
     */
    orderBy?: CertificateDeploymentOrderByWithRelationInput | CertificateDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CertificateDeployments.
     */
    cursor?: CertificateDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CertificateDeployments.
     */
    distinct?: CertificateDeploymentScalarFieldEnum | CertificateDeploymentScalarFieldEnum[]
  }

  /**
   * CertificateDeployment findMany
   */
  export type CertificateDeploymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * Filter, which CertificateDeployments to fetch.
     */
    where?: CertificateDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CertificateDeployments to fetch.
     */
    orderBy?: CertificateDeploymentOrderByWithRelationInput | CertificateDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CertificateDeployments.
     */
    cursor?: CertificateDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CertificateDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CertificateDeployments.
     */
    skip?: number
    distinct?: CertificateDeploymentScalarFieldEnum | CertificateDeploymentScalarFieldEnum[]
  }

  /**
   * CertificateDeployment create
   */
  export type CertificateDeploymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * The data needed to create a CertificateDeployment.
     */
    data: XOR<CertificateDeploymentCreateInput, CertificateDeploymentUncheckedCreateInput>
  }

  /**
   * CertificateDeployment createMany
   */
  export type CertificateDeploymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CertificateDeployments.
     */
    data: CertificateDeploymentCreateManyInput | CertificateDeploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CertificateDeployment createManyAndReturn
   */
  export type CertificateDeploymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CertificateDeployments.
     */
    data: CertificateDeploymentCreateManyInput | CertificateDeploymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CertificateDeployment update
   */
  export type CertificateDeploymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * The data needed to update a CertificateDeployment.
     */
    data: XOR<CertificateDeploymentUpdateInput, CertificateDeploymentUncheckedUpdateInput>
    /**
     * Choose, which CertificateDeployment to update.
     */
    where: CertificateDeploymentWhereUniqueInput
  }

  /**
   * CertificateDeployment updateMany
   */
  export type CertificateDeploymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CertificateDeployments.
     */
    data: XOR<CertificateDeploymentUpdateManyMutationInput, CertificateDeploymentUncheckedUpdateManyInput>
    /**
     * Filter which CertificateDeployments to update
     */
    where?: CertificateDeploymentWhereInput
  }

  /**
   * CertificateDeployment upsert
   */
  export type CertificateDeploymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * The filter to search for the CertificateDeployment to update in case it exists.
     */
    where: CertificateDeploymentWhereUniqueInput
    /**
     * In case the CertificateDeployment found by the `where` argument doesn't exist, create a new CertificateDeployment with this data.
     */
    create: XOR<CertificateDeploymentCreateInput, CertificateDeploymentUncheckedCreateInput>
    /**
     * In case the CertificateDeployment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificateDeploymentUpdateInput, CertificateDeploymentUncheckedUpdateInput>
  }

  /**
   * CertificateDeployment delete
   */
  export type CertificateDeploymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
    /**
     * Filter which CertificateDeployment to delete.
     */
    where: CertificateDeploymentWhereUniqueInput
  }

  /**
   * CertificateDeployment deleteMany
   */
  export type CertificateDeploymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CertificateDeployments to delete
     */
    where?: CertificateDeploymentWhereInput
  }

  /**
   * CertificateDeployment without action
   */
  export type CertificateDeploymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CertificateDeployment
     */
    select?: CertificateDeploymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificateDeploymentInclude<ExtArgs> | null
  }


  /**
   * Model AcmeAccount
   */

  export type AggregateAcmeAccount = {
    _count: AcmeAccountCountAggregateOutputType | null
    _min: AcmeAccountMinAggregateOutputType | null
    _max: AcmeAccountMaxAggregateOutputType | null
  }

  export type AcmeAccountMinAggregateOutputType = {
    id: string | null
    email: string | null
    accountKey: string | null
    accountUrl: string | null
    directoryUrl: string | null
    serverName: string | null
    status: string | null
    termsAccepted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcmeAccountMaxAggregateOutputType = {
    id: string | null
    email: string | null
    accountKey: string | null
    accountUrl: string | null
    directoryUrl: string | null
    serverName: string | null
    status: string | null
    termsAccepted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcmeAccountCountAggregateOutputType = {
    id: number
    email: number
    accountKey: number
    accountUrl: number
    directoryUrl: number
    serverName: number
    status: number
    termsAccepted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcmeAccountMinAggregateInputType = {
    id?: true
    email?: true
    accountKey?: true
    accountUrl?: true
    directoryUrl?: true
    serverName?: true
    status?: true
    termsAccepted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcmeAccountMaxAggregateInputType = {
    id?: true
    email?: true
    accountKey?: true
    accountUrl?: true
    directoryUrl?: true
    serverName?: true
    status?: true
    termsAccepted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcmeAccountCountAggregateInputType = {
    id?: true
    email?: true
    accountKey?: true
    accountUrl?: true
    directoryUrl?: true
    serverName?: true
    status?: true
    termsAccepted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcmeAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcmeAccount to aggregate.
     */
    where?: AcmeAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcmeAccounts to fetch.
     */
    orderBy?: AcmeAccountOrderByWithRelationInput | AcmeAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcmeAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcmeAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcmeAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcmeAccounts
    **/
    _count?: true | AcmeAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcmeAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcmeAccountMaxAggregateInputType
  }

  export type GetAcmeAccountAggregateType<T extends AcmeAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAcmeAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcmeAccount[P]>
      : GetScalarType<T[P], AggregateAcmeAccount[P]>
  }




  export type AcmeAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcmeAccountWhereInput
    orderBy?: AcmeAccountOrderByWithAggregationInput | AcmeAccountOrderByWithAggregationInput[]
    by: AcmeAccountScalarFieldEnum[] | AcmeAccountScalarFieldEnum
    having?: AcmeAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcmeAccountCountAggregateInputType | true
    _min?: AcmeAccountMinAggregateInputType
    _max?: AcmeAccountMaxAggregateInputType
  }

  export type AcmeAccountGroupByOutputType = {
    id: string
    email: string
    accountKey: string
    accountUrl: string
    directoryUrl: string
    serverName: string
    status: string
    termsAccepted: boolean
    createdAt: Date
    updatedAt: Date
    _count: AcmeAccountCountAggregateOutputType | null
    _min: AcmeAccountMinAggregateOutputType | null
    _max: AcmeAccountMaxAggregateOutputType | null
  }

  type GetAcmeAccountGroupByPayload<T extends AcmeAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcmeAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcmeAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcmeAccountGroupByOutputType[P]>
            : GetScalarType<T[P], AcmeAccountGroupByOutputType[P]>
        }
      >
    >


  export type AcmeAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    accountKey?: boolean
    accountUrl?: boolean
    directoryUrl?: boolean
    serverName?: boolean
    status?: boolean
    termsAccepted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["acmeAccount"]>

  export type AcmeAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    accountKey?: boolean
    accountUrl?: boolean
    directoryUrl?: boolean
    serverName?: boolean
    status?: boolean
    termsAccepted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["acmeAccount"]>

  export type AcmeAccountSelectScalar = {
    id?: boolean
    email?: boolean
    accountKey?: boolean
    accountUrl?: boolean
    directoryUrl?: boolean
    serverName?: boolean
    status?: boolean
    termsAccepted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $AcmeAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcmeAccount"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      accountKey: string
      accountUrl: string
      directoryUrl: string
      serverName: string
      status: string
      termsAccepted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["acmeAccount"]>
    composites: {}
  }

  type AcmeAccountGetPayload<S extends boolean | null | undefined | AcmeAccountDefaultArgs> = $Result.GetResult<Prisma.$AcmeAccountPayload, S>

  type AcmeAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AcmeAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AcmeAccountCountAggregateInputType | true
    }

  export interface AcmeAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcmeAccount'], meta: { name: 'AcmeAccount' } }
    /**
     * Find zero or one AcmeAccount that matches the filter.
     * @param {AcmeAccountFindUniqueArgs} args - Arguments to find a AcmeAccount
     * @example
     * // Get one AcmeAccount
     * const acmeAccount = await prisma.acmeAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcmeAccountFindUniqueArgs>(args: SelectSubset<T, AcmeAccountFindUniqueArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AcmeAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AcmeAccountFindUniqueOrThrowArgs} args - Arguments to find a AcmeAccount
     * @example
     * // Get one AcmeAccount
     * const acmeAccount = await prisma.acmeAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcmeAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AcmeAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AcmeAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountFindFirstArgs} args - Arguments to find a AcmeAccount
     * @example
     * // Get one AcmeAccount
     * const acmeAccount = await prisma.acmeAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcmeAccountFindFirstArgs>(args?: SelectSubset<T, AcmeAccountFindFirstArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AcmeAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountFindFirstOrThrowArgs} args - Arguments to find a AcmeAccount
     * @example
     * // Get one AcmeAccount
     * const acmeAccount = await prisma.acmeAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcmeAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AcmeAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AcmeAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcmeAccounts
     * const acmeAccounts = await prisma.acmeAccount.findMany()
     * 
     * // Get first 10 AcmeAccounts
     * const acmeAccounts = await prisma.acmeAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acmeAccountWithIdOnly = await prisma.acmeAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcmeAccountFindManyArgs>(args?: SelectSubset<T, AcmeAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AcmeAccount.
     * @param {AcmeAccountCreateArgs} args - Arguments to create a AcmeAccount.
     * @example
     * // Create one AcmeAccount
     * const AcmeAccount = await prisma.acmeAccount.create({
     *   data: {
     *     // ... data to create a AcmeAccount
     *   }
     * })
     * 
     */
    create<T extends AcmeAccountCreateArgs>(args: SelectSubset<T, AcmeAccountCreateArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AcmeAccounts.
     * @param {AcmeAccountCreateManyArgs} args - Arguments to create many AcmeAccounts.
     * @example
     * // Create many AcmeAccounts
     * const acmeAccount = await prisma.acmeAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcmeAccountCreateManyArgs>(args?: SelectSubset<T, AcmeAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcmeAccounts and returns the data saved in the database.
     * @param {AcmeAccountCreateManyAndReturnArgs} args - Arguments to create many AcmeAccounts.
     * @example
     * // Create many AcmeAccounts
     * const acmeAccount = await prisma.acmeAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcmeAccounts and only return the `id`
     * const acmeAccountWithIdOnly = await prisma.acmeAccount.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcmeAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AcmeAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AcmeAccount.
     * @param {AcmeAccountDeleteArgs} args - Arguments to delete one AcmeAccount.
     * @example
     * // Delete one AcmeAccount
     * const AcmeAccount = await prisma.acmeAccount.delete({
     *   where: {
     *     // ... filter to delete one AcmeAccount
     *   }
     * })
     * 
     */
    delete<T extends AcmeAccountDeleteArgs>(args: SelectSubset<T, AcmeAccountDeleteArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AcmeAccount.
     * @param {AcmeAccountUpdateArgs} args - Arguments to update one AcmeAccount.
     * @example
     * // Update one AcmeAccount
     * const acmeAccount = await prisma.acmeAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcmeAccountUpdateArgs>(args: SelectSubset<T, AcmeAccountUpdateArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AcmeAccounts.
     * @param {AcmeAccountDeleteManyArgs} args - Arguments to filter AcmeAccounts to delete.
     * @example
     * // Delete a few AcmeAccounts
     * const { count } = await prisma.acmeAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcmeAccountDeleteManyArgs>(args?: SelectSubset<T, AcmeAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcmeAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcmeAccounts
     * const acmeAccount = await prisma.acmeAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcmeAccountUpdateManyArgs>(args: SelectSubset<T, AcmeAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcmeAccount.
     * @param {AcmeAccountUpsertArgs} args - Arguments to update or create a AcmeAccount.
     * @example
     * // Update or create a AcmeAccount
     * const acmeAccount = await prisma.acmeAccount.upsert({
     *   create: {
     *     // ... data to create a AcmeAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcmeAccount we want to update
     *   }
     * })
     */
    upsert<T extends AcmeAccountUpsertArgs>(args: SelectSubset<T, AcmeAccountUpsertArgs<ExtArgs>>): Prisma__AcmeAccountClient<$Result.GetResult<Prisma.$AcmeAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AcmeAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountCountArgs} args - Arguments to filter AcmeAccounts to count.
     * @example
     * // Count the number of AcmeAccounts
     * const count = await prisma.acmeAccount.count({
     *   where: {
     *     // ... the filter for the AcmeAccounts we want to count
     *   }
     * })
    **/
    count<T extends AcmeAccountCountArgs>(
      args?: Subset<T, AcmeAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcmeAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcmeAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcmeAccountAggregateArgs>(args: Subset<T, AcmeAccountAggregateArgs>): Prisma.PrismaPromise<GetAcmeAccountAggregateType<T>>

    /**
     * Group by AcmeAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcmeAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcmeAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcmeAccountGroupByArgs['orderBy'] }
        : { orderBy?: AcmeAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcmeAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcmeAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcmeAccount model
   */
  readonly fields: AcmeAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcmeAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcmeAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcmeAccount model
   */ 
  interface AcmeAccountFieldRefs {
    readonly id: FieldRef<"AcmeAccount", 'String'>
    readonly email: FieldRef<"AcmeAccount", 'String'>
    readonly accountKey: FieldRef<"AcmeAccount", 'String'>
    readonly accountUrl: FieldRef<"AcmeAccount", 'String'>
    readonly directoryUrl: FieldRef<"AcmeAccount", 'String'>
    readonly serverName: FieldRef<"AcmeAccount", 'String'>
    readonly status: FieldRef<"AcmeAccount", 'String'>
    readonly termsAccepted: FieldRef<"AcmeAccount", 'Boolean'>
    readonly createdAt: FieldRef<"AcmeAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"AcmeAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcmeAccount findUnique
   */
  export type AcmeAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * Filter, which AcmeAccount to fetch.
     */
    where: AcmeAccountWhereUniqueInput
  }

  /**
   * AcmeAccount findUniqueOrThrow
   */
  export type AcmeAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * Filter, which AcmeAccount to fetch.
     */
    where: AcmeAccountWhereUniqueInput
  }

  /**
   * AcmeAccount findFirst
   */
  export type AcmeAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * Filter, which AcmeAccount to fetch.
     */
    where?: AcmeAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcmeAccounts to fetch.
     */
    orderBy?: AcmeAccountOrderByWithRelationInput | AcmeAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcmeAccounts.
     */
    cursor?: AcmeAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcmeAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcmeAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcmeAccounts.
     */
    distinct?: AcmeAccountScalarFieldEnum | AcmeAccountScalarFieldEnum[]
  }

  /**
   * AcmeAccount findFirstOrThrow
   */
  export type AcmeAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * Filter, which AcmeAccount to fetch.
     */
    where?: AcmeAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcmeAccounts to fetch.
     */
    orderBy?: AcmeAccountOrderByWithRelationInput | AcmeAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcmeAccounts.
     */
    cursor?: AcmeAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcmeAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcmeAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcmeAccounts.
     */
    distinct?: AcmeAccountScalarFieldEnum | AcmeAccountScalarFieldEnum[]
  }

  /**
   * AcmeAccount findMany
   */
  export type AcmeAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * Filter, which AcmeAccounts to fetch.
     */
    where?: AcmeAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcmeAccounts to fetch.
     */
    orderBy?: AcmeAccountOrderByWithRelationInput | AcmeAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcmeAccounts.
     */
    cursor?: AcmeAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcmeAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcmeAccounts.
     */
    skip?: number
    distinct?: AcmeAccountScalarFieldEnum | AcmeAccountScalarFieldEnum[]
  }

  /**
   * AcmeAccount create
   */
  export type AcmeAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * The data needed to create a AcmeAccount.
     */
    data: XOR<AcmeAccountCreateInput, AcmeAccountUncheckedCreateInput>
  }

  /**
   * AcmeAccount createMany
   */
  export type AcmeAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcmeAccounts.
     */
    data: AcmeAccountCreateManyInput | AcmeAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcmeAccount createManyAndReturn
   */
  export type AcmeAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AcmeAccounts.
     */
    data: AcmeAccountCreateManyInput | AcmeAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcmeAccount update
   */
  export type AcmeAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * The data needed to update a AcmeAccount.
     */
    data: XOR<AcmeAccountUpdateInput, AcmeAccountUncheckedUpdateInput>
    /**
     * Choose, which AcmeAccount to update.
     */
    where: AcmeAccountWhereUniqueInput
  }

  /**
   * AcmeAccount updateMany
   */
  export type AcmeAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcmeAccounts.
     */
    data: XOR<AcmeAccountUpdateManyMutationInput, AcmeAccountUncheckedUpdateManyInput>
    /**
     * Filter which AcmeAccounts to update
     */
    where?: AcmeAccountWhereInput
  }

  /**
   * AcmeAccount upsert
   */
  export type AcmeAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * The filter to search for the AcmeAccount to update in case it exists.
     */
    where: AcmeAccountWhereUniqueInput
    /**
     * In case the AcmeAccount found by the `where` argument doesn't exist, create a new AcmeAccount with this data.
     */
    create: XOR<AcmeAccountCreateInput, AcmeAccountUncheckedCreateInput>
    /**
     * In case the AcmeAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcmeAccountUpdateInput, AcmeAccountUncheckedUpdateInput>
  }

  /**
   * AcmeAccount delete
   */
  export type AcmeAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
    /**
     * Filter which AcmeAccount to delete.
     */
    where: AcmeAccountWhereUniqueInput
  }

  /**
   * AcmeAccount deleteMany
   */
  export type AcmeAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcmeAccounts to delete
     */
    where?: AcmeAccountWhereInput
  }

  /**
   * AcmeAccount without action
   */
  export type AcmeAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcmeAccount
     */
    select?: AcmeAccountSelect<ExtArgs> | null
  }


  /**
   * Model Plugin
   */

  export type AggregatePlugin = {
    _count: PluginCountAggregateOutputType | null
    _min: PluginMinAggregateOutputType | null
    _max: PluginMaxAggregateOutputType | null
  }

  export type PluginMinAggregateOutputType = {
    id: string | null
    name: string | null
    version: string | null
    description: string | null
    enabled: boolean | null
    filePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PluginMaxAggregateOutputType = {
    id: string | null
    name: string | null
    version: string | null
    description: string | null
    enabled: boolean | null
    filePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PluginCountAggregateOutputType = {
    id: number
    name: number
    version: number
    description: number
    enabled: number
    config: number
    hooks: number
    filePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PluginMinAggregateInputType = {
    id?: true
    name?: true
    version?: true
    description?: true
    enabled?: true
    filePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PluginMaxAggregateInputType = {
    id?: true
    name?: true
    version?: true
    description?: true
    enabled?: true
    filePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PluginCountAggregateInputType = {
    id?: true
    name?: true
    version?: true
    description?: true
    enabled?: true
    config?: true
    hooks?: true
    filePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PluginAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plugin to aggregate.
     */
    where?: PluginWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plugins to fetch.
     */
    orderBy?: PluginOrderByWithRelationInput | PluginOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PluginWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plugins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plugins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plugins
    **/
    _count?: true | PluginCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PluginMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PluginMaxAggregateInputType
  }

  export type GetPluginAggregateType<T extends PluginAggregateArgs> = {
        [P in keyof T & keyof AggregatePlugin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlugin[P]>
      : GetScalarType<T[P], AggregatePlugin[P]>
  }




  export type PluginGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PluginWhereInput
    orderBy?: PluginOrderByWithAggregationInput | PluginOrderByWithAggregationInput[]
    by: PluginScalarFieldEnum[] | PluginScalarFieldEnum
    having?: PluginScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PluginCountAggregateInputType | true
    _min?: PluginMinAggregateInputType
    _max?: PluginMaxAggregateInputType
  }

  export type PluginGroupByOutputType = {
    id: string
    name: string
    version: string
    description: string | null
    enabled: boolean
    config: JsonValue | null
    hooks: JsonValue | null
    filePath: string | null
    createdAt: Date
    updatedAt: Date
    _count: PluginCountAggregateOutputType | null
    _min: PluginMinAggregateOutputType | null
    _max: PluginMaxAggregateOutputType | null
  }

  type GetPluginGroupByPayload<T extends PluginGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PluginGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PluginGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PluginGroupByOutputType[P]>
            : GetScalarType<T[P], PluginGroupByOutputType[P]>
        }
      >
    >


  export type PluginSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    version?: boolean
    description?: boolean
    enabled?: boolean
    config?: boolean
    hooks?: boolean
    filePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plugin"]>

  export type PluginSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    version?: boolean
    description?: boolean
    enabled?: boolean
    config?: boolean
    hooks?: boolean
    filePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plugin"]>

  export type PluginSelectScalar = {
    id?: boolean
    name?: boolean
    version?: boolean
    description?: boolean
    enabled?: boolean
    config?: boolean
    hooks?: boolean
    filePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PluginPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plugin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      version: string
      description: string | null
      enabled: boolean
      config: Prisma.JsonValue | null
      hooks: Prisma.JsonValue | null
      filePath: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plugin"]>
    composites: {}
  }

  type PluginGetPayload<S extends boolean | null | undefined | PluginDefaultArgs> = $Result.GetResult<Prisma.$PluginPayload, S>

  type PluginCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PluginFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PluginCountAggregateInputType | true
    }

  export interface PluginDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plugin'], meta: { name: 'Plugin' } }
    /**
     * Find zero or one Plugin that matches the filter.
     * @param {PluginFindUniqueArgs} args - Arguments to find a Plugin
     * @example
     * // Get one Plugin
     * const plugin = await prisma.plugin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PluginFindUniqueArgs>(args: SelectSubset<T, PluginFindUniqueArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Plugin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PluginFindUniqueOrThrowArgs} args - Arguments to find a Plugin
     * @example
     * // Get one Plugin
     * const plugin = await prisma.plugin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PluginFindUniqueOrThrowArgs>(args: SelectSubset<T, PluginFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Plugin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginFindFirstArgs} args - Arguments to find a Plugin
     * @example
     * // Get one Plugin
     * const plugin = await prisma.plugin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PluginFindFirstArgs>(args?: SelectSubset<T, PluginFindFirstArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Plugin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginFindFirstOrThrowArgs} args - Arguments to find a Plugin
     * @example
     * // Get one Plugin
     * const plugin = await prisma.plugin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PluginFindFirstOrThrowArgs>(args?: SelectSubset<T, PluginFindFirstOrThrowArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Plugins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plugins
     * const plugins = await prisma.plugin.findMany()
     * 
     * // Get first 10 Plugins
     * const plugins = await prisma.plugin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pluginWithIdOnly = await prisma.plugin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PluginFindManyArgs>(args?: SelectSubset<T, PluginFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Plugin.
     * @param {PluginCreateArgs} args - Arguments to create a Plugin.
     * @example
     * // Create one Plugin
     * const Plugin = await prisma.plugin.create({
     *   data: {
     *     // ... data to create a Plugin
     *   }
     * })
     * 
     */
    create<T extends PluginCreateArgs>(args: SelectSubset<T, PluginCreateArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Plugins.
     * @param {PluginCreateManyArgs} args - Arguments to create many Plugins.
     * @example
     * // Create many Plugins
     * const plugin = await prisma.plugin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PluginCreateManyArgs>(args?: SelectSubset<T, PluginCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plugins and returns the data saved in the database.
     * @param {PluginCreateManyAndReturnArgs} args - Arguments to create many Plugins.
     * @example
     * // Create many Plugins
     * const plugin = await prisma.plugin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plugins and only return the `id`
     * const pluginWithIdOnly = await prisma.plugin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PluginCreateManyAndReturnArgs>(args?: SelectSubset<T, PluginCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Plugin.
     * @param {PluginDeleteArgs} args - Arguments to delete one Plugin.
     * @example
     * // Delete one Plugin
     * const Plugin = await prisma.plugin.delete({
     *   where: {
     *     // ... filter to delete one Plugin
     *   }
     * })
     * 
     */
    delete<T extends PluginDeleteArgs>(args: SelectSubset<T, PluginDeleteArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Plugin.
     * @param {PluginUpdateArgs} args - Arguments to update one Plugin.
     * @example
     * // Update one Plugin
     * const plugin = await prisma.plugin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PluginUpdateArgs>(args: SelectSubset<T, PluginUpdateArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Plugins.
     * @param {PluginDeleteManyArgs} args - Arguments to filter Plugins to delete.
     * @example
     * // Delete a few Plugins
     * const { count } = await prisma.plugin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PluginDeleteManyArgs>(args?: SelectSubset<T, PluginDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plugins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plugins
     * const plugin = await prisma.plugin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PluginUpdateManyArgs>(args: SelectSubset<T, PluginUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Plugin.
     * @param {PluginUpsertArgs} args - Arguments to update or create a Plugin.
     * @example
     * // Update or create a Plugin
     * const plugin = await prisma.plugin.upsert({
     *   create: {
     *     // ... data to create a Plugin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plugin we want to update
     *   }
     * })
     */
    upsert<T extends PluginUpsertArgs>(args: SelectSubset<T, PluginUpsertArgs<ExtArgs>>): Prisma__PluginClient<$Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Plugins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginCountArgs} args - Arguments to filter Plugins to count.
     * @example
     * // Count the number of Plugins
     * const count = await prisma.plugin.count({
     *   where: {
     *     // ... the filter for the Plugins we want to count
     *   }
     * })
    **/
    count<T extends PluginCountArgs>(
      args?: Subset<T, PluginCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PluginCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plugin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PluginAggregateArgs>(args: Subset<T, PluginAggregateArgs>): Prisma.PrismaPromise<GetPluginAggregateType<T>>

    /**
     * Group by Plugin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PluginGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PluginGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PluginGroupByArgs['orderBy'] }
        : { orderBy?: PluginGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PluginGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plugin model
   */
  readonly fields: PluginFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plugin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PluginClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plugin model
   */ 
  interface PluginFieldRefs {
    readonly id: FieldRef<"Plugin", 'String'>
    readonly name: FieldRef<"Plugin", 'String'>
    readonly version: FieldRef<"Plugin", 'String'>
    readonly description: FieldRef<"Plugin", 'String'>
    readonly enabled: FieldRef<"Plugin", 'Boolean'>
    readonly config: FieldRef<"Plugin", 'Json'>
    readonly hooks: FieldRef<"Plugin", 'Json'>
    readonly filePath: FieldRef<"Plugin", 'String'>
    readonly createdAt: FieldRef<"Plugin", 'DateTime'>
    readonly updatedAt: FieldRef<"Plugin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plugin findUnique
   */
  export type PluginFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * Filter, which Plugin to fetch.
     */
    where: PluginWhereUniqueInput
  }

  /**
   * Plugin findUniqueOrThrow
   */
  export type PluginFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * Filter, which Plugin to fetch.
     */
    where: PluginWhereUniqueInput
  }

  /**
   * Plugin findFirst
   */
  export type PluginFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * Filter, which Plugin to fetch.
     */
    where?: PluginWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plugins to fetch.
     */
    orderBy?: PluginOrderByWithRelationInput | PluginOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plugins.
     */
    cursor?: PluginWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plugins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plugins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plugins.
     */
    distinct?: PluginScalarFieldEnum | PluginScalarFieldEnum[]
  }

  /**
   * Plugin findFirstOrThrow
   */
  export type PluginFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * Filter, which Plugin to fetch.
     */
    where?: PluginWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plugins to fetch.
     */
    orderBy?: PluginOrderByWithRelationInput | PluginOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plugins.
     */
    cursor?: PluginWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plugins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plugins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plugins.
     */
    distinct?: PluginScalarFieldEnum | PluginScalarFieldEnum[]
  }

  /**
   * Plugin findMany
   */
  export type PluginFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * Filter, which Plugins to fetch.
     */
    where?: PluginWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plugins to fetch.
     */
    orderBy?: PluginOrderByWithRelationInput | PluginOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plugins.
     */
    cursor?: PluginWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plugins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plugins.
     */
    skip?: number
    distinct?: PluginScalarFieldEnum | PluginScalarFieldEnum[]
  }

  /**
   * Plugin create
   */
  export type PluginCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * The data needed to create a Plugin.
     */
    data: XOR<PluginCreateInput, PluginUncheckedCreateInput>
  }

  /**
   * Plugin createMany
   */
  export type PluginCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plugins.
     */
    data: PluginCreateManyInput | PluginCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plugin createManyAndReturn
   */
  export type PluginCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Plugins.
     */
    data: PluginCreateManyInput | PluginCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plugin update
   */
  export type PluginUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * The data needed to update a Plugin.
     */
    data: XOR<PluginUpdateInput, PluginUncheckedUpdateInput>
    /**
     * Choose, which Plugin to update.
     */
    where: PluginWhereUniqueInput
  }

  /**
   * Plugin updateMany
   */
  export type PluginUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plugins.
     */
    data: XOR<PluginUpdateManyMutationInput, PluginUncheckedUpdateManyInput>
    /**
     * Filter which Plugins to update
     */
    where?: PluginWhereInput
  }

  /**
   * Plugin upsert
   */
  export type PluginUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * The filter to search for the Plugin to update in case it exists.
     */
    where: PluginWhereUniqueInput
    /**
     * In case the Plugin found by the `where` argument doesn't exist, create a new Plugin with this data.
     */
    create: XOR<PluginCreateInput, PluginUncheckedCreateInput>
    /**
     * In case the Plugin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PluginUpdateInput, PluginUncheckedUpdateInput>
  }

  /**
   * Plugin delete
   */
  export type PluginDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
    /**
     * Filter which Plugin to delete.
     */
    where: PluginWhereUniqueInput
  }

  /**
   * Plugin deleteMany
   */
  export type PluginDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plugins to delete
     */
    where?: PluginWhereInput
  }

  /**
   * Plugin without action
   */
  export type PluginDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plugin
     */
    select?: PluginSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    type: 'type',
    config: 'config',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ServiceLogScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    message: 'message',
    level: 'level',
    source: 'source',
    timestamp: 'timestamp'
  };

  export type ServiceLogScalarFieldEnum = (typeof ServiceLogScalarFieldEnum)[keyof typeof ServiceLogScalarFieldEnum]


  export const ServicePm2ConfigScalarFieldEnum: {
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

  export type ServicePm2ConfigScalarFieldEnum = (typeof ServicePm2ConfigScalarFieldEnum)[keyof typeof ServicePm2ConfigScalarFieldEnum]


  export const PackageActionScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type PackageActionScalarFieldEnum = (typeof PackageActionScalarFieldEnum)[keyof typeof PackageActionScalarFieldEnum]


  export const LogEntryScalarFieldEnum: {
    id: 'id',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type LogEntryScalarFieldEnum = (typeof LogEntryScalarFieldEnum)[keyof typeof LogEntryScalarFieldEnum]


  export const MetricSampleScalarFieldEnum: {
    id: 'id',
    value: 'value',
    takenAt: 'takenAt'
  };

  export type MetricSampleScalarFieldEnum = (typeof MetricSampleScalarFieldEnum)[keyof typeof MetricSampleScalarFieldEnum]


  export const DomainScalarFieldEnum: {
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

  export type DomainScalarFieldEnum = (typeof DomainScalarFieldEnum)[keyof typeof DomainScalarFieldEnum]


  export const CertificateScalarFieldEnum: {
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

  export type CertificateScalarFieldEnum = (typeof CertificateScalarFieldEnum)[keyof typeof CertificateScalarFieldEnum]


  export const CertificateRenewalScalarFieldEnum: {
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

  export type CertificateRenewalScalarFieldEnum = (typeof CertificateRenewalScalarFieldEnum)[keyof typeof CertificateRenewalScalarFieldEnum]


  export const CertificateDeploymentScalarFieldEnum: {
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

  export type CertificateDeploymentScalarFieldEnum = (typeof CertificateDeploymentScalarFieldEnum)[keyof typeof CertificateDeploymentScalarFieldEnum]


  export const AcmeAccountScalarFieldEnum: {
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

  export type AcmeAccountScalarFieldEnum = (typeof AcmeAccountScalarFieldEnum)[keyof typeof AcmeAccountScalarFieldEnum]


  export const PluginScalarFieldEnum: {
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

  export type PluginScalarFieldEnum = (typeof PluginScalarFieldEnum)[keyof typeof PluginScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'ServiceStatus[]'
   */
  export type ListEnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus[]'>
    


  /**
   * Reference to a field of type 'LogLevel'
   */
  export type EnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel'>
    


  /**
   * Reference to a field of type 'LogLevel[]'
   */
  export type ListEnumLogLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogLevel[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'CertificateStatus'
   */
  export type EnumCertificateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificateStatus'>
    


  /**
   * Reference to a field of type 'CertificateStatus[]'
   */
  export type ListEnumCertificateStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificateStatus[]'>
    


  /**
   * Reference to a field of type 'RenewalStatus'
   */
  export type EnumRenewalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RenewalStatus'>
    


  /**
   * Reference to a field of type 'RenewalStatus[]'
   */
  export type ListEnumRenewalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RenewalStatus[]'>
    


  /**
   * Reference to a field of type 'DeploymentStatus'
   */
  export type EnumDeploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeploymentStatus'>
    


  /**
   * Reference to a field of type 'DeploymentStatus[]'
   */
  export type ListEnumDeploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeploymentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    type?: StringFilter<"Service"> | string
    config?: JsonNullableFilter<"Service">
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    logs?: ServiceLogListRelationFilter
    pm2Config?: XOR<ServicePm2ConfigNullableRelationFilter, ServicePm2ConfigWhereInput> | null
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    config?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    logs?: ServiceLogOrderByRelationAggregateInput
    pm2Config?: ServicePm2ConfigOrderByWithRelationInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    description?: StringNullableFilter<"Service"> | string | null
    type?: StringFilter<"Service"> | string
    config?: JsonNullableFilter<"Service">
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    logs?: ServiceLogListRelationFilter
    pm2Config?: XOR<ServicePm2ConfigNullableRelationFilter, ServicePm2ConfigWhereInput> | null
  }, "id" | "name">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrder
    config?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    type?: StringWithAggregatesFilter<"Service"> | string
    config?: JsonNullableWithAggregatesFilter<"Service">
    status?: EnumServiceStatusWithAggregatesFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type ServiceLogWhereInput = {
    AND?: ServiceLogWhereInput | ServiceLogWhereInput[]
    OR?: ServiceLogWhereInput[]
    NOT?: ServiceLogWhereInput | ServiceLogWhereInput[]
    id?: StringFilter<"ServiceLog"> | string
    serviceId?: StringFilter<"ServiceLog"> | string
    message?: StringFilter<"ServiceLog"> | string
    level?: EnumLogLevelFilter<"ServiceLog"> | $Enums.LogLevel
    source?: StringNullableFilter<"ServiceLog"> | string | null
    timestamp?: DateTimeFilter<"ServiceLog"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }

  export type ServiceLogOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    message?: SortOrder
    level?: SortOrder
    source?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServiceLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceLogWhereInput | ServiceLogWhereInput[]
    OR?: ServiceLogWhereInput[]
    NOT?: ServiceLogWhereInput | ServiceLogWhereInput[]
    serviceId?: StringFilter<"ServiceLog"> | string
    message?: StringFilter<"ServiceLog"> | string
    level?: EnumLogLevelFilter<"ServiceLog"> | $Enums.LogLevel
    source?: StringNullableFilter<"ServiceLog"> | string | null
    timestamp?: DateTimeFilter<"ServiceLog"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }, "id">

  export type ServiceLogOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    message?: SortOrder
    level?: SortOrder
    source?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: ServiceLogCountOrderByAggregateInput
    _max?: ServiceLogMaxOrderByAggregateInput
    _min?: ServiceLogMinOrderByAggregateInput
  }

  export type ServiceLogScalarWhereWithAggregatesInput = {
    AND?: ServiceLogScalarWhereWithAggregatesInput | ServiceLogScalarWhereWithAggregatesInput[]
    OR?: ServiceLogScalarWhereWithAggregatesInput[]
    NOT?: ServiceLogScalarWhereWithAggregatesInput | ServiceLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceLog"> | string
    serviceId?: StringWithAggregatesFilter<"ServiceLog"> | string
    message?: StringWithAggregatesFilter<"ServiceLog"> | string
    level?: EnumLogLevelWithAggregatesFilter<"ServiceLog"> | $Enums.LogLevel
    source?: StringNullableWithAggregatesFilter<"ServiceLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"ServiceLog"> | Date | string
  }

  export type ServicePm2ConfigWhereInput = {
    AND?: ServicePm2ConfigWhereInput | ServicePm2ConfigWhereInput[]
    OR?: ServicePm2ConfigWhereInput[]
    NOT?: ServicePm2ConfigWhereInput | ServicePm2ConfigWhereInput[]
    id?: StringFilter<"ServicePm2Config"> | string
    serviceId?: StringFilter<"ServicePm2Config"> | string
    script?: StringFilter<"ServicePm2Config"> | string
    name?: StringFilter<"ServicePm2Config"> | string
    cwd?: StringNullableFilter<"ServicePm2Config"> | string | null
    args?: StringNullableFilter<"ServicePm2Config"> | string | null
    interpreter?: StringNullableFilter<"ServicePm2Config"> | string | null
    interpreterArgs?: StringNullableFilter<"ServicePm2Config"> | string | null
    instances?: IntFilter<"ServicePm2Config"> | number
    execMode?: StringFilter<"ServicePm2Config"> | string
    env?: JsonNullableFilter<"ServicePm2Config">
    envProduction?: JsonNullableFilter<"ServicePm2Config">
    envDevelopment?: JsonNullableFilter<"ServicePm2Config">
    logFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    outFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    errorFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    logDateFormat?: StringNullableFilter<"ServicePm2Config"> | string | null
    pidFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    minUptimeSeconds?: IntNullableFilter<"ServicePm2Config"> | number | null
    maxRestarts?: IntNullableFilter<"ServicePm2Config"> | number | null
    restartDelay?: IntNullableFilter<"ServicePm2Config"> | number | null
    watch?: BoolFilter<"ServicePm2Config"> | boolean
    watchOptions?: JsonNullableFilter<"ServicePm2Config">
    ignoreWatch?: StringNullableFilter<"ServicePm2Config"> | string | null
    maxMemoryRestart?: StringNullableFilter<"ServicePm2Config"> | string | null
    killTimeout?: IntNullableFilter<"ServicePm2Config"> | number | null
    waitReady?: BoolFilter<"ServicePm2Config"> | boolean
    listenTimeout?: IntNullableFilter<"ServicePm2Config"> | number | null
    createdAt?: DateTimeFilter<"ServicePm2Config"> | Date | string
    updatedAt?: DateTimeFilter<"ServicePm2Config"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }

  export type ServicePm2ConfigOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    script?: SortOrder
    name?: SortOrder
    cwd?: SortOrderInput | SortOrder
    args?: SortOrderInput | SortOrder
    interpreter?: SortOrderInput | SortOrder
    interpreterArgs?: SortOrderInput | SortOrder
    instances?: SortOrder
    execMode?: SortOrder
    env?: SortOrderInput | SortOrder
    envProduction?: SortOrderInput | SortOrder
    envDevelopment?: SortOrderInput | SortOrder
    logFile?: SortOrderInput | SortOrder
    outFile?: SortOrderInput | SortOrder
    errorFile?: SortOrderInput | SortOrder
    logDateFormat?: SortOrderInput | SortOrder
    pidFile?: SortOrderInput | SortOrder
    minUptimeSeconds?: SortOrderInput | SortOrder
    maxRestarts?: SortOrderInput | SortOrder
    restartDelay?: SortOrderInput | SortOrder
    watch?: SortOrder
    watchOptions?: SortOrderInput | SortOrder
    ignoreWatch?: SortOrderInput | SortOrder
    maxMemoryRestart?: SortOrderInput | SortOrder
    killTimeout?: SortOrderInput | SortOrder
    waitReady?: SortOrder
    listenTimeout?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServicePm2ConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    serviceId?: string
    AND?: ServicePm2ConfigWhereInput | ServicePm2ConfigWhereInput[]
    OR?: ServicePm2ConfigWhereInput[]
    NOT?: ServicePm2ConfigWhereInput | ServicePm2ConfigWhereInput[]
    script?: StringFilter<"ServicePm2Config"> | string
    name?: StringFilter<"ServicePm2Config"> | string
    cwd?: StringNullableFilter<"ServicePm2Config"> | string | null
    args?: StringNullableFilter<"ServicePm2Config"> | string | null
    interpreter?: StringNullableFilter<"ServicePm2Config"> | string | null
    interpreterArgs?: StringNullableFilter<"ServicePm2Config"> | string | null
    instances?: IntFilter<"ServicePm2Config"> | number
    execMode?: StringFilter<"ServicePm2Config"> | string
    env?: JsonNullableFilter<"ServicePm2Config">
    envProduction?: JsonNullableFilter<"ServicePm2Config">
    envDevelopment?: JsonNullableFilter<"ServicePm2Config">
    logFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    outFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    errorFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    logDateFormat?: StringNullableFilter<"ServicePm2Config"> | string | null
    pidFile?: StringNullableFilter<"ServicePm2Config"> | string | null
    minUptimeSeconds?: IntNullableFilter<"ServicePm2Config"> | number | null
    maxRestarts?: IntNullableFilter<"ServicePm2Config"> | number | null
    restartDelay?: IntNullableFilter<"ServicePm2Config"> | number | null
    watch?: BoolFilter<"ServicePm2Config"> | boolean
    watchOptions?: JsonNullableFilter<"ServicePm2Config">
    ignoreWatch?: StringNullableFilter<"ServicePm2Config"> | string | null
    maxMemoryRestart?: StringNullableFilter<"ServicePm2Config"> | string | null
    killTimeout?: IntNullableFilter<"ServicePm2Config"> | number | null
    waitReady?: BoolFilter<"ServicePm2Config"> | boolean
    listenTimeout?: IntNullableFilter<"ServicePm2Config"> | number | null
    createdAt?: DateTimeFilter<"ServicePm2Config"> | Date | string
    updatedAt?: DateTimeFilter<"ServicePm2Config"> | Date | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
  }, "id" | "serviceId">

  export type ServicePm2ConfigOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    script?: SortOrder
    name?: SortOrder
    cwd?: SortOrderInput | SortOrder
    args?: SortOrderInput | SortOrder
    interpreter?: SortOrderInput | SortOrder
    interpreterArgs?: SortOrderInput | SortOrder
    instances?: SortOrder
    execMode?: SortOrder
    env?: SortOrderInput | SortOrder
    envProduction?: SortOrderInput | SortOrder
    envDevelopment?: SortOrderInput | SortOrder
    logFile?: SortOrderInput | SortOrder
    outFile?: SortOrderInput | SortOrder
    errorFile?: SortOrderInput | SortOrder
    logDateFormat?: SortOrderInput | SortOrder
    pidFile?: SortOrderInput | SortOrder
    minUptimeSeconds?: SortOrderInput | SortOrder
    maxRestarts?: SortOrderInput | SortOrder
    restartDelay?: SortOrderInput | SortOrder
    watch?: SortOrder
    watchOptions?: SortOrderInput | SortOrder
    ignoreWatch?: SortOrderInput | SortOrder
    maxMemoryRestart?: SortOrderInput | SortOrder
    killTimeout?: SortOrderInput | SortOrder
    waitReady?: SortOrder
    listenTimeout?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServicePm2ConfigCountOrderByAggregateInput
    _avg?: ServicePm2ConfigAvgOrderByAggregateInput
    _max?: ServicePm2ConfigMaxOrderByAggregateInput
    _min?: ServicePm2ConfigMinOrderByAggregateInput
    _sum?: ServicePm2ConfigSumOrderByAggregateInput
  }

  export type ServicePm2ConfigScalarWhereWithAggregatesInput = {
    AND?: ServicePm2ConfigScalarWhereWithAggregatesInput | ServicePm2ConfigScalarWhereWithAggregatesInput[]
    OR?: ServicePm2ConfigScalarWhereWithAggregatesInput[]
    NOT?: ServicePm2ConfigScalarWhereWithAggregatesInput | ServicePm2ConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServicePm2Config"> | string
    serviceId?: StringWithAggregatesFilter<"ServicePm2Config"> | string
    script?: StringWithAggregatesFilter<"ServicePm2Config"> | string
    name?: StringWithAggregatesFilter<"ServicePm2Config"> | string
    cwd?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    args?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    interpreter?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    interpreterArgs?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    instances?: IntWithAggregatesFilter<"ServicePm2Config"> | number
    execMode?: StringWithAggregatesFilter<"ServicePm2Config"> | string
    env?: JsonNullableWithAggregatesFilter<"ServicePm2Config">
    envProduction?: JsonNullableWithAggregatesFilter<"ServicePm2Config">
    envDevelopment?: JsonNullableWithAggregatesFilter<"ServicePm2Config">
    logFile?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    outFile?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    errorFile?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    logDateFormat?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    pidFile?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    minUptimeSeconds?: IntNullableWithAggregatesFilter<"ServicePm2Config"> | number | null
    maxRestarts?: IntNullableWithAggregatesFilter<"ServicePm2Config"> | number | null
    restartDelay?: IntNullableWithAggregatesFilter<"ServicePm2Config"> | number | null
    watch?: BoolWithAggregatesFilter<"ServicePm2Config"> | boolean
    watchOptions?: JsonNullableWithAggregatesFilter<"ServicePm2Config">
    ignoreWatch?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    maxMemoryRestart?: StringNullableWithAggregatesFilter<"ServicePm2Config"> | string | null
    killTimeout?: IntNullableWithAggregatesFilter<"ServicePm2Config"> | number | null
    waitReady?: BoolWithAggregatesFilter<"ServicePm2Config"> | boolean
    listenTimeout?: IntNullableWithAggregatesFilter<"ServicePm2Config"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ServicePm2Config"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServicePm2Config"> | Date | string
  }

  export type PackageActionWhereInput = {
    AND?: PackageActionWhereInput | PackageActionWhereInput[]
    OR?: PackageActionWhereInput[]
    NOT?: PackageActionWhereInput | PackageActionWhereInput[]
    id?: StringFilter<"PackageAction"> | string
    name?: StringFilter<"PackageAction"> | string
  }

  export type PackageActionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type PackageActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PackageActionWhereInput | PackageActionWhereInput[]
    OR?: PackageActionWhereInput[]
    NOT?: PackageActionWhereInput | PackageActionWhereInput[]
    name?: StringFilter<"PackageAction"> | string
  }, "id">

  export type PackageActionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: PackageActionCountOrderByAggregateInput
    _max?: PackageActionMaxOrderByAggregateInput
    _min?: PackageActionMinOrderByAggregateInput
  }

  export type PackageActionScalarWhereWithAggregatesInput = {
    AND?: PackageActionScalarWhereWithAggregatesInput | PackageActionScalarWhereWithAggregatesInput[]
    OR?: PackageActionScalarWhereWithAggregatesInput[]
    NOT?: PackageActionScalarWhereWithAggregatesInput | PackageActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PackageAction"> | string
    name?: StringWithAggregatesFilter<"PackageAction"> | string
  }

  export type LogEntryWhereInput = {
    AND?: LogEntryWhereInput | LogEntryWhereInput[]
    OR?: LogEntryWhereInput[]
    NOT?: LogEntryWhereInput | LogEntryWhereInput[]
    id?: StringFilter<"LogEntry"> | string
    message?: StringFilter<"LogEntry"> | string
    createdAt?: DateTimeFilter<"LogEntry"> | Date | string
  }

  export type LogEntryOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type LogEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LogEntryWhereInput | LogEntryWhereInput[]
    OR?: LogEntryWhereInput[]
    NOT?: LogEntryWhereInput | LogEntryWhereInput[]
    message?: StringFilter<"LogEntry"> | string
    createdAt?: DateTimeFilter<"LogEntry"> | Date | string
  }, "id">

  export type LogEntryOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _count?: LogEntryCountOrderByAggregateInput
    _max?: LogEntryMaxOrderByAggregateInput
    _min?: LogEntryMinOrderByAggregateInput
  }

  export type LogEntryScalarWhereWithAggregatesInput = {
    AND?: LogEntryScalarWhereWithAggregatesInput | LogEntryScalarWhereWithAggregatesInput[]
    OR?: LogEntryScalarWhereWithAggregatesInput[]
    NOT?: LogEntryScalarWhereWithAggregatesInput | LogEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LogEntry"> | string
    message?: StringWithAggregatesFilter<"LogEntry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LogEntry"> | Date | string
  }

  export type MetricSampleWhereInput = {
    AND?: MetricSampleWhereInput | MetricSampleWhereInput[]
    OR?: MetricSampleWhereInput[]
    NOT?: MetricSampleWhereInput | MetricSampleWhereInput[]
    id?: StringFilter<"MetricSample"> | string
    value?: FloatFilter<"MetricSample"> | number
    takenAt?: DateTimeFilter<"MetricSample"> | Date | string
  }

  export type MetricSampleOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    takenAt?: SortOrder
  }

  export type MetricSampleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MetricSampleWhereInput | MetricSampleWhereInput[]
    OR?: MetricSampleWhereInput[]
    NOT?: MetricSampleWhereInput | MetricSampleWhereInput[]
    value?: FloatFilter<"MetricSample"> | number
    takenAt?: DateTimeFilter<"MetricSample"> | Date | string
  }, "id">

  export type MetricSampleOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    takenAt?: SortOrder
    _count?: MetricSampleCountOrderByAggregateInput
    _avg?: MetricSampleAvgOrderByAggregateInput
    _max?: MetricSampleMaxOrderByAggregateInput
    _min?: MetricSampleMinOrderByAggregateInput
    _sum?: MetricSampleSumOrderByAggregateInput
  }

  export type MetricSampleScalarWhereWithAggregatesInput = {
    AND?: MetricSampleScalarWhereWithAggregatesInput | MetricSampleScalarWhereWithAggregatesInput[]
    OR?: MetricSampleScalarWhereWithAggregatesInput[]
    NOT?: MetricSampleScalarWhereWithAggregatesInput | MetricSampleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetricSample"> | string
    value?: FloatWithAggregatesFilter<"MetricSample"> | number
    takenAt?: DateTimeWithAggregatesFilter<"MetricSample"> | Date | string
  }

  export type DomainWhereInput = {
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    id?: StringFilter<"Domain"> | string
    name?: StringFilter<"Domain"> | string
    wildcard?: BoolFilter<"Domain"> | boolean
    validationMethod?: StringFilter<"Domain"> | string
    challengePlugin?: StringNullableFilter<"Domain"> | string | null
    pluginConfig?: JsonNullableFilter<"Domain">
    isActive?: BoolFilter<"Domain"> | boolean
    lastVerified?: DateTimeNullableFilter<"Domain"> | Date | string | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    certificates?: CertificateListRelationFilter
    renewalJobs?: CertificateRenewalListRelationFilter
  }

  export type DomainOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    wildcard?: SortOrder
    validationMethod?: SortOrder
    challengePlugin?: SortOrderInput | SortOrder
    pluginConfig?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastVerified?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    certificates?: CertificateOrderByRelationAggregateInput
    renewalJobs?: CertificateRenewalOrderByRelationAggregateInput
  }

  export type DomainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    wildcard?: BoolFilter<"Domain"> | boolean
    validationMethod?: StringFilter<"Domain"> | string
    challengePlugin?: StringNullableFilter<"Domain"> | string | null
    pluginConfig?: JsonNullableFilter<"Domain">
    isActive?: BoolFilter<"Domain"> | boolean
    lastVerified?: DateTimeNullableFilter<"Domain"> | Date | string | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    certificates?: CertificateListRelationFilter
    renewalJobs?: CertificateRenewalListRelationFilter
  }, "id" | "name">

  export type DomainOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    wildcard?: SortOrder
    validationMethod?: SortOrder
    challengePlugin?: SortOrderInput | SortOrder
    pluginConfig?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastVerified?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DomainCountOrderByAggregateInput
    _max?: DomainMaxOrderByAggregateInput
    _min?: DomainMinOrderByAggregateInput
  }

  export type DomainScalarWhereWithAggregatesInput = {
    AND?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    OR?: DomainScalarWhereWithAggregatesInput[]
    NOT?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Domain"> | string
    name?: StringWithAggregatesFilter<"Domain"> | string
    wildcard?: BoolWithAggregatesFilter<"Domain"> | boolean
    validationMethod?: StringWithAggregatesFilter<"Domain"> | string
    challengePlugin?: StringNullableWithAggregatesFilter<"Domain"> | string | null
    pluginConfig?: JsonNullableWithAggregatesFilter<"Domain">
    isActive?: BoolWithAggregatesFilter<"Domain"> | boolean
    lastVerified?: DateTimeNullableWithAggregatesFilter<"Domain"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
  }

  export type CertificateWhereInput = {
    AND?: CertificateWhereInput | CertificateWhereInput[]
    OR?: CertificateWhereInput[]
    NOT?: CertificateWhereInput | CertificateWhereInput[]
    id?: StringFilter<"Certificate"> | string
    domainId?: StringFilter<"Certificate"> | string
    subject?: StringFilter<"Certificate"> | string
    altNames?: StringFilter<"Certificate"> | string
    issuer?: StringFilter<"Certificate"> | string
    serial?: StringFilter<"Certificate"> | string
    certPem?: StringFilter<"Certificate"> | string
    chainPem?: StringFilter<"Certificate"> | string
    keyPem?: StringFilter<"Certificate"> | string
    fullchainPem?: StringFilter<"Certificate"> | string
    issuedAt?: DateTimeFilter<"Certificate"> | Date | string
    expiresAt?: DateTimeFilter<"Certificate"> | Date | string
    status?: EnumCertificateStatusFilter<"Certificate"> | $Enums.CertificateStatus
    acmeAccountKey?: StringNullableFilter<"Certificate"> | string | null
    acmeOrderUrl?: StringNullableFilter<"Certificate"> | string | null
    challengeType?: StringFilter<"Certificate"> | string
    createdAt?: DateTimeFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeFilter<"Certificate"> | Date | string
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    deployments?: CertificateDeploymentListRelationFilter
    renewalJobs?: CertificateRenewalListRelationFilter
  }

  export type CertificateOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrder
    subject?: SortOrder
    altNames?: SortOrder
    issuer?: SortOrder
    serial?: SortOrder
    certPem?: SortOrder
    chainPem?: SortOrder
    keyPem?: SortOrder
    fullchainPem?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    acmeAccountKey?: SortOrderInput | SortOrder
    acmeOrderUrl?: SortOrderInput | SortOrder
    challengeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    deployments?: CertificateDeploymentOrderByRelationAggregateInput
    renewalJobs?: CertificateRenewalOrderByRelationAggregateInput
  }

  export type CertificateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CertificateWhereInput | CertificateWhereInput[]
    OR?: CertificateWhereInput[]
    NOT?: CertificateWhereInput | CertificateWhereInput[]
    domainId?: StringFilter<"Certificate"> | string
    subject?: StringFilter<"Certificate"> | string
    altNames?: StringFilter<"Certificate"> | string
    issuer?: StringFilter<"Certificate"> | string
    serial?: StringFilter<"Certificate"> | string
    certPem?: StringFilter<"Certificate"> | string
    chainPem?: StringFilter<"Certificate"> | string
    keyPem?: StringFilter<"Certificate"> | string
    fullchainPem?: StringFilter<"Certificate"> | string
    issuedAt?: DateTimeFilter<"Certificate"> | Date | string
    expiresAt?: DateTimeFilter<"Certificate"> | Date | string
    status?: EnumCertificateStatusFilter<"Certificate"> | $Enums.CertificateStatus
    acmeAccountKey?: StringNullableFilter<"Certificate"> | string | null
    acmeOrderUrl?: StringNullableFilter<"Certificate"> | string | null
    challengeType?: StringFilter<"Certificate"> | string
    createdAt?: DateTimeFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeFilter<"Certificate"> | Date | string
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    deployments?: CertificateDeploymentListRelationFilter
    renewalJobs?: CertificateRenewalListRelationFilter
  }, "id">

  export type CertificateOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrder
    subject?: SortOrder
    altNames?: SortOrder
    issuer?: SortOrder
    serial?: SortOrder
    certPem?: SortOrder
    chainPem?: SortOrder
    keyPem?: SortOrder
    fullchainPem?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    acmeAccountKey?: SortOrderInput | SortOrder
    acmeOrderUrl?: SortOrderInput | SortOrder
    challengeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CertificateCountOrderByAggregateInput
    _max?: CertificateMaxOrderByAggregateInput
    _min?: CertificateMinOrderByAggregateInput
  }

  export type CertificateScalarWhereWithAggregatesInput = {
    AND?: CertificateScalarWhereWithAggregatesInput | CertificateScalarWhereWithAggregatesInput[]
    OR?: CertificateScalarWhereWithAggregatesInput[]
    NOT?: CertificateScalarWhereWithAggregatesInput | CertificateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Certificate"> | string
    domainId?: StringWithAggregatesFilter<"Certificate"> | string
    subject?: StringWithAggregatesFilter<"Certificate"> | string
    altNames?: StringWithAggregatesFilter<"Certificate"> | string
    issuer?: StringWithAggregatesFilter<"Certificate"> | string
    serial?: StringWithAggregatesFilter<"Certificate"> | string
    certPem?: StringWithAggregatesFilter<"Certificate"> | string
    chainPem?: StringWithAggregatesFilter<"Certificate"> | string
    keyPem?: StringWithAggregatesFilter<"Certificate"> | string
    fullchainPem?: StringWithAggregatesFilter<"Certificate"> | string
    issuedAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    status?: EnumCertificateStatusWithAggregatesFilter<"Certificate"> | $Enums.CertificateStatus
    acmeAccountKey?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    acmeOrderUrl?: StringNullableWithAggregatesFilter<"Certificate"> | string | null
    challengeType?: StringWithAggregatesFilter<"Certificate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Certificate"> | Date | string
  }

  export type CertificateRenewalWhereInput = {
    AND?: CertificateRenewalWhereInput | CertificateRenewalWhereInput[]
    OR?: CertificateRenewalWhereInput[]
    NOT?: CertificateRenewalWhereInput | CertificateRenewalWhereInput[]
    id?: StringFilter<"CertificateRenewal"> | string
    certificateId?: StringFilter<"CertificateRenewal"> | string
    domainId?: StringFilter<"CertificateRenewal"> | string
    scheduledAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    attemptedAt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    nextAttempt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    status?: EnumRenewalStatusFilter<"CertificateRenewal"> | $Enums.RenewalStatus
    attempts?: IntFilter<"CertificateRenewal"> | number
    maxAttempts?: IntFilter<"CertificateRenewal"> | number
    lastError?: StringNullableFilter<"CertificateRenewal"> | string | null
    autoRenewal?: BoolFilter<"CertificateRenewal"> | boolean
    renewalThreshold?: IntFilter<"CertificateRenewal"> | number
    createdAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    certificate?: XOR<CertificateRelationFilter, CertificateWhereInput>
  }

  export type CertificateRenewalOrderByWithRelationInput = {
    id?: SortOrder
    certificateId?: SortOrder
    domainId?: SortOrder
    scheduledAt?: SortOrder
    attemptedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    nextAttempt?: SortOrderInput | SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    autoRenewal?: SortOrder
    renewalThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    certificate?: CertificateOrderByWithRelationInput
  }

  export type CertificateRenewalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CertificateRenewalWhereInput | CertificateRenewalWhereInput[]
    OR?: CertificateRenewalWhereInput[]
    NOT?: CertificateRenewalWhereInput | CertificateRenewalWhereInput[]
    certificateId?: StringFilter<"CertificateRenewal"> | string
    domainId?: StringFilter<"CertificateRenewal"> | string
    scheduledAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    attemptedAt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    nextAttempt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    status?: EnumRenewalStatusFilter<"CertificateRenewal"> | $Enums.RenewalStatus
    attempts?: IntFilter<"CertificateRenewal"> | number
    maxAttempts?: IntFilter<"CertificateRenewal"> | number
    lastError?: StringNullableFilter<"CertificateRenewal"> | string | null
    autoRenewal?: BoolFilter<"CertificateRenewal"> | boolean
    renewalThreshold?: IntFilter<"CertificateRenewal"> | number
    createdAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    certificate?: XOR<CertificateRelationFilter, CertificateWhereInput>
  }, "id">

  export type CertificateRenewalOrderByWithAggregationInput = {
    id?: SortOrder
    certificateId?: SortOrder
    domainId?: SortOrder
    scheduledAt?: SortOrder
    attemptedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    nextAttempt?: SortOrderInput | SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    autoRenewal?: SortOrder
    renewalThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CertificateRenewalCountOrderByAggregateInput
    _avg?: CertificateRenewalAvgOrderByAggregateInput
    _max?: CertificateRenewalMaxOrderByAggregateInput
    _min?: CertificateRenewalMinOrderByAggregateInput
    _sum?: CertificateRenewalSumOrderByAggregateInput
  }

  export type CertificateRenewalScalarWhereWithAggregatesInput = {
    AND?: CertificateRenewalScalarWhereWithAggregatesInput | CertificateRenewalScalarWhereWithAggregatesInput[]
    OR?: CertificateRenewalScalarWhereWithAggregatesInput[]
    NOT?: CertificateRenewalScalarWhereWithAggregatesInput | CertificateRenewalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CertificateRenewal"> | string
    certificateId?: StringWithAggregatesFilter<"CertificateRenewal"> | string
    domainId?: StringWithAggregatesFilter<"CertificateRenewal"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"CertificateRenewal"> | Date | string
    attemptedAt?: DateTimeNullableWithAggregatesFilter<"CertificateRenewal"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CertificateRenewal"> | Date | string | null
    nextAttempt?: DateTimeNullableWithAggregatesFilter<"CertificateRenewal"> | Date | string | null
    status?: EnumRenewalStatusWithAggregatesFilter<"CertificateRenewal"> | $Enums.RenewalStatus
    attempts?: IntWithAggregatesFilter<"CertificateRenewal"> | number
    maxAttempts?: IntWithAggregatesFilter<"CertificateRenewal"> | number
    lastError?: StringNullableWithAggregatesFilter<"CertificateRenewal"> | string | null
    autoRenewal?: BoolWithAggregatesFilter<"CertificateRenewal"> | boolean
    renewalThreshold?: IntWithAggregatesFilter<"CertificateRenewal"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CertificateRenewal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CertificateRenewal"> | Date | string
  }

  export type CertificateDeploymentWhereInput = {
    AND?: CertificateDeploymentWhereInput | CertificateDeploymentWhereInput[]
    OR?: CertificateDeploymentWhereInput[]
    NOT?: CertificateDeploymentWhereInput | CertificateDeploymentWhereInput[]
    id?: StringFilter<"CertificateDeployment"> | string
    certificateId?: StringFilter<"CertificateDeployment"> | string
    targetType?: StringFilter<"CertificateDeployment"> | string
    targetConfig?: JsonFilter<"CertificateDeployment">
    deploymentPath?: StringNullableFilter<"CertificateDeployment"> | string | null
    status?: EnumDeploymentStatusFilter<"CertificateDeployment"> | $Enums.DeploymentStatus
    deployedAt?: DateTimeNullableFilter<"CertificateDeployment"> | Date | string | null
    lastError?: StringNullableFilter<"CertificateDeployment"> | string | null
    pm2RestartRequired?: BoolFilter<"CertificateDeployment"> | boolean
    pm2RestartCompleted?: BoolFilter<"CertificateDeployment"> | boolean
    pm2Services?: StringFilter<"CertificateDeployment"> | string
    createdAt?: DateTimeFilter<"CertificateDeployment"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateDeployment"> | Date | string
    certificate?: XOR<CertificateRelationFilter, CertificateWhereInput>
  }

  export type CertificateDeploymentOrderByWithRelationInput = {
    id?: SortOrder
    certificateId?: SortOrder
    targetType?: SortOrder
    targetConfig?: SortOrder
    deploymentPath?: SortOrderInput | SortOrder
    status?: SortOrder
    deployedAt?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    pm2RestartRequired?: SortOrder
    pm2RestartCompleted?: SortOrder
    pm2Services?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    certificate?: CertificateOrderByWithRelationInput
  }

  export type CertificateDeploymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CertificateDeploymentWhereInput | CertificateDeploymentWhereInput[]
    OR?: CertificateDeploymentWhereInput[]
    NOT?: CertificateDeploymentWhereInput | CertificateDeploymentWhereInput[]
    certificateId?: StringFilter<"CertificateDeployment"> | string
    targetType?: StringFilter<"CertificateDeployment"> | string
    targetConfig?: JsonFilter<"CertificateDeployment">
    deploymentPath?: StringNullableFilter<"CertificateDeployment"> | string | null
    status?: EnumDeploymentStatusFilter<"CertificateDeployment"> | $Enums.DeploymentStatus
    deployedAt?: DateTimeNullableFilter<"CertificateDeployment"> | Date | string | null
    lastError?: StringNullableFilter<"CertificateDeployment"> | string | null
    pm2RestartRequired?: BoolFilter<"CertificateDeployment"> | boolean
    pm2RestartCompleted?: BoolFilter<"CertificateDeployment"> | boolean
    pm2Services?: StringFilter<"CertificateDeployment"> | string
    createdAt?: DateTimeFilter<"CertificateDeployment"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateDeployment"> | Date | string
    certificate?: XOR<CertificateRelationFilter, CertificateWhereInput>
  }, "id">

  export type CertificateDeploymentOrderByWithAggregationInput = {
    id?: SortOrder
    certificateId?: SortOrder
    targetType?: SortOrder
    targetConfig?: SortOrder
    deploymentPath?: SortOrderInput | SortOrder
    status?: SortOrder
    deployedAt?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    pm2RestartRequired?: SortOrder
    pm2RestartCompleted?: SortOrder
    pm2Services?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CertificateDeploymentCountOrderByAggregateInput
    _max?: CertificateDeploymentMaxOrderByAggregateInput
    _min?: CertificateDeploymentMinOrderByAggregateInput
  }

  export type CertificateDeploymentScalarWhereWithAggregatesInput = {
    AND?: CertificateDeploymentScalarWhereWithAggregatesInput | CertificateDeploymentScalarWhereWithAggregatesInput[]
    OR?: CertificateDeploymentScalarWhereWithAggregatesInput[]
    NOT?: CertificateDeploymentScalarWhereWithAggregatesInput | CertificateDeploymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CertificateDeployment"> | string
    certificateId?: StringWithAggregatesFilter<"CertificateDeployment"> | string
    targetType?: StringWithAggregatesFilter<"CertificateDeployment"> | string
    targetConfig?: JsonWithAggregatesFilter<"CertificateDeployment">
    deploymentPath?: StringNullableWithAggregatesFilter<"CertificateDeployment"> | string | null
    status?: EnumDeploymentStatusWithAggregatesFilter<"CertificateDeployment"> | $Enums.DeploymentStatus
    deployedAt?: DateTimeNullableWithAggregatesFilter<"CertificateDeployment"> | Date | string | null
    lastError?: StringNullableWithAggregatesFilter<"CertificateDeployment"> | string | null
    pm2RestartRequired?: BoolWithAggregatesFilter<"CertificateDeployment"> | boolean
    pm2RestartCompleted?: BoolWithAggregatesFilter<"CertificateDeployment"> | boolean
    pm2Services?: StringWithAggregatesFilter<"CertificateDeployment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CertificateDeployment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CertificateDeployment"> | Date | string
  }

  export type AcmeAccountWhereInput = {
    AND?: AcmeAccountWhereInput | AcmeAccountWhereInput[]
    OR?: AcmeAccountWhereInput[]
    NOT?: AcmeAccountWhereInput | AcmeAccountWhereInput[]
    id?: StringFilter<"AcmeAccount"> | string
    email?: StringFilter<"AcmeAccount"> | string
    accountKey?: StringFilter<"AcmeAccount"> | string
    accountUrl?: StringFilter<"AcmeAccount"> | string
    directoryUrl?: StringFilter<"AcmeAccount"> | string
    serverName?: StringFilter<"AcmeAccount"> | string
    status?: StringFilter<"AcmeAccount"> | string
    termsAccepted?: BoolFilter<"AcmeAccount"> | boolean
    createdAt?: DateTimeFilter<"AcmeAccount"> | Date | string
    updatedAt?: DateTimeFilter<"AcmeAccount"> | Date | string
  }

  export type AcmeAccountOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    accountKey?: SortOrder
    accountUrl?: SortOrder
    directoryUrl?: SortOrder
    serverName?: SortOrder
    status?: SortOrder
    termsAccepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcmeAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AcmeAccountWhereInput | AcmeAccountWhereInput[]
    OR?: AcmeAccountWhereInput[]
    NOT?: AcmeAccountWhereInput | AcmeAccountWhereInput[]
    accountKey?: StringFilter<"AcmeAccount"> | string
    accountUrl?: StringFilter<"AcmeAccount"> | string
    directoryUrl?: StringFilter<"AcmeAccount"> | string
    serverName?: StringFilter<"AcmeAccount"> | string
    status?: StringFilter<"AcmeAccount"> | string
    termsAccepted?: BoolFilter<"AcmeAccount"> | boolean
    createdAt?: DateTimeFilter<"AcmeAccount"> | Date | string
    updatedAt?: DateTimeFilter<"AcmeAccount"> | Date | string
  }, "id" | "email">

  export type AcmeAccountOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    accountKey?: SortOrder
    accountUrl?: SortOrder
    directoryUrl?: SortOrder
    serverName?: SortOrder
    status?: SortOrder
    termsAccepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcmeAccountCountOrderByAggregateInput
    _max?: AcmeAccountMaxOrderByAggregateInput
    _min?: AcmeAccountMinOrderByAggregateInput
  }

  export type AcmeAccountScalarWhereWithAggregatesInput = {
    AND?: AcmeAccountScalarWhereWithAggregatesInput | AcmeAccountScalarWhereWithAggregatesInput[]
    OR?: AcmeAccountScalarWhereWithAggregatesInput[]
    NOT?: AcmeAccountScalarWhereWithAggregatesInput | AcmeAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcmeAccount"> | string
    email?: StringWithAggregatesFilter<"AcmeAccount"> | string
    accountKey?: StringWithAggregatesFilter<"AcmeAccount"> | string
    accountUrl?: StringWithAggregatesFilter<"AcmeAccount"> | string
    directoryUrl?: StringWithAggregatesFilter<"AcmeAccount"> | string
    serverName?: StringWithAggregatesFilter<"AcmeAccount"> | string
    status?: StringWithAggregatesFilter<"AcmeAccount"> | string
    termsAccepted?: BoolWithAggregatesFilter<"AcmeAccount"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AcmeAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcmeAccount"> | Date | string
  }

  export type PluginWhereInput = {
    AND?: PluginWhereInput | PluginWhereInput[]
    OR?: PluginWhereInput[]
    NOT?: PluginWhereInput | PluginWhereInput[]
    id?: StringFilter<"Plugin"> | string
    name?: StringFilter<"Plugin"> | string
    version?: StringFilter<"Plugin"> | string
    description?: StringNullableFilter<"Plugin"> | string | null
    enabled?: BoolFilter<"Plugin"> | boolean
    config?: JsonNullableFilter<"Plugin">
    hooks?: JsonNullableFilter<"Plugin">
    filePath?: StringNullableFilter<"Plugin"> | string | null
    createdAt?: DateTimeFilter<"Plugin"> | Date | string
    updatedAt?: DateTimeFilter<"Plugin"> | Date | string
  }

  export type PluginOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrderInput | SortOrder
    enabled?: SortOrder
    config?: SortOrderInput | SortOrder
    hooks?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PluginWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PluginWhereInput | PluginWhereInput[]
    OR?: PluginWhereInput[]
    NOT?: PluginWhereInput | PluginWhereInput[]
    version?: StringFilter<"Plugin"> | string
    description?: StringNullableFilter<"Plugin"> | string | null
    enabled?: BoolFilter<"Plugin"> | boolean
    config?: JsonNullableFilter<"Plugin">
    hooks?: JsonNullableFilter<"Plugin">
    filePath?: StringNullableFilter<"Plugin"> | string | null
    createdAt?: DateTimeFilter<"Plugin"> | Date | string
    updatedAt?: DateTimeFilter<"Plugin"> | Date | string
  }, "id" | "name">

  export type PluginOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrderInput | SortOrder
    enabled?: SortOrder
    config?: SortOrderInput | SortOrder
    hooks?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PluginCountOrderByAggregateInput
    _max?: PluginMaxOrderByAggregateInput
    _min?: PluginMinOrderByAggregateInput
  }

  export type PluginScalarWhereWithAggregatesInput = {
    AND?: PluginScalarWhereWithAggregatesInput | PluginScalarWhereWithAggregatesInput[]
    OR?: PluginScalarWhereWithAggregatesInput[]
    NOT?: PluginScalarWhereWithAggregatesInput | PluginScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plugin"> | string
    name?: StringWithAggregatesFilter<"Plugin"> | string
    version?: StringWithAggregatesFilter<"Plugin"> | string
    description?: StringNullableWithAggregatesFilter<"Plugin"> | string | null
    enabled?: BoolWithAggregatesFilter<"Plugin"> | boolean
    config?: JsonNullableWithAggregatesFilter<"Plugin">
    hooks?: JsonNullableWithAggregatesFilter<"Plugin">
    filePath?: StringNullableWithAggregatesFilter<"Plugin"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Plugin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plugin"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ServiceLogCreateNestedManyWithoutServiceInput
    pm2Config?: ServicePm2ConfigCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ServiceLogUncheckedCreateNestedManyWithoutServiceInput
    pm2Config?: ServicePm2ConfigUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ServiceLogUpdateManyWithoutServiceNestedInput
    pm2Config?: ServicePm2ConfigUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ServiceLogUncheckedUpdateManyWithoutServiceNestedInput
    pm2Config?: ServicePm2ConfigUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceLogCreateInput = {
    id?: string
    message: string
    level?: $Enums.LogLevel
    source?: string | null
    timestamp?: Date | string
    service: ServiceCreateNestedOneWithoutLogsInput
  }

  export type ServiceLogUncheckedCreateInput = {
    id?: string
    serviceId: string
    message: string
    level?: $Enums.LogLevel
    source?: string | null
    timestamp?: Date | string
  }

  export type ServiceLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutLogsNestedInput
  }

  export type ServiceLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceLogCreateManyInput = {
    id?: string
    serviceId: string
    message: string
    level?: $Enums.LogLevel
    source?: string | null
    timestamp?: Date | string
  }

  export type ServiceLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicePm2ConfigCreateInput = {
    id?: string
    script: string
    name: string
    cwd?: string | null
    args?: string | null
    interpreter?: string | null
    interpreterArgs?: string | null
    instances?: number
    execMode?: string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: string | null
    outFile?: string | null
    errorFile?: string | null
    logDateFormat?: string | null
    pidFile?: string | null
    minUptimeSeconds?: number | null
    maxRestarts?: number | null
    restartDelay?: number | null
    watch?: boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: string | null
    maxMemoryRestart?: string | null
    killTimeout?: number | null
    waitReady?: boolean
    listenTimeout?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    service: ServiceCreateNestedOneWithoutPm2ConfigInput
  }

  export type ServicePm2ConfigUncheckedCreateInput = {
    id?: string
    serviceId: string
    script: string
    name: string
    cwd?: string | null
    args?: string | null
    interpreter?: string | null
    interpreterArgs?: string | null
    instances?: number
    execMode?: string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: string | null
    outFile?: string | null
    errorFile?: string | null
    logDateFormat?: string | null
    pidFile?: string | null
    minUptimeSeconds?: number | null
    maxRestarts?: number | null
    restartDelay?: number | null
    watch?: boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: string | null
    maxMemoryRestart?: string | null
    killTimeout?: number | null
    waitReady?: boolean
    listenTimeout?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicePm2ConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cwd?: NullableStringFieldUpdateOperationsInput | string | null
    args?: NullableStringFieldUpdateOperationsInput | string | null
    interpreter?: NullableStringFieldUpdateOperationsInput | string | null
    interpreterArgs?: NullableStringFieldUpdateOperationsInput | string | null
    instances?: IntFieldUpdateOperationsInput | number
    execMode?: StringFieldUpdateOperationsInput | string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: NullableStringFieldUpdateOperationsInput | string | null
    outFile?: NullableStringFieldUpdateOperationsInput | string | null
    errorFile?: NullableStringFieldUpdateOperationsInput | string | null
    logDateFormat?: NullableStringFieldUpdateOperationsInput | string | null
    pidFile?: NullableStringFieldUpdateOperationsInput | string | null
    minUptimeSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    maxRestarts?: NullableIntFieldUpdateOperationsInput | number | null
    restartDelay?: NullableIntFieldUpdateOperationsInput | number | null
    watch?: BoolFieldUpdateOperationsInput | boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: NullableStringFieldUpdateOperationsInput | string | null
    maxMemoryRestart?: NullableStringFieldUpdateOperationsInput | string | null
    killTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    waitReady?: BoolFieldUpdateOperationsInput | boolean
    listenTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: ServiceUpdateOneRequiredWithoutPm2ConfigNestedInput
  }

  export type ServicePm2ConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cwd?: NullableStringFieldUpdateOperationsInput | string | null
    args?: NullableStringFieldUpdateOperationsInput | string | null
    interpreter?: NullableStringFieldUpdateOperationsInput | string | null
    interpreterArgs?: NullableStringFieldUpdateOperationsInput | string | null
    instances?: IntFieldUpdateOperationsInput | number
    execMode?: StringFieldUpdateOperationsInput | string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: NullableStringFieldUpdateOperationsInput | string | null
    outFile?: NullableStringFieldUpdateOperationsInput | string | null
    errorFile?: NullableStringFieldUpdateOperationsInput | string | null
    logDateFormat?: NullableStringFieldUpdateOperationsInput | string | null
    pidFile?: NullableStringFieldUpdateOperationsInput | string | null
    minUptimeSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    maxRestarts?: NullableIntFieldUpdateOperationsInput | number | null
    restartDelay?: NullableIntFieldUpdateOperationsInput | number | null
    watch?: BoolFieldUpdateOperationsInput | boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: NullableStringFieldUpdateOperationsInput | string | null
    maxMemoryRestart?: NullableStringFieldUpdateOperationsInput | string | null
    killTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    waitReady?: BoolFieldUpdateOperationsInput | boolean
    listenTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicePm2ConfigCreateManyInput = {
    id?: string
    serviceId: string
    script: string
    name: string
    cwd?: string | null
    args?: string | null
    interpreter?: string | null
    interpreterArgs?: string | null
    instances?: number
    execMode?: string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: string | null
    outFile?: string | null
    errorFile?: string | null
    logDateFormat?: string | null
    pidFile?: string | null
    minUptimeSeconds?: number | null
    maxRestarts?: number | null
    restartDelay?: number | null
    watch?: boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: string | null
    maxMemoryRestart?: string | null
    killTimeout?: number | null
    waitReady?: boolean
    listenTimeout?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicePm2ConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cwd?: NullableStringFieldUpdateOperationsInput | string | null
    args?: NullableStringFieldUpdateOperationsInput | string | null
    interpreter?: NullableStringFieldUpdateOperationsInput | string | null
    interpreterArgs?: NullableStringFieldUpdateOperationsInput | string | null
    instances?: IntFieldUpdateOperationsInput | number
    execMode?: StringFieldUpdateOperationsInput | string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: NullableStringFieldUpdateOperationsInput | string | null
    outFile?: NullableStringFieldUpdateOperationsInput | string | null
    errorFile?: NullableStringFieldUpdateOperationsInput | string | null
    logDateFormat?: NullableStringFieldUpdateOperationsInput | string | null
    pidFile?: NullableStringFieldUpdateOperationsInput | string | null
    minUptimeSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    maxRestarts?: NullableIntFieldUpdateOperationsInput | number | null
    restartDelay?: NullableIntFieldUpdateOperationsInput | number | null
    watch?: BoolFieldUpdateOperationsInput | boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: NullableStringFieldUpdateOperationsInput | string | null
    maxMemoryRestart?: NullableStringFieldUpdateOperationsInput | string | null
    killTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    waitReady?: BoolFieldUpdateOperationsInput | boolean
    listenTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicePm2ConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cwd?: NullableStringFieldUpdateOperationsInput | string | null
    args?: NullableStringFieldUpdateOperationsInput | string | null
    interpreter?: NullableStringFieldUpdateOperationsInput | string | null
    interpreterArgs?: NullableStringFieldUpdateOperationsInput | string | null
    instances?: IntFieldUpdateOperationsInput | number
    execMode?: StringFieldUpdateOperationsInput | string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: NullableStringFieldUpdateOperationsInput | string | null
    outFile?: NullableStringFieldUpdateOperationsInput | string | null
    errorFile?: NullableStringFieldUpdateOperationsInput | string | null
    logDateFormat?: NullableStringFieldUpdateOperationsInput | string | null
    pidFile?: NullableStringFieldUpdateOperationsInput | string | null
    minUptimeSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    maxRestarts?: NullableIntFieldUpdateOperationsInput | number | null
    restartDelay?: NullableIntFieldUpdateOperationsInput | number | null
    watch?: BoolFieldUpdateOperationsInput | boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: NullableStringFieldUpdateOperationsInput | string | null
    maxMemoryRestart?: NullableStringFieldUpdateOperationsInput | string | null
    killTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    waitReady?: BoolFieldUpdateOperationsInput | boolean
    listenTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageActionCreateInput = {
    id?: string
    name: string
  }

  export type PackageActionUncheckedCreateInput = {
    id?: string
    name: string
  }

  export type PackageActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PackageActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PackageActionCreateManyInput = {
    id?: string
    name: string
  }

  export type PackageActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PackageActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LogEntryCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type LogEntryUncheckedCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type LogEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryCreateManyInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type LogEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSampleCreateInput = {
    id?: string
    value: number
    takenAt?: Date | string
  }

  export type MetricSampleUncheckedCreateInput = {
    id?: string
    value: number
    takenAt?: Date | string
  }

  export type MetricSampleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSampleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSampleCreateManyInput = {
    id?: string
    value: number
    takenAt?: Date | string
  }

  export type MetricSampleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSampleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    takenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certificates?: CertificateCreateNestedManyWithoutDomainInput
    renewalJobs?: CertificateRenewalCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certificates?: CertificateUncheckedCreateNestedManyWithoutDomainInput
    renewalJobs?: CertificateRenewalUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificates?: CertificateUpdateManyWithoutDomainNestedInput
    renewalJobs?: CertificateRenewalUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificates?: CertificateUncheckedUpdateManyWithoutDomainNestedInput
    renewalJobs?: CertificateRenewalUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainCreateManyInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateCreateInput = {
    id?: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutCertificatesInput
    deployments?: CertificateDeploymentCreateNestedManyWithoutCertificateInput
    renewalJobs?: CertificateRenewalCreateNestedManyWithoutCertificateInput
  }

  export type CertificateUncheckedCreateInput = {
    id?: string
    domainId: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: CertificateDeploymentUncheckedCreateNestedManyWithoutCertificateInput
    renewalJobs?: CertificateRenewalUncheckedCreateNestedManyWithoutCertificateInput
  }

  export type CertificateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutCertificatesNestedInput
    deployments?: CertificateDeploymentUpdateManyWithoutCertificateNestedInput
    renewalJobs?: CertificateRenewalUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: CertificateDeploymentUncheckedUpdateManyWithoutCertificateNestedInput
    renewalJobs?: CertificateRenewalUncheckedUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateCreateManyInput = {
    id?: string
    domainId: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalCreateInput = {
    id?: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutRenewalJobsInput
    certificate: CertificateCreateNestedOneWithoutRenewalJobsInput
  }

  export type CertificateRenewalUncheckedCreateInput = {
    id?: string
    certificateId: string
    domainId: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateRenewalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutRenewalJobsNestedInput
    certificate?: CertificateUpdateOneRequiredWithoutRenewalJobsNestedInput
  }

  export type CertificateRenewalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateId?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalCreateManyInput = {
    id?: string
    certificateId: string
    domainId: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateRenewalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateId?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateDeploymentCreateInput = {
    id?: string
    targetType: string
    targetConfig: JsonNullValueInput | InputJsonValue
    deploymentPath?: string | null
    status?: $Enums.DeploymentStatus
    deployedAt?: Date | string | null
    lastError?: string | null
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services: string
    createdAt?: Date | string
    updatedAt?: Date | string
    certificate: CertificateCreateNestedOneWithoutDeploymentsInput
  }

  export type CertificateDeploymentUncheckedCreateInput = {
    id?: string
    certificateId: string
    targetType: string
    targetConfig: JsonNullValueInput | InputJsonValue
    deploymentPath?: string | null
    status?: $Enums.DeploymentStatus
    deployedAt?: Date | string | null
    lastError?: string | null
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateDeploymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificate?: CertificateUpdateOneRequiredWithoutDeploymentsNestedInput
  }

  export type CertificateDeploymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateId?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateDeploymentCreateManyInput = {
    id?: string
    certificateId: string
    targetType: string
    targetConfig: JsonNullValueInput | InputJsonValue
    deploymentPath?: string | null
    status?: $Enums.DeploymentStatus
    deployedAt?: Date | string | null
    lastError?: string | null
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateDeploymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateDeploymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateId?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcmeAccountCreateInput = {
    id?: string
    email: string
    accountKey: string
    accountUrl: string
    directoryUrl?: string
    serverName?: string
    status?: string
    termsAccepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcmeAccountUncheckedCreateInput = {
    id?: string
    email: string
    accountKey: string
    accountUrl: string
    directoryUrl?: string
    serverName?: string
    status?: string
    termsAccepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcmeAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    accountKey?: StringFieldUpdateOperationsInput | string
    accountUrl?: StringFieldUpdateOperationsInput | string
    directoryUrl?: StringFieldUpdateOperationsInput | string
    serverName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcmeAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    accountKey?: StringFieldUpdateOperationsInput | string
    accountUrl?: StringFieldUpdateOperationsInput | string
    directoryUrl?: StringFieldUpdateOperationsInput | string
    serverName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcmeAccountCreateManyInput = {
    id?: string
    email: string
    accountKey: string
    accountUrl: string
    directoryUrl?: string
    serverName?: string
    status?: string
    termsAccepted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcmeAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    accountKey?: StringFieldUpdateOperationsInput | string
    accountUrl?: StringFieldUpdateOperationsInput | string
    directoryUrl?: StringFieldUpdateOperationsInput | string
    serverName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcmeAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    accountKey?: StringFieldUpdateOperationsInput | string
    accountUrl?: StringFieldUpdateOperationsInput | string
    directoryUrl?: StringFieldUpdateOperationsInput | string
    serverName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    termsAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PluginCreateInput = {
    id?: string
    name: string
    version?: string
    description?: string | null
    enabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PluginUncheckedCreateInput = {
    id?: string
    name: string
    version?: string
    description?: string | null
    enabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PluginUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PluginUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PluginCreateManyInput = {
    id?: string
    name: string
    version?: string
    description?: string | null
    enabled?: boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PluginUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PluginUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    config?: NullableJsonNullValueInput | InputJsonValue
    hooks?: NullableJsonNullValueInput | InputJsonValue
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type ServiceLogListRelationFilter = {
    every?: ServiceLogWhereInput
    some?: ServiceLogWhereInput
    none?: ServiceLogWhereInput
  }

  export type ServicePm2ConfigNullableRelationFilter = {
    is?: ServicePm2ConfigWhereInput | null
    isNot?: ServicePm2ConfigWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ServiceLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    config?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type EnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ServiceLogCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    message?: SortOrder
    level?: SortOrder
    source?: SortOrder
    timestamp?: SortOrder
  }

  export type ServiceLogMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    message?: SortOrder
    level?: SortOrder
    source?: SortOrder
    timestamp?: SortOrder
  }

  export type ServiceLogMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    message?: SortOrder
    level?: SortOrder
    source?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ServicePm2ConfigCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    script?: SortOrder
    name?: SortOrder
    cwd?: SortOrder
    args?: SortOrder
    interpreter?: SortOrder
    interpreterArgs?: SortOrder
    instances?: SortOrder
    execMode?: SortOrder
    env?: SortOrder
    envProduction?: SortOrder
    envDevelopment?: SortOrder
    logFile?: SortOrder
    outFile?: SortOrder
    errorFile?: SortOrder
    logDateFormat?: SortOrder
    pidFile?: SortOrder
    minUptimeSeconds?: SortOrder
    maxRestarts?: SortOrder
    restartDelay?: SortOrder
    watch?: SortOrder
    watchOptions?: SortOrder
    ignoreWatch?: SortOrder
    maxMemoryRestart?: SortOrder
    killTimeout?: SortOrder
    waitReady?: SortOrder
    listenTimeout?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServicePm2ConfigAvgOrderByAggregateInput = {
    instances?: SortOrder
    minUptimeSeconds?: SortOrder
    maxRestarts?: SortOrder
    restartDelay?: SortOrder
    killTimeout?: SortOrder
    listenTimeout?: SortOrder
  }

  export type ServicePm2ConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    script?: SortOrder
    name?: SortOrder
    cwd?: SortOrder
    args?: SortOrder
    interpreter?: SortOrder
    interpreterArgs?: SortOrder
    instances?: SortOrder
    execMode?: SortOrder
    logFile?: SortOrder
    outFile?: SortOrder
    errorFile?: SortOrder
    logDateFormat?: SortOrder
    pidFile?: SortOrder
    minUptimeSeconds?: SortOrder
    maxRestarts?: SortOrder
    restartDelay?: SortOrder
    watch?: SortOrder
    ignoreWatch?: SortOrder
    maxMemoryRestart?: SortOrder
    killTimeout?: SortOrder
    waitReady?: SortOrder
    listenTimeout?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServicePm2ConfigMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    script?: SortOrder
    name?: SortOrder
    cwd?: SortOrder
    args?: SortOrder
    interpreter?: SortOrder
    interpreterArgs?: SortOrder
    instances?: SortOrder
    execMode?: SortOrder
    logFile?: SortOrder
    outFile?: SortOrder
    errorFile?: SortOrder
    logDateFormat?: SortOrder
    pidFile?: SortOrder
    minUptimeSeconds?: SortOrder
    maxRestarts?: SortOrder
    restartDelay?: SortOrder
    watch?: SortOrder
    ignoreWatch?: SortOrder
    maxMemoryRestart?: SortOrder
    killTimeout?: SortOrder
    waitReady?: SortOrder
    listenTimeout?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServicePm2ConfigSumOrderByAggregateInput = {
    instances?: SortOrder
    minUptimeSeconds?: SortOrder
    maxRestarts?: SortOrder
    restartDelay?: SortOrder
    killTimeout?: SortOrder
    listenTimeout?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PackageActionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type PackageActionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type PackageActionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LogEntryCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type LogEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type LogEntryMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MetricSampleCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    takenAt?: SortOrder
  }

  export type MetricSampleAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type MetricSampleMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    takenAt?: SortOrder
  }

  export type MetricSampleMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    takenAt?: SortOrder
  }

  export type MetricSampleSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CertificateListRelationFilter = {
    every?: CertificateWhereInput
    some?: CertificateWhereInput
    none?: CertificateWhereInput
  }

  export type CertificateRenewalListRelationFilter = {
    every?: CertificateRenewalWhereInput
    some?: CertificateRenewalWhereInput
    none?: CertificateRenewalWhereInput
  }

  export type CertificateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CertificateRenewalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    wildcard?: SortOrder
    validationMethod?: SortOrder
    challengePlugin?: SortOrder
    pluginConfig?: SortOrder
    isActive?: SortOrder
    lastVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    wildcard?: SortOrder
    validationMethod?: SortOrder
    challengePlugin?: SortOrder
    isActive?: SortOrder
    lastVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    wildcard?: SortOrder
    validationMethod?: SortOrder
    challengePlugin?: SortOrder
    isActive?: SortOrder
    lastVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumCertificateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateStatus | EnumCertificateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateStatusFilter<$PrismaModel> | $Enums.CertificateStatus
  }

  export type DomainRelationFilter = {
    is?: DomainWhereInput
    isNot?: DomainWhereInput
  }

  export type CertificateDeploymentListRelationFilter = {
    every?: CertificateDeploymentWhereInput
    some?: CertificateDeploymentWhereInput
    none?: CertificateDeploymentWhereInput
  }

  export type CertificateDeploymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CertificateCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    subject?: SortOrder
    altNames?: SortOrder
    issuer?: SortOrder
    serial?: SortOrder
    certPem?: SortOrder
    chainPem?: SortOrder
    keyPem?: SortOrder
    fullchainPem?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    acmeAccountKey?: SortOrder
    acmeOrderUrl?: SortOrder
    challengeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    subject?: SortOrder
    altNames?: SortOrder
    issuer?: SortOrder
    serial?: SortOrder
    certPem?: SortOrder
    chainPem?: SortOrder
    keyPem?: SortOrder
    fullchainPem?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    acmeAccountKey?: SortOrder
    acmeOrderUrl?: SortOrder
    challengeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    subject?: SortOrder
    altNames?: SortOrder
    issuer?: SortOrder
    serial?: SortOrder
    certPem?: SortOrder
    chainPem?: SortOrder
    keyPem?: SortOrder
    fullchainPem?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    acmeAccountKey?: SortOrder
    acmeOrderUrl?: SortOrder
    challengeType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCertificateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateStatus | EnumCertificateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateStatusWithAggregatesFilter<$PrismaModel> | $Enums.CertificateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCertificateStatusFilter<$PrismaModel>
    _max?: NestedEnumCertificateStatusFilter<$PrismaModel>
  }

  export type EnumRenewalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RenewalStatus | EnumRenewalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRenewalStatusFilter<$PrismaModel> | $Enums.RenewalStatus
  }

  export type CertificateRelationFilter = {
    is?: CertificateWhereInput
    isNot?: CertificateWhereInput
  }

  export type CertificateRenewalCountOrderByAggregateInput = {
    id?: SortOrder
    certificateId?: SortOrder
    domainId?: SortOrder
    scheduledAt?: SortOrder
    attemptedAt?: SortOrder
    completedAt?: SortOrder
    nextAttempt?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    lastError?: SortOrder
    autoRenewal?: SortOrder
    renewalThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateRenewalAvgOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
    renewalThreshold?: SortOrder
  }

  export type CertificateRenewalMaxOrderByAggregateInput = {
    id?: SortOrder
    certificateId?: SortOrder
    domainId?: SortOrder
    scheduledAt?: SortOrder
    attemptedAt?: SortOrder
    completedAt?: SortOrder
    nextAttempt?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    lastError?: SortOrder
    autoRenewal?: SortOrder
    renewalThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateRenewalMinOrderByAggregateInput = {
    id?: SortOrder
    certificateId?: SortOrder
    domainId?: SortOrder
    scheduledAt?: SortOrder
    attemptedAt?: SortOrder
    completedAt?: SortOrder
    nextAttempt?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    lastError?: SortOrder
    autoRenewal?: SortOrder
    renewalThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateRenewalSumOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
    renewalThreshold?: SortOrder
  }

  export type EnumRenewalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RenewalStatus | EnumRenewalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRenewalStatusWithAggregatesFilter<$PrismaModel> | $Enums.RenewalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRenewalStatusFilter<$PrismaModel>
    _max?: NestedEnumRenewalStatusFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumDeploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusFilter<$PrismaModel> | $Enums.DeploymentStatus
  }

  export type CertificateDeploymentCountOrderByAggregateInput = {
    id?: SortOrder
    certificateId?: SortOrder
    targetType?: SortOrder
    targetConfig?: SortOrder
    deploymentPath?: SortOrder
    status?: SortOrder
    deployedAt?: SortOrder
    lastError?: SortOrder
    pm2RestartRequired?: SortOrder
    pm2RestartCompleted?: SortOrder
    pm2Services?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateDeploymentMaxOrderByAggregateInput = {
    id?: SortOrder
    certificateId?: SortOrder
    targetType?: SortOrder
    deploymentPath?: SortOrder
    status?: SortOrder
    deployedAt?: SortOrder
    lastError?: SortOrder
    pm2RestartRequired?: SortOrder
    pm2RestartCompleted?: SortOrder
    pm2Services?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CertificateDeploymentMinOrderByAggregateInput = {
    id?: SortOrder
    certificateId?: SortOrder
    targetType?: SortOrder
    deploymentPath?: SortOrder
    status?: SortOrder
    deployedAt?: SortOrder
    lastError?: SortOrder
    pm2RestartRequired?: SortOrder
    pm2RestartCompleted?: SortOrder
    pm2Services?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumDeploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumDeploymentStatusFilter<$PrismaModel>
  }

  export type AcmeAccountCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    accountKey?: SortOrder
    accountUrl?: SortOrder
    directoryUrl?: SortOrder
    serverName?: SortOrder
    status?: SortOrder
    termsAccepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcmeAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    accountKey?: SortOrder
    accountUrl?: SortOrder
    directoryUrl?: SortOrder
    serverName?: SortOrder
    status?: SortOrder
    termsAccepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcmeAccountMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    accountKey?: SortOrder
    accountUrl?: SortOrder
    directoryUrl?: SortOrder
    serverName?: SortOrder
    status?: SortOrder
    termsAccepted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PluginCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    config?: SortOrder
    hooks?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PluginMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PluginMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    filePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServiceLogCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceLogCreateWithoutServiceInput, ServiceLogUncheckedCreateWithoutServiceInput> | ServiceLogCreateWithoutServiceInput[] | ServiceLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceLogCreateOrConnectWithoutServiceInput | ServiceLogCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceLogCreateManyServiceInputEnvelope
    connect?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
  }

  export type ServicePm2ConfigCreateNestedOneWithoutServiceInput = {
    create?: XOR<ServicePm2ConfigCreateWithoutServiceInput, ServicePm2ConfigUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ServicePm2ConfigCreateOrConnectWithoutServiceInput
    connect?: ServicePm2ConfigWhereUniqueInput
  }

  export type ServiceLogUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceLogCreateWithoutServiceInput, ServiceLogUncheckedCreateWithoutServiceInput> | ServiceLogCreateWithoutServiceInput[] | ServiceLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceLogCreateOrConnectWithoutServiceInput | ServiceLogCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceLogCreateManyServiceInputEnvelope
    connect?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
  }

  export type ServicePm2ConfigUncheckedCreateNestedOneWithoutServiceInput = {
    create?: XOR<ServicePm2ConfigCreateWithoutServiceInput, ServicePm2ConfigUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ServicePm2ConfigCreateOrConnectWithoutServiceInput
    connect?: ServicePm2ConfigWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type ServiceLogUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceLogCreateWithoutServiceInput, ServiceLogUncheckedCreateWithoutServiceInput> | ServiceLogCreateWithoutServiceInput[] | ServiceLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceLogCreateOrConnectWithoutServiceInput | ServiceLogCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceLogUpsertWithWhereUniqueWithoutServiceInput | ServiceLogUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceLogCreateManyServiceInputEnvelope
    set?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    disconnect?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    delete?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    connect?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    update?: ServiceLogUpdateWithWhereUniqueWithoutServiceInput | ServiceLogUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceLogUpdateManyWithWhereWithoutServiceInput | ServiceLogUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceLogScalarWhereInput | ServiceLogScalarWhereInput[]
  }

  export type ServicePm2ConfigUpdateOneWithoutServiceNestedInput = {
    create?: XOR<ServicePm2ConfigCreateWithoutServiceInput, ServicePm2ConfigUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ServicePm2ConfigCreateOrConnectWithoutServiceInput
    upsert?: ServicePm2ConfigUpsertWithoutServiceInput
    disconnect?: ServicePm2ConfigWhereInput | boolean
    delete?: ServicePm2ConfigWhereInput | boolean
    connect?: ServicePm2ConfigWhereUniqueInput
    update?: XOR<XOR<ServicePm2ConfigUpdateToOneWithWhereWithoutServiceInput, ServicePm2ConfigUpdateWithoutServiceInput>, ServicePm2ConfigUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceLogUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceLogCreateWithoutServiceInput, ServiceLogUncheckedCreateWithoutServiceInput> | ServiceLogCreateWithoutServiceInput[] | ServiceLogUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceLogCreateOrConnectWithoutServiceInput | ServiceLogCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceLogUpsertWithWhereUniqueWithoutServiceInput | ServiceLogUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceLogCreateManyServiceInputEnvelope
    set?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    disconnect?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    delete?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    connect?: ServiceLogWhereUniqueInput | ServiceLogWhereUniqueInput[]
    update?: ServiceLogUpdateWithWhereUniqueWithoutServiceInput | ServiceLogUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceLogUpdateManyWithWhereWithoutServiceInput | ServiceLogUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceLogScalarWhereInput | ServiceLogScalarWhereInput[]
  }

  export type ServicePm2ConfigUncheckedUpdateOneWithoutServiceNestedInput = {
    create?: XOR<ServicePm2ConfigCreateWithoutServiceInput, ServicePm2ConfigUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ServicePm2ConfigCreateOrConnectWithoutServiceInput
    upsert?: ServicePm2ConfigUpsertWithoutServiceInput
    disconnect?: ServicePm2ConfigWhereInput | boolean
    delete?: ServicePm2ConfigWhereInput | boolean
    connect?: ServicePm2ConfigWhereUniqueInput
    update?: XOR<XOR<ServicePm2ConfigUpdateToOneWithWhereWithoutServiceInput, ServicePm2ConfigUpdateWithoutServiceInput>, ServicePm2ConfigUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceCreateNestedOneWithoutLogsInput = {
    create?: XOR<ServiceCreateWithoutLogsInput, ServiceUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutLogsInput
    connect?: ServiceWhereUniqueInput
  }

  export type EnumLogLevelFieldUpdateOperationsInput = {
    set?: $Enums.LogLevel
  }

  export type ServiceUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<ServiceCreateWithoutLogsInput, ServiceUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutLogsInput
    upsert?: ServiceUpsertWithoutLogsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutLogsInput, ServiceUpdateWithoutLogsInput>, ServiceUncheckedUpdateWithoutLogsInput>
  }

  export type ServiceCreateNestedOneWithoutPm2ConfigInput = {
    create?: XOR<ServiceCreateWithoutPm2ConfigInput, ServiceUncheckedCreateWithoutPm2ConfigInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPm2ConfigInput
    connect?: ServiceWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ServiceUpdateOneRequiredWithoutPm2ConfigNestedInput = {
    create?: XOR<ServiceCreateWithoutPm2ConfigInput, ServiceUncheckedCreateWithoutPm2ConfigInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPm2ConfigInput
    upsert?: ServiceUpsertWithoutPm2ConfigInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutPm2ConfigInput, ServiceUpdateWithoutPm2ConfigInput>, ServiceUncheckedUpdateWithoutPm2ConfigInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CertificateCreateNestedManyWithoutDomainInput = {
    create?: XOR<CertificateCreateWithoutDomainInput, CertificateUncheckedCreateWithoutDomainInput> | CertificateCreateWithoutDomainInput[] | CertificateUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateCreateOrConnectWithoutDomainInput | CertificateCreateOrConnectWithoutDomainInput[]
    createMany?: CertificateCreateManyDomainInputEnvelope
    connect?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
  }

  export type CertificateRenewalCreateNestedManyWithoutDomainInput = {
    create?: XOR<CertificateRenewalCreateWithoutDomainInput, CertificateRenewalUncheckedCreateWithoutDomainInput> | CertificateRenewalCreateWithoutDomainInput[] | CertificateRenewalUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutDomainInput | CertificateRenewalCreateOrConnectWithoutDomainInput[]
    createMany?: CertificateRenewalCreateManyDomainInputEnvelope
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
  }

  export type CertificateUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<CertificateCreateWithoutDomainInput, CertificateUncheckedCreateWithoutDomainInput> | CertificateCreateWithoutDomainInput[] | CertificateUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateCreateOrConnectWithoutDomainInput | CertificateCreateOrConnectWithoutDomainInput[]
    createMany?: CertificateCreateManyDomainInputEnvelope
    connect?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
  }

  export type CertificateRenewalUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<CertificateRenewalCreateWithoutDomainInput, CertificateRenewalUncheckedCreateWithoutDomainInput> | CertificateRenewalCreateWithoutDomainInput[] | CertificateRenewalUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutDomainInput | CertificateRenewalCreateOrConnectWithoutDomainInput[]
    createMany?: CertificateRenewalCreateManyDomainInputEnvelope
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CertificateUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CertificateCreateWithoutDomainInput, CertificateUncheckedCreateWithoutDomainInput> | CertificateCreateWithoutDomainInput[] | CertificateUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateCreateOrConnectWithoutDomainInput | CertificateCreateOrConnectWithoutDomainInput[]
    upsert?: CertificateUpsertWithWhereUniqueWithoutDomainInput | CertificateUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CertificateCreateManyDomainInputEnvelope
    set?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    disconnect?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    delete?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    connect?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    update?: CertificateUpdateWithWhereUniqueWithoutDomainInput | CertificateUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CertificateUpdateManyWithWhereWithoutDomainInput | CertificateUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CertificateScalarWhereInput | CertificateScalarWhereInput[]
  }

  export type CertificateRenewalUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CertificateRenewalCreateWithoutDomainInput, CertificateRenewalUncheckedCreateWithoutDomainInput> | CertificateRenewalCreateWithoutDomainInput[] | CertificateRenewalUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutDomainInput | CertificateRenewalCreateOrConnectWithoutDomainInput[]
    upsert?: CertificateRenewalUpsertWithWhereUniqueWithoutDomainInput | CertificateRenewalUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CertificateRenewalCreateManyDomainInputEnvelope
    set?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    disconnect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    delete?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    update?: CertificateRenewalUpdateWithWhereUniqueWithoutDomainInput | CertificateRenewalUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CertificateRenewalUpdateManyWithWhereWithoutDomainInput | CertificateRenewalUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CertificateRenewalScalarWhereInput | CertificateRenewalScalarWhereInput[]
  }

  export type CertificateUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CertificateCreateWithoutDomainInput, CertificateUncheckedCreateWithoutDomainInput> | CertificateCreateWithoutDomainInput[] | CertificateUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateCreateOrConnectWithoutDomainInput | CertificateCreateOrConnectWithoutDomainInput[]
    upsert?: CertificateUpsertWithWhereUniqueWithoutDomainInput | CertificateUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CertificateCreateManyDomainInputEnvelope
    set?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    disconnect?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    delete?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    connect?: CertificateWhereUniqueInput | CertificateWhereUniqueInput[]
    update?: CertificateUpdateWithWhereUniqueWithoutDomainInput | CertificateUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CertificateUpdateManyWithWhereWithoutDomainInput | CertificateUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CertificateScalarWhereInput | CertificateScalarWhereInput[]
  }

  export type CertificateRenewalUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CertificateRenewalCreateWithoutDomainInput, CertificateRenewalUncheckedCreateWithoutDomainInput> | CertificateRenewalCreateWithoutDomainInput[] | CertificateRenewalUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutDomainInput | CertificateRenewalCreateOrConnectWithoutDomainInput[]
    upsert?: CertificateRenewalUpsertWithWhereUniqueWithoutDomainInput | CertificateRenewalUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CertificateRenewalCreateManyDomainInputEnvelope
    set?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    disconnect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    delete?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    update?: CertificateRenewalUpdateWithWhereUniqueWithoutDomainInput | CertificateRenewalUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CertificateRenewalUpdateManyWithWhereWithoutDomainInput | CertificateRenewalUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CertificateRenewalScalarWhereInput | CertificateRenewalScalarWhereInput[]
  }

  export type DomainCreateNestedOneWithoutCertificatesInput = {
    create?: XOR<DomainCreateWithoutCertificatesInput, DomainUncheckedCreateWithoutCertificatesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutCertificatesInput
    connect?: DomainWhereUniqueInput
  }

  export type CertificateDeploymentCreateNestedManyWithoutCertificateInput = {
    create?: XOR<CertificateDeploymentCreateWithoutCertificateInput, CertificateDeploymentUncheckedCreateWithoutCertificateInput> | CertificateDeploymentCreateWithoutCertificateInput[] | CertificateDeploymentUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateDeploymentCreateOrConnectWithoutCertificateInput | CertificateDeploymentCreateOrConnectWithoutCertificateInput[]
    createMany?: CertificateDeploymentCreateManyCertificateInputEnvelope
    connect?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
  }

  export type CertificateRenewalCreateNestedManyWithoutCertificateInput = {
    create?: XOR<CertificateRenewalCreateWithoutCertificateInput, CertificateRenewalUncheckedCreateWithoutCertificateInput> | CertificateRenewalCreateWithoutCertificateInput[] | CertificateRenewalUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutCertificateInput | CertificateRenewalCreateOrConnectWithoutCertificateInput[]
    createMany?: CertificateRenewalCreateManyCertificateInputEnvelope
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
  }

  export type CertificateDeploymentUncheckedCreateNestedManyWithoutCertificateInput = {
    create?: XOR<CertificateDeploymentCreateWithoutCertificateInput, CertificateDeploymentUncheckedCreateWithoutCertificateInput> | CertificateDeploymentCreateWithoutCertificateInput[] | CertificateDeploymentUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateDeploymentCreateOrConnectWithoutCertificateInput | CertificateDeploymentCreateOrConnectWithoutCertificateInput[]
    createMany?: CertificateDeploymentCreateManyCertificateInputEnvelope
    connect?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
  }

  export type CertificateRenewalUncheckedCreateNestedManyWithoutCertificateInput = {
    create?: XOR<CertificateRenewalCreateWithoutCertificateInput, CertificateRenewalUncheckedCreateWithoutCertificateInput> | CertificateRenewalCreateWithoutCertificateInput[] | CertificateRenewalUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutCertificateInput | CertificateRenewalCreateOrConnectWithoutCertificateInput[]
    createMany?: CertificateRenewalCreateManyCertificateInputEnvelope
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
  }

  export type EnumCertificateStatusFieldUpdateOperationsInput = {
    set?: $Enums.CertificateStatus
  }

  export type DomainUpdateOneRequiredWithoutCertificatesNestedInput = {
    create?: XOR<DomainCreateWithoutCertificatesInput, DomainUncheckedCreateWithoutCertificatesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutCertificatesInput
    upsert?: DomainUpsertWithoutCertificatesInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutCertificatesInput, DomainUpdateWithoutCertificatesInput>, DomainUncheckedUpdateWithoutCertificatesInput>
  }

  export type CertificateDeploymentUpdateManyWithoutCertificateNestedInput = {
    create?: XOR<CertificateDeploymentCreateWithoutCertificateInput, CertificateDeploymentUncheckedCreateWithoutCertificateInput> | CertificateDeploymentCreateWithoutCertificateInput[] | CertificateDeploymentUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateDeploymentCreateOrConnectWithoutCertificateInput | CertificateDeploymentCreateOrConnectWithoutCertificateInput[]
    upsert?: CertificateDeploymentUpsertWithWhereUniqueWithoutCertificateInput | CertificateDeploymentUpsertWithWhereUniqueWithoutCertificateInput[]
    createMany?: CertificateDeploymentCreateManyCertificateInputEnvelope
    set?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    disconnect?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    delete?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    connect?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    update?: CertificateDeploymentUpdateWithWhereUniqueWithoutCertificateInput | CertificateDeploymentUpdateWithWhereUniqueWithoutCertificateInput[]
    updateMany?: CertificateDeploymentUpdateManyWithWhereWithoutCertificateInput | CertificateDeploymentUpdateManyWithWhereWithoutCertificateInput[]
    deleteMany?: CertificateDeploymentScalarWhereInput | CertificateDeploymentScalarWhereInput[]
  }

  export type CertificateRenewalUpdateManyWithoutCertificateNestedInput = {
    create?: XOR<CertificateRenewalCreateWithoutCertificateInput, CertificateRenewalUncheckedCreateWithoutCertificateInput> | CertificateRenewalCreateWithoutCertificateInput[] | CertificateRenewalUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutCertificateInput | CertificateRenewalCreateOrConnectWithoutCertificateInput[]
    upsert?: CertificateRenewalUpsertWithWhereUniqueWithoutCertificateInput | CertificateRenewalUpsertWithWhereUniqueWithoutCertificateInput[]
    createMany?: CertificateRenewalCreateManyCertificateInputEnvelope
    set?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    disconnect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    delete?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    update?: CertificateRenewalUpdateWithWhereUniqueWithoutCertificateInput | CertificateRenewalUpdateWithWhereUniqueWithoutCertificateInput[]
    updateMany?: CertificateRenewalUpdateManyWithWhereWithoutCertificateInput | CertificateRenewalUpdateManyWithWhereWithoutCertificateInput[]
    deleteMany?: CertificateRenewalScalarWhereInput | CertificateRenewalScalarWhereInput[]
  }

  export type CertificateDeploymentUncheckedUpdateManyWithoutCertificateNestedInput = {
    create?: XOR<CertificateDeploymentCreateWithoutCertificateInput, CertificateDeploymentUncheckedCreateWithoutCertificateInput> | CertificateDeploymentCreateWithoutCertificateInput[] | CertificateDeploymentUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateDeploymentCreateOrConnectWithoutCertificateInput | CertificateDeploymentCreateOrConnectWithoutCertificateInput[]
    upsert?: CertificateDeploymentUpsertWithWhereUniqueWithoutCertificateInput | CertificateDeploymentUpsertWithWhereUniqueWithoutCertificateInput[]
    createMany?: CertificateDeploymentCreateManyCertificateInputEnvelope
    set?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    disconnect?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    delete?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    connect?: CertificateDeploymentWhereUniqueInput | CertificateDeploymentWhereUniqueInput[]
    update?: CertificateDeploymentUpdateWithWhereUniqueWithoutCertificateInput | CertificateDeploymentUpdateWithWhereUniqueWithoutCertificateInput[]
    updateMany?: CertificateDeploymentUpdateManyWithWhereWithoutCertificateInput | CertificateDeploymentUpdateManyWithWhereWithoutCertificateInput[]
    deleteMany?: CertificateDeploymentScalarWhereInput | CertificateDeploymentScalarWhereInput[]
  }

  export type CertificateRenewalUncheckedUpdateManyWithoutCertificateNestedInput = {
    create?: XOR<CertificateRenewalCreateWithoutCertificateInput, CertificateRenewalUncheckedCreateWithoutCertificateInput> | CertificateRenewalCreateWithoutCertificateInput[] | CertificateRenewalUncheckedCreateWithoutCertificateInput[]
    connectOrCreate?: CertificateRenewalCreateOrConnectWithoutCertificateInput | CertificateRenewalCreateOrConnectWithoutCertificateInput[]
    upsert?: CertificateRenewalUpsertWithWhereUniqueWithoutCertificateInput | CertificateRenewalUpsertWithWhereUniqueWithoutCertificateInput[]
    createMany?: CertificateRenewalCreateManyCertificateInputEnvelope
    set?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    disconnect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    delete?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    connect?: CertificateRenewalWhereUniqueInput | CertificateRenewalWhereUniqueInput[]
    update?: CertificateRenewalUpdateWithWhereUniqueWithoutCertificateInput | CertificateRenewalUpdateWithWhereUniqueWithoutCertificateInput[]
    updateMany?: CertificateRenewalUpdateManyWithWhereWithoutCertificateInput | CertificateRenewalUpdateManyWithWhereWithoutCertificateInput[]
    deleteMany?: CertificateRenewalScalarWhereInput | CertificateRenewalScalarWhereInput[]
  }

  export type DomainCreateNestedOneWithoutRenewalJobsInput = {
    create?: XOR<DomainCreateWithoutRenewalJobsInput, DomainUncheckedCreateWithoutRenewalJobsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutRenewalJobsInput
    connect?: DomainWhereUniqueInput
  }

  export type CertificateCreateNestedOneWithoutRenewalJobsInput = {
    create?: XOR<CertificateCreateWithoutRenewalJobsInput, CertificateUncheckedCreateWithoutRenewalJobsInput>
    connectOrCreate?: CertificateCreateOrConnectWithoutRenewalJobsInput
    connect?: CertificateWhereUniqueInput
  }

  export type EnumRenewalStatusFieldUpdateOperationsInput = {
    set?: $Enums.RenewalStatus
  }

  export type DomainUpdateOneRequiredWithoutRenewalJobsNestedInput = {
    create?: XOR<DomainCreateWithoutRenewalJobsInput, DomainUncheckedCreateWithoutRenewalJobsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutRenewalJobsInput
    upsert?: DomainUpsertWithoutRenewalJobsInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutRenewalJobsInput, DomainUpdateWithoutRenewalJobsInput>, DomainUncheckedUpdateWithoutRenewalJobsInput>
  }

  export type CertificateUpdateOneRequiredWithoutRenewalJobsNestedInput = {
    create?: XOR<CertificateCreateWithoutRenewalJobsInput, CertificateUncheckedCreateWithoutRenewalJobsInput>
    connectOrCreate?: CertificateCreateOrConnectWithoutRenewalJobsInput
    upsert?: CertificateUpsertWithoutRenewalJobsInput
    connect?: CertificateWhereUniqueInput
    update?: XOR<XOR<CertificateUpdateToOneWithWhereWithoutRenewalJobsInput, CertificateUpdateWithoutRenewalJobsInput>, CertificateUncheckedUpdateWithoutRenewalJobsInput>
  }

  export type CertificateCreateNestedOneWithoutDeploymentsInput = {
    create?: XOR<CertificateCreateWithoutDeploymentsInput, CertificateUncheckedCreateWithoutDeploymentsInput>
    connectOrCreate?: CertificateCreateOrConnectWithoutDeploymentsInput
    connect?: CertificateWhereUniqueInput
  }

  export type EnumDeploymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DeploymentStatus
  }

  export type CertificateUpdateOneRequiredWithoutDeploymentsNestedInput = {
    create?: XOR<CertificateCreateWithoutDeploymentsInput, CertificateUncheckedCreateWithoutDeploymentsInput>
    connectOrCreate?: CertificateCreateOrConnectWithoutDeploymentsInput
    upsert?: CertificateUpsertWithoutDeploymentsInput
    connect?: CertificateWhereUniqueInput
    update?: XOR<XOR<CertificateUpdateToOneWithWhereWithoutDeploymentsInput, CertificateUpdateWithoutDeploymentsInput>, CertificateUncheckedUpdateWithoutDeploymentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type NestedEnumLogLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelFilter<$PrismaModel> | $Enums.LogLevel
  }

  export type NestedEnumLogLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LogLevel | EnumLogLevelFieldRefInput<$PrismaModel>
    in?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.LogLevel[] | ListEnumLogLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumLogLevelWithAggregatesFilter<$PrismaModel> | $Enums.LogLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLogLevelFilter<$PrismaModel>
    _max?: NestedEnumLogLevelFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCertificateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateStatus | EnumCertificateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateStatusFilter<$PrismaModel> | $Enums.CertificateStatus
  }

  export type NestedEnumCertificateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CertificateStatus | EnumCertificateStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CertificateStatus[] | ListEnumCertificateStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCertificateStatusWithAggregatesFilter<$PrismaModel> | $Enums.CertificateStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCertificateStatusFilter<$PrismaModel>
    _max?: NestedEnumCertificateStatusFilter<$PrismaModel>
  }

  export type NestedEnumRenewalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RenewalStatus | EnumRenewalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRenewalStatusFilter<$PrismaModel> | $Enums.RenewalStatus
  }

  export type NestedEnumRenewalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RenewalStatus | EnumRenewalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RenewalStatus[] | ListEnumRenewalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRenewalStatusWithAggregatesFilter<$PrismaModel> | $Enums.RenewalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRenewalStatusFilter<$PrismaModel>
    _max?: NestedEnumRenewalStatusFilter<$PrismaModel>
  }

  export type NestedEnumDeploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusFilter<$PrismaModel> | $Enums.DeploymentStatus
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumDeploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeploymentStatus | EnumDeploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeploymentStatus[] | ListEnumDeploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumDeploymentStatusFilter<$PrismaModel>
  }

  export type ServiceLogCreateWithoutServiceInput = {
    id?: string
    message: string
    level?: $Enums.LogLevel
    source?: string | null
    timestamp?: Date | string
  }

  export type ServiceLogUncheckedCreateWithoutServiceInput = {
    id?: string
    message: string
    level?: $Enums.LogLevel
    source?: string | null
    timestamp?: Date | string
  }

  export type ServiceLogCreateOrConnectWithoutServiceInput = {
    where: ServiceLogWhereUniqueInput
    create: XOR<ServiceLogCreateWithoutServiceInput, ServiceLogUncheckedCreateWithoutServiceInput>
  }

  export type ServiceLogCreateManyServiceInputEnvelope = {
    data: ServiceLogCreateManyServiceInput | ServiceLogCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ServicePm2ConfigCreateWithoutServiceInput = {
    id?: string
    script: string
    name: string
    cwd?: string | null
    args?: string | null
    interpreter?: string | null
    interpreterArgs?: string | null
    instances?: number
    execMode?: string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: string | null
    outFile?: string | null
    errorFile?: string | null
    logDateFormat?: string | null
    pidFile?: string | null
    minUptimeSeconds?: number | null
    maxRestarts?: number | null
    restartDelay?: number | null
    watch?: boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: string | null
    maxMemoryRestart?: string | null
    killTimeout?: number | null
    waitReady?: boolean
    listenTimeout?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicePm2ConfigUncheckedCreateWithoutServiceInput = {
    id?: string
    script: string
    name: string
    cwd?: string | null
    args?: string | null
    interpreter?: string | null
    interpreterArgs?: string | null
    instances?: number
    execMode?: string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: string | null
    outFile?: string | null
    errorFile?: string | null
    logDateFormat?: string | null
    pidFile?: string | null
    minUptimeSeconds?: number | null
    maxRestarts?: number | null
    restartDelay?: number | null
    watch?: boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: string | null
    maxMemoryRestart?: string | null
    killTimeout?: number | null
    waitReady?: boolean
    listenTimeout?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServicePm2ConfigCreateOrConnectWithoutServiceInput = {
    where: ServicePm2ConfigWhereUniqueInput
    create: XOR<ServicePm2ConfigCreateWithoutServiceInput, ServicePm2ConfigUncheckedCreateWithoutServiceInput>
  }

  export type ServiceLogUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServiceLogWhereUniqueInput
    update: XOR<ServiceLogUpdateWithoutServiceInput, ServiceLogUncheckedUpdateWithoutServiceInput>
    create: XOR<ServiceLogCreateWithoutServiceInput, ServiceLogUncheckedCreateWithoutServiceInput>
  }

  export type ServiceLogUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServiceLogWhereUniqueInput
    data: XOR<ServiceLogUpdateWithoutServiceInput, ServiceLogUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceLogUpdateManyWithWhereWithoutServiceInput = {
    where: ServiceLogScalarWhereInput
    data: XOR<ServiceLogUpdateManyMutationInput, ServiceLogUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceLogScalarWhereInput = {
    AND?: ServiceLogScalarWhereInput | ServiceLogScalarWhereInput[]
    OR?: ServiceLogScalarWhereInput[]
    NOT?: ServiceLogScalarWhereInput | ServiceLogScalarWhereInput[]
    id?: StringFilter<"ServiceLog"> | string
    serviceId?: StringFilter<"ServiceLog"> | string
    message?: StringFilter<"ServiceLog"> | string
    level?: EnumLogLevelFilter<"ServiceLog"> | $Enums.LogLevel
    source?: StringNullableFilter<"ServiceLog"> | string | null
    timestamp?: DateTimeFilter<"ServiceLog"> | Date | string
  }

  export type ServicePm2ConfigUpsertWithoutServiceInput = {
    update: XOR<ServicePm2ConfigUpdateWithoutServiceInput, ServicePm2ConfigUncheckedUpdateWithoutServiceInput>
    create: XOR<ServicePm2ConfigCreateWithoutServiceInput, ServicePm2ConfigUncheckedCreateWithoutServiceInput>
    where?: ServicePm2ConfigWhereInput
  }

  export type ServicePm2ConfigUpdateToOneWithWhereWithoutServiceInput = {
    where?: ServicePm2ConfigWhereInput
    data: XOR<ServicePm2ConfigUpdateWithoutServiceInput, ServicePm2ConfigUncheckedUpdateWithoutServiceInput>
  }

  export type ServicePm2ConfigUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cwd?: NullableStringFieldUpdateOperationsInput | string | null
    args?: NullableStringFieldUpdateOperationsInput | string | null
    interpreter?: NullableStringFieldUpdateOperationsInput | string | null
    interpreterArgs?: NullableStringFieldUpdateOperationsInput | string | null
    instances?: IntFieldUpdateOperationsInput | number
    execMode?: StringFieldUpdateOperationsInput | string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: NullableStringFieldUpdateOperationsInput | string | null
    outFile?: NullableStringFieldUpdateOperationsInput | string | null
    errorFile?: NullableStringFieldUpdateOperationsInput | string | null
    logDateFormat?: NullableStringFieldUpdateOperationsInput | string | null
    pidFile?: NullableStringFieldUpdateOperationsInput | string | null
    minUptimeSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    maxRestarts?: NullableIntFieldUpdateOperationsInput | number | null
    restartDelay?: NullableIntFieldUpdateOperationsInput | number | null
    watch?: BoolFieldUpdateOperationsInput | boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: NullableStringFieldUpdateOperationsInput | string | null
    maxMemoryRestart?: NullableStringFieldUpdateOperationsInput | string | null
    killTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    waitReady?: BoolFieldUpdateOperationsInput | boolean
    listenTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServicePm2ConfigUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    cwd?: NullableStringFieldUpdateOperationsInput | string | null
    args?: NullableStringFieldUpdateOperationsInput | string | null
    interpreter?: NullableStringFieldUpdateOperationsInput | string | null
    interpreterArgs?: NullableStringFieldUpdateOperationsInput | string | null
    instances?: IntFieldUpdateOperationsInput | number
    execMode?: StringFieldUpdateOperationsInput | string
    env?: NullableJsonNullValueInput | InputJsonValue
    envProduction?: NullableJsonNullValueInput | InputJsonValue
    envDevelopment?: NullableJsonNullValueInput | InputJsonValue
    logFile?: NullableStringFieldUpdateOperationsInput | string | null
    outFile?: NullableStringFieldUpdateOperationsInput | string | null
    errorFile?: NullableStringFieldUpdateOperationsInput | string | null
    logDateFormat?: NullableStringFieldUpdateOperationsInput | string | null
    pidFile?: NullableStringFieldUpdateOperationsInput | string | null
    minUptimeSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    maxRestarts?: NullableIntFieldUpdateOperationsInput | number | null
    restartDelay?: NullableIntFieldUpdateOperationsInput | number | null
    watch?: BoolFieldUpdateOperationsInput | boolean
    watchOptions?: NullableJsonNullValueInput | InputJsonValue
    ignoreWatch?: NullableStringFieldUpdateOperationsInput | string | null
    maxMemoryRestart?: NullableStringFieldUpdateOperationsInput | string | null
    killTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    waitReady?: BoolFieldUpdateOperationsInput | boolean
    listenTimeout?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateWithoutLogsInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    pm2Config?: ServicePm2ConfigCreateNestedOneWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutLogsInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    pm2Config?: ServicePm2ConfigUncheckedCreateNestedOneWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutLogsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutLogsInput, ServiceUncheckedCreateWithoutLogsInput>
  }

  export type ServiceUpsertWithoutLogsInput = {
    update: XOR<ServiceUpdateWithoutLogsInput, ServiceUncheckedUpdateWithoutLogsInput>
    create: XOR<ServiceCreateWithoutLogsInput, ServiceUncheckedCreateWithoutLogsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutLogsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutLogsInput, ServiceUncheckedUpdateWithoutLogsInput>
  }

  export type ServiceUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pm2Config?: ServicePm2ConfigUpdateOneWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pm2Config?: ServicePm2ConfigUncheckedUpdateOneWithoutServiceNestedInput
  }

  export type ServiceCreateWithoutPm2ConfigInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ServiceLogCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutPm2ConfigInput = {
    id?: string
    name: string
    description?: string | null
    type?: string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ServiceLogUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutPm2ConfigInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPm2ConfigInput, ServiceUncheckedCreateWithoutPm2ConfigInput>
  }

  export type ServiceUpsertWithoutPm2ConfigInput = {
    update: XOR<ServiceUpdateWithoutPm2ConfigInput, ServiceUncheckedUpdateWithoutPm2ConfigInput>
    create: XOR<ServiceCreateWithoutPm2ConfigInput, ServiceUncheckedCreateWithoutPm2ConfigInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutPm2ConfigInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutPm2ConfigInput, ServiceUncheckedUpdateWithoutPm2ConfigInput>
  }

  export type ServiceUpdateWithoutPm2ConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ServiceLogUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPm2ConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ServiceLogUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type CertificateCreateWithoutDomainInput = {
    id?: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: CertificateDeploymentCreateNestedManyWithoutCertificateInput
    renewalJobs?: CertificateRenewalCreateNestedManyWithoutCertificateInput
  }

  export type CertificateUncheckedCreateWithoutDomainInput = {
    id?: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: CertificateDeploymentUncheckedCreateNestedManyWithoutCertificateInput
    renewalJobs?: CertificateRenewalUncheckedCreateNestedManyWithoutCertificateInput
  }

  export type CertificateCreateOrConnectWithoutDomainInput = {
    where: CertificateWhereUniqueInput
    create: XOR<CertificateCreateWithoutDomainInput, CertificateUncheckedCreateWithoutDomainInput>
  }

  export type CertificateCreateManyDomainInputEnvelope = {
    data: CertificateCreateManyDomainInput | CertificateCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type CertificateRenewalCreateWithoutDomainInput = {
    id?: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    certificate: CertificateCreateNestedOneWithoutRenewalJobsInput
  }

  export type CertificateRenewalUncheckedCreateWithoutDomainInput = {
    id?: string
    certificateId: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateRenewalCreateOrConnectWithoutDomainInput = {
    where: CertificateRenewalWhereUniqueInput
    create: XOR<CertificateRenewalCreateWithoutDomainInput, CertificateRenewalUncheckedCreateWithoutDomainInput>
  }

  export type CertificateRenewalCreateManyDomainInputEnvelope = {
    data: CertificateRenewalCreateManyDomainInput | CertificateRenewalCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type CertificateUpsertWithWhereUniqueWithoutDomainInput = {
    where: CertificateWhereUniqueInput
    update: XOR<CertificateUpdateWithoutDomainInput, CertificateUncheckedUpdateWithoutDomainInput>
    create: XOR<CertificateCreateWithoutDomainInput, CertificateUncheckedCreateWithoutDomainInput>
  }

  export type CertificateUpdateWithWhereUniqueWithoutDomainInput = {
    where: CertificateWhereUniqueInput
    data: XOR<CertificateUpdateWithoutDomainInput, CertificateUncheckedUpdateWithoutDomainInput>
  }

  export type CertificateUpdateManyWithWhereWithoutDomainInput = {
    where: CertificateScalarWhereInput
    data: XOR<CertificateUpdateManyMutationInput, CertificateUncheckedUpdateManyWithoutDomainInput>
  }

  export type CertificateScalarWhereInput = {
    AND?: CertificateScalarWhereInput | CertificateScalarWhereInput[]
    OR?: CertificateScalarWhereInput[]
    NOT?: CertificateScalarWhereInput | CertificateScalarWhereInput[]
    id?: StringFilter<"Certificate"> | string
    domainId?: StringFilter<"Certificate"> | string
    subject?: StringFilter<"Certificate"> | string
    altNames?: StringFilter<"Certificate"> | string
    issuer?: StringFilter<"Certificate"> | string
    serial?: StringFilter<"Certificate"> | string
    certPem?: StringFilter<"Certificate"> | string
    chainPem?: StringFilter<"Certificate"> | string
    keyPem?: StringFilter<"Certificate"> | string
    fullchainPem?: StringFilter<"Certificate"> | string
    issuedAt?: DateTimeFilter<"Certificate"> | Date | string
    expiresAt?: DateTimeFilter<"Certificate"> | Date | string
    status?: EnumCertificateStatusFilter<"Certificate"> | $Enums.CertificateStatus
    acmeAccountKey?: StringNullableFilter<"Certificate"> | string | null
    acmeOrderUrl?: StringNullableFilter<"Certificate"> | string | null
    challengeType?: StringFilter<"Certificate"> | string
    createdAt?: DateTimeFilter<"Certificate"> | Date | string
    updatedAt?: DateTimeFilter<"Certificate"> | Date | string
  }

  export type CertificateRenewalUpsertWithWhereUniqueWithoutDomainInput = {
    where: CertificateRenewalWhereUniqueInput
    update: XOR<CertificateRenewalUpdateWithoutDomainInput, CertificateRenewalUncheckedUpdateWithoutDomainInput>
    create: XOR<CertificateRenewalCreateWithoutDomainInput, CertificateRenewalUncheckedCreateWithoutDomainInput>
  }

  export type CertificateRenewalUpdateWithWhereUniqueWithoutDomainInput = {
    where: CertificateRenewalWhereUniqueInput
    data: XOR<CertificateRenewalUpdateWithoutDomainInput, CertificateRenewalUncheckedUpdateWithoutDomainInput>
  }

  export type CertificateRenewalUpdateManyWithWhereWithoutDomainInput = {
    where: CertificateRenewalScalarWhereInput
    data: XOR<CertificateRenewalUpdateManyMutationInput, CertificateRenewalUncheckedUpdateManyWithoutDomainInput>
  }

  export type CertificateRenewalScalarWhereInput = {
    AND?: CertificateRenewalScalarWhereInput | CertificateRenewalScalarWhereInput[]
    OR?: CertificateRenewalScalarWhereInput[]
    NOT?: CertificateRenewalScalarWhereInput | CertificateRenewalScalarWhereInput[]
    id?: StringFilter<"CertificateRenewal"> | string
    certificateId?: StringFilter<"CertificateRenewal"> | string
    domainId?: StringFilter<"CertificateRenewal"> | string
    scheduledAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    attemptedAt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    nextAttempt?: DateTimeNullableFilter<"CertificateRenewal"> | Date | string | null
    status?: EnumRenewalStatusFilter<"CertificateRenewal"> | $Enums.RenewalStatus
    attempts?: IntFilter<"CertificateRenewal"> | number
    maxAttempts?: IntFilter<"CertificateRenewal"> | number
    lastError?: StringNullableFilter<"CertificateRenewal"> | string | null
    autoRenewal?: BoolFilter<"CertificateRenewal"> | boolean
    renewalThreshold?: IntFilter<"CertificateRenewal"> | number
    createdAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateRenewal"> | Date | string
  }

  export type DomainCreateWithoutCertificatesInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    renewalJobs?: CertificateRenewalCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutCertificatesInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    renewalJobs?: CertificateRenewalUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutCertificatesInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutCertificatesInput, DomainUncheckedCreateWithoutCertificatesInput>
  }

  export type CertificateDeploymentCreateWithoutCertificateInput = {
    id?: string
    targetType: string
    targetConfig: JsonNullValueInput | InputJsonValue
    deploymentPath?: string | null
    status?: $Enums.DeploymentStatus
    deployedAt?: Date | string | null
    lastError?: string | null
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateDeploymentUncheckedCreateWithoutCertificateInput = {
    id?: string
    targetType: string
    targetConfig: JsonNullValueInput | InputJsonValue
    deploymentPath?: string | null
    status?: $Enums.DeploymentStatus
    deployedAt?: Date | string | null
    lastError?: string | null
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateDeploymentCreateOrConnectWithoutCertificateInput = {
    where: CertificateDeploymentWhereUniqueInput
    create: XOR<CertificateDeploymentCreateWithoutCertificateInput, CertificateDeploymentUncheckedCreateWithoutCertificateInput>
  }

  export type CertificateDeploymentCreateManyCertificateInputEnvelope = {
    data: CertificateDeploymentCreateManyCertificateInput | CertificateDeploymentCreateManyCertificateInput[]
    skipDuplicates?: boolean
  }

  export type CertificateRenewalCreateWithoutCertificateInput = {
    id?: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutRenewalJobsInput
  }

  export type CertificateRenewalUncheckedCreateWithoutCertificateInput = {
    id?: string
    domainId: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateRenewalCreateOrConnectWithoutCertificateInput = {
    where: CertificateRenewalWhereUniqueInput
    create: XOR<CertificateRenewalCreateWithoutCertificateInput, CertificateRenewalUncheckedCreateWithoutCertificateInput>
  }

  export type CertificateRenewalCreateManyCertificateInputEnvelope = {
    data: CertificateRenewalCreateManyCertificateInput | CertificateRenewalCreateManyCertificateInput[]
    skipDuplicates?: boolean
  }

  export type DomainUpsertWithoutCertificatesInput = {
    update: XOR<DomainUpdateWithoutCertificatesInput, DomainUncheckedUpdateWithoutCertificatesInput>
    create: XOR<DomainCreateWithoutCertificatesInput, DomainUncheckedCreateWithoutCertificatesInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutCertificatesInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutCertificatesInput, DomainUncheckedUpdateWithoutCertificatesInput>
  }

  export type DomainUpdateWithoutCertificatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    renewalJobs?: CertificateRenewalUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutCertificatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    renewalJobs?: CertificateRenewalUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type CertificateDeploymentUpsertWithWhereUniqueWithoutCertificateInput = {
    where: CertificateDeploymentWhereUniqueInput
    update: XOR<CertificateDeploymentUpdateWithoutCertificateInput, CertificateDeploymentUncheckedUpdateWithoutCertificateInput>
    create: XOR<CertificateDeploymentCreateWithoutCertificateInput, CertificateDeploymentUncheckedCreateWithoutCertificateInput>
  }

  export type CertificateDeploymentUpdateWithWhereUniqueWithoutCertificateInput = {
    where: CertificateDeploymentWhereUniqueInput
    data: XOR<CertificateDeploymentUpdateWithoutCertificateInput, CertificateDeploymentUncheckedUpdateWithoutCertificateInput>
  }

  export type CertificateDeploymentUpdateManyWithWhereWithoutCertificateInput = {
    where: CertificateDeploymentScalarWhereInput
    data: XOR<CertificateDeploymentUpdateManyMutationInput, CertificateDeploymentUncheckedUpdateManyWithoutCertificateInput>
  }

  export type CertificateDeploymentScalarWhereInput = {
    AND?: CertificateDeploymentScalarWhereInput | CertificateDeploymentScalarWhereInput[]
    OR?: CertificateDeploymentScalarWhereInput[]
    NOT?: CertificateDeploymentScalarWhereInput | CertificateDeploymentScalarWhereInput[]
    id?: StringFilter<"CertificateDeployment"> | string
    certificateId?: StringFilter<"CertificateDeployment"> | string
    targetType?: StringFilter<"CertificateDeployment"> | string
    targetConfig?: JsonFilter<"CertificateDeployment">
    deploymentPath?: StringNullableFilter<"CertificateDeployment"> | string | null
    status?: EnumDeploymentStatusFilter<"CertificateDeployment"> | $Enums.DeploymentStatus
    deployedAt?: DateTimeNullableFilter<"CertificateDeployment"> | Date | string | null
    lastError?: StringNullableFilter<"CertificateDeployment"> | string | null
    pm2RestartRequired?: BoolFilter<"CertificateDeployment"> | boolean
    pm2RestartCompleted?: BoolFilter<"CertificateDeployment"> | boolean
    pm2Services?: StringFilter<"CertificateDeployment"> | string
    createdAt?: DateTimeFilter<"CertificateDeployment"> | Date | string
    updatedAt?: DateTimeFilter<"CertificateDeployment"> | Date | string
  }

  export type CertificateRenewalUpsertWithWhereUniqueWithoutCertificateInput = {
    where: CertificateRenewalWhereUniqueInput
    update: XOR<CertificateRenewalUpdateWithoutCertificateInput, CertificateRenewalUncheckedUpdateWithoutCertificateInput>
    create: XOR<CertificateRenewalCreateWithoutCertificateInput, CertificateRenewalUncheckedCreateWithoutCertificateInput>
  }

  export type CertificateRenewalUpdateWithWhereUniqueWithoutCertificateInput = {
    where: CertificateRenewalWhereUniqueInput
    data: XOR<CertificateRenewalUpdateWithoutCertificateInput, CertificateRenewalUncheckedUpdateWithoutCertificateInput>
  }

  export type CertificateRenewalUpdateManyWithWhereWithoutCertificateInput = {
    where: CertificateRenewalScalarWhereInput
    data: XOR<CertificateRenewalUpdateManyMutationInput, CertificateRenewalUncheckedUpdateManyWithoutCertificateInput>
  }

  export type DomainCreateWithoutRenewalJobsInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certificates?: CertificateCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutRenewalJobsInput = {
    id?: string
    name: string
    wildcard?: boolean
    validationMethod?: string
    challengePlugin?: string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    lastVerified?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    certificates?: CertificateUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutRenewalJobsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutRenewalJobsInput, DomainUncheckedCreateWithoutRenewalJobsInput>
  }

  export type CertificateCreateWithoutRenewalJobsInput = {
    id?: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutCertificatesInput
    deployments?: CertificateDeploymentCreateNestedManyWithoutCertificateInput
  }

  export type CertificateUncheckedCreateWithoutRenewalJobsInput = {
    id?: string
    domainId: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deployments?: CertificateDeploymentUncheckedCreateNestedManyWithoutCertificateInput
  }

  export type CertificateCreateOrConnectWithoutRenewalJobsInput = {
    where: CertificateWhereUniqueInput
    create: XOR<CertificateCreateWithoutRenewalJobsInput, CertificateUncheckedCreateWithoutRenewalJobsInput>
  }

  export type DomainUpsertWithoutRenewalJobsInput = {
    update: XOR<DomainUpdateWithoutRenewalJobsInput, DomainUncheckedUpdateWithoutRenewalJobsInput>
    create: XOR<DomainCreateWithoutRenewalJobsInput, DomainUncheckedCreateWithoutRenewalJobsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutRenewalJobsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutRenewalJobsInput, DomainUncheckedUpdateWithoutRenewalJobsInput>
  }

  export type DomainUpdateWithoutRenewalJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificates?: CertificateUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutRenewalJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    wildcard?: BoolFieldUpdateOperationsInput | boolean
    validationMethod?: StringFieldUpdateOperationsInput | string
    challengePlugin?: NullableStringFieldUpdateOperationsInput | string | null
    pluginConfig?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificates?: CertificateUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type CertificateUpsertWithoutRenewalJobsInput = {
    update: XOR<CertificateUpdateWithoutRenewalJobsInput, CertificateUncheckedUpdateWithoutRenewalJobsInput>
    create: XOR<CertificateCreateWithoutRenewalJobsInput, CertificateUncheckedCreateWithoutRenewalJobsInput>
    where?: CertificateWhereInput
  }

  export type CertificateUpdateToOneWithWhereWithoutRenewalJobsInput = {
    where?: CertificateWhereInput
    data: XOR<CertificateUpdateWithoutRenewalJobsInput, CertificateUncheckedUpdateWithoutRenewalJobsInput>
  }

  export type CertificateUpdateWithoutRenewalJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutCertificatesNestedInput
    deployments?: CertificateDeploymentUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateUncheckedUpdateWithoutRenewalJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: CertificateDeploymentUncheckedUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateCreateWithoutDeploymentsInput = {
    id?: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutCertificatesInput
    renewalJobs?: CertificateRenewalCreateNestedManyWithoutCertificateInput
  }

  export type CertificateUncheckedCreateWithoutDeploymentsInput = {
    id?: string
    domainId: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    renewalJobs?: CertificateRenewalUncheckedCreateNestedManyWithoutCertificateInput
  }

  export type CertificateCreateOrConnectWithoutDeploymentsInput = {
    where: CertificateWhereUniqueInput
    create: XOR<CertificateCreateWithoutDeploymentsInput, CertificateUncheckedCreateWithoutDeploymentsInput>
  }

  export type CertificateUpsertWithoutDeploymentsInput = {
    update: XOR<CertificateUpdateWithoutDeploymentsInput, CertificateUncheckedUpdateWithoutDeploymentsInput>
    create: XOR<CertificateCreateWithoutDeploymentsInput, CertificateUncheckedCreateWithoutDeploymentsInput>
    where?: CertificateWhereInput
  }

  export type CertificateUpdateToOneWithWhereWithoutDeploymentsInput = {
    where?: CertificateWhereInput
    data: XOR<CertificateUpdateWithoutDeploymentsInput, CertificateUncheckedUpdateWithoutDeploymentsInput>
  }

  export type CertificateUpdateWithoutDeploymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutCertificatesNestedInput
    renewalJobs?: CertificateRenewalUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateUncheckedUpdateWithoutDeploymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    renewalJobs?: CertificateRenewalUncheckedUpdateManyWithoutCertificateNestedInput
  }

  export type ServiceLogCreateManyServiceInput = {
    id?: string
    message: string
    level?: $Enums.LogLevel
    source?: string | null
    timestamp?: Date | string
  }

  export type ServiceLogUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceLogUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceLogUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: EnumLogLevelFieldUpdateOperationsInput | $Enums.LogLevel
    source?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateCreateManyDomainInput = {
    id?: string
    subject: string
    altNames: string
    issuer: string
    serial: string
    certPem: string
    chainPem: string
    keyPem: string
    fullchainPem: string
    issuedAt: Date | string
    expiresAt: Date | string
    status?: $Enums.CertificateStatus
    acmeAccountKey?: string | null
    acmeOrderUrl?: string | null
    challengeType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateRenewalCreateManyDomainInput = {
    id?: string
    certificateId: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateUpdateWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: CertificateDeploymentUpdateManyWithoutCertificateNestedInput
    renewalJobs?: CertificateRenewalUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateUncheckedUpdateWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deployments?: CertificateDeploymentUncheckedUpdateManyWithoutCertificateNestedInput
    renewalJobs?: CertificateRenewalUncheckedUpdateManyWithoutCertificateNestedInput
  }

  export type CertificateUncheckedUpdateManyWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    altNames?: StringFieldUpdateOperationsInput | string
    issuer?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    certPem?: StringFieldUpdateOperationsInput | string
    chainPem?: StringFieldUpdateOperationsInput | string
    keyPem?: StringFieldUpdateOperationsInput | string
    fullchainPem?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumCertificateStatusFieldUpdateOperationsInput | $Enums.CertificateStatus
    acmeAccountKey?: NullableStringFieldUpdateOperationsInput | string | null
    acmeOrderUrl?: NullableStringFieldUpdateOperationsInput | string | null
    challengeType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalUpdateWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    certificate?: CertificateUpdateOneRequiredWithoutRenewalJobsNestedInput
  }

  export type CertificateRenewalUncheckedUpdateWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalUncheckedUpdateManyWithoutDomainInput = {
    id?: StringFieldUpdateOperationsInput | string
    certificateId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateDeploymentCreateManyCertificateInput = {
    id?: string
    targetType: string
    targetConfig: JsonNullValueInput | InputJsonValue
    deploymentPath?: string | null
    status?: $Enums.DeploymentStatus
    deployedAt?: Date | string | null
    lastError?: string | null
    pm2RestartRequired?: boolean
    pm2RestartCompleted?: boolean
    pm2Services: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateRenewalCreateManyCertificateInput = {
    id?: string
    domainId: string
    scheduledAt: Date | string
    attemptedAt?: Date | string | null
    completedAt?: Date | string | null
    nextAttempt?: Date | string | null
    status?: $Enums.RenewalStatus
    attempts?: number
    maxAttempts?: number
    lastError?: string | null
    autoRenewal?: boolean
    renewalThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CertificateDeploymentUpdateWithoutCertificateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateDeploymentUncheckedUpdateWithoutCertificateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateDeploymentUncheckedUpdateManyWithoutCertificateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetConfig?: JsonNullValueInput | InputJsonValue
    deploymentPath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDeploymentStatusFieldUpdateOperationsInput | $Enums.DeploymentStatus
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    pm2RestartRequired?: BoolFieldUpdateOperationsInput | boolean
    pm2RestartCompleted?: BoolFieldUpdateOperationsInput | boolean
    pm2Services?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalUpdateWithoutCertificateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutRenewalJobsNestedInput
  }

  export type CertificateRenewalUncheckedUpdateWithoutCertificateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificateRenewalUncheckedUpdateManyWithoutCertificateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextAttempt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRenewalStatusFieldUpdateOperationsInput | $Enums.RenewalStatus
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    autoRenewal?: BoolFieldUpdateOperationsInput | boolean
    renewalThreshold?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DomainCountOutputTypeDefaultArgs instead
     */
    export type DomainCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DomainCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CertificateCountOutputTypeDefaultArgs instead
     */
    export type CertificateCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CertificateCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceLogDefaultArgs instead
     */
    export type ServiceLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServicePm2ConfigDefaultArgs instead
     */
    export type ServicePm2ConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServicePm2ConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PackageActionDefaultArgs instead
     */
    export type PackageActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PackageActionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LogEntryDefaultArgs instead
     */
    export type LogEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LogEntryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MetricSampleDefaultArgs instead
     */
    export type MetricSampleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MetricSampleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DomainDefaultArgs instead
     */
    export type DomainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DomainDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CertificateDefaultArgs instead
     */
    export type CertificateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CertificateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CertificateRenewalDefaultArgs instead
     */
    export type CertificateRenewalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CertificateRenewalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CertificateDeploymentDefaultArgs instead
     */
    export type CertificateDeploymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CertificateDeploymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AcmeAccountDefaultArgs instead
     */
    export type AcmeAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AcmeAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PluginDefaultArgs instead
     */
    export type PluginArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PluginDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}