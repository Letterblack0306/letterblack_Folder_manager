<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Quick Folder Launcher - Copilot Instructions

This is a desktop application built with Electron for Windows that provides:

## Core Features:
- Quick folder access with one-click opening
- Save and manage multiple folder shortcuts
- Application launcher for After Effects, Premiere Pro, and two additional apps
- Compact interface to save screen space
- Persistent storage of folder paths and application configurations

## Architecture:
- **main.js**: Electron main process handling window creation and IPC communication
- **renderer.js**: Frontend logic for UI interactions and data management
- **index.html**: Application interface with folder list and application buttons
- **styles.css**: Compact, responsive styling optimized for small windows
- **folders.json**: Data persistence for saved folders and application paths

## Development Guidelines:
- Keep the interface compact and efficient for quick access
- Maintain Windows-specific file path handling
- Use Electron's shell API for opening folders and launching applications
- Implement proper error handling for file system operations
- Ensure cross-session data persistence

## Key APIs Used:
- Electron shell.openPath() for folder opening
- Electron dialog.showOpenDialog() for path selection
- Node.js fs module for data persistence
- IPC communication between main and renderer processes
