// PromptTest Studio - Dynamic Multi-Platform GitHub Releases Fetcher
(function() {
  const REPO = 'shriramsingh/prompttest-studio-site';
  const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;
  const FALLBACK_URL = `https://github.com/${REPO}/releases/latest`;

  function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  fetch(API_URL)
    .then((res) => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`)))
    .then((release) => {
      const assets = release.assets || [];

      const ua = (navigator.userAgent || '').toLowerCase();
      const isMac = /macintosh|mac os x/.test(ua);
      const isLinux = /linux/.test(ua) && !/android/.test(ua);

      const exeAsset = assets.find((a) => a.name.toLowerCase().endsWith('.exe'));
      const dmgAsset = assets.find((a) => a.name.toLowerCase().endsWith('.dmg'));
      const appImageAsset = assets.find((a) => a.name.toLowerCase().endsWith('.appimage'));
      const debAsset = assets.find((a) => a.name.toLowerCase().endsWith('.deb'));

      let preferredAsset = exeAsset;
      let platformLabel = 'Windows 64-bit';

      if (isMac && dmgAsset) {
        preferredAsset = dmgAsset;
        platformLabel = 'macOS (Apple Silicon & Intel)';
      } else if (isLinux && (appImageAsset || debAsset)) {
        preferredAsset = appImageAsset || debAsset;
        platformLabel = 'Linux x64 (AppImage)';
      }

      const downloadUrl = preferredAsset ? preferredAsset.browser_download_url : FALLBACK_URL;
      const releaseDate = release.published_at 
        ? new Date(release.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';
      const fileSize = preferredAsset && preferredAsset.size ? formatBytes(preferredAsset.size) : '';

      // Update primary download buttons
      document.querySelectorAll('.btn-download-primary, #download-button, #download-link').forEach((el) => {
        el.href = downloadUrl;
      });

      // Update release tag / badge
      document.querySelectorAll('.release-version-badge, #download-note').forEach((el) => {
        el.textContent = `${release.tag_name || 'Latest'} · ${platformLabel} ${fileSize ? '· ' + fileSize : ''}`;
      });

      // Update release status details
      const statusEl = document.querySelector('#release-status');
      if (statusEl) {
        if (preferredAsset) {
          statusEl.innerHTML = `<strong>${release.tag_name}</strong> · Released on ${releaseDate} · ${platformLabel} (${fileSize})`;
        } else {
          statusEl.textContent = 'Version available on GitHub Releases.';
        }
      }

      // Update any version badges
      document.querySelectorAll('.release-tag-text').forEach((el) => {
        el.textContent = release.tag_name || 'Latest';
      });
    })
    .catch(() => {
      // Graceful fallback
      const statusEl = document.querySelector('#release-status');
      if (statusEl) {
        statusEl.innerHTML = `Latest version available on <a href="${FALLBACK_URL}" target="_blank" rel="noreferrer">GitHub Releases ↗</a>`;
      }
    });
})();
