# Quick Folder Launcher - Cross-Platform Project

> Professional project folder launcher with templates for creative workflows - Available on Windows Desktop and iOS Mobile

A powerful cross-platform application that streamlines project creation and management for creative professionals. Features customizable templates for VFX, 3D, Development, Design, Video, and Photography workflows.

![Quick Folder Launcher](https://img.shields.io/badge/platform-Windows%20%7C%20iOS%20%7C%20Android-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-2.0.0-green)

## 🚀 Quick Start

### Windows Desktop App
1. Download the latest Windows installer from [Releases](../../releases)
2. Run the installer and follow the setup wizard
3. Launch "Quick Folder Launcher" from your desktop or start menu

### macOS Desktop App
1. Download the latest macOS DMG from [Releases](../../releases)
2. Open the DMG and drag the app to Applications folder
3. Launch "Quick Folder Launcher" from Launchpad or Applications folder
4. If prompted about security, go to System Preferences > Security & Privacy and click "Open Anyway"

### iOS Mobile App
1. Clone this repository
2. Navigate to the `ios-app` directory
3. Install dependencies: `npm install`
4. For iOS: `cd ios && pod install` (requires Xcode)
5. Run: `npx react-native run-ios`

## 📱 Features

### Desktop Version (Windows & macOS)
- **Quick Folder Access**: One-click opening of frequently used folders
- **Application Launcher**: Direct access to After Effects, Premiere Pro, and custom apps
- **Professional Templates**: Pre-configured folder structures for different workflows
- **Compact Interface**: Minimal design optimized for productivity
- **Persistent Storage**: All settings and folders saved across sessions
- **Native Integration**: Windows Explorer / macOS Finder integration

### Mobile Version (iOS/Android)
- **Template-Based Projects**: Choose from VFX, 3D, Development, Design workflows
- **Project Management**: Create and organize multiple projects
- **Folder Shortcuts**: Quick access to important directories
- **Professional UI**: Dark theme optimized for creative professionals
- **Cross-Platform**: Works on both iOS and Android devices

## 🎨 Professional Templates

### VFX Artist
- AE_Comps, Nuke_Scripts, Renders, Plates_Raw, Elements_CGI, References

### 3D Artist
- Maya_Scenes, Blender_Files, Textures, Renders, Models_Export, References

### Developer
- src, docs, tests, assets, build, README.md

### Graphic Designer
- Photoshop_Files, Illustrator_Files, InDesign_Files, Final_Exports, Assets_Fonts, References

### Video Editor
- Premiere_Projects, DaVinci_Projects, Raw_Footage, Audio, Final_Exports, Graphics_Motion

### Photographer
- RAW_Files, Lightroom_Catalog, Edited_Photos, Final_Delivery, Contact_Sheets
## 🛠 Technology Stack

### Desktop App
- **Electron** - Cross-platform desktop framework
- **Node.js** - Backend functionality
- **HTML/CSS/JavaScript** - Frontend interface
- **Native APIs** - File system and application launching

### Mobile App
- **React Native** - Cross-platform mobile framework
- **React Navigation** - Mobile navigation
- **React Native FS** - File system access
- **Async Storage** - Data persistence

## 📁 Project Structure

```
quick-folder-launcher/
├── 📱 iOS/Android App
│   ├── ios-app/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── TemplateSelector.js
│   │   │   │   └── ProjectManager.js
│   │   │   └── screens/
│   │   ├── App.js
│   │   └── package.json
│   └── android/ (generated)
├── 🖥 Windows Desktop App
│   ├── main.js
│   ├── renderer.js
│   ├── index.html
│   ├── styles.css
│   ├── folders.json
│   └── package.json
├── 🍎 macOS Desktop App
│   ├── macos-app/
│   │   ├── main.js
│   │   ├── renderer.js
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── package.json
│   │   └── build/
├── 🔧 Build Tools
│   ├── .github/
│   │   └── workflows/
│   │       ├── build-windows.yml
│   │       ├── build-macos.yml
│   │       └── build-mobile.yml
└── 📚 Documentation
    └── README.md
```

## 🔧 Development Setup

### Prerequisites
- **Node.js** 16+ and npm/yarn
- **Windows**: No additional requirements
- **iOS**: Xcode 12+ and macOS
- **Android**: Android Studio and SDK

### Local Development

#### Desktop App
```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build

# Package for distribution
npm run dist
```

#### Mobile App
```bash
# Navigate to mobile app
cd ios-app

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## 📦 Building & Distribution

### Automated Builds
This repository includes GitHub Actions workflows for automated building:

- **Windows Desktop**: Builds Electron app for Windows (x64)
- **macOS Desktop**: Builds Electron app for macOS (x64 + ARM64 Universal)
- **Mobile Apps**: Builds React Native for iOS and Android

### Manual Building

#### Windows Desktop
```bash
npm install
npm run build
npm run dist
```

#### macOS Desktop
```bash
cd macos-app
npm install
npm run build
npm run dist
```

#### iOS App
```bash
cd ios-app
npm install
cd ios && pod install && cd ..
npx react-native run-ios --configuration Release
```

#### Android App
```bash
cd ios-app
npm install
npx react-native run-android --variant=release
```

## 🎯 Use Cases

### Creative Professionals
- **VFX Artists**: Organize compositing projects, plates, and renders
- **3D Artists**: Manage Maya/Blender scenes, textures, and exports
- **Video Editors**: Structure Premiere/DaVinci projects and media
- **Photographers**: Organize RAW files, catalogs, and deliveries

### Developers
- **Project Structure**: Consistent folder organization
- **Quick Access**: Rapid navigation to source, docs, and builds
- **Multi-Project**: Manage multiple codebases efficiently

### General Users
- **Folder Shortcuts**: Quick access to frequently used directories
- **Application Launching**: One-click access to favorite applications
- **Organization**: Clean, structured file management

## 🚀 Getting Started Guide

### First Time Setup
1. **Choose Your Platform**: Desktop for Windows, Mobile for iOS/Android
2. **Select Template**: Pick the workflow that matches your profession
3. **Create Projects**: Set up your first project with the template structure
4. **Add Folders**: Create shortcuts to your most-used directories
5. **Customize**: Adjust settings and add your favorite applications

### Best Practices
- **Consistent Naming**: Use clear, descriptive project names
- **Template Usage**: Stick to template structures for consistency
- **Regular Cleanup**: Archive completed projects periodically
- **Backup Settings**: Export your folder lists and templates

## 🤝 Contributing

We welcome contributions to improve both desktop and mobile versions:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Test on multiple platforms when possible
- Update documentation for new features
- Ensure backward compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Windows**: Ensure you have the latest Visual C++ redistributables
- **iOS**: Requires Xcode and iOS simulator for development
- **Android**: Requires Android Studio and SDK setup

### Getting Help
- Open an issue for bug reports
- Check existing issues for solutions
- Provide detailed information including platform and version

## 🔄 Version History

### v2.0.0 (Latest)
- ✅ Cross-platform mobile app (iOS/Android)
- ✅ Professional workflow templates
- ✅ Project management system
- ✅ Clean, modern UI design

### v1.0.0
- ✅ Windows desktop application
- ✅ Folder shortcuts and management
- ✅ Application launcher integration
- ✅ Persistent storage system

---

**Ready to boost your productivity?** Download the desktop app or build the mobile version and start organizing your workflow like a pro! 🚀
- Uses Node.js for file system operations and data persistence
- Stores configuration in `folders.json` file
- Responsive design optimized for small window sizes

## Requirements

- Windows 10 or later
- Node.js 14.0 or later
- Electron (installed automatically with npm install)

## Configuration

The application automatically creates a `folders.json` file to store your:
- Saved folder paths and names
- Application executable paths
- User preferences

This file is created in the application directory and persists between sessions.
