import { app, BrowserWindow, nativeTheme } from 'electron';
import * as path from 'path';
import { load } from './settings';
import { registerIpc } from './ipc';

let win: BrowserWindow | null = null;

function createWindow(): void {
  win = new BrowserWindow({
    width: 760,
    height: 520,
    minWidth: 520,
    minHeight: 400,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 16 },
    vibrancy: 'under-window',
    visualEffectState: 'active',
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile(path.join(app.getAppPath(), 'src/renderer/index.html'));

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(async () => {
  nativeTheme.themeSource = 'system';
  await load();
  registerIpc();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // macOS apps stay running even when all windows are closed
});
