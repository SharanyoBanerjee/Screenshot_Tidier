import { contextBridge, ipcRenderer } from 'electron';
import { Settings } from '../shared/types';

contextBridge.exposeInMainWorld('api', {
  getSettings: (): Promise<Settings> => ipcRenderer.invoke('settings:get'),
});
