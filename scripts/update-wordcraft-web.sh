#!/usr/bin/env bash
# Import the verified upstream release, including its multilingual fonts.
# Usage: scripts/update-wordcraft-web.sh 0.18.1
set -euo pipefail
VER="${1:-0.18.1}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
if [[ "$VER" != 0.18.1 ]]; then
  echo 'Review the release, fonts, shell compatibility and checksum before updating this pin.' >&2
  exit 1
fi
SHA256=3daa7c2d1f209a7eeb2527fcefa3fe31e875848fb1970d68f54edae55fe0bc9f
curl --fail --location --retry 2 "https://github.com/storytold/wordcraft/releases/download/v$VER/wordcraft-web-$VER.zip" -o "$TMP/web.zip"
printf '%s  %s\n' "$SHA256" "$TMP/web.zip" | shasum -a 256 --check
unzip -q "$TMP/web.zip" -d "$TMP"
SOURCE="$TMP/wordcraft-web-$VER"
cp "$SOURCE"/LICENSE-* "$ROOT/public/app/"
mkdir -p "$ROOT/public/app/licenses"
cp "$SOURCE/NOTICE" "$ROOT/public/app/licenses/UPSTREAM-NOTICE.txt"
cp "$SOURCE/ATTRIBUTION.md" "$ROOT/public/app/licenses/UPSTREAM-ATTRIBUTION.md"
cp "$SOURCE"/OFL-* "$ROOT/public/app/licenses/"
# Switch the manifest last; old hashed assets may still be in use by open tabs.
node "$ROOT/scripts/wordcraft-web/package.mjs" "$SOURCE" "$ROOT/public/app" "$VER"
echo "Imported WordCraft v$VER. Review NOTICE.md and obsolete hashed assets before deployment."
