# Windows Defender Setup for Folder Launcher

If Windows Defender is blocking the application, you can add an exclusion:

## Method 1: Add Folder Exclusion
1. Open **Windows Security** (search for it in Start menu)
2. Go to **Virus & threat protection**
3. Click **Manage settings** under "Virus & threat protection settings"
4. Scroll down to **Exclusions** and click **Add or remove exclusions**
5. Click **Add an exclusion** → **Folder**
6. Select this project folder: `C:\Users\prave\Downloads\folder open`

## Method 2: Add File Exclusion
1. Follow steps 1-4 above
2. Click **Add an exclusion** → **File**
3. Select: `C:\Users\prave\Downloads\folder open\main.js`

## Method 3: Alternative Launch Method
The app now uses `shell.openPath()` first, which is safer and less likely to be blocked by Defender.

## If Still Blocked
- Run the app as Administrator (right-click npm start → Run as administrator)
- Or temporarily disable Real-time protection while using the app
