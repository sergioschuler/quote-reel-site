{
  const page = document.getElementById('qr-proposal');
  const video = page.querySelector('video');
  const playback = page.querySelector('.qr-video-control');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const beta = page.querySelector('#qr-beta');
  const title = page.querySelector('#qr-beta-title');
  const callsToAction = page.querySelectorAll('[data-beta]');

  beta.hidden = true;
  for (const link of callsToAction) {
    link.addEventListener('click', event => {
      event.preventDefault();
      beta.hidden = false;
      for (const cta of callsToAction) cta.setAttribute('aria-expanded', 'true');
      title.focus();
      beta.scrollIntoView({block:'start'});
    });
  }

  function syncPlayback() {
    playback.textContent = video.paused ? 'Play demo' : 'Pause demo';
  }
  function playDemo() {
    video.play().catch(syncPlayback);
  }
  video.addEventListener('play', syncPlayback);
  video.addEventListener('pause', syncPlayback);
  playback.addEventListener('click', () => video.paused ? playDemo() : video.pause());
  motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
  if (!motion.matches) playDemo();
}
