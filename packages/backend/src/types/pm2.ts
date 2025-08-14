// PM2 type definitions
export interface PM2ProcessDescription {
  pid?: number;
  name?: string;
  pm2_env?: {
    pm_id?: number;
    name?: string;
    status?: string;
    pm_uptime?: number;
    restart_time?: number;
    unstable_restarts?: number;
    created_at?: number;
    versioning?: any;
    node_args?: string[];
    pm_exec_path?: string;
    pm_cwd?: string;
    exec_mode?: string;
    watching?: boolean;
    instances?: number;
    autorestart?: boolean;
    vizion_running?: boolean;
    NODE_APP_INSTANCE?: number;
    exec_interpreter?: string;
    pm_out_log_path?: string;
    pm_err_log_path?: string;
    pm_log_path?: string;
    INSTANCE_VAR?: string;
    command?: any;
  };
  monit?: {
    memory?: number;
    cpu?: number;
  };
}

export interface PM2StartOptions {
  name?: string;
  script?: string;
  cwd?: string;
  args?: string | string[];
  interpreter?: string;
  interpreterArgs?: string | string[];
  instances?: number | 'max';
  execMode?: 'fork' | 'cluster';
  env?: Record<string, any>;
  envProduction?: Record<string, any>;
  envDevelopment?: Record<string, any>;
  logFile?: string;
  outFile?: string;
  errorFile?: string;
  logDateFormat?: string;
  pidFile?: string;
  minUptimeSeconds?: number;
  maxRestarts?: number;
  restartDelay?: number;
  watch?: boolean | string | string[];
  watchOptions?: Record<string, any>;
  ignoreWatch?: string | string[];
  maxMemoryRestart?: string;
  killTimeout?: number;
  waitReady?: boolean;
  listenTimeout?: number;
  autorestart?: boolean;
  vizion?: boolean;
  postUpdateDelay?: number;
  mergeLogs?: boolean;
  force?: boolean;
  shutdown_with_message?: boolean;
  source_map_support?: boolean;
  disable_source_map_support?: boolean;
  instance_var?: string;
  filter_env?: string[];
  namespace?: string;
  updateEnv?: boolean;
}

export interface PM2DeleteOptions {
  deleteAll?: boolean;
}

export type PM2Callback<T = any> = (err: Error | null, result?: T) => void;

export interface PM2Interface {
  connect(callback: PM2Callback): void;
  disconnect(): void;
  start(options: PM2StartOptions, callback: PM2Callback<PM2ProcessDescription>): void;
  stop(process: string | number, callback: PM2Callback<PM2ProcessDescription[]>): void;
  restart(process: string | number, callback: PM2Callback<PM2ProcessDescription[]>): void;
  delete(process: string | number, callback: PM2Callback<PM2ProcessDescription[]>): void;
  list(callback: PM2Callback<PM2ProcessDescription[]>): void;
  describe(process: string | number, callback: PM2Callback<PM2ProcessDescription[]>): void;
  logs(process: string | number, lines: number, callback: PM2Callback<any>): void;
  flush(process?: string | number, callback?: PM2Callback): void;
  reloadLogs(callback: PM2Callback): void;
  sendDataToProcessId(proc_id: number, packet: any, callback: PM2Callback): void;
  launchBus(callback: PM2Callback<any>): void;
}

export enum PM2Status {
  ONLINE = 'online',
  STOPPING = 'stopping',
  STOPPED = 'stopped',
  LAUNCHING = 'launching',
  ERRORED = 'errored',
  ONE_LAUNCH_STATUS = 'one-launch-status',
}
