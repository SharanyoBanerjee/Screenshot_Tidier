import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Settings } from '../shared/types';

let cached: Settings | null = null;

function filePath(): string {
  return path.join(app.getPath('userData'), 'settings.json');
}

export function defaults(): Settings {
  const home = app.getPath('home');
  return {
    watchDir: path.join(home, 'Desktop'),
    destDir: path.join(home, 'Pictures', 'Screenshots'),
    paused: false,
  };
}

export async function load(): Promise<Settings> {
  const defs = defaults();
  try {
    const raw = await fs.readFile(filePath(), 'utf-8');
    const parsed = JSON.parse(raw) as Partial<Settings>;
    cached = {
      watchDir: typeof parsed.watchDir === 'string' ? parsed.watchDir : defs.watchDir,
      destDir: typeof parsed.destDir === 'string' ? parsed.destDir : defs.destDir,
      paused: typeof parsed.paused === 'boolean' ? parsed.paused : defs.paused,
    };
  } catch {
    cached = defs;
    await save(cached);
  }
  return cached;
}

export async function save(next: Partial<Settings>): Promise<Settings> {
  const current = cached ?? defaults();
  cached = { ...current, ...next };
  try {
    await fs.writeFile(filePath(), JSON.stringify(cached, null, 2), 'utf-8');
  } catch (err) {
    console.error('[settings] save failed', err);
  }
  return cached;
}

export function get(): Settings {
  return cached ?? defaults();
}
