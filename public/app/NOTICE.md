# WordCraft web build hosted by WordCraftApp

This editor uses the official [WordCraft v0.18.1 web release](https://github.com/storytold/wordcraft/releases/tag/v0.18.1), published November 12, 2026 at 00:04:47 UTC, from source revision `079f478bd85df7bcc567e3bafa7d7219096f9c3c`.

Upstream archive: `wordcraft-web-0.18.1.zip`.
SHA-256: `3daa7c2d1f209a7eeb2527fcefa3fe31e875848fb1970d68f54edae55fe0bc9f`.

MIT OR Apache-2.0. Copyright (c) 2026 ArtCraft Team and WordCraft contributors. See LICENSE-MIT, LICENSE-APACHE and licenses/UPSTREAM-NOTICE.txt.

The upstream application binary is unmodified. Its WebAssembly is gzip-compressed for delivery, and its JavaScript module points to the content-addressed filename. The official release now includes multilingual fonts. Font licenses and upstream attribution are under licenses/; proprietary fonts are not bundled. Missing document fonts may still need a licensed substitute or an imported font.

The independent hosting shell adds download progress, startup error handling, retry and WebGL compatibility links. It does not upload document contents or provide cloud document storage. Save behavior is supplied by the upstream editor and browser.

Reproduce with `scripts/update-wordcraft-web.sh 0.18.1`. The script verifies the pinned release archive before packaging it. WordCraftApp is an independent third-party guide and is not operated by the WordCraft developers.
