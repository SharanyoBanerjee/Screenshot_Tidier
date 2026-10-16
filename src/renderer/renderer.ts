async function init(): Promise<void> {
  try {
    const settings = await window.api.getSettings();
    const watchEl = document.getElementById('watch-dir');
    const destEl = document.getElementById('dest-dir');
    if (watchEl) {
      watchEl.textContent = settings.watchDir;
    }
    if (destEl) {
      destEl.textContent = settings.destDir;
    }
  } catch (err) {
    console.error('[renderer] failed to load settings', err);
  }
}

window.addEventListener('DOMContentLoaded', init);
