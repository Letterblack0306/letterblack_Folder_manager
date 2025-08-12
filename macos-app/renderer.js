// macOS specific renderer for Quick Folder Launcher
const { ipcRenderer, shell } = require('electron');

let folders = [];
let settings = {};
let currentTemplate = null;

// DOM elements
let folderList, folderNameInput, addFolderBtn, appButtons, templateSelect, createProjectBtn;

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  await loadData();
  setupEventListeners();
  updateUI();
  detectSystemTheme();
});

function initializeElements() {
  folderList = document.getElementById('folderList');
  folderNameInput = document.getElementById('folderName');
  addFolderBtn = document.getElementById('addFolderBtn');
  templateSelect = document.getElementById('templateSelect');
  createProjectBtn = document.getElementById('createProjectBtn');
  
  // Application buttons (will be created dynamically)
  appButtons = {
    afterEffects: document.getElementById('afterEffectsBtn'),
    premierePro: document.getElementById('premiereProBtn'),
    app3: document.getElementById('app3Btn'),
    app4: document.getElementById('app4Btn')
  };
}

async function loadData() {
  try {
    const foldersData = await ipcRenderer.invoke('load-folders');
    const settingsData = await ipcRenderer.invoke('load-settings');
    
    folders = foldersData.folders || [];
    settings = settingsData || { applications: {}, templates: {} };
    
    console.log('Loaded data:', { folders: folders.length, settings });
  } catch (error) {
    console.error('Error loading data:', error);
    folders = [];
    settings = { applications: {}, templates: {} };
  }
}

function setupEventListeners() {
  // Add folder button
  addFolderBtn.addEventListener('click', addFolder);
  
  // Enter key in folder name input
  folderNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addFolder();
    }
  });
  
  // Template selection
  templateSelect.addEventListener('change', (e) => {
    const templateId = e.target.value;
    currentTemplate = settings.templates[templateId] || null;
    updateCreateProjectButton();
  });
  
  // Create project button
  createProjectBtn.addEventListener('click', createProject);
  
  // Application buttons
  Object.keys(appButtons).forEach(appKey => {
    const button = appButtons[appKey];
    if (button) {
      // Launch button
      button.addEventListener('click', () => launchApplication(appKey));
      
      // Set path button
      const setPathBtn = button.nextElementSibling;
      if (setPathBtn && setPathBtn.classList.contains('set-path-btn')) {
        setPathBtn.addEventListener('click', () => setApplicationPath(appKey));
      }
    }
  });
  
  // macOS specific: Handle cmd+w to hide window
  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'w') {
      e.preventDefault();
      window.close();
    }
  });
}

async function addFolder() {
  const name = folderNameInput.value.trim();
  if (!name) {
    await showAlert('Please enter a folder name');
    return;
  }
  
  try {
    const folderPath = await ipcRenderer.invoke('open-folder-dialog');
    if (!folderPath) return;
    
    const newFolder = {
      id: Date.now().toString(),
      name: name,
      path: folderPath
    };
    
    folders.push(newFolder);
    await saveData();
    updateFolderList();
    
    folderNameInput.value = '';
    folderNameInput.focus();
  } catch (error) {
    console.error('Error adding folder:', error);
    await showAlert('Error adding folder');
  }
}

async function removeFolder(folderId) {
  const confirmed = await showConfirm('Are you sure you want to remove this folder shortcut?');
  if (!confirmed) return;
  
  folders = folders.filter(f => f.id !== folderId);
  await saveData();
  updateFolderList();
}

async function openFolder(folderPath) {
  try {
    const success = await ipcRenderer.invoke('open-folder', folderPath);
    if (!success) {
      await showAlert('Could not open folder');
    }
  } catch (error) {
    console.error('Error opening folder:', error);
    await showAlert('Error opening folder');
  }
}

async function setApplicationPath(appKey) {
  try {
    const appPath = await ipcRenderer.invoke('open-file-dialog');
    if (!appPath) return;
    
    settings.applications[appKey] = appPath;
    await saveData();
    updateApplicationButtons();
    
    await showAlert('Application path set successfully');
  } catch (error) {
    console.error('Error setting application path:', error);
    await showAlert('Error setting application path');
  }
}

async function launchApplication(appKey) {
  const appPath = settings.applications[appKey];
  if (!appPath) {
    await showAlert('Please set the application path first');
    return;
  }
  
  try {
    const success = await ipcRenderer.invoke('launch-application', appPath);
    if (!success) {
      await showAlert('Could not launch application');
    }
  } catch (error) {
    console.error('Error launching application:', error);
    await showAlert('Error launching application');
  }
}

async function createProject() {
  if (!currentTemplate) {
    await showAlert('Please select a template first');
    return;
  }
  
  try {
    const projectPath = await ipcRenderer.invoke('open-folder-dialog');
    if (!projectPath) return;
    
    const success = await ipcRenderer.invoke('create-project', projectPath, currentTemplate);
    if (success) {
      await showAlert(`Project created successfully!\n\nTemplate: ${currentTemplate.name}\nLocation: ${projectPath}`);
      
      // Add to recent folders
      const projectFolder = {
        id: Date.now().toString(),
        name: `${currentTemplate.name} Project`,
        path: projectPath
      };
      folders.unshift(projectFolder);
      await saveData();
      updateFolderList();
    } else {
      await showAlert('Error creating project');
    }
  } catch (error) {
    console.error('Error creating project:', error);
    await showAlert('Error creating project');
  }
}

async function saveData() {
  try {
    await ipcRenderer.invoke('save-folders', { folders });
    await ipcRenderer.invoke('save-settings', settings);
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

function updateUI() {
  updateFolderList();
  updateTemplateSelect();
  updateApplicationButtons();
  updateCreateProjectButton();
}

function updateFolderList() {
  folderList.innerHTML = '';
  
  if (folders.length === 0) {
    folderList.innerHTML = '<div class="empty-state">No folders added yet</div>';
    return;
  }
  
  folders.forEach(folder => {
    const folderItem = document.createElement('div');
    folderItem.className = 'folder-item';
    folderItem.innerHTML = `
      <div class="folder-info" onclick="openFolder('${folder.path.replace(/'/g, "\\'")}')">
        <span class="folder-icon">📁</span>
        <div class="folder-details">
          <div class="folder-name">${escapeHtml(folder.name)}</div>
          <div class="folder-path">${escapeHtml(folder.path)}</div>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFolder('${folder.id}')" title="Remove folder">×</button>
    `;
    folderList.appendChild(folderItem);
  });
}

function updateTemplateSelect() {
  templateSelect.innerHTML = '<option value="">Select a template...</option>';
  
  Object.keys(settings.templates || {}).forEach(templateId => {
    const template = settings.templates[templateId];
    const option = document.createElement('option');
    option.value = templateId;
    option.textContent = template.name;
    templateSelect.appendChild(option);
  });
}

function updateApplicationButtons() {
  Object.keys(appButtons).forEach(appKey => {
    const button = appButtons[appKey];
    if (button) {
      const hasPath = settings.applications && settings.applications[appKey];
      button.classList.toggle('configured', hasPath);
      button.disabled = !hasPath;
      
      // Update button text or style based on configuration
      if (hasPath) {
        button.title = `Launch ${getAppDisplayName(appKey)}`;
      } else {
        button.title = `Set path for ${getAppDisplayName(appKey)} first`;
      }
    }
  });
}

function updateCreateProjectButton() {
  createProjectBtn.disabled = !currentTemplate;
  if (currentTemplate) {
    createProjectBtn.textContent = `Create ${currentTemplate.name} Project`;
  } else {
    createProjectBtn.textContent = 'Create Project';
  }
}

function getAppDisplayName(appKey) {
  const names = {
    afterEffects: 'After Effects',
    premierePro: 'Premiere Pro',
    app3: 'Application 3',
    app4: 'Application 4'
  };
  return names[appKey] || appKey;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function showAlert(message) {
  const result = await ipcRenderer.invoke('show-message-box', {
    type: 'info',
    title: 'Quick Folder Launcher',
    message: message,
    buttons: ['OK']
  });
  return result;
}

async function showConfirm(message) {
  const result = await ipcRenderer.invoke('show-message-box', {
    type: 'question',
    title: 'Quick Folder Launcher',
    message: message,
    buttons: ['Cancel', 'OK'],
    defaultId: 1,
    cancelId: 0
  });
  return result.response === 1;
}

function detectSystemTheme() {
  // macOS specific: Detect system dark mode
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle('dark-mode', isDarkMode);
  
  // Listen for theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.matches);
    });
  }
}

// Global functions for HTML onclick events
window.openFolder = openFolder;
window.removeFolder = removeFolder;

// macOS specific: Handle app focus
window.addEventListener('focus', () => {
  // Refresh data when window gets focus (in case files were modified externally)
  loadData().then(updateUI);
});

// Export for debugging
window.debugApp = {
  folders,
  settings,
  loadData,
  saveData
};
