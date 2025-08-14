const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  getVersion: () => process.versions.electron,
  getPlatform: () => process.platform,

  // IPC communication
  send: (channel, data) => {
    // Whitelist channels for security
    const validChannels = [
      'refresh-services',
      'start-all-services',
      'stop-all-services',
      'open-settings',
      'service-action',
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  receive: (channel, func) => {
    const validChannels = [
      'refresh-services',
      'start-all-services',
      'stop-all-services',
      'open-settings',
      'service-status-update',
    ];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  // Service management
  startService: serviceId => {
    ipcRenderer.send('service-action', { action: 'start', serviceId });
  },

  stopService: serviceId => {
    ipcRenderer.send('service-action', { action: 'stop', serviceId });
  },

  restartService: serviceId => {
    ipcRenderer.send('service-action', { action: 'restart', serviceId });
  },

  // Settings
  openSettings: () => {
    ipcRenderer.send('open-settings');
  },

  // System information
  getSystemInfo: () => ({
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.versions.node,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
  }),
});

// Log that preload script has loaded
console.log('Electron preload script loaded successfully');
