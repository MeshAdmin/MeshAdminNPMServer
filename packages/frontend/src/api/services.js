import api from './axios.js';
import { mockServicesApi } from '../services/mockData.js';

// Check if we're in development and backend is not available
const isDevelopmentWithoutBackend = async () => {
  if (import.meta.env.MODE !== 'development') return false;
  try {
    await api.get('/health', { timeout: 1000 });
    return false;
  } catch {
    console.warn('Backend not available, using mock data for development');
    return true;
  }
};

// Service API functions
export const servicesApi = {
  // Get all services
  getServices: async () => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.getServices();
    }
    const response = await api.get('/services');
    return response.data;
  },

  // Get server stats
  getServerStats: async () => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.getServerStats();
    }
    const response = await api.get('/server/stats');
    return response.data;
  },

  // Start a service
  startService: async serviceId => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.startService(serviceId);
    }
    const response = await api.post(`/services/${serviceId}/start`);
    return response.data;
  },

  // Stop a service
  stopService: async serviceId => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.stopService(serviceId);
    }
    const response = await api.post(`/services/${serviceId}/stop`);
    return response.data;
  },

  // Restart a service
  restartService: async serviceId => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.restartService(serviceId);
    }
    const response = await api.post(`/services/${serviceId}/restart`);
    return response.data;
  },

  // Update service configuration
  updateServiceConfig: async (serviceId, config) => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.updateServiceConfig(serviceId, config);
    }
    const response = await api.put(`/services/${serviceId}/config`, config);
    return response.data;
  },

  // Create a new service
  createService: async serviceData => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.createService(serviceData);
    }
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  // Delete a service
  deleteService: async serviceId => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.deleteService(serviceId);
    }
    const response = await api.delete(`/services/${serviceId}`);
    return response.data;
  },

  // Get logs for a service
  getServiceLogs: async (serviceId, lines = 100) => {
    if (await isDevelopmentWithoutBackend()) {
      return mockServicesApi.getServiceLogs(serviceId, lines);
    }
    const response = await api.get(`/services/${serviceId}/logs?lines=${lines}`);
    return response.data;
  },
};

export default servicesApi;
