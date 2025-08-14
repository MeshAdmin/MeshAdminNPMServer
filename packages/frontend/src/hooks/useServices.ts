import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  apiService,
  Service,
  SystemStats,
  ServiceMetrics,
  ServiceLog,
  ServiceMetricsSummary,
} from '../services/api';

// Query keys
export const QUERY_KEYS = {
  SERVICES: 'services',
  SERVICE: 'service',
  SERVICE_LOGS: 'service-logs',
  SERVICE_METRICS: 'service-metrics',
  SERVICES_METRICS_SUMMARY: 'services-metrics-summary',
  SYSTEM_STATS: 'system-stats',
  HEALTH: 'health',
} as const;

// Services hooks
export function useServices() {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICES],
    queryFn: async () => {
      const response = await apiService.getServices();
      return response.data;
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICE, id],
    queryFn: async () => {
      const response = await apiService.getService(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useServiceLogs(id: string, lines: number = 100) {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICE_LOGS, id, lines],
    queryFn: async () => {
      const response = await apiService.getServiceLogs(id, lines);
      return response.data;
    },
    enabled: !!id,
    refetchInterval: 2000, // Refetch every 2 seconds for logs
  });
}

// Service mutation hooks
export function useServiceMutations() {
  const queryClient = useQueryClient();

  const invalidateServices = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERVICES] });
  };

  const startService = useMutation({
    mutationFn: (id: string) => apiService.startService(id),
    onSuccess: () => {
      invalidateServices();
    },
  });

  const stopService = useMutation({
    mutationFn: (id: string) => apiService.stopService(id),
    onSuccess: () => {
      invalidateServices();
    },
  });

  const restartService = useMutation({
    mutationFn: (id: string) => apiService.restartService(id),
    onSuccess: () => {
      invalidateServices();
    },
  });

  const createService = useMutation({
    mutationFn: (serviceData: Partial<Service>) => apiService.createService(serviceData),
    onSuccess: () => {
      invalidateServices();
    },
  });

  const updateService = useMutation({
    mutationFn: ({ id, ...serviceData }: Partial<Service> & { id: string }) =>
      apiService.updateService(id, serviceData),
    onSuccess: () => {
      invalidateServices();
    },
  });

  const deleteService = useMutation({
    mutationFn: (id: string) => apiService.deleteService(id),
    onSuccess: () => {
      invalidateServices();
    },
  });

  return {
    startService,
    stopService,
    restartService,
    createService,
    updateService,
    deleteService,
  };
}

// System stats hooks
export function useSystemStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.SYSTEM_STATS],
    queryFn: async () => {
      try {
        const response = await apiService.getServerStats();
        return response.data;
      } catch (error) {
        // Fallback to system monitoring endpoint
        const response = await apiService.getSystemMonitoringLatest();
        return response.data;
      }
    },
    refetchInterval: 3000, // Refetch every 3 seconds
  });
}

export function useSystemStatsHistory(count: number = 60) {
  return useQuery({
    queryKey: [QUERY_KEYS.SYSTEM_STATS, 'history', count],
    queryFn: async () => {
      const response = await apiService.getSystemMonitoringHistory(count);
      return response.data;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

// Health check hook
export function useHealthCheck() {
  return useQuery({
    queryKey: [QUERY_KEYS.HEALTH],
    queryFn: async () => {
      const response = await apiService.healthCheck();
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Service metrics hooks
export function useServiceMetrics(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICE_METRICS, id],
    queryFn: async () => {
      const response = await apiService.getServiceMetrics(id);
      return response.data;
    },
    enabled: !!id,
    refetchInterval: 5000, // Refetch every 5 seconds
  });
}

export function useServicesMetricsSummary() {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICES_METRICS_SUMMARY],
    queryFn: async () => {
      const response = await apiService.getServicesMetricsSummary();
      return response.data;
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
}
