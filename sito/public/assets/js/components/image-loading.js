/** Tracks real images, including cards inserted asynchronously, on every page. */
export function initializeImageLoading() {
  const track = image => {
    if (!(image instanceof HTMLImageElement)) return;
    image.dataset.imageState = image.complete ? (image.naturalWidth ? 'ready' : 'error') : 'loading';
  };
  const trackTree = root => {
    if (!(root instanceof Element)) return;
    if (root.matches('img')) track(root);
    root.querySelectorAll('img').forEach(track);
  };
  const finish = event => {
    if (event.target instanceof HTMLImageElement) event.target.dataset.imageState = event.type === 'load' ? 'ready' : 'error';
  };
  document.addEventListener('load', finish, true);
  document.addEventListener('error', finish, true);
  trackTree(document.body);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(trackTree)))
    .observe(document.body, { childList: true, subtree: true });
}
