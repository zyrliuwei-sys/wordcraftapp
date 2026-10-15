import { fetchWasm } from './wasm-loader.mjs';

// The canvas renderer uses embedded fonts; CSS web fonts cannot supply its glyphs.
// Keep this shell independent of the generated wasm-bindgen glue.
const loading = document.getElementById('wordcraft_loading');
const status = document.getElementById('wordcraft_status');
const bar = document.getElementById('wordcraft_bar');
const actions = document.getElementById('wordcraft_actions');
const loadingContent = document.getElementById('wordcraft_loading_content');
const zh = navigator.language.toLowerCase().startsWith('zh');
document.documentElement.lang = zh ? 'zh-CN' : 'en';
const label = (en, cn) => (zh ? cn : en);
let settled = false;
let startupTimer;
window.wordcraftState = { phase: 'loading' };

function fail(error) {
  if (settled) return;
  settled = true;
  clearTimeout(startupTimer);
  observer.disconnect();
  console.error('WordCraft startup:', error);
  window.wordcraftState = { phase: 'error', message: String(error) };
  loading.replaceChildren(loadingContent);
  document.getElementById('wordcraft_track').hidden = true;
  status.textContent = label(
    'WordCraft could not start. Retry the download, or use compatibility mode if your graphics driver is unsupported.',
    '编辑器未能启动。请重试；如果是显卡兼容问题，可切换兼容模式。'
  );
  actions.hidden = false;
}

// The Rust WebRunner removes this overlay only AFTER graphics initialization.
// wasm-bindgen init() returns sooner, so it must never hide the overlay itself.
const observer = new MutationObserver(() => {
  if (!loading.isConnected && !settled) {
    settled = true;
    clearTimeout(startupTimer);
    observer.disconnect();
    window.wordcraftState = { phase: 'ready' };
    window.dispatchEvent(new Event('wordcraft-ready'));
  } else if (loading.querySelector('p')) {
    const reason = loading.textContent;
    fail(reason);
  }
});
// Observe the document so removing the overlay itself is visible too.
observer.observe(document.body, { childList: true, subtree: true });

const retry = document.getElementById('wordcraft_retry');
retry.textContent = label('Retry', '重新加载');
retry.addEventListener('click', () => location.reload());
const compatibility = document.getElementById('wordcraft_compatibility');
const compatibilityUrl = new URL(location.href);
compatibilityUrl.searchParams.set('webgl', '');
compatibility.href = compatibilityUrl.href;
compatibility.textContent = label('Use compatibility mode', '使用兼容模式');
document.getElementById('wordcraft_download').textContent = label('Download desktop app', '下载桌面版');
document.getElementById('wordcraft_back').textContent = label('← Back to website', '← 返回网站');

async function boot() {
  try {
    if (typeof WebAssembly === 'undefined') throw new Error('WebAssembly is unavailable.');
    startupTimer = setTimeout(() => fail(new Error('Editor scripts timed out.')), 45_000);
    const manifest = await import('./build.mjs');
    const bindings = await import(manifest.javascript);
    clearTimeout(startupTimer);
    const response = await fetchWasm(manifest.wasm, ({ phase, received, total }) => {
      if (phase === 'starting') {
        bar.style.width = '100%';
        status.textContent = label('Starting editor and loading fonts…', '正在启动编辑器并加载字体…');
        window.wordcraftState = { phase: 'starting' };
      } else {
        const pct = total > 0 ? Math.min(99, Math.round((received / total) * 100)) : null;
        bar.style.width = pct === null ? '50%' : `${pct}%`;
        status.textContent = label('Downloading editor', '正在下载编辑器') +
          (pct === null ? `… ${(received / 1048576).toFixed(1)} MB` : `… ${pct}%`);
      }
    });
    startupTimer = setTimeout(() => fail(new Error('Editor graphics startup timed out.')), 45_000);
    const wasm = await bindings.default({ module_or_path: response });
    window.wasmBindings = bindings;
    window.dispatchEvent(new CustomEvent('TrunkApplicationStarted', { detail: { wasm } }));
  } catch (error) {
    fail(error);
  }
}

window.addEventListener('error', (event) => {
  if (!settled) fail(event.error || event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  if (!settled) fail(event.reason);
});
status.textContent = label('Downloading WordCraft…', '正在下载 WordCraft…');
boot();
