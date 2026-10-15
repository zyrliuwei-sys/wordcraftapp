import assert from 'node:assert/strict';
import { test } from 'node:test';
import { gzipSync } from 'node:zlib';

import { fetchWasm } from '../../public/app/wasm-loader.mjs';

// A valid empty module exercises the same browser decompression / compile path.
const moduleBytes = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0);
const realFetch = globalThis.fetch;

for (const compressed of [true, false]) {
  test(
    compressed
      ? 'gzip static asset compiles'
      : 'already decompressed host response compiles',
    async (t) => {
      t.after(() => {
        globalThis.fetch = realFetch;
      });
      const bytes = compressed ? gzipSync(moduleBytes) : moduleBytes;
      globalThis.fetch = async () =>
        new Response(bytes, {
          headers: { 'content-length': String(bytes.length) },
        });
      const progress = [];
      const response = await fetchWasm('/editor.wasm.gz', (event) =>
        progress.push(event)
      );
      assert.equal(response.headers.get('content-type'), 'application/wasm');
      assert.ok(await WebAssembly.compileStreaming(response));
      assert.equal(progress.at(-1).phase, 'starting');
      assert.equal(progress[0].received, bytes.length);
    }
  );
}

test('streamed responses without Content-Length still load', async (t) => {
  t.after(() => {
    globalThis.fetch = realFetch;
  });
  globalThis.fetch = async () => new Response(moduleBytes);
  assert.ok(
    await WebAssembly.compileStreaming(await fetchWasm('/editor.wasm.gz'))
  );
});

test('HTTP errors and HTML fallbacks fail instead of showing a blank editor', async (t) => {
  t.after(() => {
    globalThis.fetch = realFetch;
  });
  globalThis.fetch = async () => new Response('missing', { status: 404 });
  await assert.rejects(fetchWasm('/editor.wasm.gz'), /HTTP 404/);
  globalThis.fetch = async () =>
    new Response('<!DOCTYPE html><h1>Not found</h1>');
  await assert.rejects(fetchWasm('/editor.wasm.gz'), /invalid editor file/);
});

test('truncated gzip rejects cleanly', async (t) => {
  t.after(() => {
    globalThis.fetch = realFetch;
  });
  globalThis.fetch = async () =>
    new Response(gzipSync(moduleBytes).subarray(0, 12));
  await assert.rejects(fetchWasm('/editor.wasm.gz'));
});
