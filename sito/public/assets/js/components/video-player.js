export function initializeVideoPlayers() {
  const dialog = document.getElementById('sermon-video-dialog');
  if (!(dialog instanceof HTMLDialogElement)) return;
  const stage = dialog.querySelector('[data-video-stage]');
  const title = dialog.querySelector('#sermon-video-title');
  const watch = dialog.querySelector('[data-video-watch]');
  const close = dialog.querySelector('.video-player-close');
  if (!(stage instanceof HTMLElement) || !(title instanceof HTMLElement) || !(watch instanceof HTMLAnchorElement) || !(close instanceof HTMLButtonElement)) return;
  /** @type {HTMLElement|null} */
  let opener = null;
  /** @type {{top:number, left:number}|null} */
  let scrollPosition = null;

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    // Removing the iframe stops playback and audio, including after Escape.
    stage.replaceChildren();
    document.documentElement.classList.remove('video-player-open');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    if (scrollPosition) window.scrollTo({ ...scrollPosition, behavior: 'instant' });
    opener = null;
    scrollPosition = null;
  });

  // Delegation also handles cards inserted by the live YouTube catalog.
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest('.video-load, .sermon-title-button');
    if (!trigger && event.target.closest('a, button, input, select, textarea')) return;
    const card = event.target.closest('.sermon-card');
    const container = card?.querySelector('[data-video]');
    const play = container?.querySelector('.video-load');
    if (!(container instanceof HTMLElement) || !(play instanceof HTMLButtonElement)) return;
    const id = container.dataset.video;
    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
    if (!trigger && window.getSelection()?.isCollapsed === false) return;

    opener = trigger instanceof HTMLElement ? trigger : play;
    const videoTitle = container.dataset.title || 'Predica della Chiesa Emmanuele';
    title.textContent = videoTitle;
    watch.href = `https://www.youtube.com/watch?v=${id}`;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = videoTitle;
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    stage.replaceChildren(frame);
    // Match the browser's native dialog focus restoration to the clicked card.
    opener.focus({ preventScroll: true });
    scrollPosition = { top: window.scrollY, left: window.scrollX };
    dialog.showModal();
    document.documentElement.classList.add('video-player-open');
  });
}
