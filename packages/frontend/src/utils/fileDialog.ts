/**
 * File dialog utility that works with Electron when available
 * Falls back to browser file input when not in Electron
 */

interface ElectronAPI {
  selectFile: () => Promise<string | null>;
  selectDirectory: () => Promise<string | null>;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

/**
 * Opens a file selection dialog
 * @returns The selected file path or null if cancelled
 */
export async function selectFile(): Promise<string | null> {
  // Check if we're running in Electron with IPC exposed
  if (window.electronAPI?.selectFile) {
    try {
      return await window.electronAPI.selectFile();
    } catch (error) {
      console.error('Error selecting file:', error);
      return null;
    }
  }
  
  // Fallback for browser - use file input
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In browser, we can only get the file name, not the full path
        resolve(file.name);
      } else {
        resolve(null);
      }
    };
    input.oncancel = () => resolve(null);
    input.click();
  });
}

/**
 * Opens a directory selection dialog
 * @returns The selected directory path or null if cancelled
 */
export async function selectDirectory(): Promise<string | null> {
  // Check if we're running in Electron with IPC exposed
  if (window.electronAPI?.selectDirectory) {
    try {
      return await window.electronAPI.selectDirectory();
    } catch (error) {
      console.error('Error selecting directory:', error);
      return null;
    }
  }
  
  // Fallback for browser - use directory input (limited support)
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    // @ts-expect-error - webkitdirectory is not in the type definitions
    input.webkitdirectory = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        // Extract directory name from the first file's path
        const path = files[0].webkitRelativePath;
        const dirName = path.split('/')[0];
        resolve(dirName);
      } else {
        resolve(null);
      }
    };
    input.oncancel = () => resolve(null);
    input.click();
  });
}

/**
 * Check if we're running in Electron
 */
export function isElectron(): boolean {
  return !!window.electronAPI;
}
