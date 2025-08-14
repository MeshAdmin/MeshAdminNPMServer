export interface PackageInfo {
  name: string;
  current?: string;
  wanted?: string;
  latest?: string;
  location?: string;
  type?: string;
  homepage?: string;
}

export interface OutdatedPackage extends PackageInfo {
  current: string;
  wanted: string;
  latest: string;
}

export interface PackageManagerOperation {
  id: string;
  type: 'list-outdated' | 'install' | 'upgrade' | 'remove';
  package?: string;
  packages?: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  output: string[];
  error?: string;
  startTime: Date;
  endTime?: Date;
}

export interface PackageManagerProgress {
  operationId: string;
  type: string;
  progress: number;
  message: string;
  data?: any;
}

export interface PackageManagerCommand {
  command: string;
  args: string[];
  cwd?: string;
}

export type PackageManagerType = 'npm' | 'pnpm' | 'yarn';

export interface PackageManagerConfig {
  type: PackageManagerType;
  workingDirectory: string;
  timeout?: number;
}

export interface InstallOptions {
  isDev?: boolean;
  isGlobal?: boolean;
  save?: boolean;
  exact?: boolean;
}

export interface UpgradeOptions {
  latest?: boolean;
  interactive?: boolean;
}

export interface RemoveOptions {
  isGlobal?: boolean;
}
