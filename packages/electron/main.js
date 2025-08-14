const { app, BrowserWindow, ipcMain, dialog, Menu, shell } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const fs = require('fs');

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

let mainWindow;
let backendProcess;

// Function to load environment variables from .env files
function loadEnvironmentVariables() {
  const envVars = {};
  
  // Try to find .env files in the project root
  let envPath;
  let devEnvPath;
  
  if (app.isPackaged) {
    // In packaged app, look relative to the Resources directory
    const resourcesPath = process.resourcesPath;
    envPath = path.join(resourcesPath, '..', '..', '..', '..', '.env');
    devEnvPath = path.join(resourcesPath, '..', '..', '..', '..', '.env.development');
  } else {
    // In development, look relative to the project root
    envPath = path.join(__dirname, '..', '..', '.env');
    devEnvPath = path.join(__dirname, '..', '..', '.env.development');
  }
  
  // Load .env file if it exists
  if (fs.existsSync(envPath)) {
    try {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim();
          }
        }
      });
      log.info(`Loaded .env from: ${envPath}`);
    } catch (error) {
      log.warn(`Failed to load .env from ${envPath}:`, error);
    }
  } else {
    log.warn(`No .env file found at: ${envPath}`);
  }
  
  // Load .env.development file if it exists (for development overrides)
  if (fs.existsSync(devEnvPath)) {
    try {
      const envContent = fs.readFileSync(devEnvPath, 'utf8');
      const lines = envContent.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim();
          }
        }
      });
      log.info(`Loaded .env.development from: ${devEnvPath}`);
    } catch (error) {
      log.warn(`Failed to load .env.development from ${devEnvPath}:`, error);
    }
  }
  
  // Generate secure production secrets for packaged app
  const generateSecureSecret = (length = 64) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Set production defaults for required variables if missing
  const requiredDefaults = {
    NODE_ENV: 'production',
    PORT: '3001',
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/meshadmin_dev',
    JWT_SECRET: generateSecureSecret(64),
    JWT_REFRESH_SECRET: generateSecureSecret(64), 
    REDIS_URL: 'redis://localhost:6379',
    REDIS_PASSWORD: generateSecureSecret(32),
    CORS_ORIGIN: 'http://localhost:5173'
  };
  
  Object.keys(requiredDefaults).forEach(key => {
    if (!envVars[key]) {
      envVars[key] = requiredDefaults[key];
      log.info(`Using default value for ${key}`);
    }
  });
  
  return envVars;
}

// Start the backend server
function startBackend() {
  if (!isDev) {
    try {
      // Set environment variables for the backend
      process.env.NODE_ENV = 'production';
      process.env.PORT = '3001';
      
      // In production, backend files are packaged with the app
      // electron-builder copies ../backend/dist/* preserving the relative structure
      let backendPath;
      const fs = require('fs');
      
      if (app.isPackaged) {
        // In packaged app, backend is in Resources folder via extraResources
        const possiblePaths = [
          // Primary location: Resources folder (extraResources)
          path.join(process.resourcesPath, 'backend', 'dist', 'index.js'),
          // Fallback: might be unpacked from asar
          path.join(process.resourcesPath, 'app.asar.unpacked', 'backend', 'dist', 'index.js'),
          // Legacy paths for compatibility
          path.join(__dirname, '..', 'backend', 'dist', 'index.js'),
          path.join(__dirname, 'backend', 'dist', 'index.js'),
        ];
        
        log.info('Searching for backend in packaged app...');
        for (const tryPath of possiblePaths) {
          log.info(`Checking: ${tryPath}`);
          if (fs.existsSync(tryPath)) {
            backendPath = tryPath;
            log.info(`Found backend at: ${backendPath}`);
            break;
          }
        }
        
        if (!backendPath) {
          // List directory contents to help debug
          log.error('Backend not found. Current directory contents:');
          try {
            const files = fs.readdirSync(__dirname);
            log.error(`Files in ${__dirname}: ${files.join(', ')}`);
            
            const parentDir = path.join(__dirname, '..');
            const parentFiles = fs.readdirSync(parentDir);
            log.error(`Files in parent: ${parentFiles.join(', ')}`);
          } catch (e) {
            log.error('Could not list directory contents:', e);
          }
          throw new Error('Backend server files not found in packaged app');
        }
      } else {
        // Development path
        backendPath = path.join(__dirname, '../backend/dist/index.js');
      }
      
      log.info(`Starting backend from: ${backendPath}`);
      
      // Load environment variables from .env files
      const envVars = loadEnvironmentVariables();
      
      // Set environment variables in current process so child inherits them
      Object.keys(envVars).forEach(key => {
        process.env[key] = envVars[key];
        log.info(`Set environment variable: ${key}=${envVars[key]}`);
      });
      
      // Run backend in a child process to avoid blocking the main process
      const { fork } = require('child_process');
      
      // Set working directory to Resources folder so dotenv-flow can find .env files
      const resourcesPath = path.dirname(path.dirname(backendPath)); // Go up from backend/dist to Resources
      
      backendProcess = fork(backendPath, [], {
        // Child process will inherit environment variables from current process
        cwd: resourcesPath, // Set working directory to Resources folder
        silent: true, // Capture output to see errors
        execArgv: [] // Clear any Node.js flags that might cause issues
      });
      
      // Capture stdout and stderr for debugging
      backendProcess.stdout.on('data', (data) => {
        log.info(`Backend stdout: ${data}`);
      });
      
      backendProcess.stderr.on('data', (data) => {
        log.error(`Backend stderr: ${data}`);
      });
      
      backendProcess.on('error', (error) => {
        log.error('Backend process error:', error);
        dialog.showErrorBox('Backend Error', `Backend process error: ${error.message}`);
      });
      
      backendProcess.on('exit', (code) => {
        log.info(`Backend process exited with code ${code}`);
        if (code !== 0 && code !== null) {
          // Show captured error output if any
          dialog.showErrorBox('Backend Error', `Backend process crashed with code ${code}. Check the logs for details.`);
        }
      });
      
      log.info('Backend server process started');
    } catch (error) {
      log.error('Failed to start backend:', error);
      dialog.showErrorBox('Backend Error', `Failed to start backend server: ${error.message}`);
    }
  }
}

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#0f172a',
    show: false
  });

  // Create application menu
  const template = [
    {
      label: 'MeshAdmin',
      submenu: [
        { label: 'About MeshAdmin', role: 'about' },
        { type: 'separator' },
        { label: 'Preferences', accelerator: 'Cmd+,', click: () => { /* TODO: Open preferences */ } },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Cmd+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Cmd+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+Cmd+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Cmd+X', role: 'cut' },
        { label: 'Copy', accelerator: 'Cmd+C', role: 'copy' },
        { label: 'Paste', accelerator: 'Cmd+V', role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Reload', accelerator: 'Cmd+R', click: () => mainWindow.reload() },
        { label: 'Toggle DevTools', accelerator: 'Alt+Cmd+I', click: () => mainWindow.toggleDevTools() },
        { type: 'separator' },
        { label: 'Actual Size', accelerator: 'Cmd+0', role: 'resetZoom' },
        { label: 'Zoom In', accelerator: 'Cmd+Plus', role: 'zoomIn' },
        { label: 'Zoom Out', accelerator: 'Cmd+-', role: 'zoomOut' },
        { type: 'separator' },
        { label: 'Toggle Fullscreen', accelerator: 'Ctrl+Cmd+F', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { label: 'Minimize', accelerator: 'Cmd+M', role: 'minimize' },
        { label: 'Close', accelerator: 'Cmd+W', role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Documentation', click: () => shell.openExternal('https://meshadmin.docs') },
        { label: 'Report Issue', click: () => shell.openExternal('https://github.com/meshadmin/issues') }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5555');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Check for updates
    if (!isDev) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers for file dialogs
ipcMain.handle('dialog:selectFile', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'JavaScript', extensions: ['js', 'jsx', 'mjs'] },
      { name: 'TypeScript', extensions: ['ts', 'tsx'] },
      { name: 'Python', extensions: ['py'] },
      { name: 'Shell Scripts', extensions: ['sh', 'bash'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('dialog:selectDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// IPC Handler for app version
ipcMain.handle('app:getVersion', () => {
  return app.getVersion();
});

// App event handlers
app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  // Stop backend when app closes
  if (backendProcess) {
    backendProcess.kill();
  }
  
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle certificate errors (for development)
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    // Ignore certificate errors in development
    event.preventDefault();
    callback(true);
  } else {
    // In production, use default behavior
    callback(false);
  }
});

// Auto-updater events
autoUpdater.on('update-available', () => {
  log.info('Update available');
});

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded');
  autoUpdater.quitAndInstall();
});
