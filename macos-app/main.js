const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Enable live reload for development
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

let mainWindow;
const isDev = process.env.NODE_ENV === 'development';

// macOS specific paths
const userDataPath = app.getPath('userData');
const foldersPath = path.join(userDataPath, 'folders.json');
const settingsPath = path.join(userDataPath, 'settings.json');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 350,
    minHeight: 500,
    maxWidth: 600,
    maxHeight: 800,
    resizable: true,
    titleBarStyle: 'hiddenInset', // macOS style title bar
    vibrancy: 'under-window', // macOS vibrancy effect
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    show: false, // Don't show until ready
    frame: true,
    titleBarOverlay: false
  });

  // Load the app
  mainWindow.loadFile('index.html');

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus on macOS
    if (process.platform === 'darwin') {
      app.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // macOS specific: Don't quit app when window is closed
  mainWindow.on('close', (event) => {
    if (process.platform === 'darwin') {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Development tools
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// App event handlers
app.whenReady().then(createWindow);

// macOS specific: Re-create window when dock icon is clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else if (mainWindow) {
    mainWindow.show();
  }
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// macOS specific: Handle app reopen
app.on('before-quit', () => {
  app.isQuiting = true;
});

// Ensure user data directory exists
function ensureUserDataDir() {
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }
}

// Initialize data files
function initializeDataFiles() {
  ensureUserDataDir();
  
  // Initialize folders.json
  if (!fs.existsSync(foldersPath)) {
    const initialFolders = { folders: [] };
    fs.writeFileSync(foldersPath, JSON.stringify(initialFolders, null, 2));
  }
  
  // Initialize settings.json
  if (!fs.existsSync(settingsPath)) {
    const initialSettings = {
      applications: {},
      templates: {
        'vfx-artist': {
          name: 'VFX Artist',
          folders: ['AE_Comps', 'Nuke_Scripts', 'Renders', 'Plates_Raw', 'Elements_CGI', 'References']
        },
        '3d-artist': {
          name: '3D Artist', 
          folders: ['Maya_Scenes', 'Blender_Files', 'Textures', 'Renders', 'Models_Export', 'References']
        },
        'developer': {
          name: 'Developer',
          folders: ['src', 'docs', 'tests', 'assets', 'build', 'README.md']
        },
        'graphic-designer': {
          name: 'Graphic Designer',
          folders: ['Photoshop_Files', 'Illustrator_Files', 'InDesign_Files', 'Final_Exports', 'Assets_Fonts', 'References']
        },
        'video-editor': {
          name: 'Video Editor',
          folders: ['Premiere_Projects', 'DaVinci_Projects', 'Raw_Footage', 'Audio', 'Final_Exports', 'Graphics_Motion']
        },
        'photographer': {
          name: 'Photographer',
          folders: ['RAW_Files', 'Lightroom_Catalog', 'Edited_Photos', 'Final_Delivery', 'Contact_Sheets']
        }
      }
    };
    fs.writeFileSync(settingsPath, JSON.stringify(initialSettings, null, 2));
  }
}

// IPC Handlers

// Load folders
ipcMain.handle('load-folders', () => {
  try {
    const data = fs.readFileSync(foldersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading folders:', error);
    return { folders: [] };
  }
});

// Save folders
ipcMain.handle('save-folders', (event, folders) => {
  try {
    fs.writeFileSync(foldersPath, JSON.stringify(folders, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving folders:', error);
    return false;
  }
});

// Load settings
ipcMain.handle('load-settings', () => {
  try {
    const data = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading settings:', error);
    return { applications: {}, templates: {} };
  }
});

// Save settings
ipcMain.handle('save-settings', (event, settings) => {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
});

// Open folder dialog
ipcMain.handle('open-folder-dialog', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      title: 'Select Folder',
      buttonLabel: 'Select Folder'
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  } catch (error) {
    console.error('Error opening folder dialog:', error);
    return null;
  }
});

// Open file dialog for applications
ipcMain.handle('open-file-dialog', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      title: 'Select Application',
      buttonLabel: 'Select Application',
      filters: [
        { name: 'Applications', extensions: ['app'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  } catch (error) {
    console.error('Error opening file dialog:', error);
    return null;
  }
});

// Open folder in Finder
ipcMain.handle('open-folder', async (event, folderPath) => {
  try {
    // Use shell.openPath for better macOS integration
    const result = await shell.openPath(folderPath);
    if (result) {
      console.error('Error opening folder:', result);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error opening folder:', error);
    return false;
  }
});

// Launch application
ipcMain.handle('launch-application', async (event, appPath) => {
  try {
    if (!appPath || !fs.existsSync(appPath)) {
      console.error('Application path not found:', appPath);
      return false;
    }

    // macOS specific: Handle .app bundles
    if (appPath.endsWith('.app')) {
      spawn('open', ['-a', appPath], { detached: true });
    } else {
      spawn(appPath, [], { detached: true });
    }
    
    return true;
  } catch (error) {
    console.error('Error launching application:', error);
    return false;
  }
});

// Create project folder structure
ipcMain.handle('create-project', async (event, projectPath, template) => {
  try {
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    // Create template folders
    if (template && template.folders) {
      for (const folder of template.folders) {
        const folderPath = path.join(projectPath, folder);
        if (!fs.existsSync(folderPath)) {
          if (folder.includes('.')) {
            // Create file
            fs.writeFileSync(folderPath, '');
          } else {
            // Create directory
            fs.mkdirSync(folderPath, { recursive: true });
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Error creating project:', error);
    return false;
  }
});

// Get system information
ipcMain.handle('get-system-info', () => {
  return {
    platform: process.platform,
    version: process.getSystemVersion(),
    appVersion: app.getVersion(),
    electronVersion: process.versions.electron,
    nodeVersion: process.versions.node
  };
});

// Show message box
ipcMain.handle('show-message-box', async (event, options) => {
  try {
    const result = await dialog.showMessageBox(mainWindow, options);
    return result;
  } catch (error) {
    console.error('Error showing message box:', error);
    return null;
  }
});

// Initialize the app
app.whenReady().then(() => {
  initializeDataFiles();
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
  if (isDev) {
    // In development, ignore certificate errors
    event.preventDefault();
    callback(true);
  } else {
    // In production, use default behavior
    callback(false);
  }
});

// macOS specific: Handle URL scheme (for future use)
app.setAsDefaultProtocolClient('quick-folder-launcher');

app.on('open-url', (event, url) => {
  event.preventDefault();
  // Handle custom URL schemes if needed
  console.log('Opened URL:', url);
});
