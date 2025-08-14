const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

// In development, wait for the dev server
let waitOn;
if (isDev) {
  try {
    waitOn = require('wait-on');
  } catch (error) {
    console.warn('wait-on not found, proceeding without waiting for dev server');
  }
}

// Keep a global reference of the window object
let mainWindow;
let backendProcess;

async function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    icon: path.join(__dirname, '../resources/icon.png'),
    titleBarStyle: 'default', // Changed from 'hiddenInset' to 'default' for better window dragging
    show: false, // Don't show until ready
  });

  // Set up the menu
  createMenu();

  // Load the app
  if (isDev) {
    // In development, wait for dev server and then load
    if (waitOn) {
      try {
        console.log('Waiting for Vite dev server at http://localhost:5555...');
        await waitOn({
          resources: ['http://localhost:5555'],
          timeout: 30000, // 30 second timeout
          delay: 1000, // Initial delay
          interval: 100, // Polling interval
        });
        console.log('Vite dev server is ready!');
      } catch (error) {
        console.warn('Timeout waiting for dev server, proceeding anyway:', error.message);
      }
    }
    mainWindow.loadURL('http://localhost:5555');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built frontend
    mainWindow.loadFile(path.join(__dirname, '../packages/frontend/dist/index.html'));
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle navigation to external URLs
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (
      parsedUrl.origin !== 'http://localhost:5555' &&
      parsedUrl.origin !== 'http://localhost:3001'
    ) {
      event.preventDefault();
      shell.openExternal(navigationUrl);
    }
  });
}

function createMenu() {
  const template = [
    {
      label: 'MeshAdmin',
      submenu: [
        {
          label: 'About MeshAdmin',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About MeshAdmin',
              message: 'MeshAdmin NPM Server',
              detail:
                'A modern administration panel for managing network services with real-time monitoring and comprehensive logging.',
              buttons: ['OK'],
            });
          },
        },
        { type: 'separator' },
        {
          label: 'Preferences...',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // TODO: Implement preferences window
            mainWindow.webContents.send('open-settings');
          },
        },
        { type: 'separator' },
        {
          label: 'Hide MeshAdmin',
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Services',
      submenu: [
        {
          label: 'Refresh Services',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.send('refresh-services');
          },
        },
        {
          label: 'Start All Services',
          click: () => {
            mainWindow.webContents.send('start-all-services');
          },
        },
        {
          label: 'Stop All Services',
          click: () => {
            mainWindow.webContents.send('stop-all-services');
          },
        },
      ],
    },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: 'close' }, { type: 'separator' }, { role: 'front' }],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://github.com/your-username/MeshAdminNPMServer#readme');
          },
        },
        {
          label: 'Report Issue',
          click: () => {
            shell.openExternal('https://github.com/your-username/MeshAdminNPMServer/issues');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function startBackend() {
  if (!isDev) {
    // In production, start the backend server
    backendProcess = spawn('node', ['packages/backend/dist/index.js'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });

    backendProcess.on('error', err => {
      console.error('Failed to start backend process:', err);
      dialog.showErrorBox(
        'Backend Error',
        'Failed to start the backend server. Please check your installation.'
      );
    });

    backendProcess.on('exit', code => {
      if (code !== 0) {
        console.error(`Backend process exited with code ${code}`);
      }
    });
  }
}

function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
}

// Disable hardware acceleration completely to fix macOS GPU issues
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-sandbox');

// Additional flags for better stability
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('disable-dev-shm-usage');

// App event handlers
app.whenReady().then(() => {
  createWindow();

  // Temporarily disable backend startup for testing
  // if (!isDev) {
  //   startBackend();
  // }

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    stopBackend();
    app.quit();
  }
});

app.on('before-quit', () => {
  stopBackend();
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev && url.startsWith('https://localhost')) {
    // In development, ignore certificate errors for localhost
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});
