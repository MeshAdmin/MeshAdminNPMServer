// Mock data service for development when backend is not available
export const mockServices = [
  {
    id: '1',
    name: 'Frontend App',
    port: 3000,
    status: 'running',
    domain: 'app.localhost.com',
    type: 'web',
    memory: 125,
    cpu: 8,
    uptime: '2h 15m',
  },
  {
    id: '2',
    name: 'API Server',
    port: 8080,
    status: 'running',
    type: 'api',
    memory: 89,
    cpu: 12,
    uptime: '1h 45m',
  },
  {
    id: '3',
    name: 'Auth Service',
    port: 8081,
    status: 'stopped',
    type: 'microservice',
    memory: 0,
    cpu: 0,
    uptime: '0m',
  },
  {
    id: '4',
    name: 'Database Proxy',
    port: 5432,
    status: 'error',
    type: 'api',
    memory: 156,
    cpu: 3,
    uptime: '3h 22m',
  },
];

export const mockServerStats = {
  cpu: 23,
  memory: 67,
  disk: 45,
  network: 12,
};

// Mock API functions that return promises
export const mockServicesApi = {
  getServices: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockServices;
  },

  getServerStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockServerStats;
  },

  startService: async serviceId => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Service ${serviceId} started` };
  },

  stopService: async serviceId => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Service ${serviceId} stopped` };
  },

  restartService: async serviceId => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: `Service ${serviceId} restarted` };
  },

  updateServiceConfig: async (serviceId, config) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Service ${serviceId} config updated` };
  },

  createService: async serviceData => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Service ${serviceData.name} created` };
  },

  deleteService: async serviceId => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: `Service ${serviceId} deleted` };
  },

  getServiceLogs: async (serviceId, lines = 100) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      `[${new Date().toISOString()}] INFO: Service ${serviceId} is running`,
      `[${new Date().toISOString()}] DEBUG: Processing requests...`,
      `[${new Date().toISOString()}] INFO: Health check passed`,
    ];
  },
};
