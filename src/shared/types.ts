export type Shot = {
  path: string;
  name: string;
  date: string;
  time: number;
};

export type Settings = {
  watchDir: string;
  destDir: string;
  paused: boolean;
};

export type DayGroup = {
  date: string;
  shots: Shot[];
};

export interface ElectronAPI {
  getSettings: () => Promise<Settings>;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}
