import { ipcMain } from 'electron';
import { get } from './settings';

export function registerIpc(): void {
  ipcMain.handle('settings:get', async () => {
    return get();
  });
}
