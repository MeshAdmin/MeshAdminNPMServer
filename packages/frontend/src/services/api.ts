import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  type: string;
  config?: any;
  status: 'RUNNING' | 'STOPPED' | 'ERROR' | 'RESTARTING' | 'STOPPING' | 'STARTING' | 'UNKNOWN';
  createdAt: string;
  updatedAt: string;
}

export interface ServiceLog {
  id: string;
  serviceId: string;
  message: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  source?: string;
  timestamp: string;
}

export interface SystemStats {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    usage: number;
    total: number;
    used: number;
    free: number;
  };
  disk: {
    usage: number;
    total: number;
    used: number;
    free: number;
  };
  network: {
    interfaces: Array<{
      name: string;
      bytesReceived: number;
      bytesSent: number;
    }>;
  };
  timestamp: number;
}

// API Service Class
class ApiService {
  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await api.get('/health');
    return response.data;
  }

  // Services API
  async getServices(): Promise<ApiResponse<Service[]>> {
    const response = await api.get('/services');
    return response.data;
  }

  async getService(id: string): Promise<ApiResponse<Service>> {
    const response = await api.get(`/services/${id}`);
    return response.data;
  }

  async createService(serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    const response = await api.post('/services', serviceData);
    return response.data;
  }

  async updateService(id: string, serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  }

  async deleteService(id: string): Promise<ApiResponse> {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  }

  async startService(id: string): Promise<ApiResponse<Service>> {
    const response = await api.post(`/services/${id}/start`);
    return response.data;
  }

  async stopService(id: string): Promise<ApiResponse<Service>> {
    const response = await api.post(`/services/${id}/stop`);
    return response.data;
  }

  async restartService(id: string): Promise<ApiResponse<Service>> {
    const response = await api.post(`/services/${id}/restart`);
    return response.data;
  }

  // System Stats API
  async getServerStats(): Promise<ApiResponse<SystemStats>> {
    const response = await api.get('/server/stats');
    return response.data;
  }

  async getSystemMonitoringLatest(): Promise<ApiResponse<SystemStats>> {
    const response = await api.get('/system-monitoring/latest');
    return response.data;
  }

  async getSystemMonitoringHistory(
    count: number = 100
  ): Promise<ApiResponse<{ count: number; metrics: SystemStats[] }>> {
    const response = await api.get(`/system-monitoring/history?count=${count}`);
    return response.data;
  }

  // Service Metrics API
  async getServiceMetrics(id: string): Promise<ApiResponse<ServiceMetrics>> {
    const response = await api.get(`/service-metrics/${id}/metrics`);
    return response.data;
  }

  async getServiceLogs(
    id: string,
    lines: number = 100,
    level?: string,
    source?: string
  ): Promise<ApiResponse<ServiceLog[]>> {
    const params = new URLSearchParams({ lines: lines.toString() });
    if (level) params.append('level', level);
    if (source) params.append('source', source);

    const response = await api.get(`/service-metrics/${id}/logs?${params}`);
    return response.data;
  }

  async getServiceHistoricalMetrics(
    id: string,
    hours: number = 24
  ): Promise<ApiResponse<ServiceHistoricalMetrics>> {
    const response = await api.get(`/service-metrics/${id}/metrics/history?hours=${hours}`);
    return response.data;
  }

  async getServicesMetricsSummary(): Promise<ApiResponse<ServiceMetricsSummary[]>> {
    const response = await api.get('/service-metrics/summary');
    return response.data;
  }
}

// Additional types for service metrics
export interface ServiceMetrics {
  serviceId: string;
  serviceName: string;
  metrics: {
    cpu: number;
    memory: {
      usage: number;
      total: number;
      percent: number;
    };
    uptime: number;
    restarts: number;
    pid?: number;
    status: string;
  };
  timestamp: number;
}

export interface ServiceHistoricalMetrics {
  serviceId: string;
  hours: number;
  dataPoints: number;
  metrics: Array<{
    timestamp: number;
    cpu: number;
    memory: number;
    uptime: number;
  }>;
}

export interface ServiceMetricsSummary {
  serviceId: string;
  serviceName: string;
  status: string;
  metrics: {
    cpu: number;
    memory: number;
    uptime: number;
    restarts: number;
    pid?: number;
  };
  timestamp: number;
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
