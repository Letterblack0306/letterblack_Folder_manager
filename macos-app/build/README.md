# macOS App Assets

This directory contains assets specific to the macOS version of Quick Folder Launcher.

## Files in this directory:

- `icon.icns` - macOS application icon (will be added)
- `entitlements.mac.plist` - Security entitlements for macOS
- `dmg-background.png` - Background image for DMG installer
- `Info.plist.template` - macOS app bundle information template

## Icon Requirements

The `icon.icns` file should contain the following sizes:
- 16x16
- 32x32  
- 64x64
- 128x128
- 256x256
- 512x512
- 1024x1024

## Creating the Icon

You can create the icon from a 1024x1024 PNG file:

```bash
# Create iconset directory
mkdir icon.iconset

# Generate different sizes
sips -z 16 16 icon-1024.png --out icon.iconset/icon_16x16.png
sips -z 32 32 icon-1024.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32 icon-1024.png --out icon.iconset/icon_32x32.png
sips -z 64 64 icon-1024.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128 icon-1024.png --out icon.iconset/icon_128x128.png
sips -z 256 256 icon-1024.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256 icon-1024.png --out icon.iconset/icon_256x256.png
sips -z 512 512 icon-1024.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512 icon-1024.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon-1024.png --out icon.iconset/icon_512x512@2x.png

# Convert to icns
iconutil -c icns icon.iconset
```

## Entitlements

The entitlements file defines what system resources the app can access on macOS.
