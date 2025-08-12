# iOS Development Quick Start Guide

This guide helps you get started with iOS development for Quick Folder Launcher without needing a Mac initially.

## 🚀 Option 1: Cloud Development (Recommended)

### GitHub Codespaces
1. **Open in Codespaces**
   - Go to the GitHub repository
   - Click "Code" → "Codespaces" → "Create codespace on main"
   - Wait for the environment to load

2. **Setup React Native Environment**
   ```bash
   # Navigate to mobile app
   cd ios-app
   
   # Install dependencies
   npm install
   
   # Start Metro bundler
   npm start
   ```

3. **Test with Expo Go** (Alternative approach)
   ```bash
   # Install Expo CLI globally
   npm install -g @expo/cli
   
   # Convert to Expo project (optional)
   npx create-expo-app --template blank-typescript
   ```

### Replit Setup
1. **Import Repository**
   - Go to [Replit.com](https://replit.com)
   - Click "Import from GitHub"
   - Enter repository URL

2. **Configure Environment**
   ```bash
   cd ios-app
   npm install
   npm start
   ```

## 🛠 Option 2: Windows Development

### React Native Windows Setup
```bash
# Install React Native Windows dependencies
npm install -g @react-native-community/cli

# Navigate to project
cd ios-app

# Add Windows platform
npx react-native-windows-init --overwrite

# Run on Windows
npx react-native run-windows
```

### Windows Subsystem for Linux (WSL)
```bash
# Install WSL2 with Ubuntu
wsl --install -d Ubuntu

# Inside WSL, install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup project
git clone <repository-url>
cd quick-folder-launcher/ios-app
npm install
```

## 📱 Option 3: Cross-Platform Testing

### Browser Testing with React Native Web
```bash
# Install React Native Web
cd ios-app
npm install react-native-web react-dom

# Create web configuration
# Add to package.json:
{
  "scripts": {
    "web": "npx webpack serve --config webpack.config.js"
  }
}
```

### Expo Snack (Online Testing)
1. Go to [snack.expo.dev](https://snack.expo.dev)
2. Copy component code from the project
3. Test immediately in browser simulator
4. Scan QR code to test on physical device

## 🔧 Development Tools

### VS Code Extensions
Install these extensions for better development:
```json
{
  "recommendations": [
    "ms-vscode.vscode-react-native",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-python.python"
  ]
}
```

### Package.json Scripts for Cross-Platform
```json
{
  "scripts": {
    "start": "react-native start",
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "windows": "react-native run-windows",
    "web": "npx webpack serve",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  }
}
```

## 🚀 Quick Commands

### Get Started Immediately
```bash
# Clone repository
git clone https://github.com/your-username/quick-folder-launcher.git

# Setup mobile app
cd quick-folder-launcher/ios-app
npm install

# Start development server
npm start

# In another terminal, run platform-specific command:
# For Android: npm run android
# For iOS Simulator: npm run ios (requires macOS)
# For Windows: npm run windows
# For Web: npm run web
```

### Testing Components
```bash
# Run component tests
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📋 Development Checklist

### Initial Setup
- [ ] Node.js 16+ installed
- [ ] Git repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm start`)

### Platform Testing
- [ ] Android emulator setup (Android Studio)
- [ ] iOS simulator setup (Xcode on macOS only)
- [ ] Windows testing (React Native Windows)
- [ ] Web browser testing (React Native Web)

### Code Quality
- [ ] ESLint configured and passing
- [ ] Prettier formatting applied
- [ ] TypeScript type checking
- [ ] Component tests written

## 🌐 Remote iOS Testing Services

### BrowserStack
1. Sign up for free account
2. Upload your app bundle
3. Test on real iOS devices remotely

### Appetize.io
1. Upload iOS app
2. Test in browser simulator
3. Share links for testing

### TestFlight (Later stages)
1. Apple Developer account required
2. Upload to App Store Connect
3. Distribute to beta testers

## 📱 Physical Device Testing

### Android Device
```bash
# Enable USB debugging on Android device
# Connect via USB
adb devices

# Run on connected device
npm run android
```

### iOS Device (Requires Mac/Xcode)
```bash
# Connect iOS device
# Trust development certificate
# Run through Xcode or:
npm run ios --device
```

## 🔧 Troubleshooting

### Common Issues

**Metro bundler not starting:**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clear npm cache
npm start -- --reset-cache
```

**Android build errors:**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

**iOS build errors (macOS only):**
```bash
# Clean iOS build
cd ios
rm -rf build
pod install
cd ..
npm run ios
```

### Environment Variables
Create `.env` file in `ios-app/`:
```env
# React Native configuration
RN_ENABLE_NEW_ARCHITECTURE=0
METRO_ENABLE_SYMLINKS=0

# Development settings
DEV_MODE=true
API_URL=http://localhost:3000
```

## 📚 Learning Resources

### React Native
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Expo Documentation](https://docs.expo.dev/)

### Development Tools
- [Flipper Debugging](https://fbflipper.com/)
- [React DevTools](https://reactnative.dev/docs/debugging#react-developer-tools)
- [Metro Bundler](https://metrobundler.dev/)

### Platform-Specific
- [Android Development](https://developer.android.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Windows Development](https://microsoft.github.io/react-native-windows/)

## 🎯 Next Steps

Once you have the development environment running:

1. **Explore the Code**: Look at `App.js`, `TemplateSelector.js`, and `ProjectManager.js`
2. **Make Changes**: Modify colors, text, or add features
3. **Test Changes**: Use hot reload to see changes instantly
4. **Create Components**: Add new screens or functionality
5. **Submit PRs**: Share your improvements with the community

## 🚀 Production Deployment

### Android Play Store
```bash
# Generate signed APK
cd android
./gradlew assembleRelease

# Generate AAB for Play Store
./gradlew bundleRelease
```

### iOS App Store (Requires Mac)
```bash
# Archive for distribution
npx react-native run-ios --configuration Release

# Upload to App Store Connect
# Use Xcode or Application Loader
```

---

**Ready to start developing?** Choose your preferred option above and start building amazing mobile experiences! 🚀

Need help? Open an issue in the repository or check our [Contributing Guide](CONTRIBUTING.md).
