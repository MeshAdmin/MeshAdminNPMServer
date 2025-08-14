/**
 * Electron Preload Script
 * Exposes safe IPC methods to the renderer process
 */

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File dialog methods
  selectFile: () => ipcRenderer.invoke('dialog:selectFile'),
  selectDirectory: () => ipcRenderer.invoke('dialog:selectDirectory'),
  
  // App info
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  
  // Window controls (if needed)
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
  
  // Platform info
  platform: process.platform
});
