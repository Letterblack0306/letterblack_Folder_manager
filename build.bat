@echo off
REM Cross-Platform Build Script for Quick Folder Launcher (Windows)
REM This script builds the application for Windows, macOS, and Linux

echo 🚀 Building Quick Folder Launcher for all platforms...

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist "dist" rmdir /s /q dist

REM Build for all platforms
echo 🏗️ Building for all platforms...

REM Build for Windows
echo 🪟 Building for Windows...
call npm run build:win

REM Build for macOS (limited on Windows)
echo 🍎 Building for macOS...
echo ⚠️ macOS build from Windows may have limitations
call npm run build:mac

REM Build for Linux
echo 🐧 Building for Linux...
call npm run build:linux

echo ✅ Build complete! Check the 'dist' folder for your builds.
echo.
echo 📁 Available builds:
dir dist

echo.
echo 🎉 Quick Folder Launcher has been built for multiple platforms!
echo 📦 Distribution files are in the 'dist' folder
