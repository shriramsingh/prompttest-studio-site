fetch('https://api.github.com/repos/shriramsingh/prompttest-studio-site/releases/latest')
  .then((response) => response.ok ? response.json() : Promise.reject(new Error('Release unavailable')))
  .then((release) => {
    const installer = (release.assets || []).find((asset) => asset.name.toLowerCase().endsWith('.exe'));
    const status = document.querySelector('#release-status');
    const link = document.querySelector('#download-link');
    if (installer) {
      link.href = installer.browser_download_url;
      status.textContent = `${release.tag_name} · Published ${new Date(release.published_at).toLocaleDateString()}`;
    } else {
      status.textContent = 'No public installer has been published yet. Check back after the first release.';
    }
  })
  .catch(() => {
    document.querySelector('#release-status').textContent = 'Visit GitHub Releases to see available downloads.';
  });
