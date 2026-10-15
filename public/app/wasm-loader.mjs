// Accept gzip assets and hosts that already decoded Content-Encoding: gzip.
export async function fetchWasm(url, onProgress = () => {}) {
  const controller = new AbortController();
  let idleTimer;
  const renewTimeout = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => controller.abort(), 30_000);
  };
  renewTimeout();
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} loading editor`);
    const total = Number(res.headers.get('content-length'));
    const chunks = [];
    if (res.body) {
      const reader = res.body.getReader();
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        renewTimeout();
        chunks.push(value);
        received += value.byteLength;
        onProgress({ phase: 'downloading', received, total });
      }
    } else {
      chunks.push(await res.arrayBuffer());
    }
    clearTimeout(idleTimer);
    let blob = new Blob(chunks);
    const head = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
    if (head[0] === 0x1f && head[1] === 0x8b) {
      if (typeof DecompressionStream === 'undefined') {
        throw new Error('This browser does not support gzip decompression. Please update your browser.');
      }
      blob = await new Response(blob.stream().pipeThrough(new DecompressionStream('gzip'))).blob();
    } else if (!(head[0] === 0 && head[1] === 0x61 && head[2] === 0x73 && head[3] === 0x6d)) {
      throw new Error('The server returned an invalid editor file.');
    }
    onProgress({ phase: 'starting' });
    return new Response(blob, { headers: { 'Content-Type': 'application/wasm' } });
  } finally {
    clearTimeout(idleTimer);
  }
}

