#!/bin/bash

# Cross-Platform Build Script for Quick Folder Launcher
# This script builds the application for Windows, macOS, and Linux

echo "🚀 Building Quick Folder Launcher for all platforms..."

# Check if electron-builder is installed
if ! command -v electron-builder &> /dev/null; then
    echo "📦 Installing electron-builder..."
    npm install
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Build for all platforms
echo "🏗️  Building for all platforms..."

# Build for Windows
echo "🪟 Building for Windows..."
npm run build:win

# Build for macOS (only works on macOS or with proper signing)
echo "🍎 Building for macOS..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    npm run build:mac
else
    echo "⚠️  macOS build skipped (requires macOS host or proper code signing)"
fi

# Build for Linux
echo "🐧 Building for Linux..."
npm run build:linux

echo "✅ Build complete! Check the 'dist' folder for your builds."
echo ""
echo "📁 Available builds:"
ls -la dist/

echo ""
echo "🎉 Quick Folder Launcher has been built for multiple platforms!"
echo "📦 Distribution files are in the 'dist' folder"
