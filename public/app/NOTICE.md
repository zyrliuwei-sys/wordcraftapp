# WordCraft web build hosted by WordCraftApp

Based on [WordCraft v0.7.0](https://github.com/storytold/wordcraft/tree/fc41918814f62645b6746ed68e71e8c2c2e85d6f),
MIT OR Apache-2.0. Copyright (c) 2026 ArtCraft Team and WordCraft contributors.
See LICENSE-MIT, LICENSE-APACHE and licenses/UPSTREAM-NOTICE.txt.

Local changes: the web font build filter includes Noto Sans CJK SC, Noto Sans
Arabic and Noto Sans Thai Regular. The original web filter includes only BIZ
UDPGothic Regular, which leaves simplified Chinese labels without glyphs.
Noto Sans CJK SC supplies Chinese and fallback glyphs for Japanese and Korean.
The application and document renderer share these embedded font bytes.

Font input: [craft-fonts](https://github.com/storytold/craft-fonts/tree/3d9ab3a132ed0eff457e424226a435a901da30d3).
The fonts remain unmodified and retain their SIL Open Font License 1.1;
license texts and author/source attribution are under licenses/.
Proprietary fonts are not bundled. Missing document fonts use substitutes;
users can import their own licensed TTF, OTF, TTC, WOFF or WOFF2 using Add Font…
at the bottom of the editor's font menu, or by dropping a font file on it.

The save picker falls back to a normal download if browser policy denies it;
an explicit cancellation still cancels the save.

The hosting shell adds download progress, startup error handling and retry /
WebGL compatibility links. It does not upload document contents.

Reproduce from this site's source with scripts/update-wordcraft-web.sh 0.7.0.
The patch and pinned source/font revisions are kept in scripts/wordcraft-web/.
