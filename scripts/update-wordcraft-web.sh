#!/usr/bin/env bash
# Rebuild the self-hosted editor WITH multilingual fonts. Do not copy the stock
# web release: its wasm font filter omits Chinese. Requires Rust (wasm32 target)
# and wasm-bindgen-cli 0.2.129. Optional wasm-opt reduces download size further.
# Usage: scripts/update-wordcraft-web.sh 0.7.0
# Reuse checkouts: WORDCRAFT_SOURCE_DIR=... CRAFT_FONTS_DIR=... <command above>
set -euo pipefail

VER="${1:-0.7.0}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
FONTS_REF=3d9ab3a132ed0eff457e424226a435a901da30d3
SOURCE_REF=fc41918814f62645b6746ed68e71e8c2c2e85d6f
if [[ "$VER" != 0.7.0 ]]; then
  echo 'Review and update the pinned source, wasm-bindgen version and web-fixes.patch for this release first.' >&2
  exit 1
fi
command -v cargo >/dev/null
command -v wasm-bindgen >/dev/null
[[ "$(wasm-bindgen --version)" == 'wasm-bindgen 0.2.129' ]] || {
  echo 'Install wasm-bindgen-cli 0.2.129 to match Cargo.lock.' >&2; exit 1;
}

SOURCE="${WORDCRAFT_SOURCE_DIR:-$TMP/wordcraft}"
FONTS="${CRAFT_FONTS_DIR:-$TMP/craft-fonts}"
if [[ ! -d "$SOURCE/.git" ]]; then
  git clone --depth 1 --branch "v$VER" https://github.com/storytold/wordcraft.git "$SOURCE"
fi
if [[ ! -d "$FONTS/.git" ]]; then
  git init -q "$FONTS"
  git -C "$FONTS" fetch --depth 1 https://github.com/storytold/craft-fonts.git "$FONTS_REF"
  git -C "$FONTS" checkout -q FETCH_HEAD
fi
[[ "$(git -C "$SOURCE" rev-parse HEAD)" == "$SOURCE_REF" ]]
[[ "$(git -C "$FONTS" rev-parse HEAD)" == "$FONTS_REF" ]]
if git -C "$SOURCE" apply --check "$ROOT/scripts/wordcraft-web/web-fixes.patch"; then
  git -C "$SOURCE" apply "$ROOT/scripts/wordcraft-web/web-fixes.patch"
else
  # An already patched checkout is safe to reuse; a different patch is not.
  git -C "$SOURCE" apply --reverse --check "$ROOT/scripts/wordcraft-web/web-fixes.patch"
fi

(cd "$SOURCE" && CRAFT_FONTS_DIR="$FONTS" CRAFT_FONTS_REQUIRED=1 \
  cargo build --locked --release --target wasm32-unknown-unknown -p wordcraft-web)
TARGET="${CARGO_TARGET_DIR:-$SOURCE/target}"
mkdir -p "$TMP/output"
wasm-bindgen --target web --remove-name-section --remove-producers-section --out-name wordcraft-web \
  --out-dir "$TMP/output" "$TARGET/wasm32-unknown-unknown/release/wordcraft-web.wasm"
if command -v wasm-opt >/dev/null; then
  wasm-opt -Oz --enable-bulk-memory --enable-nontrapping-float-to-int \
    --enable-mutable-globals --enable-sign-ext --enable-reference-types \
    "$TMP/output/wordcraft-web_bg.wasm" -o "$TMP/output/optimized.wasm"
  mv "$TMP/output/optimized.wasm" "$TMP/output/wordcraft-web_bg.wasm"
fi

# Package content-addressed assets and switch the manifest last. The working
# editor stays intact if cloning, compiling or the static size check fails.
node "$ROOT/scripts/wordcraft-web/package.mjs" "$TMP/output" "$ROOT/public/app"
cp "$SOURCE"/LICENSE-* "$ROOT/public/app/"
mkdir -p "$ROOT/public/app/licenses"
cp "$SOURCE/NOTICE" "$ROOT/public/app/licenses/UPSTREAM-NOTICE.txt"
cp "$SOURCE/ATTRIBUTION.md" "$ROOT/public/app/licenses/UPSTREAM-ATTRIBUTION.md"
cp "$SOURCE"/assets/fonts/OFL-* "$ROOT/public/app/licenses/"
for face in noto-sans-cjk-sc noto-sans-arabic noto-sans-thai; do
  cp "$FONTS/fonts/$face/OFL.txt" "$ROOT/public/app/licenses/OFL-$face.txt"
done
cp "$FONTS/ATTRIBUTION.md" "$ROOT/public/app/licenses/CRAFT-FONTS-ATTRIBUTION.md"
echo 'Built WordCraft with Chinese, Japanese/Korean fallback, Arabic and Thai fonts.'
