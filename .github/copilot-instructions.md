<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Quick Folder Launcher - Copilot Instructions

This is a cross-platform desktop application built with Electron that provides:

## Core Features:
- Quick folder access with one-click opening
- Save and manage multiple folder shortcuts  
- AEP (After Effects) and PRPROJ (Premiere Pro) file scanning and launching
- Project folder structure creation with templates
- Compact interface optimized for productivity workflows
- Universal macOS support (Intel + Apple Silicon)

## Architecture:
- **main.js**: Electron main process handling window creation, IPC communication, and file operations
- **renderer.js**: Frontend logic for UI interactions, project scanning, and data management
- **index.html**: Application interface with folder management and project scanning
- **styles.css**: Minimal, professional styling with sharp edges and medium-weight fonts
- **settings.json**: Application configuration and template settings
- **folders.json**: Data persistence for saved folders and project paths

## Current Status (August 2025):
- ✅ **Fully functional** - All features working locally and on macOS
- ✅ **Clean codebase** - 11 essential files only, 99% size reduction completed
- ✅ **Stable dependencies** - Electron 28.0.0 LTS, electron-builder 24.9.1
- ✅ **Working CI/CD** - GitHub Actions producing macOS .dmg builds
- ✅ **Universal Binary** - Supports both Intel (x64) and Apple Silicon (arm64)

## Development Guidelines:
- **Keep minimal**: 11 files only - avoid adding unnecessary complexity
- **Stable dependencies**: Use LTS versions only (Electron ^28.0.0)
- **Cross-platform**: Test on Windows locally, deploy to macOS via GitHub Actions
- **UI/Backend sync**: Always verify event listeners connect to backend functions
- **Clean commits**: Never commit node_modules, dist, or large binary files

## Key APIs Used:
- Electron shell.openPath() for folder opening
- Electron dialog.showOpenDialog() for path selection
- Node.js fs module for data persistence and file scanning
- IPC communication between main and renderer processes
- electron-builder for cross-platform packaging

## Build Process:
- **Local Development**: `npm start` (Windows/macOS/Linux)
- **macOS Builds**: GitHub Actions with macos-latest runners
- **CI/CD**: Automated .dmg creation on every push to main branch
- Node.js fs module for data persistence
- IPC communication between main and renderer processes
