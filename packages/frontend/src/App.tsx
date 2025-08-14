import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useServices,
  useSystemStats,
  useServiceMutations,
  useServicesMetricsSummary,
  useServiceMetrics,
} from './hooks/useServices';
import { Service as ApiService } from './services/api';
import ServiceConfigModal from './components/modals/ServiceConfigModal';
import CreateServiceModal from './components/modals/CreateServiceModal';
import {
  Server,
  Play,
  Square,
  RotateCcw,
  Settings,
  Activity,
  Cpu,
  Database,
  HardDrive,
  Wifi,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  Plus,
  Trash2,
  Info,
} from 'lucide-react';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5000, // Consider data stale after 5 seconds
    },
  },
});

// Convert API status to frontend status
const convertStatus = (apiStatus: string): 'running' | 'stopped' | 'error' => {
  switch (apiStatus.toUpperCase()) {
    case 'RUNNING':
      return 'running';
    case 'STOPPED':
      return 'stopped';
    case 'ERROR':
    case 'UNKNOWN':
      return 'error';
    default:
      return 'stopped';
  }
};

const StatusBadge = ({ status }: { status: 'running' | 'stopped' | 'error' }) => {
  const statusConfig = {
    running: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/20' },
    stopped: { icon: XCircle, color: 'text-gray-400', bg: 'bg-gray-400/20' },
    error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/20' },
  };

  const { icon: Icon, color, bg } = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bg} ${color}`}>
      <Icon size={14} />
      <span className="text-sm font-medium capitalize">{status}</span>
    </div>
  );
};

interface ServiceCardProps {
  service: ApiService;
  onAction: (serviceId: string, action: string) => void;
  isLoading?: boolean;
  onDelete?: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAction, isLoading = false, onDelete }) => {
  const { data: serviceMetrics, isLoading: metricsLoading } = useServiceMetrics(service.id);

  const handleAction = (action: string) => {
    if (!isLoading) {
      onAction(service.id, action);
    }
  };

  const status = convertStatus(service.status);
  const config = service.config || {};
  const port = config.port || 'N/A';

  // Format uptime from seconds to human readable
  const formatUptime = (uptimeSeconds: number) => {
    if (!uptimeSeconds) return '0s';
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Format memory from bytes to MB
  const formatMemory = (bytes: number) => {
    if (!bytes) return '--';
    return Math.round(bytes / (1024 * 1024));
  };

  const metrics = serviceMetrics?.metrics;
  const cpuValue = metrics?.cpu?.toFixed(1) || '--';
  const memoryValue = metrics?.memory?.usage ? formatMemory(metrics.memory.usage) : '--';
  const uptimeValue = metrics?.uptime ? formatUptime(metrics.uptime) : '--';

  return (
    <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/80 transition-all duration-300 group backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-1">{service.name}</h3>
          <p className="text-gray-300 text-sm">Port {port}</p>
          {service.description && (
            <p className="text-gray-400 text-xs mt-1">{service.description}</p>
          )}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-100">
            {metricsLoading ? (
              <Loader2 size={20} className="animate-spin mx-auto" />
            ) : (
              `${memoryValue}${memoryValue !== '--' ? 'MB' : ''}`
            )}
          </div>
          <div className="text-xs text-gray-300">Memory</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-100">
            {metricsLoading ? (
              <Loader2 size={20} className="animate-spin mx-auto" />
            ) : (
              `${cpuValue}${cpuValue !== '--' ? '%' : ''}`
            )}
          </div>
          <div className="text-xs text-gray-300">CPU</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-100">
            {metricsLoading ? <Loader2 size={20} className="animate-spin mx-auto" /> : uptimeValue}
          </div>
          <div className="text-xs text-gray-300">Uptime</div>
        </div>
      </div>

      <div className="flex gap-2">
        {status === 'running' ? (
          <button
            onClick={() => handleAction('stop')}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/30 text-red-300 rounded-lg hover:bg-red-600/40 transition-colors border border-red-500/20 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Square size={14} />}
            Stop
          </button>
        ) : (
          <button
            onClick={() => handleAction('start')}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-green-600/30 text-green-300 rounded-lg hover:bg-green-600/40 transition-colors border border-green-500/20 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Start
          </button>
        )}
        <button
          onClick={() => handleAction('restart')}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/40 transition-colors border border-blue-500/20 disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
          Restart
        </button>
        <button
          onClick={() => handleAction('config')}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/40 transition-colors border border-purple-500/20 disabled:opacity-50"
        >
          <Settings size={14} />
          Config
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Activity size={16} />
          {metricsLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            `${status === 'running' ? 'Running' : 'Stopped'}`
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAction(service.id, 'config')}
            className="p-1.5 text-gray-400 hover:bg-gray-700 rounded transition-colors"
            title="Configure Service"
          >
            <Settings className="h-4 w-4" />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(service.id)}
              className="p-1.5 text-red-400 hover:bg-gray-700 rounded transition-colors"
              title="Delete Service"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  isLoading = false,
}: {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/80 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-gray-100" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-100 mb-1">
        {isLoading ? <Loader2 size={20} className="animate-spin" /> : `${value}${unit}`}
      </div>
      <div className="text-gray-300 text-sm">{title}</div>
    </div>
  );
};

function AppContent() {
  const { data: services, isLoading: servicesLoading, error: servicesError, refetch: refetchServices } = useServices();
  const { data: systemStats, isLoading: statsLoading } = useSystemStats();
  const { startService, stopService, restartService, deleteService, createService } = useServiceMutations();
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ApiService | null>(null);

  const handleServiceAction = async (serviceId: string, action: string) => {
    try {
      switch (action) {
        case 'start':
          await startService.mutateAsync(serviceId);
          break;
        case 'stop':
          await stopService.mutateAsync(serviceId);
          break;
        case 'restart':
          await restartService.mutateAsync(serviceId);
          break;
        case 'config': {
          const service = services?.find((s: any) => s.id === serviceId);
          if (service) {
            setSelectedService(service);
            setConfigModalOpen(true);
          }
          break;
        }
      }
    } catch (error) {
      console.error('Service action failed:', error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    const service = services?.find((s: any) => s.id === serviceId);
    if (!service) return;
    
    if (window.confirm(`Are you sure you want to delete the service "${service.name}"?\n\nThis action cannot be undone.`)) {
      try {
        await deleteService.mutateAsync(serviceId);
        refetchServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  const handleConfigSave = (_serviceId: string, config: any) => {
    // Refresh services to get updated config
    // The useServices hook will automatically refetch
    console.log(`Configuration saved for service ${_serviceId}:`, config);
  };

  const handleCreateService = async (serviceData: any) => {
    try {
      await createService.mutateAsync(serviceData);
      refetchServices();
    } catch (error) {
      console.error('Failed to create service:', error);
    }
  };

  const isServiceActionLoading = (serviceId: string) => {
    return startService.isPending || stopService.isPending || restartService.isPending;
  };

  if (servicesError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-4">Failed to connect to the backend server.</p>
          <p className="text-sm text-gray-500">Make sure the backend is running on port 3001</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/30 rounded-xl border border-blue-500/20">
                <Server size={32} className="text-blue-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-100">NPM Server Manager</h1>
                <p className="text-gray-300">
                  Professional development & production server management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600/30 text-green-300 rounded-lg border border-green-500/20">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-200">Backend Connected</span>
              </div>
            </div>
          </div>
        </header>

        {/* Server Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="CPU Usage"
            value={systemStats?.cpu?.usage?.toFixed(1) || '--'}
            unit="%"
            icon={Cpu}
            color="bg-blue-600/30"
            isLoading={statsLoading}
          />
          <StatsCard
            title="Memory Usage"
            value={systemStats?.memory?.usage?.toFixed(1) || '--'}
            unit="%"
            icon={Database}
            color="bg-green-600/30"
            isLoading={statsLoading}
          />
          <StatsCard
            title="Disk Usage"
            value={systemStats?.disk?.usage?.toFixed(1) || '--'}
            unit="%"
            icon={HardDrive}
            color="bg-purple-600/30"
            isLoading={statsLoading}
          />
          <StatsCard
            title="Network I/O"
            value="--"
            unit="MB/s"
            icon={Wifi}
            color="bg-orange-600/30"
            isLoading={statsLoading}
          />
        </div>

        {/* Active Services */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">Active Services</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span>Create Service</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Activity size={16} />
                {servicesLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  `${services?.filter(s => convertStatus(s.status) === 'running').length || 0} of ${services?.length || 0} running`
                )}
              </div>
            </div>
          </div>

          {servicesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-blue-400" />
              <span className="ml-3 text-gray-300">Loading services...</span>
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((service: any) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onAction={handleServiceAction}
                  isLoading={isServiceActionLoading(service.id)}
                  onDelete={handleDeleteService}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Server size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No Services Found</h3>
              <p className="text-gray-500">No services are currently configured in the system.</p>
            </div>
          )}
        </div>
      </div>

      {/* Service Configuration Modal */}
      <ServiceConfigModal
        service={selectedService}
        isOpen={configModalOpen}
        onClose={() => {
          setConfigModalOpen(false);
          setSelectedService(null);
        }}
        onSave={handleConfigSave}
      />

      {/* Create Service Modal */}
      <CreateServiceModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateService}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
