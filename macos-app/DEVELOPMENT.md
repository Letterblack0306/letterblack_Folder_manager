# macOS Development Guide

This guide helps you develop and build the Quick Folder Launcher for macOS.

## 🚀 Quick Start

### Prerequisites
- **macOS** 10.15+ (Catalina or later)
- **Node.js** 16+ and npm
- **Xcode** (for code signing and notarization)
- **Git** for version control

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/your-username/quick-folder-launcher.git
cd quick-folder-launcher

# Navigate to macOS app
cd macos-app

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## 🛠 Development

### Project Structure
```
macos-app/
├── main.js              # Electron main process (macOS optimized)
├── renderer.js          # Frontend logic with macOS integrations
├── index.html           # UI with macOS styling
├── styles.css           # macOS-specific design system
├── package.json         # macOS build configuration
├── build/               # Build assets
│   ├── icon.icns       # macOS app icon
│   ├── entitlements.mac.plist
│   └── dmg-background.png
└── dist/               # Built application
```

### Running the App
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start

# Build for distribution
npm run build
npm run dist
```

## 🎨 macOS-Specific Features

### Native macOS Integration
- **Title Bar**: Hidden inset style with vibrancy
- **Menu Bar**: Standard macOS application menu
- **Dark Mode**: Automatic system theme detection
- **Keyboard Shortcuts**: ⌘W to hide window
- **File Dialogs**: Native macOS file/folder pickers
- **Finder Integration**: Opens folders in Finder
- **App Bundles**: Proper .app bundle handling

### Design System
- **Typography**: San Francisco font family (-apple-system)
- **Colors**: Automatic light/dark mode support
- **Buttons**: macOS-style gradients and hover effects
- **Focus**: Blue outline matching system preferences
- **Spacing**: Apple Human Interface Guidelines compliant

### Accessibility
- **VoiceOver**: Screen reader compatible
- **High Contrast**: Automatic detection and support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus ring indicators

## 📦 Building & Distribution

### Development Build
```bash
# Quick development build
npm run build
```

### Production Build
```bash
# Build for distribution
npm run dist

# This creates:
# - dist/mac/Quick Folder Launcher.app
# - dist/Quick Folder Launcher-2.0.0.dmg
```

### Universal Binary (Intel + Apple Silicon)
```bash
# Build for both x64 and arm64
npm run build -- --mac --x64 --arm64
```

### Code Signing (Optional)
```bash
# Set up environment variables
export APPLE_ID="your-apple-id@example.com"
export APPLE_ID_PASSWORD="app-specific-password"
export APPLE_TEAM_ID="XXXXXXXXXX"

# Build with code signing
npm run dist
```

## 🔧 Configuration

### Electron Builder Configuration
The `package.json` includes macOS-specific build settings:

```json
{
  "build": {
    "mac": {
      "target": [
        { "target": "default", "arch": ["x64", "arm64"] }
      ],
      "category": "public.app-category.productivity",
      "icon": "build/icon.icns",
      "hardenedRuntime": true,
      "gatekeeperAssess": false
    },
    "dmg": {
      "title": "Quick Folder Launcher ${version}",
      "window": { "width": 540, "height": 380 },
      "background": "build/dmg-background.png"
    }
  }
}
```

### Entitlements
The app uses `build/entitlements.mac.plist` for security permissions:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" 
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
  <true/>
  <key>com.apple.security.cs.disable-library-validation</key>
  <true/>
</dict>
</plist>
```

## 🎯 Testing

### Manual Testing
1. **Basic Functionality**
   - Add/remove folder shortcuts
   - Open folders in Finder
   - Create projects with templates
   - Launch applications

2. **macOS Integration**
   - Dark/light mode switching
   - Window management (hide/show)
   - Keyboard shortcuts
   - File dialogs

3. **Performance**
   - App startup time
   - Memory usage
   - Responsiveness

### Automated Testing
```bash
# Run basic tests
npm test

# Test app startup
timeout 10s npm start
```

## 🚀 Distribution Options

### 1. Direct Download
- Build DMG file
- Host on website/GitHub releases
- Users download and install manually

### 2. Mac App Store (Future)
- Requires Apple Developer account
- Additional entitlements needed
- App Store review process

### 3. Homebrew Cask (Community)
- Submit to homebrew-cask repository
- Easy installation via `brew install --cask quick-folder-launcher`

## 🔒 Security & Notarization

### Notarization Process
```bash
# After building, notarize the app
xcrun notarytool submit "dist/Quick Folder Launcher-2.0.0.dmg" \
  --apple-id "$APPLE_ID" \
  --password "$APPLE_ID_PASSWORD" \
  --team-id "$APPLE_TEAM_ID" \
  --wait

# Staple the ticket
xcrun stapler staple "dist/Quick Folder Launcher-2.0.0.dmg"
```

### Privacy Permissions
The app requests these permissions:
- **Files and Folders**: To create project directories
- **Apple Events**: To launch other applications

## 🐛 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild native dependencies
npm rebuild
```

#### Code Signing Issues
```bash
# Check available certificates
security find-identity -v -p codesigning

# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData
```

#### App Won't Launch
```bash
# Check console for errors
Console.app > Crash Reports

# Run from terminal to see errors
./dist/mac/Quick\ Folder\ Launcher.app/Contents/MacOS/Quick\ Folder\ Launcher
```

### Performance Issues
- **Memory Leaks**: Use Activity Monitor to check memory usage
- **CPU Usage**: Profile with Instruments.app
- **Startup Time**: Optimize require() calls and minimize startup logic

## 📚 Resources

### Apple Documentation
- [macOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos)
- [App Distribution Guide](https://developer.apple.com/distribution/)
- [Code Signing Guide](https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/)

### Electron Documentation
- [Electron macOS Specifics](https://www.electronjs.org/docs/latest/tutorial/macos-dock)
- [Security Best Practices](https://www.electronjs.org/docs/latest/tutorial/security)
- [Application Distribution](https://www.electronjs.org/docs/latest/tutorial/application-distribution)

### Tools
- **Xcode**: Development environment and debugging
- **Console.app**: System logs and crash reports
- **Activity Monitor**: Performance monitoring
- **Instruments**: Profiling and optimization

## 🎨 Design Guidelines

### Appearance
- Support both light and dark appearances
- Use system colors and materials
- Follow spacing and typography guidelines
- Implement proper hover and focus states

### Behavior
- Respect user's accessibility settings
- Handle window state properly (hide vs. quit)
- Implement standard keyboard shortcuts
- Provide appropriate feedback for actions

### Integration
- Use native file dialogs
- Integrate with Finder and Spotlight
- Support drag and drop where appropriate
- Handle system events gracefully

---

**Ready to develop for macOS?** Follow this guide and create an amazing native macOS experience! 🍎
