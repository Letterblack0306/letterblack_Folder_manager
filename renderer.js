/**
 * Quick Folder Launcher - Renderer Process
 * 
 * Frontend logic for the Quick Folder Launcher application.
 * Handles user interactions, folder management, project scanning,
 * and communication with the main process.
 * 
 * Key Features:
 * - Folder path management with browser and manual entry
 * - Individual and batch project file scanning
 * - Project popup with type-coded badges (AE/PR)
 * - Dark theme with professional styling
 * - Keyboard shortcuts and accessibility features
 * 
 * @author GitHub Copilot Assistant
 * @version 1.0.0
 */

const { ipcRenderer } = require('electron');

let savedData = { folders: [] };

/**
 * Initialize the application when DOM content is loaded
 * Sets up data loading, event listeners, and initial UI state
 */
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    updateUI();
    
    // Make functions available globally for onclick handlers
    window.openFolder = openFolder;
    window.deleteFolder = deleteFolder;
    window.launchProject = launchProject;
    window.scanSingleFolder = scanSingleFolder;
});

/**
 * Load saved folder data from persistent storage
 * Handles data cleanup and ensures proper structure
 */
async function loadData() {
    try {
        savedData = await ipcRenderer.invoke('load-folders');
        console.log('Loaded data:', savedData);
        // Clean up old applications data as we don't need it anymore
        if (savedData.applications) {
            delete savedData.applications;
            await saveData();
        }
        // Ensure folders array exists
        if (!savedData.folders) {
            savedData.folders = [];
        }
    } catch (error) {
        console.error('Error loading data:', error);
        savedData = { folders: [] };
    }
}

/**
 * Save current folder data to persistent storage
 * Provides error handling and logging for save operations
 */
async function saveData() {
    try {
        await ipcRenderer.invoke('save-folders', savedData);
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

/**
 * Set up all event listeners for UI interactions
 * Handles folder creation, addition, scanning, and keyboard shortcuts
 */
function setupEventListeners() {
    // Create folder structure functionality
    document.getElementById('createFolderStructure').addEventListener('click', createFolderStructure);
    
    // Settings functionality
    document.getElementById('settingsBtn').addEventListener('click', showSettingsPanel);
    
    // Add folder functionality
    document.getElementById('addFolder').addEventListener('click', addFolder);
    document.getElementById('browseFolder').addEventListener('click', browseForFolder);
    document.getElementById('folderPath').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addFolder();
        }
    });
}

/**
 * Create a new project folder structure with popup dialogs
 * Shows project name input and location selection dialogs
 */
async function createFolderStructure() {
    // Create custom popup for project name
    const projectName = await showProjectNameDialog();
    if (!projectName) return;
    
    // Show location selection dialog
    try {
        const location = await ipcRenderer.invoke('select-save-location');
        if (!location) return;
        
        const result = await ipcRenderer.invoke('create-folder-structure', projectName, location);
        
        if (result.success) {
            // Add the created folder to our list
            const existingIndex = savedData.folders.findIndex(f => f.path === result.path);
            if (existingIndex >= 0) {
                savedData.folders[existingIndex].name = projectName;
            } else {
                savedData.folders.push({ name: projectName, path: result.path });
            }
            
            await saveData();
            updateFolderList();
            
            alert(`Project folder created successfully!\n\nLocation: ${result.path}\n\nStructure created with template files`);
        } else {
            alert(`Error creating folder: ${result.error}`);
        }
    } catch (error) {
        console.error('Error creating folder structure:', error);
        alert('Error creating folder structure');
    }
}

/**
 * Show custom project name input dialog with template selection
 */
async function showProjectNameDialog() {
    return new Promise(async (resolve) => {
        // Get available templates
        const templates = await ipcRenderer.invoke('get-available-templates');
        
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        // Build template options HTML
        const templateOptionsHTML = Object.entries(templates).map(([key, template]) => `
            <div class="template-option" data-template="${key}">
                <div class="template-info">
                    <h4>${template.name}</h4>
                    <p class="template-description">${template.description}</p>
                    <span class="template-profession">${template.profession}</span>
                </div>
            </div>
        `).join('');
        
        overlay.innerHTML = `
            <div class="popup large-popup">
                <div class="popup-header">
                    <h3>Create New Project</h3>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-content">
                    <div class="form-section">
                        <label for="projectNameInput">Project Name:</label>
                        <input type="text" id="projectNameInput" class="input-field" placeholder="Enter project name...">
                    </div>
                    
                    <div class="form-section">
                        <label>Choose Template:</label>
                        <div class="template-selection">
                            ${templateOptionsHTML}
                        </div>
                    </div>
                    
                    <div class="popup-buttons">
                        <button class="button popup-cancel">Cancel</button>
                        <button class="button button-primary popup-create">Create Project</button>
                    </div>
                </div>
            </div>
        `;
        
        let selectedTemplate = 'default';
        
        // Template selection handler
        const templateOptions = overlay.querySelectorAll('.template-option');
        templateOptions.forEach(option => {
            option.addEventListener('click', () => {
                templateOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedTemplate = option.dataset.template;
            });
        });
        
        // Select default template initially
        if (templateOptions.length > 0) {
            templateOptions[0].classList.add('selected');
        }
        
        const closePopup = () => {
            overlay.remove();
            resolve(null);
        };
        
        const createProject = async () => {
            const input = overlay.querySelector('#projectNameInput');
            const name = input.value.trim();
            if (name) {
                // Set the selected template as active
                await ipcRenderer.invoke('set-active-template', selectedTemplate);
                overlay.remove();
                resolve(name);
            } else {
                alert('Please enter a project name');
            }
        };
        
        // Event listeners
        overlay.querySelector('.popup-close').addEventListener('click', closePopup);
        overlay.querySelector('.popup-cancel').addEventListener('click', closePopup);
        overlay.querySelector('.popup-create').addEventListener('click', createProject);
        
        // Enter key support
        overlay.querySelector('#projectNameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') createProject();
        });
        
        // Click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });
        
        document.body.appendChild(overlay);
        overlay.querySelector('#projectNameInput').focus();
    });
}

/**
 * Show settings panel for customizing folder structure and applications
 */
async function showSettingsPanel() {
    try {
        const settings = await ipcRenderer.invoke('load-settings');
        
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        // Build folder structure checkboxes
        const folderStructureHTML = Object.entries(settings.folderStructure || {})
            .map(([folder, config]) => `
                <div class="setting-item">
                    <label>
                        <input type="checkbox" ${config.enabled ? 'checked' : ''} data-folder="${folder}">
                        ${folder} - ${config.description}
                    </label>
                </div>
            `).join('');
        
        // Build applications list
        const applicationsHTML = Object.entries(settings.applications || {})
            .map(([app, path]) => `
                <div class="setting-item">
                    <label>${app}:</label>
                    <input type="text" class="input-field app-path" data-app="${app}" value="${path}" placeholder="Application path...">
                    <button class="button browse-app" data-app="${app}">Browse</button>
                </div>
            `).join('');
        
        // Build template selection dropdown
        const templatesHTML = Object.entries(settings.availableTemplates || {})
            .map(([key, template]) => `
                <option value="${key}" ${settings.template.name === key ? 'selected' : ''}>${template.name} (${template.profession})</option>
            `).join('');
        
        overlay.innerHTML = `
            <div class="popup settings-popup">
                <div class="popup-header">
                    <h3>Settings</h3>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-content">
                    <div class="settings-section">
                        <h4>Active Template</h4>
                        <div class="setting-item">
                            <label>Current Template:</label>
                            <select class="input-field" id="activeTemplate">
                                ${templatesHTML}
                            </select>
                        </div>
                        <div class="setting-item">
                            <div class="template-preview" id="templatePreview">
                                <small>Select a template to see its description</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Custom Template Configuration</h4>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" id="useCustomTemplate" ${settings.template.useCustomPath ? 'checked' : ''}>
                                Use Custom Template Folder (overrides selected template)
                            </label>
                        </div>
                        <div class="setting-item" id="customTemplateRow">
                            <label>Custom Path:</label>
                            <input type="text" class="input-field" id="customTemplatePath" value="${settings.template.customPath || ''}" placeholder="Select custom template folder...">
                            <button class="button" id="browseTemplateBtn">Browse</button>
                        </div>
                        <div class="setting-item">
                            <label>Placeholder Name:</label>
                            <input type="text" class="input-field" id="placeholderName" value="${settings.template.placeholderName}" placeholder="Temp">
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Folder Structure Template</h4>
                        ${folderStructureHTML}
                        <div class="setting-item">
                            <button class="button add-folder-btn">+ Add Folder</button>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <h4>Applications</h4>
                        ${applicationsHTML}
                        <div class="setting-item">
                            <button class="button add-app-btn">+ Add Application</button>
                        </div>
                    </div>
                    
                    <div class="popup-buttons">
                        <button class="button popup-cancel">Cancel</button>
                        <button class="button button-primary popup-save">Save Settings</button>
                    </div>
                </div>
            </div>
        `;
        
        const closePopup = () => overlay.remove();
        
        const saveSettings = async () => {
            try {
                // Collect active template
                const activeTemplate = overlay.querySelector('#activeTemplate').value;
                
                // Collect template settings
                const useCustomTemplate = overlay.querySelector('#useCustomTemplate').checked;
                const customTemplatePath = overlay.querySelector('#customTemplatePath').value;
                const placeholderName = overlay.querySelector('#placeholderName').value;
                
                // Collect folder structure settings
                const folderCheckboxes = overlay.querySelectorAll('[data-folder]');
                const newFolderStructure = {};
                folderCheckboxes.forEach(checkbox => {
                    const folder = checkbox.dataset.folder;
                    newFolderStructure[folder] = {
                        enabled: checkbox.checked,
                        description: settings.folderStructure[folder]?.description || folder
                    };
                });
                
                // Collect application paths
                const appInputs = overlay.querySelectorAll('[data-app]');
                const newApplications = {};
                appInputs.forEach(input => {
                    if (input.classList.contains('app-path')) {
                        newApplications[input.dataset.app] = input.value;
                    }
                });
                
                // Update settings
                settings.template.name = activeTemplate;
                if (settings.availableTemplates && settings.availableTemplates[activeTemplate]) {
                    settings.template.path = settings.availableTemplates[activeTemplate].path;
                }
                settings.template.useCustomPath = useCustomTemplate;
                settings.template.customPath = customTemplatePath;
                settings.template.placeholderName = placeholderName;
                settings.folderStructure = newFolderStructure;
                settings.applications = newApplications;
                
                const result = await ipcRenderer.invoke('save-settings', settings);
                if (result.success) {
                    alert('Settings saved successfully!');
                    closePopup();
                } else {
                    alert('Error saving settings: ' + result.error);
                }
            } catch (error) {
                console.error('Error saving settings:', error);
                alert('Error saving settings');
            }
        };
        
        // Event listeners
        overlay.querySelector('.popup-close').addEventListener('click', closePopup);
        overlay.querySelector('.popup-cancel').addEventListener('click', closePopup);
        overlay.querySelector('.popup-save').addEventListener('click', saveSettings);
        
        // Browse application buttons
        overlay.querySelectorAll('.browse-app').forEach(btn => {
            btn.addEventListener('click', async () => {
                const app = btn.dataset.app;
                const path = await ipcRenderer.invoke('select-application');
                if (path) {
                    overlay.querySelector(`[data-app="${app}"].app-path`).value = path;
                }
            });
        });
        
        // Browse template folder button
        overlay.querySelector('#browseTemplateBtn').addEventListener('click', async () => {
            const path = await ipcRenderer.invoke('select-template-folder');
            if (path) {
                overlay.querySelector('#customTemplatePath').value = path;
            }
        });
        
        // Template selection change handler
        const updateTemplatePreview = () => {
            const selectedTemplate = overlay.querySelector('#activeTemplate').value;
            const previewDiv = overlay.querySelector('#templatePreview');
            
            if (settings.availableTemplates && settings.availableTemplates[selectedTemplate]) {
                const template = settings.availableTemplates[selectedTemplate];
                previewDiv.innerHTML = `
                    <strong>${template.name}</strong><br>
                    <small style="color: #aaa;">${template.description}</small><br>
                    <span style="background: #404040; padding: 2px 6px; border-radius: 3px; font-size: 10px;">${template.profession}</span>
                `;
            } else {
                previewDiv.innerHTML = '<small>Template information not available</small>';
            }
        };
        
        overlay.querySelector('#activeTemplate').addEventListener('change', updateTemplatePreview);
        updateTemplatePreview(); // Initial preview
        
        // Toggle custom template path visibility
        const updateCustomTemplateVisibility = () => {
            const customRow = overlay.querySelector('#customTemplateRow');
            const useCustom = overlay.querySelector('#useCustomTemplate').checked;
            customRow.style.display = useCustom ? 'flex' : 'none';
        };
        
        overlay.querySelector('#useCustomTemplate').addEventListener('change', updateCustomTemplateVisibility);
        updateCustomTemplateVisibility(); // Initial state
        
        // Click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });
        
        document.body.appendChild(overlay);
    } catch (error) {
        console.error('Error showing settings panel:', error);
        alert('Error loading settings');
    }
}

/**
 * Open folder browser dialog to select a folder path
 * Updates the folder path input field with selected path
 */
async function browseForFolder() {
    try {
        const folderPath = await ipcRenderer.invoke('select-folder');
        if (folderPath) {
            document.getElementById('folderPath').value = folderPath;
        }
    } catch (error) {
        console.error('Error browsing for folder:', error);
    }
}

/**
 * Add a new folder to the saved folders list OR create folder structure
 * If path exists, adds it to list. If path doesn't exist, offers to create it.
 */
async function addFolder() {
    const pathInput = document.getElementById('folderPath');
    const folderPath = pathInput.value.trim();
    
    if (!folderPath) {
        alert('Please enter a folder path or click Browse');
        return;
    }

    try {
        // Check if the folder exists
        const folderExists = await ipcRenderer.invoke('check-folder-exists', folderPath);
        
        if (folderExists) {
            // Folder exists - add it to the list
            const projectName = folderPath.split('\\').pop() || folderPath.split('/').pop();
            
            // Check if folder already exists in list
            const existingIndex = savedData.folders.findIndex(f => f.path === folderPath);
            if (existingIndex >= 0) {
                savedData.folders[existingIndex].name = projectName;
                alert(`Updated project folder: ${projectName}`);
            } else {
                savedData.folders.push({ name: projectName, path: folderPath });
                alert(`Added existing project folder: ${projectName}`);
            }
            
            await saveData();
            pathInput.value = '';
            updateFolderList();
            
        } else {
            // Folder doesn't exist - offer to create folder structure
            const projectName = folderPath.split('\\').pop() || folderPath.split('/').pop();
            const createStructure = confirm(`Folder doesn't exist.\n\nWould you like to create a project folder structure for "${projectName}"?\n\nThis will create:\n├── ${projectName}/\n│   ├── AEP/\n│   └── prePro/`);
            
            if (createStructure) {
                const result = await ipcRenderer.invoke('create-folder-structure', projectName, path.dirname(folderPath));
                
                if (result.success) {
                    // Add the created folder to our list
                    const existingIndex = savedData.folders.findIndex(f => f.path === result.path);
                    if (existingIndex >= 0) {
                        savedData.folders[existingIndex].name = projectName;
                    } else {
                        savedData.folders.push({ name: projectName, path: result.path });
                    }
                    
                    await saveData();
                    pathInput.value = '';
                    updateFolderList();
                    
                    alert(`Project folder created successfully!\n\nLocation: ${result.path}`);
                } else {
                    alert(`Error creating folder: ${result.error}`);
                }
            }
        }
        
    } catch (error) {
        console.error('Error processing folder:', error);
        alert('Error processing folder. Please check the path.');
    }
}

/**
 * Open a folder in Windows Explorer
 * @param {string} folderPath - The path to the folder to open
 */
async function openFolder(folderPath) {
    try {
        const success = await ipcRenderer.invoke('open-folder', folderPath);
        if (!success) {
            alert('Could not open folder. Please check if the path exists.');
        }
    } catch (error) {
        console.error('Error opening folder:', error);
        alert('Error opening folder');
    }
}

/**
 * Delete a folder from the saved folders list
 * @param {number} index - The index of the folder to delete
 */
async function deleteFolder(index) {
    if (confirm('Are you sure you want to delete this folder?')) {
        savedData.folders.splice(index, 1);
        await saveData();
        updateFolderList();
    }
}

/**
 * Scan a single folder for project files (.aep and .prproj)
 * @param {number} folderIndex - The index of the folder to scan
 */
async function scanSingleFolder(folderIndex) {
    if (!savedData.folders[folderIndex]) {
        alert('Folder not found');
        return;
    }
    
    const folder = savedData.folders[folderIndex];
    
    try {
        console.log('Scanning single folder for projects:', folder.name);
        const allProjects = await ipcRenderer.invoke('find-all-projects', [folder]);
        console.log('Found projects:', allProjects);
        
        if (allProjects.length === 0) {
            alert(`No project files found in "${folder.name}".\n\nMake sure the folder contains:\n• .aep files (After Effects)\n• .prproj files (Premiere Pro)`);
            return;
        }
        
        showProjectPopup(allProjects);
    } catch (error) {
        console.error('Error scanning folder:', error);
        alert('Error scanning for projects');
    }
}

/**
 * Scan all registered folders for project files and display in popup
 * Searches for .aep and .prproj files across all saved folder paths
 */
async function scanAllProjects() {
    if (savedData.folders.length === 0) {
        alert('Please add a project folder first');
        return;
    }
    
    try {
        console.log('Scanning all folders for projects...');
        const allProjects = await ipcRenderer.invoke('find-all-projects', savedData.folders);
        console.log('Found projects:', allProjects);
        
        if (allProjects.length === 0) {
            alert('No project files found.\n\nMake sure your folders contain:\n• .aep files (After Effects)\n• .prproj files (Premiere Pro)');
            return;
        }
        
        showProjectPopup(allProjects);
    } catch (error) {
        console.error('Error scanning projects:', error);
        alert('Error scanning for projects');
    }
}

/**
 * Display project selection popup with list of found projects
 * Creates modal overlay with project list and launch functionality
 * @param {Array} projects - Array of project objects with metadata
 */
function showProjectPopup(projects) {
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'popup-content';
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = `${projects.length} Projects (Double-click to open)`;
    title.className = 'popup-title';
    popup.appendChild(title);
    
    // Create project list
    const projectList = document.createElement('div');
    projectList.className = 'popup-project-list';
    
    projects.forEach((project) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'popup-project-item';
        
        const createdDate = new Date(project.createdDate).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric'
        });
        const typeClass = project.extension === '.aep' ? 'ae-project' : 'pr-project';
        const typeLabel = project.extension === '.aep' ? 'AE' : 'PR';
        
        projectItem.innerHTML = `
            <span class="popup-project-type ${typeClass}">${typeLabel}</span>
            <span class="popup-project-name">${project.name}</span>
            <span class="popup-project-info">${project.folder} • ${createdDate}</span>
        `;
        
        // Double-click to open and close popup
        projectItem.addEventListener('dblclick', async () => {
            overlay.remove();
            await launchProject(project.path);
        });
        
        projectList.appendChild(projectItem);
    });
    
    popup.appendChild(projectList);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'popup-close';
    closeBtn.addEventListener('click', () => overlay.remove());
    popup.appendChild(closeBtn);
    
    overlay.appendChild(popup);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Close on Escape key
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
    document.addEventListener('keydown', handleKeyPress);
    
    document.body.appendChild(overlay);
}

/**
 * Launch a project file using the appropriate application
 * Handles error display and logging for launch operations
 * @param {string} projectPath - Full path to the project file to launch
 */
async function launchProject(projectPath) {
    console.log('Launching project:', projectPath);

    try {
        const result = await ipcRenderer.invoke('launch-application', projectPath);
        console.log('Launch result:', result);
        
        if (!result.success) {
            alert(`Could not open project file:\n${result.error}\n\nPath: ${projectPath}\n\nPlease check if the file still exists.`);
        } else {
            console.log('Successfully launched project');
        }
    } catch (error) {
        console.error('Error launching project:', error);
        alert('Error launching project file');
    }
}

/**
 * Update the main user interface
 * Refreshes the folder list display
 */
function updateUI() {
    updateFolderList();
}

/**
 * Update the folder list display with current saved folders
 * Creates interactive buttons for each folder with scan, open, and delete actions
 */
function updateFolderList() {
    const folderList = document.getElementById('folderList');
    folderList.innerHTML = '';

    savedData.folders.forEach((folder, index) => {
        const folderItem = document.createElement('div');
        folderItem.className = 'folder-item';
        
        folderItem.innerHTML = `
            <button class="scan-folder-btn" onclick="scanSingleFolder(${index})" title="Scan projects in ${folder.name}">↻</button>
            <button class="folder-btn" onclick="openFolder('${folder.path.replace(/\\/g, '\\\\')}')" title="${folder.path}">
                ${folder.name}
            </button>
            <button class="delete-btn" onclick="deleteFolder(${index})">×</button>
        `;
        
        folderList.appendChild(folderItem);
    });
}

// Make functions available globally for onclick handlers
window.openFolder = openFolder;
window.deleteFolder = deleteFolder;
window.launchProject = launchProject;
window.scanSingleFolder = scanSingleFolder;
