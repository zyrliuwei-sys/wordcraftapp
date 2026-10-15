/**
 * WordCraft facts used across the site: release version, download links and
 * official URLs. Bump WORDCRAFT_VERSION when a new GitHub release ships (and
 * refresh public/app/ with scripts/update-wordcraft-web.sh).
 */
export const WORDCRAFT_VERSION = '0.7.0';
export const WORDCRAFT_RELEASE_DATE = '2026-10-14';

export const WORDCRAFT_REPO = 'https://github.com/storytold/wordcraft';
export const WORDCRAFT_RELEASES = `${WORDCRAFT_REPO}/releases`;
export const WORDCRAFT_LATEST_RELEASE = `${WORDCRAFT_REPO}/releases/latest`;
export const WORDCRAFT_OFFICIAL = 'https://getartcraft.com/apps/wordcraft';
export const ARTCRAFT_HOME = 'https://getartcraft.com/';
export const ARTCRAFT_DISCORD = 'https://discord.gg/artcraft';
export const MS_WORD_URL = 'https://www.microsoft.com/en-us/microsoft-365/word';

/** Self-hosted web build with multilingual fonts; see public/app/NOTICE.md. */
export const WORDCRAFT_WEB_APP = '/app/index.html';

export const releaseAsset = (file: string) =>
  `${WORDCRAFT_REPO}/releases/download/v${WORDCRAFT_VERSION}/${file.replaceAll('<ver>', WORDCRAFT_VERSION)}`;

export const CHECKSUMS_URL = releaseAsset('SHA256SUMS.txt');

export type PlatformId = 'windows' | 'macos' | 'linux' | 'other';

export interface DownloadFile {
  /** Label shown on the button, e.g. "x64 installer (.msi)". Not translated: file/arch names. */
  label: string;
  file: string;
  recommended?: boolean;
}

export interface DownloadGroup {
  /** Sub-heading, e.g. "64-bit Intel / AMD". */
  title: string;
  files: DownloadFile[];
}

export const DOWNLOADS: Record<PlatformId, DownloadGroup[]> = {
  windows: [
    {
      title: 'x64 · 64-bit Intel / AMD',
      files: [
        {
          label: 'Installer (.msi)',
          file: 'wordcraft-<ver>-windows-x64.msi',
          recommended: true,
        },
        {
          label: 'Portable (.zip)',
          file: 'wordcraft-<ver>-windows-x64-portable.zip',
        },
      ],
    },
    {
      title: 'ARM64 · Snapdragon / ARM PCs',
      files: [
        {
          label: 'Installer (.msi)',
          file: 'wordcraft-<ver>-windows-arm64.msi',
        },
        {
          label: 'Portable (.zip)',
          file: 'wordcraft-<ver>-windows-arm64-portable.zip',
        },
      ],
    },
    {
      title: 'x86 · 32-bit',
      files: [
        { label: 'Installer (.msi)', file: 'wordcraft-<ver>-windows-x86.msi' },
        {
          label: 'Portable (.zip)',
          file: 'wordcraft-<ver>-windows-x86-portable.zip',
        },
      ],
    },
  ],
  macos: [
    {
      title: 'Universal · Apple silicon + Intel',
      files: [
        {
          label: 'Disk image (.dmg)',
          file: 'wordcraft-<ver>-macos-universal.dmg',
          recommended: true,
        },
        {
          label: 'Command-line tool (.zip)',
          file: 'wordcraft-cli-<ver>-macos-universal.zip',
        },
      ],
    },
  ],
  linux: [
    {
      title: 'x86_64',
      files: [
        {
          label: 'AppImage',
          file: 'wordcraft-<ver>-linux-x86_64.AppImage',
          recommended: true,
        },
        { label: 'Flatpak', file: 'wordcraft-<ver>-linux-x86_64.flatpak' },
        {
          label: 'Debian / Ubuntu (.deb)',
          file: 'wordcraft-<ver>-linux-x86_64.deb',
        },
        {
          label: 'Fedora / openSUSE (.rpm)',
          file: 'wordcraft-<ver>-linux-x86_64.rpm',
        },
        {
          label: 'Tarball (.tar.gz)',
          file: 'wordcraft-<ver>-linux-x86_64.tar.gz',
        },
      ],
    },
    {
      title: 'aarch64 · ARM64',
      files: [
        { label: 'AppImage', file: 'wordcraft-<ver>-linux-aarch64.AppImage' },
        { label: 'Flatpak', file: 'wordcraft-<ver>-linux-aarch64.flatpak' },
        { label: '.deb', file: 'wordcraft-<ver>-linux-aarch64.deb' },
        { label: '.rpm', file: 'wordcraft-<ver>-linux-aarch64.rpm' },
        { label: '.tar.gz', file: 'wordcraft-<ver>-linux-aarch64.tar.gz' },
      ],
    },
    {
      title: 'riscv64',
      files: [
        { label: '.deb', file: 'wordcraft-<ver>-linux-riscv64.deb' },
        { label: '.rpm', file: 'wordcraft-<ver>-linux-riscv64.rpm' },
        { label: '.tar.gz', file: 'wordcraft-<ver>-linux-riscv64.tar.gz' },
      ],
    },
  ],
  other: [
    {
      title: 'FreeBSD 14 · x86_64',
      files: [
        {
          label: 'Tarball (.tar.gz)',
          file: 'wordcraft-<ver>-freebsd-x86_64.tar.gz',
        },
      ],
    },
    {
      title: 'Web build · self-host',
      files: [{ label: 'Static site (.zip)', file: 'wordcraft-web-<ver>.zip' }],
    },
  ],
};

/** The recommended file per desktop platform (hero buttons, OS auto-detect). */
export const PRIMARY_DOWNLOAD: Record<'windows' | 'macos' | 'linux', string> = {
  windows: releaseAsset('wordcraft-<ver>-windows-x64.msi'),
  macos: releaseAsset('wordcraft-<ver>-macos-universal.dmg'),
  linux: releaseAsset('wordcraft-<ver>-linux-x86_64.AppImage'),
};

/** Official screenshots (docs/images in the WordCraft repo), converted to webp. */
export const SCREENSHOTS = {
  hero: '/imgs/wordcraft/hero',
  review: '/imgs/wordcraft/review',
  references: '/imgs/wordcraft/references',
  design: '/imgs/wordcraft/design',
  dark: '/imgs/wordcraft/dark',
  layout: '/imgs/wordcraft/layout',
  backstage: '/imgs/wordcraft/backstage',
} as const;

export const shotSrcSet = (base: string) =>
  `${base}-800.webp 800w, ${base}-1600.webp 1600w`;
